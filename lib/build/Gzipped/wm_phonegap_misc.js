/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

dojo.provide("wm.compressed.wm_phonegap_misc");
if(!dojo._hasResource["wm.base.components.NavigationService"]){
dojo._hasResource["wm.base.components.NavigationService"]=true;
dojo.provide("wm.base.components.NavigationService");
dojo.declare("wm.NavigationService",wm.Service,{layer:"",layers:"",operation:"",_operations:{gotoLayer:{parameters:{layer:{type:"wm.Layer"},showOnlyParentLayer:{type:"boolean"}},returnType:"any",hint:"This operations displays the selected layer."},nextLayer:{parameters:{layers:{type:"wm.Layers"}},returnType:"any",hint:"The operation displays the next layer in the selected layers widget."},previousLayer:{parameters:{layers:{type:"wm.Layers"}},returnType:"any",hint:"The operation displays the previous layer in the selected layers widget."},gotoPage:{parameters:{pageName:{type:"string"}},returnType:"any",hint:"This operation displays a different page and requires a pageName."},gotoPageContainerPage:{parameters:{pageName:{type:"string"},pageContainer:{type:"wm.PageContainer"}},returnType:"any",hint:"This operation displays a page in a pageContainer and requires both a pageContainer and a pageName."},gotoDialogPage:{parameters:{pageName:{type:"string"},hideControls:{type:"boolean"},title:{type:"string"},modal:{type:"boolean"},width:{type:"number"},height:{type:"number"}},returnType:"any",hint:"This operation displays a page in a dialog."},showToast:{parameters:{content:{type:"string"},duration:{type:"number"},cssClasses:{type:"string"},dialogPosition:{type:"string"}},returnType:"any",hint:"This operation displays a page in a dialog."}},update:function(){
this[this.operation||"gotoLayer"]();
},invoke:function(_1,_2,_3){
var d=this._deferred=new dojo.Deferred(),m=this[_1];
if(m){
_2.push(_3);
m.apply(this,_2);
}else{
this.onError();
d.errback("operation: "+_1+" does not exist.");
}
return d;
},doResult:function(){
if(this._resultConnect){
dojo.disconnect(this._resultConnect);
this._resultConnect=null;
}
this.onResult();
if(this._deferred&&this._deferred.fired==-1){
this._deferred.callback(true);
}
this._deferred=null;
},gotoLayer:function(_4,_5){
var l=_4 instanceof wm.Layer?_4:null;
if(l){
this.showLayer(l,_5);
}
this.doResult();
},nextLayer:function(_6){
var l=_6 instanceof wm.Layers?_6:null;
if(l){
l.setNext();
}
this.doResult();
},previousLayer:function(_7){
var l=_7 instanceof wm.Layers?_7:null;
if(l){
l.setPrevious();
}
this.doResult();
},showLayer:function(_8,_9){
var l=_8;
while(l){
wm.fire(l,"activate");
l=l.parent;
if(_9){
break;
}
}
},gotoPage:function(_a,_b){
var _c=_b.getParentPage();
if(!app._page||!_c||_c==app._page){
this._resultConnect=dojo.connect(app,"onPageChanged",this,"doResult");
wm.job(this.getRuntimeId()+": PageChange",1,function(){
app.loadPage(_a);
});
}else{
if(_c.owner instanceof wm.PageContainer||_c.owner instanceof wm.PageContainerMixin){
this.gotoPageContainerPage(_a,_c.owner);
}
}
},gotoPageContainerPage:function(_d,_e){
if(_e){
if(_d!=_e.pageName){
this._resultConnect=dojo.connect(_e,"onPageChanged",this,"doResult");
_e.setPageName(_d);
}else{
this.doResult();
}
}else{
wm.logging&&undefined;
}
},gotoDialogPage:function(_f,_10,_11,_12,_13,_14){
this._resultConnect=dojo.connect(app.pageDialog,"onPageReady",this,"doResult");
app.pageDialog.showPage(_f,_10,String(_13||450)+"px",String(_14||300)+"px",_11,Boolean(_12));
},showToast:function(_15,_16,_17,_18){
app.createToastDialog();
app.toastDialog.showToast(_15,_16,_17,_18);
this._deferred.callback();
}});
wm.services.add({name:"navigationService",ctor:"wm.NavigationService",isClientService:true,clientHide:true});
dojo.declare("wm.NavigationCall",[wm.Component,wm.ServiceCall],{service:"navigationService",operation:"gotoLayer",processResult:function(_19){
if(!this.owner){
return;
}
return this.inherited(arguments);
},processError:function(_1a){
if(!this.owner){
return;
}
return this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.components.NotificationService"]){
dojo._hasResource["wm.base.components.NotificationService"]=true;
dojo.provide("wm.base.components.NotificationService");
dojo.declare("wm.NotificationService",wm.Service,{operation:"",_operations:{alert:{parameters:{text:{type:"string"}},returnType:"any"},confirm:{parameters:{text:{type:"string"},OKButtonText:{type:"string"},CancelButtonText:{type:"string"}},returnType:"any"},prompt:{parameters:{text:{type:"string"},defaultValue:{type:"string"},OKButtonText:{type:"string"},CancelButtonText:{type:"string"}},returnType:"StringData"},warnOnce:{parameters:{text:{type:"string"},cookieName:{type:"string"}},returnType:"StringData"},toast:{parameters:{text:{type:"string"},duration:{type:"number"},cssClasses:{type:"string"},dialogPosition:{type:"string"}},returnType:"any",hint:"This operation displays a page in a dialog."}},update:function(){
this[this.operation]();
},invoke:function(_1b,_1c,_1d){
var m=this[_1b];
var d;
if(m){
_1c.push(_1d);
var _1e=m.apply(this,_1c);
if(_1e instanceof dojo.Deferred){
d=_1e;
}
}else{
this.onError();
d.errback("operation: "+_1b+" does not exist.");
}
this._deferred=d||new dojo.Deferred();
return this._deferred;
},alert:function(_1f){
var d=new dojo.Deferred();
app.alert(_1f);
this.connectOnce(app.alertDialog,"onClose",function(){
d.callback();
});
return d;
},confirm:function(_20,_21,_22){
var d=new dojo.Deferred();
var ok=_21||wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK");
var _23=_22||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL");
app.confirm(_20,false,function(){
d.callback(true);
},function(){
d.errback();
},ok,_23,false);
return d;
},prompt:function(_24,_25,_26,_27){
var d=new dojo.Deferred();
var ok=_26||wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK");
var _28=_27||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL");
app.prompt(_24,_25,function(_29){
d.callback(_29);
},function(){
d.errback();
},ok,_28);
return d;
},warnOnce:function(_2a,_2b){
var d=new dojo.Deferred();
if(!app.warnOnce(_2b,_2a)){
d.callback();
}else{
this.connectOnce(app.alertDialog,"onClose",function(){
d.callback();
});
}
return d;
},toast:function(_2c,_2d,_2e,_2f){
var d=new dojo.Deferred();
app.createToastDialog();
app.toastDialog.showToast(_2c,_2d,_2e,_2f);
d.callback();
return d;
}});
wm.services.add({name:"notificationService",ctor:"wm.NotificationService",isClientService:true,clientHide:true});
dojo.declare("wm.NotificationCall",[wm.Component,wm.ServiceCall],{service:"notificationService",operation:"alert",processResult:function(_30){
switch(this.operation){
case "alert":
case "confirm":
case "prompt":
case "warnOnce":
this.onOk(_30);
break;
}
this.onClose();
},processError:function(){
this.onCancel();
this.onClose();
},onCancel:function(){
},onOk:function(_31){
},onClose:function(){
}});
wm.Object.extendSchema(wm.NotificationCall,{owner:{group:"common",order:1,readonly:true,options:["Page","Application"]},service:{ignore:1,writeonly:1},operation:{group:"data",order:1},updateNow:{ignore:1},queue:{ignore:1},clearInput:{group:"operation",operation:1,order:30},input:{group:"data",order:3,putWiresInSubcomponent:"input",bindTarget:1,treeBindField:true,editor:"wm.prop.NavigationGroupEditor"},inFlightBehavior:{ignore:1},autoUpdate:{ignore:1},startUpdate:{ignore:1},onError:{ignore:1},onSuccess:{ignore:1},onBeforeUpdate:{ignore:1},onCanUpdate:{ignore:1}});
}
if(!dojo._hasResource["wm.base.components.PhoneGapService"]){
dojo._hasResource["wm.base.components.PhoneGapService"]=true;
dojo.provide("wm.base.components.PhoneGapService");
dojo.declare("wm.PhoneGapService",wm.Service,{operation:"",_operations:{contacts_read:{parameters:{filter:{type:"string"}},returnType:"[phonegap.Contact]"},contacts_delete:{parameters:{id:{type:"number"}},returnType:"any"},contacts_save:{parameters:{contact:{type:"phonegap.Contact"}},returnType:"any"},notification_beep:{parameters:{times:{type:"number"}},returnType:"any"},notification_vibrate:{parameters:{miliseconds:{type:"number"}},returnType:"any"},capture_audio:{parameters:{},returnType:"StringData"},capture_picture:{parameters:{quality:{type:"number"},sourceType:{type:"string"},allowEdit:{type:"boolean"}},returnType:"StringData"},geolocation_getCurrentPosition:{parameters:{enableHighAccuracy:{type:"boolean"},timeout:{type:"number"},maximumAge:{type:"number"}},returnType:"phonegap.Coordinates"}},update:function(){
this[this.operation]();
},invoke:function(_32,_33,_34){
var d=this._deferred=new dojo.Deferred(),m=this[_32];
if(m){
_33.push(_34);
var _35=m.apply(this,_33);
if(_35 instanceof dojo.Deferred){
d=this._deferred=_35;
}
}else{
this.onError();
d.errback("operation: "+_32+" does not exist.");
}
return d;
},geolocation_getCurrentPosition:function(_36,_37,_38){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.geolocation.getCurrentPosition(dojo.hitch(this,function(_39){
d.callback(_39.coords);
}),function(_3a){
d.errback(_3a);
},{enableHighAccuracy:_36||false,timeout:_37||5000,maximumAge:_38||1200000});
}
return d;
},capture_audio:function(){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.device.capture.captureAudio(dojo.hitch(this,function(_3b){
var _3c=_3b[0].fullPath;
var _3d=_3b[0].name;
this.readDataUrl(_3c,d);
}),function(_3e){
this.handleCaptureError(_3e.code,d);
},{limit:1});
}
return d;
},capture_picture:function(_3f,_40,_41){
var _42={destinationType:Camera.DestinationType.DATA_URL};
if(!_40){
_42.sourceType=Camera.PictureSourceType.CAMERA;
}else{
_42.sourceType=Camera.PictureSourceType[_40.toUpperCase()];
}
_42.allowEdit=Boolean(_41);
if(_3f!==undefined&&_3f!==null){
_42.quality=_3f;
}
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.camera.getPicture(dojo.hitch(this,function(_43){
d.callback({dataValue:"data:image/jpeg;base64,"+_43});
}),dojo.hitch(this,function(_44){
this.handleCaptureError(_44.code,d);
}),_42);
}
return d;
},handleCaptureError:function(_45,d){
switch(_45){
case 20:
d.errback("CAPTURE_NOT_SUPPORTED");
break;
case 0:
d.errback("CAPTURE_INTERNAL_ERR");
break;
case 1:
d.errback("CAPTURE_APPLICATION_BUSY");
break;
case 2:
d.errback("CAPTURE_INVALID_ARGUMENT");
break;
case 3:
d.errback("CAPTURE_NO_MEDIA_FILES");
break;
default:
d.errback(_45);
}
},readDataUrl:function(_46,_47){
app.showLoadingDialog("Processing...");
var _48=new FileReader();
_48.onload=function(evt){
app.hideLoadingDialog();
_47.callback({dataValue:evt.target.result});
};
_48.onabort=_48.onerror=function(evt){
console.error("Reader Error:"+evt);
app.hideLoadingDialog();
_47.errback(evt);
};
_48.readAsDataURL(_46);
},notification_beep:function(_49){
var d=new dojo.Deferred();
d.callback();
if(window["PhoneGap"]){
navigator.notification.beep(_49||1);
}
return d;
},notification_vibrate:function(_4a){
var d=new dojo.Deferred();
d.callback();
if(window["PhoneGap"]){
navigator.notification.vibrate(_4a||100);
}
return d;
},contacts_delete:function(id){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _4b=navigator.contacts.create();
_4b.id=id;
_4b.remove(function(_4c){
d.callback(_4c);
},function(_4d){
console.error("ERROR: "+_4d);
d.errback(_4d);
});
}
return d;
},contacts_save:function(_4e){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _4f=navigator.contacts.create();
for(var _50 in _4e){
if(typeof _4e[_50]!="object"){
_4f[_50]=_4e[_50];
}
}
_4f.name=new ContactName();
for(var _50 in _4e.name){
_4f.name[_50]=_4e.name[_50];
}
_4f.addresses=[];
dojo.forEach(_4e.address,function(_51){
var a=new ContactAddress();
for(var _52 in _51){
a[_52]=_51[_52];
}
_4f.addresses.push(a);
});
_4f.phoneNumbers=[];
dojo.forEach(_4e.phoneNumbers,function(_53){
var a=new ContactField(_53.name,_53.dataValue,false);
_4f.phoneNumbers.push(a);
});
_4f.emails=[];
dojo.forEach(_4e.emails,function(_54){
var a=new ContactField(_54.name,_54.dataValue,false);
_4f.emails.push(a);
});
_4f.urls=[];
dojo.forEach(_4e.urls,function(_55){
var a=new ContactField(_55.name,_55.dataValue,false);
_4f.urls.push(a);
});
_4f.organization=new ContactOrganization();
for(var _50 in _4e.organization){
_4f.organization[_50]=_4e.organization[_50];
}
_4f.rawId=Number(_4f.id);
_4f.save(function(_56){
d.callback(_56);
},function(_57){
console.error("ERROR: "+_57);
d.errback(_57);
});
}
return d;
},contacts_read:function(_58){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _59=new ContactFindOptions();
if(_58!=undefined&&_58!==""){
_59.filter=_58;
}
_59.multiple=true;
var _5a=["displayName","name","nickname","phoneNumbers","emails","addresses","ims","organizations","birthday","note","photos","categories","urls"];
navigator.contacts.find(_5a,function(_5b){
var _5c=function(_5d){
var _5e=[];
if(_5d){
dojo.forEach(_5d,function(_5f){
_5e.push({name:_5f.type,dataValue:_5f.value});
});
}
return _5e;
};
for(var i=0;i<_5b.length;i++){
try{
_5b[i].phoneNumbers=_5c(_5b[i].phoneNumbers);
_5b[i].emails=_5c(_5b[i].emails);
_5b[i].urls=_5c(_5b[i].urls);
_5b[i].birthday=Number(_5b[i].birthday);
_5b[i].id=Number(_5b[i].id);
}
catch(e){
console.error(e);
}
}
d.callback(_5b);
},function(_60){
console.error("ERROR: "+_60);
d.errback(_60);
},_59);
}
return d;
}});
wm.services.add({name:"phoneGapService",ctor:"wm.PhoneGapService",isClientService:true,clientHide:true});
wm.typeManager.addType("phonegap.Contact",{internal:false,fields:{id:{type:"number",order:1,"exclude":["insert"],"include":["delete","read","update"],"noChange":["delete","read","update"],required:true},name:{type:"phonegap.ContactName",required:true},nickname:{type:"string",order:4},phoneNumbers:{type:"EntryData",isList:true,order:5},emails:{type:"EntryData",isList:true,order:6,hidden:true},addresses:{type:"phonegap.Address",isList:true,order:7,hidden:true},ims:{type:"EntryData",isList:true,order:8,hidden:true},organizations:{type:"phonegap.ContactOrganization",isList:true,order:9,hidden:true},birthday:{type:"java.util.Date",order:10},note:{type:"string",order:11},photos:{type:"StringData",isList:true,order:12,hidden:true},categories:{type:"StringData",isList:true,order:13,hidden:true},urls:{type:"EntryData",isList:true,order:14,hidden:true}}});
wm.typeManager.addType("phonegap.Address",{internal:false,fields:{pref:{type:"boolean",order:1},type:{type:"string",order:2},formatter:{type:"string",order:3},streetAddress:{type:"string",order:4},locality:{type:"string",order:5},region:{type:"string",order:6},postalCode:{type:"string",order:7},country:{type:"string",order:8}}});
wm.typeManager.addType("phonegap.ContactOrganization",{internal:false,fields:{pref:{type:"boolean",order:1},type:{type:"string",order:2},name:{type:"string",order:3},department:{type:"string",order:4},title:{type:"string",order:5}}});
wm.typeManager.addType("phonegap.ContactName",{internal:false,fields:{formatted:{type:"string",order:1},familyName:{type:"string",order:2},givenName:{type:"string",order:3},middleName:{type:"string",order:4},honorificPrefix:{type:"string",order:5},honorificSuffix:{type:"string",order:6}}});
wm.typeManager.addType("phonegap.Coordinates",{internal:false,fields:{latitude:{type:"number",order:1},longitude:{type:"number",order:2},altitude:{type:"number",order:3},accuracy:{type:"number",order:4},altitudeAccuracy:{type:"number",order:5},heading:{type:"number",order:6},speed:{type:"number",order:7}}});
dojo.declare("wm.PhoneGapCall",[wm.ServiceVariable],{_deviceReady:false,service:"phoneGapService",operation:"contacts_read",postInit:function(){
this.inherited(arguments);
document.addEventListener("deviceready",dojo.hitch(this,"_onDeviceReady"),false);
},_onDeviceReady:function(){
this._deviceReady=true;
if(this.autoUpdate||this.startUpdate){
this.update();
}
},update:function(){
if(this._deviceReady){
return this.inherited(arguments);
}
},updateInternal:function(){
if(this._deviceReady){
return this.inherited(arguments);
}
}});
wm.Object.extendSchema(wm.PhoneGapCall,{owner:{group:"common",order:1,readonly:true,options:["Page","Application"]},service:{ignore:1,writeonly:1},operation:{group:"data",order:1},updateNow:{ignore:1},queue:{ignore:1},clearInput:{group:"operation",operation:1,order:30},input:{group:"data",order:3,putWiresInSubcomponent:"input",bindTarget:1,treeBindField:true,editor:"wm.prop.NavigationGroupEditor"}});
}
if(!dojo._hasResource["wm.base.components.XhrService"]){
dojo._hasResource["wm.base.components.XhrService"]=true;
dojo.provide("wm.base.components.XhrService");
dojo.declare("wm.XhrService",wm.Service,{noInspector:true,operation:"",_operations:{basicRequest:{parameters:{url:{type:"string"},headers:{type:"EntryData",isList:1},requestType:{type:"string"},contentType:{type:"string"},useProxy:{type:"boolean"},parameters:{type:"EntryData",isList:true}},returnType:"string"}},invoke:function(_61,_62,_63){
var op=this._operations[_61];
var _64,_65,_66,url,_67,_68;
if(!op){
return;
}
if(op==this._operations.basicRequest){
url=_62[0];
_66=_62[1];
_65=_62[2]||"GET";
_67=_62[3]||"application/x-www-form-urlencoded";
_68=_62[4]===undefined?true:_62[4];
_64=_62[5];
var _69={};
dojo.forEach(_66,function(_6a){
_69[_6a.name]=_6a.dataValue;
});
var _6b={};
dojo.forEach(_64,function(p){
_6b[p.name]=p.dataValue;
});
return this._invokeBasicRequest(url,_69,_65,_67,_68,_6b,"string",_63);
}else{
var _6c=op.parameters;
_64={};
var i=0;
wm.forEachProperty(_6c,function(_6d,_6e){
_64[_6e]=_62[i];
i++;
});
url=op.url;
_66=dojo.clone(op.headers)||{};
if(op.requestType!==undefined){
_65=op.requestType;
}else{
if(_64.requestType){
type=_64.requestType;
delete _64.requestType;
}else{
type="GET";
}
}
if(op.contentType){
_67=op.contentType;
}else{
if(_64.contentType){
_67=_64.contentType;
delete _64.contentType;
}else{
_67="application/x-www-form-urlencoded";
}
}
if(op.useProxy!==undefined){
_68=op.useProxy;
}else{
_68=_64.useProxy;
delete _64.useProxy;
}
var _6f={};
wm.forEachProperty(op.parameters,function(_70,_71){
var _72=_64[_71];
if(_70.transmitType=="header"){
_66[_71]=_64[_71];
}else{
if(_70.transmitType=="path"){
if(!url.match(/\/$/)){
url+="/";
}
url+=_71+"/"+(typeof _72=="string"&&!_70.noEscape?escape(_72):_72);
}else{
if(_64[_71]!==undefined){
_6f[_71]=typeof _72=="string"&&!_70.noEscape?escape(_72):_72;
}
}
}
});
return this._invokeBasicRequest(url,_66,_65,_67,_68,_6f,op.returnType,op,_63);
}
},_invokeBasicRequest:function(url,_73,_74,_75,_76,_77,_78,op,_79){
var d=new dojo.Deferred();
if(wm.useProxyJsonServices!==undefined){
_76=wm.useProxyJsonServices;
}
_74=_74.toUpperCase();
var _7a;
switch(_75){
case "application/json":
_7a=_76?dojo.toJson(_77):_77;
break;
case "application/x-www-form-urlencoded":
if(!_76){
_7a=_77;
}else{
_7a="";
wm.forEachProperty(_77,function(_7b,key){
if(_7a){
_7a+="&";
}
_7a+=escape(key)+"="+escape(_7b);
});
}
break;
}
if(_76){
if(this.jsonRpcService&&!this.jsonRpcService._service){
this.jsonRpcService.destroy();
delete this.jsonRpcService;
}
if(!this.jsonRpcService){
this.jsonRpcService=new wm.JsonRpcService({owner:_79,service:"waveMakerService"});
this.defaultHeaders=dojo.clone(this.jsonRpcService._service.requestHeaders);
}
this.jsonRpcService._service.requestHeaders=dojo.mixin(_73,this.defaultHeaders);
var _7c=this.jsonRpcService.requestAsync("remoteRESTCall",[url,_7a,_74,_75]);
}else{
var _7d={headers:_73,handleAs:"text",contentType:_75,url:url};
if(_74=="GET"){
var _7e="";
wm.forEachProperty(_77,function(_7f,_80){
if(_7f!==null&&_7f!==undefined){
if(_7e){
_7e+="&";
}
_7e+=_80+"="+_7f;
}
});
if(_7e&&url.match(/\?/)){
url+="&"+_7e;
}else{
url+="?"+_7e;
}
_7d.url=url;
}else{
_7d.postData=dojo.toJson(_77);
}
var _7c=this._deferred=dojo.xhr(_74,_7d);
}
_7c.addCallbacks(dojo.hitch(this,"onResult",_77,op,d),dojo.hitch(this,"onError",_77,op,d));
return d;
},onResult:function(_81,_82,_83,_84){
var _85;
try{
if(_84&&_84.match(/^\s*\{/)){
_85=dojo.fromJson(_84);
}else{
_85={dataValue:_84};
}
}
catch(e){
_85=_84;
}
var _86=wm.typeManager.getType(_82.returnType);
if(_86&&_86.fields){
wm.forEachProperty(_86.fields,function(_87,_88){
if(_87.type.toLowerCase()=="date"&&typeof _85[_88]=="string"){
_85[_88]=new Date(_85[_88]).getTime();
}
});
}
_83.callback(_85);
},onError:function(_89,_8a,_8b,_8c){
_8b.errback(_8c);
},addOperation:function(_8d){
if(_8d.useProxy===undefined){
_8d.parameters.useProxy=this._operations.basicRequest.parameters.useProxy;
}
if(!_8d.returnType){
_8d.returnType="string";
}
if(!_8d.contentType){
_8d.contentType="application/x-www-form-urlencoded";
}
this._operations[_8d.name]=_8d;
},removeOperation:function(_8e){
delete this._operations[_8e];
}});
wm.services.add({name:"xhrService",ctor:"wm.XhrService",isClientService:true,clientHide:false});
dojo.declare("wm.XhrDefinition",wm.Component,{noInspector:true,url:"",requestType:"GET",headers:null,useProxy:true,parameters:null,returnType:"string",contentType:"application/x-www-form-urlencoded",postInit:function(){
this.inherited(arguments);
this.initType();
},destroy:function(){
wm.XhrService.prototype.removeOperation(this.name);
this.inherited(arguments);
},initType:function(){
if(this.url){
wm.XhrService.prototype.addOperation({name:this.name,url:this.url,requestType:this.requestType,headers:this.headers,parameters:this.parameters,useProxy:this.useProxy,contentType:this.contentType,returnType:this.returnType});
}
},designSelect:function(){
var d=studio.navGotoEditor("XHRServiceEditor",studio.webServiceTab,this.name+"Layer",this.name);
d.page.setService(this);
}});
wm.Object.extendSchema(wm.XhrDefinition,{returnType:{type:"string"},url:{type:"string"},useProxy:{type:"boolean"},requestType:{type:"string"},contentType:{type:"string"},parameters:{type:"any"},headers:{type:"any"}});
}
if(!dojo._hasResource["wm.base.components.Page"]){
dojo._hasResource["wm.base.components.Page"]=true;
dojo.provide("wm.base.components.Page");
dojo.connect(window,"onresize",function(){
dojo.publish("window-resize");
});
var wmObjectList=[];
wm.getObject=function(_8f){
if(!wmObjectList[_8f]){
wmObjectList[_8f]=dojo.getObject(_8f);
}
return wmObjectList[_8f];
};
dojo.declare("wm.Page",wm.Component,{validateVisibleOnly:false,i18n:false,name:"",deletionDisabled:1,enableMobileFolding:false,create:function(){
this.inherited(arguments);
if(!this.name){
this.name=this.declaredClass.toLowerCase();
}
wm.Page.registerPage(this);
this.render();
},getMainPage:function(){
if(!this.owner){
return null;
}
var _90=this.owner;
while(_90.owner){
_90=_90.owner;
}
if(_90 instanceof wm.Application){
return _90;
}
},destroy:function(){
wm.Page.deregisterPage(this);
var _91=this.getMainPage();
if(_91){
_91.subPageUnloaded(this);
}
if(window.app){
window.app.subPageUnloaded(this);
}
wm.fire(this.root,"destroy");
this.inherited(arguments);
delete this.app;
delete this.domNode;
delete this.root;
_91=null;
delete this._designee;
},init:function(){
this.app=window.app;
if(this.owner==app.pageContainer){
window[this.name]=this;
}
this.owner[this.name]=this;
this.inherited(arguments);
},forEachWidget:function(_92){
if(this.root){
return wm.forEachWidget(this.root,_92);
}
},render:function(){
var _93=(this.owner!=app.pageContainer);
var d=_93?this.domNode||document.body:app.appRoot.domNode;
var ds=d.style;
dojo.addClass(d,this.declaredClass);
var _94=ds.left;
if(_93){
ds.left="-100000px";
}
wm.timePage&&undefined;
this._loadingPage=true;
var _95=new Date().getTime();
var _96=this.constructor.widgets||this.widgets;
if(wm.isEmpty(_96)&&!this.isDesignLoaded()){
console.error("Page "+this.name+" has been corrupted, and no longer has a wm.Layout nor any widgets; please create a new project or edit "+this.name+".widgets.js by hand");
if(!wm.disablePageLoadingToast){
app.toastError(wm.getDictionaryItem("wm.Page.PAGE_ERRORS",{name:this.name}));
}
}
if(this.owner){
this.locationState=(this.owner==app.pageContainer)?app.locationState:this.owner._locationState;
}
if(wm.useDojoParser){
var _97=wm._dojoParserCurrentOwner;
wm._dojoParserCurrentOwner=this;
var _98=this.owner._pageLoader.htmlLoader.getHtmlNode();
while(_98.childNodes.length){
if(_98.firstChild){
this.domNode.appendChild(_98.firstChild);
}else{
_98.removeChild(_98.firstChild);
}
}
var _99=dojo.parser.parse(this.domNode);
wm._dojoParserCurrentOwner=_97;
}else{
if(app.debugDialog){
this.debugId=app.debugDialog.newLogEvent({eventType:"loadComponents",sourceDescription:"Page Loading",resultDescription:this.name+" page's widgets and components initialized",method:"loadComponents",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()});
}
this.loadComponents(_96,null);
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
}
wm.timePage&&undefined;
var _9a=this;
dojo.addOnLoad(dojo.hitch(this,function(){
this.postRender();
if(_93){
ds.left=_94;
}
if(!this.root.isAncestorHidden()){
this.onShow();
}
}));
},postRender:function(){
wm.timePage&&undefined;
wm.fire(this.root,"reflow");
wm.timePage&&undefined;
wm.fire(this,"unloadSupport");
try{
this._loadingPage=false;
if(this.root){
this.reflow();
}
if(app.debugDialog){
this.debugId=app.debugDialog.newLogEvent({eventType:"start",sourceDescription:"",resultDescription:this.name+".start()",method:"start",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()});
}
var _9b=this.owner?this.owner._restoreBackState:undefined;
if(!window["studio"]||!studio.page||this!=studio.page&&!this.isAncestor(studio.page)){
this.start(_9b,this.locationState);
}
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
this._startCalled=true;
if(wm.debugPerformance){
var _9c=this.stopTimerWithName("LoadPage","wm.Layout");
}
this.onStart();
}
catch(e){
console.error("Failed to initialize page "+this.name+"; "+e);
}
},start:function(){
},reflow:function(){
wm.fire(this.root,"reflow");
},addComponent:function(_9d){
this[_9d.name]=_9d;
if(_9d instanceof wm.Control){
if(this._designer&&dojo.isIE<=8){
var s=_9d.domNode&&dojo.getComputedStyle(_9d.domNode);
if(s&&s.backgroundImage=="none"){
_9d.domNode.style.backgroundImage="url(images/blank.gif)";
}
}
}
this.inherited(arguments);
},removeComponent:function(_9e){
delete this[_9e.name];
this.inherited(arguments);
},isDesignLoaded:function(){
return this.name=="wip";
},getRoot:function(){
return this;
},getId:function(_9f){
return _9f;
},getRuntimeId:function(_a0){
_a0=this.name+(_a0?"."+_a0:"");
return this.owner!=app.pageContainer?this.owner.getRuntimeId(_a0):_a0;
},getComponent:function(_a1){
return this.components[_a1]||this[_a1]||this.owner&&this.owner.getComponent(_a1);
},_create:function(_a2,_a3){
if(_a2.prototype instanceof dijit._Widget&&window.dijit){
return new wm.DijitWrapper(dojo.mixin(_a3||{},{dijitClass:_a2,publishClass:p.declaredClass}));
}
return this.inherited(arguments);
},warnDroppedWidgets:function(_a4,_a5,_a6,_a7){
if(_a7){
console.warn(_a4+" was not loaded because its parent was not loaded");
}else{
console.warn(_a4+" was not loaded because its deviceType property is "+_a5+" and app is running as "+wm.device);
}
if(_a6){
wm.forEachProperty(_a6,dojo.hitch(this,function(w,_a8){
if(_a8!="binding"){
this.warnDroppedWidgets(_a8,_a5,w[3],true);
}
}));
}
},loadComponent:function(_a9,_aa,_ab,_ac,_ad,_ae,_af){
if(!this._isDesignLoaded&&_ac.deviceType&&wm.device&&dojo.indexOf(_ac.deviceType,wm.device)==-1){
if(djConfig.isDebug){
this.warnDroppedWidgets(_a9,_ac.deviceType.join(","),_ae);
}
return;
}
if(wm.debugPerformance){
if(_ab=="wm.Layout"){
if(dojo.isFF){
console.groupCollapsed("LOAD COMPONENT "+_ab+": "+_a9);
}else{
}
}
this.startTimerWithName("LoadComponent",_ab);
this.startTimerWithName("LoadPage",_ab);
}
var _b0=wm.getObject(_ab);
if(!_b0){
try{
wm.getComponentStructure(_ab);
_b0=dojo.getObject(_ab);
}
catch(e){
}
if(!_b0){
_b0=wm.Box;
}
}
var _b1={};
isWidget=(_b0.prototype instanceof wm.Control||_b0.prototype instanceof dijit._Widget);
if(isWidget){
var _b2=(_aa?_aa.containerNode||_aa.domNode:this.domNode);
_b1={owner:this,parent:_aa,domNode:_b2?null:document.body,parentNode:_b2};
}
if(!_b1.owner){
if(_aa&&_aa instanceof wm.Layout){
_b1.owner=_aa.owner;
}else{
if(_aa){
_b1.owner=_aa;
}else{
_b1.owner=this;
}
}
}
_b1=dojo.mixin({},_ac,{name:_b1.owner.getUniqueName(_a9),_designer:this._designer,_loading:true},_b1);
if(this.isRelativePositioned&&_ab=="wm.Layout"){
_b1.isRelativePositioned=true;
}
if(!this.isDesignLoaded()){
for(var p in _b1){
if(p.indexOf("custom")==0&&dojo.isFunction(_b0.prototype[p])){
var _b3=_b1.owner;
_b1[p]=dojo.hitch(_b3,_b3[_b1[p]]);
}
}
}
var c=this._create(_b0,_b1);
if(!_aa&&isWidget){
c.moveable=false;
this.root=c;
}
this.makeEvents(_ad,c);
if(_ae){
this.loadComponents(_ae,c);
}
c.loaded();
var _b4=this.stopTimerWithName("LoadComponent",_ab);
if(wm.debugPerformance){
if(_ab=="wm.Layout"){
this.printPagePerformanceData();
}
}
return c;
},printPagePerformanceData:function(){
var _b5={};
for(var _b6 in wm.Component.timingByComponent){
var obj=wm.Component.timingByComponent[_b6];
var _b7=false;
for(var i in obj){
if(wm.sum(obj[i])>10){
_b7=true;
}
}
for(var i in obj){
if(!_b5[i]){
_b5[i]=0;
}
_b5[i]+=wm.sum(obj[i]);
}
}
for(var i in _b5){
}
},loadComponents:function(_b8,_b9){
for(var i in _b8){
try{
this.loadComponent(i,_b9,_b8[i][0],_b8[i][1]||{},_b8[i][2],_b8[i][3]);
}
catch(e){
console.error("FAILED TO LOAD "+"["+_b8[i][1].name+"] "+i+": ",e);
}
}
},onShow:function(){
},onStart:function(_ba){
},keydown:function(e){
for(var i=0;i<wm.dialog.showingList.length;i++){
if(wm.dialog.showingList[i].modal){
return;
}
}
if(this.owner!=app.pageContainer||this!=app._page){
return true;
}
var _bb=(e.target.tagName=="INPUT");
var chr=app._keys[e.keyCode];
var _bc=chr&&chr.length>1;
if(e.keyCode==dojo.keys.ESCAPE){
this.onEscapeKey();
}else{
if(e.shiftKey){
if(e.keyCode!=dojo.keys.SHIFT&&!_bb){
if(this.onShiftKey(chr)){
dojo.stopEvent(e);
}
}
}else{
if(e.ctrlKey){
if(e.keyCode!=dojo.keys.CTRL){
if(this.onCtrlKey(chr)){
dojo.stopEvent(e);
}
}
}else{
if(e.keyCode==dojo.keys.ENTER&&!_bb){
if(this.onEnterKey()){
dojo.stopEvent(e);
}
}else{
if(!_bb&&e.keyCode){
if(_bc){
if(this.onMiscKey(chr)){
dojo.stopEvent(e);
}
}else{
if(this.onLetterKey(chr)){
dojo.stopEvent(e);
}
}
}
}
}
}
}
},onEnterKey:function(){
},onShiftKey:function(_bd){
},onCtrlKey:function(_be){
},onEscapeKey:function(){
},onLetterKey:function(_bf){
},onMiscKey:function(_c0){
},toString:function(_c1){
var t=_c1||"";
if(this._loadingPage){
t+="; PAGE LOADING";
}
return this.inherited(arguments,[t]);
},_end:0});
wm.Page.extend({designCreate:function(){
this.inherited(arguments);
this.app=this.isDesignLoaded()?studio.application:app;
},unloadSupport:function(){
if(!this.isDesignLoaded()&&window.studio&&window.studio._isWaveMakerStudio){
this.constructor._supported=false;
this.constructor.widgets={};
}
},generateEventName:function(_c2){
return _c2;
},_getProp:function(n){
if(window["studio"]&&this==studio.page&&this.isEventProp(n)){
return (getEvent(n,studio.getScript()))?n:"";
}
return this.inherited(arguments);
},installDesignDictionary:function(_c3){
var _c4=studio.languageSelect.getDisplayValue();
var _c5=_c4==""||_c4=="default";
this._editLanguage=_c4;
var _c6=wm.listComponents([this],wm.Component,false);
for(var i=0;i<_c6.length;i++){
var c=_c6[i];
var _c7=c.listWriteableProperties();
for(var _c8 in _c7){
var _c9=c.getProp(_c8);
if(_c9===null||typeof _c9!="object"||_c9.declaredClass===undefined&&!wm.isNode(_c9)){
if(c["_original_i18n_"+_c8]!==undefined&&c["_original_i18n_"+_c8]!=_c9){
c.setProp(_c8,c["_original_i18n_"+_c8]);
_c9=c["_original_i18n_"+_c8];
delete c["_original_i18n_"+_c8];
}
if(!_c5){
c["_original_i18n_"+_c8]=(typeof _c9=="object")?dojo.clone(_c9):_c9;
}
}
}
}
this._designDictionary=_c3;
for(var _ca in _c3){
var c=this[_ca];
if(c instanceof wm.Component){
var _cb=_c3[_ca];
for(var _c8 in _cb){
c.setProp(_c8,_cb[_c8]);
}
}
}
},getLanguageWidgets:function(){
var _cc={};
var _cd=wm.listComponents([this],wm.Component,false);
for(var i=0;i<_cd.length;i++){
var c=_cd[i];
var _ce=c.listWriteableProperties();
for(var _cf in _ce){
if(c.hasLocalizedProp(_cf)){
if(!_cc[c.name]){
_cc[c.name]={};
}
_cc[c.name][_cf]=c.getProp(_cf);
}
}
}
return _cc;
},setPageProperty:function(_d0,_d1){
if(typeof _d1=="string"){
_d1="\""+_d1+"\"";
}
var _d2=studio.getScript();
var _d3=new RegExp("\""+_d0+"\": .*,");
if(_d2.match(_d3)){
_d2=_d2.replace(_d3,"\""+_d0+"\": "+_d1+",");
}else{
_d2=_d2.replace(/\{(.*?)\n/,"{$1\n\t\""+_d0+"\": "+_d1+",\n");
}
studio.setScript(_d2);
},getPageProperty:function(_d4){
if(typeof inValue=="string"){
inValue="\""+inValue+"\"";
}
var _d5=studio.getScript();
var _d6=new RegExp("\""+_d4+"\": (.*),");
var _d7=_d5.match(_d6);
if(_d7){
var _d8=_d7[1];
_d8=_d8.replace(/^\"/,"").replace(/\"$/,"");
if(typeof this[_d4]=="boolean"){
_d8=(_d8=="true");
}else{
if(typeof this[_d4]=="number"){
_d8=parseInt(_d8);
}
}
return _d8;
}
},setI18n:function(_d9){
this.i18n=Boolean(_d9);
if(this._isDesignLoaded){
this.setPageProperty("i18n",this.i18n);
}
},getI18n:function(){
return this.getPageProperty("i18n");
},setPreferredDevice:function(_da){
this.preferredDevice=_da;
if(this._isDesignLoaded){
this.setPageProperty("preferredDevice",this.preferredDevice);
}
},getPreferredDevice:function(){
return this.getPageProperty("preferredDevice");
},setValidateVisibleOnly:function(_db){
this.validateVisibleOnly=Boolean(_db);
if(this._isDesignLoaded){
this.setPageProperty("validateVisibleOnly",this.validateVisibleOnly);
}
},getValidateVisibleOnly:function(){
return this.getPageProperty("validateVisibleOnly");
},set_enableMobileFolding:function(_dc){
this.enableMobileFolding=Boolean(_dc);
if(this._isDesignLoaded){
this.setPageProperty("enableMobileFolding",this.enableMobileFolding);
if(studio.currentDeviceType=="phone"){
studio.mobileFoldingToggleButton.setDisabled(!_dc);
}
}
},onMobileFolding:function(){
},onMobileUnfolding:function(){
}});
wm.Object.extendSchema(wm.Page,{onStart:{events:["js","disableNoEvent"]},onShow:{events:["js","disableNoEvent"]},onShiftKey:{events:["js","disableNoEvent"]},onCtrlKey:{events:["js","disableNoEvent"]},onEscapeKey:{},onEnterKey:{},onLetterKey:{events:["js","disableNoEvent"]},onMiscKey:{events:["js","disableNoEvent"]},i18n:{group:"widgetName"},preferredDevice:{hidden:1},validateVisibleOnly:{group:"widgetName"},enableMobileFolding:{group:"widgetName"}});
wm.Part=wm.Page;
dojo.mixin(wm.Page,{byName:{},getPage:function(_dd,_de){
var _df=wm.Page.byName[wm.capitalize(_dd)];
if(_df&&_df.length){
if(_de===undefined){
_de=_df.length-1;
}
return _df[_de];
}
},registerPage:function(_e0){
if(!wm.Page.byName[_e0.declaredClass]){
wm.Page.byName[_e0.declaredClass]=[];
}
wm.Page.byName[_e0.declaredClass].push(_e0);
},deregisterPage:function(_e1){
var a=wm.Page.byName[_e1.declaredClass];
if(a){
wm.Array.removeElement(a,_e1);
}
}});
wm.getPage=wm.Page.getPage;
}
if(!dojo._hasResource["wm.base.components.HtmlLoader"]){
dojo._hasResource["wm.base.components.HtmlLoader"]=true;
dojo.provide("wm.base.components.HtmlLoader");
wm.getNodeIds=function(_e2){
var ids=[];
dojo.forEach(_e2.childNodes,function(n){
if(n.id){
ids.push(n.id);
}
});
return ids;
};
dojo.declare("wm.HtmlLoader",wm.Component,{url:"",html:"",relativeUrl:true,init:function(){
this.inherited(arguments);
this.inherited(arguments);
if(this.url){
this.setUrl(this.url);
}else{
this.setHtml(this.html);
}
},destroy:function(){
this.html=null;
dojo.destroy(this._htmlNode);
this._htmlNode=null;
this.inherited(arguments);
},setUrl:function(_e3){
this.url=_e3||"";
if(this.url){
var _e4=this.relativeUrl?this.getPath()+this.url:this.url;
this.setHtml(wm.load(_e4,true));
}
},setHtml:function(_e5){
this.clearHtml();
this.html=_e5||"";
if(this.html){
this.addHtml(this.html);
}
dojo.publish("wm-markupchanged");
},clearHtml:function(){
this.html="";
this.removeHtml();
},getHtmlNode:function(){
if(!this._htmlNode){
var n=this._htmlNode=document.createElement("div");
n.style.display="none";
document.body.appendChild(n);
}
return this._htmlNode;
},addHtml:function(_e6){
if(this.isDesignLoaded()){
var p=this.getPath();
_e6=_e6.replace(/<img([^>]*)src[^>]*=[^>]*(["'])([^(http:)\/][^>]*)\2/g,"<img$1src=\""+p+"$3\"");
}
var n=this.getHtmlNode();
n.innerHTML=[n.innerHTML,_e6].join("\n");
},removeHtml:function(){
var n=this.getHtmlNode();
if(n){
n.innerHTML="";
}
},getNodeIds:function(){
return wm.getNodeIds(this.getHtmlNode());
}});
}
if(!dojo._hasResource["wm.base.components.PageLoader"]){
dojo._hasResource["wm.base.components.PageLoader"]=true;
dojo.provide("wm.base.components.PageLoader");
wm.load=function(_e7,_e8,_e9){
if(djConfig.isDebug&&!dojo.isFF){
}
if(_e9){
return dojo.xhrGet({url:_e7,sync:false,preventCache:!_e8});
}else{
return dojo.xhrGet({url:_e7,sync:!Boolean(_e9),preventCache:!_e8}).results[0];
}
};
wm.dojoScriptLoader=function(uri){
try{
dojo._loadUri(uri);
}
catch(e){
console.error(e);
return false;
}
};
wm.gzScriptLoader=function(_ea){
try{
var _eb="resources/gzipped/";
dojo._loadUri(_eb+_ea.replace(/[.]/g,"/")+".js");
}
catch(e){
console.error("error while loading gzipped file ",e);
return false;
}
};
dojo.declare("wm.PageLoader",wm.Component,{init:function(){
this.randomNum=wm.saveTimestamp||Math.floor(Math.random()*1000000);
this.randomParam=window["PhoneGap"]?"":"?dojo.preventCache="+this.randomNum;
this.inherited(arguments);
this._pageConnections=[];
this.pageProps={};
this.cssLoader=new wm.CssLoader({owner:this,relativeUrl:false});
this.htmlLoader=new wm.HtmlLoader({owner:this,relativeUrl:false});
},pageConnect:function(){
var _ec=this.getPageCtor();
if(_ec){
var _ed=[_ec.prototype].concat(dojo._toArray(arguments));
this._pageConnections.push(dojo.connect.apply(dojo,_ed));
}
},_disconnectPage:function(){
dojo.forEach(this._pageConnections,dojo.disconnect);
},getPageCtor:function(){
return dojo.getObject(this.className||"");
},loadCombinedFiles:function(_ee,_ef){
var _f0=_ef+".a.js"+this.randomParam;
delete dojo._loadedUrls[_f0];
wm.dojoScriptLoader(_f0);
var _f1=dojo.getObject(_ee);
if(_f1){
this.cssLoader.setCss(_f1.prototype._cssText);
this.htmlLoader.setHtml(_f1.prototype._htmlText);
}
return _f1;
},loadController:function(_f2,_f3){
var _f4=dojo.getObject(_f2);
if(!_f4&&!djConfig.isDebug){
_f4=this.loadCombinedFiles(_f2,_f3);
}
if(!_f4){
var _f5=_f3+".js"+this.randomParam;
delete dojo._loadedUrls[_f5];
wm.dojoScriptLoader(_f5);
_f4=dojo.getObject(_f2);
}
if(!_f4){
if(!wm.disablePageLoadingToast){
app.toastError(wm.getDictionaryItem("wm.Page.PAGE_ERRORS",{name:_f2}));
}
console.error("Error parsing "+_f3+".js");
this.onError("Error parsing "+_f3+".js");
_f4=dojo.declare(_f2,wm.Page);
}
return _f4;
},loadSupport:function(_f6,_f7){
if(!_f6._supported){
this.cssLoader.setUrl(_f7+".css"+this.randomParam);
_f6.css=this.cssLoader.css;
this.htmlLoader.setUrl(_f7+".html"+this.randomParam);
_f6.html=this.htmlLoader.html;
_f6.html=_f6.css="";
var _f8=_f7+".widgets.js"+this.randomParam;
delete dojo._loadedUrls[_f8];
wm.dojoScriptLoader(_f8);
_f6._supported=true;
}
},unloadSupport:function(_f9){
if(!_f9){
_f9=this.getPageCtor();
}
if(_f9){
_f9.css=_f9.html="";
_f9._supported=false;
}
},loadPageCode:function(_fa){
var _fb=this.getPath()+wm.pagesFolder+_fa+"/"+_fa;
var _fc=dojo.getObject(_fa);
if(!_fc){
_fc=this.loadController(_fa,_fb);
}
if(_fc){
if(_fc.prototype._cssText===undefined||wm.isEmpty(_fc.widgets)){
this.loadSupport(_fc,_fb);
}
if(_fc.prototype.i18n){
try{
dojo["requireLocalization"]("language",_fa);
_fc.prototype._i18nDictionary=dojo.i18n.getLocalization("language",_fa);
}
catch(e){
}
}
}
return _fc;
},loadPage:function(_fd,_fe){
_fe=_fe||_fd;
if(!_fe){
wm.logging&&undefined;
return;
}
this.previousPage=this.page;
this.previousClassName=this.className;
this.className=_fd;
try{
var _ff=this.loadPageCode(_fd);
if(_ff){
this.onBeforeCreatePage();
this.createPage(_ff,_fe);
this.pageChanged();
this.unloadSupport(_ff);
}else{
console.error("Page not found:",_fd);
this.onError("Page not found:"+_fd);
}
if(!this.page||!this.page.root){
console.error("Page not found:",_fd);
this.onError("Page not loaded:"+_fd);
}
}
catch(e){
console.error("Page not found:",_fd);
this.onError(e);
}
},onError:function(_100){
},createPage:function(_101,_102){
var _103=dojo.mixin({name:_102,owner:this.owner,domNode:this.domNode,isRelativePositioned:this.isRelativePositioned},this.pageProps||{});
this.page=new _101(_103);
},destroyPage:function(_104){
this._disconnectPage();
if(_104){
wm.fire(_104,"destroy");
}
},destroy:function(){
this.destroyPage();
delete this.cssLoader;
delete this.htmlLoader;
this.inherited(arguments);
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
},pageChanged:function(){
this.onPageChanged(this.page,this.previousPage);
if(this.previousPage){
this.destroyPage(this.previousPage);
delete this.previousPage;
if(this.previousClassName){
try{
var _105=dojo.getObject(this.previousClassName);
_105._supported=false;
}
catch(e){
}
}
}
},onBeforeCreatePage:function(){
},onPageChanged:function(_106,_107){
},isDesignLoaded:function(){
if(!window["studio"]){
return false;
}
if(this.inherited(arguments)){
return true;
}
var o=this.owner;
while(o&&o instanceof wm.Application==false&&o!=studio.page){
o=o.owner;
}
if(o==studio.page){
return true;
}
return false;
}});
}
if(!dojo._hasResource["wm.base.components.Property"]){
dojo._hasResource["wm.base.components.Property"]=true;
dojo.provide("wm.base.components.Property");
dojo.declare("wm.Property",wm.Component,{property:"",bindTarget:true,bindSource:true,isEvent:false,readonly:false,type:"",init:function(){
this.inherited(arguments);
if(this._isDesignLoaded&&this.owner===studio.page){
this.type="";
this.designTimeInit();
}
}});
}
if(!dojo._hasResource["wm.base.components.ImageList"]){
dojo._hasResource["wm.base.components.ImageList"]=true;
dojo.provide("wm.base.components.ImageList");
dojo.declare("wm.ImageList",wm.Component,{width:32,height:32,colCount:100,iconCount:100,url:"",postInit:function(){
this.inherited(arguments);
if(this.iconCount<this.colCount){
this.iconCount=this.colCount;
}
this.createStyleSheet();
},createStyleSheet:function(){
var id=this.getImageClass();
var _108=dojo.byId(id);
if(!_108){
_108=this.domNode=document.createElement("style");
_108.id=id;
_108.type="text/css";
document.getElementsByTagName("head")[0].appendChild(_108);
}
var url=this.url;
if(this.url.indexOf("lib/")==0){
url=dojo.moduleUrl("lib").path.replace(/lib\/$/,"")+url;
}else{
if(this.isDesignLoaded()&&this.owner!=studio){
url="/"+studio.project.getProjectPath()+"/"+url;
}
}
var text="";
for(var i=0;i<this.iconCount;i++){
if(text){
text+=",";
}
text+="."+id+"_"+i;
}
text+="{background-image: url("+url+") !important;background-repeat:no-repeat !important;width:"+this.width+"px;height: "+this.height+"px;}\n";
for(var i=0;i<this.iconCount;i++){
var col=i%this.colCount;
var row=Math.floor(i/this.colCount);
text+="."+id+"_"+i+" {background-position: -"+this.width*col+"px -"+(this.height*row)+"px !important;}\n";
}
setCss(_108,text);
},destroy:function(){
dojo.destroy(this.domNode);
this.inherited(arguments);
},getImageClass:function(_109){
var id="";
if(this.owner instanceof wm.Application){
id+="app";
}else{
if(this.isDesignLoaded()&&this.owner==studio.page){
id+=studio.project.pageName;
}else{
if(this.owner instanceof wm.Page){
id+=this.owner.declaredClass;
}else{
id+=this.owner.getRuntimeId().replace(/\./g,"_");
}
}
}
id+="_"+this.name;
if(_109==undefined){
return id;
}else{
return id+"_"+_109;
}
},getImageHtml:function(_10a){
var col=_10a%this.colCount;
var row=Math.floor(_10a/this.colCount);
var url=this.url;
if(this.url.indexOf("lib/")==0){
url=dojo.moduleUrl("lib").path.replace(/lib\/$/,"")+url;
}else{
if(this.isDesignLoaded()&&this.owner!=studio){
url="/"+studio.projectPrefix+studio.project.getProjectPath()+"/"+url;
}
}
return "<image src=\""+wm.theme.getImagesPath()+"blank.gif\""+" width=\""+this.width+"\""+" height=\""+this.height+"\""+" style=\""+"vertical-align: middle; "+"background:url("+url+") no-repeat "+(-this.width*col)+"px "+(-this.height*row)+"px;\""+">";
}});
}
if(!dojo._hasResource["wm.base.components.Binding"]){
dojo._hasResource["wm.base.components.Binding"]=true;
dojo.provide("wm.base.components.Binding");
dojo.declare("wm.Wire",wm.Component,{expression:"",source:"",targetProperty:"",targetId:"",destroy:function(){
this.disconnectWire();
this.inherited(arguments);
},setExpression:function(_10b){
this.expression=_10b||"";
this.connectWire();
},setSource:function(_10c){
this.source=_10c;
this.connectWire();
},setTargetProperty:function(_10d){
this.targetProperty=_10d;
this.connectWire();
},getFullTarget:function(){
return this.target.getId()+"."+this.targetProperty;
},canSetValue:function(){
if(this.expression){
var _10e=wm.expression.getSources(this.expression),ft=this.getFullTarget();
for(var i=0,s;(s=_10e[i]);i++){
if(s==ft){
wm.logging&&undefined;
return false;
}
}
}
return true;
},debugBindingEvent:function(_10f){
try{
if(app.debugDialog&&!this.isAncestor(app.debugDialog)&&!this.owner._inRefresh&&(!this.expression||this.expression.match(/\$/))){
var _110="";
if(this.source&&!this.expression){
var _111=this.source;
wm.disableLazyLoad=true;
var _112=this.getValueById(_111);
wm.disableLazyLoad=false;
while(_111&&_112 instanceof wm.Component==false){
if(_111.indexOf(".")!=-1){
_111=_111.substring(0,_111.lastIndexOf("."));
_112=this.getValueById(_111);
}else{
break;
}
}
if(_112){
_110=_112.getRuntimeId();
}else{
_110=this.source+" not found";
}
}else{
if(this.expression){
_110="expression";
}
}
if(_10f instanceof wm.Component){
_10f=_10f.getRuntimeId();
}else{
if(typeof _10f=="string"){
_10f="\""+_10f+"\"";
}else{
_10f=String(_10f);
}
}
this.debugId=app.debugDialog.newLogEvent({eventType:"binding",sourceDescription:this.owner._loading?"Binding initialized":(this.expression?"Bind expression has changed":this.source+" has changed"),resultDescription:this.target.getRuntimeId()+".setValue(\""+this.targetProperty+"\", "+_10f+")",eventName:this.expression?"Bind expression has changed":this.source+" has changed",affectedId:this.target.getRuntimeId(),firingId:_110,boundProperty:this.targetProperty,boundValue:_10f instanceof wm.Component?"${"+_10f.getRuntimeId()+"}":(typeof _10f=="object"&&_10f!==null&&_10f.length)?"[ARRAY]":_10f,boundSource:this.source,boundExpression:this.expression});
}
}
catch(e){
}
},endDebugBindingEvent:function(){
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
},_sourceValueChanged:function(_113){
if(wm.bindingsDisabled){
return;
}
var r=this.getRoot();
_113=this.expression?wm.expression.getValue(this.expression,r,r):_113;
if(this.canSetValue()){
this.debugBindingEvent(_113);
this.target.setValue(this.targetProperty,_113);
this.endDebugBindingEvent();
}
},sourceValueChanged:function(_114,inV2){
wm.logging&&undefined;
this._sourceValueChanged(_114);
},sourceTopUpdated:function(_115,inId){
wm.logging&&undefined;
this.refreshValue();
},sourceRootUpdated:function(){
wm.logging&&undefined;
if(this.source){
this.getValueById(this.source);
}
},refreshValue:function(){
try{
if(this._isDesignLoaded&&this.source&&this.source.indexOf("[")==0&&this.getValueById(this.source)===null){
return;
}
this._sourceValueChanged(this.source?this.getValueById(this.source):"");
}
catch(e){
}
},disconnectWire:function(){
this._disconnect();
this._unsubscribe();
},_watch:function(_116,_117){
wm.logging&&undefined;
if(_116.match(/^\[.*\]\./)){
var pre="";
_116=_116.replace(/^\[(.*?)\]/,"$1");
}else{
var pre=_116.indexOf("app.")==0?"":_117;
}
var _118=pre+_116+"-changed";
this.subscribe(_118,this,"sourceValueChanged");
wm.logging&&undefined;
var oid=_116.split(".");
oid.pop();
oid=oid.join(".");
if(oid&&oid!="app"){
_118=pre+oid+"-ownerChanged";
this.subscribe(_118,this,"sourceTopUpdated");
wm.logging&&undefined;
var p=_116.split("."),_119=p.shift();
if(_119=="app"&&p.length){
_119+="."+p.shift();
}
if(_119!=oid){
_118=pre+_119+"-rootChanged";
this.subscribe(_118,this,"sourceRootUpdated");
wm.logging&&undefined;
}
}
},connectWire:function(){
this.disconnectWire();
this.target=this.target||(this.targetId?this.getRoot().getValueById(this.targetId):this.owner.owner);
if(!this.target){
this.bad=true;
return;
}
if(this.targetProperty&&(this.source||this.expression)){
this.subscribe("wmwidget-idchanged",this,"wireChanged");
var rid=this.getRootId();
if(this.expression){
dojo.forEach(wm.expression.getSources(this.expression),dojo.hitch(this,function(s){
this._watch(s,rid);
}));
}else{
this._watch(this.source,rid);
}
this.refreshValue();
}
},changeExpressionId:function(_11a,_11b){
var e=this.expression;
o="\\${"+_11a.replace(new RegExp("\\.","g"),"\\.");
n="${"+_11b,r=(e.match(o+"[\\.|}]"));
e=e.replace(new RegExp(o+"\\.","g"),n+".");
e=e.replace(new RegExp(o+"}","g"),n+"}");
this.expression=e;
return r;
},isPartialId:function(inId,_11c){
return (inId.indexOf(_11c)==0)&&(_11c.length==inId.length||inId.charAt(_11c.length)==".");
},isPartialRootId:function(inId,_11d){
if(!inId){
return;
}
inId=inId.match("^app.")?inId:this.getRootId()+inId;
return this.isPartialId(inId,_11d);
},getWireId:function(){
return (this.targetId?this.targetId+".":"")+this.targetProperty;
},wireChanged:function(_11e,_11f,_120,_121){
var _122,_123=this.getWireId();
if(this.expression){
_122=this.changeExpressionId(_11e,_11f);
}
if(this.isPartialRootId(this.source,_120)){
_122=true;
this.source=_11f+this.source.slice(_11e.length);
}
if(this.isPartialRootId(this.targetProperty,_120)){
_122=true;
this.targetProperty=_11f+this.targetProperty.slice(_11e.length);
}
if(this.isPartialRootId(this.targetId,_120)){
_122=true;
this.targetId=_11f+this.targetId.slice(_11e.length);
}
if(_122){
this.connectWire();
if(this.owner&&this.owner.wires){
delete this.owner.wires[_123];
this.owner.wires[this.getWireId()]=this;
}
}
}});
wm.Object.extendSchema(wm.Wire,{expression:{},source:{},targetProperty:{},targetId:{}});
dojo.declare("wm.Binding",wm.Component,{constructor:function(_124){
this.wires={};
},destroy:function(){
this.removeWires();
this.inherited(arguments);
},loaded:function(){
for(var i in this.components){
var c=this.components[i];
this.wires[c.getWireId()]=c;
c.connectWire();
}
this.inherited(arguments);
},refresh:function(){
this._inRefresh=true;
wm.forEachProperty(this.wires,function(w){
w.refreshValue();
});
this._inRefresh=false;
},addWire:function(_125,_126,_127,_128){
var id=(_125?_125+".":"")+_126;
this.removeWire(id);
var _129={name:this.getUniqueName("wire"),owner:this,targetId:_125,targetProperty:_126,source:_127,expression:_128};
var wire=this.wires[id]=new wm.Wire(_129);
wire.connectWire();
return wire;
},removeWire:function(_12a,_12b,_12c){
var wire=this.wires[_12a];
if(wire){
var s=_12b==undefined||_12b==wire.source,e=_12c==undefined||_12c==wire.expression;
if(s&&e){
wire.destroy();
delete this.wires[_12a];
}
}
},findWiresByProps:function(_12d){
var _12e=function(w){
for(var i in _12d){
if(_12d[i]!=w[i]){
return;
}
}
return true;
};
return this.findWires(_12e);
},findWires:function(_12f){
var f=[];
if(_12f){
wm.forEachProperty(this.wires,function(w){
if(_12f(w)){
f.push(w);
}
});
}
return f;
},removeWireByProps:function(_130){
var _131=this.findWiresByProps(_130);
this.removeWiresList(_131);
},removeWireByProp:function(_132){
var _133=false;
wm.forEachProperty(this.wires,dojo.hitch(this,function(w){
if(w.targetProperty==_132){
delete this.wires[_132];
w.destroy();
_133=true;
}
}));
return _133;
},removeWireList:function(_134){
dojo.forEach(_134,dojo.hitch(this,function(w){
this.removeWire(w.getWireId());
}));
},removeWires:function(){
wm.forEachProperty(this.wires,function(w){
w.destroy();
});
this.wires={};
},write:function(_135){
return !wm.isEmpty(this.wires)?this.inherited(arguments):null;
}});
}
if(!dojo._hasResource["wm.base.components.TypeDefinition"]){
dojo._hasResource["wm.base.components.TypeDefinition"]=true;
dojo.provide("wm.base.components.TypeDefinition");
dojo.declare("wm.TypeDefinitionField",wm.Component,{fieldType:"String",isObject:false,isList:false,fieldName:"",toTypeObj:function(){
return {type:this.fieldType,isObject:this.isObject,isList:this.isList};
}});
dojo.declare("wm.TypeDefinition",wm.Component,{internal:false,collection:"Fields",fields:null,postInit:function(){
delete this.fields;
this.doAddType();
},doRemoveType:function(){
if(!this.internal){
wm.typeManager.removeType(this.name);
}
if(this._isDesignLoaded&&studio.application&&!studio.application._isDestroying){
studio.typesChanged();
}
},doAddType:function(){
this.fieldsAsTypes={};
for(var i in this.$){
this.fieldsAsTypes[this.$[i].fieldName]=this.$[i].toTypeObj();
}
wm.typeManager.addType(this.name,{internal:this.internal,fields:this.fieldsAsTypes});
if(this._isDesignLoaded&&studio.application&&!studio.application._isDestroying){
studio.typesChanged();
studio.refreshComponentTree();
}
},destroy:function(){
wm.typeManager.removeType(this.name);
this._isDestroying=true;
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.components.Security"]){
dojo._hasResource["wm.base.components.Security"]=true;
dojo.provide("wm.base.components.Security");
wm.disableUserPrincipalCookie=false;
wm.login=function(args,_136,_137,_138,_139){
if(_138===undefined||_138==null){
_138={j_username:args[0],j_password:args[1]};
}
_138.acegiAjaxLogin="true";
var _13a=new dojo.Deferred();
var url=(_139?"/"+_139+"/":"")+"j_acegi_security_check";
if(wm.xhrPath){
url=wm.xhrPath+url;
}
var def=dojo.xhrPost({url:url,content:_138,handleAs:"json"});
var _13b=function(_13c){
if(_137){
_137(_13c.toString());
}
_13a.errback(_13c);
};
def.addErrback(_13b);
var _13d=function(_13e){
_13a.callback(_13e);
var _13f=location.protocol+"//"+location.host+location.pathname+location.search;
if(dojo.cookie.isSupported()&&!wm.disableUserPrincipalCookie){
var p={username:_138.j_username,roles:wm.getUserRoles(true)};
wm.setUserPrincipal(p);
}else{
wm.roles=wm.getUserRoles(true);
}
dojo.publish("wmRbacUpdate");
if(window["PhoneGap"]&&wm.serverTimeOffset===undefined){
app.getServerTimeOffset();
}
if(_136){
_136(_13e);
}else{
if(window["PhoneGap"]){
app.loadPage(app.pageContainer._initialPageName);
}else{
if(_13f!=_13e){
location.href=_13e;
}else{
if(app._page.name=="login"&&app.main!="login"){
app.loadPage(app.main);
}
}
}
}
};
def.addCallback(function(_140,_141){
if(_140.url){
_13d(_140.url);
}else{
if(_140.error){
_13b(new Error(_140.error));
}
}
});
return _13a;
};
wm.getUserPrincipal=function(){
return wm.disableUserPrincipalCookie?{}:dojo.fromJson(dojo.cookie("wmUserPrincipal"))||{};
};
wm.setUserPrincipal=function(_142){
dojo.cookie("wmUserPrincipal",dojo.toJson(_142));
};
wm.clearUserPrincipal=function(){
dojo.cookie("wmUserPrincipal",null,{expires:-1});
};
wm.getUserRoles=function(_143){
if(!_143){
if(!wm.disableUserPrincipalCookie){
if(wm.getUserPrincipal().roles){
return wm.getUserPrincipal().roles;
}
}else{
if(wm.roles){
return wm.roles;
}
}
}
var s=wm.securityService||(wm.securityService=new wm.JsonRpcService({name:"securityService",sync:true}));
try{
if(s.ready){
s.request("getUserRoles",null);
if(s.result){
return s.result;
}
}
}
catch(x){
}
};
wm.logoutSuccess=function(){
if(dojo.cookie.isSupported()&&!wm.disableUserPrincipalCookie){
wm.clearUserPrincipal();
}else{
wm.roles=[];
}
dojo.publish("wmRbacUpdate");
};
wm.logout=function(){
var s=wm.securityService||(wm.securityService=new wm.JsonRpcService({name:"securityService",sync:true,errorLevel:2}));
try{
if(s.ready){
s.request("logout",null);
window.location.reload();
}
}
catch(x){
}
};
}
if(!dojo._hasResource["wm.base.widget.layout.Layout"]){
dojo._hasResource["wm.base.widget.layout.Layout"]=true;
dojo.provide("wm.base.widget.layout.Layout");
wm.inLayout=function(_144){
if(!_144){
return false;
}
var s=_144.style;
return s&&s.zIndex>=0&&s.zIndex<=1&&s.display!="none"&&s.visibility!="hidden"&&_144.tagName!="SCRIPT"&&_144.nodeType==1;
};
dojo.declare("wm.layout.Base",null,{inFlow:function(_145){
return _145.showing&&(_145.inFlow!==false)&&(_145 instanceof wm.Dialog&&_145.docked||_145._forceShowing||wm.inLayout(_145.domNode));
},flow:function(_146){
},suggest:function(_147,_148,_149){
},suggestSize:function(_14a,_14b,_14c){
},insert:function(_14d,_14e,_14f){
}});
dojo.mixin(wm.layout,{registry:{},cache:{},register:function(_150,_151){
this.registry[_150]=_151;
},addCache:function(_152,_153){
this.cache[_152]=_153;
},listLayouts:function(){
var list=[];
for(var n in this.registry){
list.push(n);
}
return list;
}});
}
if(!dojo._hasResource["wm.base.widget.layout.Box"]){
dojo._hasResource["wm.base.widget.layout.Box"]=true;
dojo.provide("wm.base.widget.layout.Box");
dojo.declare("wm.layout.Box",wm.layout.Base,{flow:function(_154,_155){
if(this.direction=="h"){
this._flow(_154,"l","t","w","h",_154.horizontalAlign,_154.verticalAlign,_155);
}else{
this._flow(_154,"t","l","h","w",_154.verticalAlign,_154.horizontalAlign,_155);
}
if(!_155){
_154.renderControls();
}
if(_154._autoSizeList){
var c;
while(c=_154._autoSizeList.pop()){
c.doAutoSize(1,1);
}
}
},_flow:function(_156,_157,_158,_159,_15a,_15b,_15c,_15d){
if(_156.fitToContentHeight){
if(_156.layoutKind=="top-to-bottom"){
_15b="top";
}
}
if(_156.fitToContentWidth){
if(_156.layoutKind=="left-to-right"){
_15b="left";
}
}
this.handleAutoSizingWidgets(_156);
if(_156.autoScroll){
this.handleAutoScrollBars(_156);
}
var b=_156.getContentBounds();
var _15e=dojo.clone(b);
if(_156.autoScroll){
if(_156._preferredWidth>b.w){
b.w=_156._preferredWidth;
}
if(_156._preferredHeight>b.h){
b.h=_156._preferredHeight;
}
}
var _15f=this.calcFlexRatio(_156.c$,_159,b[_159]);
var _160=b[_159];
var _161=null;
if(_15f.free){
var free=_15f.free;
for(var i=0,c;c=_156.c$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_159]){
var _162=_15f.ratio*c._percEx[_159];
var size=Math.round(_162);
_161=c;
_160-=size;
var _163=_159=="w"?"minWidth":wm.isMobile?"minMobileHeight":"minHeight";
var min=c[_163];
if(size<min){
size=min;
}
free-=size;
}else{
_160-=c.bounds.w;
}
}
}
switch(_15b){
case "bottom":
case "right":
b[_157]+=free;
break;
case "middle":
case "center":
b[_157]+=free/2;
if(b[_157]<0){
b[_157]=0;
}
break;
}
}
var _164=b[_158];
var _165=b[_15a];
var _166=0;
var _167=0;
for(var i=0,c;c=_156.c$[i];i++){
if(this.inFlow(c)){
var _168=c._percEx[_159]?Math.round(_15f.ratio*c._percEx[_159]):NaN;
if(c._percEx[_159]&&!isNaN(_168)){
if(_161==c&&Math.abs(_160)<=1){
_168+=_160;
}
}
b[_159]=_168;
if(wm.isMobile&&isNaN(b.w)){
b.w=parseInt(c.width);
}
var _163=_159=="w"?"minWidth":wm.isMobile?"minMobileHeight":"minHeight";
if(b[_159]<c[_163]){
b[_159]=c[_163];
}
var _169;
if(c._percEx[_15a]){
_169=b[_15a]=Math.min(100,c._percEx[_15a])*_165*0.01;
}else{
_169=c.bounds[_15a];
if(_15a=="w"&&c.width&&parseInt(c.width)>_169){
_169=parseInt(c.width);
}
delete b[_15a];
}
b[_158]=_164;
if(c._percEx.h){
var _16a=c.getMinHeightProp();
if(_16a>b.h){
b.h=_16a;
if(_15a=="h"){
_169=b.h;
}
}
}
if(c._percEx.w){
var _16b=c.getMinWidthProp();
if(_16b>b.w){
b.w=_16b;
if(_15a=="w"){
_169=b.w;
}
}
}
switch(_15c){
case "justified":
if(djConfig.isDebug&&!wm.isInstanceType(_156,wm.Editor)&&_156.isDesignedComponent()&&_15a=="w"&&!wm.isInstanceType(_156,wm.Layers)&&!wm.isInstanceType(_156.owner,wm.Layers)){
dojo.deprecated("justified",_156.owner.toString()+":"+_156.toString()+"'s "+((_15a=="w")?"horizontalAlign":"verticalAlign")+" is set to 'justified', which may yield unexpected behaviors; please change this alignment in the property editor");
}
b[_15a]=_165;
break;
case "center":
case "middle":
if(_165>_169){
b[_158]=(_164+_165-_169)/2;
}else{
b[_158]=_164;
}
if(b[_158]<0){
b[_158]=0;
}
break;
case "bottom":
case "right":
b[_158]=Math.max(0,_164+_165-_169);
break;
}
if(wm.isMobile&&(b.w>_15e.w||isNaN(b.w)&&c.bounds.w>_15e.w)){
b.w=_15e.w;
}
c.setBounds(b.l,b.t,b.w,b.h);
c._renderEngineBoundsSet=true;
if(c.flow){
c.flow();
}
b[_157]+=Math.max(0,c.bounds[_159]);
_166=Math.max(_166,c.bounds[_15a]);
wm.flowees++;
}
}
},handleAutoSizingWidgets:function(_16c){
if(!_16c.isAncestorHiddenLayer()&&_16c.showing&&(!wm.isInstanceType(_16c,wm.Layer)||_16c.active)){
var _16d;
var _16e;
for(var i=0;i<_16c.c$.length;i++){
var c=_16c.c$[i];
if(c.showing){
if(c._needsAutoSize&&(c.autoSizeWidth||c.autoSizeHeight)){
var _16f=(c.owner instanceof wm.Page)?c.owner.root:c.owner;
if(!_16f._autoSizeList){
_16f._autoSizeList=[];
}
if(dojo.indexOf(_16f._autoSizeList,c)==-1){
_16f._autoSizeList.push(c);
}
}else{
if(c.fitToContent){
if(c.fitToContentHeight){
c.bounds.h=c.getPreferredFitToContentHeight();
}
if(c.fitToContentWidth){
c.bounds.w=c.getPreferredFitToContentWidth();
}
c.calcFitToContent();
if(c.fitToContentWidth){
_16e=true;
}
if(c.fitToContentHeight){
_16d=true;
}
}
}
}
}
}
},handleAutoScrollBars:function(_170){
if(_170.fitToContentHeight){
_170._xscrollY=false;
_171="hidden";
}else{
var _172=_170._preferredHeight=_170.getPreferredFitToContentHeight();
var _173=_172>_170.bounds.h;
var _171=(_173)?"auto":"hidden";
_170._xscrollY=(_171=="auto");
}
if(!wm.isFakeMobile&&_170.domNode.style.overflowY!=_171){
_170.domNode.style.overflowY=_171;
_170.domNode.scrollTop=0;
}
if(_170.fitToContentWidth){
_170._xscrollX=false;
_174="hidden";
}else{
var _175=_170._preferredWidth=_170.getPreferredFitToContentWidth();
var _176=_175>_170.bounds.w;
var _174=(_176)?"auto":"hidden";
}
_170._xscrollX=(_174=="auto");
if(!wm.isFakeMobile&&_170.domNode.style.overflowX!=_174){
_170.domNode.style.overflowX=_174;
_170.domNode.scrollLeft=0;
}
},calcFlexRatio:function(inC$,_177,_178){
var flex=0;
var free=_178;
var _179=0;
var _17a="getMin"+((_177=="h")?"Height":"Width")+"Prop";
var _17b=0;
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
_17b++;
}
}
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_177]){
var _17c=c[_17a]();
var _17d=(Number(c._percEx[_177])||0)/100*_178;
if(_17b==1){
flex=100;
_179+=_17c;
}else{
if(_17c<_17d){
flex+=Number(c._percEx[_177])||0;
_179+=_17c;
}else{
free-=Math.max(c.bounds[_177],c[_17a]());
}
}
}else{
free-=c.bounds[_177];
}
}
}
if(free-_179<0){
free-=_179;
}
if(flex&&flex<100){
flex=100;
}
var _17e;
if(flex&&free>0){
_17e=free/flex;
}else{
_17e=0;
}
return {free:free,ratio:_17e};
},getMaxFreeSpace:function(inC$,_17f,_180){
var free=_180;
var _181=0;
var _182="min"+((_17f=="h")?"Height":"Width");
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_17f]){
if(c[_182]){
_181+=c[_182];
}
}else{
free-=c.bounds[_17f];
}
}
}
if(free-_181<0){
free-=_181;
}
return free;
}});
dojo.declare("wm.layout.HBox",wm.layout.Box,{direction:"h",suggest:function(_183,_184,_185){
var x=0;
for(var i=0,c;c=_183.c$[i];i++){
if(this.inFlow(c)){
if(_185.l<c.bounds.l+c.bounds.w/2){
x=c.bounds.l-1;
break;
}
x=c.bounds.r;
_185.control=c;
}
}
if(!_185.control){
_185.control=_183;
}
var _186=dojo.coords(_183.domNode);
var _187=dojo.coords(_185.control.domNode);
var _188=_183.getStyleBounds();
if(_185.control==_183){
_185.l=_187.x;
}else{
_185.l=_187.x+_187.w;
}
_185.t=_186.y;
_185.h=_188.h;
_185.i=i;
}});
dojo.declare("wm.layout.VBox",wm.layout.Box,{direction:"v",suggest:function(_189,_18a,_18b){
var y=0;
for(var i=0,c;c=_189.c$[i];i++){
if(this.inFlow(c)){
if(_18b.t<c.bounds.t+c.bounds.h/2){
y=c.bounds.t-1;
break;
}
y=c.bounds.b;
_18b.control=c;
}
}
if(!_18b.control){
_18b.control=_189;
}
var _18c=dojo.coords(_189.domNode);
var _18d=dojo.coords(_18b.control.domNode);
var _18e=_189.getStyleBounds();
_18b.l=_18c.x;
if(_18b.control==_189){
_18b.t=_18d.y;
}else{
_18b.t=_18d.y+_18d.h;
}
_18b.w=_18e.w;
_18b.i=i;
}});
wm.layout.register("left-to-right",wm.layout.HBox);
wm.layout.register("top-to-bottom",wm.layout.VBox);
wm.layout.addCache("left-to-right",new wm.layout.HBox());
wm.layout.addCache("top-to-bottom",new wm.layout.VBox());
}
if(!dojo._hasResource["wm.base.widget.AppRoot"]){
dojo._hasResource["wm.base.widget.AppRoot"]=true;
dojo.provide("wm.base.widget.AppRoot");
dojo.declare("wm.AppRoot",wm.Container,{classNames:"",width:"",height:"",deviceSize:"",create:function(){
this.inherited(arguments);
this.deviceSize=wm.deviceSize||this.calcDeviceSize(window.innerWidth||document.documentElement.clientWidth);
app.valueChanged("deviceSize",this.deviceSize);
},build:function(){
this.domNode=this.owner.domNode=dojo.byId(this.owner.domNode)||document.body;
this.domNode.style.cssText+=this.style+"overflow: hidden; position: relative;";
},init:function(){
var _18f=this.domNode.id;
this.inherited(arguments);
this.domNode.id=_18f;
this._isOldAndroidBrowser=(navigator.vendor||"").match(/Google/i)&&navigator.userAgent.match(/android/i);
if(!this._isOldAndroidBrowser&&"onorientationchange" in window){
window.addEventListener("orientationchange",dojo.hitch(this,"resize"));
}else{
this.subscribe("window-resize",this,"resize");
}
},getRuntimeId:function(){
return "approot";
},_onOrientationChange:function(){
this._inResize=true;
var _190=Math.min(screen.width,window.innerWidth);
var _191=Math.min(screen.height,window.innerHeight);
var max=Math.max(_190,_191);
var min=Math.min(_190,_191);
switch(window.orientation){
case 90:
case -90:
case 270:
this.setBounds(null,null,max,min);
if(app.appTitleBar){
app.appTitleBar.hide();
}
break;
default:
this.setBounds(null,null,min,max);
if(app.appTitleBar){
app.appTitleBar.show();
}
}
app.valueChanged("deviceSize",this.deviceSize);
dojo.publish("deviceSizeRecalc");
this.reflow();
this._inResize=false;
},resize:function(){
this._inResize=true;
if(!wm.deviceSize){
var _192=this.deviceSize;
this.updateBounds();
this.deviceSize=this.calcDeviceSize(this.bounds.w);
if(_192!=this.deviceSize){
app.valueChanged("deviceSize",this.deviceSize);
dojo.publish("deviceSizeRecalc");
}
}
this.reflow();
if(this._isOldAndroidBrowser&&app.wmMinifiedDialogPanel){
app.wmMinifiedDialogPanel.hide();
wm.onidle(app.wmMinifiedDialogPanel,"show");
}
this._inResize=false;
},updateBounds:function(){
this._percEx={w:100,h:100};
var pn=this.domNode.parentNode;
var _193,_194;
if(window["PhoneGap"]){
_194=Math.min(screen.height,window.innerHeight);
pn.style.height=_194+"px";
_193=Math.min(screen.width,window.innerWidth||20000);
}else{
if(wm.isIOS){
if(window.orientation==90||window.orientation==-90){
var min=Math.min(window.innerWidth,window.innerHeight);
var max=Math.max(window.innerWidth,window.innerHeight);
_193=max;
_194=min;
}else{
_194=Math.max(window.innerHeight,window.innerWidth);
_193=Math.min(window.innerHeight,window.innerWidth);
}
this.domNode.style.position="relative";
}else{
if(wm.device=="phone"){
}else{
if(wm.isMobile){
pn.style.height="100%";
}
}
}
}
if(wm.isMobile){
if(!_193){
_193=Math.min(screen.width,window.innerWidth||20000,pn.offsetWidth);
}
if(!_194){
_194=Math.min(screen.height,window.innerHeight||20000,pn.offsetHeight||1000);
}
}else{
_193=pn.offsetWidth;
_194=pn.offsetHeight;
}
this.setBounds(0,0,_193,_194);
},forceRerenderComponents:function(wIn){
wm.forEachWidget(wIn,function(w){
w.invalidCss=true;
w.renderCss();
});
},reflow:function(){
if(this._cupdating){
return;
}
if(!this._inResize){
this.updateBounds();
}
this.renderBounds();
if(window["getComputedStyle"]){
try{
this.domNode.style.borderRight="solid 1px transparent";
var _195=Number(window.getComputedStyle(this.domNode).getPropertyValue("border-right-width").replace(/px/,""));
var _196=app._currentZoomLevel;
app._currentZoomLevel=1/_195;
if(app._currentZoomLevel==1){
app._currentZoomLevel=0;
}
if(_196&&_196!=app._currentZoomLevel){
this.forceRerenderComponents(this);
var self=this;
wm.forEachProperty(app.$,function(c){
if(c instanceof wm.Dialog){
self.forceRerenderComponents(c);
}
});
wm.forEachProperty(wm.Page.byName,function(_197){
dojo.forEach(_197,function(page){
wm.forEachProperty(page.$,function(c){
if(c instanceof wm.Dialog){
self.forceRerenderComponents(c);
}
});
});
});
}
this.domNode.style.borderRight="solid 0px transparent";
dojo.publish("BrowserZoomed");
}
catch(e){
}
}
this.inherited(arguments);
},calcDeviceSize:function(_198){
if(_198>=1800){
return "1800";
}else{
if(_198>=1400){
return "1400";
}else{
if(_198>=1150){
return "1150";
}else{
if(_198>=900){
return "900";
}else{
if(_198>=650){
return "650";
}else{
if(_198>=450){
return "450";
}else{
if(_198>=300){
return "300";
}else{
return "200";
}
}
}
}
}
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Formatters"]){
dojo._hasResource["wm.base.widget.Formatters"]=true;
dojo.provide("wm.base.widget.Formatters");
wm.formatters=["Number","Date","Time","DateTime","Currency","Array","Percent"];
wm.getFormatter=function(_199){
var c=_199;
if(c.slice(0,5)!="wm"){
c="wm."+c+"Formatter";
}
return dojo.getObject(c)||wm.DataFormatter;
};
dojo.declare("wm.DataFormatter",wm.Component,{getColProps:function(){
return {formatter:this.format};
},format:function(_19a){
return (_19a!==undefined)?_19a:"&nbsp;";
},valueChanged:function(_19b,_19c){
this.inherited(arguments);
if(_19b){
wm.fire(this.owner,"formatChanged");
}
}});
dojo.declare("wm.NumberFormatter",wm.DataFormatter,{digits:0,locale:"",round:false,noFormat:false,format:function(_19d){
return (_19d===undefined)?"-":(this.wmNoFormat?_19d:dojo.number.format(_19d,this.getFormatProps()));
},getFormatProps:function(){
return {places:Number(this.digits),locale:this.locale,round:this.round?0:-1};
},getColProps:function(){
return {formatter:this.format,getFormatProps:dojo.hitch(this,"getFormatProps"),wmNoFormat:this.noFormat};
}});
dojo.declare("wm.CurrencyFormatter",wm.NumberFormatter,{digits:2,currency:"",format:function(_19e){
return (_19e==undefined)?"-":dojo.currency.format(_19e,this.getFormatProps());
},getFormatProps:function(){
var p=this.inherited(arguments);
p.currency=this.currency=="$"?"USD":this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD";
return p;
}});
dojo.declare("wm.ArrayFormatter",wm.DataFormatter,{separator:",",joinField:"dataValue",format:function(_19f){
var str="";
if(_19f){
if(_19f instanceof wm.Variable){
_19f.forEach(dojo.hitch(this,function(item){
if(str){
str+=this.separator+" ";
}
str+=item.getValue(this.joinField);
}));
}else{
dojo.forEach(_19f,function(item){
if(str){
str+=this.separator+" ";
}
if(item instanceof wm.Variable){
str+=item.getValue(this.joinField);
}else{
str+=item[this.joinField];
}
},this);
}
}
return str;
}});
dojo.declare("wm.DateTimeFormatter",wm.DataFormatter,{useLocalTime:true,formatLength:"medium",_selector:"",datePattern:"",timePattern:"",locale:"",format:function(_1a0){
var opts={selector:this._selector,formatLength:this.formatLength,datePattern:this.datePattern,timePattern:this.timePattern,locale:this.locale};
var d=new Date(_1a0);
if(!this.useLocalTime){
var _1a1=this._selector=="date"?360:0;
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset+_1a1);
}
if(isNaN(d.getTime())){
d=new Date(Number(_1a0));
}
return (_1a0==undefined)||isNaN(d.getTime())?"-":dojo.date.locale.format(d,opts);
},getColProps:function(){
return {_selector:this._selector,formatLength:this.formatLength,datePattern:this.datePattern,timePattern:this.timePattern,locale:this.locale,formatter:this.format};
}});
dojo.declare("wm.DateFormatter",wm.DateTimeFormatter,{_selector:"date",useLocalTime:false});
dojo.declare("wm.TimeFormatter",wm.DateTimeFormatter,{_selector:"time"});
dojo.declare("wm.PercentFormatter",wm.NumberFormatter,{divideBy100:false,getFormatProps:function(){
var p=this.inherited(arguments);
p.type="percent";
return p;
},format:function(_1a2){
_1a2=Number(_1a2);
if(this.divideBy100){
_1a2=_1a2/100;
}
return this.inherited(arguments,[_1a2]);
}});
wm.Object.extendSchema(wm.DataFormatter,{name:{ignore:1},diagnostics:{ignore:1}});
wm.Object.extendSchema(wm.DateTimeFormatter,{formatLength:{options:["short","medium","long","full"]}});
wm.Object.extendSchema(wm.DateFormatter,{timePattern:{ignore:1},useLocalTime:{ignore:0}});
wm.Object.extendSchema(wm.TimeFormatter,{datePattern:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.Label"]){
dojo._hasResource["wm.base.widget.Label"]=true;
dojo.provide("wm.base.widget.Label");
dojo.declare("wm.Label",wm.Control,{width:"200px",height:"24px",caption:"Label",link:"",display:"",padding:4,singleLine:true,align:"none",init:function(){
dojo.addClass(this.domNode,"wmlabel");
this.inherited(arguments);
this.connect(this.domNode,"onclick",this,"_onclick");
},build:function(){
this.inherited(arguments);
this.sizeNode=document.createElement("div");
dojo.addClass(this.sizeNode,"wmSizeNode");
this.domNode.appendChild(this.sizeNode);
},_onclick:function(_1a3){
if(this._disabled){
return;
}
var _1a4=dojo.isIE&&_1a3?{clientX:_1a3.clientX,clientY:_1a3.clientY,offsetX:_1a3.offsetX,offsetY:_1a3.offsetY,screenX:_1a3.screenX,screenY:_1a3.screenY,pageX:_1a3.pageX,pageY:_1a3.pageY,x:_1a3.x,y:_1a3.y,target:_1a3.target,currentTarget:_1a3.currentTarget,"type":_1a3.type}:_1a3||{};
window.setTimeout(dojo.hitch(this,"click",_1a4),5);
},click:function(e){
this.onclick(e);
},postInit:function(){
this.inherited(arguments);
this.caption=this.label||this.content||this.caption;
delete this.content;
delete this.label;
this.renderLabel();
this.valueChanged("caption",this.caption);
this.valueChanged("link",this.link);
if(this.onclick!=this.constructor.prototype.onclick){
dojo.addClass(this.domNode,"onClickEvent");
}
},renderLabel:function(){
if(this._loading){
return;
}
var c=this.caption;
if(this.$.format){
c=this.$.format.format(c);
}else{
if(this.display&&dojo.isFunction(this.owner[this.display])){
try{
c=this.owner[this.display](this,c);
}
catch(e){
console.error("Formatter error in "+this.toString()+": "+e);
}
}
}
if(this.link){
c=["<a ",(this.link.indexOf("#")==-1&&this.link.indexOf("javascript")==-1)?"target=\"_blank\" ":"","href=\"",this.link,"\">",c,"</a>"].join("");
}
if(this.domNode.innerHTML!=c){
this.sizeNode.innerHTML=c;
}
var _1a5=(this.singleLine||this.autoSizeWidth)?"nowrap":"normal";
if(this.domNode.style.whiteSpace!=_1a5){
this.domNode.style.whiteSpace=_1a5;
}
var _1a6=(this.align=="none")?"":this.align;
if(this._align!=_1a6&&(!this.styles||!this.styles.textAlign)){
this.domNode.style.textAlign=_1a6;
this._align=_1a6;
}
},setCaption:function(_1a7){
if(_1a7==undefined){
_1a7="";
}
var _1a8=this.sizeNode.innerHTML;
if(_1a7&&dojo.isArray(_1a7)){
_1a7=_1a7.join(", ");
}else{
if(_1a7&&dojo.isObject(_1a7)&&(!this.$.format||this.$.format instanceof wm.ArrayFormatter===false)){
_1a7="";
}
}
this.caption=_1a7;
this.renderLabel();
if(_1a8!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
this.valueChanged("caption",_1a7);
},scheduleAutoSize:function(){
this._needsAutoSize=true;
return wm.job(this.getRuntimeId()+": doAutoSize",10,dojo.hitch(this,function(){
this.doAutoSize(true,false);
}));
},doAutoSize:function(_1a9,_1aa){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_1aa&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _1ab=this.sizeNode;
var _1ac=_1ab.offsetHeight;
var _1ad=_1ab.offsetWidth;
if(this.autoSizeHeight){
var _1ae=_1ac+this.padBorderMargin.t+this.padBorderMargin.b;
if(_1ae<this.minHeight){
_1ae=this.minHeight;
}
if(_1ad>this.bounds.w){
_1ae+=17;
}
this.bounds.h=_1ae;
this.height=_1ae+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeHeight||p.fitToContentHeight)){
p=p.parent;
}
p.delayedReflow();
}
if(this.autoSizeWidth){
var _1af=_1ad+this.padBorderMargin.l+this.padBorderMargin.r;
if(_1ac>this.bounds.h){
_1af+=17;
}
this.bounds.w=_1af;
this.width=_1af+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeWidth||p.fitToContentWidth)){
p=p.parent;
}
p.delayedReflow();
}
if(this.isDesignLoaded()&&studio.designer.selected==this){
studio.inspector.reinspect();
}
this._doingAutoSize=false;
},setLink:function(_1b0){
var _1b1=this.link;
this.link=_1b0;
this.renderLabel();
this.valueChanged("link",_1b0);
},setSingleLine:function(_1b2){
var _1b3=this.singleLine;
this.singleLine=_1b2;
if(_1b3!=_1b2){
this.domNode.style.lineHeight=(_1b2)?this.bounds.h+"px":"normal";
}
this.renderLabel();
if(_1b2&&this.autoSizeHeight){
this.autoSizeHeight=false;
}
if(_1b2!=_1b3&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
},setAlign:function(_1b4){
this.align=_1b4;
this.renderLabel();
},formatChanged:function(){
this.renderLabel();
},onclick:function(_1b5){
},toHtml:function(){
var _1b6=this.toHtmlStyles();
return "<div "+_1b6+" style='text-align:"+(this.align||"left")+";' id='"+this.domNode.id+"'>"+(this.sizeNode.innerHTML)+"</div>";
}});
wm.Label.sizingNode=document.createElement("div");
}
if(!dojo._hasResource["wm.base.widget.Spacer"]){
dojo._hasResource["wm.base.widget.Spacer"]=true;
dojo.provide("wm.base.widget.Spacer");
dojo.declare("wm.Spacer",wm.Control,{classNames:"wmspacer",border:0,getMinWidthProp:function(){
return this.minWidth||0;
},getMinHeightProp:function(){
return this.minHeight||0;
}});
}
if(!dojo._hasResource["wm.base.widget.Panel"]){
dojo._hasResource["wm.base.widget.Panel"]=true;
dojo.provide("wm.base.widget.Panel");
dojo.declare("wm.Panel",wm.Container,{classNames:"wmcontainer wmpanel",setThemeStyleType:function(_1b7){
var _1b8=this.write("");
_1b8=dojo.fromJson(_1b8.replace(/^.*?\:/,""));
var name=this.name;
var _1b9=this.parent;
var _1ba=this.owner;
var _1bb=dojo.indexOf(this.parent.c$,this);
this.destroy();
var _1bc=_1b9.createComponent(name,"wm."+(_1b7||"")+"Panel",_1b8[1],_1b8[2],_1b8[3],_1ba);
_1b9.moveControl(_1bc,_1bb);
_1b9.reflow();
studio.refreshVisualTree();
studio.select(_1bc);
},getThemeStyleType:function(){
return this.declaredClass.replace(/^wm\.(.*)Panel/,"$1");
}});
dojo.declare("wm.MainContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel MainContent"});
dojo.declare("wm.EmphasizedContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel EmphasizedContent"});
dojo.declare("wm.HeaderContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel HeaderContent"});
dojo.declare("wm.FancyPanel",wm.Panel,{freeze:true,classNames:"wmcontainer wmfancypanel",title:"Panel Heading",labelWidget:null,containerWidget:null,layoutKind:"top-to-bottom",innerLayoutKind:"top-to-bottom",innerHorizontalAlign:"left",innerVerticalAlign:"top",margin:"6",padding:"0",border:"0",innerBorder:"3",borderColor:"#404040",width:"100%",height:"100%",_topImgWidth:0,_bottomImgWidth:0,labelHeight:30,themeStyleType:"ContentPanel",init:function(){
if(!this.labelHeight){
this.labelHeight=30;
}
var _1bd=this._classes;
var _1be={domNode:[]};
for(var i=_1bd.domNode.length-1;i>=0;i--){
if(_1bd.domNode[i].match(/^wm_Border_(Bottom|Drop)/)){
_1be.domNode.push(_1bd.domNode[i]);
wm.Array.removeElementAt(_1bd.domNode,i);
}
}
this._classes={domNode:[]};
try{
this.layout=wm.layout.cache["top-to-bottom"];
this.inherited(arguments);
this._isDesign=this.isDesignLoaded();
this.labelWidget=new wm.Label({border:this.innerBorder,borderColor:this.borderColor,showing:Boolean(this.title),_classes:_1bd,name:"labelWidget",caption:this.title,width:"100%",height:this.labelHeight+"px",padding:"0,0,0,10",owner:this,parent:this,flags:{notInspectable:true}});
var _1bf=String(this.innerBorder);
_1bf=this._parseExtents(_1bf);
this.containerWidget=new wm.Container({_classes:_1be,name:"containerWidget",layoutKind:this.innerLayoutKind,width:"100%",height:"100%",owner:this,parent:this,noInspector:true,autoScroll:this.autoScroll,horizontalAlign:this.innerHorizontalAlign,verticalAlign:this.innerVerticalAlign,fitToContentHeight:this.fitToContentHeight,fitToContentWidth:this.fitToContentWidth,border:"0,"+_1bf.r+","+_1bf.b+","+_1bf.l,borderColor:this.borderColor,_assignChildrenToOwner:this.owner});
this.containerWidget.setLayoutKind(this.innerLayoutKind);
this.widgets.labelWidget=this.labelWidget;
this.widgets.containerWidget=this.containerWidget;
this.setTitle(this.title);
}
catch(e){
alert("PANEL:"+e);
}
},setFitToContentHeight:function(_1c0){
this.inherited(arguments);
if(this.containerWidget){
this.containerWidget.setFitToContentHeight(_1c0);
if(!_1c0){
this.containerWidget.setHeight("100%");
}
}
},setFitToContentWidth:function(_1c1){
this.inherited(arguments);
if(this.containerWidget){
this.containerWidget.setFitToContentWidth(_1c1);
if(!_1c1){
this.containerWidget.setWidth("100%");
}
}
},setBorder:function(_1c2){
wm.Control.prototype.setBorder.call(this,"0");
},setShowing:function(_1c3){
this.inherited(arguments);
if(dojo.isIE<9){
if(this._topLeftCornerImg){
this._topLeftCornerImg.style.display=(this.showing)?"block":"none";
this._topRightCornerImg.style.display=(this.showing)?"block":"none";
}
if(this._bottomLeftCornerImg){
this._bottomLeftCornerImg.style.display=(this.showing)?"block":"none";
this._bottomRightCornerImg.style.display=(this.showing)?"block":"none";
}
}
},getMinHeightProp:function(){
if(this.minHeight){
return Number(this.minHeight);
}
if(!this.containerWidget){
return this.inherited(arguments);
}
return this.containerWidget.getMinHeightProp()+((this.labelWidget&&this.labelWidget.showing)?this.labelWidget.bounds.h:0)+30;
},getPreferredFitToContentWidth:function(){
var _1c4=this.padBorderMargin.r+this.padBorderMargin.l;
var max=0;
var sum=0;
var v;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
if(c instanceof wm.Container){
if(c.fitToContentWidth||c._percEx.w){
v=c.getPreferredFitToContentWidth();
}else{
v=c.bounds.w;
}
}else{
if(c._percEx.w){
v=c.getMinWidthProp();
}else{
v=c.bounds.w;
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _1c5=((this.layoutKind=="top-to-bottom")?max:sum)+_1c4;
return Math.max(this.minWidth,Math.max(_1c5,30));
},getPreferredFitToContentHeight:function(){
var _1c6=this.padBorderMargin.t+this.padBorderMargin.b;
var max=0;
var sum=0;
var v;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
if(c instanceof wm.Container){
if(c.fitToContentHeight||c._percEx.h){
v=c.getPreferredFitToContentHeight();
}else{
v=c.bounds.h;
}
}else{
if(c.fitToContentHeight||c._percEx.h){
v=c.getMinHeightProp();
}else{
v=c.bounds.h;
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _1c7=((this.layoutKind=="left-to-right")?max:sum)+_1c6;
return Math.max(this.minHeight,Math.max(_1c7,15));
},destroy:function(){
if(dojo.isIE<9){
if(this._topLeftCornerImg){
dojo.destroy(this._topLeftCornerImg);
dojo.destroy(this._topRightCornerImg);
}
if(this._bottomLeftCornerImg){
dojo.destroy(this._bottomLeftCornerImg);
dojo.destroy(this._bottomRightCornerImg);
}
}
this.inherited(arguments);
},flow:function(){
this.inherited(arguments);
if(dojo.isIE<9){
this.renderCorners();
}
},renderCorners:function(){
if(!this._topLeftCornerImg){
return;
}
if(this._topLeftCornerImg.className.match(/px/)){
this._topLeftCornerImg.style.top=this._topRightCornerImg.style.top=(this.bounds.t+this.marginExtents.t)+"px";
this._topLeftCornerImg.style.left=(this.bounds.l+this.marginExtents.l)+"px";
this._topRightCornerImg.style.left=(this.bounds.r-this._topImgWidth-this.marginExtents.r)+"px";
}
if(this._bottomLeftCornerImg.className.match(/px/)){
this._bottomLeftCornerImg.style.top=this._bottomRightCornerImg.style.top=(this.bounds.b-this.marginExtents.b-this._bottomImgHeight)+"px";
this._bottomLeftCornerImg.style.left=(this.bounds.l+this.marginExtents.l)+"px";
this._bottomRightCornerImg.style.left=(this.bounds.r-this._bottomImgWidth-this.marginExtents.r)+"px";
}
},postInit:function(){
var _1c8=[];
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(this.$[c.name]!=c&&c instanceof wm.Control){
_1c8.push(c);
}
}
for(var i=0;i<_1c8.length;i++){
var c=_1c8[i];
c.setParent(this.containerWidget);
if(c.designWrapper){
c.designWrapper.controlParentChanged();
}
}
this.inherited(arguments);
},writeComponents:function(_1c9,_1ca){
var _1cb=[];
if(this.containerWidget){
_1cb=_1cb.concat(this.containerWidget.writeComponents(_1c9,_1ca));
}
if(this.components.binding&&!wm.isEmpty(this.components.binding.$)){
_1cb=_1cb.concat(this.components.binding.write(_1c9,_1ca));
}
return _1cb;
},setInnerHorizontalAlign:function(_1cc){
this.innerHorizontalAlign=_1cc;
if(this.containerWidget){
this.containerWidget.setHorizontalAlign(_1cc);
}
},setInnerVerticalAlign:function(_1cd){
this.innerVerticalAlign=_1cd;
if(this.containerWidget){
this.containerWidget.setVerticalAlign(_1cd);
}
},setInnerLayoutKind:function(_1ce){
this.innerLayoutKind=_1ce;
if(this.containerWidget){
this.containerWidget.setLayoutKind(_1ce);
}
},setInnerBorder:function(_1cf){
_1cf=String(_1cf);
this.innerBorder=_1cf;
this.labelWidget.setBorder(_1cf);
var b=this._parseExtents(_1cf);
this.containerWidget.setBorder("0,"+b.r+","+b.b+","+b.l);
},setLayoutKind:function(_1d0){
wm.Panel.prototype.setLayoutKind.call(this,"top-to-bottom");
if(this.containerWidget){
this.setInnerLayoutKind(_1d0);
}
},setTitle:function(_1d1){
var _1d2=this.title;
this.title=_1d1;
if(this.containerWidget){
this.labelWidget.setCaption(_1d1);
this.labelWidget.setShowing(Boolean(_1d1));
}
},setThemeStyleType:function(_1d3){
this.containerWidget.setThemeStyleType(_1d3);
this.themeStyleType=_1d3;
},setLabelHeight:function(_1d4){
this.labelHeight=_1d4;
this.labelWidget.setHeight(_1d4);
},toHtml:function(_1d5){
var _1d6=_1d5-12;
return "<div id='"+this.domNode.id+"' class='"+this.classNames+"'><div class='wmFancyPanel-labelWidget'>"+this.title+"</div><div class='wmFancyPanel-containerWidget'>"+this.containerWidget.toHtml(_1d6)+"</div></div>";
}});
}
if(!dojo._hasResource["wm.base.widget.Layout"]){
dojo._hasResource["wm.base.widget.Layout"]=true;
dojo.provide("wm.base.widget.Layout");
dojo.declare("wm.Layout",wm.Container,{mobileFoldingType:"wm.TabLayers",classNames:"wmlayout",autoScroll:true,fit:false,width:"100%",height:"100%",_mobileFolded:false,create:function(){
this.inherited(arguments);
},build:function(){
this.inherited(arguments);
this.domNode.style.cssText+=this.style+"overflow: hidden; position: relative;";
},init:function(){
if(this.isDesignLoaded()&&this.owner==studio.page){
this.parent=studio.designer;
}else{
if(this.owner&&this.owner.owner instanceof wm.PageContainer){
this.parent=this.owner.owner;
}
}
this.inherited(arguments);
this.subscribe("deviceSizeRecalc",this,"resize");
},postInit:function(){
this.inherited(arguments);
if(app.appRoot.deviceSize=="tiny"||app.appRoot.deviceSize=="300"){
this.foldUI();
}
},resize:function(){
if(app.appRoot.deviceSize=="tiny"||app.appRoot.deviceSize=="300"){
if(!this._mobileFolded){
this.foldUI();
}
}else{
if(this._mobileFolded){
this.unfoldUI();
}
}
},foldUI:function(){
if(!this.owner.enableMobileFolding){
return;
}
this._mobileFolded=true;
var _1d7;
var _1d8=[];
var _1d9=false;
wm.forEachWidget(this,function(w){
if(w._mobileFoldingParent){
}else{
if(w.mobileFolding){
_1d8.push(w);
w._mobileFoldingParentIndex=w.parent.indexOfControl(w);
_1d9=true;
}else{
if(w.isMobileFoldingParent&&!_1d7){
_1d7=w;
}
}
}
},true);
if(!_1d7){
_1d7=this;
}
if(_1d8.length>1||_1d7 instanceof wm.Layers&&_1d7.layers.length>=1&&_1d8.length>=1){
var _1da;
if(!_1d7.showing){
_1d7.setShowing(true);
}
if(_1d7 instanceof wm.Layers==false){
var ctor=dojo.getObject(this.mobileFoldingType)||wm.TabLayers;
this.mobileFoldingLayers=new ctor({owner:this.owner,parent:_1d7,name:"_mobileLayers",width:"100%",height:"100%"});
this.mobileFoldingLayers.setIndexInParent(0);
_1d7=this.mobileFoldingLayers;
}else{
this.owner._mobileLayers=_1d7;
_1d7.setIndexInParent(_1d8[0].getIndexInParent());
}
var _1db=_1d7.transition;
_1d7.transition="none";
_1d7._cupdating=true;
_1d8=_1d8.sort(function(a,b){
if(a.mobileFoldingIndex===b.mobileFoldingIndex||a.mobileFoldingIndex>b.mobileFoldingIndex){
return 1;
}else{
return -1;
}
});
for(var i=0;i<_1d8.length;i++){
_1d8[i]._mobileFoldingParent=_1d8[i].parent;
if(_1d8[i] instanceof wm.Layer==false){
_1d8[i]._mobileFoldingWidth=_1d8[i].width;
_1d8[i]._mobileFoldingHeight=_1d8[i].height;
var l=_1d7.addLayer(_1d8[i].mobileFoldingCaption,true);
_1d8[i].setParent(l);
_1d8[i].setWidth("100%");
_1d8[i].setHeight("100%");
l._mobileFoldingGenerated=true;
}else{
if(_1d8[i].parent!=_1d7){
var l=_1d8[i];
_1d8[i].setParent(_1d7);
}else{
var l=_1d8[i];
}
}
if(String(_1d8[i].mobileFoldingIndex).length){
_1d7.moveLayerIndex(_1d7.layers[_1d7.layers.length-1],Number(_1d8[i].mobileFoldingIndex));
if(_1d8[i].active){
_1d7.layerIndex=_1d8[i].getIndex();
}
}
}
_1d7._cupdating=false;
if(_1da){
_1da.activate();
}else{
_1d7.setLayerIndex(0);
}
_1d7.transition=_1db;
if(this.mobileFoldingLayers){
for(var i=1;i<this.c$.length;i++){
var c=this.c$[i];
if(c.showing){
c.hide();
c._mobileFoldingShowing=true;
}
}
}
}
wm.fire(this.owner,"onMobileFolding");
},unfoldUI:function(){
if(!this.owner.enableMobileFolding){
return;
}
this._mobileFolded=false;
if(this.mobileFoldingLayers){
for(var i=1;i<this.c$.length;i++){
var c=this.c$[i];
if(c._mobileFoldingShowing){
c.setShowing(true);
delete c._mobileFoldingShowing;
}
}
}
var _1dc=[];
wm.forEachWidget(this,function(w){
if(w._mobileFoldingParent){
if(w.parent!=w._mobileFoldingParent){
w.setParent(w._mobileFoldingParent);
}
if(w instanceof wm.Layer){
w.parent.setLayerIndex(w,w._mobileFoldingParentIndex);
}else{
w.parent.moveControl(w,w._mobileFoldingParentIndex);
}
if(w._mobileFoldingWidth){
w.setWidth(w._mobileFoldingWidth);
w.setHeight(w._mobileFoldingHeight);
}
delete w._mobileFoldingParent;
delete w._mobileFoldingParentIndex;
}
if(w._mobileFoldingGenerated){
_1dc.push(w);
}
},true);
var _1dd;
var _1de;
dojo.forEach(_1dc,function(w){
w._cupdating=true;
if(!_1de){
_1de=w.parent;
_1dd=_1de.layerIndex;
}
if(w.getIndex()>=w.parent.layerIndex){
_1dd--;
}
w.destroy();
w._cupdating=false;
});
if(this.mobileFoldingLayers){
this.mobileFoldingLayers.destroy();
delete this.mobileFoldingLayers;
}
delete this.owner._mobileLayers;
if(_1de&&!_1de.isDestroyed){
_1de.setLayerIndex(Math.max(0,_1dd));
}
wm.fire(this.owner,"onMobileUnfolding");
},updateBounds:function(){
this._percEx={w:100,h:100};
this.setBounds(this.parent.getContentBounds());
},reflow:function(){
if(this._cupdating||this.isDestroyed){
return;
}
this.updateBounds();
this.renderBounds();
this.inherited(arguments);
}});
wm.LayoutBox=wm.Layout;
}
if(!dojo._hasResource["wm.base.widget.Buttons.ToolButton"]){
dojo._hasResource["wm.base.widget.Buttons.ToolButton"]=true;
dojo.provide("wm.base.widget.Buttons.ToolButton");
dojo.declare("wm.ToolButton",[wm.Control,wm.TouchMixinOptional],{enableTouchHeight:true,mobileHeight:"40px",width:"80px",border:0,padding:"",margin:"",caption:"",classNames:"wmtoolbutton",iconUrl:"",iconWidth:"16px",iconHeight:"16px",iconMargin:"0 10px 0 0",clicked:false,build:function(){
if(!this.domNode){
this.domNode=document.createElement("button");
dojo.attr(this.domNode,"type","button");
}
this.btnNode=this.domNode;
},init:function(){
this.inherited(arguments);
if(!wm.isMobile){
this.connect(this.btnNode,"onclick",this,function(evt){
this.click(evt,true);
});
}
this.imageListChanged();
},onTouchStart:function(evt,_1df){
dojo.addClass(this.btnNode,"Active");
},onTouchMove:function(){
dojo.removeClass(this.btnNode,"Active");
},onTouchEnd:function(evt,_1e0){
if(_1e0){
return;
}
dojo.removeClass(this.btnNode,"Active");
if(document.activeElement.tagName=="INPUT"){
var id=document.activeElement.id;
var d=dijit.byId(id);
if(d){
d._onBlur();
}else{
document.activeElement.blur();
}
}
this.click(evt,true);
},click:function(_1e1,_1e2){
if(!this._disabled){
if(!this.clicked){
this.setProp("clicked",true);
}
if(!_1e2){
this.onclick(_1e1,this);
}else{
var _1e3=dojo.isIE&&_1e1?{clientX:_1e1.clientX,clientY:_1e1.clientY,offsetX:_1e1.offsetX,offsetY:_1e1.offsetY,screenX:_1e1.screenX,screenY:_1e1.screenY,pageX:_1e1.pageX,pageY:_1e1.pageY,x:_1e1.x,y:_1e1.y,target:_1e1.target,currentTarget:_1e1.currentTarget,"type":_1e1.type}:_1e1||{};
wm.onidle(this,function(){
if(!this._isDestroyed){
this.onclick(_1e3,this);
}
});
}
if(app.toolTipDialog&&this==app.toolTipDialog.tipOwner){
app.toolTipDialog.hide();
}
}
},onclick:function(){
},setDisabled:function(_1e4){
var _1e5=this._disabled;
this.inherited(arguments);
var _1e6=this._disabled;
if(Boolean(_1e5)!=Boolean(_1e6)||this._cupdating){
this.btnNode.disabled=_1e6?"disabled":"";
dojo[_1e6?"addClass":"removeClass"](this.domNode,"wmbutton-disabled");
if(this._imageList&&parseInt(this.imageIndex)!=NaN&&this.imageIndex!=-1&&this.declaredClass=="wm.ToolButton"){
this.updateImageListButtonHtml();
}
}
},setSelected:function(_1e7){
this.selected=_1e7;
if(this._imageList&&this.imageIndex&&this.declaredClass=="wm.ToolButton"){
this.updateImageListButtonHtml();
}
},setCaption:function(_1e8){
this.caption=_1e8;
if(!this._cupdating){
this.invalidCss=true;
this.render(true,true);
}
this.valueChanged("caption",this.caption);
},setIconUrl:function(_1e9){
this.iconUrl=_1e9;
this.invalidCss=true;
this.render(true,true);
},setIconWidth:function(w){
this.iconWidth=w;
this.invalidCss=true;
this.render(true,true);
},setIconHeight:function(h){
this.iconHeight=h;
this.invalidCss=true;
this.render(true,true);
},setIconMargin:function(m){
this.iconMargin=m;
this.invalidCss=true;
this.render(true,true);
},setContent:function(_1ea){
this.setCaption(_1ea);
},imageListChanged:function(){
this.inherited(arguments);
this.invalidCss=true;
this.render(true,true);
},getCurrentImageIndex:function(){
if(this.declaredClass!="wm.ToolButton"){
return this.inherited(arguments);
}else{
if(this._disabled){
return this.imageIndex+this._imageList.colCount*2;
}
if(this.selected){
return this.imageIndex+this._imageList.colCount;
}
}
return this.imageIndex;
},updateImageListButtonHtml:function(){
var sl=this.singleLine?"line-height: "+this.height+"; ":"";
var _1eb=this.caption?"<span style=\"padding-left: 2px; "+sl+"\">"+(this.caption==undefined?"":this.caption)+"</span>":"";
var ii=this.getCurrentImageIndex();
this.btnNode.innerHTML=this._imageList.getImageHtml(ii)+_1eb;
},render:function(_1ec,_1ed){
if(!_1ec&&(!this.invalidCss||!this.isReflowEnabled())){
return;
}
if(!_1ed){
this.inherited(arguments);
}
var il=this._imageList;
if(il&&il.getImageHtml&&this.imageIndex>=0){
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="0px";
}
this.updateImageListButtonHtml();
}else{
if(this.iconUrl){
var url=this.iconUrl;
var root;
if(url.indexOf("lib/")===0){
root=dojo.moduleUrl("lib").path.replace(/lib\/$/,"");
url=root+url;
}else{
root=this.getPath()||"";
}
var sl=this.singleLine?"line-height: "+this.height+"; ":"";
var _1ee=this.caption?"<span style=\"padding-left: 2px; "+sl+"\">"+(this.caption==undefined?"":this.caption)+"</span>":"";
this.btnNode.innerHTML="<img src='"+wm.theme.getImagesPath()+"blank.gif' style='margin: "+this.iconMargin+"; width: "+this.iconWidth+"; height: "+this.iconHeight+"; vertical-align: middle; background:url("+root+url+") no-repeat; background-color: transparent;' />"+_1ee;
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="0px";
}
}else{
this.btnNode.innerHTML=this.caption;
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="";
}
}
}
},renderBounds:function(){
this.inherited(arguments);
if(dojo.isIE&&dojo.isIE<9&&this.btnNode&&this.btnNode.firstChild&&this.btnNode.firstChild.tagName){
this.btnNode.firstChild.style.padding="1px";
wm.job(this.getRuntimeId()+".IEButtonTrick",5,dojo.hitch(this,function(){
this.btnNode.firstChild.style.padding="0px";
}));
}
},destroy:function(){
if(this.btnNode){
dojo.destroy(this.btnNode);
this.btnNode=null;
}
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Buttons.Button"]){
dojo._hasResource["wm.base.widget.Buttons.Button"]=true;
dojo.provide("wm.base.widget.Buttons.Button");
dojo.declare("wm.Button",wm.ToolButton,{desktopHeight:"32px",height:"32px",border:1,borderColor:"#ABB8CF",margin:4,caption:"Button",classNames:"wmbutton"});
dojo.declare("wm.IconButton",wm.Button,{build:function(){
this.inherited(arguments);
var html="<table class='dijitMenuTable' style='width:100%'><tbody class='dijitReset'><tr class='dijitMenuItem dijitReset'><td class='dijitReset dijitMenuItemIconCell' style='width:"+(parseInt(this.iconWidth)+4)+"px;'><"+(this._useIconUrl?"img":"div")+" style='display:none;width:"+this.iconWidth+";height:"+this.iconHeight+";'/></td><td class='dijitReset dijitMenuItemLabel'>"+this.caption+"</td><td class='dijitReset dijitMenuArrow'><div class='popupIcon'/></td></tr></tbody></table>";
this.domNode.innerHTML=html;
},render:function(_1ef){
if(!_1ef&&(!this.invalidCss||!this.isReflowEnabled())){
return;
}
wm.Control.prototype.render.call(this,_1ef);
dojo.query(".dijitMenuItemLabel",this.domNode)[0].innerHTML=this.caption;
var img=this._iconImage=dojo.query(".dijitMenuItemIconCell "+(this._useIconUrl?"img":"div"),this.domNode)[0];
img.style.width=this.iconWidth;
img.style.height=this.iconHeight;
if(this.iconUrl){
img.src=this.iconUrl;
}
img.style.display=this.iconUrl||this.iconClass?"block":"none";
var _1f0=parseInt(this.iconWidth)||0;
img.parentNode.style.width=(_1f0+4)+"px";
}});
dojo.declare("wm.MobileIconButton",wm.ToolButton,{direction:"down",caption:"Back",height:"40px",build:function(){
this.inherited(arguments);
if(this.direction=="back"){
var btn=dojo.create("DIV",{className:"mblArrowBackButton"},this.domNode,"first");
var head=dojo.create("DIV",{className:"mblArrowBackButtonHead"},btn);
var body=dojo.create("DIV",{className:"mblArrowBackButtonBody mblArrowButtonText",innerHTML:this.caption},btn);
this.captionNode=body;
dojo.addClass(this.domNode,"wmBackButton");
}else{
var icon=this.iconNode=document.createElement("div");
dojo.addClass(icon,"mblArrow "+"mbl"+wm.capitalize(this.direction)+"Arrow");
this.domNode.appendChild(icon);
}
},setCaption:function(_1f1){
this.caption=_1f1;
if(this.captionNode){
this.captionNode.innerHTML=_1f1;
}
},render:function(_1f2,_1f3){
wm.Control.prototype.render.call(this,_1f2);
}});
}
if(!dojo._hasResource["wm.base.widget.Buttons.ToggleButton"]){
dojo._hasResource["wm.base.widget.Buttons.ToggleButton"]=true;
dojo.provide("wm.base.widget.Buttons.ToggleButton");
dojo.declare("wm.ToggleButton",wm.ToolButton,{height:"32px",border:1,borderColor:"#ABB8CF",margin:4,captionUp:"Btn Up",captionDown:"Btn Down",classNames:"wmbutton wmtogglebutton",init:function(){
this.caption=this.captionUp;
this.inherited(arguments);
if(this.clicked){
this.setClicked(true);
}
},click:function(_1f4){
this.setProp("clicked",!this.clicked);
wm.onidle(this,function(){
this.onclick(_1f4,this);
});
},setClicked:function(_1f5){
if(_1f5!=this.clicked||this._cupdating){
this.clicked=_1f5;
this.valueChanged("clicked",_1f5);
this.setCaption(this.clicked?this.captionDown:this.captionUp);
dojo[this.clicked?"addClass":"removeClass"](this.domNode,"toggleButtonDown");
}
},setCaptionUp:function(_1f6){
this.captionUp=_1f6;
if(!this.clicked){
this.setCaption(_1f6);
}
},setCaptionDown:function(_1f7){
this.captionDown=_1f7;
if(this.clicked){
this.setCaption(_1f7);
}
}});
dojo.declare("wm.ToggleButtonPanel",wm.Container,{border:"1",manageURL:false,manageHistory:false,classNames:"wmtogglebuttonpanel",layoutKind:"left-to-right",currentButton:-1,currentButtonName:"",currentButtonCaption:"",height:"40px",enableTouchHeight:true,width:"100%",buttonMargins:"0",init:function(){
this._btns=[];
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(this.manageURL&&this.owner.locationState){
this.restoreFromLocationHash(this.owner.locationState[this.getRuntimeId()]);
}
},addWidget:function(_1f8){
this.inherited(arguments);
if(_1f8 instanceof wm.ToolButton){
_1f8.setHeight("100%");
this._btns.push(_1f8);
_1f8.connect(_1f8,"onclick",dojo.hitch(this,"changed",_1f8));
_1f8.setMargin(this.buttonMargins);
}
},removeWidget:function(_1f9){
this.inherited(arguments);
wm.Array.removeElement(this._btns,_1f9);
},changed:function(_1fa){
var _1fb=this.currentButton;
if(_1fa instanceof wm.ToolButton){
this.currentButton=_1fa;
this.currentButtonName=_1fa.name;
this.currentButtonCaption=_1fa.caption;
if(_1fa){
dojo.addClass(_1fa.domNode,"toggleButtonDown");
}
if(this.currentButton!==_1fb){
if(_1fb instanceof wm.ToolButton){
_1fb.setValue("clicked",false);
}
this.valueChanged("currentButton",this.currentButton);
this.onChange(this.currentButton);
}
this.currentButton.clicked=true;
}else{
if(_1fb instanceof wm.ToolButton){
_1fb.setValue("clicked",false);
}
this.currentButton=null;
if(_1fb instanceof wm.ToolButton){
this.valueChanged("currentButton",this.currentButton);
this.onChange(this.currentButton);
}
}
this.valueChanged("currentButtonName",this.currentButtonName);
this.valueChanged("currentButtonCaption",this.currentButtonCaption);
if(_1fb instanceof wm.ToolButton&&_1fb!=_1fa){
dojo.removeClass(_1fb.domNode,"toggleButtonDown");
if(!this._isDesignLoaded&&!this._inBack&&this.manageHistory&&_1fa){
app.addHistory({id:this.getRuntimeId(),options:{name:_1fb.name},title:_1fa.caption+" Selected"});
}
}
},setCurrentButton:function(_1fc){
var self=this;
wm.job(this.getRuntimeId()+".setCurrentButton",1,function(){
if(_1fc instanceof wm.ToolButton){
_1fc.click({type:"click"});
}else{
self.changed(null);
}
});
},onChange:function(_1fd){
},handleBack:function(_1fe){
this._inBack=true;
var name=_1fe?_1fe.name:null;
var _1ff=this.owner[name];
if(_1ff&&this.currentButton!=_1ff){
_1ff.click({type:"click"});
}
delete this._inBack;
return true;
},restoreFromLocationHash:function(_200){
this.manageHistory=false;
if(_200!==undefined){
if(this.owner[_200]){
this.setCurrentButton(this.owner[_200]);
}
}
this.manageHistory=true;
},generateStateUrl:function(_201){
if(this.currentButton){
_201[this.getRuntimeId()]=this.currentButton.name;
}
}});
}
if(!dojo._hasResource["wm.base.widget.Picture"]){
dojo._hasResource["wm.base.widget.Picture"]=true;
dojo.provide("wm.base.widget.Picture");
dojo.declare("wm.Picture",wm.Control,{aspect:"none",hint:"",width:"100px",height:"100px",link:"",source:"",init:function(){
this.inherited(arguments);
var d=this.domNode;
d.innerHTML="<a><img></a>";
dojo.addClass(d,"wmpicture");
this.linkNode=d.firstChild;
this.img=this.linkNode.firstChild;
dojo.addClass(this.img,"wmpicture-image");
this.connect(this.img,"click",this,"_onclick");
this.connect(this.linkNode,"click",this,"_onclick");
this.setSource(this.source);
this.setAspect(this.aspect);
this.setLink(this.link);
this.setHint(this.hint);
if(this.imageList){
this.imageListChanged();
}
},postInit:function(){
this.inherited(arguments);
if(this.onclick!=this.constructor.prototype.onclick){
dojo.addClass(this.domNode,"onClickEvent");
}
},setSource:function(_202){
this.source=_202||"";
this.valueChanged("source",this.source);
this.img.style.display=this.source?"":"none";
var root;
if(this.source.slice(0,4)=="http"||this.source.slice(0,1)=="/"){
root="";
}else{
if(this.source.indexOf("lib/")==0){
root=dojo.moduleUrl("lib").path.replace(/lib\/$/,"");
}else{
root=this.getPath();
}
}
this.img.src=root+this.source;
},setHint:function(_203){
this.domNode.title=this.hint=_203;
},setAspect:function(_204){
var s=this.img.style,w="width",h="height",a=this.aspect=_204;
s.width=(a=="v"?"100%":"");
s.height=(a=="h"?"100%":"");
},setLink:function(_205){
this.link=_205;
if(_205){
this.linkNode.target="_blank";
this.linkNode.href=_205;
}else{
this.linkNode.removeAttribute("href");
}
this.valueChanged("link",_205);
},_onclick:function(_206){
dojo.stopEvent(_206);
if(this._disabled){
return;
}
var _207=dojo.isIE&&_206?{clientX:_206.clientX,clientY:_206.clientY,offsetX:_206.offsetX,offsetY:_206.offsetY,screenX:_206.screenX,screenY:_206.screenY,pageX:_206.pageX,pageY:_206.pageY,x:_206.x,y:_206.y,target:_206.target,currentTarget:_206.currentTarget,"type":_206.type}:_206||{};
window.setTimeout(dojo.hitch(this,"onclick",_207),5);
},onclick:function(){
},imageListChanged:function(){
this.inherited(arguments);
if(this._imageList){
this.linkNode.style.display="inline-block";
this.linkNode.className="wmpicture "+this._imageList.getImageClass(this.imageIndex);
}
},toHtml:function(){
var _208=this.toHtmlStyles();
return "<img "+_208+" class='wmpicture' style='width:"+this.bounds.w+"px;height:"+this.bounds.h+"px' src='"+this.img.src+"'/>";
}});
}
if(!dojo._hasResource["wm.base.widget.PageContainer"]){
dojo._hasResource["wm.base.widget.PageContainer"]=true;
dojo.provide("wm.base.widget.PageContainer");
wm.pagesFolder="pages/";
dojo.declare("wm.PageContainer",wm.Control,{manageHistory:false,manageURL:false,subpageProplist:null,subpageEventlist:null,subpageMethodlist:null,width:"100%",height:"100%",pageName:"",phonePageName:"",tabletPageName:"",deferLoad:false,loadParentFirst:true,classNames:"wmpagecontainer",init:function(){
this.pageLoadedList=[];
this.inherited(arguments);
this.createPageLoader();
this.pageLoadedDeferred=new dojo.Deferred();
this.updatePageName();
this._initialPageName=this._pageName;
if(this.manageURL&&app&&app.locationState&&app.locationState[this.getRuntimeId()]){
this.pageName=this._pageName=app.locationState[this.getRuntimeId()];
this._locationState=app.locationState;
this._restoringLocationState=true;
}
if(!this.deferLoad||!this.isAncestorHidden()){
this.loadPage(this._pageName);
}
dojo.addOnWindowUnload(this,"destroy");
if(this.subpageEventlist&&!this._isDesignLoaded){
for(var _209 in this.subpageEventlist){
if(this[_209]===undefined){
this[_209]=function(){
};
}
}
}
if(this.subpageMethodlist&&!this._isDesignLoaded){
wm.forEachProperty(this.subpageMethodlist,dojo.hitch(this,function(_20a,name){
this[name]=dojo.hitch(this,function(){
var w=this.page.getValueById(_20a.replace(/\..*?$/,""));
var f=w[_20a.replace(/^.*\./,"")];
f.apply(w,arguments);
});
}));
}
if(this._isDesignLoaded){
this.subscribe("deviceSizeRecalc",dojo.hitch(this,"updatePageName"));
}
},updatePageName:function(){
var _20b=this._isDesignLoaded?studio.currentDeviceType:wm.device;
if(_20b=="phone"&&this.phonePageName){
this._pageName=this.phonePageName;
}else{
if(_20b=="tablet"&&this.tabletPageName){
this._pageName=this.tabletPageName;
}else{
this._pageName=this.pageName;
}
}
if(this._isDesignLoaded&&!this._cupdating){
this.loadPage(this._pageName);
}
},postInit:function(){
this.inherited(arguments);
if(this.isDesignedComponent()&&this.designWrapper){
dojo.addClass(this.designWrapper.domNode,"pageContainerDesignWrapper");
this.designWrapper.domNode.style.backgroundColor="white";
this.createOpenPageButton();
}
if(this.isDesignedComponent()&&this.getRoot() instanceof wm.Application){
this.subscribe("Page-Saved",dojo.hitch(this,function(){
if(this._pageName==studio.project.pageName){
this.forceReloadPage();
}
}));
}
},setBoundProp:function(_20c){
if(this["_inSetBoundProp_"+_20c]){
return;
}
this["_inSetBoundProp_"+_20c]=true;
try{
var _20d=this.getProp(_20c);
this[_20c]=_20d;
this.valueChanged(_20c,_20d);
if(_20d instanceof wm.Variable){
var id=this.getRuntimeId(_20c);
dojo.publish(id+"-ownerChanged");
}
}
catch(e){
}
delete this["_inSetBoundProp_"+_20c];
},setProp:function(_20e,_20f){
if(this.subpageProplist!==null&&this.page&&this.subpageProplist[_20e]){
var prop=this.subpageProplist[_20e];
if(prop){
if(_20f instanceof wm.Component===false){
this[_20e]=_20f;
}
return this.page.setValue(prop,_20f);
}
}else{
if(this.subpageEventlist!==null&&this.page&&this.subpageEventlist[_20e]){
var prop=this.subpageEventlist[_20e];
if(prop){
if(this._isDesignLoaded){
return this.setEvent(_20e,_20f);
}else{
return this.inherited(arguments);
}
}
}
}
return this.inherited(arguments);
},getProp:function(_210){
if(this.subpageProplist!==null&&this.page){
var prop=this.subpageProplist[_210];
if(prop){
return this.page.getValue(prop);
}
}
if(this._isDesignLoaded&&this.subpageEventlist!==null&&this.page){
var prop=this.subpageEventlist[_210];
if(prop){
return this._getProp(_210);
}
}
return this.inherited(arguments);
},onError:function(_211){
},createPageLoader:function(){
this._pageLoader=new wm.PageLoader({owner:this,domNode:this.domNode,isRelativePositioned:this.isRelativePositioned});
this._connections.push(this.connect(this._pageLoader,"onPageChanged",this,"pageChanged"));
this._connections.push(this.connect(this._pageLoader,"onError",this,"onError"));
},getMainPage:function(){
var _212=this.owner;
while(_212.owner){
_212=_212.owner;
}
if(_212 instanceof wm.Application){
return _212;
}
},destroy:function(){
if(this.isDestroyed){
return;
}
var _213=this.getMainPage();
if(_213){
_213.subPageUnloaded(this.page);
}
try{
this.inherited(arguments);
}
catch(e){
}
if(this._pageLoader){
this.destroyPreviousPage();
this._pageLoader.destroy();
this._pageLoader=null;
}
_213=null;
},destroyPreviousPage:function(){
for(var i=0;i<this.pageLoadedList.length;i++){
try{
this._pageLoader.destroyPage(this.pageLoadedList[i]);
}
catch(e){
}
}
this.pageLoadedList=[];
},pageChanged:function(_214,_215){
try{
this.destroyPreviousPage();
this.pageLoadedList.push(_214);
this.page=_214;
this[_214.name]=_214;
var _216=this.getMainPage();
if(_216){
_216.subPageLoaded(this.page);
}
if(this.page.root){
this.page.root.parent=this;
}
if(this.pageLoadedDeferred){
this.pageLoadedDeferred.callback({page:_214,previousPage:_215});
}
this.onPageChanged(_214,_215);
var o=(_215||0).name;
if(o&&this[o]){
delete this[o];
}
}
catch(e){
}
},loadPage:function(_217){
try{
var d=this.isDesignLoaded(),s=wm.studioConfig;
if(d&&s&&s.preventSubPages){
return;
}
var _218=_217.charAt(0).toLowerCase()+_217.slice(1);
if(_218){
if(!d&&this.loadParentFirst){
var _219=this.getParentPage();
}
if(!d&&this.loadParentFirst&&_219&&_219._loadingPage){
if(!this._pageLoaderConnectedToOwnerStart){
if(this._currentPageConnect){
dojo.disconnect(this._currentPageConnect);
}
this._currentPageConnect=this.owner.connect(this.owner,"onStart",dojo.hitch(this,"pageLoaderOnOwnerStart",_217,_218));
this._pageLoaderConnectedToOwnerStart=true;
}
}else{
this._pageLoader.loadPage(_217,_218);
if(this._currentPageConnect){
dojo.disconnect(this._currentPageConnect);
}
if(this._pageLoader.page._startCalled){
this.onStart();
}else{
this._currentPageConnect=this._pageLoader.page.connect(this._pageLoader.page,"onStart",this,"onStart");
}
}
}else{
this.destroyPreviousPage();
}
}
catch(e){
console.error("PageContainer page  '"+_217+"' failed to load: "+e);
}
},pageLoaderOnOwnerStart:function(_21a,_21b){
this._pageLoaderConnectedToOwnerStart=false;
this._pageLoader.loadPage(_21a,_21b);
this._pageLoader.page.connect(this._pageLoader.page,"onStart",this,"onStart");
},onStart:function(){
delete this._locationState;
if(this.parent&&this.page&&!dojo.coords(this.page.root.domNode).w){
this.parent.reflow();
}
if(this.subpageEventlist&&this.page){
for(var _21c in this.subpageEventlist){
var _21d=this.page[_21c];
if(_21d&&_21d.isEvent&&!this._isDesignLoaded){
var _21e=_21d.property.replace(/\..*?$/,"");
var _21f=_21d.property.replace(/^.*\./,"");
var _220=this.page.getValue(_21e);
this.connect(_220,_21f,this,_21c);
}
}
}
if(this.subpageProplist){
for(var _21c in this.subpageProplist){
var v=this[_21c];
if(v!==undefined){
this.setProp(_21c,this[_21c]);
}
var _221=this.page[_21c];
if(_221.bindSource){
var _222=this.page.getRuntimeId()+"."+_221.property;
this.subscribe(_222+"-changed",dojo.hitch(this,"setBoundProp",_21c));
}
}
if(this.$.binding){
this.$.binding.refresh();
}
}
if(this._restoringLocationState||(this.manageHistory||this.manageURL)&&this._lastPageName&&this._lastPageName!=this._pageName&&!this._isDesignLoaded){
app.addHistory({id:app&&app.pageContainer==this?"app.pageContainer":this.getRuntimeId(),options:this._backState,title:"Show "+this._pageName},!this.manageHistory||this._restoringLocationState);
delete this._backState;
}
delete this._restoringLocationState;
},handleBack:function(_223){
if(!_223.pageName||_223.pageName==this._pageName){
return false;
}
this._restoreBackState=_223;
this.setPageName(_223.pageName);
delete this._restoreBackState;
return true;
},generateStateUrl:function(_224){
if(this.page&&this._pageName!==this._initialPageName){
_224[app&&app.pageContainer==this?"pageName":this.getRuntimeId()]=this._pageName;
if(this.page.generateStateUrl){
this.page.generateStateUrl(_224);
}
}
},forEachWidget:function(_225){
if(this.page){
return this.page.forEachWidget(_225);
}
},setPageName:function(_226,_227){
if(this._pageLoading){
return;
}
if(this.manageHistory&&this._pageName!=_226&&!this._isDesignLoaded){
this._backState={pageName:this._pageName};
if(this.page&&this.page.generateBackState){
this.page.generateBackState(this._backState);
}
}
this._lastPageName=this._pageName;
if(this._designerOpenPageButton){
dojo[this._pageName?"addClass":"removeClass"](this._designerOpenPageButton,"hasPageName");
}
var o=this._pageName;
this._pageName=this[_227||"pageName"]=_226||"";
if(this.isDesignedComponent()&&this.designWrapper){
this.createOpenPageButton();
}
this.pageLoadedDeferred=new dojo.Deferred();
if(o!=this._pageName||!this.page){
this.loadPage(this._pageName);
}
this.valueChanged("pageName",this._pageName);
},forceReloadPage:function(){
var _228=this._pageName;
this.setPageName(null);
delete window[_228];
this.setPageName(_228);
},onPageChanged:function(_229,_22a){
},_onShowParent:function(){
this.revealed();
},revealed:function(){
if(!this.page){
this.loadPage(this._pageName);
}else{
this.page.onShow();
this.page.root.callOnShowParent();
}
},flow:function(){
if(this._boundsDirty){
wm.fire(this.page,"reflow");
}
},reflow:function(){
this._boundsDirty=true;
this.flow();
},hasPageLoaded:function(_22b){
if(!_22b){
return Boolean(this.page);
}
return Boolean(this.page&&this.page.name==_22b);
},toHtml:function(){
if(this.page&&this.page.root){
return this.page.root.toHtml();
}else{
return "";
}
},updateIsDirty:function(){
this.setValue("isDirty",this.getIsDirty());
wm.fire(this.parent,"updateIsDirty");
},getIsDirty:function(){
if(this.page){
return this.page.root.getIsDirty();
}
},getOrderedWidgets:function(){
if(this._isDesignLoaded){
return [];
}
if(this.page){
return [this.page.root];
}else{
return [];
}
}});
}
if(!dojo._hasResource["wm.base.widget.Scrim"]){
dojo._hasResource["wm.base.widget.Scrim"]=true;
dojo.provide("wm.base.widget.Scrim");
dojo.declare("wm.Scrim",wm.Widget,{_noAnimation:false,showing:false,waitCursor:true,init:function(){
if(this.owner&&this.owner.isDesignedComponent()){
studio.designer.domNode.appendChild(this.domNode);
}else{
document.body.appendChild(this.domNode);
}
this.inherited(arguments);
dojo.addClass(this.domNode,"wmscrim");
this.domNode.style.zIndex=20;
this.domNode.style.position="absolute";
if(this.waitCursor){
this.domNode.style.cursor="wait";
}
this.subscribe("window-resize",this,"resize");
},resize:function(){
wm.onidle(this,function(){
if(this.showing){
this.reflowParent();
}
});
},reflowParent:function(){
if(this.domNode.parentNode){
dojo.marginBox(this.domNode,dojo.contentBox(this.domNode.parentNode));
}
},scrimify:function(){
var f=dojo.hitch.apply(dojo,arguments);
this.setShowing(true);
try{
f();
}
finally{
this.setShowing(false);
}
},scrimOnIdle:function(){
this.setShowing(true);
var self=this,args=arguments;
setTimeout(function(){
self.scrimify.apply(self,args);
},100);
},setShowing:function(_22c){
if(this._cupdating||this._noAnimation){
return this.inherited(arguments);
}
var _22d=(this._cupdating||this.showing==_22c)?0:app.dialogAnimationTime;
if(_22c){
if(_22d){
if(this._hideAnimation){
this._hideAnimation.stop();
}
this._showAnimation=this._showAnimation||dojo.animateProperty({node:this.domNode,properties:{opacity:0.35},duration:_22d});
if(this._showAnimation.status()!="playing"){
this.domNode.style.opacity=0.01;
this.inherited(arguments);
this._showAnimation.play();
}
}else{
this.inherited(arguments);
}
}else{
if(_22d){
if(this._showAnimation){
this._showAnimation.stop();
}
this._hideAnimation=this._hideAnimation||dojo.animateProperty({node:this.domNode,properties:{opacity:0.01},duration:_22d,onEnd:dojo.hitch(this,function(){
if(!this.domNode){
return;
}
wm.Control.prototype.setShowing.call(this,false);
})});
if(this._hideAnimation.status()!="playing"){
this._hideAnimation.play();
}
}else{
this.inherited(arguments);
}
}
},scrimifyDeferred:function(_22e){
this.setShowing(true);
_22e.addCallback(dojo.hitch(this,this.setShowing,false));
}});
}
if(!dojo._hasResource["wm.base.components.Timer"]){
dojo._hasResource["wm.base.components.Timer"]=true;
dojo.provide("wm.base.components.Timer");
dojo.declare("wm.Timer",wm.Component,{delay:500,repeating:true,_timeoutId:0,_intervalId:0,autoStart:false,count:0,init:function(){
this.inherited(arguments);
if(this.autoStart){
this.startTimer();
}
},startTimer:function(){
this.stopTimer();
this.count=0;
if(this.repeating){
this._intervalId=window.setInterval(dojo.hitch(this,"onTimerFire"),this.delay);
}else{
this._timeoutId=window.setTimeout(dojo.hitch(this,"onTimerFire"),this.delay);
}
},stopTimer:function(){
if(this._timeoutId){
window.clearTimeout(this._timeoutId);
this._timeoutId=0;
}
if(this._intervalId){
window.clearInterval(this._intervalId);
this._intervalId=0;
}
},destroy:function(){
this.stopTimer();
this.inherited(arguments);
},onTimerFire:function(){
this.count++;
this.valueChanged("count",this.count);
},activate:function(){
this.startTimer();
},update:function(){
this.startTimer();
},setRepeating:function(_22f){
var _230=this._timeoutId||this._intervalId;
if(_230){
this.stopTimer();
}
this.repeating=_22f;
if(_230){
this.startTimer();
}
},setDelay:function(_231){
var _232=this._timeoutId||this._intervalId;
if(_232){
this.stopTimer();
}
this.delay=_231;
if(_232){
this.startTimer();
}
}});
wm.Object.extendSchema(wm.Timer,{owner:{group:"common",order:1,ignore:1,unwritable:true,options:["Page","Application"],doc:1},autoStart:{group:"widgetName",subgroup:"behavior",bindTarget:true},delay:{group:"widgetName",subgroup:"behavior",bindTarget:true},count:{group:"widgetName",subgroup:"behavior",bindSource:true,ignore:true},repeating:{group:"widgetName",subgroup:"behavior"},startTimer:{method:1,doc:1},stopTimer:{method:1,doc:1},setDelay:{method:1,doc:1}});
}
if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return dijit.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=dojo.doc.selection,cf=dijit._curFocus;
if(dojo.global.getSelection){
sel=dojo.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_233){
var _234=dojo.doc,mark=_233.mark;
if(mark){
if(dojo.global.getSelection){
var sel=dojo.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var r=mark;
var n=r.node;
n.selectionStart=r.start;
n.selectionEnd=r.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_234.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(dojo.isArray(mark)){
rg=_234.body.createControlRange();
dojo.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_234.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_235){
var node=!dijit._curFocus||(menu&&dojo.isDescendant(dijit._curFocus,menu.domNode))?dijit._prevFocus:dijit._curFocus;
return {node:node,bookmark:(node==dijit._curFocus)&&dojo.withGlobal(_235||dojo.global,dijit.getBookmark),openedForWindow:_235};
},focus:function(_236){
if(!_236){
return;
}
var node="node" in _236?_236.node:_236,_237=_236.bookmark,_238=_236.openedForWindow,_239=_237?_237.isCollapsed:false;
if(node){
var _23a=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_23a&&_23a.focus){
try{
_23a.focus();
}
catch(e){
}
}
dijit._onFocusNode(node);
}
if(_237&&dojo.withGlobal(_238||dojo.global,dijit.isCollapsed)&&!_239){
if(_238){
_238.focus();
}
try{
dojo.withGlobal(_238||dojo.global,dijit.moveToBookmark,null,[_237]);
}
catch(e2){
}
}
},_activeStack:[],registerIframe:function(_23b){
return dijit.registerWin(_23b.contentWindow,_23b);
},unregisterIframe:function(_23c){
dijit.unregisterWin(_23c);
},registerWin:function(_23d,_23e){
var _23f=function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
if(dojo.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
dijit._onTouchNode(_23e||evt.target||evt.srcElement,"mouse");
};
var doc=dojo.isIE?_23d.document.documentElement:_23d.document;
if(doc){
if(dojo.isIE){
_23d.document.body.attachEvent("onmousedown",_23f);
var _240=function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(evt.srcElement)){
dijit._onFocusNode(_23e||evt.srcElement);
}else{
dijit._onTouchNode(_23e||evt.srcElement);
}
};
doc.attachEvent("onactivate",_240);
var _241=function(evt){
dijit._onBlurNode(_23e||evt.srcElement);
};
doc.attachEvent("ondeactivate",_241);
return function(){
_23d.document.detachEvent("onmousedown",_23f);
doc.detachEvent("onactivate",_240);
doc.detachEvent("ondeactivate",_241);
doc=null;
};
}else{
doc.body.addEventListener("mousedown",_23f,true);
var _242=function(evt){
dijit._onFocusNode(_23e||evt.target);
};
doc.addEventListener("focus",_242,true);
var _243=function(evt){
dijit._onBlurNode(_23e||evt.target);
};
doc.addEventListener("blur",_243,true);
return function(){
doc.body.removeEventListener("mousedown",_23f,true);
doc.removeEventListener("focus",_242,true);
doc.removeEventListener("blur",_243,true);
doc=null;
};
}
}
},unregisterWin:function(_244){
_244&&_244();
},_onBlurNode:function(node){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(node,by){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _245=[];
try{
while(node){
var _246=dojo.attr(node,"dijitPopupParent");
if(_246){
node=dijit.byId(_246).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===dojo.body()){
break;
}
node=dojo.window.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_247=id&&dijit.byId(id);
if(_247&&!(by=="mouse"&&_247.get("disabled"))){
_245.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_245,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
dijit._onTouchNode(node);
if(node==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
},_setStack:function(_248,by){
var _249=dijit._activeStack;
dijit._activeStack=_248;
for(var _24a=0;_24a<Math.min(_249.length,_248.length);_24a++){
if(_249[_24a]!=_248[_24a]){
break;
}
}
var _24b;
for(var i=_249.length-1;i>=_24a;i--){
_24b=dijit.byId(_249[i]);
if(_24b){
_24b._focused=false;
_24b.set("focused",false);
_24b._hasBeenBlurred=true;
if(_24b._onBlur){
_24b._onBlur(by);
}
dojo.publish("widgetBlur",[_24b,by]);
}
}
for(i=_24a;i<_248.length;i++){
_24b=dijit.byId(_248[i]);
if(_24b){
_24b._focused=true;
_24b.set("focused",true);
if(_24b._onFocus){
_24b._onFocus(by);
}
dojo.publish("widgetFocus",[_24b,by]);
}
}
}});
dojo.addOnLoad(function(){
var _24c=dijit.registerWin(window);
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit.unregisterWin(_24c);
_24c=null;
});
}
});
}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_24d){
this.pairs=[];
this.returnWrappers=_24d||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(name,_24e,wrap,_24f,_250){
this.pairs[((_250)?"unshift":"push")]([name,_24e,wrap,_24f]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
return dojo.window.getBox();
};
dijit.placeOnScreen=function(node,pos,_251,_252){
var _253=dojo.map(_251,function(_254){
var c={corner:_254,pos:{x:pos.x,y:pos.y}};
if(_252){
c.pos.x+=_254.charAt(1)=="L"?_252.x:-_252.x;
c.pos.y+=_254.charAt(0)=="T"?_252.y:-_252.y;
}
return c;
});
return dijit._place(node,_253);
};
dijit._place=function(node,_255,_256,_257){
var view=dojo.window.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(node);
}
var best=null;
dojo.some(_255,function(_258){
var _259=_258.corner;
var pos=_258.pos;
var _25a=0;
var _25b={w:_259.charAt(1)=="L"?(view.l+view.w)-pos.x:pos.x-view.l,h:_259.charAt(1)=="T"?(view.t+view.h)-pos.y:pos.y-view.t};
if(_256){
var res=_256(node,_258.aroundCorner,_259,_25b,_257);
_25a=typeof res=="undefined"?0:res;
}
var _25c=node.style;
var _25d=_25c.display;
var _25e=_25c.visibility;
_25c.visibility="hidden";
_25c.display="";
var mb=dojo.marginBox(node);
_25c.display=_25d;
_25c.visibility=_25e;
var _25f=Math.max(view.l,_259.charAt(1)=="L"?pos.x:(pos.x-mb.w)),_260=Math.max(view.t,_259.charAt(0)=="T"?pos.y:(pos.y-mb.h)),endX=Math.min(view.l+view.w,_259.charAt(1)=="L"?(_25f+mb.w):pos.x),endY=Math.min(view.t+view.h,_259.charAt(0)=="T"?(_260+mb.h):pos.y),_261=endX-_25f,_262=endY-_260;
_25a+=(mb.w-_261)+(mb.h-_262);
if(best==null||_25a<best.overflow){
best={corner:_259,aroundCorner:_258.aroundCorner,x:_25f,y:_260,w:_261,h:_262,overflow:_25a,spaceAvailable:_25b};
}
return !_25a;
});
if(best.overflow&&_256){
_256(node,best.aroundCorner,best.corner,best.spaceAvailable,_257);
}
var l=dojo._isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
return best;
};
dijit.placeOnScreenAroundNode=function(node,_263,_264,_265){
_263=dojo.byId(_263);
var _266=dojo.position(_263,true);
return dijit._placeOnScreenAroundRect(node,_266.x,_266.y,_266.w,_266.h,_264,_265);
};
dijit.placeOnScreenAroundRectangle=function(node,_267,_268,_269){
return dijit._placeOnScreenAroundRect(node,_267.x,_267.y,_267.width,_267.height,_268,_269);
};
dijit._placeOnScreenAroundRect=function(node,x,y,_26a,_26b,_26c,_26d){
var _26e=[];
for(var _26f in _26c){
_26e.push({aroundCorner:_26f,corner:_26c[_26f],pos:{x:x+(_26f.charAt(1)=="L"?0:_26a),y:y+(_26f.charAt(0)=="T"?0:_26b)}});
}
return dijit._place(node,_26e,_26d,{w:_26a,h:_26b});
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(node,_270,_271,_272){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
dijit.getPopupAroundAlignment=function(_273,_274){
var _275={};
dojo.forEach(_273,function(pos){
switch(pos){
case "after":
_275[_274?"BR":"BL"]=_274?"BL":"BR";
break;
case "before":
_275[_274?"BL":"BR"]=_274?"BR":"BL";
break;
case "below-alt":
_274=!_274;
case "below":
_275[_274?"BL":"BR"]=_274?"TL":"TR";
_275[_274?"BR":"BL"]=_274?"TR":"TL";
break;
case "above-alt":
_274=!_274;
case "above":
default:
_275[_274?"TL":"TR"]=_274?"BL":"BR";
_275[_274?"TR":"TL"]=_274?"BR":"BL";
break;
}
});
return _275;
};
}
if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
return dojo.window.get(doc);
};
}
if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup={_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_276){
var _277=_276.declaredClass?_276._popupWrapper:(_276.parentNode&&dojo.hasClass(_276.parentNode,"dijitPopup")),node=_276.domNode||_276;
if(!_277){
_277=dojo.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},dojo.body());
_277.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
if(_276.declaredClass){
_276._popupWrapper=_277;
dojo.connect(_276,"destroy",function(){
dojo.destroy(_277);
delete _276._popupWrapper;
});
}
}
return _277;
},moveOffScreen:function(_278){
var _279=this._createWrapper(_278);
dojo.style(_279,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_27a){
var _27b=this._createWrapper(_27a);
dojo.style(_27b,"display","none");
},getTopPopup:function(){
var _27c=this._stack;
for(var pi=_27c.length-1;pi>0&&_27c[pi].parent===_27c[pi-1].widget;pi--){
}
return _27c[pi];
},open:function(args){
var _27d=this._stack,_27e=args.popup,_27f=args.orient||((args.parent?args.parent.isLeftToRight():dojo._isBodyLtr())?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"}),_280=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_27d.length&&(!args.parent||!dojo.isDescendant(args.parent.domNode,_27d[_27d.length-1].widget.domNode))){
dijit.popup.close(_27d[_27d.length-1].widget);
}
var _281=this._createWrapper(_27e);
dojo.attr(_281,{id:id,style:{zIndex:this._beginZIndex+_27d.length},"class":"dijitPopup "+(_27e.baseClass||_27e["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(dojo.isIE||dojo.isMoz){
if(!_27e.bgIframe){
_27e.bgIframe=new dijit.BackgroundIframe(_281);
}
}
var best=_280?dijit.placeOnScreenAroundElement(_281,_280,_27f,_27e.orient?dojo.hitch(_27e,"orient"):null):dijit.placeOnScreen(_281,args,_27f=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_281.style.display="";
_281.style.visibility="visible";
_27e.domNode.style.visibility="visible";
var _282=[];
_282.push(dojo.connect(_281,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&args.onCancel){
dojo.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _283=this.getTopPopup();
if(_283&&_283.onCancel){
_283.onCancel();
}
}
}
}));
if(_27e.onCancel){
_282.push(dojo.connect(_27e,"onCancel",args.onCancel));
}
_282.push(dojo.connect(_27e,_27e.onExecute?"onExecute":"onChange",this,function(){
var _284=this.getTopPopup();
if(_284&&_284.onExecute){
_284.onExecute();
}
}));
_27d.push({widget:_27e,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_282});
if(_27e.onOpen){
_27e.onOpen(best);
}
return best;
},close:function(_285){
var _286=this._stack;
while((_285&&dojo.some(_286,function(elem){
return elem.widget==_285;
}))||(!_285&&_286.length)){
var top=_286.pop(),_287=top.widget,_288=top.onClose;
if(_287.onClose){
_287.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(_287&&_287.domNode){
this.hide(_287);
}
if(_288){
_288();
}
}
}};
dijit._frames=new function(){
var _289=[];
this.pop=function(){
var _28a;
if(_289.length){
_28a=_289.pop();
_28a.style.display="";
}else{
if(dojo.isIE<9){
var burl=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_28a=dojo.doc.createElement(html);
}else{
_28a=dojo.create("iframe");
_28a.src="javascript:\"\"";
_28a.className="dijitBackgroundIframe";
dojo.style(_28a,"opacity",0.1);
}
_28a.tabIndex=-1;
dijit.setWaiRole(_28a,"presentation");
}
return _28a;
};
this.push=function(_28b){
_28b.style.display="none";
_289.push(_28b);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE||dojo.isMoz){
var _28c=(this.iframe=dijit._frames.pop());
node.appendChild(_28c);
if(dojo.isIE<7||dojo.isQuirks){
this.resize(node);
this._conn=dojo.connect(node,"onresize",this,function(){
this.resize(node);
});
}else{
dojo.style(_28c,{width:"100%",height:"100%"});
}
}
};
dojo.extend(dijit.BackgroundIframe,{resize:function(node){
if(this.iframe){
dojo.style(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
dojo.disconnect(this._conn);
this._conn=null;
}
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node,pos){
dojo.window.scrollIntoView(node,pos);
};
}
if(!dojo._hasResource["dojo.uacss"]){
dojo._hasResource["dojo.uacss"]=true;
dojo.provide("dojo.uacss");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_28d=d.isOpera,maj=Math.floor,ff=d.isFF,_28e=d.boxModel.replace(/-/,""),_28f={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_ie8:maj(ie)==8,dj_ie9:maj(ie)==9,dj_quirks:d.isQuirks,dj_iequirks:ie&&d.isQuirks,dj_opera:_28d,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla,dj_ff3:maj(ff)==3};
_28f["dj_"+_28e]=true;
var _290="";
for(var clz in _28f){
if(_28f[clz]){
_290+=clz+" ";
}
}
html.className=d.trim(html.className+" "+_290);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _291="dj_rtl dijitRtl "+_290.replace(/ /g,"-rtl ");
html.className=d.trim(html.className+" "+_291);
}
});
})();
}
if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
}
if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_292,node,_293,obj,_294,_295,_296){
if(obj!=this._obj){
this.stop();
this._initialDelay=_295||500;
this._subsequentDelay=_294||0.9;
this._minDelay=_296||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_292,_293);
this._fireEventAndReload();
this._evt=dojo.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_297,_298,_299,_29a,_29b,_29c){
if(_297.keyCode){
_297.charOrCode=_297.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_297.charCode){
_297.charOrCode=String.fromCharCode(_297.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_297.charOrCode&&(_297.ctrlKey===undefined||_297.ctrlKey==evt.ctrlKey)&&(_297.altKey===undefined||_297.altKey==evt.altKey)&&(_297.metaKey===undefined||_297.metaKey==(evt.metaKey||false))&&(_297.shiftKey===undefined||_297.shiftKey==evt.shiftKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_298,node,_299,_297,_29a,_29b,_29c);
}else{
if(dijit.typematic._obj==_297){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_297){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_29d,_29e,_29f,_2a0,_2a1){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_29d,node,_29e,node,_29f,_2a0,_2a1);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
evt.preventDefault();
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_29d,node,_29e,node,_29f,_2a0,_2a1);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_2a2,_2a3,_2a4,_2a5,_2a6,_2a7,_2a8,_2a9){
return this.addKeyListener(_2a3,_2a4,_2a5,_2a6,_2a7,_2a8,_2a9).concat(this.addMouseListener(_2a2,_2a5,_2a6,_2a7,_2a8,_2a9));
}};
}
if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _2aa=cs.backgroundImage;
var _2ab=(cs.borderTopColor==cs.borderRightColor)||(_2aa!=null&&(_2aa=="none"||_2aa=="url(invalid-url:)"));
dojo[_2ab?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{hasWaiRole:function(elem,role){
var _2ac=this.getWaiRole(elem);
return role?(_2ac.indexOf(role)>-1):(_2ac.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
dojo.attr(elem,"role",role);
},removeWaiRole:function(elem,role){
var _2ad=dojo.attr(elem,"role");
if(!_2ad){
return;
}
if(role){
var t=dojo.trim((" "+_2ad+" ").replace(" "+role+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_2ae){
return elem.hasAttribute?elem.hasAttribute("aria-"+_2ae):!!elem.getAttribute("aria-"+_2ae);
},getWaiState:function(elem,_2af){
return elem.getAttribute("aria-"+_2af)||"";
},setWaiState:function(elem,_2b0,_2b1){
elem.setAttribute("aria-"+_2b0,_2b1);
},removeWaiState:function(elem,_2b2){
elem.removeAttribute("aria-"+_2b2);
}});
}
if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
}
if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.connect(dojo,"_connect",function(_2b3,_2b4){
if(_2b3&&dojo.isFunction(_2b3._onConnect)){
_2b3._onConnect(_2b4);
}
});
dijit._connectOnUseEventHandler=function(_2b5){
};
dijit._lastKeyDownNode=null;
if(dojo.isIE){
(function(){
var _2b6=function(evt){
dijit._lastKeyDownNode=evt.srcElement;
};
dojo.doc.attachEvent("onkeydown",_2b6);
dojo.addOnWindowUnload(function(){
dojo.doc.detachEvent("onkeydown",_2b6);
});
})();
}else{
dojo.doc.addEventListener("keydown",function(evt){
dijit._lastKeyDownNode=evt.target;
},true);
}
(function(){
dojo.declare("dijit._Widget",dijit._WidgetBase,{_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,create:function(_2b7,_2b8){
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
this.inherited(arguments);
if(this.domNode){
for(attr in this.params){
this._onConnect(attr);
}
}
},_onConnect:function(_2b9){
if(_2b9 in this._deferredConnects){
var _2ba=this[this._deferredConnects[_2b9]||"domNode"];
this.connect(_2ba,_2b9.toLowerCase(),_2b9);
delete this._deferredConnects[_2b9];
}
},focused:false,isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},setAttribute:function(attr,_2bb){
dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_2bb);
},attr:function(name,_2bc){
if(dojo.config.isDebug){
var _2bd=arguments.callee._ach||(arguments.callee._ach={}),_2be=(arguments.callee.caller||"unknown caller").toString();
if(!_2bd[_2be]){
dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_2be,"","2.0");
_2bd[_2be]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_2bf,_2c0){
var d=dojo,dc=d._connect,_2c1=this.inherited(arguments,[obj,_2bf=="ondijitclick"?"onclick":_2bf,_2c0]);
if(_2bf=="ondijitclick"){
if(d.indexOf(this.nodesWithKeyClick,obj.nodeName.toLowerCase())==-1){
var m=d.hitch(this,_2c0);
_2c1.push(dc(obj,"onkeydown",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=e.target;
if(!("openDropDown" in this&&obj==this._buttonNode)){
e.preventDefault();
}
}
}),dc(obj,"onkeyup",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&e.target==dijit._lastKeyDownNode&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=null;
return m(e);
}
}));
}
}
return _2c1;
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
})();
}
if(!dojo._hasResource["dojo.cache"]){
dojo._hasResource["dojo.cache"]=true;
dojo.provide("dojo.cache");
var cache={};
dojo.cache=function(_2c2,url,_2c3){
if(typeof _2c2=="string"){
var _2c4=dojo.moduleUrl(_2c2,url);
}else{
_2c4=_2c2;
_2c3=url;
}
var key=_2c4.toString();
var val=_2c3;
if(_2c3!=undefined&&!dojo.isString(_2c3)){
val=("value" in _2c3?_2c3.value:undefined);
}
var _2c5=_2c3&&_2c3.sanitize?true:false;
if(typeof val=="string"){
val=cache[key]=_2c5?dojo.cache._sanitize(val):val;
}else{
if(val===null){
delete cache[key];
}else{
if(!(key in cache)){
val=dojo._getText(key);
cache[key]=_2c5?dojo.cache._sanitize(val):val;
}
val=cache[key];
}
}
return val;
};
dojo.cache._sanitize=function(val){
if(val){
val=val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _2c6=val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_2c6){
val=_2c6[1];
}
}else{
val="";
}
return val;
};
}
if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _2c7=this.declaredClass,_2c8=this;
return dojo.string.substitute(tmpl,this,function(_2c9,key){
if(key.charAt(0)=="!"){
_2c9=dojo.getObject(key.substr(1),false,_2c8);
}
if(typeof _2c9=="undefined"){
throw new Error(_2c7+" template:"+key);
}
if(_2c9==null){
return "";
}
return key.charAt(0)=="!"?_2c9:_2c9.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _2ca=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_2ca)){
node=dojo._toDom(this._stringRepl(_2ca));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_2ca);
}
}else{
node=_2ca.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._startupWidgets=dojo.parser.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang},propsThis:this,scope:"dojo"}));
this._supportingWidgets=dijit.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_2cb){
var dest=this.containerNode;
if(_2cb&&dest){
while(_2cb.hasChildNodes()){
dest.appendChild(_2cb.firstChild);
}
}
},_attachTemplateNodes:function(_2cc,_2cd){
_2cd=_2cd||function(n,p){
return n.getAttribute(p);
};
var _2ce=dojo.isArray(_2cc)?_2cc:(_2cc.all||_2cc.getElementsByTagName("*"));
var x=dojo.isArray(_2cc)?0:-1;
for(;x<_2ce.length;x++){
var _2cf=(x==-1)?_2cc:_2ce[x];
if(this.widgetsInTemplate&&(_2cd(_2cf,"dojoType")||_2cd(_2cf,"data-dojo-type"))){
continue;
}
var _2d0=_2cd(_2cf,"dojoAttachPoint")||_2cd(_2cf,"data-dojo-attach-point");
if(_2d0){
var _2d1,_2d2=_2d0.split(/\s*,\s*/);
while((_2d1=_2d2.shift())){
if(dojo.isArray(this[_2d1])){
this[_2d1].push(_2cf);
}else{
this[_2d1]=_2cf;
}
this._attachPoints.push(_2d1);
}
}
var _2d3=_2cd(_2cf,"dojoAttachEvent")||_2cd(_2cf,"data-dojo-attach-event");
if(_2d3){
var _2d4,_2d5=_2d3.split(/\s*,\s*/);
var trim=dojo.trim;
while((_2d4=_2d5.shift())){
if(_2d4){
var _2d6=null;
if(_2d4.indexOf(":")!=-1){
var _2d7=_2d4.split(":");
_2d4=trim(_2d7[0]);
_2d6=trim(_2d7[1]);
}else{
_2d4=trim(_2d4);
}
if(!_2d6){
_2d6=_2d4;
}
this._attachEvents.push(this.connect(_2cf,_2d4,_2d6));
}
}
}
var role=_2cd(_2cf,"waiRole");
if(role){
dijit.setWaiRole(_2cf,role);
}
var _2d8=_2cd(_2cf,"waiState");
if(_2d8){
dojo.forEach(_2d8.split(/\s*,\s*/),function(_2d9){
if(_2d9.indexOf("-")!=-1){
var pair=_2d9.split("-");
dijit.setWaiState(_2cf,pair[0],pair[1]);
}
});
}
}
},startup:function(){
dojo.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
},destroyRendering:function(){
dojo.forEach(this._attachPoints,function(_2da){
delete this[_2da];
},this);
this._attachPoints=[];
dojo.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_2db,_2dc,_2dd){
var _2de=dijit._Templated._templateCache;
var key=_2dc||_2db;
var _2df=_2de[key];
if(_2df){
try{
if(!_2df.ownerDocument||_2df.ownerDocument==dojo.doc){
return _2df;
}
}
catch(e){
}
dojo.destroy(_2df);
}
if(!_2dc){
_2dc=dojo.cache(_2db,{sanitize:true});
}
_2dc=dojo.string.trim(_2dc);
if(_2dd||_2dc.match(/\$\{([^\}]+)\}/g)){
return (_2de[key]=_2dc);
}else{
var node=dojo._toDom(_2dc);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_2dc);
}
return (_2de[key]=node);
}
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _2e0=dijit._Templated._templateCache;
for(var key in _2e0){
var _2e1=_2e0[key];
if(typeof _2e1=="object"){
dojo.destroy(_2e1);
}
delete _2e0[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!dojo._hasResource["dijit._CssStateMixin"]){
dojo._hasResource["dijit._CssStateMixin"]=true;
dojo.provide("dijit._CssStateMixin");
dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,dojo.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_2e2){
if(!this.disabled){
switch(_2e2.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
this._set("active",true);
this._mouseDown=true;
var _2e3=this.connect(dojo.body(),"onmouseup",function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_2e3);
});
break;
}
}
},_setStateClass:function(){
var _2e4=this.baseClass.split(" ");
function _2e5(_2e6){
_2e4=_2e4.concat(dojo.map(_2e4,function(c){
return c+_2e6;
}),"dijit"+_2e6);
};
if(!this.isLeftToRight()){
_2e5("Rtl");
}
if(this.checked){
_2e5("Checked");
}
if(this.state){
_2e5(this.state);
}
if(this.selected){
_2e5("Selected");
}
if(this.disabled){
_2e5("Disabled");
}else{
if(this.readOnly){
_2e5("ReadOnly");
}else{
if(this.active){
_2e5("Active");
}else{
if(this.hovering){
_2e5("Hover");
}
}
}
}
if(this._focused){
_2e5("Focused");
}
var tn=this.stateNode||this.domNode,_2e7={};
dojo.forEach(tn.className.split(" "),function(c){
_2e7[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _2e7[c];
});
}
dojo.forEach(_2e4,function(c){
_2e7[c]=true;
});
var _2e8=[];
for(var c in _2e7){
_2e8.push(c);
}
var _2e9=_2e8.join(" ");
if(tn.className!=_2e9){
tn.className=_2e9;
}
this._stateClasses=_2e4;
},_trackMouseState:function(node,_2ea){
var _2eb=false,_2ec=false,_2ed=false;
var self=this,cn=dojo.hitch(this,"connect",node);
function _2ee(){
var _2ef=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
dojo.toggleClass(node,_2ea+"Hover",_2eb&&!_2ec&&!_2ef);
dojo.toggleClass(node,_2ea+"Active",_2ec&&!_2ef);
dojo.toggleClass(node,_2ea+"Focused",_2ed&&!_2ef);
};
cn("onmouseenter",function(){
_2eb=true;
_2ee();
});
cn("onmouseleave",function(){
_2eb=false;
_2ec=false;
_2ee();
});
cn("onmousedown",function(){
_2ec=true;
_2ee();
});
cn("onmouseup",function(){
_2ec=false;
_2ee();
});
cn("onfocus",function(){
_2ed=true;
_2ee();
});
cn("onblur",function(){
_2ed=false;
_2ee();
});
this.watch("disabled",_2ee);
this.watch("readOnly",_2ee);
}});
}
if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_2f0){
this._set("disabled",_2f0);
dojo.attr(this.focusNode,"disabled",_2f0);
if(this.valueNode){
dojo.attr(this.valueNode,"disabled",_2f0);
}
dijit.setWaiState(this.focusNode,"disabled",_2f0);
if(_2f0){
this._set("hovering",false);
this._set("active",false);
var _2f1="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:"focusNode";
dojo.forEach(dojo.isArray(_2f1)?_2f1:[_2f1],function(_2f2){
var node=this[_2f2];
if(dojo.isWebKit||dijit.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
}
},setDisabled:function(_2f3){
dojo.deprecated("setDisabled("+_2f3+") is deprecated. Use set('disabled',"+_2f3+") instead.","","2.0");
this.set("disabled",_2f3);
},_onFocus:function(e){
if(this.scrollOnFocus){
dojo.window.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled){
dijit.focus(this.focusNode);
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_2f4){
},_onChangeActive:false,_handleOnChange:function(_2f5,_2f6){
if(_2f5===this._lastValueReported){
return;
}
if(this._lastValueReported==undefined&&(_2f6===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_2f5;
}
this._pendingOnChange=this._pendingOnChange||(typeof _2f5!=typeof this._lastValueReported)||(this.compare(_2f5,this._lastValueReported)!=0);
if((this.intermediateChanges||_2f6||_2f6===undefined)&&this._pendingOnChange){
this._lastValueReported=_2f5;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(dojo.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_2f5);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},setValue:function(_2f7){
dojo.deprecated("dijit.form._FormWidget:setValue("+_2f7+") is deprecated.  Use set('value',"+_2f7+") instead.","","2.0");
this.set("value",_2f7);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_onMouseDown:function(e){
if(!e.ctrlKey&&dojo.mouseButtons.isLeft(e)&&this.isFocusable()){
var _2f8=this.connect(dojo.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_2f8);
});
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(_2f9){
dojo.attr(this.focusNode,"readOnly",_2f9);
dijit.setWaiState(this.focusNode,"readonly",_2f9);
this._set("readOnly",_2f9);
},postCreate:function(){
this.inherited(arguments);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_2fa,_2fb){
this._handleOnChange(_2fa,_2fb);
},_handleOnChange:function(_2fc,_2fd){
this._set("value",_2fc);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
},_layoutHackIE7:function(){
if(dojo.isIE==7){
var _2fe=this.domNode;
var _2ff=_2fe.parentNode;
var _300=_2fe.firstChild||_2fe;
var _301=_300.style.filter;
var _302=this;
while(_2ff&&_2ff.clientHeight==0){
(function ping(){
var _303=_302.connect(_2ff,"onscroll",function(e){
_302.disconnect(_303);
_300.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_300.style.filter=_301;
},0);
});
})();
_2ff=_2ff.parentNode;
}
}
}});
}
if(!dojo._hasResource["dijit.form.TextBox"]){
dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",templateString:dojo.cache("dijit.form","templates/TextBox.html","<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" dojoAttachPoint=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:dojo.isIE?"disabled":"",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==dijit.form.TextBox.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this._focused&&!this.textbox.value)?"":"none";
}
},_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_304,_305,_306){
var _307;
if(_304!==undefined){
_307=this.filter(_304);
if(typeof _306!="string"){
if(_307!==null&&((typeof _307!="number")||!isNaN(_307))){
_306=this.filter(this.format(_307,this.constraints));
}else{
_306="";
}
}
}
if(_306!=null&&_306!=undefined&&((typeof _306)!="number"||!isNaN(_306))&&this.textbox.value!=_306){
this.textbox.value=_306;
this._set("displayedValue",this.get("displayedValue"));
}
this._updatePlaceHolder();
this.inherited(arguments,[_307,_305]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_308){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_308);
},_setDisplayedValueAttr:function(_309){
if(_309===null||_309===undefined){
_309="";
}else{
if(typeof _309!="string"){
_309=String(_309);
}
}
this.textbox.value=_309;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_30a,_30b){
return ((_30a==null||_30a==undefined)?"":(_30a.toString?_30a.toString():_30a));
},parse:function(_30c,_30d){
return _30c;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _30e=this;
setTimeout(function(){
_30e._handleOnChange(_30e.get("value"),false);
},0);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
if(dojo.isIE){
setTimeout(dojo.hitch(this,function(){
var s=dojo.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _30f=this.domNode.getElementsByTagName("INPUT");
if(_30f){
for(var i=0;i<_30f.length;i++){
_30f[i].style.fontFamily=ff;
}
}
}
}
}),0);
}
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput","_onInput");
}else{
this.connect(this.textbox,"onkeydown","_onInput");
this.connect(this.textbox,"onkeyup","_onInput");
this.connect(this.textbox,"onpaste","_onInput");
this.connect(this.textbox,"oncut","_onInput");
}
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=dojo.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
if(this.selectOnClick&&dojo.isMoz){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
var _310;
if(dojo.isIE){
var _311=dojo.doc.selection.createRange();
var _312=_311.parentElement();
_310=_312==this.textbox&&_311.text.length==0;
}else{
_310=this.textbox.selectionStart==this.textbox.selectionEnd;
}
if(_310){
dijit.selectInputText(this.textbox);
}
});
}
this._updatePlaceHolder();
this.inherited(arguments);
this._message="";
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_313,_314,stop){
var _315=dojo.global;
var _316=dojo.doc;
_313=dojo.byId(_313);
if(isNaN(_314)){
_314=0;
}
if(isNaN(stop)){
stop=_313.value?_313.value.length:0;
}
dijit.focus(_313);
if(_316["selection"]&&dojo.body()["createTextRange"]){
if(_313.createTextRange){
var r=_313.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_314);
r.moveEnd("character",stop-_314);
r.select();
}
}else{
if(_315["getSelection"]){
if(_313.setSelectionRange){
_313.setSelectionRange(_314,stop);
}
}
}
};
}
if(!dojo._hasResource["dijit.Tooltip"]){
dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" dojoAttachPoint=\"connectorNode\"></div\n></div>\n"),postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_317,_318,_319,rtl){
if(this.aroundNode&&this.aroundNode===_318){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_317;
var pos=dijit.placeOnScreenAroundElement(this.domNode,_318,dijit.getPopupAroundAlignment((_319&&_319.length)?_319:dijit.Tooltip.defaultPosition,!rtl),dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_318;
},orient:function(node,_31a,_31b,_31c,_31d){
this.connectorNode.style.top="";
var _31e=_31c.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_31a+"-"+_31b];
this.domNode.style.width="auto";
var size=dojo.contentBox(this.domNode);
var _31f=Math.min((Math.max(_31e,1)),size.w);
var _320=_31f<size.w;
this.domNode.style.width=_31f+"px";
if(_320){
this.containerNode.style.overflow="auto";
var _321=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_321>_31f){
_321=_321+dojo.style(this.domNode,"paddingLeft")+dojo.style(this.domNode,"paddingRight");
this.domNode.style.width=_321+"px";
}
}
if(_31b.charAt(0)=="B"&&_31a.charAt(0)=="B"){
var mb=dojo.marginBox(node);
var _322=this.connectorNode.offsetHeight;
if(mb.h>_31c.h){
var _323=_31c.h-(_31d.h/2)-(_322/2);
this.connectorNode.style.top=_323+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_31d.h/2-_322/2,0),mb.h-_322)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_31e);
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_324){
if(this._onDeck&&this._onDeck[1]==_324){
this._onDeck=null;
}else{
if(this.aroundNode===_324){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_325,_326,_327,rtl){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_325,_326,_327,rtl);
};
dijit.hideTooltip=function(_328){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_328);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_329){
dojo.forEach(this._connections||[],function(_32a){
dojo.forEach(_32a,dojo.hitch(this,"disconnect"));
},this);
var ary=dojo.isArrayLike(_329)?_329:(_329?[_329]:[]);
this._connections=dojo.map(ary,function(id){
var node=dojo.byId(id);
return node?[this.connect(node,"onmouseenter","_onTargetMouseEnter"),this.connect(node,"onmouseleave","_onTargetMouseLeave"),this.connect(node,"onfocus","_onTargetFocus"),this.connect(node,"onblur","_onTargetBlur")]:[];
},this);
this._set("connectId",_329);
this._connectIds=ary;
},addTarget:function(node){
var id=node.id||node;
if(dojo.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=dojo.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
dojo.forEach(dojo.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onTargetMouseEnter:function(e){
this._onHover(e);
},_onTargetMouseLeave:function(e){
this._onUnHover(e);
},_onTargetFocus:function(e){
this._focus=true;
this._onHover(e);
},_onTargetBlur:function(e){
this._focus=false;
this._onUnHover(e);
},_onHover:function(e){
if(!this._showTimer){
var _32b=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_32b);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_32c){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_32c,this.position,!this.isLeftToRight());
this._connectNode=_32c;
this.onShow(_32c,this.position);
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(_32d,_32e){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
dijit.Tooltip.defaultPosition=["after","before"];
}
if(!dojo._hasResource["dijit.form.ValidationTextBox"]){
dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:dojo.cache("dijit.form","templates/ValidationTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(_32f){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_330,_331){
return (new RegExp("^(?:"+this.regExpGen(_331)+")"+(this.required?"":"?")+"$")).test(_330)&&(!this.required||!this._isEmpty(_330))&&(this._isEmpty(_330)||this.parse(_330,_331)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(_332){
var _333=this.validator(this.textbox.value,this.constraints);
if(!_333&&this._isEmpty(this.textbox.value)&&this.required&&_332){
return true;
}
return _333;
},_isEmpty:function(_334){
return (this.trim?/^\s*$/:/^$/).test(_334);
},getErrorMessage:function(_335){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(_336){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_337){
var _338="";
var _339=this.disabled||this.isValid(_337);
if(_339){
this._maskValidSubsetError=true;
}
var _33a=this._isEmpty(this.textbox.value);
var _33b=!_339&&_337&&this._isValidSubset();
this._set("state",_339?"":(((((!this._hasBeenBlurred||_337)&&_33a)||_33b)&&this._maskValidSubsetError)?"Incomplete":"Error"));
dijit.setWaiState(this.focusNode,"invalid",_339?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_337&&_33b;
_338=this.getErrorMessage(_337);
}else{
if(this.state=="Incomplete"){
_338=this.getPromptMessage(_337);
this._maskValidSubsetError=!this._hasBeenBlurred||_337;
}else{
if(_33a&&_337){
_338=this.getPromptMessage(_337);
}
}
}
if(_338&&wm.isDomShowing(this.domNode)){
this.set("message",_338);
}
return _339;
},displayMessage:function(_33c){
dijit.hideTooltip(this.domNode);
if(_33c&&this._focused){
dijit.showTooltip(_33c,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}
},_refreshState:function(){
this.validate(this._focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_33d){
if(!_33d.locale&&this.lang){
_33d.locale=this.lang;
}
this._set("constraints",_33d);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _33e="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_33e+=re;
break;
case ")":
_33e+="|$)";
break;
default:
_33e+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_33e);
}
catch(e){
_33e=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_33e+")$";
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
if(!this.invalidMessage){
this.invalidMessage=this.promptMessage;
}
if(this.missingMessage=="$_unset_$"){
this.missingMessage=this.messages.missingMessage;
}
if(!this.missingMessage){
this.missingMessage=this.invalidMessage;
}
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_33f){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_340){
this._set("required",_340);
dijit.setWaiState(this.focusNode,"required",_340);
this._refreshState();
},_setMessageAttr:function(_341){
this._set("message",_341);
this.displayMessage(_341);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},serialize:function(val,_342){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=dojo.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_343,_344){
return ("min" in _344?(this.compare(_343,_344.min)>=0):true)&&("max" in _344?(this.compare(_343,_344.max)<=0):true);
},isInRange:function(_345){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
var _346=false;
var _347=false;
if("min" in this.constraints){
var min=this.constraints.min;
min=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);
_346=(typeof min=="number")&&min<0;
}
if("max" in this.constraints){
var max=this.constraints.max;
max=this.compare(val,((typeof max!="number")||max>0)?max:0);
_347=(typeof max=="number")&&max>0;
}
return _346||_347;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_348){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_348));
},getErrorMessage:function(_349){
var v=this.get("value");
if(v!==null&&v!==""&&v!==undefined&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_349)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_34a){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}else{
dijit.removeWaiState(this.focusNode,"valuemin");
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}else{
dijit.removeWaiState(this.focusNode,"valuemax");
}
}
},_setValueAttr:function(_34b,_34c){
dijit.setWaiState(this.focusNode,"valuenow",_34b);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.dijit"]){
dojo._hasResource["wm.base.widget.Editors.dijit"]=true;
dojo.provide("wm.base.widget.Editors.dijit");
dijit.form._FormWidget.prototype.destroy=function(){
try{
wm.fire(this,"_hideTooltip");
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
dijit._Widget.prototype.destroy.call(this);
}
catch(e){
}
};
dijit.form.ValidationTextBox.prototype.validate=function(_34d){
var _34e="";
var _34f=this.isValid(_34d);
var _350=this._isEmpty(this.textbox.value);
this.state=(_34d||_34f||(!this._hasBeenBlurred&&_350))?"":"Error";
this._setStateClass();
if(_34f){
dijit.setWaiState(this.focusNode,"invalid",_34f?"false":"true");
}
if(_34d&&_350){
_34e=this.getPromptMessage(true);
}
if(!_34d&&this._hasBeenBlurred){
if(!_34e&&this.state=="Error"){
_34e=this.getErrorMessage(true);
}
}
if(_34d){
var _351=this.domNode;
while(_351&&!dojo.hasClass(_351,"dojoxGridRow")){
_351=_351.parentNode;
}
if(this.domNode.parentNode){
this._lastRow=_351;
this._lastCol=dojo.indexOf(this.domNode.parentNode.parentNode.parentNode.childNodes,this.domNode.parentNode.parentNode);
}else{
wm.job("GridValidationNode",20,this,function(){
if(this.domNode.parentNode){
this._lastRow=_351;
this._lastCol=dojo.indexOf(this.domNode.parentNode.parentNode.parentNode.childNodes,this.domNode.parentNode.parentNode);
}
});
}
}
this.displayMessage(_34e);
return _34d||_34f;
};
dijit.form.ValidationTextBox.prototype._defaultValidator=dijit.form.ValidationTextBox.prototype.validator;
dijit.form.ValidationTextBox.prototype.validator=function(_352,_353){
var _354=dijit.form.ValidationTextBox.prototype._defaultValidator,_355=_354.call(this,_352,_353);
return _355&&(this.owner&&this.owner.validator?this.owner.validator(_352,_353):true);
};
dijit.form.ValidationTextBox.prototype.displayMessage=function(_356){
if(this._message==_356){
return;
}
this._message=_356;
this._cancelHideTooltip();
dijit.hideTooltip(this.domNode);
if(_356&&this.inGrid&&!this.domNode.parentNode){
wm.job("GridValidationNode",20,dojo.hitch(this,function(){
dijit.showTooltip(_356,this.domNode.parentNode||this._lastRow.firstChild.firstChild.firstChild.childNodes[this._lastCol],this.tooltipPosition);
dijit._hideTooltipHandle=setTimeout(dojo.hitch(this,function(){
wm.fire(this,"_hideTooltip");
}),2500);
}));
}else{
if(_356&&(!this.owner||!this.owner.readonly)){
dijit.showTooltip(_356,this.domNode,this.tooltipPosition);
dijit._hideTooltipHandle=setTimeout(dojo.hitch(this,function(){
wm.fire(this,"_hideTooltip");
}),this.tooltipDisplayTime||2500);
}
}
};
dijit.form.ValidationTextBox.prototype._hideTooltip=function(){
this._cancelHideTooltip();
wm.hideToolTip();
};
dijit.form.ValidationTextBox.prototype._cancelHideTooltip=function(){
clearTimeout(dijit._hideTooltipHandle);
dijit._hideTooltipHandle=null;
};
}
if(!dojo._hasResource["wm.base.widget.Editors.AbstractEditor"]){
dojo._hasResource["wm.base.widget.Editors.AbstractEditor"]=true;
dojo.provide("wm.base.widget.Editors.AbstractEditor");
wm.propertyIsChanged=function(_357,_358,_359){
var p=(_359||0).prototype;
return p&&p[_358]!==_357;
};
wm.defaultEmptyValue=function(_35a){
switch(_35a){
case "Text":
return "";
case "Number":
return 0;
}
};
dojo.declare("wm.AbstractEditor",wm.Control,{_captionTagName:"div",changeKeycodes:[dojo.keys.ENTER,dojo.keys.NUMPAD_ENTER,dojo.keys.DELETE,dojo.keys.BACKSPACE],classNames:"wmeditor",dataValueBindingEvaluated:"onInsert",formatter:"",height:"24px",width:"300px",enableTouchHeight:true,mobileHeight:"35px",padding:"2",border:"0",editorBorder:true,dataValue:null,displayValue:null,emptyValue:"unset",required:false,readonly:false,ignoreParentReadonly:false,editorNode:null,isDirty:false,_lastValue:"",_lastValueReported:"",caption:"",captionPosition:"left",captionSize:"100px",captionNode:null,captionAlign:"right",singleLine:true,helpText:"",changeOnEnter:false,changeOnKey:false,_updating:0,scrim:true,init:function(){
this._editorConnects=[];
this.inherited(arguments);
},getMinHeightProp:function(){
if(this.minHeight){
return this.minHeight;
}
if(this.captionPosition=="left"||this.captionPosition=="right"||!this.caption){
return 20;
}else{
if(this.captionSize.match(/\%/)){
return 40;
}else{
return 20+parseInt(this.captionSize);
}
}
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 80;
}else{
if(this.captionSize.match(/\%/)){
return 120;
}else{
return 80+parseInt(this.captionSize);
}
}
},createCaption:function(){
var _35b=document.createElement(this._captionTagName);
var s=_35b.style;
s.padding="0px";
s.margin="0px";
dojo.addClass(_35b,"wmeditor-caption");
dojo.addClass(_35b,"wmlabel");
_35b.innerHTML=this.caption;
this.domNode.appendChild(_35b);
this.captionNode=_35b;
this.setCaptionAlign(this.captionAlign);
this.setSingleLine(this.singleLine);
},postInit:function(){
this.createEditor();
this.inherited(arguments);
wm.fire(this,"ownerLoaded");
if(this.captionPosition!="left"){
this.setCaptionPosition(this.captionPosition);
}
this._inPostInit=true;
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
this.valueChanged("displayValue",this.displayValue);
this.valueChanged("dataValue",this.dataValue);
delete this._inPostInit;
},setCaption:function(_35c){
var _35d=this.caption;
this.caption=_35c;
if(!this.captionNode){
return;
}
var cap=_35c+((this.required&&!this.readonly)?"&nbsp;<span class=\"wmeditor-required\">*</span>":"");
this.captionNode.innerHTML=cap;
if(_35d&&!_35c||!_35d&&_35c){
dojo.style(this.captionNode,"display",(_35c)?"block":"none");
this.sizeEditor();
}
},setCaptionSize:function(_35e){
this.captionSize=_35e;
this.sizeEditor();
},setCaptionAlign:function(_35f){
this.captionAlign=_35f;
if(this.captionNode){
dojo.style(this.captionNode,"textAlign",this.captionAlign);
}
},setCaptionPosition:function(pos){
var _360=this.captionPosition;
this.captionPosition=pos;
if((_360=="left"||_360=="right")&&(pos=="bottom"||pos=="top")){
if(this.height.match(/px/)&&parseInt(this.height)<48){
this.setValue("height","48px");
}
this.captionSize="28px";
}else{
if((pos=="left"||pos=="right")&&(_360=="bottom"||_360=="top")){
if(this.bounds.h>=48){
this.setValue("height",this.constructor.prototype.height);
}
if(this.captionSize.match(/px/)&&parseInt(this.captionSize)<100){
this.captionSize="100px";
}
}
}
this.sizeEditor();
},setCaptionPositionLF:function(_361,_362){
if(!_362){
_362=this.isAncestorInstanceOf(wm.LiveFormBase)||this.isAncestorInstanceOf(wm.FormPanel);
}
if(_362){
this.setCaptionPosition(_362.captionPosition);
this.setCaptionSize(_362.captionSize);
this.setCaptionAlign(_362.captionAlign);
if(this.constructor.prototype.height==wm.AbstractEditor.prototype.height){
this.setValue("height",_362.editorHeight);
}
}
this.sizeEditor();
},setSingleLine:function(_363){
this.singleLine=_363;
var s=this.captionNode.style;
s.whiteSpace=(_363)?"nowrap":"normal";
s.overflow="hidden";
s.lineHeight=(this.singleLine)?s.height:"normal";
if(this.readOnlyNode){
this.updateReadOnlyNodeStyle();
}
},setDisabled:function(_364){
this.inherited(arguments);
if(this.editor){
if(this.editor instanceof wm.Control){
dojo[this._disabled?"addClass":"removeClass"](this.captionNode,"wmeditor-caption-disabled");
}else{
if(!wm.isNode(this.editor)){
if(this._disabled!=this.editor.get("disabled")){
this.editor.set("disabled",Boolean(this._disabled));
dojo[this._disabled?"addClass":"removeClass"](this.captionNode,"wmeditor-caption-disabled");
}
}
}
}
},destroy:function(){
this.destroyEditor();
this.inherited(arguments);
},createHelpNode:function(){
this.helpNode=dojo.create("div",{className:"EditorHelpIcon"},this.domNode);
if(typeof this.helpText=="string"){
this._helpTextOverConnect=this.connect(this.helpNode,"onmouseover",this,function(e){
wm.job(this.getRuntimeId()+".helpText",100,dojo.hitch(this,function(){
var _365=dojo.coords(this.helpNode);
app.createToolTip(this.helpText,null,{mouseX:_365.x,mouseY:_365.y+_365.h});
}));
});
this._helpTextOutConnect=this.connect(this.helpNode,"onmouseout",this,function(){
wm.job(this.getRuntimeId()+".helpText",100,dojo.hitch(this,function(){
if(app.getToolTip()==this.helpText){
app.hideToolTip();
}
}));
});
}
this.connect(this.helpNode,"onclick",this,"onHelpClick");
},onHelpClick:function(){
},destroyHelpNode:function(){
dojo.destroy(this.helpNode);
wm.Array.removeElement(this._connections,this._helpTextOverConnect);
wm.Array.removeElement(this._connections,this._helpTextOutConnect);
dojo.disconnect(this._helpTextOverConnect);
dojo.disconnect(this._helpTextOutConnect);
},createEditor:function(_366){
if(!this.captionNode){
this.createCaption();
}
if(this.helpText&&!this.helpNode){
this.createHelpNode();
}
this.destroyEditor();
var n=document.createElement("div");
this.domNode.appendChild(n);
this.startTimerWithName("CreateDijit",this.declaredClass);
this.editor=this._createEditor(n,_366);
dojo.attr(this.captionNode,"for",this.editor.id);
if(this.editor instanceof wm.Control==false&&this.editor.domNode&&wm.isMobile&&"ontouchstart" in this.editor.domNode){
dojo.query(".dijitArrowButton",this.editor.domNode).connect("ontouchstart",this.editor,"openDropDown");
}
this.editorNode=wm.isNode(this.editor)?this.editor:this.editor.domNode;
this.editorNode.style.margin="0";
this.editorNode.style.padding="0";
this.stopTimerWithName("CreateDijit",this.declaredClass);
if(this.editor){
this.styleEditor();
if(this.validationEnabled()){
this.validatorNode=this._getValidatorNode();
}
this.sizeEditor();
this.connectEditor();
this.setRequired(this.required);
this.setInitialValue();
this.setReadonly(this.readonly);
}
if(this.editor&&this.editor.displayMessage&&this.editor instanceof dijit._WidgetBase){
this.editor.displayMessage=dojo.hitch(this,"_displayMessage");
}
return this.editor;
},_displayMessage:function(_367){
if(!this.showMessages){
return;
}
var o=dojo.getObject(this.editor.declaredClass);
if(o){
o.prototype.displayMessage.apply(this.editor,arguments);
}
},validationEnabled:function(){
return true;
},_createEditor:function(_368,_369){
return new dijit.form.TextBox(this.getEditorProps(_368,_369));
},destroyEditor:function(){
this.disconnectEditor();
wm.fire(this.editor,"destroy");
this.editor=null;
},styleEditor:function(){
if(this.isRelativePositioned){
if(this.captionNode){
dojo.addClass(this.captionNode,"wmInlineDiv");
}
return;
}
dojo.style(this.editorNode,{position:"absolute"});
if(this.captionNode){
dojo.style(this.captionNode,{position:"absolute"});
}
},sizeEditor:function(){
if(this._cupdating){
return;
}
var e=(this.readonly)?this.readOnlyNode:this.editor;
if(e){
var _36a=this.getContentBounds();
var _36b=this.captionPosition;
var _36c=(_36b=="left"||_36b=="right")?wm.AbstractEditor.captionPaddingWidth:wm.AbstractEditor.captionPaddingHeight;
var w=_36a.w;
var h=_36a.h;
var _36d;
var _36e;
var _36f=_36a.h;
var _370;
var _371;
var _372=16;
var _373=4;
var _374=Boolean(this.helpText);
if(!this.caption){
_36d=0;
_36e=w;
_371=h;
}else{
if(_36b=="left"||_36b=="right"){
var _375=(this.captionSize.match(/px/))?parseInt(this.captionSize):Math.floor(parseInt(this.captionSize)*w/100);
if(w-_375<(this.minEditorWidth||16)){
_36e=this.minEditorWidth||16;
_36d=w-_36e-(this.helpText?_372+_373:0);
_374=false;
}else{
_36d=_375;
_36e=w-_36d;
}
_370=(_36f)?_36f:"";
_371=_370;
}else{
_370=(this.captionSize.match(/px/))?parseInt(this.captionSize):Math.floor(parseInt(this.captionSize)*_36f/100);
if(_370>_36f){
_370=_36f-16;
if(this.captionSize.match(/px/)){
this.captionSize=_370+"px";
}
}
_371=(_36f-_370);
_36d=(w)?w:"";
_36e=_36d;
if(this.helpText){
_36d-=_372+_373;
}
}
}
_36d=Math.round(_36d);
_36e=Math.round(_36e);
if(_374){
if(this.captionPosition=="left"||!this.caption){
_36e-=_372+_373;
}else{
_36d-=_372+_373;
}
}
if(this._editorPaddingLeft&&_36d){
_36e-=this._editorPaddingLeft;
}
if(this._editorPaddingRight&&_36d){
_36e-=this._editorPaddingRight;
}
var s=this.captionNode.style;
var _376=(_36d-((_36b=="right"||_36b=="left")?_36c:0));
_376=(_376)?_376:0;
if(_376<0){
_376=0;
}
var form=wm.FormPanel&&this.isAncestorInstanceOf(wm.FormPanel);
if(!this.maxCaptionWidth&&(!form||!form.autoSizeCaption||form.autoSizeCaption&&this._isMaxEditor===false)){
s.width=_376+"px";
}else{
s.display="inline-block";
}
s.height=((_370&&_370>0)?_370:0)+"px";
s.lineHeight=(s.lineHeight!="normal")?s.height:"normal";
var _377=(_36b=="right")?(_36a.w+_36a.l-_376):_36a.l;
if(_36b=="right"&&_374){
_377-=_372+_373;
}
s.left=_377+"px";
s.top=(_36b=="bottom")?(_371+_36a.t-_36c)+"px":_36a.t+"px";
var b={w:_36e,h:_371,l:((_36b=="left"&&_36d)?_36d:0)+_36a.l,t:((_36b=="top"&&_370)?_370:0)+_36a.t};
if(!b.w||b.w<0){
b.w=0;
}
if(!b.h||b.h<0){
b.h=0;
}
if(e instanceof wm.Control){
var _378=e._cupdating;
e._cupdating=true;
e.setBorder((this.editorBorder)?"1":"0");
e.setBounds(b);
e._cupdating=_378;
if(e.invalidCss){
e.render();
}else{
e.renderBounds();
}
e.reflow();
}else{
var _379=(e["domNode"])?e.domNode:e;
var s=_379.style;
if(this.editorBorder&&b.w&&b.h){
s.borderWidth="1px";
if(!this._editorBackgroundColor){
s.backgroundColor="";
}
s.backgroundImage="";
b.w-=2;
b.h-=2;
if(s.lineHeight!="normal"){
s.lineHeight=(b.h)+"px";
}
}else{
s.borderWidth="0px";
if(!this._editorBackgroundColor){
s.backgroundColor="transparent";
}
s.backgroundImage="none";
if(s.lineHeight!="normal"&&b.h){
s.lineHeight=b.h+"px";
}
}
s.width=b.w+"px";
s.height=b.h+"px";
s.left=b.l+"px";
s.top=b.t+"px";
}
if(e==this.readOnlyNode){
this.updateReadOnlyNodeStyle(b.h);
}
this._editorHeight=b.h;
this._editorWidth=b.w;
}
if(this.helpText&&this.helpNode){
var s=this.helpNode.style;
s.top=(this.caption)?(parseInt(this.captionNode.style.top)+(this.captionPosition=="bottom"?5:0))+"px":b.t+"px";
s.left=(this.getContentBounds().w-16)+"px";
}
},setHelpText:function(_37a){
var _37b=this.helpText;
this.helpText=_37a;
if(_37a&&!this.helpNode){
this.createHelpNode();
this.sizeEditor();
}else{
if(!_37a&&this.helpNode){
this.destroyHelpNode();
this.sizeEditor();
}else{
if(_37a&&!_37b){
this.sizeEditor();
}
}
}
},updateReadOnlyNodeStyle:function(h){
var s=this.readOnlyNode.style;
var _37c=this.getReadOnlyNodeOverflow();
if(s.overflow!=_37c){
s.overflow=_37c;
}
var _37d=this.getReadOnlyNodeLineHeight();
if(s.lineHeight!=_37d){
s.lineHeight=(_37d=="normal")?_37d:_37d+"px";
}
var _37e=this.getReadOnlyNodeWhiteSpace();
if(s.whiteSpace!=_37e){
s.whiteSpace=_37e;
}
var _37f=this.getReadOnlyNodeWordWrap();
if(s.wordWrap!=_37f){
s.wordWrap=_37f;
}
},getReadOnlyNodeLineHeight:function(){
if(this.singleLine){
return parseInt(this.readOnlyNode.style.height)+((this.editorBorder)?2:0);
}else{
return "normal";
}
},getReadOnlyNodeOverflow:function(){
return "hidden";
},getReadOnlyNodeWhiteSpace:function(){
return "nowrap";
},getReadOnlyNodeWordWrap:function(){
return "normal";
},adjustCaptionPositionForMobile:function(){
if(this.isAncestorHidden()){
return;
}
if(this.captionPosition=="left"||this.captionPosition=="right"){
var _380=this.getMinWidthProp();
if(_380>this.parent.getContentBounds().w){
this._captionPosition=this.captionPosition;
this._captionAlign=this.captionAlign;
this._captionSize=this.captionSize;
this._editorHeight=this.height;
this.captionPosition="top";
this.setCaptionAlign("left");
var _381=parseInt(this.height);
this.captionSize="20px";
this.bounds.h=_381+20;
this.setBounds(this.bounds);
wm.job(this.parent.getRuntimeId()+".adjustForMobileEditorCaption",1,this.parent,function(){
if(!this.isDestroyed){
this.setBestHeight();
this._heightAdjustedForMobileCaption=true;
if(this.bounds.h>this.parent.bounds.h){
this.setAutoScroll(true);
}
}
});
}
}else{
if(this._captionPosition){
this.captionPosition=this._captionPosition;
var _382=this.captionSize;
this.captionSize=this._captionSize;
var _380=this.getMinWidthProp(true);
this.captionPosition="top";
this.captionSize=_382;
if(_380<=this.parent.getContentBounds().w){
this.captionPosition=this._captionPosition;
delete this._captionPosition;
this.setCaptionAlign(this._captionAlign);
delete this._captionAlign;
this.captionSize=this._captionSize;
delete this._captionSize;
this.bounds.h=this._editorHeight;
delete this._editorHeight;
this.setBounds(this.bounds);
wm.job(this.parent.getRuntimeId()+".adjustForMobileEditorCaption",1,this.parent,function(){
if(!this.isDestroyed&&this._heightAdjustedForMobileCaption){
this.setBestHeight();
}
});
}
}
}
},renderBounds:function(){
if(!this._initializing&&wm.device=="phone"&&this.parent.layoutKind=="top-to-bottom"&&!this._percEx.h){
this.adjustCaptionPositionForMobile();
}
this.inherited(arguments);
this.sizeEditor();
},setEditorBorder:function(_383){
this.editorBorder=_383;
this.sizeEditor();
},addEditorConnect:function(_384){
this._editorConnects.push(dojo.connect.apply(dojo,arguments));
},connectEditor:function(){
this.disconnectEditor();
this.addEditorConnect(this.editor,"onChange",this,"changed");
this.addEditorConnect(this.editor,"onBlur",this,"blurred");
this.addEditorConnect(this.editor,"_onFocus",this,"focused");
var _385=this.editor.focusNode||this.editor.domNode||this.editor;
this.addEditorConnect(_385,"onkeypress",this,"keypressed");
if(_385.tagName=="INPUT"){
try{
this.addEditorConnect(_385,"oncut",this,"keypressed");
this.addEditorConnect(_385,"onpaste",this,"keypressed");
}
catch(e){
}
}
if(this.validationEnabled()){
this.addEditorConnect(this.editor,"validate",this,"editorValidated");
}
},disconnectEditor:function(){
dojo.forEach(this._editorConnects,dojo.disconnect);
this._editorConnects=[];
},invalidate:function(){
delete this._isValid;
},keypressed:function(_386){
if(_386.type=="cut"||_386.type=="paste"||wm.isMobile||_386.charCode||_386.keyCode==dojo.keys.BACKSPACE||_386.keyCode==dojo.keys.DELETE||dojo.indexOf(this.changeKeycodes,_386.keyCode)!=-1){
this.validate();
this.dokeypress(_386);
}
},blurred:function(){
this.validate();
this.doOnblur();
},focused:function(){
dojo.publish("wm.AbstractEditor-focused",[this]);
this.doOnfocus();
},doOnblur:function(){
if(!this.disabled){
wm.onidle(this,function(){
this.onblur();
});
}
},onblur:function(){
},doOnfocus:function(){
if(!this.disabled){
wm.onidle(this,function(){
this.onfocus();
});
}
},onfocus:function(){
},changed:function(){
this.validate();
this.doOnchange();
},doOnchange:function(){
if(this.editorChanged()){
var e=this.editor;
if(!this._loading&&!this.isUpdating()&&!this.readonly&&e&&!this.isLoading()){
this.onchange(this.getDisplayValue(),this.getDataValue(),this._inSetDataValue);
}
}
},onchange:function(_387,_388,_389){
},_getValidatorNode:function(){
var n=this.editor&&this.editor instanceof dijit._WidgetBase&&this.editor.domNode.firstChild;
if(!n){
return null;
}
for(var i=0,c,_38a=n.childNodes;c=_38a[i];i++){
if(dojo.hasClass(c,"dijitValidationIcon")){
return c;
}
}
},editorValidated:function(){
if(this.validatorNode){
this.validatorNode.style.display=this.editor.state=="Error"?"":"none";
}
},validate:function(){
if(this.validationEnabled()){
this.invalidate();
}
wm.job(this.getRuntimeId()+"_validate",25,dojo.hitch(this,function(){
if(!this.isDestroyed){
if(this.parent){
wm.fire(this.parent,"validate");
}
this.valueChanged("invalid",this.getInvalid());
}
}));
},getEditorProps:function(_38b,_38c){
return dojo.mixin({srcNodeRef:_38b,owner:this,disabled:this.disabled},_38c||{});
},isValid:function(){
return !this.getInvalid();
},getInvalid:function(){
var _38d=this.validationEnabled();
if(_38d&&this.editor&&this.editor.isValid){
if(this._isValid===undefined){
this._isValid=this.editor.isValid();
}
return !(this.readonly||this._isValid);
}else{
if(this.required&&!this.readonly){
var _38e=this.getDataValue();
if(_38e===undefined||_38e===null||_38e===""){
return true;
}
}
}
},setInvalid:function(){
this._isValid=false;
if(this.editor instanceof dijit._WidgetBase){
this.editor.set("state","Error");
}
this.editorValidated();
this.valueChanged("invalid",this.getInvalid());
},_getReadonlyValue:function(){
return this.getDisplayValue()||"";
},createReadOnlyNode:function(){
var node=dojo.create("div");
dojo.addClass(node,"wmeditor-readonlyNode");
var _38f=node.style;
_38f.lineHeight="normal";
_38f.position="absolute";
_38f.whiteSpace=(this.singleLine)?"nowrap":"normal";
return node;
},setReadonly:function(_390,_391){
var r=this.readonly;
this.readonly=_390;
if(r!=this.readonly){
this.setCaption(this.caption);
}
var _392=this.domNode;
if(!this.readOnlyNode&&this.readonly){
this.readOnlyNode=this.createReadOnlyNode();
}
if(this.readOnlyNode){
if(this.readonly&&this.readOnlyNode.parentNode!=_392){
dojo.place(this.readOnlyNode,_392,"last");
}else{
if(!this.readonly&&this.readOnlyNode.parentNode==_392){
_392.removeChild(this.readOnlyNode);
}
}
}
if(_391){
if(this.readonly){
this.editorNode.style.display="none";
}else{
this.editorNode.style.display="block";
}
}else{
if(!this.readonly&&this.editorNode.parentNode!=_392){
dojo.place(this.editorNode,_392,"last");
}else{
if(this.readonly&&this.editorNode.parentNode==_392){
_392.removeChild(this.editorNode);
}
}
}
this.invalidCss=true;
this.render();
if(this.readonly){
wm.fire(this.editor,"_hideTooltip");
}
this.updateReadonlyValue();
},updateReadonlyValue:function(_393){
if(this.readonly&&this.readOnlyNode){
var _394;
if(this.$.format&&this.$.format.declaredClass!="wm.DataFormatter"){
_394=this.$.format.format(_393||this.getDataValue());
}else{
if(this.formatter&&dojo.isFunction(this.owner[this.formatter])){
try{
_394=this.owner[this.formatter](this,_393||this.getDataValue());
}
catch(e){
console.error("Formatter error in "+this.toString()+": "+e);
}
}
}
if(_394===undefined){
_394=_393||this._getReadonlyValue();
}
this.readOnlyNode.innerHTML=_394;
}
},getDisplayValue:function(){
return this.editor&&this.editor.declaredClass&&this.editor.get&&this.editor.get("displayedValue")?this.editor.get("displayedValue")||"":this.getEditorValue()||"";
},makeEmptyValue:function(){
if(this.emptyValue=="unset"&&this.display){
return wm.defaultEmptyValue(this.display);
}
switch(this.emptyValue){
case "null":
return null;
case "false":
return false;
case "emptyString":
return "";
case "zero":
return 0;
}
},getEditorValue:function(){
var v;
if(this.editor){
v=this.editor.get("value");
}
return (v||v===0)?v:this.makeEmptyValue();
},normalizeDataValue:function(_395){
return _395;
},setEditorValue:function(_396){
if(this.editor){
_396=_396===undefined?null:_396;
_396=this.normalizeDataValue(_396);
var _397=this.editor.get("value");
this.editor.set("value",_396,false);
this.editor._lastValueReported=_396?_396:"";
if(_397!=_396){
this.changed();
}else{
if((typeof _396!="object"||_396===null)&&this.dataValue!==_396){
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
}
}
this.updateReadonlyValue();
}else{
this.dataValue=_396;
}
},setDisplayValue:function(_398){
this.setEditorValue(_398);
},setRequired:function(_399){
var _39a=this.required;
this.required=_399;
if(this.editor){
this.editor.required=_399;
if(this.required||_39a){
this.validate();
this.setCaption(this.caption);
}
}
},getRequired:function(){
return this.required;
},beginEditUpdate:function(_39b){
this._updating++;
},endEditUpdate:function(_39c){
this._updating--;
},requireChanged:function(){
this.setCaption(this.caption);
},setInitialValue:function(){
this.beginEditUpdate();
try{
this.setEditorValue(wm.propertyIsChanged(this.dataValue,"dataValue",this.constructor)?this.dataValue:this.displayValue);
}
catch(e){
}
this.endEditUpdate();
},editorChanged:function(){
var _39d=this.getDisplayValue();
var _39e=false;
if(this.displayValue!=_39d){
this.valueChanged("displayValue",this.displayValue=_39d);
_39e=true;
}
var _39f=this.getDataValue();
if(this.calcIsDirty(_39f,this._lastValueReported)){
this.valueChanged("dataValue",this.dataValue=_39f);
_39e=true;
}else{
this.dataValue=_39f;
}
if(_39e){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _39e;
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1="";
}
if(val2===undefined||val2===null){
val2="";
}
return val1!=val2;
},clearDirty:function(){
this._lastValueReported=this._lastValue=this.dataValue==null?this.makeEmptyValue():this.dataValue;
this.updateIsDirty();
},updateIsDirty:function(){
var _3a0=this.isDirty;
var _3a1=true;
if(!this.calcIsDirty(this.dataValue,this._lastValue)){
_3a1=false;
}else{
if((this.dataValue===""||this.dataValue===null||this.dataValue===undefined)&&(this._lastValue===""||this._lastValue===null||this._lastValue===undefined)){
_3a1=false;
}
}
this.valueChanged("isDirty",this.isDirty=_3a1);
if(_3a0!=this.isDirty){
dojo.toggleClass(this.domNode,"isDirty",this.isDirty);
}
if(!app.disableDirtyEditorTracking){
wm.fire(this.parent,"updateIsDirty");
}
},getDataValue:function(){
if(this.isReady()){
return this.getEditorValue();
}else{
if(this.dataValue===null||this.dataValue===undefined||this.dataValue===""){
return this.makeEmptyValue();
}else{
return this.dataValue;
}
}
},setDataValue:function(_3a2){
this._inSetDataValue=true;
if(_3a2===undefined){
_3a2=null;
}
this.setEditorValue(_3a2);
if(_3a2===""||_3a2===null){
this.resetState();
}
if(!this.isUpdating()){
this.clearDirty();
}
delete this._inSetDataValue;
},isUpdating:function(){
return this._updating>0;
},isReady:function(){
return Boolean(this.editor);
},canFocus:function(){
return !this.readonly;
},focus:function(){
wm.fire(this.editor,"focus");
},reset:function(){
this.setDataValue(this._lastValue);
this.resetState();
},resetState:function(){
this.invalidate();
var e=this.editor;
if(e&&e instanceof dijit._WidgetBase){
e._hasBeenBlurred=false;
wm.fire(e,"_hideTooltip");
if(this.validatorNode&&!this.getDisplayValue()){
this.validatorNode.style.display="none";
e.set("state","Normal");
e._setStateClass();
}
}
},clear:function(){
this._lastValue=this.makeEmptyValue();
this.setDataValue(null);
},listOwnerProperties:function(){
var p=dojo.mixin({},wm.Component.prototype.listProperties.apply(this)||{});
for(var i in p){
if(!p[i].isOwnerProperty){
delete p[i];
}
}
return p;
},listProperties:function(){
var p=dojo.mixin({},this.inherited(arguments)||{});
for(var i in p){
if(p[i].isOwnerProperty){
delete p[i];
}
}
return p;
},valueChanged:function(_3a3,_3a4){
if(this._updating&&(_3a3=="dataValue"||_3a3=="isDirty"||_3a3=="displayValue"||_3a3=="invalid")){
return;
}
if(_3a3=="dataValue"){
this._lastValueReported=_3a4;
}
this.inherited(arguments);
},isLoading:function(){
return this._loading;
},dokeypress:function(_3a5){
if(this.changeOnKey||(this.changeOnEnter&&_3a5.keyCode==dojo.keys.ENTER)){
wm.onidle(this,"doChangeOnKey",_3a5);
}
if(_3a5.keyCode==dojo.keys.ENTER){
wm.onidle(this,"onEnterKeyPress",[this]);
}
},doChangeOnKey:function(_3a6){
var e=this.editor;
this.changed();
},setDefaultOnInsert:function(){
if(this.editor&&this.defaultInsert){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.editor.set("value",this.defaultInsert,false);
this.invalidate();
}
},onEnterKeyPress:function(){
},toHtml:function(_3a7){
var _3a8=_3a7-4;
var _3a9="2px 4px 2px 4px";
_3a8-=8;
_3a8-=2;
var _3aa=125;
var _3ab=(_3a8-_3aa<100||this.captionPosition=="top"||this.captionPosition=="bottom");
var _3ac=this.toHtmlStyles();
if(this.caption&&this.captionSize!="0px"&&this.captionSize!="0%"&&!_3ab){
var _3ad=4;
var _3ae=_3a8-_3aa;
return "<div "+_3ac+" class='wmeditor' id='"+this.domNode.id+"' style='margin: "+_3a9+";'><div class='wmeditor-label' style='width:"+(_3aa-_3ad)+"px;padding-right:"+_3ad+"px;display:inline-block;'>"+this.caption+"</div><div class='wmeditor-value' style='display: inline-block;width:"+_3ae+"px'>"+(this.getDisplayValue()||"&nbsp;")+"</div></div>";
}else{
var html=[];
html.push("<div "+_3ac+" class='wmeditor' id='"+this.domNode.id+"' style='margin: "+_3a9+";'>");
if(this.caption&&this.captionSize!="0px"&&this.captionSize!="0%"){
html.push("<div class='wmeditor-label' >"+this.caption+"</div>");
}
html.push("<div class='wmeditor-value'>"+(this.getDisplayValue()||"&nbsp;")+"</div>");
html.push("</div>");
return html.join("\n");
}
}});
wm.AbstractEditor.captionPaddingWidth=8;
wm.AbstractEditor.captionPaddingHeight=2;
}
if(!dojo._hasResource["dijit.form.SimpleTextarea"]){
dojo._hasResource["dijit.form.SimpleTextarea"]=true;
dojo.provide("dijit.form.SimpleTextarea");
dojo.declare("dijit.form.SimpleTextarea",dijit.form.TextBox,{baseClass:"dijitTextBox dijitTextArea",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{rows:"textbox",cols:"textbox"}),rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} dojoAttachPoint='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(dojo.isIE&&this.cols){
dojo.addClass(this.textbox,"dijitTextAreaCols");
}
},filter:function(_3af){
if(_3af){
_3af=_3af.replace(/\r/g,"");
}
return this.inherited(arguments);
},_previousValue:"",_onInput:function(e){
if(this.maxLength){
var _3b0=parseInt(this.maxLength);
var _3b1=this.textbox.value.replace(/\r/g,"");
var _3b2=_3b1.length-_3b0;
if(_3b2>0){
if(e){
dojo.stopEvent(e);
}
var _3b3=this.textbox;
if(_3b3.selectionStart){
var pos=_3b3.selectionStart;
var cr=0;
if(dojo.isOpera){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_3b1.substring(0,pos-_3b2-cr)+_3b1.substring(pos-cr);
_3b3.setSelectionRange(pos-_3b2,pos-_3b2);
}else{
if(dojo.doc.selection){
_3b3.focus();
var _3b4=dojo.doc.selection.createRange();
_3b4.moveStart("character",-_3b2);
_3b4.text="";
_3b4.select();
}
}
}
this._previousValue=this.textbox.value;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Text"]){
dojo._hasResource["wm.base.widget.Editors.Text"]=true;
dojo.provide("wm.base.widget.Editors.Text");
dojo.declare("wm.ResizableEditor",wm.AbstractEditor,{maxHeight:96,getReadOnlyNodeLineHeight:function(){
if(this.autoSizeHeight){
return "normal";
}else{
return this.inherited(arguments);
}
},getReadOnlyNodeWhiteSpace:function(){
if(this.autoSizeWidth){
return "nowrap";
}else{
if(this.autoSizeHeight){
return "normal";
}else{
return this.singleLine?"nowrap":"normal";
}
}
},getReadOnlyNodeOverflow:function(){
if(dojo.marginBox(this.readOnlyNode).h<40){
return "hidden";
}
if(this.autoSizeHeight||this.autoSizeWidth){
return (this._autoSizeNeedsOverflow)?"auto":"hidden";
}else{
return "hidden";
}
},updateReadonlyValue:function(_3b5){
this.inherited(arguments);
if(this.readonly&&this.readOnlyNode&&this.readOnlyNode.style.width&&(this.autoSizeHeight||this.autoSizeWidth)){
this.doAutoSize(1,1);
}
},doAutoSize:function(_3b6,_3b7){
if(!this.readonly){
return;
}
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_3b7&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _3b8=this.readOnlyNode.style;
var _3b9=wm.Label.sizingNode;
_3b9.innerHTML=this.readOnlyNode.innerHTML;
_3b9.className=this.readOnlyNode.className;
var s=_3b9.style;
s.position="absolute";
s.paddingRight="5px";
s.paddingTop="5px";
s.lineHeight=_3b8.lineHeight;
s.whiteSpace=_3b8.whiteSpace;
this.domNode.appendChild(_3b9);
if(this.autoSizeHeight&&!this._percEx.h){
s.height="";
s.width=_3b8.width;
var _3ba=_3b9.clientHeight;
var _3bb=_3ba;
if(this.caption){
if(this.captionPosition=="top"||this.captionPosition=="bottom"){
_3bb+=parseInt(this.captionNode.style.height)+wm.AbstractEditor.captionPaddingHeight;
}
}
var _3bc=this.getMinHeightProp();
if(_3bc>_3bb){
_3bb=_3bc;
}
if(this.maxHeight&&this.maxHeight<_3bb&&(dojo.marginBox(this.readOnlyNode).h>40)){
_3bb=this.maxHeight;
_3b8.overflow="auto";
this._autoSizeNeedsOverflow=true;
}else{
_3b8.overflow="hidden";
this._autoSizeNeedsOverflow=false;
}
if(_3b6){
this.setHeight(_3bb+"px");
}else{
this.bounds.h=_3bb;
this.height=_3bb+"px";
}
}else{
if(this.autoSizeWidth&&!this._percEx.w){
var _3bd;
if(this.parent.layoutKind=="left-to-right"){
_3bd=this.parent.layout.getMaxFreeSpace(this.parent.c$,"w",this.parent.bounds.w);
_3bd+=this.bounds.w;
}else{
_3bd=this.parent.getCurrentMaxWidth();
}
s.height=_3b8.height;
s.width="";
var _3be=_3b9.clientWidth;
var _3bf=_3be;
if(this.caption){
if(this.captionPosition=="left"||this.captionPosition=="right"){
_3bf+=parseInt(this.captionNode.style.width)+wm.AbstractEditor.captionPaddingWidth;
}
}
if(_3bf>_3bd){
_3bf=_3bd;
_3b8.overflow="auto";
this._autoSizeNeedsOverflow=true;
}else{
_3b8.overflow="hidden";
this._autoSizeNeedsOverflow=false;
}
var _3c0=this.getMinWidthProp();
if(_3c0>_3bf){
_3bf=_3c0;
}
if(_3b6){
this.setWidth(_3bf+"px");
}else{
this.bounds.w=_3bf;
this.width=_3bf+"px";
}
}
}
_3b9.parentNode.removeChild(_3b9);
this.disruptChromeOverflow("readOnlyNode");
this.updateReadOnlyNodeStyle();
this._doingAutoSize=false;
},setAutoSizeWidth:function(_3c1){
this.inherited(arguments);
if(this.readOnlyNode&&this.readonly){
this.updateReadOnlyNodeStyle();
}
},setAutoSizeHeight:function(_3c2){
this.inherited(arguments);
if(this.readOnlyNode&&this.readonly){
this.updateReadOnlyNodeStyle();
}
},setMaxHeight:function(_3c3){
this.inherited(arguments);
if(!this.maxHeight&&this.readOnlyNode){
this.readOnlyNode.style.overflow="hidden";
}
if(this.readOnlyNode){
this.updateReadOnlyNodeStyle();
this.doAutoSize(1,1);
}
},addUserClass:function(_3c4,_3c5){
this.inherited(arguments);
if((this.autoSizeHeight||this.autoSizeWidth)&&this.isDesignLoaded()){
this.doAutoSize(1,1);
}
},getAutoSize:function(_3c6){
return this.autoSizeHeight?"height":this.autoSizeWidth?"width":"none";
},setAutoSize:function(_3c7){
if(_3c7=="none"){
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
}else{
if(_3c7=="width"){
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
if(!this.autoSizeWidth){
this.setAutoSizeWidth(true);
}
}else{
if(_3c7=="height"){
if(!this.autoSizeHeight){
this.setAutoSizeHeight(true);
}
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
}
}
}
}});
dojo.declare("wm.Text",wm.ResizableEditor,{selectOnClick:false,resetButton:false,placeHolder:"",changeOnKey:false,changeOnEnter:true,showMessages:true,promptMessage:"",invalidMessage:"",password:false,maxChars:"",regExp:".*",_passwordChar:"&#8226;",tooltipDisplayTime:2000,getEditorProps:function(_3c8,_3c9){
var p=dojo.mixin(this.inherited(arguments),{selectOnClick:this.selectOnClick,promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",placeHolder:this.placeHolder,regExp:this.regExp,value:this.displayValue,required:this.required,tooltipDisplayTime:this.tooltipDisplayTime});
if(this.password){
p.type="password";
}
if(this.maxChars){
p.maxLength=this.maxChars;
}
return dojo.mixin(p,_3c9||{});
},_onDijitFocus:function(){
if(this.disabled){
return;
}
var val=this.editor.get("value");
if(val){
var _3ca=this.editor.format(val);
if(_3ca!==undefined){
this.editor.textbox.value=_3ca;
}
}
this.inherited(arguments);
},validationEnabled:function(){
return (this.regExp&&this.regExp!=".*")||this.required;
},setSelectOnClick:function(_3cb){
this.selectOnClick=_3cb;
if(this.editor){
this.editor.attr("selectOnClick",_3cb);
}
},setPlaceHolder:function(_3cc){
this.placeHolder=_3cc;
if(this.editor){
this.editor.attr("placeHolder",_3cc);
}
},setPassword:function(_3cd){
this.password=_3cd;
this.createEditor();
var pos=this.captionPosition;
this.captionPosition="";
this.setCaptionPosition(pos);
},setRegExp:function(_3ce){
this.regExp=_3ce;
if(!this._cupdating){
this.createEditor();
}
},selectText:function(){
dijit.selectInputText(this.editor.focusNode);
},_createEditor:function(_3cf,_3d0){
var _3d1;
if(this.validationEnabled()||this.promptMessage){
_3d1=new dijit.form.ValidationTextBox(this.getEditorProps(_3cf,_3d0));
}else{
_3d1=new dijit.form.TextBox(this.getEditorProps(_3cf,_3d0));
}
if(this.resetButton){
dojo.addClass(this.domNode,"wmreseteditor");
if(wm.isMobile){
this._resetButtonNode=document.createElement("span");
this._resetButtonNode.innerHTML="X";
var s=this._resetButtonNode.style;
s.position="absolute";
s.fontWeight="bold";
s.top="1px";
s.right="1px";
s.width="16px";
s.textShadow="1px 1px #aaa";
}else{
this._resetButtonNode=document.createElement("img");
this._resetButtonNode.src=this._resetButtonUrl||dojo.moduleUrl("lib.images.boolean.Signage")+"Close_gray.png";
var s=this._resetButtonNode.style;
s.position="absolute";
s.width="16px";
s.height="16px";
s.top="1px";
s.right="1px";
}
_3d1.domNode.appendChild(this._resetButtonNode);
this._resetButtonConnect=dojo.connect(this._resetButtonNode,"onclick",this,function(){
wm.onidle(this,function(){
this._onResetClick();
this.setDataValue("");
});
});
}
return _3d1;
},_onResetClick:function(){
},sizeEditor:function(){
this.inherited(arguments);
if(this._cupdating){
return;
}
if(dojo.isFF||dojo.isIE){
var _3d2=dojo.query("input.dijitInputInner",this.domNode)[0];
if(_3d2){
_3d2.style.height=this.editorNode.style.height;
_3d2.style.lineHeight=this.editorNode.style.lineHeight;
}
}
},destroy:function(){
if(this._resetButtonNode){
dojo.destroy(this._resetButtonNode);
}
if(this._resetButtonConnect){
dojo.disconnect(this._resetButtonConnect);
}
this.inherited(arguments);
},validator:function(_3d3,_3d4){
var l=Number(this.maxChars);
return this.maxChars!==""&&!isNaN(l)?_3d3.length<=l:true;
},_getReadonlyValue:function(){
var v=this.inherited(arguments);
if(this.password){
for(var i=0,a=[],l=v.length;i<l;i++){
a.push(this._passwordChar);
}
v=a.join("");
}
return v;
},setResetButton:function(_3d5){
if(this._resetButtonConnect){
dojo.disconnect(this._resetButtonConnect);
delete this._resetButtonConnect;
}
this.resetButton=_3d5;
dojo[_3d5?"addClass":"removeClass"](this.domNode,"wmreseteditor");
this.createEditor();
},getCursorPosition:function(){
var _3d6=0;
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(document.selection){
this.focus();
var Sel=document.selection.createRange();
Sel.moveStart("character",-ctrl.value.length);
_3d6=Sel.text.length;
}else{
if(ctrl.selectionStart||ctrl.selectionStart=="0"){
_3d6=ctrl.selectionStart;
}
}
return (_3d6);
},getCursorLength:function(){
var _3d7=0;
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(document.selection){
this.focus();
var Sel=document.selection.createRange();
Sel.moveStart("character",-ctrl.value.length);
_3d7=Sel.text.length;
}else{
if(ctrl.selectionStart||ctrl.selectionStart=="0"){
return ctrl.selectionStart-ctrl.selectionEnd;
}
}
},setCursorPosition:function(pos){
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(ctrl.setSelectionRange){
this.focus();
ctrl.setSelectionRange(pos,pos);
}else{
if(ctrl.createTextRange){
var _3d8=ctrl.createTextRange();
_3d8.collapse(true);
_3d8.moveEnd("character",pos);
_3d8.moveStart("character",pos);
_3d8.select();
}
}
},afterPaletteDrop:function(){
this.inherited(arguments);
var _3d9=this.getParentForm();
if(_3d9){
this.emptyValue="emptyString";
}
}});
dojo.declare("wm.LargeTextArea",wm.Text,{_editorPaddingLeft:3,_editorPaddingRight:3,showMessages:false,width:"300px",height:"96px",captionSize:"24px",captionPosition:"top",captionAlign:"left",singleLine:false,changeOnEnter:false,normalizeDataValue:function(_3da){
if(_3da===undefined||_3da===null){
return "";
}else{
return String(_3da);
}
},_createEditor:function(_3db,_3dc){
var _3dd=new dijit.form.SimpleTextarea(this.getEditorProps(_3db,_3dc));
_3dd.domNode.style.lineHeight="normal";
return _3dd;
},validationEnabled:function(){
return false;
},sizeEditor:function(){
this.inherited(arguments);
},setSingleLine:function(_3de){
this.inherited(arguments);
this.captionNode.style.lineHeight="normal";
},getReadOnlyNodeLineHeight:function(){
return "normal";
},getReadOnlyNodeWhiteSpace:function(){
if(this.autoSizeWidth){
return this.inherited(arguments);
}else{
return "normal";
}
},getReadOnlyNodeOverflow:function(){
if(this.autoSizeWidth||this.autoSizeHeight){
return this.inherited(arguments);
}else{
return "auto";
}
},getMinHeightProp:function(){
return this.minHeight||80;
}});
}
if(!dojo._hasResource["wm.base.components.LiveView"]){
dojo._hasResource["wm.base.components.LiveView"]=true;
dojo.provide("wm.base.components.LiveView");
wm.getViewField=function(_3df,_3e0){
if(_3df){
var _3e1=wm.typeManager.getPropertyInfoFromSchema(_3df,_3e0);
return {caption:wm.capitalize(_3e0.split(".").pop()),sortable:true,dataIndex:_3e0,type:_3e1.type,displayType:wm.getDisplayType(_3e1),required:_3e1.required,readonly:dojo.indexOf(_3e1.noChange||[],"read")>=0,includeLists:true,includeForms:true,order:_3e1.fieldOrder,subType:_3e1.fieldSubType};
}
};
wm.getDefaultView=function(_3e2,_3e3){
_3e3=_3e3||"";
var v=[],tm=wm.typeManager,_3e4=tm.getTypeSchema(_3e2),_3e5=_3e3?tm.getTypeSchema(tm.getPropertyInfoFromSchema(_3e4,_3e3).type):_3e4,_3e6=wm.typeManager.getSimplePropNames(_3e5);
wm.forEach(_3e6,function(f){
v.push(wm.getViewField(_3e4,(_3e3?_3e3+".":"")+f));
});
_3e6=wm.typeManager.getStructuredPropNames(_3e5);
wm.forEach(_3e6,function(_3e7){
var type=_3e5[_3e7].type;
var _3e8=wm.typeManager.getType(type);
if(_3e8&&!_3e8.liveService){
v.push(wm.getViewField(_3e4,(_3e3?_3e3+".":"")+_3e7));
var _3e9=wm.typeManager.getSimplePropNames(_3e8.fields);
wm.forEach(_3e9,function(f){
var path=(_3e3?_3e3+".":"")+_3e7+"."+f;
v.push(wm.getViewField(_3e4,path));
});
}
});
return v;
};
dojo.declare("wm.LiveView",wm.Component,{service:"",dataType:"",related:[],view:[],constructor:function(){
this.related=[];
this.view=[];
},init:function(){
this.inherited(arguments);
this.setDataType(this.dataType);
},loaded:function(){
this.inherited(arguments);
this.viewChanged();
},viewChanged:function(){
dojo.publish(this.getRuntimeId()+"-viewChanged",[this.getId()]);
},createDefaultView:function(){
this.setFields(this.related||[],wm.getDefaultView(this.dataType));
},getRelatedFields:function(){
if(!this.related||this.related.length==0){
this.related=this.getRequiredRelatedFields();
}
return this.related||[];
},getRequiredRelatedFields:function(){
try{
var ts=[];
var _3ea=wm.typeManager.getTypeSchema(this.dataType);
for(var i in _3ea){
var _3eb=_3ea[i];
var _3ec=wm.typeManager.isStructuredType(_3eb.type);
if(_3ec&&_3eb.required){
if(_3eb.type=="com.sforce.soap.enterprise.salesforceservice.QueryResultType"){
continue;
}
this.addRelated(i);
ts.push(i);
}
}
return ts;
}
catch(e){
}
return [];
},setFields:function(_3ed,_3ee){
this.related=_3ed;
this._sortView(_3ee);
this.view=_3ee;
},getFieldIndex:function(_3ef){
var di=dojo.isObject(_3ef)?_3ef.dataIndex:_3ef;
for(var i=0,view=this.view,f;f=view[i];i++){
if(f.dataIndex==di){
return i;
}
}
return -1;
},hasField:function(_3f0){
return (this.getFieldIndex(_3f0)>-1);
},getRelatedIndex:function(_3f1){
for(var i=0,_3f2=this.related,r;r=_3f2[i];i++){
if(r==_3f1){
return i;
}
}
return -1;
},hasRelated:function(_3f3){
return (this.getRelatedIndex(_3f3)>-1);
},addField:function(_3f4){
var f=_3f4&&wm.getViewField(wm.typeManager.getTypeSchema(this.dataType),_3f4);
if(f&&!this.hasField(f)){
this.view.push(f);
this._sortView(this.view);
}
return f;
},removeField:function(_3f5){
var i=this.getFieldIndex(_3f5);
if(i>-1){
this.view.splice(i,1);
}
},addRelated:function(_3f6){
if(_3f6&&!this.hasRelated(_3f6)){
this.related.push(_3f6);
this.addRelatedDefaultView(_3f6);
}
},removeRelated:function(_3f7){
var i=this.getRelatedIndex(_3f7);
if(i>-1){
this.related.splice(i,1);
}
},addRelatedDefaultView:function(_3f8){
var _3f9=wm.getDefaultView(this.dataType,_3f8);
dojo.forEach(_3f9,function(f){
if(!this.hasField(f)){
this.view.push(f);
}
},this);
this._sortView();
},_sortView:function(_3fa){
if(dojo.isArray(_3fa)){
var t=this.dataType;
_3fa.sort(function(a,b){
if(wm.isNumber(a.order)||wm.isNumber(b.order)){
return wm.data.compareNumbers(a.order,b.order);
}else{
a=a.dataIndex;
b=b.dataIndex;
var al=a.split(".").length,bl=b.split(".").length;
return al==bl?wm.data.compare(a,b):wm.data.compareNumbers(al,bl);
}
});
}
},_copyView:function(_3fb){
var view=[];
for(var i=0,v;(v=_3fb[i]);i++){
view.push(dojo.mixin({},v));
}
return view;
},getViewById:function(_3fc){
if(_3fc instanceof wm.LiveView){
return _3fc;
}else{
if(_3fc){
return this.getRoot().app.getValueById(_3fc);
}
}
},copyLiveView:function(_3fd){
var lv=this.getViewById(_3fd);
if(lv){
this.setService(lv.service);
this.setDataType(lv.dataType);
var v=this._copyView(lv.view);
this.setFields(lv.related,v);
}else{
this.clearView();
}
},clearView:function(){
this.setService("");
this.setDataType("");
this.setFields([],[]);
},setService:function(_3fe){
this.service=_3fe;
},setDataType:function(_3ff){
if(this._typeChangeSubscribe){
try{
dojo.disconnect(this._typeChangeSubscribe);
}
catch(e){
}
delete this._typeChangeSubscribe;
}
var t=this.dataType;
this.dataType=_3ff;
if(t!=this.dataType){
this.dataTypeChanged();
}
if(this._defaultView){
this.createDefaultView();
}
if(this._isDesignLoaded&&this.owner instanceof wm.Variable){
var _400=wm.typeManager.getType(this.dataType);
if(_400){
this._typeChangeSubscribe=this._subscribeTypeChange=dojo.subscribe("ServiceTypeChanged-"+_400.service,dojo.hitch(this,function(){
this.owner.typeChanged(this.owner.type);
}));
if(this.view){
for(var i=this.view.length-1;i>=0;i--){
if(this.view[i].dataIndex.indexOf(".")==-1){
if(!_400.fields[this.view[i].dataIndex]){
wm.Array.removeElementAt(this.view,i);
}
}
}
if(this.owner instanceof wm.LiveVariable){
wm.forEachProperty(_400.fields,dojo.hitch(this,function(_401,_402){
if(!wm.typeManager.isStructuredType(_401.type)){
if(!dojo.some(this.view,function(_403){
return _403.dataIndex==_402;
})){
this.addField(_402);
}
}
}));
}
}
}
}
},dataTypeChanged:function(){
this.related=[];
this.view=[];
},hasRelatedProp:function(_404){
for(var i=0,_405=this.related,r;(r=_405[i]);i++){
if(r==_404){
return true;
}
}
},getListView:function(_406){
var _407=wm.typeManager.getTypeSchema(this.getSubType(_406));
return dojo.filter(this.getSubView(_406),function(v){
return !wm.typeManager.isPropInList(_407,v.dataIndex);
});
},getSubType:function(_408){
if(_408){
var _409=wm.typeManager.getTypeSchema(this.dataType);
return (_409&&(wm.typeManager.getPropertyInfoFromSchema(_409,_408)||0).type)||this.dataType;
}else{
return this.dataType;
}
},getSubRelated:function(_40a){
_40a=_40a?_40a+".":"";
if(_40a){
var list=[],l=_40a.length;
dojo.forEach(this.related,function(r){
if(r.indexOf(_40a)==0){
list.push(r.substring(l));
}
});
return list;
}else{
return this.related;
}
},getSubView:function(_40b){
if(this._isDesignLoaded&&this.owner instanceof wm.Variable&&this.view.length==0){
this.createDefaultView();
}
_40b=_40b?_40b+".":"";
var view=this._copyView(this.view);
if(_40b){
var list=[],l=_40b.length;
dojo.forEach(view,function(v){
if(v.dataIndex.indexOf(_40b)==0){
v.dataIndex=v.dataIndex.substring(l);
list.push(v);
}
});
return list;
}else{
return view;
}
},pickListExists:function(){
var _40c=false;
if(SALESFORCE_SERVICE==this.service){
for(var i=0;i<this.view.length;i++){
var e=this.view[i];
if("picklist"==e.subType){
_40c=true;
break;
}
}
}
return _40c;
}});
wm.Object.extendSchema(wm.LiveView,{related:{ignore:1,writeonly:1},view:{ignore:1,writeonly:1},service:{ignore:1,writeonly:1},dataType:{ignore:1,writeonly:1}});
}
if(!dojo._hasResource["wm.base.components.LiveVariable"]){
dojo._hasResource["wm.base.components.LiveVariable"]=true;
dojo.provide("wm.base.components.LiveVariable");
dojo.declare("wm.LiveVariable",wm.ServiceVariable,{autoUpdate:true,startUpdate:true,operation:"read",firstRow:0,sourceData:null,matchMode:"start",ignoreCase:false,orderBy:"",liveSource:null,refireOnDbChange:false,maxResults:500,_rootField:"",destroy:function(){
this._unsubscribeLiveView();
this.inherited(arguments);
},init:function(){
this.inherited(arguments);
this.filter=new wm.Variable({name:"filter",owner:this,type:this.type||"any"});
this.sourceData=new wm.Variable({name:"sourceData",owner:this,type:this.type||"any"});
this.setupSubscriptions();
if(this.isList===undefined&&this.operation=="read"){
this.isList=true;
}
},setupSubscriptions:function(){
this.subscribe(this.filter.getRuntimeId()+"-changed",this,"filterChanged");
this.subscribe(this.sourceData.getRuntimeId()+"-changed",this,"sourceDataChanged");
},postInit:function(){
this._inLVPostInit=true;
this.inherited(arguments);
if(this.$.liveView){
this.setLiveView(this.$.liveView);
}else{
if(this.liveSource&&this.liveSource!="app"){
this.setLiveSource(this.liveSource);
}else{
this.setLiveView(this.liveView||this.createLiveView(this.type));
}
}
this._inPostInit=true;
this.doAutoUpdate();
this._inPostInit=false;
this._inLVPostInit=false;
},_subscribeLiveView:function(){
this._unsubscribeLiveView();
if(this.liveView){
this._liveViewSubscription=dojo.subscribe(this.liveView.getRuntimeId()+"-viewChanged",dojo.hitch(this,"_liveViewChanged"));
}
},_unsubscribeLiveView:function(){
dojo.unsubscribe(this._liveViewSubscription);
this._liveViewSubscription=null;
},isLiveType:function(){
return wm.typeManager.getLiveService(this.type);
},doAutoUpdate:function(){
if(this.isLiveType()){
this.inherited(arguments);
}
},filterChanged:function(){
if(this.autoUpdate){
if(djConfig.isDebug){
this.log("autoUpdate");
}
this.doAutoUpdate();
if(djConfig.isDebug){
this.endLog("autoUpdate");
}
}
},sourceDataChanged:function(){
if(this.autoUpdate){
if(djConfig.isDebug){
this.log("autoUpdate");
}
this.doAutoUpdate();
if(djConfig.isDebug){
this.endLog("autoUpdate");
}
}
},setFilter:function(_40d){
if((_40d||0).type==this.type){
this.filter.setDataSet(_40d);
}
},setOrderBy:function(_40e){
this.orderBy=_40e;
this.doAutoUpdate();
},setSourceData:function(_40f){
var _410=this.isLiveType();
if(!_410||(this.type&&_40f&&!_40f.declaredClass)||(_40f||0).type==this.type){
this.sourceData.setDataSet(_40f);
if(!_410){
this._updating++;
if(_40f.liveView&&_40f.liveView.getId().match(/^app\./)){
this.setLiveSource(this.sourceData.type);
}else{
if(!this.liveView){
this.liveView=this.createLiveView();
}
this.liveView.setDataType(_40f.liveView.dataType);
this.liveView.related=dojo.clone(_40f.liveView.related);
this.liveView.service=_40f.liveView.service;
this.liveView.view=dojo.clone(_40f.liveView.view);
this.setLiveView(this.liveView);
}
this._updating--;
}
}else{
if(!_40f){
this.sourceData.setDataSet(null);
}
}
},setLiveSource:function(_411){
var s=this.liveSource=_411;
var v;
try{
v=this.getRoot().app.getValueById(s);
}
catch(e){
}
if(!v){
v=this.createLiveView(s);
}
if(v){
this.setLiveView(v);
}
if(!this._inLVPostInit){
this.doAutoUpdate();
}
},setLiveView:function(_412){
this.clearData();
this.liveView=_412;
if(this._isDesignLoaded){
this._subscribeLiveView();
}
this.setType(this.getViewType());
},createLiveView:function(_413){
return new wm.LiveView({name:"liveView",owner:this,dataType:_413,_defaultView:true});
},setType:function(_414){
var _415=this.sourceData.type+"|"+dojo.toJson(this.sourceData._dataSchema);
var _416=this.filter.type+"|"+dojo.toJson(this.filter._dataSchema);
this.inherited(arguments);
var _417=this._hasChanged;
if(this.operation=="read"&&wm.isEmpty(this.getData())){
this.isList=true;
}
this.filter.setType(this.type);
this.sourceData.setType(this.type);
if(this.liveView&&this.liveView.dataType!=this.type&&this.liveView.owner==this){
this.liveView.setDataType(this.type);
this.liveView.createDefaultView();
}
var _418=this.sourceData.type+"|"+dojo.toJson(this.sourceData._dataSchema);
var _419=this.filter.type+"|"+dojo.toJson(this.filter._dataSchema);
if(!this._updating&&!this._inLVPostInit&&this.$.binding&&(_417||_415!=_418||_416!=_419)){
this.$.binding.refresh();
}
if(this.refireOnDbChange){
if(this._updateOnDbSubscribe){
dojo.unsubscribe(this._updateOnDbSubscribe);
}
if(this.type){
this._updateOnDbSubscribe=this.subscribe(this.type+"-server-changed",this,"updateOnDbChange");
}
}
},_liveViewChanged:function(){
this.setType(this.liveView.dataType);
if(this.isDesignLoaded()){
this.doAutoUpdate();
}
},operationChanged:function(){
},updateOnDbChange:function(_41a){
if(_41a===this){
return;
}
if(djConfig.isDebug){
this.log("autoUpdate","updateOnDbChange");
}
this.update();
},_update:function(){
if(this._designTime){
this._service=wm.getRuntimeServiceDesignTime(this);
}else{
this._service=wm.getRuntimeService(this);
}
return this.inherited(arguments);
},getArgs:function(){
wm.getDataConvertDates=true;
var d=this.sourceData.getData(true),t=this.sourceData.type||this.type,s=wm.typeManager.getService(this.type),args=[s,t,wm.isEmpty(d)?null:d];
if(this.operation=="read"){
args=args.concat(this._getReadArguments());
}
delete wm.getDataConvertDates;
return args;
},getDebugArgs:function(){
if(this.operation=="read"){
return this.filter.getData();
}else{
return this.sourceData.getData();
}
},_getReadArguments:function(){
var _41b={properties:this._getEagerProps(this),filters:this._getFilters(),matchMode:this.matchMode,ignoreCase:this.ignoreCase},_41c=this.orderBy?{orderBy:(this.orderBy||"").split(",")}:{},max=this.isDesignLoaded()?this.designMaxResults:this.maxResults,_41d=max?{maxResults:max,firstResult:this.firstRow}:{};
dojo.mixin(_41c,_41d);
return [_41b,_41c];
},_getFilters:function(){
return this._getFilterValues(this.filter.getData());
},_getFilterValues:function(_41e,_41f){
var f=[],d,p;
for(var i in _41e){
d=_41e[i];
p=(_41f?(_41f||"")+".":"")+i;
if(dojo.isObject(d)&&d!==null){
f=f.concat(this._getFilterValues(d,p));
}else{
if(p!==undefined&&d!==undefined&&d!==null){
f.push(p+"="+d);
}
}
}
return f;
},_isSourceDataBound:function(){
var _420=this.$.binding.wires,w;
for(var i in _420){
w=_420[i];
if((w.targetProperty||"").indexOf("sourceData")==0){
return true;
}
}
},processResult:function(_421){
this.dataSetCount=this._service.fullResult?this._service.fullResult.dataSetSize:0;
if(this._appendData){
_421=this.data._list.concat(_421);
delete this._appendData;
}
this.inherited(arguments);
if(this.operation!="read"){
dojo.publish(this.type+"-server-changed",[this]);
}
},getPage:function(){
return Math.floor(this.firstRow/(this.maxResults||1));
},getTotalPages:function(){
return Math.ceil((this.dataSetCount||1)/(this.maxResults||1));
},setPage:function(_422){
_422=Math.max(0,Math.min(this.getTotalPages()-1,_422));
this.firstRow=_422*(this.maxResults||0);
this.update();
},setNextPage:function(){
this.setPage(this.getPage()+1);
},setPreviousPage:function(){
this.setPage(this.getPage()-1);
},setFirstPage:function(){
this.setPage(0);
},setLastPage:function(){
this.setPage(this.getTotalPages()-1);
}});
}
if(!dojo._hasResource["wm.base.components.LogoutVariable"]){
dojo._hasResource["wm.base.components.LogoutVariable"]=true;
dojo.provide("wm.base.components.LogoutVariable");
dojo.declare("wm.LogoutVariable",wm.ServiceVariable,{service:"securityService",operation:"logout",autoUpdate:0,startUpdate:0,clearDataOnLogout:true,logoutNavCall:null,init:function(){
this.inherited(arguments);
if(!this.clearDataOnLogout||window["PhoneGap"]){
this.logoutNavCall=new wm.NavigationCall({name:"logoutNavCall",owner:this,operation:"gotoPage"});
this.logoutNavCall.input.setData({pageName:"Login"});
}
},onSuccess:function(_423){
if(window["PhoneGap"]){
window.localStorage.clear();
}
if(!this.clearDataOnLogout||window["PhoneGap"]){
this.logoutNavCall.update();
}else{
window.location.reload();
}
},onError:function(_424){
this.inherited(arguments);
app.alert(wm.getDictionaryItem("wm.LogoutVariable.FAILED",{error:_424}));
},_end:0});
dojo.declare("wm.LoginVariable",wm.ServiceVariable,{useDefaultSuccessHandler:true,service:"securityService",operation:"login",_setOperation:function(_425){
this._service._operations.login={name:"login",parameters:{username:{type:"string"},password:{type:"string"}},returnType:"java.lang.String"};
this.inherited(arguments);
},request:function(){
var user=this.input.getValue("username");
var pass=this.input.getValue("password");
if(!user||!pass){
var d=new dojo.Deferred();
var e=new Error("Username and Password are required");
d.errback(e);
this.onResult();
this.onError(e);
return d;
}
var _426=wm.login([user,pass],this.useDefaultSuccessHandler?null:function(){
});
_426.addCallbacks(dojo.hitch(this,function(){
this.onResult();
this.onSuccess();
}),dojo.hitch(this,function(e){
this.onResult();
this.onError(e);
}));
return _426;
}});
}
if(!dojo._hasResource["wm.base.widget.Bevel"]){
dojo._hasResource["wm.base.widget.Bevel"]=true;
dojo.provide("wm.base.widget.Bevel");
dojo.declare("wm.Bevel",wm.Widget,{className:"wmbevel",flex:0,bevelSize:4,init:function(){
this.inherited(arguments);
},getOrientedStyleName:function(){
return this.className+" "+this.className+(this.vertical?"-h":"-v");
},addOrientation:function(){
dojo.addClass(this.domNode,this.getOrientedStyleName());
},removeOrientation:function(){
dojo.removeClass(this.domNode,this.getOrientedStyleName());
},updateSize:function(){
var h=(this.parent||0).layoutKind=="left-to-right",d=this.bevelSize+"px";
this.setWidth(h?d:"100%");
this.setHeight(h?"100%":d);
},setParent:function(){
this.inherited(arguments);
this.addOrientation();
this.updateSize();
},toHtml:function(){
return "<hr/>";
}});
}
if(!dojo._hasResource["wm.base.drag.capture"]){
dojo._hasResource["wm.base.drag.capture"]=true;
dojo.provide("wm.base.drag.capture");
kit=dojo;
kit.declare("wm.Capture",null,{isCaptured:false,setEvents:function(){
this.events={};
kit.forEach(arguments,kit.hitch(this,"addEvent"));
},addEvent:function(_427){
if(!this[_427]){
this[_427]=function(){
};
}
this.events[_427]=kit.hitch(this,_427);
},capture:function(){
if(this.isCaptured){
return;
}
this.doCapture();
this.isCaptured=true;
},release:function(){
if(!this.isCaptured){
return;
}
this.doRelease();
this.isCaptured=false;
}});
if(kit.isIE){
wm.Capture.extend({_bind:function(_428,_429,_42a){
var on="on"+_429,old=_428[on];
_428[on]=function(){
_42a(kit.fixEvent());
};
return old;
},_unbind:function(_42b,_42c,_42d){
var on="on"+_42c;
_42b[on]=_42d;
},doCapture:function(){
var n=document.body,e,oldf,newf;
n.setCapture(true);
this._captures={};
for(var i in this.events){
if(!(0)[i]){
this._captures[i]=this._bind(n,i,this.events[i]);
}
}
},doRelease:function(){
var n=document.body;
for(var i in this._captures){
if(!(0)[i]){
this._unbind(n,i,this._captures[i]);
}
}
this._captures=null;
n.releaseCapture(true);
}});
}else{
wm.Capture.extend({doCapture:function(_42e){
for(var i in this.events){
if(!(0)[i]){
document.addEventListener(i,this.events[i],true);
}
}
},doRelease:function(){
for(var i in this.events){
if(!(0)[i]){
document.removeEventListener(i,this.events[i],true);
}
}
this.isCaptured=false;
}});
}
kit.declare("wm.MouseCapture",wm.Capture,{constructor:function(){
this.setEvents("mousemove","mouseup","mouseout","click");
},mousedown:function(e){
kit.stopEvent(e);
this.capture();
},mousemove:function(e){
},mouseout:function(e){
},mouseup:function(e){
this.release();
kit.stopEvent(e);
},click:function(e){
alert("MouseCapture saw a click!");
}});
}
if(!dojo._hasResource["wm.base.drag.drag"]){
dojo._hasResource["wm.base.drag.drag"]=true;
dojo.provide("wm.base.drag.drag");
dojo.declare("wm.Drag",null,{hysteresis:4,dx:0,dy:0,px:0,py:0,constructor:function(){
this.initNodes();
},initNodes:function(){
this.scrimNode=document.createElement("div");
var css="position: absolute; z-index: 200; width: 100%; height: 100%; top: 0; left: 0; display: none;";
css+="background-color: transparent;";
this.scrimNode.style.cssText=css;
document.body.appendChild(this.scrimNode);
},setCursor:function(_42f){
if(!this.avatarNode){
this.scrimNode.style.cursor=_42f;
return;
}
if(_42f=="no-drop"){
dojo.addClass(this.avatarNode,"invalidDropCSS");
}else{
dojo.removeClass(this.avatarNode,"invalidDropCSS");
}
this.scrimNode.style.cursor="default";
},mousedown:function(e){
this.inherited(arguments);
this.mouseIsDown=true;
this.dragging=false;
this.dx=0;
this.dy=0;
this.px=e.pageX;
this.py=e.pageY;
if(this.scrimEarly){
}
},mouseout:function(e){
if(this.mouseIsDown&&!this.dragging){
this.start(e);
}
},mousemove:function(e){
if(this.mouseIsDown){
this.dx=e.pageX-this.px;
this.dy=e.pageY-this.py;
if(this.dragging){
this.drag(e);
}else{
if(Math.sqrt(this.dx*this.dx+this.dy*this.dy)>this.hysteresis){
this.start(e);
}
}
}
},start:function(e){
this.dragging=true;
wm.showHideNode(this.scrimNode,true);
this.onstart(e);
},drag:function(e){
this.ondrag(e);
},mouseup:function(e){
this.inherited(arguments);
this.mouseIsDown=false;
this.finish();
if(this.dragging){
this.dragging=false;
this.drop();
}
},drop:function(){
this.ondrop();
},finish:function(){
wm.showHideNode(this.scrimNode,false);
},onstart:function(e){
},ondrag:function(e){
},ondrop:function(){
}});
dojo.declare("wm.MouseDrag",[wm.MouseCapture,wm.Drag],{});
dojo.declare("wm.DragDropper",wm.MouseDrag,{initNodes:function(){
this.inherited(arguments);
this.avatarNode=document.createElement("div");
dojo.addClass(this.avatarNode,"dragAvatarCSS");
this.avatarNode.style.cssText="display: none;";
this.avatarNode.innerHTML="(control)";
this.scrimNode.appendChild(this.avatarNode);
},showHideAvatar:function(_430){
wm.showHideNode(this.avatarNode,_430);
},setAvatarContent:function(_431){
this.avatarNode.innerHTML=_431;
},update:function(e){
this.pxp=this.px+this.dx;
this.pyp=this.py+this.dy;
dojo._setMarginBox(this.avatarNode,this.pxp+12,this.pyp+16);
},start:function(e){
this.inherited(arguments);
this.update();
wm.showHideNode(this.avatarNode,true);
},drag:function(){
this.inherited(arguments);
this.update();
},finish:function(){
wm.showHideNode(this.avatarNode,false);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Splitter"]){
dojo._hasResource["wm.base.widget.Splitter"]=true;
dojo.provide("wm.base.widget.Splitter");
dojo.declare("wm.SplitterResize",wm.MouseDrag,{beginResize:function(e,_432){
this.splitter=_432;
this.setCursor(this.splitter.vertical?"w-resize":"n-resize");
this.mousedown(e);
},drag:function(){
this.inherited(arguments);
this.splitter.drag(this.dx,this.dy);
},finish:function(){
this.inherited(arguments);
this.splitter.drop();
}});
dojo.declare("wm.Splitter",wm.Bevel,{className:"wmsplitter",minimum:-1,maximum:-1,mode:dojo.isMoz<4||dojo.isIE<9?2:0,layout:"",constructor:function(){
wm.Splitter.resizer=wm.Splitter.resizer||new wm.SplitterResize();
},init:function(){
this.inherited(arguments);
this.splitterWidget=this.parentIsSplitter?this.parent:this;
this.findLayout();
this.connectEvents(this.domNode,["mousedown","dblclick"]);
},findLayout:function(){
var v=this.splitterWidget.parent.layoutKind=="left-to-right";
var p=this.splitterWidget.parent.prevSibling(this.splitterWidget,true);
if(p){
var l=v?(p.width=="100%"?"right":"left"):(p.height=="100%"?"bottom":"top");
this.setLayout(l);
}
},updateSize:function(){
if(this._isDestroying){
return;
}
var _433=this.parentIsSplitter?this.parent:this;
var h=(_433.parent||0).layoutKind=="left-to-right",d=this.bevelSize+"px";
this.setWidth(h?d:"100%");
this.setHeight(h?"100%":d);
},setLayout:function(_434){
this.layout=_434;
this.removeOrientation();
this.vertical=this.layout=="left"||this.layout=="right";
this.addOrientation();
this.updateSize();
},getSizeControl:function(){
var _435=this.splitterWidget;
switch(this.layout){
case "left":
case "top":
this.percentSizeControl=_435.parent.nextSibling(_435,true);
return _435.parent.prevSibling(_435,true);
case "right":
case "bottom":
this.percentSizeControl=_435.parent.prevSibling(_435,true);
return _435.parent.nextSibling(_435,true);
}
},getPosition:function(){
return {top:this.splitterWidget.bounds.t,left:this.splitterWidget.bounds.l};
},mousedown:function(e){
this.sizeControl=this.getSizeControl();
if(!this.sizeControl){
return;
}
this.size=this.sizeControl.cloneBounds();
this.containerSize=this.sizeControl.parent.cloneBounds();
this.initialPosition=this.getPosition();
this.position=this.getPosition();
wm.Splitter.resizer.beginResize(e,this);
switch(this.layout){
case "top":
case "bottom":
this._boundsMax=this.sizeControl.parent.bounds.h-this.sizeControl.parent.getPreferredFitToContentHeight()+this.sizeControl.bounds.h;
this._boundsMin=this.sizeControl.getPreferredFitToContentHeight?this.sizeControl.getPreferredFitToContentHeight():this.sizeControl.getMinHeightProp();
break;
case "left":
case "right":
this._boundsMax=this.sizeControl.parent.bounds.w-this.sizeControl.parent.getPreferredFitToContentWidth()+this.sizeControl.bounds.w;
this._boundsMin=this.sizeControl.getPreferredFitToContentWidth?this.sizeControl.getPreferredFitToContentWidth():this.sizeControl.getMinWidthProp();
break;
}
},drag:function(inDx,inDy){
if(this.vertical){
this.moveX(inDx);
}else{
this.moveY(inDy);
}
this.changing();
},drop:function(){
this.change();
},changing:function(){
this._collapsed=false;
switch(this.mode){
case 0:
this.adjustSize();
break;
default:
break;
}
},change:function(){
this.adjustSize();
},boundValue:function(_436){
var _437=this.splitterWidget;
var x=_436;
if(this.minimum!=-1){
_436=Math.max(this.minimum,_436);
}
if(this.maximum!=-1){
_436=Math.min(this.maximum,_436);
}
var _438=_437.parent.getContentBounds();
if(_436<this._boundsMin){
_436=this._boundsMin;
}else{
if(_436>this._boundsMax){
_436=this._boundsMax;
}
}
this.atLimit=(x!=_436);
return _436;
},adjustSize:function(){
var dx=this.position.left-this.initialPosition.left;
var dy=this.position.top-this.initialPosition.top;
var w=this.size.w+(this.layout=="right"?-dx:dx);
var h=this.size.h+(this.layout=="bottom"?-dy:dy);
if(this.layout=="top"||this.layout=="bottom"){
this.sizeControl.setHeight(h+"px");
}else{
this.sizeControl.setWidth(w+"px");
}
},move:function(inD,_439,_43a){
if(inD==0){
return;
}
this.position[_439]=this.initialPosition[_439]+inD;
if(this.layout==_439){
this.position[_439]=this.boundValue(this.position[_439]);
}else{
var e=this.containerSize[_43a];
this.position[_439]=e-this.boundValue(e-this.position[_439]);
}
this.splitterWidget.domNode.style[_439]=this.position[_439]+"px";
},moveX:function(inDx){
this.move(inDx,"left","w");
},moveY:function(inDy){
this.move(inDy,"top","h");
},dblclick:function(){
if(this._collapsed){
this.expand();
}else{
this.collapse();
}
},collapse:function(){
this._collapsed=true;
this.initialPosition=this.getPosition();
this._expandedPosition=dojo.mixin({},this.initialPosition);
switch(this.layout){
case "left":
this.position.left=0;
break;
case "top":
this.position.top=0;
break;
case "right":
this.position.left=this.boundValue(this.position.left+this.size.w);
break;
case "bottom":
this.position.top=this.boundValue(this.position.top+this.size.h);
break;
}
this.change();
},expand:function(){
this._collapsed=false;
this.initialPosition=this.getPosition();
dojo.mixin(this.position,this._expandedPosition);
this.change();
}});
}
if(!dojo._hasResource["wm.base.widget.Html"]){
dojo._hasResource["wm.base.widget.Html"]=true;
dojo.provide("wm.base.widget.Html");
dojo.declare("wm.Html",wm.Control,{minHeight:15,width:"100%",height:"200px",html:"",autoScroll:true,init:function(){
dojo.addClass(this.domNode,"wmhtml");
this.inherited(arguments);
this.connect(this.domNode,"onclick",this,function(evt){
wm.onidle(this,"onclick",evt);
});
this.setHtml(this.html);
},build:function(){
this.inherited(arguments);
this.sizeNode=document.createElement("div");
dojo.addClass(this.sizeNode,"wmSizeNode");
this.domNode.appendChild(this.sizeNode);
},getHtml:function(){
return this.sizeNode.innerHTML;
},setHtml:function(_43b){
var _43c=this.sizeNode.innerHTML;
if(_43b&&String(_43b).indexOf("resources/")==0){
if(!this.htmlLoader){
this.htmlLoader=new wm.HtmlLoader({owner:this,relativeUrl:true});
}
this.htmlLoader._htmlNode=this.sizeNode;
this.htmlLoader.setUrl(_43b);
this.html=_43b;
this.valueChanged("html",_43b);
if(_43c!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
return;
}
if(_43b&&dojo.isArray(_43b)){
_43b=_43b.join("");
}
if(_43b&&_43b.value){
_43b=_43b.value;
}
this.html=this.sizeNode.innerHTML=(_43b==undefined?"":_43b);
this.valueChanged("html",this.inHtml);
if(_43c!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
},scheduleAutoSize:function(){
this._needsAutoSize=true;
return wm.job(this.getRuntimeId()+": doAutoSize",10,dojo.hitch(this,function(){
this.doAutoSize(true,true);
}));
},doAutoSize:function(_43d,_43e){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_43e&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _43f=this.sizeNode;
var _440=_43f.offsetHeight;
var _441=_43f.offsetWidth;
if(this.autoSizeHeight){
var _442=_440+this.padBorderMargin.t+this.padBorderMargin.b;
if(_442<this.minHeight){
_442=this.minHeight;
}
if(_441>this.bounds.w){
_442+=17;
}
this.bounds.h=_442;
this.height=_442+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeHeight||p.fitToContentHeight)){
p=p.parent;
}
p.delayedReflow();
}
if(this.autoSizeWidth){
var _443=_441+this.padBorderMargin.l+this.padBorderMargin.r;
if(_440>this.bounds.h){
_443+=17;
}
this.bounds.w=_443;
this.width=_443+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeWidth||p.fitToContentWidth)){
p=p.parent;
}
p.delayedReflow();
}
if(this.isDesignLoaded()&&studio.designer.selected==this){
studio.inspector.reinspect();
}
this._doingAutoSize=false;
},appendHtml:function(_444){
if(_444&&dojo.isArray(_444)){
_444=_444.join("");
}
if(_444&&_444.value){
_444=_444.value;
}
this.sizeNode.innerHTML+=(_444==undefined?"":_444);
this.html=this.sizeNode.innerHTML;
this.valueChanged("html",this.inHtml);
},onclick:function(){
},addUserClass:function(_445,_446){
this.inherited(arguments);
if(this.isDesignLoaded()){
if(this.autoSizeHeight||this.autoSizeWidth){
this.doAutoSize(1,1);
}
}
},getAutoSize:function(){
if(this.autoSizeWidth){
return "width";
}
if(this.autoSizeHeight){
return "height";
}
return "none";
},setAutoSize:function(_447){
if(_447=="none"){
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
}else{
if(_447=="width"){
if(!this.autoSizeWidth){
this.setAutoSizeWidth(true);
}
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
}else{
if(_447=="height"){
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
if(!this.autoSizeHeight){
this.setAutoSizeHeight(true);
}
}
}
}
},toHtml:function(){
return this.html;
}});
}
if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){
this.node=dojo.byId(node);
var pos=e.touches?e.touches[0]:e;
this.marginBox={l:pos.pageX,t:pos.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,"onmousemove",this,"onFirstMove"),dojo.connect(d,"ontouchmove",this,"onFirstMove"),dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"ontouchmove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ontouchend",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,pos=e.touches?e.touches[0]:e;
this.host.onMove(this,{l:m.l+pos.pageX,t:m.t+pos.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}
if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,_448){
this.node=dojo.byId(node);
if(!_448){
_448={};
}
this.handle=_448.handle?dojo.byId(_448.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_448.delay>0?_448.delay:0;
this.skip=_448.skip;
this.mover=_448.mover?_448.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ontouchstart",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_449,node){
return new dojo.dnd.Moveable(node,_449);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"ontouchmove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"),dojo.connect(this.handle,"ontouchend",this,"onMouseUp"));
var pos=e.touches?e.touches[0]:e;
this._lastX=pos.pageX;
this._lastY=pos.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
var pos=e.touches?e.touches[0]:e;
if(Math.abs(pos.pageX-this._lastX)>this.delay||Math.abs(pos.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_44a){
dojo.publish("/dnd/move/start",[_44a]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_44b){
dojo.publish("/dnd/move/stop",[_44b]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_44c,e){
},onMove:function(_44d,_44e,e){
this.onMoving(_44d,_44e);
var s=_44d.node.style;
s.left=_44e.l+"px";
s.top=_44e.t+"px";
this.onMoved(_44d,_44e);
},onMoving:function(_44f,_450){
},onMoved:function(_451,_452){
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.Dialog"]){
dojo._hasResource["wm.base.widget.Dialogs.Dialog"]=true;
dojo.provide("wm.base.widget.Dialogs.Dialog");
wm.dialog={showingList:[]};
wm.dialog.getNextZIndex=function(_453,_454){
var _455=30;
if(!wm.dialog.showingList.length){
return _455;
}
for(var i=0;i<wm.dialog.showingList.length;i++){
if(!_453||_453&&wm.dialog.showingList[i]._isDesignLoaded){
if(wm.dialog.showingList[i] instanceof wm.Toast==false&&!wm.dialog.showingList[i].docked){
if(!_454||wm.dialog.showingList[i]!=this){
_455=Math.max(_455,wm.dialog.showingList[i].domNode.style.zIndex);
}
}
}
}
return _455+5;
};
wm.dismiss=function(_456,_457){
var o=_456;
while(o&&!dojo.isFunction(o.dismiss)){
o=o.owner;
}
wm.fire(o,"dismiss",[_457]);
};
wm.bgIframe={create:function(){
var html=["<iframe src='javascript:\"\"'"," style='position: absolute; left: 0px; top: 0px;"," z-index: 2; filter:Alpha(Opacity=\"0\");'>"].join(""),f=this.domNode=(dojo.isIE&&dojo.isIE<9)?document.createElement(html):document.createElement("IFRAME");
app.appRoot.domNode.appendChild(f);
f.style.display="none";
if(dojo.isMoz){
f.style.position="absolute";
f.style.left=f.style.top="0px";
f.style.opacity=0;
f.style.zIndex=2;
}
dojo.subscribe("window-resize",this,"size");
},setShowing:function(_458,_459){
if(!this.domNode){
return;
}
if(_459||_458!=this.showing){
this.domNode.style.display=_458?"":"none";
this.showing=_458;
}
if(_458){
this.size();
}
},size:function(_45a){
if(!this.domNode||!this.showing){
return;
}
if(_45a){
this.sizeNode=_45a;
}
var _45b=this.sizeNode||document.body;
dojo.marginBox(this.domNode,dojo.contentBox(_45b));
}};
dojo.addOnLoad(function(){
if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<4&&navigator.userAgent.indexOf("Macintosh")!=-1)){
wm.bgIframe.create();
}
});
dojo.declare("wm.DialogResize",wm.MouseDrag,{beginResize:function(e,_45c){
this.dialog=_45c;
this.mousedown(e);
},drag:function(){
this.inherited(arguments);
this.dialog.drag(this.dx,this.dy);
},finish:function(){
this.inherited(arguments);
this.dialog.drop();
}});
dojo.declare("wm.Dialog",wm.Container,{manageHistory:true,manageURL:false,enableTouchHeight:true,titlebarButtons:"",containerClass:"MainContent",corner:"cc",scrim:true,useContainerWidget:false,useButtonBar:false,_minified:false,_maxified:false,noEscape:false,noMinify:false,noMaxify:false,layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:2,borderColor:"rgb(80,80,80)",titlebarBorder:"1",titlebarBorderColor:"black",titlebarHeight:"23",mobileTitlebarHeight:"35",footerBorder:"1,0,0,0",containerPadding:"5",margin:"3",width:"640px",height:"400px",showing:false,dialogScrim:null,modal:true,showTitleButtonsWhenDocked:false,noLeftRightDocking:true,noTopBottomDocking:true,constructor:function(){
wm.Dialog.resizer=wm.Dialog.resizer||new wm.DialogResize();
},init:function(){
if(wm.isMobile){
this.titlebarHeight=this.mobileTitlebarHeight;
}
this.inherited(arguments);
if(this._isDesignLoaded){
this.flags.noModelDrop=true;
}
if(!this.docked){
if(this._isDesignLoaded){
studio.designer.domNode.appendChild(this.domNode);
}else{
app.appRoot.domNode.appendChild(this.domNode);
}
}
this.dialogScrim=new wm.Scrim({owner:this,_classes:{domNode:["wmdialog-scrim"]},waitCursor:false});
this.createTitle();
if(!this._isDesignLoaded){
this.connectEvents(this.domNode,["mousedown"]);
}
},postInit:function(){
this.inherited(arguments);
this._animEnabled=true;
if(dojo.isIE<=9||wm.isAndroid<=3||this._noAnimation){
this._animEnabled=false;
}
if(this._animEnabled){
var _45d;
if(dojo.isWebKit){
_45d="webkitAnimationEnd";
}else{
if(dojo.isIE){
_45d="MSAnimationEnd";
}else{
if(dojo.isOpera){
_45d="oanimationend";
}else{
_45d="animationend";
}
}
}
this.domNode.addEventListener(_45d,dojo.hitch(this,"animEnd"),false);
}
dojo.addClass(this.domNode,"wmdialog");
this.domNode.style.position="absolute";
if(!this.docked){
this.domNode.style.zIndex=wm.dialog.getNextZIndex(this._isDesignLoaded);
}
if(this.designWrapper){
this.designWrapper.domNode.style.zIndex=this.domNode.style.zIndex+1;
}
if(!this.docked){
this.domNode.style.display="none";
}
this._connections.push(this.connect(document,"keydown",this,"keydown"));
this._subscriptions.push(dojo.subscribe("window-resize",this,"windowResize"));
this.setModal(this.modal);
this.setTitlebarBorder(this.titlebarBorder);
this.setTitlebarBorderColor(this.titlebarBorderColor);
var _45e,_45f;
var _460=(this.declaredClass=="wm.Dialog"||this._pageOwnsWidgets)?this.owner:this;
if(this.containerWidgetId!==undefined){
if(this.containerWidgetId){
_45e=this.owner.getValueById(this.containerWidgetId);
_45f=_45e.domNode;
}
}else{
if(this.c$.length==1){
if(this.useContainerWidget){
_45e=this.containerWidget||new wm.Container({_classes:{domNode:["wmdialogcontainer",this.containerClass]},name:_460.getUniqueName("containerWidget"),parent:this,owner:_460,layoutKind:"top-to-bottom",padding:this.containerPadding,fitToContentHeight:this.fitToContentHeight,margin:"0",border:"0",width:"100%",height:"100%",horizontalAlign:"left",verticalAlign:"top",autoScroll:true});
_45f=_45e.domNode;
}else{
_45f=this.domNode;
}
}else{
_45e=this.c$[1];
}
}
if(this.buttonBarId!==undefined){
if(this.buttonBarId){
this.buttonBar=this.owner.getValueById(this.buttonBarId);
}
}else{
if(this.c$.length<3){
if(this.useButtonBar&&this.useContainerWidget){
this.createButtonBar();
}
}else{
this.buttonBar=this.c$[2];
}
}
if(_45e){
this.containerWidget=_45e;
}
this.containerNode=_45f;
if(this.docked){
this.show();
}
},setUseButtonBar:function(_461){
this.useButtonBar=_461;
if(_461&&!this.buttonBar){
this.createButtonBar();
this.reflow();
}else{
if(!_461&&this.buttonBar){
this.buttonBar.destroy();
delete this.buttonBar;
this.reflow();
}
}
},createButtonBar:function(){
var _462=(this.declaredClass=="wm.Dialog"||this instanceof wm.DesignableDialog)?this.owner:this;
this.buttonBar=new wm.Panel({_classes:{domNode:["dialogfooter"]},name:"buttonBar",owner:_462,parent:this,width:"100%",height:wm.Button.prototype.height,mobileHeight:wm.Button.prototype.mobileHeight,enableTouchHeight:true,horizontalAlign:"right",verticalAlign:"top",layoutKind:"left-to-right",border:this.footerBorder,borderColor:this.titlebarBorderColor});
this.reflow();
},setTitlebarBorder:function(_463){
this.titlebarBorder=_463;
var _464=(String(_463).match(","))?_463:"0,0,"+_463+",0";
this.titleBar.setBorder(_464);
this.titleBar.setHeight((parseInt(this.titlebarHeight)+this.titleBar.padBorderMargin.t+this.titleBar.padBorderMargin.b)+"px");
},setTitlebarBorderColor:function(_465){
this.titlebarBorderColor=_465;
this.titleBar.setBorderColor(_465);
},setFooterBorder:function(_466){
this.footerBorder=_466;
if(this.buttonBar){
this.buttonBar.setBorder(_466);
}
},setFooterBorderColor:function(_467){
this.footerBorderColor=_467;
if(this.buttonBar){
this.buttonBar.setBorderColor(_467);
}
},setModal:function(_468){
dojo[_468?"removeClass":"addClass"](this.domNode,"nonmodaldialog");
this.modal=(_468===undefined||_468===null)?true:_468;
if(this.dojoMoveable){
this.dojoMoveable.destroy();
this.dojoMoveable=null;
}
if(!_468&&!this.dojoMoveable){
this.dojoMoveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleLabel.domNode});
this.connect(this.dojoMoveable,"onMouseDown",this,function(){
if(!this.modal){
if(this.docked){
this._userSized=true;
this.setDocked(false);
}
var _469=wm.dialog.getNextZIndex(this._isDesignLoaded,this);
this.domNode.style.zIndex=_469;
}
});
this.connect(this.dojoMoveable,"onMoveStop",this,function(){
if(this._openingTitleBarMenu){
return;
}
this._userSized=true;
this.bounds.l=parseInt(this.domNode.style.left);
this.bounds.t=parseInt(this.domNode.style.top);
if(!this._maxified){
if(!this.insureDialogVisible(true)){
if(this.bounds.t<0&&!this.noTopBottomDocking||this.bounds.t+this.bounds.h>app.appRoot.bounds.b&&!this.noTopBottomDocking||this.bounds.l<0&&!this.noLeftRightDocking||this.bounds.w+this.bounds.l>app.appRoot.bounds.r&&!this.noLeftRightDocking){
this.setDocked(true);
}
}
}
this.setBounds(this.bounds);
if(!this.docked){
var _46a=false;
if(this.bounds.l>app.appRoot.bounds.r){
this.bounds.l=app.appRoot.bounds.r-100;
_46a=true;
}
if(this.bounds.r<0){
this.bounds.l=-this.bounds.w+100;
_46a=true;
}
if(this.bounds.t>app.appRoot.bounds.b){
this.bounds.t=app.appRoot.bounds.b-100;
_46a=true;
}
if(this.bounds.t<0){
this.bounds.t=0;
_46a=true;
}
if(_46a){
this.setBounds(this.bounds);
wm.Control.prototype.renderBounds.call(this);
}
}
});
}
if(this.showing&&!this._isDesignLoaded){
this.dialogScrim.setShowing(this.modal);
wm.bgIframe.setShowing(!this.modal&&!this.isDesignedComponent());
}
this.titleButtonPanel.setShowing(!this.modal&&(!this.docked||this.showTitleButtonsWhenDocked));
},setNoEscape:function(_46b){
this.noEscape=_46b;
this.titleClose.setShowing(!this.modal&&!this.noEscape&&!wm.isMobile);
},setDocked:function(_46c,_46d,_46e){
if(this._isDesignLoaded){
return;
}
var _46f=this.docked;
if(Boolean(_46f)==Boolean(_46c)){
return;
}
this.docked=_46c;
if(_46c){
this._dock(_46d,_46e);
dojo.addClass(this.domNode,"Docked");
}else{
this._undock();
dojo.removeClass(this.domNode,"Docked");
}
},_dock:function(_470,edge){
var _471=this.border;
var _472=this.margin;
if(!edge){
if(this.bounds.t<0&&!this.noTopBottomDocking){
edge="t";
}else{
if(this.bounds.t+this.bounds.h>app.appRoot.bounds.b&&!this.noTopBottomDocking){
edge="b";
}else{
if(this.bounds.l<0&&!this.noLeftRightDocking){
edge="l";
}else{
if(!this.noLeftRightDocking){
edge="r";
}
}
}
}
}
if(!this.showTitleButtonsWhenDocked){
this.titleButtonPanel.hide();
}
this._dockData=dojo.clone(this.bounds);
this._dockData.edge=edge;
this._dockData.border=_471;
this._dockData.margin=_472;
this.setBorder("0");
this.setMargin("0");
if(!_470){
if(edge=="t"&&app.dockTop&&!app.dockTop.parent.isAncestorHidden()){
_470=app.dockTop;
}else{
if(edge=="b"&&app.dockBottom&&!app.dockBottom.parent.isAncestorHidden()){
_470=app.dockBottom;
}else{
if(edge=="l"&&app.dockLeft&&!app.dockLeft.parent.isAncestorHidden()){
_470=app.dockLeft;
}else{
if(edge=="r"&&app.dockRight&&!app.dockRight.parent.isAncestorHidden()){
_470=app.dockRight;
}else{
_470=app.appRoot;
}
}
}
}
}
if(!_470.showing){
_470.setShowing(true);
}
if(_470==app.appRoot){
app.dockDialog(this,edge);
}else{
this.setParent(_470);
this.setWidth("100%");
this.setHeight("100%");
_470.show();
_470.reflow();
}
this.onDock();
},onDock:function(){
},_undock:function(){
this.docked=false;
if(!wm.isMobile){
this.titleButtonPanel.show();
}
if(!this._dockData){
this._dockData=dojo.clone(this.bounds);
}
if(this._dockData.edge=="t"||this._dockData.edge=="b"){
this._dockData.t=Math.floor(dojo.coords(this.domNode).y);
}else{
this._dockData.l=Math.floor(dojo.coords(this.domNode).x);
}
this._cupdating=true;
if(this._dockData.border!==undefined){
this.setBorder(this._dockData.border);
}else{
this.setBorder(wm.Dialog.prototype.border);
}
if(this._dockData.margin!==undefined){
this.setMargin(this._dockData.margin);
}else{
this.setMargin(wm.Dialog.prototype.margin);
}
this.setWidth(((this._dockData.w||this.bounds.w)-20)+"px");
this.setHeight(((this._dockData.h||this.bounds.h)-20)+"px");
this.setBounds({t:this._dockData.t||this.bounds.t,l:this._dockData.l||this.bounds.l});
this._cupdating=false;
delete this._dockData;
var _473=this.parent;
app.removeDockedDialog(this);
if(this._isDesignLoaded){
studio.designer.domNode.appendChild(this.domNode);
}else{
app.appRoot.domNode.appendChild(this.domNode);
}
this.render();
this.flow();
if(_473.dockRight||_473.dockLeft||_473.dockTop||_473.dockBottom){
if(_473.c$.length==0){
_473.hide();
}else{
_473.reflow();
}
}else{
app.reflow();
}
this.onUndock();
},onUndock:function(){
},minify:function(){
this._minified=true;
this.setShowing(false);
if(!app.wmMinifiedDialogPanel){
app.createMinifiedDialogPanel();
}
this.minifiedLabel=app.createMinifiedDialogLabel(this.title);
this.minifiedLabel.connect(this.minifiedLabel,"onclick",this,function(){
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
app.wmMinifiedDialogPanel.reflow();
this._minified=false;
this.setShowing(true);
});
app.wmMinifiedDialogPanel.reflow();
},unminify:function(_474,_475){
if(!this._minified){
return;
}
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
app.wmMinifiedDialogPanel.reflow();
this._minified=false;
if(!_475){
this.show();
}
},maxify:function(){
if(this.docked){
this._undock();
}
if(this._maxified){
this._maxified=false;
this.bounds.h=parseInt(this.height);
this.bounds.w=parseInt(this.width);
}else{
this._maxified=true;
}
this.renderBounds();
this.reflow();
},windowResize:function(){
this.reflow();
this.delayedRenderBounds();
},reflowParent:function(){
if(this.docked&&this.parent){
this.parent.reflow();
}else{
this.renderBounds();
this.reflow();
}
},dismiss:function(e){
this.setShowing(false,false,true);
var why=""||dojo.isString(e)?e:e&&e.target&&e.target.innerHTML;
this.onClose(why);
why=null;
},destroy:function(){
this._destroying=true;
if(this._minified){
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
}
if(this.showing){
this.dismiss();
}
if(this.dialogScrim){
this.dialogScrim.destroy();
}
if(this.minifiedLabel){
this.minfiedLabel.destroy();
}
this.inherited(arguments);
},flow:function(){
if(this.showing){
this.renderBounds();
this.inherited(arguments);
if(dojo.isChrome&&this.buttonBar&&!this._chromeButtonBarHack){
this._chromeButtonBarHack=true;
this.buttonBar.bounds.h++;
this.buttonBar.renderBounds();
}
this.dialogScrim.reflowParent();
}
},getPreferredFitToContentHeight:function(){
var _476=this.inherited(arguments);
var min=this.minHeight;
return Math.max(min,_476);
},getPreferredFitToContentWidth:function(){
var _477=this.inherited(arguments);
var min=this.minWidth;
return Math.max(min,_477);
},setFitToContentWidth:function(_478){
this.inherited(arguments);
this.reflow();
},setFitToContentHeight:function(_479){
this.inherited(arguments);
this.reflow();
},delayedRenderBounds:function(){
wm.job(this.getRuntimeId()+".renderBounds",5,dojo.hitch(this,function(){
var _47a=dojo.clone(this.bounds);
this.renderBounds();
if(_47a.w!=this.bounds.w||_47a.h!=this.bounds.h){
this.reflow();
}
}));
},renderBounds:function(){
if(this.docked){
return this.inherited(arguments);
}
if(this.showing){
if(this.fitToContentHeight&&!this._userSized){
this.bounds.h=this.getPreferredFitToContentHeight();
this.height=this.bounds.h+"px";
}
if(this.fitToContentWidth&&!this._userSized){
this.bounds.w=this.getPreferredFitToContentWidth();
this.width=this.bounds.w+"px";
}
if(this._minified){
var _47b=app.appRoot.bounds;
var t=_47b.h-30;
var l=_47b.w-200;
this.setBounds(l,t,200,30);
}else{
if(this._maxified){
var _47b=app.appRoot.bounds;
this.setBounds(20,20,_47b.w-40,_47b.h-40);
}else{
if(this._userSized){
this.insureDialogVisible();
}else{
if(!this.fixPositionNode&&this.positionNear){
var _47c=this.owner.getValueById(this.positionNear);
if(_47c){
this.fixPositionNode=_47c.domNode;
}
}
if(this.fixPositionNode){
this.renderBoundsByPositionNode();
}else{
if(!this._fixPosition){
this.renderBoundsByCorner();
}else{
this.insureDialogVisible();
}
}
wm.bgIframe.size();
}
}
}
return this.inherited(arguments);
}
},setCorner:function(_47d){
this.corner=_47d.replace(/top/,"t").replace(/bottom/,"b").replace(/left/,"l").replace(/right/,"r").replace(/center/,"c").replace(/ /,"");
if(this.positionNear){
this.renderBoundsByPositionNode();
}else{
this.renderBoundsByCorner();
}
},insureDialogVisible:function(_47e){
if(!this.showing){
return;
}
var w=this.bounds.w;
var h=this.bounds.h;
var _47f=this._isDesignLoaded;
var W=(_47f)?studio.designer.bounds.w:(app._page)?app._page.root.bounds.w:window.clientWidth;
var H=(_47f)?studio.designer.bounds.h:(app._page)?app._page.root.bounds.h:window.clientHeight;
if(this.bounds.t+this.bounds.h>H){
if(_47e){
return false;
}else{
this.bounds.t=H-this.bounds.h;
}
}
if(this.bounds.l+this.bounds.w>W){
if(_47e){
return false;
}else{
this.bounds.l=W-this.bounds.w;
}
}
if(this.bounds.t<0){
if(_47e){
return false;
}else{
this.bounds.t=0;
}
}
if(this.bounds.l<0){
if(_47e){
return false;
}else{
this.bounds.l=0;
}
}
if(!_47e){
wm.Control.prototype.renderBounds.call(this);
}
return true;
},renderBoundsByPositionNode:function(){
if(!this.fixPositionNode){
return;
}
var o=dojo._abs(this.fixPositionNode);
if(this._isDesignLoaded){
var _480=dojo._abs(studio.designer.domNode);
o.x-=_480.x;
o.y-=_480.y;
}
var _481=this.corner||"bc";
var top=_481.substring(0,1);
var left=_481.substring(1,2);
switch(left){
case "l":
this.bounds.l=o.x-this.bounds.w;
break;
case "r":
this.bounds.l=o.x+o.w;
break;
case "c":
this.bounds.l=o.x+(o.w-this.bounds.w)/2;
}
switch(top){
case "t":
this.bounds.t=o.y-this.bounds.h;
break;
case "b":
this.bounds.t=o.y+o.h;
break;
case "c":
this.bounds.t=o.y+(o.h-this.bounds.h)/2;
}
this.insureDialogVisible();
this.setBounds(this.bounds);
},renderBoundsByCorner:function(){
if(!this.showing){
return;
}
var w=this.width;
var h=this.height;
var _482=this._isDesignLoaded;
var W=(_482)?studio.designer.bounds.w:this.domNode.parentNode.clientWidth;
var H=(_482)?studio.designer.bounds.h:this.domNode.parentNode.clientHeight;
if(String(w).match(/\%/)){
w=W*parseInt(w)/100;
}else{
w=parseInt(w);
}
if(String(h).match(/\%/)){
h=H*parseInt(h)/100;
}else{
h=parseInt(h);
}
var _483=10;
if(w>W-_483*2){
w=W-_483*2;
}
if(h>H-_483*2){
h=H-_483*2;
}
var t,l;
var top=this.corner.substring(0,1);
var left=this.corner.substring(1,2);
var _484=[];
var _485=this.getOwnerApp();
if(!this._percEx.h&&!this._percEx.w){
for(var i=0;i<wm.dialog.showingList.length;i++){
if(wm.dialog.showingList[i]!=this&&wm.dialog.showingList[i].getOwnerApp()==_485&&(!window["studio"]||this!=window["studio"].dialog)){
_484.push(wm.dialog.showingList[i]);
}
}
h=parseInt(h);
var last=wm.Array.last(_484);
}
switch(left){
case "l":
l=_483;
break;
case "r":
l=W-w-_483;
break;
case "c":
l=Math.floor((W-w)/2);
if(last&&last.corner==this.corner){
l+=25;
}
break;
}
switch(top){
case "t":
t=_483;
break;
case "b":
t=H-h-_483;
break;
case "c":
t=Math.floor((H-h)/2);
if(last&&last.corner==this.corner){
t+=25;
}
break;
}
this.setBounds(l,t,w,h);
wm.Control.prototype.renderBounds.call(this);
},setContent:function(_486){
this.containerNode.innerHTML=_486;
},animEnd:function(){
if(this.showing){
}else{
if(this.docked){
this.setDocked(false);
}
this.domNode.style.display="none";
}
},setShowing:function(_487,_488,_489){
if(app.debugDialog){
var _48a=["_setValue","setProp","setValue"];
}
wm.Array.removeElement(wm.dialog.showingList,this);
if(!this.docked&&_487&&(!window["studio"]||this!=window["studio"].dialog)){
var _48b=wm.dialog.getNextZIndex(this._isDesignLoaded);
wm.dialog.showingList.push(this);
this.domNode.style.zIndex=_48b;
if(this.modal){
this.dialogScrim.domNode.style.zIndex=_48b-1;
}
}
if(_487&&this._minified){
this.unminify(null,true);
delete this.showing;
}
wm.bgIframe.setShowing(_487&&this.modal&&!this.isDesignedComponent());
if(_487!=this.showing&&this.modal&&!this._isDesignLoaded){
this.dialogScrim.setShowing(_487);
}
var _48c=this.showing;
var _48d=Boolean(this.showing)!=Boolean(_487);
if(_48d&&this._animEnabled){
dojo.removeClass(this.domNode,["fadeInAnim","fadeOutAnim"]);
}
if(_487&&_48d){
if(this._animEnabled){
this.domNode.opacity=0.01;
}
this.inherited(arguments);
if(this._animEnabled){
dojo.addClass(this.domNode,"fadeInAnim");
}else{
this.animEnd();
}
if(this.modal&&!this._noAutoFocus){
this.domNode.tabIndex=-1;
this.domNode.focus();
}
if(app.debugDialog&&this!=app.debugDialog){
var i=0;
var _48e=arguments.callee.caller;
_48a.push("show");
while(_48e&&dojo.indexOf(_48a,_48e.nom)!=-1&&i<15){
_48e=_48e.caller;
i++;
}
var _48f=app.debugDialog.newLogEvent({eventType:"dialog",sourceDescription:(_48e&&_48e.nom?_48e.nom+"()":""),resultDescription:"Showing dialog: "+this.getRuntimeId()+".setShowing(true)",firingId:this.getRuntimeId(),affectedId:this.getRuntimeId(),method:"show"});
}
this.callOnShowParent();
this.onShow();
if(_48f){
app.debugDialog.endLogEvent(_48f);
}
}else{
if(!_487&&_48d){
this.callOnHideParent();
this.showing=Boolean(_487);
if(this._animEnabled){
dojo.addClass(this.domNode,"fadeOutAnim");
}else{
this.animEnd();
}
this.showing=false;
if(app.debugDialog&&this!=app.debugDialog){
var i=0;
var _48e=arguments.callee.caller;
_48a.push("hide");
while(_48e&&dojo.indexOf(_48a,_48e.nom)!=-1&&i<15){
_48e=_48e.caller;
i++;
}
var _48f=app.debugDialog.newLogEvent({eventType:"dialog",sourceDescription:(_48e&&_48e.nom?_48e.nom+"()":""),resultDescription:"Hiding dialog: "+this.getRuntimeId()+".setShowing(false)",firingId:this.getRuntimeId(),affectedId:this.getRuntimeId(),method:"hide"});
}
if(!_489&&!this._minified){
this.onClose("");
}
if(_48f){
app.debugDialog.endLogEvent(_48f);
}
}
}
if(this.designWrapper){
this.designWrapper.setShowing(_487);
}
if(!this._initializing&&!this._isDesignLoaded&&_48d&&this.manageHistory){
app.addHistory({id:this.getRuntimeId(),options:{},title:"Hide "+this.title});
}
},canProcessKeyboardEvent:function(_490){
if(!this.showing||this.docked){
return false;
}
var _491=dojo.query(".wmdialog");
var _492=parseInt(this.domNode.style.zIndex);
for(var i=0;i<_491.length;i++){
if(_491[i].style.display!="none"&&parseInt(_491[i].style.zIndex)>_492){
return false;
}
}
return true;
},_onEsc:function(){
},keydown:function(_493){
if(!this.canProcessKeyboardEvent(_493)){
return true;
}
if(_493.keyCode==dojo.keys.ESCAPE&&!this.noEscape){
if(this._isDesignLoaded&&studio.selected.getParentDialog()==this){
return;
}
if(this.showing){
this.callOnHideParent();
this._onEsc();
this.setShowing(false);
this.onClose("cancel");
if(!this._isDesignLoaded){
_493._wmstop=true;
}
dojo.stopEvent(_493);
}
}else{
if(_493.keyCode==dojo.keys.ENTER){
if(this.$.textInput&&this.$.textInput.getDataValue){
this.onEnterKeyPress(this.$.textInput.getDataValue(),_493);
}else{
this.onEnterKeyPress("",_493);
}
}
}
return true;
},onEnterKeyPress:function(_494){
},onShow:function(){
},onClose:function(_495){
},handleBack:function(_496){
if(!this.showing&&!this._showAnimation){
return false;
}
this.hide();
return true;
},restoreFromLocationHash:function(_497){
this.show();
},generateStateUrl:function(_498){
if(this.showing||this._showAnimation&&!this._isDesignLoaded){
_498[this.getRuntimeId()]=1;
}
},setTitlebarHeight:function(_499){
this.titlebarHeight=_499;
if(this.titleBar){
this.titleBar.setHeight(_499+"px");
}
},createTitle:function(){
var _49a=(String(this.titlebarBorder).match(","))?this.titlebarBorder:"0,0,"+this.titlebarBorder+",0";
this.titleBar=new wm.Container({_classes:{domNode:["dialogtitlebar"]},showing:this.title,name:"titleBar",parent:this,owner:this,width:"100%",desktopHeight:this.titlebarHeight+"px",mobileHeight:this.mobileTitlebarHeight+"px",margin:"0",padding:"0",border:_49a,borderColor:this.titlebarBorderColor,verticalAlign:"middle",layoutKind:"left-to-right",flags:{notInspectable:true}});
var _49b=this.titleButtonPanel=new wm.Panel({parent:this.titleBar,owner:this,name:"titleButtonBar",width:wm.isMobile?this.mobileTitlebarHeight+"px":(!this.noEscape?20:0)+(!this.noMinify?20:0)+(!this.noMaxify?20:0)+"px",height:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top",showing:!this.modal&&(!this.docked||this.showTitleButtonsWhenDocked)});
if(wm.isMobile){
this.menuButton=new wm.MobileIconButton({direction:"down",noInspector:true,name:"menuButton",width:this.mobileTitlebarHeight+"px",height:"100%",margin:"0",parent:_49b,owner:this,onclick:dojo.hitch(this,function(_49c){
this.setShowing(false);
})});
}
this.titleClose=new wm.ToolButton({_classes:{domNode:["dialogclosebutton"]},noInspector:true,name:"titleClose",hint:wm.getDictionaryItem("wm.Dialog.HINT_CLOSE"),width:"19px",height:"19px",margin:"3,0,0,3",parent:_49b,owner:this,showing:!this.noEscape&&!wm.isMobile});
this.titleMinify=new wm.ToolButton({_classes:{domNode:["dialogminifybutton"]},noInspector:true,hint:wm.getDictionaryItem("wm.Dialog.HINT_MINIFY"),name:"titleMinify",width:"19px",height:"19px",margin:"3,0,0,3",parent:_49b,owner:this,showing:!this.noMinify&&!wm.isMobile});
this.titleMaxify=new wm.ToolButton({_classes:{domNode:["dialogmaxifybutton"]},noInspector:true,hint:wm.getDictionaryItem("wm.Dialog.HINT_MAXIFY"),name:"titleMinify",caption:" ",width:"19px",height:"19px",margin:"3,0,0,3",parent:_49b,owner:this,showing:!this.noMaxify&&!wm.isMobile});
this.titleLabel=new wm.Label({noInspector:true,name:"dialogTitleLabel",parent:this.titleBar,owner:this,caption:this.title,showing:Boolean(this.title),margin:"3,3,0,10",width:"100%",height:"100%"});
this.connect(this.titleClose,"onclick",this,"dismiss");
this.connect(this.titleMinify,"onclick",this,"minify");
this.connect(this.titleMaxify,"onclick",this,"maxify");
if(this.titlebarButtons&&!wm.isMobile){
var _49d=this.titlebarButtons.split(/\s*,\s*/);
for(var i=0;i<_49d.length;i++){
new wm.ToolButton({_classes:{domNode:[_49d[i]]},noInspector:true,name:_49d[i],caption:" ",width:"19px",height:"19px",margin:"3,0,0,3",parent:this.titleBar,owner:this,onclick:dojo.hitch(this,"onMiscButtonClick",_49d[i])});
}
new wm.Spacer({owner:this,parent:this.titleBar,width:"5px"});
}
},onMiscButtonClick:function(_49e){
},setTitlebarButtons:function(_49f){
this.titlebarButtons=_49f;
this.titleBar.destroy();
this.createTitle();
this.moveControl(this.titleBar,0);
this.reflow();
},setNoMinify:function(val){
this.noMinify=val;
if(this.titleMinify){
this.titleMinify.setShowing(!val&&!wm.isMobile);
}
},setNoMaxify:function(val){
this.noMaxify=val;
if(this.titleMaxify){
this.titleMaxify.setShowing(!val&&!wm.isMobile);
}
},setTitle:function(_4a0){
this.title=_4a0;
if(this.titleLabel){
this.titleLabel.setCaption(_4a0);
this.titleLabel.setShowing(true);
}
if(this.titleBar){
this.titleBar.setShowing(Boolean(_4a0));
}
},setSizeProp:function(n,v,_4a1){
this.inherited(arguments);
if(v&&v.match("%")){
}
if(this.docked){
return;
}
if(this.isReflowEnabled()){
this.renderBounds();
}
if(this.designWrapper){
this.designWrapper.controlBoundsChange();
this.designWrapper.renderBounds();
}
this.reflow();
},update:function(){
this.show();
},activate:function(){
this.show();
},deactivate:function(){
this.hide();
},mousedown:function(e){
if(!this.modal&&!this.docked){
var _4a2=wm.dialog.getNextZIndex(this._isDesignLoaded,this);
this.domNode.style.zIndex=_4a2;
}
if(!this.modal&&!this.noMaxify&&e.target==this.domNode){
this._initialPosition=dojo.clone(this.bounds);
var _4a3=e.clientX-this.marginExtents.l-this.borderExtents.l;
var _4a4=e.clientX;
var _4a5=e.clientY-this.marginExtents.t-this.borderExtents.t;
var _4a6=e.clientY;
if(_4a3-12<=this.bounds.l&&_4a3+12>=this.bounds.l){
this._dragBorderX="left";
}else{
if(_4a4-12<=this.bounds.r&&_4a4+12>=this.bounds.r){
this._dragBorderX="right";
}else{
this._dragBorderX="";
}
}
if(_4a5-12<=this.bounds.t&&_4a5+12>=this.bounds.t){
this._dragBorderY="top";
}else{
if(_4a6-12<=this.bounds.b&&_4a6+12>=this.bounds.b){
this._dragBorderY="bottom";
}else{
this._dragBorderY="";
}
}
switch(this._dragBorderX+this._dragBorderY){
case "lefttop":
wm.Dialog.resizer.setCursor("nw-resize");
break;
case "leftbottom":
wm.Dialog.resizer.setCursor("sw-resize");
break;
case "righttop":
wm.Dialog.resizer.setCursor("ne-resize");
break;
case "rightbottom":
wm.Dialog.resizer.setCursor("se-resize");
break;
case "top":
wm.Dialog.resizer.setCursor("n-resize");
break;
case "bottom":
wm.Dialog.resizer.setCursor("s-resize");
break;
case "left":
wm.Dialog.resizer.setCursor("w-resize");
break;
case "right":
wm.Dialog.resizer.setCursor("e-resize");
break;
}
wm.Dialog.resizer.beginResize(e,this);
}
},drag:function(inDx,inDy){
this._userSized=true;
if(this._dragBorderX=="left"){
this.setBounds(this._initialPosition.l+inDx,NaN,this._initialPosition.w-inDx,NaN);
}else{
if(this._dragBorderX=="right"){
this.setBounds(NaN,NaN,this._initialPosition.r-this._initialPosition.l+inDx,NaN);
}
}
if(this._dragBorderY=="top"){
this.setBounds(NaN,this._initialPosition.t+inDy,NaN,this._initialPosition.h-inDy,NaN);
}else{
if(this._dragBorderY=="bottom"){
this.setBounds(NaN,NaN,NaN,this._initialPosition.b-this._initialPosition.t+inDy);
}
}
this.renderBounds();
if(!dojo.isIE||dojo.isIE>=9){
if(this.docked){
app.reflow();
}else{
this.reflow();
}
}
},drop:function(){
this.reflow();
},setPositionNear:function(_4a7){
if(_4a7 instanceof wm.Component){
this.positionNear=_4a7.getId();
this.fixPositionNode=_4a7.domNode;
}else{
this.positionNear=_4a7;
var _4a8=this.owner.getValueById(_4a7);
this.fixPositionNode=_4a8?_4a8.domNode:null;
}
this.renderBounds();
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.LoadingDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.LoadingDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.LoadingDialog");
dojo.declare("wm.LoadingDialog",wm.Dialog,{caption:"Loading...",captionWidth:"60px",image:"",imageWidth:"20px",imageHeight:"20px",containerClass:"",widgetToCover:null,serviceVariableToTrack:null,classNames:"wmloadingdialog wm_FontColor_White",useContainerWidget:true,modal:false,noMinify:true,noMaxify:true,noEscape:true,border:0,title:"",_noAnimation:true,postInit:function(){
this.inherited(arguments);
dojo.removeClass(this.domNode,"wmdialog");
this.containerWidget.setLayoutKind("left-to-right");
this.containerWidget.setVerticalAlign("middle");
this.containerWidget.setHorizontalAlign("center");
this.containerWidget.setFitToContentHeight();
this.setImage(this.image);
this.setCaption(this.caption);
},setServiceVariableToTrack:function(_4a9){
if(this._isDesignLoaded){
return;
}
if(this._onResultConnect){
dojo.disconnect(this._onResultConnect);
dojo.disconnect(this._onRequestConnect);
wm.Array.removeElement(this._connections,this._onResultConnect);
wm.Array.removeElement(this._connections,this._onRequestConnect);
delete this._onResultConnect;
delete this._onRequestConnect;
}
if(_4a9){
if(dojo.isString(_4a9)){
_4a9=this.owner.getValueById(_4a9);
}
}
this.serviceVariableToTrack=_4a9;
if(this.serviceVariableToTrack){
this._onResultConnect=this.connect(this.serviceVariableToTrack,"onResult",this,"hide");
this._onRequestConnect=this.connect(this.serviceVariableToTrack,"request",this,"show");
}
},show:function(){
this._getWidgetToCover();
if(this.widgetToCover&&!this.widgetToCover.isAncestorHidden()){
this.inherited(arguments);
}
},setImage:function(_4aa){
var _4ab=this.image=_4aa;
if(!_4ab){
_4ab=dojo.moduleUrl("lib.images.common").toString()+"loadingThrobber.gif";
}
this._setImage(_4ab);
},_setImage:function(_4ac){
if(!this._picture){
this._picture=new wm.Picture({owner:this,parent:this.containerWidget,name:"loadingPicture",source:_4ac,width:this.imageWidth,height:this.imageHeight});
}else{
this._picture.setSource(_4ac);
}
},setImageWidth:function(_4ad){
this.imageWidth=_4ad;
if(this._picture){
this._picture.setWidth(_4ad);
}
},setImageHeight:function(_4ae){
this.imageHeight=_4ae;
if(this._picture){
this._picture.setHeight(_4ae);
}
},setCaption:function(_4af){
this.caption=_4af;
if(!this.caption){
return;
}
if(!this._label){
this._label=new wm.Label({owner:this,parent:this.containerWidget,name:"loadingLabel",width:this.captionWidth,height:"20px",caption:_4af,singleLine:false,autoSizeHeight:true});
}else{
this._label.setCaption(this.caption);
}
},setShowing:function(_4b0,_4b1,_4b2){
this.inherited(arguments);
if(_4b0){
this._getWidgetToCover();
if(this.widgetToCover){
var node=this.widgetToCover.domNode;
var _4b3;
if(window.getComputedStyle){
var _4b4=window.getComputedStyle(node);
_4b3=_4b4.getPropertyValue("border-radius")||_4b4.getPropertyValue("-webkit-border-radius")||_4b4.getPropertyValue("-moz-border-radius");
this.domNode.style.borderRadius=_4b3;
}
if(dojo.isWebKit){
this.domNode.style.WebkitBorderRadius=_4b3;
}else{
if(dojo.isFF){
this.domNode.style.MozBorderRadius=_4b3;
}
}
var _4b5=node.style.zIndex||0;
while(node.parentNode&&node.parentNode.tagName!="BODY"){
node=node.parentNode;
if(node.style.zIndex){
_4b5=Math.max(_4b5,node.style.zIndex);
}
}
this.domNode.style.zIndex=_4b5+1;
}
}
},_getWidgetToCover:function(){
if(this.widgetToCover){
if(dojo.isString(this.widgetToCover)){
this.widgetToCover=this.owner.getValueById(this.widgetToCover);
}
}
return this.widgetToCover;
},renderBounds:function(){
this._getWidgetToCover();
if(this.widgetToCover){
try{
var _4b6=this.widgetToCover.domNode.parentNode;
if(this.domNode.parentNode!=_4b6){
_4b6.appendChild(this.domNode);
}
var b=dojo.clone(this.widgetToCover.bounds);
b.l-=this.widgetToCover.borderExtents.l;
b.r+=this.widgetToCover.borderExtents.r;
b.w=b.r-b.l;
b.t-=this.widgetToCover.borderExtents.t;
b.b+=this.widgetToCover.borderExtents.b;
b.h=b.b-b.t;
this.setBounds(b);
wm.Control.prototype.renderBounds.call(this);
}
catch(e){
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.WidgetsJsDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.WidgetsJsDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.WidgetsJsDialog");
dojo.declare("wm.WidgetsJsDialog",wm.Dialog,{margin:"0,4,4,0",useContainerWidget:true,widgets_data:null,widgets_json:"",width:"400px",height:"150px",setShowing:function(_4b7,_4b8){
this.inherited(arguments);
if(this.isReflowEnabled()&&!this._rendered){
this.leafFirstRenderCss();
this._rendered=true;
}
},postInit:function(){
this.inherited(arguments);
if(!this.widgets_data){
this.setWidgetsJson(this.widgets_json);
}
this.generateContents();
this.containerWidget.setPadding("0");
this.renderBounds();
this.reflow();
},setWidgetsJson:function(_4b9){
try{
this.widgets_json=_4b9;
this.widgets_data=dojo.fromJson(this.widgets_json);
if(!this._cupdating){
this.generateContents();
}
}
catch(e){
console.error(e);
}
},generateContents:function(){
if(this._generated){
return;
}
this._generated=true;
this.containerWidget._cupdating=true;
this.containerWidget.createComponents(this.widgets_data,this);
this.containerWidget._cupdating=false;
this.containerWidget.reflow();
if(this.button_data){
if(!this.buttonBar){
var _4ba=this.containerWidget;
var _4bb=this.containerNode;
delete this.containerWidget;
delete this.containerNode;
this.createButtonBar();
this.containerWidget=_4ba;
this.containerNode=_4bb;
}
this.buttonBar.createComponents(this.button_data,this);
}
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.Toast"]){
dojo._hasResource["wm.base.widget.Dialogs.Toast"]=true;
dojo.provide("wm.base.widget.Dialogs.Toast");
dojo.declare("wm.Toast",wm.WidgetsJsDialog,{manageHistory:false,manageURL:false,classNames:"wmtoast wmtoastExtraSpecific",title:"",modal:false,useContainerWidget:true,_timeoutId:0,duration:5000,content:"Toast",height:"100px",width:"350px",corner:"br",border:"2",margin:"0",prepare:function(){
this.inherited(arguments);
this.widgets_data={img:["wm.Picture",{_classes:{domNode:["ToastLeft"]},width:"30px",height:"100%",margin:"4,0,0,4"}],rightColumn:["wm.Panel",{layoutKind:"top-to-bottom",width:"100%",height:"100%",fitToContentHeight:true,padding:"0"},{},{title:["wm.Label",{height:"20px",width:"100%",singleLine:true}],message:["wm.Label",{height:"100px",width:"100%",singleLine:false,autoSizeHeight:true}]}]};
},postInit:function(){
this.inherited(arguments);
this.containerWidget.setLayoutKind("left-to-right");
this.containerWidget.setPadding("4");
this.img=this.containerWidget.c$[0];
this.title=this.containerWidget.c$[1].c$[0];
this.message=this.containerWidget.c$[1].c$[1];
this.setContent(this.content);
this.connectEvents(this.domNode,["click"]);
},click:function(){
this.hide();
this.onToastClick();
},onToastClick:function(){
},setShowing:function(_4bc,_4bd){
if(!_4bc){
window.clearTimeout(this._timeoutId);
delete this._timeoutId;
}
this.inherited(arguments);
if(_4bc){
this.renderBounds();
this.domNode.style.zIndex=1000;
}
},renderBounds:function(){
this.renderBoundsByCorner();
},setContent:function(_4be){
this.content=_4be;
if(this.message){
this.message.setCaption(_4be);
}
},setTitle:function(_4bf){
if(this.title){
this.title.setCaption(_4bf);
}
},showToast:function(_4c0,_4c1,_4c2,_4c3,_4c4){
if(_4c0 instanceof Error){
_4c0=_4c0.toString();
}
if(!_4c2){
_4c2="Info";
}
if(_4c3){
_4c3=_4c3.replace(/top/,"t").replace(/bottom/,"b").replace(/left/,"l").replace(/right/,"r").replace(/center/,"c").replace(/ /,"");
}
this.corner=_4c3||app.toastPosition||"br";
if(this._timeoutId){
window.clearTimeout(this._timeoutId);
this.hide();
this._timeoutId=0;
}
var _4c5=wm.getDictionaryItem("wm.Toast.STATUS_"+(_4c2||"").toUpperCase())||"";
this.setTitle(_4c4||_4c5||_4c2);
_4c2=_4c2||"Info";
this._toastType=_4c2=_4c2||"Info";
var _4c6=(_4c2)?_4c2.split(" "):[];
if(dojo.indexOf(_4c6,"Success")!=-1){
this.setBorderColor("rgb(0,120,0)");
}else{
if(dojo.indexOf(_4c6,"Error")!=-1){
this.setBorderColor("rgb(120,0,0)");
}else{
if(dojo.indexOf(_4c6,"Warning")!=-1){
this.setBorderColor("#f9a215");
}else{
this.setBorderColor("rgb(0,0,0)");
}
}
}
this.message.autoSizeHeight=false;
this.setContent(_4c0);
this.message.autoSizeHeight=true;
this.duration=_4c1||this.duration;
this.domNode.className=this.classNames+" "+((_4c2)?_4c2:"");
this.show();
this.message.doAutoSize(true,true);
this.containerWidget.removeDelayedReflow();
this.containerWidget.reflow();
this.setHeight((this.containerWidget.padBorderMargin.t+this.containerWidget.padBorderMargin.b+this.message.parent.bounds.h+this.padBorderMargin.t+this.padBorderMargin.b)+"px");
this._timeoutId=window.setTimeout(dojo.hitch(this,"hide"),this.duration);
},update:function(){
this.showToast(this.content,this.duration,this.domNode.className);
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.GenericDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.GenericDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.GenericDialog");
dojo.declare("wm.GenericDialog",wm.WidgetsJsDialog,{manageHistory:false,manageURL:false,enterKeyIsButton:1,noEscape:true,title:"Generic Dialog",footerBorder:"",footerBorderColor:"",padding:"0",regExp:".*",button1Caption:"",button2Caption:"",button3Caption:"",button4Caption:"",button1Close:false,button2Close:false,button3Close:false,button4Close:false,userPrompt:"Testing...",showInput:false,prepare:function(){
this.inherited(arguments);
if("enterKeyIsButton1" in this){
this.enterKeyIsButton=this.enterKeyIsButton1?1:0;
delete this.enterKeyIsButton1;
}
this.widgets_data={genericInfoPanel:["wm.Panel",{layoutKind:"top-to-bottom",width:"100%",height:"100%",horizontalAlign:"left",verticalAlign:"top",autoScroll:true,fitToContentHeight:true,padding:"10,5,10,5"},{},{userQuestionLabel:["wm.Html",{autoScroll:false,"height":"25px",autoSizeHeight:true,"width":"100%",html:""}],textInput:["wm.Text",{"width":"100%","captionSize":"0%","showing":false},{},{}]}]};
this.button_data={button4:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button3:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button2:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button1:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}]};
},postInit:function(){
this.inherited(arguments);
this.containerWidget=this.c$[1];
this.containerWidget.flags.notInspectable=true;
if(!this.buttonBar){
this.buttonBar=this.containerWidget.c$[this.containerWidget.c$.length-1];
this.buttonBar.flags.notInspectable=true;
this.setFooterBorder(this.footerBorder);
this.setFooterBorderColor(this.footerBorderColor);
}
if(this.regExp!=".*"){
this.$.textInput.setRegExp(this.regExp);
}
var _4c7=false;
for(var i=1;i<=6;i++){
var _4c8=this["button"+i+"Caption"];
var _4c9=this.$["button"+i];
if(_4c8){
_4c7=true;
_4c9.setCaption(_4c8);
_4c9.show();
}
if(this.buttonBar){
this.buttonBar.setShowing(_4c7);
}
this.setShowInput(this.showInput);
}
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.setHtml(this.userPrompt);
}
this.containerWidget.setFitToContentHeight(true);
},setFooterBorder:function(_4ca){
this.footerBorder=_4ca;
if(this.buttonBar){
this.buttonBar.setBorder(_4ca);
this.buttonBar.setHeight((34+this.buttonBar.padBorderMargin.t+this.buttonBar.padBorderMargin.b)+"px");
}
},setFooterBorderColor:function(_4cb){
this.footerBorderColor=_4cb;
if(this.buttonBar){
this.buttonBar.setBorderColor(_4cb);
}
},reflow:function(){
try{
if(this._userSized){
return this.inherited(arguments);
}else{
if(!this._settingHeight){
var _4cc=this.getPreferredFitToContentHeight();
if(dojo.isChrome){
_4cc--;
}
this._settingHeight=true;
this.setHeight(_4cc+"px");
this._settingHeight=false;
this.inherited(arguments);
}
}
}
catch(e){
this._settingHeight=false;
}
},setShowing:function(_4cd,_4ce){
this.inherited(arguments);
if(_4cd){
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.doAutoSize(true,true);
}
if(this.showInput&&this.$.textInput&&this.$.textInput.focus){
this.$.textInput.focus();
}
wm.onidle(this,"reflow");
}
},setShowInput:function(_4cf){
this.showInput=_4cf;
if(this.$.textInput){
this.$.textInput.setShowing(_4cf);
}
},setInputDataValue:function(_4d0){
if(this.$.textInput){
this.$.textInput.setDataValue(_4d0);
}
},getInputDataValue:function(_4d1){
var _4d2;
if(this.$.textInput){
_4d2=this.$.textInput.getDataValue();
if(dojo.isString(_4d2)){
_4d2=dojo.trim(_4d2);
}
return _4d2;
}
},setUserPrompt:function(_4d3){
this.userPrompt=_4d3;
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.setHtml(_4d3);
}
},setButton1Caption:function(_4d4){
this.setButtonCaption(1,_4d4);
},setButton2Caption:function(_4d5){
this.setButtonCaption(2,_4d5);
},setButton3Caption:function(_4d6){
this.setButtonCaption(3,_4d6);
},setButton4Caption:function(_4d7){
this.setButtonCaption(4,_4d7);
},setButtonCaption:function(_4d8,_4d9){
var _4da=this.$["button"+_4d8];
this["button"+_4d8+"Caption"]=_4d9;
if(!_4da){
return;
}
if(_4d9){
_4da.setCaption(_4d9);
_4da.show();
}else{
_4da.hide();
}
if(this.buttonBar){
this.buttonBar.setShowing(this.button1Caption||this.button2Caption||this.button3Caption||this.button4Caption);
}
},onEnterKeyPress:function(_4db,_4dc){
if(this.enterKeyIsButton){
this.buttonClick(this.$["button"+this.enterKeyIsButton]);
dojo.stopEvent(_4dc);
}
},buttonClick:function(_4dd){
var name=_4dd.name;
var id=parseInt(name.match(/\d+/)[0]);
if(this["button"+id+"Close"]){
this.dismiss();
}
var text=(this.$.textInput)?this.$.textInput.getDataValue():"";
switch(id){
case 1:
this.onButton1Click(_4dd,text);
break;
case 2:
this.onButton2Click(_4dd,text);
break;
case 3:
this.onButton3Click(_4dd,text);
break;
case 4:
this.onButton4Click(_4dd,text);
break;
}
},onButton1Click:function(_4de,_4df){
},onButton2Click:function(_4e0,_4e1){
},onButton3Click:function(_4e2,_4e3){
},onButton4Click:function(_4e4,_4e5){
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.PageDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.PageDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.PageDialog");
dojo.declare("wm.pageContainerMixin",null,{pageName:"",hideControls:false,pageProperties:null,deferLoad:false,initPageContainer:function(){
this.pageContainer=new wm.PageContainer({loadParentFirst:false,deferLoad:false,parent:this,owner:this,flex:1,pageProperties:this.pageProperties});
this._connections.push(this.connect(this.pageContainer,"onPageChanged",this,"_pageChanged"));
this._connections.push(this.connect(this.pageContainer,"onError",this,"onError"));
this.pageContainer.dismiss=dojo.hitch(this,"dismiss");
if(this.pageName&&!this.deferLoad){
this.setPage(this.pageName);
}else{
this.pageContainer._pageName=this.pageName;
}
this.createControls();
},onError:function(_4e6){
},setPage:function(_4e7){
if(_4e7){
if(this.pageContainer.pageName!=_4e7){
if(this.page){
this.page.root.hide();
}
this.pageContainer.setPageName(_4e7);
}else{
this.onPageReady();
}
}
},showPage:function(_4e8,_4e9,_4ea,_4eb,_4ec,_4ed){
if(_4ec!==undefined){
this.setTitle(_4ec);
}
if(_4ed!==undefined){
this.setModal(_4ed);
}
this.setContainerOptions(_4e9,_4ea,_4eb);
this.setShowing(true);
this.setPage(_4e8);
this.reflow();
},setContainerOptions:function(_4ee,_4ef,_4f0){
this.setHideControls(_4ee);
},_pageChanged:function(){
this.page=this.pageContainer.page;
this[this.page.name]=this.page;
this.onPageReady();
this.reflow();
wm.focusContainer(this.page.root);
},onPageReady:function(){
},forEachWidget:function(_4f1){
return this.pageContainer.forEachWidget(_4f1);
},createControls:function(){
var cp=this.controlsPanel=new wm.Panel({parent:this,owner:this,layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",height:"40px",width:"100%",border:this.footerBorder||"",borderColor:this.footerBorderColor||"",flags:{notInspectable:true}});
if(!this.noBevel){
this.controlsBevel=new wm.Bevel({parent:cp,owner:this});
}
var bp=this.buttonPanel=new wm.Panel({parent:cp,owner:this,width:"100%",height:"100%",layoutKind:"left-to-right",horizontalAlign:"right"});
dojo.addClass(bp.domNode,"wmpagedialog-controlspanel");
this.closeButton=new wm.Button({parent:bp,owner:this,caption:wm.getDictionaryItem("wm.PageDialog.CAPTION_CLOSE"),width:"80px",height:"100%"});
this._connections.push(this.connect(this.closeButton,"onclick",this,"dismiss"));
cp.setShowing(!this.hideControls);
cp=null;
bp=null;
},setHideControls:function(_4f2){
if(_4f2!==undefined){
this.hideControls=_4f2;
this.controlsPanel.setShowing(!_4f2);
}
},destroy:function(){
if(this.controlsPanel){
this.controlsPanel.destroy();
this.controlsPanel=null;
}
if(this.closeButton){
this.closeButton.destroy();
this.closeButton=null;
}
if(this.controlsBevel){
this.controlsBevel.destroy();
this.controlsBevel=null;
}
if(this.buttonPanel){
this.buttonPanel.destroy();
this.buttonPanel=null;
}
if(this.pageContainer){
this.pageContainer.dismiss=null;
this.pageContainer.destroy();
this.pageContainer=null;
}
this.inherited(arguments);
}});
dojo.declare("wm.PageDialog",[wm.Dialog,wm.pageContainerMixin],{noBevel:false,footerBorder:"",footerBorderColor:"",postInit:function(){
this.inherited(arguments);
this.initPageContainer();
},setPageName:function(_4f3){
if(this._pageLoading){
return;
}
if(this.isDesignLoaded()){
var _4f4=studio.getDictionaryItem("wm.PageContainer.NEW_PAGE_OPTION");
if(_4f3==_4f4){
return this.pageContainer.createNewPage();
}
}
return this.setPage(_4f3);
},setPage:function(_4f5){
this.pageName=_4f5;
if(_4f5&&this.pageContainer.pageName!=_4f5){
this.showLoadingIndicator();
}
this.inherited(arguments);
},setContainerOptions:function(_4f6,_4f7,_4f8){
_4f7=_4f7||wm.Dialog.prototype.contentWidth;
_4f8=_4f8||wm.Dialog.prototype.contentHeight;
if(!dojo.isString(_4f7)){
_4f7+="px";
}
if(!dojo.isString(_4f8)){
_4f8+="px";
}
this.setWidth(_4f7);
this.setHeight(_4f8);
this.inherited(arguments);
},hideLoadingIndicator:function(){
if(this._loader){
dojo._destroyElement(this._loader);
delete this._loader;
}
},showLoadingIndicator:function(){
if(this.width<150||this.height<80){
return;
}
var text="&nbsp;Loading...";
var _4f9=wm.theme.getImagesPath()+"loadingThrobber.gif";
this._loader=wm.createElement("div",{id:"_wm_loading_"+this.id,innerHTML:"<div class=\"_wm_loading\" style=\"position: absolute; font-weight: bold; font-size: 10pt; z-index: 100; top: 40%; left: 40%;\"><img alt=\"loading\" style=\"vertical-align: middle\" src=\""+_4f9+"\" />"+text+"</div>"});
this.domNode.appendChild(this._loader);
},onPageReady:function(){
this.hideLoadingIndicator();
},destroy:function(){
this.inherited(arguments);
if(this.containerNode){
dojo.destroy(this.containerNode);
this.containerNode=null;
}
this.c$=[];
},keydown:function(_4fa){
if(!this.canProcessKeyboardEvent(_4fa)){
return true;
}
if(_4fa.keyCode==dojo.keys.ESCAPE&&this.page&&this.page.onEscapeKey){
this.page.onEscapeKey();
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.DesignableDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.DesignableDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.DesignableDialog");
dojo.declare("wm.DesignableDialog",wm.Dialog,{_pageOwnsWidgets:true,useButtonBar:false,border:"1",borderColor:"black",titlebarBorder:"1",titlebarBorderColor:"black",footerBorderColor:"black",scrim:false,useContainerWidget:true,title:"Dialog",postInit:function(){
this.inherited(arguments);
delete this.containerNode;
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_phonegap_misc",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
