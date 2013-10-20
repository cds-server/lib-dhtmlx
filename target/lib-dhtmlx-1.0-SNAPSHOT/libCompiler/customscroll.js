(function(){

	function isIE(){
		return dhtmlx.env? dhtmlx.env.isIE : _isIE;
	}
	function dhtmlx_event(node, event, handler){
		if (window.dhtmlxEvent)
			dhtmlxEvent(node, event, handler);
		else
			dhtmlx.event(node, event, handler);
	}
	function dhtmlx_bind(f, t){
		return function(){
			f.apply(t, arguments);
		};
	}
	function dhtmlx_pos(ev){
		ev = ev || event;
        if(ev.pageX || ev.pageY)	//FF, KHTML
            return {x:ev.pageX, y:ev.pageY};
        //IE
        var d  =  ((isIE())&&(document.compatMode != "BackCompat"))?document.documentElement:document.body;
        return {
                x:ev.clientX + d.scrollLeft - d.clientLeft,
                y:ev.clientY + d.scrollTop  - d.clientTop
        };
	}
	var dhxCustomScroll = dhtmlx.CustomScroll = {

		scrollStep:40,
		init:function(){
			dhtmlx.$customScroll = true;
		},
		enable:function(view, mode){ 
			if (typeof view == "string")
				view = document.getElementById(view);

			dhxCustomScroll._init_once();
			var node = view.$view || view.objBox || view.allTree || view;

			node.style.overflow = node.style.overflowX = node.style.overflowY = "hidden";
			
			node._custom_scroll_mode = mode||"xy";
			dhtmlx_event(node, "mouseover", 	dhxCustomScroll._mouse_in 		);
			dhtmlx_event(node, "mouseout", 	dhxCustomScroll._mouse_out		);
			dhtmlx_event(node, "mousewheel", 	dhxCustomScroll._mouse_wheel	);
			dhtmlx_event(node, "DOMMouseScroll", 	dhxCustomScroll._mouse_wheel	);
		},
		_init_once:function(e){
			dhtmlx_event(document.body, "mousemove", 	function(e){
				if (dhxCustomScroll._active_drag_area)
					dhxCustomScroll._adjust_scroll(dhxCustomScroll._active_drag_area, dhxCustomScroll._active_drag_area._scroll_drag_pos, dhtmlx_pos(e));
			});
			dhxCustomScroll._init_once = function(){};
		},
		_mouse_in:function(e){
			clearTimeout(this._mouse_out_timer);
			if (this._custom_scroll_size || dhxCustomScroll._active_drag_area) return;
			
			var sizes = {
				dx:this.scrollWidth,
				dy:this.scrollHeight,
				px:this.offsetWidth,
				py:this.offsetHeight
			};
			sizes._scroll_x = sizes.dx > sizes.px && this._custom_scroll_mode.indexOf("x") != -1;
			sizes._scroll_y = sizes.dy > sizes.py && this._custom_scroll_mode.indexOf("y") != -1;

			this._custom_scroll_size = sizes;
			if (sizes._scroll_x){
				sizes._scroll_x_node = dhxCustomScroll._create_scroll(this, "x", sizes.dx, sizes.px, "width", "height");
				sizes._sx = (sizes.px - sizes._scroll_x_node.offsetWidth - 4);
				sizes._vx = sizes.dx - sizes.px;
			}
			if (sizes._scroll_y){
				sizes._scroll_y_node = dhxCustomScroll._create_scroll(this, "y", sizes.dy, sizes.py, "height", "width");
				sizes._sy = (sizes.py - sizes._scroll_y_node.offsetHeight - 4);
				sizes._vy = sizes.dy - sizes.py;
			}

			dhxCustomScroll._update_scroll(this);
		},
		_adjust_scroll:function(node, old, pos){
			var config = node._custom_scroll_size;
			
			if (config._scroll_x_node == node._scroll_drag_enabled){
				var next = (pos.x - old.x)*config._vx/config._sx;
				dhxCustomScroll._set_scroll_value(node, "scrollLeft", next);
			}
			if (config._scroll_y_node == node._scroll_drag_enabled){
				var next = (pos.y - old.y)*config._vy/config._sy;
				dhxCustomScroll._set_scroll_value(node, "scrollTop", next);
			}

			node._scroll_drag_pos = pos;
			dhxCustomScroll._update_scroll(node);
		},
		_mouse_out:function(){
			clearTimeout(this._mouse_out_timer);
			var node = this;
			this._mouse_out_timer = setTimeout(function(){
				dhxCustomScroll._mouse_out_timed.call(node);
			},200);
		},
		_removeScroll:function(scroll){
			if (scroll){
				if (scroll.parentNode)
					scroll.parentNode.removeChild(scroll);
				if (scroll._dhtmlx_event_sc1){
					dhtmlx_eventRemove(scroll._dhtmlx_event_sc1);
					dhtmlx_eventRemove(scroll._dhtmlx_event_sc2);
				}
			}
		},
		_mouse_out_timed:function(){
			if (this._custom_scroll_size){
				if (this._scroll_drag_enabled){
					this._scroll_drag_released = true;
					return;
				}
				var sizes = this._custom_scroll_size;
				dhxCustomScroll._removeScroll(sizes._scroll_x_node);
				dhxCustomScroll._removeScroll(sizes._scroll_y_node);

				this._custom_scroll_size = null;
			}
		},
		_mouse_wheel:function(e){
			var sizes = this._custom_scroll_size;
			var delta = e.wheelDelta/-40;
			if (!delta && e.detail && (typeof e.wheelDelta == "undefined"))
				delta = e.detail;

			if (sizes){
				if (sizes._scroll_x_node && (e.wheelDeltaX || ( delta && !sizes._scroll_y_node ))){
					var x_dir  = (e.wheelDeltaX/-40)||delta;

					//see below
					dhxCustomScroll._set_scroll_value(this, "scrollLeft", x_dir*dhxCustomScroll.scrollStep);
				} else if (delta && sizes._scroll_y_node){
					
					//lesser flickering of scroll in IE
					//also prevent scrolling outside of borders because of scroll-html-elements
					dhxCustomScroll._set_scroll_value(this, "scrollTop", delta*dhxCustomScroll.scrollStep);
				}
			}

			
			dhxCustomScroll._update_scroll(this);

			if (e.preventDefault)
				e.preventDefault();
			e.cancelBubble = true;
			return false;
		},
		_set_scroll_value:function(node, pose, value){
			var sizes = node._custom_scroll_size;
			var max_scroll = (pose == "scrollLeft") ? (sizes.dx - sizes.px) : (sizes.dy - sizes.py);
			if (node[pose]+value > max_scroll)
				value = max_scroll - node[pose];
			
			if (isIE()){
				dhxCustomScroll._update_scroll(node, pose, value + node[pose]);
				node[pose] += value;
			} else
				node[pose] += value;
		},
		_create_scroll:function(node, mode, dy, py, dim, pos){
			var scroll = document.createElement("DIV");
			scroll.className = "dhtmlx_c_scroll_"+mode;
			scroll.innerHTML = "<div></div>";
		
			scroll.style[dim] = Math.max((py*py/dy-7),40)+"px";
			node.style.position = "relative";
			node.appendChild(scroll);

			node._dhtmlx_event_sc1 = dhtmlx_event(scroll, "mousedown", dhxCustomScroll._scroll_drag(node));
			node._dhtmlx_event_sc2 = dhtmlx_event(document.body, "mouseup", dhtmlx_bind(dhxCustomScroll._scroll_drop, node));
			return scroll;
		},
		_scroll_drag:function(node){
			return function(e){
				this.className += " dhtmlx_scroll_active";
				dhxCustomScroll._active_drag_area = node;
				node._scroll_drag_enabled = this;
				node._scroll_drag_pos = dhtmlx_pos(e);
			};
		},
		_scroll_drop:function(node){
			if (this._scroll_drag_enabled){
				this._scroll_drag_enabled.className = this._scroll_drag_enabled.className.toString().replace(" dhtmlx_scroll_active","");
				this._scroll_drag_enabled = false;
				dhxCustomScroll._active_drag_area = 0;
				if (this._scroll_drag_released){
					dhxCustomScroll._mouse_out_timed.call(this);
					this._scroll_drag_released = false;
				}
			}
		},
		_update_scroll:function(node, pose, value){
			var sizes = node._custom_scroll_size;
			if (sizes && (sizes._scroll_x_node||sizes._scroll_y_node)){
				var left_scroll = pose == "scrollLeft" ? value : node.scrollLeft;
				var left = left_scroll;
				var shift_left = left;

				var top_scroll = pose == "scrollTop" ? value : node.scrollTop;
				var top = top_scroll;
				var shift_top = top;

				if (sizes._scroll_x_node){
					sizes._scroll_x_node.style.bottom = 1 - shift_top + "px";
					sizes._scroll_x_node.style.left = Math.round(sizes._sx*left/(sizes.dx-sizes.px)) + shift_left + 1 +"px";
				}
				if (sizes._scroll_y_node){
					sizes._scroll_y_node.style.right = 1 - shift_left + "px";
					sizes._scroll_y_node.style.top = Math.round(sizes._sy*top/(sizes.dy-sizes.py)) + shift_top + 1 + "px";
				}
					
			}
		}
	};

})();