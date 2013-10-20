//v.3.6 build 130619

/*
Copyright Dinamenta, UAB http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlXForm.prototype.items.upload={render:function(a,b){a._type="up";a._enabled=!0;a._checked=!0;a.className=b.position+(typeof b.className=="string"?" "+b.className:"");var c=document.createElement("DIV");a.appendChild(c);if(!isNaN(b.inputLeft))a.style.left=parseInt(b.inputLeft)+"px";if(!isNaN(b.inputTop))a.style.top=parseInt(b.inputTop)+"px";if(b.inputWidth!="auto"&&!isNaN(b.inputWidth))c.style.width=parseInt(b.inputWidth)+"px";a._uploader=new dhtmlXFileUploader(c,b.swfPath||"",b.swfUrl||"",b.mode||
null,b.swfLogs,b.slXap||"",b.slUrl||"",b.slLogs||"");a._uploader.setURL(b.url||"");a._uploader.callEvent=a.callEvent;typeof b.autoStart!="undefined"&&a._uploader.setAutoStart(b.autoStart);typeof b.autoRemove!="undefined"&&a._uploader.setAutoRemove(b.autoRemove);typeof b.titleScreen!="undefined"&&a._uploader.enableTitleScreen(b.titleScreen);typeof b.titleText!="undefined"&&a._uploader.setTitleText(b.titleText);b.hidden==!0&&this.hide(a);b.disabled==!0&&this.userDisable(a);if(!(b.inputHeight=="auto"||
parseInt(b.inputHeight)==NaN))a._uploader.p_files.style.height=parseInt(b.inputHeight)+"px";return this},destruct:function(a){this.doUnloadNestedLists(a);a._uploader.unload();a._uploader=null;a._checked=null;a._enabled=null;a._idd=null;a._type=null;a.onselectstart=null;a._autoCheck=null;a.callEvent=null;a.checkEvent=null;for(a.getForm=null;a.childNodes.length>0;)a.removeChild(a.childNodes[0]);a.parentNode.removeChild(a);a=null},setText:function(){},getText:function(){},enable:function(a){a._enabled=
!0;if(String(a.className).search("disabled")>=0)a.className=String(a.className).replace(/disabled/gi,"");a._uploader.enable()},disable:function(a){a._enabled=!1;String(a.className).search("disabled")<0&&(a.className+=" disabled");a._uploader.disable()},setWidth:function(a,b){a.childNodes[0].style.width=b+"px";a._width=b},getWidth:function(a){return a._width||parseInt(a.childNodes[0].style.width)},setValue:function(a){a._uploader.clear()},getValue:function(a){var b=a._uploader.getData(),c={},d=0,f;
for(f in b)c[a._idd+"_r_"+d]=b[f].realName,c[a._idd+"_s_"+d]=b[f].serverName,d++;c[a._idd+"_count"]=d;return c},getUploader:function(a){return a._uploader},getStatus:function(a){return a._uploader.getStatus()}};(function(){for(var a in{doUnloadNestedLists:1,isEnabled:1})dhtmlXForm.prototype.items.upload[a]=dhtmlXForm.prototype.items.checkbox[a]})();dhtmlXForm.prototype.setFormData_upload=function(a){this.doWithItem(a,"setValue")};
dhtmlXForm.prototype.getUploader=function(a){return this.doWithItem(a,"getUploader")};dhtmlXForm.prototype.getUploaderStatus=function(a){return this.doWithItem(a,"getStatus")};
function dhtmlXFileUploader(a,b,c,d,f,j,k,l){var e=this;if(typeof d=="string"&&typeof this[d]=="function")this.engine=d;else if(this.engine="html4",typeof window.FormData!="undefined"&&typeof window.XMLHttpRequest!="undefined"&&typeof window.XMLHttpRequestUpload!="undefined")this.engine="html5";else if(typeof window.swfobject!="undefined"){var m=swfobject.getFlashPlayerVersion();if(m.major>=10)this.engine="flash"}else if(this._sl_v=this.getSLVersion())this.engine="sl";typeof a=="string"&&(a=document.getElementById(a));
this._swf_file_url=b||"";this._swf_upolad_url=c||"";this._swf_logs=f;this._sl_xap=j;this._sl_upload_url=k;this._sl_logs=l;this.p=document.createElement("DIV");this.p.className+=" dhx_file_uploader";a.appendChild(this.p);this.p_files=document.createElement("DIV");this.p_files.className="dhx_upload_files";this.p.appendChild(this.p_files);this.p_controls=document.createElement("DIV");this.p_controls.className="dhx_upload_controls";this.p.appendChild(this.p_controls);this._files={};this._items={};this._data=
{};this._autoRemove=this._autoStart=!1;this._enabled=this._titleScreen=!0;this._uploaded_count=0;this._uid=function(){this._idd?this._idd++:this._idd=(new Date).getTime();return this._idd};this._initToolbar=function(){this.b_opts={info:{onclick:null},browse:{onclick:null,tooltip:"Browse"},upload:{onclick:function(){e._enabled&&!e._uploading&&(e._switchButton(!0),e._uploadStart())},tooltip:"Upload"},cancel:{onclick:function(){e._enabled&&(e._uploadStop(),e._switchButton(!1))},tooltip:"Stop"},clear:{onclick:function(){e._enabled&&
e.clear()},tooltip:"Clear list"}};this.buttons={};for(var a in this.b_opts){var b=document.createElement("DIV");b.innerHTML="&nbsp;";b.className="dhx_file_uploader_button button_"+a;b.onclick=this.b_opts[a].onclick;if(this.b_opts[a].tooltip)b.title=this.b_opts[a].tooltip;this.p_controls.appendChild(b);this.buttons[a]=b;b=null}this.buttons.cancel.style.display="none"};this._readableSize=function(a){for(var b=!1,c="b,Kb,Mb,Gb,Tb,Pb,Eb".split(","),d=0;d<c.length;d++)a>1024?a/=1024:b===!1&&(b=d);b===
!1&&(b=c.length-1);return Math.round(a*100)/100+" "+c[b]};this._addFileToList=function(a,b,c,d,f){this._checkTitleScreen();var g=document.createElement("DIV");g._idd=a;g.className="dhx_file dhx_file_"+d;g.innerHTML="<div class='dhx_file_param dhx_file_name'>&nbsp;</div><div class='dhx_file_param dhx_file_progress'>"+f+"%</div><div class='dhx_file_param dhx_file_delete' title='Remove from list'>&nbsp;</div>";this.p_files.appendChild(g);g.childNodes[0].style.width=g.offsetWidth-127+"px";this._items[a]=
g;this._updateFileNameSize(a);g.childNodes[2].onclick=function(){if(e._enabled){var a=this.parentNode._idd;e._removeFileFromQueue(a)}};this.callEvent("onFileAdd",[b])};this._removeFileFromList=function(a){if(this._items[a])this._items[a].childNodes[2].onclick=null,this._items[a].parentNode.removeChild(this._items[a]),this._items[a]=null,delete this._items[a],this._data[a]&&(this._data[a]=null,delete this._data[a]),this._checkTitleScreen()};this._updateFileNameSize=function(a){this._items[a].childNodes[0].innerHTML=
this._files[a].name+(!isNaN(this._files[a].size)?" ("+this._readableSize(this._files[a].size)+")":"&nbsp;");this._items[a].childNodes[0].title=this._files[a].name+(!isNaN(this._files[a].size)?" ("+this._readableSize(this._files[a].size)+")":"")};this._updateFileInList=function(a,b,c){if(this._items[a])this._items[a].className="dhx_file dhx_file_"+b,b=="uploading"&&c<100&&this._progress_type=="loader"?(this._items[a].childNodes[1].className="dhx_file_param dhx_file_uploading",this._items[a].childNodes[1].innerHTML=
"&nbsp;"):(this._items[a].childNodes[1].className="dhx_file_param dhx_file_progress",this._items[a].childNodes[1].innerHTML=c+"%"),this._updateFileNameSize(a)};this._removeFilesByState=function(a){for(var b in this._files)(a===!0||this._files[b].state==a)&&this._removeFileFromQueue(b)};this._switchButton=function(a){if(a==!0)this.buttons.upload.style.display="none",this.buttons.cancel.style.display="";else{var b=this._uploaded_count;this.buttons.upload.style.display="";this.buttons.cancel.style.display=
"none";this._uploaded_count=0;b>0&&this.callEvent("onUploadComplete",[b])}};this._uploadStart=function(){if(!this._uploading)for(var a in this._files)if(this._files[a].state=="fail")this._files[a].state="added",this._updateFileInList(a,"added",0);this._uploading=!0;var b=!1;for(a in this._files)if(!b&&[this._files[a].state]=="added")b=!0,this._files[a].state="uploading",this._updateFileInList(a,"uploading",0),this._doUploadFile(a);if(!b)this._uploading=!1,this._switchButton(!1)};this._onUploadSuccess=
function(a,b,c){if(typeof c!="undefined"&&this.engine=="flash"){try{eval("var t="+c.data)}catch(d){}if(typeof t!="undefined"&&t.state==!0&&t.name!=null)b=t.name;else{this._onUploadFail(a);return}}this._uploaded_count++;this._data[a]={realName:this._files[a].name,serverName:b};this._files[a].state="uploaded";this._updateFileInList(a,"uploaded",100);this.callEvent("onUploadFile",[this._files[a].name,b]);this._autoRemove&&this._removeFileFromQueue(a);this._uploading&&this._uploadStart()};this._onUploadFail=
function(a){this._files[a].state="fail";this._updateFileInList(a,"fail",0);this.callEvent("onUploadFail",[this._files[a].name]);this._uploading&&this._uploadStart()};this._onUploadAbort=function(a){this._uploading=!1;this._files[a].state="added";this._updateFileInList(a,"added",0);this.callEvent("onUploadCancel",[this._files[a].name])};this._checkTitleScreen=function(){var a=0,b;for(b in this._files)a++;if(a==0&&this.p.className.search("dhx_file_uploader_title")<0&&this._titleScreen)this.p.className+=
" dhx_file_uploader_title",this.buttons.info.innerHTML=this._titleText,this.buttons.info.style.width=Math.max(this.p_controls.offsetWidth-134,0)+"px";if((a>0||!this._titleScreen)&&this.p.className.search("dhx_file_uploader_title")>=0)this.p.className=this.p.className.replace(/dhx_file_uploader_title/g,""),this.buttons.info.innerHTML=""};this.callEvent=function(){};this.upload=function(){this._uploading||this._uploadStart()};this.setAutoStart=function(a){this._autoStart=a==!0};this.setAutoRemove=function(a){this._autoRemove=
a==!0};this.enableTitleScreen=function(a){this._titleScreen=a==!0;this._checkTitleScreen()};this.setTitleText=function(a){this._titleText=a;if(this.p.className.search("dhx_file_uploader_title")>=0)this.buttons.info.innerHTML=this._titleText};this.setURL=function(a){this._url=a};this.setSWFURL=function(a){this._swf_upolad_url=a};this.enable=function(){this._enabled=!0;this.p_files.className="dhx_upload_files";this.p_controls.className="dhx_upload_controls"};this.disable=function(){this._enabled=!1;
this.p_files.className="dhx_upload_files dhx_uploader_dis";this.p_controls.className="dhx_upload_controls dhx_uploader_dis"};this.getStatus=function(){var a=0,b;for(b in this._files){if(this._files[b].state!="uploaded")return-1;a=1}return a};this.getData=function(){return this._data};this.clear=function(){this._uploading&&e._uploadStop();e._switchButton(!1);e._removeFilesByState(!0);this.callEvent("onClear",[])};this.unload=function(){this._removeFilesByState(!0);this._items=this._files=this._data=
null;this._unloadEngine();for(var a in this.buttons)this.buttons[a].onclick=null,this.buttons[a].parentNode.removeChild(this.buttons[a]),this.buttons[a]=null,delete this.buttons[a];this.buttons=null;for(a in this.b_opts)this.b_opts[a].onclick=null,this.b_opts[a]=null,delete this.b_opts[a];this.b_opts=null;this.p_controls.parentNode.removeChild(this.p_controls);this.p_controls=null;this.p_files.parentNode.removeChild(this.p_files);this.engine=this._swf_upolad_url=this._swf_file_url=this.unload=this.clear=
this.getData=this.getStatus=this.disable=this.enable=this.setURL=this.setTitleText=this.enableTitleScreen=this.setAutoRemove=this.setAutoStart=this.upload=this.callEvent=this._checkTitleScreen=this._onUploadAbort=this._onUploadFail=this._onUploadSuccess=this._uploadStart=this._switchButton=this._removeFilesByState=this._updateFileInList=this._updateFileNameSize=this._removeFileFromList=this._addFileToList=this._readableSize=this._initToolbar=this._uid=this._idd=this._uploading=this._url=this._uploaded_count=
this._titleText=this._titleScreen=this._progress_type=this._enabled=this._autoStart=this._autoRemove=this.p_files=null;this.p.className=this.p.className.replace(/dhx_file_uploader_title/gi,"").replace(/dhx_file_uploader/gi,"");e=a=this.p=null};var i=new this[this.engine],h;for(h in i)this[h]=i[h],i[h]=null;h=i=a=null;this._initToolbar();this._initEngine();this._checkTitleScreen();return this}dhtmlXFileUploader.prototype.html5=function(){};
dhtmlXFileUploader.prototype.html5.prototype={_initEngine:function(){var a=this;this.buttons.browse.onclick=function(){a._enabled&&a.f.click()};this._progress_type="percentage";this._upload_dnd=this._upload_mp=!0;var b=window.navigator.userAgent,c=!0;if(b.match(/Windows/gi)!=null&&b.match(/AppleWebKit/gi)!=null&&b.match(/Safari/gi)!=null){if(b.match(/Version\/5\.1\.5/gi))this._upload_mp=!1;if(b.match(/Version\/5\.1[^\.\d{1,}]/gi))this._upload_dnd=!1;if(b.match(/Version\/5\.1\.1/gi))this._upload_dnd=
this._upload_mp=!1;if(b.match(/Version\/5\.1\.2/gi))this._upload_dnd=!1}this._addFileInput();this._upload_dnd?(this.p.ondragenter=function(a){a.dataTransfer&&(a.stopPropagation(),a.preventDefault())},this.p.ondragover=function(a){a.dataTransfer&&(a.stopPropagation(),a.preventDefault())},this.p.ondrop=function(b){b.dataTransfer&&(b.stopPropagation(),b.preventDefault(),a._enabled&&a._parseFilesInInput(b.dataTransfer.files))},this._titleText="Drag-n-Drop files here or<br>click to select files for upload."):
this._titleText="Click to select files for upload."},_addFileInput:function(){if(this.f!=null)this.f.onchange=null,this.f.parentNode.removeChild(this.f),this.f=null;var a=this;this.f=document.createElement("INPUT");this.f.type="file";if(this._upload_mp)this.f.multiple="1";this.f.className="dhx_uploader_input";this.p_controls.appendChild(this.f);this.f.onchange=function(){a._parseFilesInInput(this.files);_isOpera&&a._addFileInput()}},_doUploadFile:function(a){var b=this;if(!this._loader)this._loader=
new XMLHttpRequest,this._loader.upload.onprogress=function(a){b._files[this._idd].state=="uploading"&&b._updateFileInList(this._idd,"uploading",Math.round(a.loaded*100/a.total))},this._loader.onload=function(){try{eval("var r="+this.responseText)}catch(a){}typeof r=="object"&&typeof r.state!="undefined"&&r.state==!0?(b._onUploadSuccess(this.upload._idd,r.name),r=null):b._onUploadFail(this.upload._idd)},this._loader.onerror=function(){b._onUploadFail(this.upload._idd)},this._loader.onabort=function(){b._onUploadAbort(this.upload._idd)};
this._loader.upload._idd=a;var c=new FormData;c.append("file",this._files[a].file);this._loader.open("POST",this._url+(String(this._url).indexOf("?")<0?"?":"&")+"mode=html5&"+(new Date).getTime(),!0);this._loader.setRequestHeader("X-Requested-With","XMLHttpRequest");this._loader.send(c)},_uploadStop:function(){this._uploading&&this._loader&&this._loader.abort()},_parseFilesInInput:function(a){for(var b=0;b<a.length;b++)this._addFileToQueue(a[b])},_addFileToQueue:function(a){var b=a._idd||this._uid();
this._files[b]={file:a,name:a.name,size:a.size,state:"added"};this._addFileToList(b,a.name,a.size,"added",0);this._autoStart&&!this._uploading&&this._uploadStart(!0)},_removeFileFromQueue:function(a){if(this._files[a]){var b=this._files[a].name,c=this._data!=null&&this._data[a]!=null?this._data[a].serverName:null,d=!1;this._uploading&&a==this._loader.upload._idd&&this._files[a].state=="uploading"&&(this._uploadStop(),d=!0);this._files[a].file=null;this._files[a].name=null;this._files[a].size=null;
this._files[a].state=null;this._files[a]=null;delete this._files[a];this._removeFileFromList(a);this.callEvent("onFileRemove",[b,c]);d&&this._uploadStart()}},_unloadEngine:function(){this.buttons.browse.onclick=null;this.f.onchange=null;this.f.parentNode.removeChild(this.f);this.f=null;this.p.ondragenter=null;this.p.ondragover=null;this.p.ondrop=null;if(this._loader)this._loader.upload.onprogress=null,this._loader.onload=null,this._loader.onerror=null,this._loader.onabort=null,this._loader=this._loader.upload._idd=
null;this._unloadEngine=this._removeFileFromQueue=this._addFileToQueue=this._parseFilesInInput=this._uploadStop=this._doUploadFile=this._initEngine=null}};dhtmlXFileUploader.prototype.html4=function(){};
dhtmlXFileUploader.prototype.html4.prototype={_initEngine:function(){this._addForm();this._progress_type="loader";this._titleText="Click button<br>to select files for upload."},_addForm:function(){var a=this,b=this._uid();if(!this.k)this.k=document.createElement("DIV"),this.k.className="dhx_file_form_cont",this.buttons.browse.appendChild(this.k),this.fr_name="dhx_file_"+(new Date).getTime(),this.k.innerHTML='<iframe name="'+this.fr_name+'" style="height:0px;width:0px;" frameBorder="0"></iframe>',
this.fr=this.k.firstChild,window.navigator.userAgent.indexOf("MSIE")>=0?this.fr.onreadystatechange=function(){this.readyState=="complete"&&a._onLoad()}:this.fr.onload=function(){a._onLoad()};var c=document.createElement("DIV");c.innerHTML="<form method='POST' enctype='multipart/form-data' target='"+this.fr_name+"' class='dhx_file_form' name='dhx_file_form_"+(new Date).getTime()+"'><input type='hidden' name='mode' value='html4'><input type='hidden' name='uid' value='"+b+"'><input type='file' name='file' class='dhx_file_input'></form>";
this.k.appendChild(c);c.firstChild.lastChild._idd=b;c.firstChild.lastChild.onchange=function(){a._addFileToQueue(this);this.onchange=null;this.parentNode.parentNode.style.display="none";a._addForm()};c=null},_onLoad:function(){if(this._uploading){try{eval("var r="+this.fr.contentWindow.document.body.innerHTML)}catch(a){}if(typeof r=="object"&&typeof r.state!="undefined")if(r.state=="cancelled"){this._onUploadAbort(this.fr._idd);r=null;return}else if(r.state==!0){if(typeof r.size!="undefined"&&!isNaN(r.size))this._files[this.fr._idd].size=
r.size;this._onUploadSuccess(this.fr._idd,r.name);r=null;return}this._onUploadFail(this.fr._idd)}},_addFileToQueue:function(a){var b=a.value.match(/[^\\\/]*$/g),b=b[0]!=null?b[0]:a.value;this._files[a._idd]={name:b,form:a.parentNode,node:a.parentNode.parentNode,input:a,state:"added"};this._addFileToList(a._idd,a.value,!1,"added",0);this._autoStart&&!this._uploading&&this._uploadStart(!0)},_removeFileFromQueue:function(a){var b=this._files[a].name,c=this._data!=null&&this._data[a]!=null?this._data[a].serverName:
null;this._files[a].input.onchange=null;this._files[a].form.removeChild(this._files[a].input);this._files[a].node.removeChild(this._files[a].form);this._files[a].node.parentNode.removeChild(this._files[a].node);this._files[a].input=null;this._files[a].name=null;this._files[a].form=null;this._files[a].node=null;this._files[a].size=null;this._files[a].state=null;this._files[a]=null;delete this._files[a];this._removeFileFromList(a);this.callEvent("onFileRemove",[b,c])},_doUploadFile:function(a){this.fr._idd=
a;this._files[a].form.action=this._url;this._files[a].form.submit()},_uploadStop:function(){if(this._uploading)this.fr.contentWindow.location.href=this._url+(this._url.indexOf("?")<0?"?":"&")+"mode=html4&action=cancel&etc="+(new Date).getTime()},_unloadEngine:function(){if(this.k)this.fr_name=null,this.fr.onreadystatechange=null,this.fr.onload=null,this.fr.parentNode.removeChild(this.fr),this.fr=null,this.k.firstChild.firstChild.lastChild.onchange=null,this.k.parentNode.removeChild(this.k),this.k=
null;this._unloadEngine=this._uploadStop=this._doUploadFile=this._removeFileFromQueue=this._addFileToQueue=this._onLoad=this._addForm=this._initEngine=null}};dhtmlXFileUploader.prototype.flash=function(){};
dhtmlXFileUploader.prototype.flash.prototype={_initEngine:function(){if(!window.dhtmlXFileUploaderSWFObjects)window.dhtmlXFileUploaderSWFObjects={items:{},uid:function(){this.id?this.id++:this.id=(new Date).getTime();return this.id},callEvent:function(a,b,f){window.dhtmlXFileUploaderSWFObjects.items[a].uploader[b].apply(window.dhtmlXFileUploaderSWFObjects.items[a].uploader,f)}};var a=this;this._swf_obj_id="dhtmlXFileUploaderSWFObject_"+window.dhtmlXFileUploaderSWFObjects.uid();this._swf_file_url=
this._swf_file_url+(this._swf_file_url.indexOf("?")>=0?"&":"?")+"etc="+(new Date).getTime();this.buttons.browse.innerHTML="<div id='"+this._swf_obj_id+"' style='width:100%;height:100%;'></div>";swfobject.embedSWF(this._swf_file_url,this._swf_obj_id,"100%","100%","9",null,{ID:this._swf_obj_id,enableLogs:this._swf_logs},{wmode:"transparent"});var b=swfobject.getFlashPlayerVersion();this._titleText="Engine successfuly inited<br>Flash Player: "+b.major+"."+b.minor+"."+b.release;this._progress_type="percentage";
window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id]={id:this._swf_obj_id,uploader:this}},_addFileToQueue:function(a,b,c){this._files[a]={name:b,size:c,state:"added"};this._addFileToList(a,b,c,"added",0);this._autoStart&&!this._uploading&&this._uploadStart(!0)},_removeFileFromQueue:function(a){if(this._files[a]){var b=this._files[a].name,c=this._data!=null&&this._data[a]!=null?this._data[a].serverName:null,d=!1;this._uploading&&this._files[a].state=="uploading"&&(this._uploadStop(),d=!0);swfobject.getObjectById(this._swf_obj_id).removeFileById(a);
this._files[a].name=null;this._files[a].size=null;this._files[a].state=null;this._files[a]=null;delete this._files[a];this._removeFileFromList(a);this.callEvent("onFileRemove",[b,c]);d&&this._uploadStart()}},_doUploadFile:function(a){swfobject.getObjectById(this._swf_obj_id).upload(a,this._swf_upolad_url)},_uploadStop:function(){for(var a in this._files)this._files[a].state=="uploading"&&swfobject.getObjectById(this._swf_obj_id).uploadStop(a)},_unloadEngine:function(){if(window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id])window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id].id=
null,window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id].uploader=null,window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id]=null,delete window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id];this._unloadEngine=this._uploadStop=this._doUploadFile=this._removeFileFromQueue=this._addFileToQueue=this._initEngine=this._swf_obj_id=null}};dhtmlXFileUploader.prototype.sl=function(){};
dhtmlXFileUploader.prototype.sl.prototype={_initEngine:function(){if(typeof this._sl_v=="undefined")this._sl_v=this.getSLVersion();if(!window.dhtmlXFileUploaderSLObjects)window.dhtmlXFileUploaderSLObjects={items:{},uid:function(){this.id?this.id++:this.id=(new Date).getTime();return this.id},callEvent:function(a,b,c){window.dhtmlXFileUploaderSLObjects.items[a].uploader[b].apply(window.dhtmlXFileUploaderSLObjects.items[a].uploader,c)}};this._sl_obj_id="dhtmlXFileUploaderSLObject_"+window.dhtmlXFileUploaderSLObjects.uid();
this._sl_v!=!1?(this._titleText="Engine successfuly inited<br>Silverlight version: "+this._sl_v[0]+"."+this._sl_v[1],this.buttons.browse.innerHTML='<div style="width:100%;height:100%;"><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="'+this._sl_obj_id+'"><param name="source" value="'+this._sl_xap+'"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="initParams" value="SLID='+this._sl_obj_id+
",LOGS="+this._sl_logs+'"/><param name="minRuntimeVersion" value="5.0"/></object></div>'):(this._titleText="Silverlight plugin not found<br>or version less than 4.0",this.buttons.browse.style.cursor="wait",this.buttons.browse.title="");this._progress_type="percentage";window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id]={id:this._sl_obj_id,uploader:this}},_addFileToQueue:function(a,b,c){this._files[a]={name:b,size:c,state:"added"};this._addFileToList(a,b,c,"added",0);this._autoStart&&!this._uploading&&
this._uploadStart(!0)},_removeFileFromQueue:function(a){if(this._files[a]){var b=!1;this._uploading&&this._files[a].state=="uploading"&&(this._uploadStop(),b=!0);document.getElementById([this._sl_obj_id]).Content.a.removeFileById(a);this._files[a].name=null;this._files[a].size=null;this._files[a].state=null;this._files[a]=null;delete this._files[a];this._removeFileFromList(a);b&&this._uploadStart()}},_doUploadFile:function(a){document.getElementById(this._sl_obj_id).Content.a.upload(a,this._sl_upload_url,
"&mode=sl&etc="+(new Date).getTime())},_uploadStop:function(){this._uploading=!1;for(var a in this._files)this._files[a].state=="uploading"&&document.getElementById(this._sl_obj_id).Content.a.uploadStop(a)},_unloadEngine:function(){if(window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id])window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].id=null,window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].uploader=null,window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id]=null,delete window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id];
this._unloadEngine=this._uploadStop=this._doUploadFile=this._removeFileFromQueue=this._addFileToQueue=this._initEngine=this._sl_obj_id=null}};dhtmlXFileUploader.prototype.setSLURL=function(a){this._sl_upload_url=a};
dhtmlXFileUploader.prototype.getSLVersion=function(){var a=!1;if(_isIE)try{var b=new ActiveXObject("AgControl.AgControl");if(b!=null)for(var c=4,d=0;b.isVersionSupported([c,d].join("."));)a=[c,d],++d>9&&(c++,d=0);b=null}catch(f){}else navigator.plugins["Silverlight Plug-In"]!=null&&(a=navigator.plugins["Silverlight Plug-In"].description.split("."));return a};

//v.3.6 build 130619

/*
CopyrigDinamenta, UABTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/