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

dojo.provide("wm");
if(!dojo._hasResource["wm.base.components.componentList"]){
dojo._hasResource["wm.base.components.componentList"]=true;
dojo.provide("wm.base.components.componentList");
wm.componentFixList={_phonegap:[]};
wm.componentList={"wm.Content":["wm.base.widget.Content"],"wm.DataGrid":["build.Gzipped.wm_data_grid"],"wm.DojoGrid":["build.Gzipped.wm_dojo_grid"],"wm.DojoMenu":["build.Gzipped.wm_menus"],"wm.PopupMenu":["build.Gzipped.wm_menus"],"wm.DojoChart":["build.Gzipped.wm_charts"],"wm.DojoGauge":["build.Gzipped.wm_charts"],"wm.Dashboard":["build.Gzipped.wm_editors","build.Gzipped.wm_dashboard"],"wm.AccordionLayers":["build.Gzipped.wm_accordion"],"wm.WizardLayers":["build.Gzipped.wm_wizardlayer"],"wm.BreadcrumbLayers":["build.Gzipped.wm_breadcrumblayer"],"wm.ColorPickerDialog":["build.Gzipped.wm_colorpicker"],"wm.ColorPicker":["build.Gzipped.wm_colorpicker"],"wm.RichTextDialog":["wm.base.widget.Dialogs.RichTextDialog"],"wm.DojoFisheye":["wm.base.widget.DojoFisheye"],"wm.DojoLightbox":["wm.base.widget.DojoLightbox"],"wm.TwitterFeed":["wm.base.widget.TwitterFeed"],"wm.JsonStatus":["build.Gzipped.wm_editors"],"wm.Tree":["build.Gzipped.wm_trees"],"wm.PropertyTree":["build.Gzipped.wm_trees"],"wm.ObjectTree":["build.Gzipped.wm_trees"],"wm.DraggableTree":["build.Gzipped.wm_trees"],"wm.Gadget":["wm.base.widget.gadget.Gadget"],"wm.gadget.YouTube":["wm.base.widget.gadget.YouTube"],"wm.gadget.FacebookLikeButton":["wm.base.widget.gadget.Facebook"],"wm.gadget.FacebookActivityFeed":["wm.base.widget.gadget.Facebook"],"wm.gadget.GoogleMap":["wm.base.widget.gadget.GoogleMap"],"wm.gadget.Stocks":["wm.base.widget.gadget.Stocks"],"wm.gadget.Weather":["wm.base.widget.gadget.Weather"],"wm.gadget.TwitterFollowButton":["wm.base.widget.gadget.TwitterGadgets"],"wm.gadget.TwitterTweetButton":["wm.base.widget.gadget.TwitterGadgets"],"wm.gadget.TwitterList":["wm.base.widget.gadget.TwitterGadgets"],"wm.RichText":["build.Gzipped.wm_editors","build.Gzipped.wm_richTextEditor"],"wm.CheckBoxEditor":["build.Gzipped.wm_editors_old"],"wm.RadioButtonEditor":["build.Gzipped.wm_editors_old"],"wm.SelectEditor":["build.Gzipped.wm_editors_old"],"wm.TextEditor":["build.Gzipped.wm_editors_old"],"wm.SliderEditor":["build.Gzipped.wm_editors_old"],"wm._SliderEditor":["build.Gzipped.wm_editors_old"],"wm.TextAreaEditor":["build.Gzipped.wm_editors_old"],"wm._TextEditor":["build.Gzipped.wm_editors_old"],"wm.CurrencyEditor":["build.Gzipped.wm_editors_old"],"wm.NumberEditor":["build.Gzipped.wm_editors_old"],"wm.Editor":["build.Gzipped.wm_editors_old"],"wm.DateEditor":["build.Gzipped.wm_editors_old"],"wm.TimeEditor":["build.Gzipped.wm_editors_old"],"wm.Select":["build.Gzipped.wm_editors_old"],"wm.Date":["build.Gzipped.wm_editors"],"wm.DateTime":["build.Gzipped.wm_editors","build.Gzipped.wm_list"],"wm.SelectMenu":["build.Gzipped.wm_editors"],"wm.Lookup":["build.Gzipped.wm_editors"],"wm.FilteringLookup":["build.Gzipped.wm_editors"],"wm.CheckboxSet":["build.Gzipped.wm_editors"],"wm.RadioSet":["build.Gzipped.wm_editors_misc"],"wm.ListSet":["build.Gzipped.wm_editors","build.Gzipped.wm_list"],"wm.Number":["build.Gzipped.wm_editors"],"wm.Checkbox":["build.Gzipped.wm_editors"],"wm.RadioButton":["build.Gzipped.wm_editors_misc"],"wm.Currency":["build.Gzipped.wm_editors"],"wm.Slider":["build.Gzipped.wm_editors_misc"],"wm.Text":["build.Gzipped.wm_editors"],"wm.TextArea":["build.Gzipped.wm_editors"],"wm.Time":["build.Gzipped.wm_editors"],"wm.LargeTextArea":["build.Gzipped.wm_editors"],"wm.dijit.Dijit":["wm.base.widget.dijit.Dijit"],"wm.dijit.ProgressBar":["build.Gzipped.wm_progressbar"],"wm.RoundedButton":["wm.base.widget.Buttons.RoundedButton"],"wm.BusyButton":["wm.base.widget.Buttons.BusyButton"],"wm.PopupMenuButton":["build.Gzipped.wm_menus"],"wm.ToggleButton":["build.Gzipped.wm_editors"],"wm.ToggleButtonPanel":["build.Gzipped.wm_editors"],"wm.Timer":["wm.base.components.Timer"],"wm.SimpleForm":["build.Gzipped.wm_livepanel"],"wm.LiveForm":["build.Gzipped.wm_livepanel"],"wm.RelatedEditor":["build.Gzipped.wm_livepanel"],"wm.LivePanel":["build.Gzipped.wm_livepanel"],"wm.EditPanel":["build.Gzipped.wm_livepanel"],"wm.DataNavigator":["build.Gzipped.wm_livepanel"],"wm.RegularExpressionFormatter":["wm.base.widget.FormattersMisc"],"wm.EvaluationFormatter":["wm.base.widget.FormattersMisc"],"wm.LinkFormatter":["wm.base.widget.FormattersMisc"],"wm.ImageFormatter":["wm.base.widget.FormattersMisc"],"wm.DataForm":["build.Gzipped.wm_dataform"],"wm.FormPanel":["build.Gzipped.wm_dataform"],"wm.SubForm":["build.Gzipped.wm_dataform"],"wm.DBForm":["build.Gzipped.wm_dataform"],"wm.OneToMany":["wm.compressed.wm_dataform"],"wm.ServiceInputForm":["build.Gzipped.wm_dataform"],"wm.ServiceQueue":["wm.base.components.ServiceQueue"],"wm.dijit.Calendar":["build.Gzipped.wm_editors"],"wm.Template":["wm.base.widget.Template"],"wm.ComponentPublisher":["wm.base.components.Publisher"],"wm.CompositePublisher":["wm.base.components.Publisher"],"wm.TemplatePublisher":["wm.base.components.Publisher"],"wm.Composite":["wm.base.widget.Composite"],"wm.CompositeMixin":["wm.base.widget.Composite"],"wm.Ticker":["wm.base.widget.Ticker"],"wm.FileUpload":["wm.base.widget.FileUpload"],"wm.DojoFileUpload":["build.Gzipped.wm_fileupload"],"wm.DojoFlashFileUpload":["build.Gzipped.wm_fileupload"],"wm.DijitDesigner":["wm.base.widget.dijit.Dijit"],"wm.FunctionService":["wm.base.components.FunctionService"],"wm.List":["build.Gzipped.wm_list"],"wm.IFrame":["wm.base.widget.IFrame"],"wm.FeedList":["wm.base.widget.FeedList"],"wm.ListViewer":["wm.base.widget.ListViewer"],"wm.PhoneGapService":["wm.base.components.PhoneGapService"],"wm.XhrService":["wm.base.components.XhrService"],"wm.LogoutVariable":["wm.base.components.LogoutVariable"]};
wm.require=function(_1,_2){
if(dojo.getObject(_1)){
return;
}
var _3=wm.componentList[_1];
if(_3||_2){
return wm.getComponentStructure(_1);
}else{
dojo["require"](_1);
}
};
wm.getComponentStructure=function(_4){
if(_4=="wm.DojoGrid"&&wm.isMobile){
_4="wm.List";
}
var _5=wm.componentList[_4];
if(!_5){
if(_4.indexOf("wm.")==0){
_4=_4.substring(3);
}
_5=["wm.base.widget.Composite","wm.packages."+_4];
}
if(!_5){
console.error("Add "+_4+" in component list.");
}else{
for(var i=0;i<_5.length;i++){
var _6=dojo._getModuleSymbols(_5[i]).join("/")+".js";
var _7=((_6.charAt(0)=="/"||_6.match(/^\w+:/))?"":dojo.baseUrl)+_6;
while(_7.match(/[^\/]\/\.\.\//)){
_7=_7.replace(/[^\/]*\/\.\.\/+/,"");
}
wm.dojoScriptLoader(_7);
if(wm.componentFixList[_5[i]]){
var _8=wm.componentFixList[_5[i]];
for(var j=0;j<_8.length;j++){
_8[j]();
}
}
}
}
if(wm.isMobile&&_4=="wm.List"){
wm.DojoGrid=wm.List;
}
};
wm.addFrameworkFix=function(_9,_a,_b){
if(djConfig.isDebug&&!wm.studioConfig){
_b();
}else{
var _c=dojo.getObject(_9);
if(_c){
_b();
}else{
if(_a){
dojo.forEach(_a,function(_d){
if(!wm.componentFixList[_d]){
wm.componentFixList[_d]=[_b];
}else{
wm.componentFixList[_d].push(_b);
}
});
}else{
wm.componentFixList._phonegap.push(_b);
}
}
}
};
wm.applyFrameworkFixes=function(){
for(var _e in wm.componentFixList){
var _f=dojo.getObject(_e);
if(_f){
var _10=wm.componentFixList[_e];
for(var i=0;i<_e.length;i++){
_10[i]();
}
delete wm.componentFixList[_e];
}
}
};
}
if(!dojo._hasResource["wm.base.lib.util"]){
dojo._hasResource["wm.base.lib.util"]=true;
dojo.provide("wm.base.lib.util");
wm=window["wm"]||{};
wm.logErrors=false;
wm.log=function(){
console.log.apply(console,arguments);
};
wm.capitalize=function(s){
return s?s.charAt(0).toUpperCase()+s.slice(1):"";
};
wm.decapitalize=function(s){
return s?s.charAt(0).toLowerCase()+s.slice(1):"";
};
wm.camelcase=function(s){
return s.replace(/[\.-](.?)/g,function(_11){
return _11[1].toUpperCase();
});
};
wm.flattenObject=function(_12,_13){
var _14={};
for(var _15 in _12){
if(!_12[_15]){
continue;
}
if(typeof _12[_15]!="object"){
_14[_15]=_12[_15];
}else{
var _16=wm.flattenObject(_12[_15]);
if(_13){
_14[_15]=_16;
}
for(var _17 in _16){
_14[_15+"."+_17]=_16[_17];
}
}
}
return _14;
};
wm.requireCss=function(_18){
var _19=dojo.byId("CSS_"+_18.replace(/\./g,"_"));
if(_19){
return;
}
var _1a=_18.split(".");
var _1b=_1a.pop();
var _1c=_1a.join(".");
_1c=dojo.moduleUrl(_1c).path.replace(/lib\/\//,"lib/")+_1b+".css";
_19=document.createElement("link");
_19.rel="stylesheet";
_19.id="CSS_"+_18.replace(/\./g,"_");
_19.type="text/css";
_19.href=_1c;
document.getElementsByTagName("head")[0].appendChild(_19);
};
wm.isEqual=function(a1,a2){
try{
if(a1==a2){
return true;
}
if(dojo.isArray(a1)&&dojo.isArray(a2)){
return dojo.toJson([].concat(a1).sort())==dojo.toJson([].concat(a2).sort());
}
return dojo.toJson(a1)==dojo.toJson(a2);
}
catch(e){
return false;
}
};
wm.compareStrings=function(a,b){
return a<b?-1:a==b?0:1;
};
wm.toTitleCase=function(s){
return s.replace(/\b\w+\b/g,function(_1d){
return _1d?_1d.charAt(0).toUpperCase()+(_1d.slice(1)||"").toLowerCase():"";
});
};
wm.delimCat=function(_1e,_1f,_20){
return _1e+(_1e&&_1f?_20:"")+_1f;
};
wm.joinEx=function(_21,_22){
var i=0;
while(i<_21.length){
if(_21[i++]!==""){
_21.splice(--i,1);
}
}
return _21.join(_22);
};
wm.isNumber=function(v){
return (typeof v=="number")||(v instanceof Number);
};
wm.max=function(_23){
var max=_23[0];
for(var i=1;i<_23.length;i++){
if(_23[i]>max){
max=_23[i];
}
}
return max;
};
wm.sum=function(_24){
var sum=0;
for(var i=0;i<_24.length;i++){
sum+=_24[i];
}
return sum;
};
wm.average=function(_25){
return wm.sum(_25)/_25.length;
};
wm.nop=function(){
};
wm.isEmpty=function(_26){
if(window["studio"]&&dojo.isIE==8){
if(dojo.isArray(_26)&&_26.length==0){
return true;
}
if(typeof _26=="object"){
for(var i in _26){
if(!dojo.isFunction(_26[i])){
return false;
}
}
}
}else{
for(var i in _26){
return false;
}
}
if(typeof _26=="object"&&_26 instanceof Date){
return false;
}
return true;
};
wm.fire=function(obj,_27,_28){
var f=obj&&_27&&obj[_27];
if(f){
return _28?f.apply(obj,_28):f.call(obj);
}
};
wm.async=function(f,_29){
return function(){
setTimeout(f,_29||1);
};
};
wm.forEach=function(_2a,_2b){
if(dojo.isArray(_2a)){
dojo.forEach(_2a,_2b);
}else{
wm.forEachProperty(_2a,_2b);
}
};
wm.forEachProperty=function(_2c,_2d){
for(var i in _2c){
if(!_2c.hasOwnProperty||_2c.hasOwnProperty(i)){
_2d(_2c[i],i);
}
}
};
wm.isDomShowing=function(_2e){
var n=_2e;
while(n&&n!=window.document.body&&n.style.display!="none"){
n=n.parentNode;
}
return !n||n.style.display!="none";
};
wm.evalJs=function(_2f,_30){
var r=_30||"";
try{
r=eval(_2f);
}
catch(e){
wm.logging&&undefined;
}
return r;
};
wm.getClassProp=function(_31,_32){
var _33=dojo.getObject(_31);
var _34=_33&&_33.prototype;
return _34&&_34[_32];
};
wm.showHideNode=function(_35,_36){
_35.style.display=_36?"":"none";
};
wm.kids=function(_37,_38){
var _39=[],t=_38.toUpperCase();
for(var i=0,n;(n=_37.childNodes[i]);i++){
if(n.tagName==_38){
_39.push(n);
}
}
return _39;
};
wm.divkids=function(_3a){
return wm.kids(_3a,"div");
};
wm.clearSelection=function(){
try{
if(window.getSelection){
window.getSelection().collapseToEnd();
}else{
if(document.selection){
document.selection.clear();
}
}
}
catch(e){
}
};
wm.focusOnIdle=function(_3b){
setTimeout(function(){
try{
wm.fire(_3b,"focus");
wm.fire(_3b,"select");
}
catch(e){
}
},1);
};
wm.inScrollbar=function(e){
var t=e.target;
var s=t.style&&dojo.getComputedStyle(t);
return s&&(((s.overflow!="hidden"||s.overflowX!="hidden")&&(t.scrollWidth!=t.offsetWidth)&&(t.offsetWidth-19-e.clientX<0))||((s.overflow!="hidden"||s.overflowY!="hidden")&&(t.scrollHeight!=t.offsetHeight)&&(t.offsetHeight-19-e.clientY<0)));
};
wm.preloadImage=function(_3c){
var i=new Image();
i.src=_3c;
(wm.preloaded=(wm.preloaded||[])).push(i);
};
wm.setUnitsBox=function(_3d,l,t,w,h){
with(_3d.style){
l&&(left=l);
t&&(top=t);
w&&(width=w);
h&&(height=h);
}
};
wm.getNaturalBox=function(_3e){
var tn=_3e.tagName,cs=dojo.getComputedStyle(_3e),box=dojo._getContentBox(_3e,cs);
if(tn=="BUTTON"||tn=="TABLE"){
var pb=dojo._getPadBorderExtents(_3e,cs);
box.w+=pb.w;
box.h+=pb.h;
}
return box;
};
wm.calcOffset=function(_3f,_40,_41){
var o={x:0,y:0},n=_3f,cs,mb,be;
while(n&&n!=_40&&n!=document){
cs=dojo.getComputedStyle(n);
mb=dojo._getMarginBox(n,cs);
be=dojo._getBorderExtents(n,cs);
me=_41?dojo._getMarginExtents(n,cs):{l:0,t:0};
o.x+=mb.l+be.l+me.l-(n.scrollLeft||0);
o.y+=mb.t+be.t+me.t-(n.scrollTop||0);
n=n.parentNode;
}
return o;
};
wm.addRemoveClass=function(_42,_43,_44){
dojo[_44?"addClass":"removeClass"](_42,_43);
};
wm.onidle=function(){
var _45=[];
for(var i=0;i in arguments;i++){
_45.push(arguments[i]);
}
if(app&&app.debugDialog){
var _46=app.debugDialog.cacheEventChain();
}
window.setTimeout(function(){
if(_46){
app.debugDialog.restoreEventChain(_46);
}
dojo.hitch.apply(null,_45)();
if(_46){
app.debugDialog.clearEventChain();
}
},1);
};
wm.onidleChain=function(_47,_48){
if(!_48){
_48={};
}
var f2=function(_49){
window.setTimeout(function(){
var f=_49.shift();
if(f){
f();
}
if(_49.length&&!_48.canceled){
f2(_49);
}
},1);
};
if(!_48.canceled){
f2(_47,_48);
}
};
wm.job=function(_4a,_4b,_4c,_4d){
var _4e;
if(_4c&&_4d){
_4e=dojo.hitch(_4c,_4d);
}else{
if(_4d){
_4e=_4d;
}else{
_4e=_4c;
}
}
wm.cancelJob(_4a);
if(window["app"]&&app.debugDialog){
var _4f=app.debugDialog.cacheEventChain();
}
var job=function(){
delete wm._jobs[_4a];
if(_4f){
app.debugDialog.restoreEventChain(_4f);
}
_4e();
if(_4f){
app.debugDialog.clearEventChain();
}
};
wm._jobs[_4a]=setTimeout(job,_4b);
};
wm.cancelJob=function(_50){
clearTimeout(wm._jobs[_50]);
};
wm._jobs={};
wm.hasJob=function(_51){
return Boolean(wm._jobs[_51]);
};
wm.connectEvents=function(_52,_53,_54){
if(!dojo.isArray(_54)){
throw ("wm.connectEvents: event list must be an array (did you use variable args?)");
}
var _55=[];
for(var i=0,e;(e=_54[i]);i++){
_55.push(dojo.connect(_53,"on"+e,_52,e));
}
return _55;
};
wm._isUniqueName=function(_56,_57){
for(var j=0,s;(s=_57[j]);j++){
if(_56 in s){
return false;
}
}
return true;
};
wm.findUniqueName=function(_58,_59){
if(wm._isUniqueName(_58,_59)){
return _58;
}
var m=(_58||"").match(/([^\d]*)([\d]*)/);
var i=m[2]||1,n0=m[1]||"noname";
do{
_58=n0+(i>0?i:"");
i++;
}while(!wm._isUniqueName(_58,_59));
return _58;
};
wm.getValidJsName=function(_5a){
var dc="_";
_5a=_5a.replace(new RegExp("[- ]","g"),dc);
var _5b=true;
for(var i=0;i<_5a.length&&_5b;i++){
try{
var _5c=eval("(function() {var "+_5a+" = 5; return "+_5a+";})()");
if(_5c==5){
_5b=false;
}
}
catch(e){
}
if(_5b){
_5a=_5a.substring(0,i)+_5a.substring(i,i+1).replace(/[^a-zA-Z0-9]+/g,"")+_5a.substring(i+1);
}
}
if(_5a=="_"){
_5a="";
}
return _5a;
};
wm._modules=[];
wm.loadModule=function(_5d){
if(!wm._modules[_5d]){
tag=["<scrip","t type=\"text/javascript\" src=\"",_5d,".js\"></scrip","t>"].join("");
document.write(tag);
wm._modules[_5d]=true;
}
};
wm.widgetIsShowing=function(_5e){
var w=_5e,p;
while(w){
p=w.parent;
if(!w.showing||(w.isActive&&!w.isActive())){
return false;
}
w=p;
}
return true;
};
wm.forEachWidget=function(_5f,_60,_61){
if(_60&&_60(_5f)===false){
return false;
}
if(!_5f){
return false;
}
for(var i=0,ws=_61&&_5f instanceof wm.PageContainer?[]:_5f.getOrderedWidgets(),r,w;w=ws[i];i++){
if(w.forEachWidget&&!_61){
r=_60(w);
if(r!==false){
r=w.forEachWidget(_60);
}
}else{
r=wm.forEachWidget(w,_60,_61);
}
if(r===false){
return false;
}
}
};
wm.forEachVisibleWidget=function(_62,_63,_64){
var _65;
if(_63&&_62&&!_62.isAncestorHidden()){
_65=_63(_62);
}
if(_65!==false&&(!_64||!wm.isInstanceType(_62,[wm.PageContainer,wm.Composite]))){
for(var i=0,ws=_62.getOrderedWidgets(),r,w;w=ws[i];i++){
if(w.forEachVisibleWidget&&!_64){
w.forEachVisibleWidget(_63);
}else{
wm.forEachVisibleWidget(w,_63,_64);
}
}
}
};
wm.theme={getPath:function(){
return dojo.moduleUrl("lib.wm.base","widget/themes/"+"default/");
},getImagesPath:function(){
return wm.theme.getPath()+"images/";
}};
wm.hideToolTip=function(_66){
var tt=dijit._masterTT;
if(tt){
dijit.hideTooltip(tt.aroundNode);
tt._onDeck=null;
if(_66&&tt.fadeOut){
tt.fadeOut.stop(true);
dojo.style(tt.fadeOut.node,"opacity",0);
}
}
};
wm.focusContainer=function(_67){
wm.onidle(function(){
wm.forEachWidget(_67,function(w){
if(w&&w.focus&&(!w.canFocus||w.canFocus())){
w.focus();
return false;
}
});
});
};
wm.isClassInstanceType=function(_68,_69){
try{
return _69&&_68.prototype instanceof _69;
}
catch(e){
}
return false;
};
wm.isInstanceType=function(obj,_6a){
if(_6a&&typeof _6a=="object"&&_6a.length){
for(var i=0;i<_6a.length;i++){
if(_6a[i]&&obj instanceof _6a[i]){
return true;
}
}
return false;
}else{
return _6a&&obj instanceof _6a;
}
};
wm.getWidgetByDomNode=function(_6b){
if(!_6b){
return;
}
if(dojo.isString(_6b)){
_6b=dojo.byId(_6b);
}
if(!_6b){
return;
}
var _6c=app._page.name;
var reg=new RegExp("^("+_6c+"|app)_?");
while((!_6b.id||!_6b.id.match(reg))&&_6b.parentNode){
_6b=_6b.parentNode;
}
var id=_6b.id;
if(!id){
return;
}
var _6d=id;
var id=id.replace(reg,"");
var _6e=id.split(/_+/);
var _6f="";
var _70=(_6d.match(/^app_/))?app:app._page;
for(var i=0;i<_6e.length;i++){
if(wm.isInstanceType(_70,wm.PageDialog)){
_70=_70.pageContainer;
}
if(wm.isInstanceType(_70,wm.PageContainer)||wm.isInstanceType(_70,wm.pageContainerMixin)){
_70=_70.page;
_6f="";
}else{
_6f+=((_6f)?"_":"")+_6e[i];
if(wm.isInstanceType(_70,wm.Application)){
if(_70[_6f]){
_70=_70[_6f];
_6f="";
}
}else{
if(_70.$[_6f]){
_70=_70.$[_6f];
_6f="";
}
}
}
}
return _70;
};
wm.isNode=function(_71){
if(window["Node"]){
return _71 instanceof Node;
}
if(typeof _71=="object"&&_71){
return "nodeType" in _71&&"appendChild" in _71;
}
};
if(!wm.Array){
wm.Array={};
}
wm.Array.removeElementAt=function(_72,_73){
_72.splice(_73,1);
return _72;
};
wm.Array.insertElementAt=function(_74,_75,_76){
_74.splice(_76,0,_75);
};
wm.Array.removeElement=function(_77,_78){
var _79=dojo.indexOf(_77,_78);
if(_79>=0){
_77.splice(_79,1);
}
return _77;
};
wm.Array.equals=function(a,b,_7a){
if(a==b){
return true;
}
if(!a||!b){
return false;
}
if(a.length!=b.length){
return false;
}
for(var i=0;i<a.length;i++){
if(_7a){
if(!_7a(a[i],b[i])){
return false;
}
}else{
if(a[i]!=b[i]){
return false;
}
}
}
return true;
};
wm.Array.indexOf=function(_7b,_7c,_7d){
for(var i=0;i<_7b.length;i++){
if(_7d(_7b[i],_7c)){
return i;
}
}
return -1;
};
wm.Array.last=function(_7e){
return _7e[_7e.length-1];
};
if(!wm.String){
wm.String={};
}
wm.String.endStringWith=function(_7f,_80){
if(!_7f.match(new RegExp(_80+"$"))){
return _7f+_80;
}else{
return _7f;
}
};
setCss=function(_81,_82){
var _83=dojo.byId(_81);
if(!_83){
return;
}
_82=_82||"";
if(_83.styleSheet){
if(dojo.isIE<7){
setIe6Css(_83,_82);
}else{
_83.styleSheet.cssText=_82;
}
}else{
_83.firstChild&&_83.removeChild(_83.firstChild);
_83.appendChild(document.createTextNode(_82));
}
};
setIe6Css=function(_84,_85){
var c=document.documentElement.firstChild,id=_84.id;
c.removeChild(_84);
var n=document.createElement("style");
n.id=id;
n.type="text/css";
if(n.styleSheet){
n.styleSheet.cssText=_85;
}else{
n.appendChild(document.createTextNode(_85));
}
c.appendChild(n);
};
wm.conditionalRequire=function(_86,_87){
if(arguments.length==1||_87){
dojo["require"](_86);
}
};
wm.getBackgroundStyle=function(_88,_89,_8a,_8b,_8c){
if(!_8c){
if(dojo.isWebKit){
_8c="webkit";
}else{
if(dojo.isMoz){
_8c="moz";
}else{
if(dojo.isOpera){
_8c="opera";
}else{
if(dojo.isIE<10){
_8c="ieold";
}else{
if(dojo.isIE>=10){
_8c="ie10";
}
}
}
}
}
}
var _8d="-linear-gradient("+(_8b=="vertical"?"top":"left")+", "+_88+" 0%,"+_89+" "+_8a+"%,"+_89+" 100%)";
switch(_8c){
case "webkit":
return "-webkit-gradient(linear, "+(_8b=="vertical"?"center top, center bottom":"left center, right center")+", from("+_88+"), color-stop("+_8a+"%,"+_89+"), to("+_89+"))";
case "moz":
return "-moz"+_8d;
case "ieold":
return "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+_88+"', endColorstr='"+_89+"',GradientType="+(_8b=="vertical"?0:1)+")";
case "ie10":
return "-ms"+_8d;
case "opera":
return "-o"+_8d;
}
};
wm.getStyleFromNode=function(_8e,_8f){
var _90="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_90=document.defaultView.getComputedStyle(_8e,"").getPropertyValue(_8f);
}else{
if(_8e.currentStyle){
_8f=_8f.replace(/\-(\w)/g,function(_91,_92){
return _92.toUpperCase();
});
_90=_8e.currentStyle[_8f];
}
}
return _90;
};
wm.getParentForm=function(_93){
var w=_93.parent;
var r=_93.getRoot();
r=r&&r.root;
while(w&&w!=r){
if(wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
return w;
}
w=w.parent;
}
};
wm.getFormLiveView=function(_94){
var lv=_94&&_94.findLiveVariable();
return lv&&lv.liveView;
};
wm.getFormField=function(_95){
var a=[],w=_95;
while(w&&!(wm.isInstanceType(w,wm.LiveForm))){
if(w.formField){
a.unshift(w.formField);
}
w=wm.getParentForm(w);
}
return a.join(".");
};
}
if(!dojo._hasResource["dojo.date"]){
dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.getObject("date",true,dojo);
dojo.date.getDaysInMonth=function(_96){
var _97=_96.getMonth();
var _98=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_97==1&&dojo.date.isLeapYear(_96)){
return 29;
}
return _98[_97];
};
dojo.date.isLeapYear=function(_99){
var _9a=_99.getFullYear();
return !(_9a%400)||(!(_9a%4)&&!!(_9a%100));
};
dojo.date.getTimezoneName=function(_9b){
var str=_9b.toString();
var tz="";
var _9c;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_9c=str.match(pat))){
tz=_9c[1];
}else{
str=_9b.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_9c=str.match(pat))){
tz=_9c[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_9d,_9e,_9f){
_9d=new Date(+_9d);
_9e=new Date(+(_9e||new Date()));
if(_9f=="date"){
_9d.setHours(0,0,0,0);
_9e.setHours(0,0,0,0);
}else{
if(_9f=="time"){
_9d.setFullYear(0,0,0);
_9e.setFullYear(0,0,0);
}
}
if(_9d>_9e){
return 1;
}
if(_9d<_9e){
return -1;
}
return 0;
};
dojo.date.add=function(_a0,_a1,_a2){
var sum=new Date(+_a0);
var _a3=false;
var _a4="Date";
switch(_a1){
case "day":
break;
case "weekday":
var _a5,_a6;
var mod=_a2%5;
if(!mod){
_a5=(_a2>0)?5:-5;
_a6=(_a2>0)?((_a2-5)/5):((_a2+5)/5);
}else{
_a5=mod;
_a6=parseInt(_a2/5);
}
var _a7=_a0.getDay();
var adj=0;
if(_a7==6&&_a2>0){
adj=1;
}else{
if(_a7==0&&_a2<0){
adj=-1;
}
}
var _a8=_a7+_a5;
if(_a8==0||_a8==6){
adj=(_a2>0)?2:-2;
}
_a2=(7*_a6)+_a5+adj;
break;
case "year":
_a4="FullYear";
_a3=true;
break;
case "week":
_a2*=7;
break;
case "quarter":
_a2*=3;
case "month":
_a3=true;
_a4="Month";
break;
default:
_a4="UTC"+_a1.charAt(0).toUpperCase()+_a1.substring(1)+"s";
}
if(_a4){
sum["set"+_a4](sum["get"+_a4]()+_a2);
}
if(_a3&&(sum.getDate()<_a0.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_a9,_aa,_ab){
_aa=_aa||new Date();
_ab=_ab||"day";
var _ac=_aa.getFullYear()-_a9.getFullYear();
var _ad=1;
switch(_ab){
case "quarter":
var m1=_a9.getMonth();
var m2=_aa.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_ac*4);
_ad=q2-q1;
break;
case "weekday":
var _ae=Math.round(dojo.date.difference(_a9,_aa,"day"));
var _af=parseInt(dojo.date.difference(_a9,_aa,"week"));
var mod=_ae%7;
if(mod==0){
_ae=_af*5;
}else{
var adj=0;
var _b0=_a9.getDay();
var _b1=_aa.getDay();
_af=parseInt(_ae/7);
mod=_ae%7;
var _b2=new Date(_a9);
_b2.setDate(_b2.getDate()+(_af*7));
var _b3=_b2.getDay();
if(_ae>0){
switch(true){
case _b0==6:
adj=-1;
break;
case _b0==0:
adj=0;
break;
case _b1==6:
adj=-1;
break;
case _b1==0:
adj=-2;
break;
case (_b3+mod)>5:
adj=-2;
}
}else{
if(_ae<0){
switch(true){
case _b0==6:
adj=0;
break;
case _b0==0:
adj=1;
break;
case _b1==6:
adj=2;
break;
case _b1==0:
adj=1;
break;
case (_b3+mod)<0:
adj=2;
}
}
}
_ae+=adj;
_ae-=(_af*2);
}
_ad=_ae;
break;
case "year":
_ad=_ac;
break;
case "month":
_ad=(_aa.getMonth()-_a9.getMonth())+(_ac*12);
break;
case "week":
_ad=parseInt(dojo.date.difference(_a9,_aa,"day")/7);
break;
case "day":
_ad/=24;
case "hour":
_ad/=60;
case "minute":
_ad/=60;
case "second":
_ad/=1000;
case "millisecond":
_ad*=_aa.getTime()-_a9.getTime();
}
return Math.round(_ad);
};
}
if(!dojo._hasResource["dojo.cldr.supplemental"]){
dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_b4){
var _b5={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _b6=dojo.cldr.supplemental._region(_b4);
var dow=_b5[_b6];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_b7){
_b7=dojo.i18n.normalizeLocale(_b7);
var _b8=_b7.split("-");
var _b9=_b8[1];
if(!_b9){
_b9={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[_b8[0]];
}else{
if(_b9.length==4){
_b9=_b8[2];
}
}
return _b9;
};
dojo.cldr.supplemental.getWeekend=function(_ba){
var _bb={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _bc={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _bd=dojo.cldr.supplemental._region(_ba);
var _be=_bb[_bd];
var end=_bc[_bd];
if(_be===undefined){
_be=6;
}
if(end===undefined){
end=0;
}
return {start:_be,end:end};
};
}
if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(_bf,_c0,ch,end){
if(!ch){
ch="0";
}
var out=String(_bf),pad=dojo.string.rep(ch,Math.ceil((_c0-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_c1,map,_c2,_c3){
_c3=_c3||dojo.global;
_c2=_c2?dojo.hitch(_c3,_c2):function(v){
return v;
};
return _c1.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_c4,key,_c5){
var _c6=dojo.getObject(key,false,map);
if(_c5){
_c6=dojo.getObject(_c5,false,_c3).call(_c3,_c6,key);
}
try{
return _c2(_c6,key).toString();
}
catch(e){
return "";
}
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!dojo._hasResource["dojo.date.locale"]){
dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.getObject("date.locale",true,dojo);
(function(){
function _c7(_c8,_c9,_ca,_cb){
return _cb.replace(/([a-z])\1*/ig,function(_cc){
var s,pad,c=_cc.charAt(0),l=_cc.length,_cd=["abbr","wide","narrow"];
switch(c){
case "G":
s=_c9[(l<4)?"eraAbbr":"eraNames"][_c8.getFullYear()<0?0:1];
break;
case "y":
case "Y":
s=_c8.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_ca.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_c8.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_c8.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _ce=["months","format",_cd[l-3]].join("-");
s=_c9[_ce][m];
}
break;
case "w":
var _cf=0;
s=dojo.date.locale._getWeekOfYear(_c8,_cf);
pad=true;
break;
case "d":
s=_c8.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_c8);
pad=true;
break;
case "E":
var d=_c8.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _d0=["days","format",_cd[l-3]].join("-");
s=_c9[_d0][d];
}
break;
case "a":
var _d1=(_c8.getHours()<12)?"am":"pm";
s=_ca[_d1]||_c9["dayPeriods-format-wide-"+_d1];
break;
case "h":
case "H":
case "K":
case "k":
var h=_c8.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_c8.getMinutes();
pad=true;
break;
case "s":
s=_c8.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_c8.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_c8,true,_ca);
if(s){
break;
}
l=4;
case "Z":
var _d2=dojo.date.locale._getZone(_c8,false,_ca);
var tz=[(_d2<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_d2)/60),2),dojo.string.pad(Math.abs(_d2)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_cb);
}
if(pad){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_d3,_d4,_d5){
if(_d4){
return dojo.date.getTimezoneName(_d3);
}else{
return _d3.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_d6,_d7){
_d7=_d7||{};
var _d8=dojo.i18n.normalizeLocale(_d7.locale),_d9=_d7.formatLength||"short",_da=dojo.date.locale._getGregorianBundle(_d8),str=[],_db=dojo.hitch(this,_c7,_d6,_da,_d7);
if(_d7.selector=="year"){
return _dc(_da["dateFormatItem-yyyy"]||"yyyy",_db);
}
var _dd;
if(_d7.selector!="date"){
_dd=_d7.timePattern||_da["timeFormat-"+_d9];
if(_dd){
str.push(_dc(_dd,_db));
}
}
if(_d7.selector!="time"){
_dd=_d7.datePattern||_da["dateFormat-"+_d9];
if(_dd){
str.push(_dc(_dd,_db));
}
}
return str.length==1?str[0]:_da["dateTimeFormat-"+_d9].replace(/\{(\d+)\}/g,function(_de,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_df){
return dojo.date.locale._parseInfo(_df).regexp;
};
dojo.date.locale._parseInfo=function(_e0){
_e0=_e0||{};
var _e1=dojo.i18n.normalizeLocale(_e0.locale),_e2=dojo.date.locale._getGregorianBundle(_e1),_e3=_e0.formatLength||"short",_e4=_e0.datePattern||_e2["dateFormat-"+_e3],_e5=_e0.timePattern||_e2["timeFormat-"+_e3],_e6;
if(_e0.selector=="date"){
_e6=_e4;
}else{
if(_e0.selector=="time"){
_e6=_e5;
}else{
_e6=_e2["dateTimeFormat-"+_e3].replace(/\{(\d+)\}/g,function(_e7,key){
return [_e5,_e4][key];
});
}
}
var _e8=[],re=_dc(_e6,dojo.hitch(this,_e9,_e8,_e2,_e0));
return {regexp:re,tokens:_e8,bundle:_e2};
};
dojo.date.locale.parse=function(_ea,_eb){
var _ec=/[\u200E\u200F\u202A\u202E]/g,_ed=dojo.date.locale._parseInfo(_eb),_ee=_ed.tokens,_ef=_ed.bundle,re=new RegExp("^"+_ed.regexp.replace(_ec,"")+"$",_ed.strict?"":"i"),_f0=re.exec(_ea&&_ea.replace(_ec,""));
if(!_f0){
return null;
}
var _f1=["abbr","wide","narrow"],_f2=[1970,0,1,0,0,0,0],_f3="",_f4=dojo.every(_f0,function(v,i){
if(!i){
return true;
}
var _f5=_ee[i-1];
var l=_f5.length;
switch(_f5.charAt(0)){
case "y":
if(l!=2&&_eb.strict){
_f2[0]=v;
}else{
if(v<100){
v=Number(v);
var _f6=""+new Date().getFullYear(),_f7=_f6.substring(0,2)*100,_f8=Math.min(Number(_f6.substring(2,4))+20,99),num=(v<_f8)?_f7+v:_f7-100+v;
_f2[0]=num;
}else{
if(_eb.strict){
return false;
}
_f2[0]=v;
}
}
break;
case "M":
if(l>2){
var _f9=_ef["months-format-"+_f1[l-3]].concat();
if(!_eb.strict){
v=v.replace(".","").toLowerCase();
_f9=dojo.map(_f9,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_f9,v);
if(v==-1){
return false;
}
}else{
v--;
}
_f2[1]=v;
break;
case "E":
case "e":
var _fa=_ef["days-format-"+_f1[l-3]].concat();
if(!_eb.strict){
v=v.toLowerCase();
_fa=dojo.map(_fa,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(_fa,v);
if(v==-1){
return false;
}
break;
case "D":
_f2[1]=0;
case "d":
_f2[2]=v;
break;
case "a":
var am=_eb.am||_ef["dayPeriods-format-wide-am"],pm=_eb.pm||_ef["dayPeriods-format-wide-pm"];
if(!_eb.strict){
var _fb=/\./g;
v=v.replace(_fb,"").toLowerCase();
am=am.replace(_fb,"").toLowerCase();
pm=pm.replace(_fb,"").toLowerCase();
}
if(_eb.strict&&v!=am&&v!=pm){
return false;
}
_f3=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_f2[3]=v;
break;
case "m":
_f2[4]=v;
break;
case "s":
_f2[5]=v;
break;
case "S":
_f2[6]=v;
}
return true;
});
var _fc=+_f2[3];
if(_f3==="p"&&_fc<12){
_f2[3]=_fc+12;
}else{
if(_f3==="a"&&_fc==12){
_f2[3]=0;
}
}
var _fd=new Date(_f2[0],_f2[1],_f2[2],_f2[3],_f2[4],_f2[5],_f2[6]);
if(_eb.strict){
_fd.setFullYear(_f2[0]);
}
var _fe=_ee.join(""),_ff=_fe.indexOf("d")!=-1,_100=_fe.indexOf("M")!=-1;
if(!_f4||(_100&&_fd.getMonth()>_f2[1])||(_ff&&_fd.getDate()>_f2[2])){
return null;
}
if((_100&&_fd.getMonth()<_f2[1])||(_ff&&_fd.getDate()<_f2[2])){
_fd=dojo.date.add(_fd,"hour",1);
}
return _fd;
};
function _dc(_101,_102,_103,_104){
var _105=function(x){
return x;
};
_102=_102||_105;
_103=_103||_105;
_104=_104||_105;
var _106=_101.match(/(''|[^'])+/g),_107=_101.charAt(0)=="'";
dojo.forEach(_106,function(_108,i){
if(!_108){
_106[i]="";
}else{
_106[i]=(_107?_103:_102)(_108.replace(/''/g,"'"));
_107=!_107;
}
});
return _104(_106.join(""));
};
function _e9(_109,_10a,_10b,_10c){
_10c=dojo.regexp.escapeString(_10c);
if(!_10b.strict){
_10c=_10c.replace(" a"," ?a");
}
return _10c.replace(/([a-z])\1*/ig,function(_10d){
var s,c=_10d.charAt(0),l=_10d.length,p2="",p3="";
if(_10b.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p3+"[1-9][0-9]|"+p2+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_10b.am||_10a["dayPeriods-format-wide-am"],pm=_10b.pm||_10a["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_10b.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_109){
_109.push(_10d);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _10e=[];
dojo.date.locale.addCustomFormats=function(_10f,_110){
_10e.push({pkg:_10f,name:_110});
};
dojo.date.locale._getGregorianBundle=function(_111){
var _112={};
dojo.forEach(_10e,function(desc){
var _113=dojo.i18n.getLocalization(desc.pkg,desc.name,_111);
_112=dojo.mixin(_112,_113);
},this);
return _112;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_114,_115){
var _116,_117=dojo.date.locale._getGregorianBundle(_115),_118=[item,_114,type];
if(_114=="standAlone"){
var key=_118.join("-");
_116=_117[key];
if(_116[0]==1){
_116=undefined;
}
}
_118[1]="format";
return (_116||_117[_118.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_119,_11a){
var _11b=dojo.cldr.supplemental.getWeekend(_11a),day=(_119||new Date()).getDay();
if(_11b.end<_11b.start){
_11b.end+=7;
if(day<_11b.start){
day+=7;
}
}
return day>=_11b.start&&day<=_11b.end;
};
dojo.date.locale._getDayOfYear=function(_11c){
return dojo.date.difference(new Date(_11c.getFullYear(),0,1,_11c.getHours()),_11c)+1;
};
dojo.date.locale._getWeekOfYear=function(_11d,_11e){
if(arguments.length==1){
_11e=0;
}
var _11f=new Date(_11d.getFullYear(),0,1).getDay(),adj=(_11f-_11e+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_11d)+adj-1)/7);
if(_11f==_11e){
week++;
}
return week;
};
}
if(!dojo._hasResource["wm.base.lib.date"]){
dojo._hasResource["wm.base.lib.date"]=true;
dojo.provide("wm.base.lib.date");
wm.setTimeZoneOffset=function(){
wm.timezoneOffset=new Date().getTimezoneOffset()/60+wm.serverTimeOffset/(1000*60*60);
if(isNaN(wm.timezoneOffset)){
wm.timezoneOffset=0;
}
};
if(wm.serverTimeOffset!==undefined){
wm.setTimeZoneOffset();
}
wm.convertValueToDate=function(_120,_121){
if(_120 instanceof Date){
return _120;
}
var v=_120,s=_121||{selector:"date"};
if(!v&&v!==0){
return null;
}else{
if(Number(v)||typeof (v)=="number"){
return new Date(Number(v));
}else{
if(dojo.trim(v.toLowerCase()).indexOf("today")!=-1){
if(v.indexOf("+")!=-1){
var _122=v.toLowerCase().split("+");
try{
var _123=dojo.trim(_122[0]);
var _124=dojo.trim(_122[1]);
if(_123=="today"){
v=dojo.date.add(new Date(),"day",_124*1);
}else{
v=dojo.date.add(new Date(),"day",_123*1);
}
}
catch(e){
}
}else{
v=new Date();
}
return v;
}
}
}
return v!=Number(v)?dojo.date.locale.parse(v,s):new Date(Number(v));
};
}
if(!dojo._hasResource["wm.base.lib.types"]){
dojo._hasResource["wm.base.lib.types"]=true;
dojo.provide("wm.base.lib.types");
wm.typeManager={types:{},initialized:false,initTypes:function(){
if(wm.types&&wm.types.types){
wm.typeManager.setTypes(wm.types.types);
}else{
this.addDefaultTypes();
}
},setTypes:function(_125){
this.clearTypes();
if(_125){
wm.forEachProperty(_125,function(_126,_127){
var _128=_127.match(/\<(.*),(.*)\>/);
if(_128){
_126.isList=true;
_126.isHashMap=true;
_126.fields={name:{include:["read"],isList:false,type:_128[1]},dataValue:{isList:false,type:_128[2]}};
}
});
dojo.mixin(this.types,_125);
}
this.addDefaultTypes();
},clearTypes:function(){
this._publicTypes={};
if(wm.dataSources){
wm.dataSources.clearSources();
}
for(var i in this.types){
if(!this.types[i].userType){
delete this.types[i];
}
}
},getPrimaryKey:function(_129){
if(!_129||!_129.fields){
return "";
}
for(var _12a in _129.fields){
if(_129.fields[_12a].include.length){
return _12a;
}
}
},getPrimitiveType:function(_12b){
return (this.types[_12b]||0).primitiveType;
},isStructuredType:function(_12c){
return this.types[_12c]&&!this.getPrimitiveType(_12c);
},getService:function(_12d){
var t=this.types[_12d];
return (t&&t.service);
},getLiveService:function(_12e){
var t=this.types[_12e];
return (t&&t.liveService&&t.service);
},generatePublicTypes:function(){
var _12f={};
for(var i in this.types){
if(this.isPublicType(i)){
_12f[i]=this.types[i];
}
}
return _12f;
},getPublicTypes:function(){
return wm.isEmpty(this._publicTypes)?this._publicTypes=this.generatePublicTypes():this._publicTypes;
},getLiveServiceTypes:function(){
var _130=this.getPublicTypes(),_131={};
for(var i in _130){
if(this.getLiveService(i)){
_131[i]=_130[i];
}
}
return _131;
},isPublicType:function(_132){
var t=this.types[_132];
return (t&&!t.internal&&!t.primitiveType);
},getTypeSchema:function(_133){
return (this.types[_133]||0).fields;
},getType:function(_134){
return this.types[_134];
},isType:function(_135){
return Boolean(this.getType(_135));
},getPropertyInfoFromSchema:function(_136,_137){
var s=_136,_138=dojo.isString(_137)?_137.split("."):_137,p=_138.shift(),f=s[p];
if(!_138.length){
return f;
}else{
var t=(f||0).type,ts=this.getTypeSchema(t);
if(ts){
return this.getPropertyInfoFromSchema(ts,_138);
}
}
},getFilteredPropNames:function(_139,_13a){
var ts=[],u=[],t,_13b=dojo.isFunction(_13a);
wm.forEach(_139,function(o,i){
if(!_13b||_13a(o)){
var elem={};
elem.info=o;
elem.name=i;
ts.push(elem);
}
});
ts.sort(function(a,b){
return (a.info.fieldOrder-b.info.fieldOrder);
});
for(i=0;(ti=ts[i]);i++){
u.push(ti.name);
}
return u;
},getSimplePropNames:function(_13c){
return this.getFilteredPropNames(_13c,function(p){
return !wm.typeManager.isStructuredType((p||0).type);
});
},getFieldList:function(_13d,_13e,_13f){
if(typeof _13d=="string"){
_13d=this.getType(_13d).fields;
}
var _140=[];
for(var i in _13d){
if(wm.typeManager.isStructuredType(_13d[i].type)){
if(!_13d[i].isList&&!wm.isListType(_13d[i].type)&&(_13f===undefined||_13f>=0)){
_140=_140.concat(this.getFieldList(_13d[i].type,_13e?_13e+"."+i:i,_13f===undefined?undefined:_13f-1));
}
}else{
_140.push({dataIndex:(_13e?_13e+".":"")+i,caption:wm.capitalize(i),displayType:wm.capitalize(_13d[i].type)});
}
}
return _140;
},getStructuredPropNames:function(_141,_142){
return this.getFilteredPropNames(_141,function(p){
return wm.typeManager.isStructuredType((p||0).type)||_142&&p.isList;
});
},getPropNames:function(_143,_144){
var u=this.getSimplePropNames(_143),s=_144?this.getStructuredPropNames(_143):[];
return u.concat(s);
},getPropertyOrder:function(_145,_146){
var o=[],_147=dojo.isString(_146)?_146.split("."):_146,p=_147.shift(),_148=this.getTypeSchema(_145),_149=this.getPropNames(_148,true);
var c,l=_149.length;
for(var i=0,n;(n=_149[i]);i++){
if(p==n){
c=i;
break;
}
}
o.push(c!==undefined?c:l);
var f=_148&&_148[p],t=(f||0).type;
if(!_147.length||!t){
return o;
}else{
return o.concat(this.getPropertyOrder(t,_147));
}
},hasStructuredType:function(_14a,_14b){
var s=this.getTypeSchema(_14a),p,c=dojo.isFunction(_14b)&&_14b;
for(var i in s){
p=s[i];
if(this.isStructuredType(p.type)){
if(c){
if(c(p)){
return true;
}
}else{
return true;
}
}
}
},addType:function(_14c,_14d){
if(!_14d||wm.isEmpty(_14d)){
return;
}
_14d.userType=true;
this.types[_14c]=_14d;
if(this.isPublicType(_14c)&&!wm.isEmpty(this._publicTypes)){
this._publicTypes[_14c]=_14d;
}
},removeType:function(_14e){
delete this._publicTypes[_14e];
delete this.types[_14e];
},addDefaultTypes:function(){
if(!this.initialized){
this.initialized=true;
var d=wm.defaultTypes||{};
for(var i in d){
this.addType(i,d[i]);
}
}
},isPropInList:function(_14f,_150){
var s=_14f,_151=dojo.isString(_150)?_150.split("."):_150,p=_151.shift(),f=s[p];
if(!f){
return false;
}else{
if(f.isList){
return true;
}else{
if(_151.length){
var t=(f||0).type,ts=this.getTypeSchema(t);
if(ts){
return this.isPropInList(ts,_151);
}
}
}
}
},getDisplayField:function(_152){
var _153=wm.typeManager.getType(_152);
if(!_153){
return "";
}
var _154=_153.fields;
var _155={};
var _156={};
for(_157 in _154){
var _158=_154[_157];
if(!_158.exclude||_158.exclude.length==0){
if(_158.type=="java.lang.String"||_158.type=="StringData"){
_155[_157]=_158;
}else{
if(!wm.typeManager.isStructuredType(_158.type)){
_156[_157]=_158;
}
}
}
}
for(var _157 in _155){
var _159=100000;
var _15a;
if(!dojo.isFunction(_155[_157])){
if(_155[_157].fieldOrder===undefined&&!_15a){
_15a=_157;
}else{
if(_155[_157].fieldOrder!==undefined&&_155[_157].fieldOrder<_159){
_159=_155[_157].fieldOrder;
_15a=_157;
}
}
}
}
if(_15a){
return _15a;
}
for(var _157 in _156){
var _159=100000;
var _15a;
if(!dojo.isFunction(_156[_157])){
if(_156[_157].fieldOrder===undefined&&!_15a){
_15a=_157;
}else{
if(_156[_157].fieldOrder!==undefined&&_156[_157].fieldOrder<_159){
_159=_156[_157].fieldOrder;
_15a=_157;
}
}
}
}
if(_15a){
return _15a;
}
for(_157 in _154){
return _157;
}
}};
wm.defaultTypes={NumberData:{fields:{dataValue:{type:"Number"}}},BooleanData:{fields:{dataValue:{type:"Boolean"}}},StringData:{fields:{dataValue:{type:"String"}}},DateData:{fields:{dataValue:{type:"Date"}}},EntryData:{fields:{name:{type:"string"},dataValue:{type:"any","include":["delete","read","update","insert"]}}},AnyData:{fields:{dataValue:{type:"any"}}}};
wm.isListType=function(_15b){
return _15b&&(_15b.charAt(0)=="["||_15b.match(/\<.*,.*\>/));
};
wm.isHashMapType=function(_15c){
var _15d=wm.typeManager.getType(_15c);
return _15d&&_15d.isHashMap;
};
wm.getFriendlyTypeName=function(_15e,_15f){
_15e=_15e||"(any)";
var s=wm.typeManager.getService(_15e),_160=wm.isListType(_15e),t=s&&!_15e.match(/\</)?[s,_15e.split(".").pop()].join("."):_15e;
if(!wm.isHashMapType(_15e)){
if(_160){
t=t.slice(0,-1);
}
if(_15f||_160){
t=t+" list";
}
}
return t;
};
wm.getPrimitiveDisplayType=function(_161){
var t=wm.typeManager.getPrimitiveType(_161);
if(t=="Boolean"){
t="CheckBox";
}
if(!t||t=="String"){
t="Text";
}
return t;
};
wm.getDisplayType=function(_162){
var t;
var _163=_162.fieldSubType;
if(_163!=undefined&&_163!=null&&_163.length>0){
if(_163=="picklist"){
t="Select";
}else{
if(_163=="textarea"){
t="LargeTextArea";
}else{
if(_163=="boolean"){
t="CheckBox";
}else{
if(_163=="date"){
t="Date";
}else{
if(_163=="datetime"){
t="Time";
}else{
if(_163=="currency"){
t="Currency";
}else{
t="Text";
}
}
}
}
}
}
}else{
t=wm.getPrimitiveDisplayType(_162.type);
}
return t;
};
}
if(!dojo._hasResource["wm.base.lib.data"]){
dojo._hasResource["wm.base.lib.data"]=true;
dojo.provide("wm.base.lib.data");
wm.data=wm.data||{};
dojo.mixin(wm.data,{getIncludeFields:function(_164){
var pi,_165=[],_166=wm.typeManager.getTypeSchema(_164);
for(var i in _166){
pi=_166[i];
if(pi.include&&pi.include.length){
if(wm.typeManager.isStructuredType(pi.type)){
var _167=wm.typeManager.getTypeSchema(pi.type);
for(var j in _167){
_165.push(i+"."+j);
}
}else{
_165.push(i);
}
}
}
return _165;
},hasIncludeData:function(_168,_169){
if(!_169||wm.isEmpty(_169)){
return false;
}
var _16a=this.getIncludeFields(_168);
for(var i=0,f;f=_16a[i];i++){
if(dojo.getObject(f,false,_169)===undefined){
return;
}
}
return true;
},hasOperationData:function(_16b,_16c,_16d){
if(!wm.typeManager.getLiveService(_16c)){
return false;
}
switch(_16b){
case "read":
return !_16d||wm.data.hasIncludeData(_16c,_16d);
case "delete":
case "update":
return wm.data.hasIncludeData(_16c,_16d);
case "insert":
return wm.data.hasRequiredData(_16b,_16c,_16d,true);
}
},hasRequiredData:function(_16e,_16f,_170,_171){
var _172=wm.typeManager.getTypeSchema(_16f),s,d,_173,_174,_175,_176;
for(var i in _172){
s=_172[i];
_173=wm.typeManager.isStructuredType(s.type);
d=_170&&_170[i];
if(_173&&_171){
if((d||s.required)&&!s.isList&&!this.hasRequiredData(s.type,d,_171)){
return false;
}
}else{
_174=(d!==undefined);
_175=s.required&&!_174;
if(dojo.indexOf(s.exclude,_16e)!=-1?_174:_175){
return false;
}
}
}
return true;
},clearBinding:function(_177,_178){
var w=wm.data.getPropWire(_177,_178);
if(w){
var b=w.owner,_179=w.target,tp=w.targetProperty;
if(b){
b.removeWire(w.getWireId());
}
if(_179&&tp){
_179.setValue(tp,"");
}
}
},getPropWire:function(_17a,_17b){
var tp=_17b,tobj=_17a,_17c=tobj&&tobj.$.binding,w=_17c&&_17c.wires[tp];
if(w){
return w;
}
var _17d=tobj&&tobj.isDesignLoaded()?studio.application:app;
if(tobj&&tobj.isOwnedBy(_17d)){
return wm.data.findSourceWire((tobj||0).getId(),tp);
}
},findSourceWire:function(_17e,_17f){
if(_17e){
var c,o,id,_180,w;
for(var i in wm.Component.byId){
c=wm.Component.byId[i];
if((c instanceof wm.Binding)&&(c.isDesignLoaded()||!(window.studio&&window.studio._isWaveMakerStudio))){
var _180=c.findWiresByProps({targetId:_17e,targetProperty:_17f});
if(_180.length){
return _180[0];
}
}
}
}
},getPropBindSource:function(_181,_182){
var w=wm.data.getPropWire(_181,_182);
if(w){
return _181.getValueById(w.source);
}
},compare:function(a,b){
return a===b?0:a===undefined?-1:b===undefined?1:b===null?1:a>b?1:-1;
},compareNumbers:function(a,b){
var na=wm.isNumber(a),nb=wm.isNumber(b);
return na&&nb?a-b:(na?-1:(nb?1:0));
}});
}
if(!dojo._hasResource["wm.base.data.expression"]){
dojo._hasResource["wm.base.data.expression"]=true;
dojo.provide("wm.base.data.expression");
wm.expression={getValue:function(_183,_184,_185){
var v=wm.expression._getText(_183,_184);
var _186="";
try{
var f=function(){
_186=eval(v);
}.call(_185);
}
catch(e){
}
return _186;
},getSources:function(_187){
var re=wm.expression._getSourceRegEx;
re.lastIndex=0;
var m,_188=[];
while((m=re.exec(_187))!=null){
_188.push(m[1]);
var _189=m[1].split(".");
_189.pop();
while(_189.length>1){
_188.push(_189.join("."));
_189.pop();
}
}
return _188;
},_getText:function(_18a,_18b){
return _18a.replace(wm.expression._getSourceRegEx,function(){
try{
var _18c=arguments[1];
if(_18c.match(/^\[.*\]/)){
var _18d=_18c.match(/^\[(.*?)\]/);
_18c=_18c.replace(/^\[(.*?)\]\./,"");
var root=wm.Page.getPage(_18d[1]);
var v=root?root.getValue(_18c):"";
}else{
if(_18b.getValue){
var v=_18b.getValue(_18c);
}else{
if(_18c.indexOf(".")!=-1){
var arr=_18c.split(".");
var v=_18b;
dojo.forEach(arr,function(prop){
if(v!=null){
v=v[prop];
}
});
}else{
var v=_18b[_18c];
}
}
}
if(v instanceof wm.Object||v===undefined){
v="";
}
if(v instanceof Date){
return "new Date("+v.getTime()+")";
}else{
return dojo.toJson(v);
}
}
catch(e){
}
});
},_getSourceRegEx:new RegExp(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g)};
}
if(!dojo._hasResource["wm.base.Object"]){
dojo._hasResource["wm.base.Object"]=true;
dojo.provide("wm.base.Object");
dojo.declare("wm.Object",null,{constructor:function(){
this.type=this.declaredClass;
},toString:function(){
return "["+this.declaredClass+"]";
},getProp:function(_18e){
var g=this._getPropWorker(this,_18e,"get");
if(g){
return g.call(this,_18e);
}else{
return this._getProp(_18e);
}
},_getProp:function(_18f){
return this[_18f];
},setProp:function(_190,_191){
if(this.isDestroyed){
return;
}
var s=this._getPropWorker(this,_190,"set");
if(s){
s.call(this,_191);
}else{
this._setProp(_190,_191);
}
this.valueChanged(_190,this.getProp(_190));
},_setProp:function(_192,_193){
if(_192 in this){
this[_192]=_193;
}
},_getPropWorker:function(_194,_195,_196){
if(_195=="value"){
return null;
}
var w=_194._isDesignLoaded&&_194[_196+"_"+_195]||this[_196+_195.slice(0,1).toUpperCase()+_195.slice(1)];
if(dojo.isFunction(w)){
return w;
}
},valueChanged:function(_197,_198){
},_getValue:function(_199){
return this.getProp(_199);
},_setValue:function(_19a,_19b){
this.setProp(_19a,_19b);
},getValue:function(_19c){
if(!_19c){
return;
}
var _19d=dojo.isString(_19c)?_19c.replace(/([^\.])\[/g,"$1.[").split("."):_19c;
var o=(_19d[0]=="studio"&&this instanceof wm.Application)?window:this;
var p;
while(_19d.length>1){
p=_19d.shift();
var _19e;
if(this instanceof wm.Variable||this instanceof Array){
_19e=p.match(/^\[(\d+)\]$/);
}
if(_19e&&this instanceof wm.Variable){
o=o.getItem(_19e[1]);
}else{
if(_19e&&this instanceof Array){
o=o[pmatch1];
}else{
o=o.getValue?o.getValue(p):o[p];
}
}
if(!o){
wm.logging&&undefined;
return;
}
if(o.getValue){
return o.getValue(_19d);
}
}
p=_19d.shift();
return o._getValue?o._getValue(p):o[p];
},setValue:function(_19f,_1a0){
var _1a1=dojo.isString(_19f)?_19f.split("."):_19f,o=this,p;
while(_1a1.length>1){
o=o.getValue(_1a1.shift());
if(!o){
return;
}
if(o instanceof wm.Object){
return o.setValue(_1a1,_1a0);
}
}
p=_1a1.shift();
o._setValue?o._setValue(p,_1a0):o[p]=_1a0;
}});
dojo.mixin(wm.Object,{makeSchema:function(_1a2){
_1a2.schemaClass=function(){
};
var _1a3=_1a2.superclass;
try{
if(_1a2._meta.parents&&_1a2._meta.parents.length>1){
_1a3=_1a2._meta.parents[0].prototype;
}
}
catch(e){
}
if(_1a3){
var ctor=this.getSchemaClass(_1a3.constructor);
_1a2.schemaClass.prototype=new ctor();
}
_1a2.prototype.schema=new _1a2.schemaClass();
return _1a2.schemaClass;
},getSchemaClass:function(_1a4){
return _1a4.schemaClass||wm.Object.makeSchema(_1a4);
},extendSchema:function(_1a5,_1a6,_1a7){
if(!_1a7&&_1a6){
var _1a8=_1a5.prototype.declaredClass;
if(wm.extendSchemaDictionary){
var _1a9=wm.extendSchemaDictionary[_1a8];
if(_1a9){
for(var i in _1a9){
if(_1a6[i]){
_1a6[i].shortname=_1a9[i];
}else{
_1a6[i]={shortname:_1a9[i]};
}
}
}
}
}
var _1aa=wm.Object.getSchemaClass(_1a5).prototype;
if(_1aa){
for(var _1ab in _1a6){
if(_1aa[_1ab]){
_1a6[_1ab]=dojo.mixin(dojo.clone(_1aa[_1ab]),_1a6[_1ab],!_1a6[_1ab].ignore?{ignore:0}:{});
}
}
}
dojo.extend(wm.Object.getSchemaClass(_1a5),_1a6);
delete _1a5._publishedProps;
}});
wm.Object.extendSchema(wm.Object,{declaredClass:{ignore:1},schema:{ignore:1},schemaClass:{ignore:1},type:{ignore:1},setValue:{ignore:1,group:"method"},getValue:{ignore:1,group:"method",returns:"Any"}});
wm.Object.extend({getPropFlags:function(_1ac,_1ad){
},getPropertyType:function(_1ae){
var v=this.getProp(_1ae);
var t={type:v&&v.type||typeof v,isObject:v instanceof wm.Object};
if(t.type=="number"&&isNaN(v)){
t.type="string";
}
this.getPropFlags(_1ae,t);
var s=this.schema[_1ae]||{noprop:Boolean((v===undefined)||(v===null)||_1ae.charAt(0)=="_"||(dojo.isFunction(v)||dojo.isObject(v))&&!t.isCustomMethod)};
return dojo.mixin(t,s);
},_listSchemaProperties:function(_1af,_1b0,_1b1){
var _1b2=this[_1b1||"getPropertyType"],op=Object.prototype;
for(var p in _1b0){
if(p=="inherited"){
continue;
}
if(!(p in _1af)&&!(p in op)){
var t=_1b2.call(this,p);
if(!t.noprop){
_1af[p]=t;
}
}
}
return _1af;
},_listProperties:function(){
var _1b3={};
this._listSchemaProperties(_1b3,this);
return this._listSchemaProperties(_1b3,this.schema);
},listProperties:function(){
return this.constructor._publishedProps||(this.constructor._publishedProps=this._listProperties());
},listDataProperties:function(){
return this.listProperties();
}});
wm.define=function(_1b4,_1b5,_1b6){
if(arguments.length<3){
_1b6=_1b5;
_1b5=wm.Control;
}
var _1b7=_1b6.published;
delete _1b6.published;
var ctor=dojo.declare(_1b4,_1b5,_1b6);
wm.Object.extendSchema(ctor,_1b7);
return ctor;
};
}
if(!dojo._hasResource["wm.base.Component"]){
dojo._hasResource["wm.base.Component"]=true;
dojo.provide("wm.base.Component");
dojo.declare("wm.Component",wm.Object,{theme:"wm_tundra",name:"",owner:null,getParentDialog:function(){
var w=this;
while(w){
if(w instanceof wm.Dialog){
return w;
}else{
w=w.parent;
}
}
return null;
},getParentPage:function(){
if(this instanceof wm.Page||this instanceof wm.PageDialog){
return this;
}
if(this.owner){
return this.owner.getParentPage();
}
return null;
},isAncestor:function(_1b8){
var o=this.owner;
while(o&&o!=_1b8){
o=o.owner;
}
return (o==_1b8);
},isAncestorInstanceOf:function(_1b9){
if(this==app._page||this==app||window["studio"]&&(this==studio.application||this==studio.page)){
return false;
}
if(wm.isInstanceType(this,_1b9)){
return this;
}
if(this.parent){
return this.parent.isAncestorInstanceOf(_1b9);
}else{
if(this.owner){
return this.owner.isAncestorInstanceOf(_1b9);
}else{
return false;
}
}
},getOwnerApp:function(){
if(wm.isInstanceType(this,wm.Application)){
return this;
}
if(!this.isDesignLoaded()){
return window.app;
}else{
if(this==studio.page){
return studio.application;
}else{
return this.owner.getOwnerApp();
}
}
},constructor:function(_1ba){
this.$=this.components={};
this._connections=[];
this._subscriptions=[];
if(djConfig.isDebug){
this._debugSubscriptions=[];
}
this._designee=this;
this.isDestroyed=false;
},postscript:function(_1bb){
this.create(_1bb);
wm.Component.add(this);
},create:function(_1bc){
try{
this._initializing=true;
if(wm.debugPerformance){
this.startTimerWithName("create",this.declaredClass);
}
this.prepare(_1bc);
this.build();
this.init();
if(this._designer){
wm.fire(this,"designCreate");
}
if(!this._loading){
this.postInit();
delete this._initializing;
}
if(!this._temporaryComponent){
dojo.addOnWindowUnload(this,"destroy");
}
if(wm.debugPerformance){
this.stopTimerWithName("create",this.declaredClass);
}
}
catch(e){
console.error("Error thrown; failed to create "+this.toString()+": "+e);
}
},destroy:function(){
if(this.isDestroyed){
return;
}
try{
this._disconnect();
this._unsubscribe();
wm.fire(this,"designDestroy");
var _1bd=[];
for(var n in this.components){
_1bd.push(this.components[n]);
}
for(var i=0,c;(c=_1bd[i]);i++){
c.destroy();
for(var n in c){
delete c[n];
}
c.isDestroyed=true;
}
_1bd=null;
delete this.components;
delete this.$;
wm.Component.remove(this);
this.setOwner(null);
this.isDestroyed=true;
}
catch(e){
}
},prepare:function(_1be){
this.readProps(_1be);
dojo.mixin(this,{flags:{}},_1be);
this.setOwner(this.owner);
},readProps:function(_1bf){
},build:function(){
},init:function(){
if(this.isDesignLoaded()){
this._isDesignLoaded=true;
}
if(this.manageURL){
var _1c0=app?app:this.getRoot();
if(wm.Application&&_1c0 instanceof wm.Application){
this.connect(_1c0,"_generateStateUrl",this,"generateStateUrl");
}
}
},postInit:function(){
this.valueChanged("",this);
},loaded:function(){
this._loading=false;
this.postInit();
delete this._initializing;
},toString:function(_1c1){
var t=_1c1||"";
return "["+this.declaredClass+((this.name)?":"+this.name:"")+(this.isDestroyed?":"+wm.getDictionaryItem("wm.Component.toString_DESTROYED"):"")+t+"]";
},getComponent:function(_1c2){
return this.components[_1c2]||this.owner&&this.owner.getComponent(_1c2);
},isDesignedComponent:function(){
return this.isDesignLoaded();
},isDesignLoaded:function(){
if(this._isDesignLoaded){
return true;
}
if(!window.studio||!this.owner){
return false;
}
if(this.owner==studio.application||this.owner==studio._application){
return true;
}
if(!studio.page&&!studio.application&&!studio._application){
return false;
}
if(!this.owner){
return false;
}
var pp=this.getParentPage();
if(pp&&pp==studio.page||this.owner==studio.page){
return true;
}
if(this==studio.page){
return true;
}
if(this.isOwnedBy(studio.application)){
return true;
}
if(window["app"]&&!this.isOwnedBy(window["app"])&&window["app"]!=this){
return true;
}
return false;
},getPath:function(){
var p="";
if(this.isDesignLoaded()&&studio.project){
p="projects/"+studio.project.getProjectPath()+"/";
}
return p;
},addComponent:function(_1c3){
var n=_1c3.name;
this.components[n]=_1c3;
},removeComponent:function(_1c4){
if(!this.components){
return;
}
var n=_1c4.name;
if(this.components[n]==_1c4){
delete this.components[n];
}
},setOwner:function(_1c5,_1c6){
var _1c7=this.isDesignLoaded();
if(_1c7){
wm.job("studio.updateDirtyBit",10,function(){
studio.updateProjectDirty();
});
}
var _1c8=this.owner;
if(this.owner){
this.owner.removeComponent(this);
}
this.owner=_1c5;
if(this.owner){
if(!_1c6){
this.owner.addComponent(this);
if(!this._designer){
this._designer=this.owner._designer;
}
}
if((!_1c8&&this.owner instanceof wm.Page==false)||(this.owner!=_1c8&&_1c8&&(this.owner instanceof wm.Page==false&&_1c8 instanceof wm.Page||this.owner instanceof wm.Page&&_1c8 instanceof wm.Page==false))){
this.updateId();
if(this.isDesignLoaded()){
this.resetChildIds();
}
}
}
delete this.rootId;
},isOwnedBy:function(_1c9){
var o=this.owner;
while(o){
if(o==_1c9){
return true;
}
o=o.owner;
}
},qualifyName:function(_1ca){
_1ca=this.name+"_"+_1ca;
if(window.studio&&(window.studio.page==this.owner||window.studio.application==this.owner)){
return _1ca;
}
return this.owner?this.owner.qualifyName(_1ca):_1ca;
},getUniqueName:function(_1cb){
return wm.findUniqueName(_1cb,[this,this.components]);
},setName:function(_1cc){
if(!_1cc){
return;
}
wm.Component.remove(this);
this.owner.removeComponent(this);
this.name=_1cc;
this.owner.addComponent(this);
this.updateId();
wm.Component.add(this);
},updateId:function(){
var id=this.makeId();
if(id!=this.id){
this.id=id;
delete this.runtimeId;
}
},makeId:function(_1cd){
_1cd=this.name+(_1cd?(this.name?".":"")+_1cd:"");
return this.owner?this.owner.getId(_1cd):_1cd;
},getId:function(_1ce){
if(_1ce){
return this.makeId(_1ce);
}
var id=this.id;
if(!this.id||this.isDesignLoaded()){
var id=this.makeId();
this.id=id;
}
return id;
},resetChildIds:function(){
for(var i in this.components){
delete this.components[i].id;
delete this.components[i].runtimeId;
delete this.components[i].rootId;
this.components[i].resetChildIds();
}
},getRoot:function(){
if(this.owner){
return this.owner.getRoot();
}else{
return null;
}
},getRootId:function(){
if(!this.rootId||this.isDesignLoaded()){
var r=this.getRoot();
r=r?r.getRuntimeId():"";
this.rootId=r?r+(r.charAt(r.length-1)=="."?"":"."):"";
}
return this.rootId;
},getRuntimeId:function(_1cf){
if(!this.runtimeId||this.isDesignLoaded()){
this.runtimeId=this.getRootId()+this.getId();
}
var _1d0=(_1cf)?this.runtimeId+"."+_1cf:this.runtimeId;
return _1d0;
},getValueById:function(inId){
if(inId===null||inId===undefined){
return null;
}
var r=this.getRoot();
r=r&&r.getValue(inId);
var _1d1;
if(r&&r._wmNull){
return app.getValue(inId);
}
if(r!==undefined){
return r;
}
if(inId&&wm.Component.byId[inId]){
return wm.Component.byId[inId];
}
var _1d2=inId.indexOf(".");
if(_1d2!=-1){
var _1d3=inId.substring(0,_1d2);
if(_1d3.indexOf("[")==0){
_1d3=_1d3.substring(1,_1d3.length-1);
}
var _1d4=inId.substring(_1d2+1);
var page=wm.Page.getPage(_1d3);
if(page){
return page.getValueById(_1d4);
}
if(this._isDesignLoaded&&wm.decapitalize(String(studio.bindDialog.bindSourceDialog.pageContainer.pageName))==_1d3){
page=studio.bindDialog.bindSourceDialog.pageContainer.page;
if(page){
return page.getValueById(_1d4);
}
}
}
return undefined;
},connect:function(){
var c=dojo.connect.apply(dojo,arguments);
this._connections.push(c);
return c;
},connectOnce:function(_1d5,_1d6,_1d7,_1d8){
var _1d9=this._connections;
var args=[_1d5,_1d6];
if(typeof _1d7=="function"){
_1d8=_1d7;
}else{
args.push(_1d7);
}
args.push(function(){
dojo.disconnect(c);
wm.Array.removeElement(_1d9,c);
dojo.hitch(this,_1d8)();
});
var c=dojo.connect.apply(dojo,args);
_1d9.push(c);
return c;
},connectEvents:function(_1da,_1db){
this._connections=this._connections.concat(wm.connectEvents(this,_1da,_1db));
},_disconnect:function(_1dc,_1dd){
dojo.forEach(this._connections,dojo.disconnect);
this._connections=[];
},disconnectEvent:function(_1de){
this._connections=dojo.filter(this._connections,function(item,_1df,_1e0){
if(item[1]==_1de){
dojo.disconnect(item);
return false;
}else{
return true;
}
return item[1]!=_1de;
});
},disconnect:function(_1e1){
dojo.disconnect(_1e1);
wm.Array.removeElement(this._connections,_1e1);
},findConnection:function(_1e2){
for(var i=0;i<this._connections.length;i++){
var con=this._connections[i];
if(con[1]==_1e2){
return con;
}
}
},findSubscription:function(_1e3){
for(var i=0;i<this._subscriptions.length;i++){
var con=this._subscriptions[i];
if(con[0]==_1e3){
return con;
}
}
},subscribe:function(){
var s=dojo.subscribe.apply(dojo,arguments);
this._subscriptions.push(s);
if(djConfig.isDebug){
this._debugSubscriptions.push(arguments[0]);
}
return s;
},unsubscribe:function(_1e4){
for(var i=this._subscriptions.length-1;i>=0;i--){
if(this._subscriptions[i][0]==_1e4){
dojo.unsubscribe(this._subscriptions[i]);
wm.Array.removeElementAt(this._subscriptions,i);
if(djConfig.isDebug){
wm.Array.removeElementAt(this._debugSubscriptions,i);
}
}
}
},_unsubscribe:function(){
dojo.forEach(this._subscriptions,dojo.unsubscribe);
this._subscriptions=[];
if(djConfig.isDebug){
this._debugSubscriptions=[];
}
},isEventProp:function(n){
if(!this._designee){
return false;
}
return dojo.isFunction(this._designee[n]||this._designee[n.replace(/\d+$/,"")])&&(n.slice(0,2)=="on");
},isCustomMethodProp:function(n){
return dojo.isFunction(this.constructor.prototype[n])&&(n.slice(0,6)=="custom");
},_getProp:function(n){
if(this.isEventProp(n)){
return this.eventBindings?(this.eventBindings[n]||""):"";
}
var g=this._getPropWorker(this._designee,n,"get");
if(g){
return g.call(this,n);
}
return n in this._designee?this._designee[n]:this.components[n];
},_setProp:function(n,v){
if(this.isEventProp(n)&&this._isDesignLoaded){
this.setEvent(n,v);
}else{
if(this.isCustomMethodProp(n)&&this._isDesignLoaded){
if(v){
this._designee[n]=v;
eventEdit(this,n,v,this.owner==studio.application);
}else{
delete this._designee[n];
}
}else{
var s=this._getPropWorker(this._designee,n,"set");
if(s){
s.call(this,v);
}else{
this._designee[n]=v;
}
}
}
},valueChanged:function(_1e5,_1e6){
var _1e7=this.getRuntimeId(_1e5);
if(_1e7==""){
return;
}
dojo.publish(_1e7+"-changed",[_1e6,this]);
var root=this.getRoot();
if(root){
root=root.getRuntimeId();
}
if(root&&root.indexOf(".")&&_1e7.indexOf(root)==0){
var n=_1e7.substring(root.length);
n=root.substring(root.lastIndexOf(".")+1)+n;
if(n!=_1e7){
var _1e8=n+"-changed";
wm.logging&&undefined;
dojo.publish(_1e8,[_1e6,this]);
}
}
},_create:function(ctor,_1e9){
try{
return new ctor(_1e9);
}
catch(e){
}
},adjustChildProps:function(_1ea,_1eb){
dojo.mixin(_1eb,{owner:this});
},createComponent:function(_1ec,_1ed,_1ee,_1ef,_1f0,_1f1){
if(wm.debugPerformance){
if(_1ed=="wm.Layout"){
if(dojo.isFF){
console.groupCollapsed("CREATE "+_1ed+": "+_1ec+" AT "+startTime);
}else{
}
}
this.startTimer("CreateComponent",_1ed);
}
var ctor=dojo.getObject(_1ed);
if(!ctor){
try{
wm.getComponentStructure(_1ed);
ctor=dojo.getObject(_1ed);
}
catch(e){
}
}
if(!ctor){
throw (wm.getDictionaryItem("wm.Component.CLASS_NOT_FOUND",{type:_1ed,name:_1ec}));
}
var _1f2=dojo.mixin({_designer:this._designer,_loading:true},_1ee);
this.adjustChildProps(ctor,_1f2);
if(_1f1){
_1f2.owner=_1f1;
}
_1f2.name=_1f2.owner.getRoot()._loading||_1f2.owner._loading?_1ec:_1f2.owner.getUniqueName(_1ec);
if(!this.isDesignLoaded()){
for(var p in _1f2){
if(p.indexOf("custom")==0&&dojo.isFunction(ctor.prototype[p])){
var _1f3=_1f2.owner;
_1f2[p]=dojo.hitch(_1f3,_1f3[_1f2[p]]);
}
}
}
var w=this._create(ctor,_1f2);
if(w.name!=_1ec&&wm.pasting&&window["studio"]){
studio.renamedDuringPaste[_1ec]=w;
}
try{
if(_1ef&&w.owner){
w.owner.makeEvents(_1ef,w);
}
if(_1f0){
w.createComponents(_1f0);
}
}
catch(e){
}
finally{
try{
w.loaded();
if(w.owner&&w.owner[w.name]===undefined&&!w._isDesignLoaded){
w.owner[w.name]=w;
}
}
catch(e){
console.error("Error in postInit for "+w.toString()+": "+e);
}
}
if(wm.debugPerformance){
this.stopTimerWithName("CreateComponent",_1ed,1);
}
return w;
},createComponents:function(_1f4,_1f5){
var _1f6=[];
for(var i in _1f4){
var c=_1f4[i];
_1f6.push(this.createComponent(i,c[0],c[1],c[2],c[3],_1f5));
}
return _1f6;
},_eventArgs:function(c,a){
var args=[c];
for(var i=0,l=a.length;i<l;i++){
args.push(a[i]);
}
return args;
},makeEvents:function(_1f7,_1f8){
var e,n,f;
var _1f9=[];
for(n in _1f7){
_1f9.push(n);
}
_1f9.sort();
for(var i=0;i<_1f9.length;i++){
var n=_1f9[i];
f=_1f7[n];
e=this[f]||f;
if(this._designer){
if(n.match(/\d+$/)&&!_1f8[n]){
_1f8[n]=function(){
};
}
wm.fire(_1f8,"setProp",[n,f]);
}else{
this.connect(_1f8._eventSource||_1f8,n.replace(/\d*$/,""),this.makeEvent(e,f,_1f8,n.replace(/\d*$/,"")));
if(n.match(/^onRightClick\d*$/)){
_1f8.connect(_1f8.domNode,"oncontextmenu",_1f8,function(_1fa){
dojo.stopEvent(_1fa);
this.onRightClick(_1fa);
});
if(dojo.isFF){
_1f8.connect(_1f8.domNode,"onmousedown",_1f8,function(_1fb){
if(_1fb.button==2||_1fb.ctrlKey){
dojo.stopEvent(_1fb);
this.onRightClick(_1fb);
}
});
}
}else{
if(n.match(/^onMouseOver\d*$/)){
_1f8.createMouseOverConnect();
}else{
if(n.match(/^onMouseOut\d*$/)){
_1f8.createMouseOutConnect();
}else{
if(n.match(/^onEnterKeyPress\d*$/)&&_1f8 instanceof wm.Container){
_1f8.connectOnEnterKey();
}
}
}
}
}
}
},makeEvent:function(_1fc,_1fd,_1fe,_1ff){
return dojo.isFunction(_1fc)?this._makeEvent(_1fd,_1fe,_1ff):this._makeComponentEvent(_1fc,_1fe,_1ff);
},_makeEvent:function(_200,_201,_202){
var self=this;
return function jsEventHandler(){
var args=arguments;
var f=function(){
if(app.debugDialog&&!_201.isAncestor(app.debugDialog)){
var _203=app.debugDialog.newLogEvent({eventType:"javascriptEvent",sourceDescription:(_201 instanceof wm.Component?_201.getRuntimeId()+".":"")+_202+"() has been called",resultDescription:"Calling "+(self instanceof wm.Component?self.getRuntimeId()+".":"")+_200+"()",firingId:_201 instanceof wm.Component?_201.getRuntimeId():"",affectedId:self.getRuntimeId(),method:_200});
}
try{
self[_200].apply(self,self._eventArgs(this,args));
}
catch(e){
var _204="Error in "+self.toString()+"."+_200+": "+e.message;
if(djConfig.isDebug){
app.toastError(_204);
}else{
console.error(_204);
}
}
if(_203){
app.debugDialog.endLogEvent(_203);
}
};
if(_201&&_202&&_201["_"+_202+"BeforeStart"]){
dojo.hitch(this,f)();
}else{
if(self instanceof wm.Page&&self._loadingPage){
self.connectOnce(self,"start",this,f);
}else{
if(self._loading){
self.connectOnce(self,"postInit",this,f);
}else{
dojo.hitch(this,f)();
}
}
}
};
},_makeComponentEvent:function(_205,_206,_207){
var self=this;
return function eventHandler(e,_208){
var args=arguments;
var f=function(){
var c=wm.isInstanceType(_205,wm.Component)?_205:self.getValueById(_205);
if(wm.isInstanceType(c,wm.Component)){
if(app.debugDialog&&!_206.isAncestor(app.debugDialog)){
if(c instanceof wm.ServiceVariable){
if(!c._debug){
c._debug={};
}
c._debug={trigger:_206.getId(),eventName:_207,method:"update",lastUpdate:new Date()};
}
var _209=app.debugDialog.newLogEvent({eventType:"componentEvent",sourceDescription:_206.getRuntimeId()+"."+_207+"() has been called",resultDescription:"Invoking "+c.getRuntimeId(),eventName:_207,firingId:_206.getRuntimeId(),affectedId:c.getRuntimeId(),method:"update"});
}
if(c.updateInternal){
wm.fire(c,"updateInternal",[e,_208]);
}else{
wm.fire(c,"update",[e,_208]);
}
}else{
if(dojo.isString(_205)){
var o=_205.split(".");
var m,c;
if(o.length>1){
m=o.pop();
c=self.getValueById(o.join("."));
}else{
c=self;
m=o[0];
}
if(c&&c[m]){
if(app.debugDialog&&!_206.isAncestor(app.debugDialog)){
if(c instanceof wm.ServiceVariable){
if(!c._debug){
c._debug={};
}
c._debug={trigger:_206.getId(),eventName:_207,method:m,lastUpdate:new Date()};
}
var _209=app.debugDialog.newLogEvent({eventType:"subcomponentEvent",sourceDescription:(_206 instanceof wm.Component?_206.getRuntimeId()+".":"")+_207+"() has been called",resultDescription:"Calling "+c.getRuntimeId()+"."+m+"()",firingId:_206 instanceof wm.Component?_206.getRuntimeId():undefined,affectedId:c instanceof wm.Component?c.getRuntimeId():undefined,method:m});
}
try{
c[m].apply(c,self._eventArgs(this,args));
}
catch(e){
var _20a="Error in "+self.toString()+"."+m+": "+e.message;
if(djConfig.isDebug){
app.toastError(_20a);
}else{
console.error(_20a);
}
}
}
}
}
if(_209){
app.debugDialog.endLogEvent(_209);
}
};
if(self instanceof wm.Page&&self._loadingPage){
self.connectOnce(self,"start",this,f);
}else{
if(self._loading){
self.connectOnce(self,"postInit",this,f);
}else{
dojo.hitch(this,f)();
}
}
};
},readComponents:function(_20b){
var c=dojo.fromJson(_20b);
return this.createComponents(c);
},startTimerWithName:function(_20c,_20d){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_20d]){
this.logTimesWithComponentNames[_20d]={};
}
this.logTimesWithComponentNames[_20d][_20c]=new Date().getTime();
},stopTimerWithName:function(_20e,_20f){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_20f]){
this.logTimesWithComponentNames[_20f]={};
}
var _210=this.logTimesWithComponentNames[_20f][_20e];
if(!_210){
return -1;
}
this.logTimesWithComponentNames[_20f][_20e]=0;
var _211=new Date().getTime()-_210;
var _212=wm.Component.timingByComponent[_20f];
if(!_212){
wm.Component.timingByComponent[_20f]={};
_212=wm.Component.timingByComponent[_20f];
}
if(!_212[_20e]){
_212[_20e]=[];
}
_212[_20e].push(_211);
return _211;
},subtractTimerWithName:function(_213,_214,time){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_214]){
this.logTimesWithComponentNames[_214]={};
}
var _215=this.logTimesWithComponentNames[_214][_213];
if(!_215){
return -1;
}
var _216=wm.Component.timingByComponent[_214];
if(!_216){
wm.Component.timingByComponent[_214]={};
_216=wm.Component.timingByComponent[_214];
}
var tmp=_216[timereName];
tmp[tmp.length-1]-=time;
},startTimer:function(_217){
if(!wm.debugPerformance){
return;
}
if(!this.logTimes){
this.logTimes={};
}
this.logTimes[_217]=new Date().getTime();
},stopTimer:function(_218,_219){
if(!wm.debugPerformance){
return;
}
if(!this.logTimes){
this.logTimes={};
}
var _21a=this.logTimes[_218];
if(!_21a){
return -1;
}
this.logTimes[_218]=0;
var _21b=new Date().getTime()-_21a;
if(_219){
var _21c=wm.Component.timingByComponent[this.declaredClass];
if(!_21c){
wm.Component.timingByComponent[this.declaredClass]={};
_21c=wm.Component.timingByComponent[this.declaredClass];
}
if(!_21c[_218]){
_21c[_218]=[];
}
_21c[_218].push(_21b);
}
return _21b;
}});
dojo.mixin(wm.Component,{byId:{},byShortId:{},timingByComponent:{},add:function(_21d){
if(_21d._temporaryComponent){
return;
}
var rid=_21d.getRuntimeId();
wm.Component.byId[rid]=_21d;
},remove:function(_21e){
delete wm.Component.byId[_21e.getRuntimeId()];
},property:{}});
}
if(!dojo._hasResource["wm.base.Control"]){
dojo._hasResource["wm.base.Control"]=true;
dojo.provide("wm.base.Control");
dojo.provide("wm.base.Widget");
wm.splitUnits=function(_21f){
if(!dojo.isString(_21f)){
return {value:_21f,units:"px"};
}
var m=(_21f||"").match(wm.splitUnits.Rx);
return {value:Number(m[1])||0,units:m[2]||"px"};
};
wm.splitUnits.Rx=/(\d*)(.*)/;
dojo.declare("wm.Bounds",null,{padding:"",border:"",margin:"",constructor:function(){
this.bounds={l:0,t:0,w:96,h:64};
this.borderExtents={l:0,t:0,r:0,b:0};
this.paddingExtents={l:0,t:0,r:0,b:0};
this.marginExtents={l:0,t:0,r:0,b:0,w:0,h:0};
this.padBorderMargin={};
this.calcPadBorderMargin();
},getBounds:function(){
return this.bounds;
},setBounds:function(inL,inT,inW,inH){
if(arguments.length==1){
return this.setBounds(inL.l,inL.t,inL.w,inL.h);
}
var b=this.bounds;
if(!isNaN(inL)&&b.l!=inL){
b.l=inL;
}
if(!isNaN(inT)&&b.t!=inT){
b.t=inT;
}
if(inW>=0&&b.w!=inW){
b.w=inW;
this._boundsDirty=true;
}
if(inH>=0&&b.h!=inH){
b.h=inH;
this._boundsDirty=true;
}
b.r=b.l*1+b.w*1;
b.b=b.t*1+b.h*1;
return b;
},setContentBounds:function(_220){
var b={};
var sm=this.getScrollMargins();
if("w" in _220){
b.w=_220.w+this.padBorderMargin.w+sm.w;
}
if("h" in _220){
b.h=_220.h+this.padBorderMargin.h+sm.h;
}
return this.setBounds(b);
},_parseExtents:function(_221){
_221=String(_221);
var r={};
if(typeof _221=="number"){
r={l:_221,t:_221,r:_221,b:_221};
}else{
var ex=_221.split(",");
var l=ex.length;
r.t=parseFloat(ex[0])||0;
r.r=l<2?r.t:parseFloat(ex[1])||0;
r.b=l<3?r.t:parseFloat(ex[2])||0;
r.l=l<4?r.r:parseFloat(ex[3])||0;
}
return r;
},_stringifyExtents:function(_222){
return _222.t+","+_222.r+","+_222.b+","+_222.l;
},setPadding:function(_223){
this.padding=String(_223);
this.paddingExtents=this._parseExtents(this.padding);
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
},setBorder:function(_224){
_224=String(_224);
_224=(_224&&_224.match(/\d/))?_224:"0";
if(_224!==this.border){
this.border=_224;
this.borderExtents=this._parseExtents(_224);
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
}
},setMargin:function(_225){
this.margin=String(_225);
var me=this.marginExtents=this._parseExtents(this.margin);
me.h=me.t+me.b;
me.w=me.l+me.r;
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
},setOneMargin:function(_226,edge){
var m=this.marginExtents;
m[edge]=_226;
this.setMargin(this._stringifyExtents(m));
},padBorderMarginChanged:function(){
this.calcPadBorderMargin();
},_edges:{l:1,t:1,r:1,b:1},calcPadBorderMargin:function(){
var pbm=this.padBorderMargin;
for(var e in this._edges){
pbm[e]=this.borderExtents[e]+this.paddingExtents[e]+this.marginExtents[e];
}
pbm.w=pbm.l+pbm.r;
pbm.h=pbm.t+pbm.b;
},getScrollMargins:function(){
return {w:0,h:0};
},getContentBounds:function(){
var sm=this.getScrollMargins();
var b={l:this.paddingExtents.l,t:this.paddingExtents.t,w:Math.floor(this.bounds.w)-this.padBorderMargin.w-sm.w,h:Math.floor(this.bounds.h)-this.padBorderMargin.h-sm.h};
if(b.w<0){
b.w=0;
}
if(b.h<0){
b.h=0;
}
b.r=b.l+b.w;
b.b=b.t+b.h;
return b;
},getStyleBounds:function(){
if(this.isRelativePositioned){
return {w:this.width,h:this.height};
}
var pbm=(this.dom.node.tagName.toLowerCase()=="button")?this.marginExtents:this.padBorderMargin;
var b={l:this.bounds.l,t:this.bounds.t,w:this.bounds.w-pbm.w,h:this.bounds.h-pbm.h};
if(b.w<0){
b.w=0;
}
if(b.h<0){
b.h=0;
}
b.r=b.l+b.w;
b.b=b.t+b.h;
return b;
},cloneBounds:function(){
with(this.bounds){
return {l:l,t:t,w:w,h:h,r:r,b:b};
}
}});
dojo.declare("wm.DomNode",null,{constructor:function(_227,_228){
this.node=_227||document.createElement("div");
this.isRelativePositioned=_228;
},append:function(_229){
this.node.appendChild(_229.node);
},remove:function(_22a){
this.node.removeChild(_22a.node);
},getWidth:function(){
return this.node.offsetWidth;
},getHeight:function(){
return this.node.offsetHeight;
},setBox:function(_22b,_22c){
var _22d=false;
var s=this.node.style;
if(this.isRelativePositioned){
s.width=_22b.w;
s.height=_22b.h;
return true;
}
var bl=_22b.l+"px";
if(!isNaN(_22b.l)&&s.left!=bl){
s.left=bl;
_22d=true;
}
var bt=_22b.t+"px";
if(!isNaN(_22b.t)&&s.top!=bt){
s.top=bt;
_22d=true;
}
var bw=_22b.w+"px";
if(_22b.w>=0&&s.width!=bw){
s.width=bw;
_22d=true;
}
var bh=_22b.h+"px";
if(_22b.h>=0){
s.height=bh;
s.lineHeight=_22c?bh:"normal";
_22d=true;
}
return _22d;
},setCssText:function(_22e){
this.node.style.cssText+=";"+_22e;
},addCssText:function(_22f){
this.node.style.cssText+=_22f;
}});
wm.define("wm.Control",[wm.Component,wm.Bounds],{mobileFolding:false,mobileFoldingIndex:"",mobileFoldingCaption:"",imageList:"",imageIndex:-1,renderedOnce:0,invalidCss:1,autoScroll:false,backgroundColor:"",borderColor:"#F0F0F0",classNames:"",id:"",autoSizeWidth:false,autoSizeHeight:false,_needsAutoSize:true,width:"",height:"",minHeight:0,minWidth:0,minMobileHeight:0,minDesktopHeight:0,enableTouchHeight:false,styles:"",showing:true,disabled:false,_parentDisabled:false,_disabled:false,container:false,_classes:{domNode:[]},scrollX:false,scrollY:false,constructor:function(){
this.widgets={};
this._classes=dojo.clone(this._classes);
},markupFactory:function(_230,node){
var ctor=arguments.callee.arguments[2];
var _231=node;
var _232=wm._dojoParserCurrentOwner;
var _233=node.parentNode.id;
while(_233.indexOf("_")!=-1&&!_232[_233]){
_233=_233.substring(_233.indexOf("_")+1);
}
var _234=_232[_233];
_230=dojo.mixin(_230,{domNode:_231,parentNode:_231.parentNode,parent:_234,name:_232.getUniqueName(_230.name),owner:_232,_designer:_232._designer,_loading:false});
var _235=new ctor(_230);
if(!_230.parent&&ctor.prototype.declaredClass=="wm.Layout"){
_235.owner.root=_235;
}
return _235;
},prepare:function(_236){
try{
if(_236){
var _237=_236.owner;
if(!_237&&parent){
_237=_236.owner=parent.owner;
}
if(_237){
_237=_237.getOwnerApp();
}
if(_237){
_237.loadThemePrototypeForClass(this.constructor,this);
}
}
}
catch(e){
console.error("What the hell?"+e);
}
this.inherited(arguments);
},postscript:function(_238){
this.inherited(arguments);
},create:function(){
this._cupdating=true;
this.inherited(arguments);
},build:function(){
this.domNode=dojo.byId(this.domNode||undefined);
if(!this.domNode){
this.domNode=document.createElement("div");
}
},initDomNode:function(){
if(!this.dom){
this.dom=new wm.DomNode(this.domNode,this.isRelativePositioned);
if(!this.isRelativePositioned){
this.domNode.style.position="absolute";
}else{
this.domNode.style.position="relative";
}
this.setParent(this.parent);
this.setDomNode(this.domNode);
}
},init:function(){
this.initDomNode();
this.inherited(arguments);
var _239=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop";
if(this.height&&String(this.height).match(/\%/)){
this.mobileHeight=this.desktopHeight=this.height;
}else{
if(!_239||!this.enableTouchHeight){
if(this.desktopHeight!=null){
this.height=this.desktopHeight;
}else{
if(this.height){
this.desktopHeight=this.height;
}else{
this.height=this.desktopHeight=this.constructor.prototype.height;
}
}
if(this.minDesktopHeight){
this.minHeight=this.minDesktopHeight;
}else{
if(this.minHeight){
this.minDesktopHeight=this.minHeight;
}else{
this.minHeight=this.minDesktopHeight=this.constructor.prototype.minHeight;
}
}
}else{
if(this._isDesignLoaded&&studio.currentDeviceType=="desktop"||this.desktopHeight==undefined){
this.desktopHeight=this.height||this.mobileHeight;
}
if(this.desktopHeight&&typeof this.desktopHeight=="string"&&this.desktopHeight.match(/\%/)){
this.height=this.mobileHeight=this.desktopHeight;
}else{
if(this.mobileHeight){
this.height=this.mobileHeight;
}else{
if(this.height){
this.mobileHeight=this.height;
}else{
this.height=this.mobileHeight=this.constructor.prototype.height;
}
}
}
if(this.minMobileHeight){
this.minHeight=this.minMobileHeight;
}else{
this.minHeight=this.minMobileHeight=this.constructor.prototype.minHeight;
}
}
}
this.bc();
if(this.isDesignLoaded()){
this.set_border((this.border)?String(this.border):"0");
}else{
this.border=(this.border)?String(this.border):"0";
}
this.borderExtents=this._parseExtents(this.border);
this.padding=String(this.padding);
this.paddingExtents=this._parseExtents(this.padding);
this.setMargin(String(this.margin));
this.doSetSizeBc();
if(!this.showing){
this.setShowing(false,true);
}
this.setDisabled(this.disabled);
this.appendDOMNode(this.parent);
this.updateBounds();
},bc:function(){
},postInit:function(){
this._cupdating=false;
this.inherited(arguments);
this.render(1);
if(this.addTouchListener&&wm.isMobile&&!window["studio"]){
this.addTouchListener(this._touchNode||this.domNode);
}
if(!this.$.binding&&this.isDesignLoaded()){
new wm.Binding({name:"binding",owner:this});
}
if(this.hint){
this.setHint(this.hint);
}
},destroy:function(){
if(this.isDestroyed||this._isDestroying){
return;
}
this._isDestroying=true;
try{
if(app.toolTipDialog&&this==app.toolTipDialog.tipOwner){
app.toolTipDialog.hide();
}
if(this._layerConnections){
delete this._layerConnections;
}
if(this.widgets){
var wids=[];
wm.forEachProperty(this.widgets,function(w,name){
wids.push(w);
});
for(var i=0,w;(w=wids[i]);i++){
w.destroy();
}
wids=[];
}
this.widgets=null;
this.parentNode=null;
this.setParent(null);
wm.fire(this.designWrapper,"destroy");
this.layout=null;
this.inherited(arguments);
}
catch(e){
}
finally{
if(this.domNode){
dojo.destroy(this.domNode);
}
this.domNode=null;
this._designee=null;
if(this.dom&&this.dom.node){
dojo.destroy(this.dom.node);
this.dom.node=null;
this.dom=null;
}
}
},loaded:function(){
this.inherited(arguments);
this.initUserClasses();
},setDomNode:function(_23a){
var n=this.domNode=_23a;
if(dojo.isIE<=8){
n.style.width="0px";
}
this.updateId();
var _23b=this.classNames+(this.owner?" "+this.owner.declaredClass.replace(/\./g,"")+"-"+this.name:"")+(this.isRelativePositioned&&this.parent&&this.parent.layoutKind=="left-to-right"?" wmInlineDiv":"");
dojo.addClass(n,_23b);
this.initUserClasses();
},isAncestorHiddenLayer:function(){
if(this instanceof wm.Layout&&this.owner==app._page){
return false;
}
if(this instanceof wm.Layer&&this.parent instanceof wm.Layers&&this.parent.getActiveLayer()!=this){
return true;
}
var _23c;
if(this.parent&&this.parent instanceof wm.Control){
_23c=this.parent;
}else{
if(this.owner instanceof wm.Page&&this.owner.owner instanceof wm.Control){
_23c=this.owner.owner;
}
}
if(!_23c){
return false;
}
return _23c.isAncestorHiddenLayer();
},isAncestorHidden:function(){
if(!this.showing&&this instanceof wm.Layer==false){
return true;
}
if(this instanceof wm.Layout&&this.owner==app._page||this instanceof wm.Dialog){
return false;
}
if(this instanceof wm.Layer&&!this.active){
return true;
}
var _23d;
if(this.parent&&this.parent instanceof wm.Control){
_23d=this.parent;
}else{
if(this.owner instanceof wm.Page&&this.owner.owner instanceof wm.Control){
_23d=this.owner.owner;
}
}
if(!_23d){
return false;
}
return _23d.isAncestorHidden();
},callOnShowParent:function(){
var self=this;
wm.forEachVisibleWidget(this,function(w){
if(self!=w){
if(w._onShowParent){
w._onShowParent();
}
if(w.onShow&&w.onShow!=w.constructor.prototype.onShow){
w.onShow();
}
}
},true);
},callOnHideParent:function(){
var self=this;
if(!this.isDestroyed){
wm.forEachVisibleWidget(this,function(w){
if(w.hint&&app.toolTipDialog&&app.toolTipDialog.tipOwner==self){
app.hideToolTip();
}
if(self!=w){
if(w._onHideParent){
w._onHideParent();
}
if(w.onHide&&w.onHide!=w.constructor.prototype.onHide){
w.onHide();
}
}
},true);
}
},onShow:function(){
},onHide:function(){
},connectToAllLayers:function(obj,_23e){
var _23f=[];
var _240=[];
var _241=this;
while(_241&&(!app._page||_241!=app._page.root)){
if(_241 instanceof wm.Layer){
_23f.push(_241);
}else{
if(_241 instanceof wm.Dialog){
_240.push(_241);
}
}
if(_241.parent){
_241=_241.parent;
}else{
if(_241.owner instanceof wm.Page&&_241.owner.owner instanceof wm.Control){
_241=_241.owner.owner;
}else{
_241=null;
}
}
}
var f=dojo.hitch(obj,_23e);
this._layerConnections=[];
dojo.forEach(_23f,dojo.hitch(this,function(l){
this._layerConnections.push(this.connect(l,"onShow",this,function(){
if(dojo.every(_23f,function(l2){
return l2.isActive();
})&&dojo.every(_240,function(l2){
return l2.showing;
})){
f();
}
}));
}));
dojo.forEach(_240,dojo.hitch(this,function(d){
this._layerConnections.push(this.connect(d,"setShowing",this,function(){
if(d.showing&&!d._transitionToHiding){
if(dojo.every(_23f,function(l2){
return l2.isActive();
})&&dojo.every(_240,function(l2){
return l2.showing;
})){
f();
}
}
}));
}));
},disconnectFromAllLayers:function(){
dojo.forEach(this._layerConnections,dojo.hitch(this,function(c){
dojo.disconnect(c);
this._connections=wm.Array.removeElement(this._connections,c);
}));
delete this._layerConnections;
},isAncestor:function(_242){
var o=this.parent;
while(o&&o!=_242){
o=o.parent;
}
return (o==_242);
},updateId:function(){
this.inherited(arguments);
if(this.domNode){
var rid=this.getRuntimeId();
this.domNode.rid=rid;
this.domNode.id=rid.replace(/\./g,"_");
}
},getUniqueName:function(_243){
return wm.findUniqueName(_243,[this,this.components,this.widgets]);
},setName:function(_244){
if(!_244){
return;
}
if(this.parent){
this.parent.removeWidget(this);
}
this.addRemoveDefaultCssClass(false);
this.inherited(arguments);
if(this.parent){
this.parent.addWidget(this);
}
this.addRemoveDefaultCssClass(true);
},addWidget:function(_245){
this.widgets[_245.name]=_245;
var p=this.containerNode||this.domNode;
if(_245.domNode.parentNode!=p){
p.appendChild(_245.domNode);
}
},insertDomNodes:function(){
wm.forEachProperty(this.widgets,function(w,name){
w.insertDomNodes();
});
var _246=this.getParentPage();
try{
var a=1;
if((!_246||_246._disableRendering)&&this.invalidCss){
this.renderCss();
this.invalidCss=false;
}
var p=this.containerNode||this.parentNode||this.parent.domNode;
if(this.domNode.parentNode!=p&&this.domNode.parentNode!=window.document.body){
p.appendChild(this.domNode);
}
}
catch(e){
}
},leafFirstRenderCss:function(){
wm.forEachProperty(this.widgets,function(w,name){
w.leafFirstRenderCss();
});
if(this.invalidCss){
this.render(1);
}
},removeWidget:function(_247){
if(this.widgets){
delete this.widgets[_247.name];
}
},adjustChildProps:function(_248,_249){
if(wm.isClassInstanceType(_248,wm.Control)){
dojo.mixin(_249,{owner:this._assignChildrenToOwner||this.owner,parent:this});
}else{
this.inherited(arguments);
}
},doSetSizeBc:function(){
if(this.sizeUnits=="flex"){
this.setFlex(this.size);
}else{
if(this.sizeUnits){
var b=this.getParentBox(),p={v:"height",h:"width"}[b];
this.setSizeProp(p,this.size+this.sizeUnits);
}else{
if(this.flex){
this.setFlex(this.flex);
}
}
}
},setFlex:function(_24a){
var box=this.getParentBox();
if(box){
var ex={h:"width",v:"height"}[box];
this.setSizeProp(ex,_24a*100+"%");
this._boundsDirty=true;
}else{
this.setSizeProp("width",_24a*100+"%");
this.setSizeProp("height",_24a*100+"%");
}
},getScrollMargins:function(){
if(wm.isMobile){
return {w:(this.scrollY||this._xscrollY)?2:0,h:(this.scrollX||this._xscrollX)?2:0};
}else{
return {w:(this.scrollY||this._xscrollY)?17:0,h:(this.scrollX||this._xscrollX)?17:0};
}
},isReflowEnabled:function(){
if(this._cupdating){
return false;
}
if(this.owner){
if(wm.isInstanceType(this.owner,wm.Control)){
return this.owner.isReflowEnabled();
}else{
return !this.owner._loadingPage;
}
}
return true;
},padBorderMarginChanged:function(){
this.inherited(arguments);
if(!this._doingAutoSize){
this._needsAutoSize=true;
}
if(this.isReflowEnabled()){
if(this.parent){
this.parent.reflow();
}else{
this.render();
wm.fire(this,"flow");
}
}
},boundsResized:function(){
var box=dojo.marginBox(this.dom.node);
if(this.bounds.w!=box.w){
this.width=this.bounds.w+"px";
}
if(this.bounds.h!=box.h){
this.height=this.bounds.h+"px";
}
this.updateBounds();
},updateBounds:function(){
this._percEx={w:0,h:0};
var su=wm.splitUnits(this.width);
var w=su.value;
switch(su.units){
case "flex":
w*=100;
this._percEx.w=w;
this.width=w+"%";
w=NaN;
break;
case "em":
w*=18;
this.width=w+"px";
break;
case "%":
this._percEx.w=w;
w=NaN;
break;
}
su=wm.splitUnits(this.height);
var h=su.value;
switch(su.units){
case "flex":
h*=100;
this._percEx.h=h;
this.height=h+"%";
h=NaN;
break;
case "em":
h*=h*18;
this.height=h+"px";
break;
case "%":
this._percEx.h=h;
h=NaN;
break;
}
this.setBounds(NaN,NaN,w,h);
},getParentBox:function(){
var n=(this.domNode||0).parentNode;
return n&&(n.box||(n.getAttribute&&n.getAttribute("box")))||(this.parent||0).box||"";
},adjustSetSizeProp:function(n,v){
return v;
},setSizeProp:function(n,v,_24b){
var _24c="min"+wm.capitalize(n);
var _24d="getMin"+wm.capitalize(n)+"Prop";
var _24e=!wm.isMobile&&_24b||this[_24d]();
v=this.adjustSetSizeProp(n,v);
if(this[n]==v&&this[_24c]==_24b){
if(v.match(/px/)&&parseInt(v)!=this.bounds[(n=="height")?"h":"w"]){
}else{
return;
}
}
this[n]=v;
this[_24c]=_24b;
if(!this._doingAutoSize){
this._needsAutoSize=true;
if(this.autoSizeHeight&&n=="height"){
this.autoSizeHeight=false;
}
if(this.autoSizeWidth&&n=="width"){
this.autoSizeWidth=false;
}
}
if(this.designWrapper){
this.designWrapper.invalidCss=true;
}
if(!this._loading){
this.updateBounds();
}
if(this.isReflowEnabled()&&this.showing){
this.reflowParent();
if(this._isDesignLoaded&&this.parent instanceof wm.Container){
var _24f=this.parent;
wm.job(_24f.getRuntimeId()+".designResize",50,function(){
_24f.designResizeForNewChild();
});
}
}
},setWidth:function(_250){
this.setSizeProp("width",_250,this.minWidth);
},setHeight:function(_251){
this.setSizeProp("height",_251,this.minHeight);
},setMinWidth:function(_252){
_252=(_252)?parseInt(_252):0;
this.setSizeProp("width",this.width,_252);
},setMinHeight:function(_253){
_253=(_253)?parseInt(_253):0;
this.setSizeProp("height",this.height,_253);
},getMinWidthProp:function(){
return parseInt(this.minWidth)||30;
},getMinHeightProp:function(){
return parseInt(this.minHeight)||15;
},setMaxHeight:function(_254){
_254=parseInt(_254)||0;
this.maxHeight=_254;
if(_254>this.bounds.h){
this.reflowParent();
}
},getDomHeight:function(){
return dojo.coords(this.domNode,false).h;
},getDomWidth:function(){
return dojo.coords(this.domNode,false).w;
},doAutoSize:function(_255,_256){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_256&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
if(this.autoSizeWidth){
this.domNode.style.width="";
var neww=dojo.coords(this.domNode).w;
if(this.minWidth&&this.minWidth>neww){
neww=this.minWidth;
}
if(_255){
this.setWidth(neww+"px");
}else{
this.bounds.w=neww;
this.domNode.style.width=neww+"px";
}
}
if(this.autoSizeHeight){
this.domNode.style.height="";
var newh=dojo.coords(this.domNode).h;
if(this.minHeight&&this.minHeight>neww){
newh=this.minHeight;
}
if(_255){
this.setHeight(newh+"px");
}else{
this.bounds.h=newh;
this.domNode.style.height=newh+"px";
}
}
if(this.isDesignLoaded()&&studio.designer.selected==this){
setTimeout(dojo.hitch(studio.inspector,"reinspect"),100);
}
this._doingAutoSize=false;
},setAutoSizeWidth:function(_257){
this.autoSizeWidth=_257;
if(this.autoSizeWidth){
if(this._percEx.w){
this.width=this.bounds.w+"px";
this._percEx.w=0;
}
this.doAutoSize(1,1);
}
},setAutoSizeHeight:function(_258){
this.autoSizeHeight=_258;
if(this.autoSizeHeight){
if(this._percEx.h){
this.height=this.bounds.h+"px";
this._percEx.h=0;
}
this.doAutoSize(1,1);
}
},disruptChromeOverflow:function(_259){
},render:function(_25a){
if(_25a||this.isReflowEnabled()){
this.renderCss();
}else{
this.invalidCss=true;
}
return true;
},renderCss:function(){
if(!this.invalidCss){
return;
}
this.invalidCss=false;
var _25b=this.buildCssSetterObj();
if(!this.renderedOnce&&(dojo.isFF||dojo.isSafari||dojo.isChrome)){
this.setCssViaCssText(_25b);
this.renderedOnce=1;
}else{
this.setCssViaDom(_25b);
}
if(!this.noRenderBounds){
this.renderBounds();
}
},buildCssSetterObj:function(){
if(!this._appliedStyles){
this._appliedStyles={};
}
var _25c=this.getCssSplitter(this.margin);
var _25d=this.getCssSplitter(this.padding);
var _25e=this.getCssSplitter(this.border);
if(this.margin.indexOf(",")==-1&&this.margin.indexOf(" ")!=-1){
_25c=" ";
}
var _25f=this.padding.split(_25d);
var _260=((this.autoScroll||this._xscrollX||this._xscrollY)&&(!wm.isFakeMobile||this instanceof wm.Container==false)?"auto":"hidden");
var _261;
var _262=(this.margin||"0").split(_25c);
var _263=(this.border||"0").split(_25e);
var _264=(this.padding||"0").split(_25d);
if(_262.length==1){
_262[1]=_262[2]=_262[3]=_262[0];
}else{
if(_262.length==2){
_262[2]=_262[0];
_262[3]=_262[1];
}
}
if(_263.length==1){
_263[1]=_263[2]=_263[3]=_263[0];
}else{
if(_263.length==2){
_263[2]=_263[0];
_263[3]=_263[1];
}
}
if(_264.length==1){
_264[1]=_264[2]=_264[3]=_264[0];
}else{
if(_264.length==2){
_264[2]=_264[0];
_264[3]=_264[1];
}
}
if(app._currentZoomLevel&&app._currentZoomLevel>1&&app._currentZoomLevel<1.4){
for(var i=0;i<_262.length;i++){
if(_262[i]%10){
_262[i]*=app._currentZoomLevel;
}
}
for(var i=0;i<_264.length;i++){
if(_264[i]%10){
_264[i]*=app._currentZoomLevel;
}
}
for(var i=0;i<_263.length;i++){
if(_263[i]%10){
_263[i]*=app._currentZoomLevel;
}
}
}
if(this.designBorderState){
_261={margin:(_262.join("px ")||0)+"px",padding:(_264.join("px ")||0)+"px",borderLeftStyle:(this.designBorderState&&this.designBorderState.l)?"dashed":"solid",borderRightStyle:(this.designBorderState&&this.designBorderState.r)?"dashed":"solid",borderTopStyle:(this.designBorderState&&this.designBorderState.t)?"dashed":"solid",borderBottomStyle:(this.designBorderState&&this.designBorderState.b)?"dashed":"solid",borderLeftColor:(this.designBorderState&&this.designBorderState.l)?"#C1C1C1":this.borderColor,borderRightColor:(this.designBorderState&&this.designBorderState.r)?"#C1C1C1":this.borderColor,borderTopColor:(this.designBorderState&&this.designBorderState.t)?"#C1C1C1":this.borderColor,borderBottomColor:(this.designBorderState&&this.designBorderState.b)?"#C1C1C1":this.borderColor,borderLeftWidth:((this.designBorderState&&this.designBorderState.l)?"1":this.borderExtents.l)+"px",borderRightWidth:((this.designBorderState&&this.designBorderState.r)?"1":this.borderExtents.r)+"px",borderTopWidth:((this.designBorderState&&this.designBorderState.t)?"1":this.borderExtents.t)+"px",borderBottomWidth:((this.designBorderState&&this.designBorderState.b)?"1":this.borderExtents.b)+"px",backgroundColor:this.backgroundColor,overflowX:this.scrollX?"auto":_260,overflowY:this.scrollY?"auto":_260};
}else{
_261={margin:(_262.join("px ")||0)+"px",padding:(_264.join("px ")||0)+"px",borderStyle:"solid",borderWidth:(_263.join("px ")||0)+"px",borderColor:this.borderColor,backgroundColor:this.backgroundColor,overflowX:this.scrollX?"auto":_260,overflowY:this.scrollY?"auto":_260};
}
if(this.styles&&!wm.isEmpty(this.styles)){
_261=dojo.mixin(_261,this.styles);
}
return _261;
},setCssViaCssText:function(_265){
if(!this.domNode){
return;
}
var _266=[];
var _267=["backgroundColor","padding","margin","borderTopWidth","borderTopStyle","borderTopColor","borderBottomWidth","borderBottomStyle","borderBottomColor","borderLeftWidth","borderLeftStyle","borderLeftColor","borderRightWidth","borderRightStyle","borderRightColor","overflowX","overflowY"];
wm.forEachProperty(_265,dojo.hitch(this,function(_268,_269){
if(dojo.indexOf(_267,_269)==-1){
if(_269=="backgroundGradient"){
var _26a=_265.backgroundGradient;
inValue=wm.getBackgroundStyle(_26a.startColor,_26a.endColor,_26a.colorStop,_26a.direction,"");
if(dojo.isIE<10){
_266.push("filter: "+inValue);
}else{
_266.push("background: "+inValue);
}
}else{
_266.push(_269.replace(/([A-Z])/g,function(_26b){
return "-"+_26b.toLowerCase();
})+":"+_268);
}
this._appliedStyles[_269]=_268;
}
}));
_266.push("margin:"+_265.margin);
_266.push("padding:"+_265.padding);
if(this.designBorderState){
_266.push("border-top:"+_265.borderTopStyle+" "+_265.borderTopWidth+" "+_265.borderTopColor);
_266.push("border-bottom:"+_265.borderBottomStyle+" "+_265.borderBottomWidth+" "+_265.borderBottomColor);
_266.push("border-left:"+_265.borderLeftStyle+" "+_265.borderLeftWidth+" "+_265.borderLeftColor);
_266.push("border-right:"+_265.borderRightStyle+" "+_265.borderRightWidth+" "+_265.borderRightColor);
}else{
_266.push("border-style:"+_265.borderStyle);
_266.push("border-width:"+_265.borderWidth);
_266.push("border-color:"+_265.borderColor);
}
if(_265.backgroundColor){
_266.push("background-color:"+_265.backgroundColor);
}
_266.push("overflow-x:"+_265.overflowX);
_266.push("overflow-y:"+_265.overflowY);
if(wm.isMobile&&dojo.isWebKit&&(_265.overflowY=="auto"||_265.overflowY=="scroll")){
_266.push("-webkit-overflow-scrolling: touch");
}
this.domNode.style.cssText+=_266.join(";");
},setCssViaDom:function(_26c){
if(!this.domNode){
return;
}
var s=this.domNode.style;
var _26d=false;
wm.forEachProperty(_26c,dojo.hitch(this,function(_26e,_26f){
try{
if(this.designBorderState&&_26f.match(/^border/)){
if(!_26d){
_26d=true;
s.borderLeft=_26c.borderLeftStyle+" "+_26c.borderLeftWidth+" "+_26c.borderLeftColor;
s.borderRight=_26c.borderRightStyle+" "+_26c.borderRightWidth+" "+_26c.borderRightColor;
s.borderTop=_26c.borderTopStyle+" "+_26c.borderTopWidth+" "+_26c.borderTopColor;
s.borderBottom=_26c.borderBottomStyle+" "+_26c.borderBottomWidth+" "+_26c.borderBottomColor;
}
}else{
if(this._appliedStyles[_26f]!=_26e){
if(_26f=="backgroundGradient"){
var _270=_26c[_26f];
inValue=wm.getBackgroundStyle(_270.startColor,_270.endColor,_270.colorStop,_270.direction,"");
if(dojo.isIE<10){
s.filter=inValue;
}else{
s.background=inValue;
}
}else{
s[_26f]=_26e;
this._appliedStyles[_26f]=_26e;
}
}
}
if(wm.isMobile&&dojo.isWebKit&&(s.overflowY=="scroll"||s.overflowY=="auto")){
s.WebkitOverflowScrolling="touch";
}
}
catch(e){
console.error("Invalid style for "+this.name+"; "+_26f+": "+_26c[_26f]);
}
}));
},getCssSplitter:function(_271){
var _272=",";
if(_271){
_271=dojo.trim(String(_271));
if(_271.indexOf(",")==-1&&_271.indexOf(" ")!=-1){
_272=" ";
}
}
return _272;
},renderBounds:function(){
var _273=false;
if(this.dom){
var b=this.getStyleBounds();
_273=this.dom.setBox(b,wm.AbstractEditor&&this.singleLine&&this instanceof wm.AbstractEditor==false);
}
if(this.designWrapper){
this.designWrapper.controlBoundsChange();
this.designWrapper.renderBounds();
}
return _273;
},reflow:function(){
},reflowParent:function(){
wm.fire(this.parent,"reflow");
},setScrollX:function(_274){
this.scrollX=_274;
this.invalidCss=true;
this.render();
this.reflowParent();
},setScrollY:function(_275){
this.scrollY=_275;
this.invalidCss=true;
this.render();
this.reflowParent();
},setAutoScroll:function(_276){
this.autoScroll=_276;
if(_276){
if(this.isDesignLoaded()&&(this.scrollX||this.scrollY)){
this.scrollX=false;
this.scrollY=false;
if(studio.designer.selected==this){
studio.inspector.reinspect();
}
}
}
this.noRenderBounds=true;
this.invalidCss=true;
this.renderCss();
delete this.noRenderBounds;
},show:function(){
this.setValue("showing",true);
},hide:function(){
this.setValue("showing",false);
},disable:function(){
this.setValue("disabled",true);
},enable:function(){
this.setValue("disabled",false);
},toString:function(_277){
var t=_277||"";
if(!this.showing){
t+=" ("+wm.getDictionaryItem("wm.Control.toString_HIDDEN")+")";
}
return this.inherited(arguments,[t]);
},setParent:function(_278){
var _279=this.parent;
var _27a=this.parent=_278;
if(_278&&_278.containerWidget&&_278.containerWidget.owner==_278){
_27a=this.parent=_278.containerWidget;
}
if(_279&&_279!=_27a){
_279.removeWidget(this);
if(_279.removeControl){
_279.removeControl(this);
}
}
if(!this._cupdating){
if(_27a){
this.appendDOMNode(_27a);
}else{
if(this.domNode&&this.domNode.parentNode){
this.domNode.parentNode.removeChild(this.domNode);
}
}
}
if(_27a&&_279){
dojo.publish("wmwidget-parentChange",[_279,_27a,this]);
}
if((this._isDesignLoaded===undefined?this.isDesignLoaded():this._isDesignLoaded)&&!this.owner._loadingPage&&_278 instanceof wm.Container){
wm.job(_278.getRuntimeId()+".designResize",50,function(){
_278.designResizeForNewChild();
});
}
},appendDOMNode:function(_27b){
var _27c=_27b;
if(_27c){
_27c.addWidget(this);
if(_27c.addControl){
_27c.addControl(this);
}
}else{
if(this.parentNode&&this.domNode){
var node=this.parentNode;
node.appendChild(this.domNode);
}
}
},getIndexInParent:function(){
if(this.parent){
return this.parent.indexOfControl(this);
}
return -1;
},setIndexInParent:function(_27d){
if(this.parent){
this.parent.moveControl(this,_27d);
}
},canChangeShowing:function(){
return true;
},setShowing:function(_27e,_27f){
var s=Boolean(_27e);
if(!this.canChangeShowing()){
return;
}
if(this._isDesignLoaded&&this.$.binding&&this.$.binding.wires.showing){
s=true;
}
if(_27f||this.showing!=s){
this.showing=s;
this.domNode.style.display=s?"":"none";
this.reflowParent();
}
},setDisabled:function(_280){
var d=Boolean(_280);
this.disabled=d;
this._disabled=d||this._parentDisabled;
wm.forEachProperty(this.widgets,dojo.hitch(this,function(w,name){
w.setParentDisabled(this._disabled);
}));
dojo.toggleClass(this.domNode,"Disabled",this._disabled);
},setParentDisabled:function(_281){
this._parentDisabled=_281;
this.setDisabled(this.disabled);
},setBackgroundColor:function(_282){
this.backgroundColor=_282;
this.invalidCss=true;
this.render();
},setBorderColor:function(_283){
this.borderColor=_283;
this.invalidCss=true;
this.render();
},addRemoveDefaultCssClass:function(_284){
if(this.owner){
dojo[_284?"addClass":"removeClass"](this.domNode,this.owner.declaredClass+"-"+this.name);
}
},getUserNodeClasses:function(_285){
var _286=this._classes;
for(var i in _286){
if(_285==i){
return _286[i].join(" ");
}
}
return "";
},initUserClasses:function(){
if(dojo.isArray(this._classes)){
this._classes={domNode:this._classes};
}
var _287=this._classes;
for(var i in _287){
this.initUserNodeClasses(_287[i],i);
}
},initUserNodeClasses:function(_288,_289){
var k=_288||[],n=this[_289];
if(n){
dojo.addClass(n,k.join(" "));
}
},addUserClass:function(_28a,_28b){
_28b=_28b||"domNode";
var cs=this._classes[_28b]=this._classes[_28b]||[];
cs.push(_28a);
var n=this[_28b];
if(n){
dojo.addClass(n,_28a);
}
},removeUserClass:function(_28c,_28d){
_28d=_28d||"domNode";
var n=this[_28d];
if(n){
dojo.removeClass(n,_28c);
}
var cs=this._classes[_28d]||[];
for(var i=0,c;c=cs[i];i++){
if(c==_28c){
cs.splice(i--,1);
}
}
if(!cs.length){
delete this._classes[_28d];
}
},setStyle:function(_28e,_28f){
if(_28f===undefined||_28f===null){
_28f="";
}
if(_28e=="border"||_28e=="borderColor"||_28e=="margin"||_28e=="padding"){
return this.setProp(_28e,_28f);
}
if(!this.styles){
this.styles={};
}
if(_28f===null||_28f===undefined){
delete this.styles[_28e];
}else{
this.styles[_28e]=_28f;
}
if(_28e=="backgroundGradient"){
if(_28f){
_28f=wm.getBackgroundStyle(_28f.startColor,_28f.endColor,_28f.colorStop,_28f.direction,"");
}else{
_28f="";
}
if(dojo.isIE<10){
this.domNode.style.filter=_28f;
}else{
this.domNode.style.background=_28f;
}
}else{
this.domNode.style[_28e]=_28f;
}
},getStyle:function(_290){
if(_290=="border"||_290=="borderColor"||_290=="margin"||_290=="padding"){
return this.getProp(_290);
}else{
if(!this.styles){
return "";
}else{
return this.styles[_290]!==undefined?this.styles[_290]:"";
}
}
},getOrderedWidgets:function(){
return [];
},updatingEvent:function(prop,_291){
},onRightClick:function(_292){
},onMouseOver:function(_293){
},onMouseOut:function(_294){
},toHtml:function(){
return "";
},toHtmlStyles:function(){
var _295="";
if(this.styles){
wm.forEachProperty(this.styles,function(_296,name){
if(_295){
_295+=";";
}
_295+=name.replace(/([A-Z])/g,function(_297){
return "-"+_297.toLowerCase();
})+": "+_296;
});
if(_295){
_295="style='"+_295+"'";
}
}
return _295;
},customToHtml:function(_298){
return "";
},print:function(){
var html=this.toHtml(725);
var _299=dojo.moduleUrl("wm.base.widget.themes.default").path+"print.css";
var _29a=dojo.moduleUrl("wm.base.styles").path+"wavemaker.css";
var page=this.getParentPage();
if(page){
var name=page.declaredClass;
var css=wm.load("pages/"+name+"/"+name+".css");
}
html="<html><head><title>Printing "+app.declaredClass+"</title><link rel='stylesheet' type='text/css' href='"+_299+"' /><link rel='stylesheet' type='text/css' href='"+_29a+"'/><link rel='stylesheet' href='print.css'/>"+(css?"<style>"+css+"</style>":"")+"</head><body onload='print()'>"+html+"</body><html>";
var win=window.open("","Printing");
if(win){
win.document.open("text/html");
win.document.write(html);
win.document.close();
}
},setHint:function(_29b){
this.hint=_29b;
if(_29b){
this.createMouseOverConnect();
this.createMouseOutConnect();
}
},createMouseOverConnect:function(){
if(this.findConnection("onmouseover")){
return;
}
var self=this;
this.connect(this.domNode,"onmouseover",function(e){
wm.job(self.getRuntimeId()+"MouseOverEvents",50,function(){
self.mouseOver(e);
});
});
},createMouseOutConnect:function(){
if(this.findConnection("onmouseout")){
return;
}
var self=this;
this.connect(this.domNode,"onmouseout",function(e){
wm.job(self.getRuntimeId()+"MouseOverEvents",50,function(){
self.mouseOut(e);
});
});
},mouseOver:function(_29c){
if(this.hint){
var self=this;
wm.cancelJob("app.hint");
var _29d=(app.toolTipDialog&&app.toolTipDialog.showing);
wm.job("app.hint",_29d?0:1500,function(){
if(!self.isAncestorHidden()){
app.createToolTip(self.hint,self.domNode,_29c,self);
}
});
}
this.onMouseOver(_29c);
dojo.stopEvent(_29c);
},mouseOut:function(_29e){
if(this.hint&&app.toolTipDialog&&(app.toolTipDialog.showing||wm.hasJob("app.hint"))){
var self=this;
wm.job("app.hint",500,function(){
if(self==app.toolTipDialog.tipOwner){
app.hideToolTip();
}
});
}
this.onMouseOut(_29e);
dojo.stopEvent(_29e);
},onMouseOver:function(_29f){
},onMouseOut:function(_2a0){
},getParentForm:function(){
var w=this.parent;
var r=this.getRoot();
r=r&&r.root;
while(w&&w!=r){
if(wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
return w;
}
w=w.parent;
}
},setImageList:function(_2a1){
this.imageList=_2a1;
this.imageListChanged();
},setImageIndex:function(_2a2){
if(_2a2!==undefined){
this.imageIndex=Number(_2a2);
this.imageListChanged();
}
},imageListChanged:function(){
var iln=this.findImageList();
this._imageList=iln?iln instanceof wm.ImageList?iln:this.owner.getValueById(iln):null;
this.invalidCss=true;
this.render(true,true);
},getCurrentImageIndex:function(){
return this.imageIndex;
},findImageList:function(){
var t=this;
while(t&&!t.imageList){
t=t.parent;
}
return t?t.imageList:null;
},update:function(){
this.show();
if(this.parent){
this.parent.update();
}
}});
dojo.declare("wm.TouchMixin",null,{addTouchListener:function(_2a3){
if(!this._subscriptions){
this._subscriptions=[];
this._connections=[];
this._debugSubscriptions=[];
this.subscribe=function(){
wm.Component.prototype.subscribe.apply(this,arguments);
};
this.connect=function(){
wm.Component.prototype.connect.apply(this,arguments);
};
this.disconnectEvent=function(){
wm.Component.prototype.disconnectEvent.apply(this,arguments);
};
}
this.connect(_2a3||this.domNode,wm.isFakeMobile?"mousedown":"touchstart",this,"_onTouchStart");
if(!wm.isFakeMobile){
this.connect(_2a3||this.domNode,"touchmove",this,"_onTouchMove");
this.connect(_2a3||this.domNode,"touchend",this,"_onTouchEnd");
}
this.subscribe("wmTouchMove",dojo.hitch(this,function(){
wm.cancelJob(this.getRuntimeId()+".longClick");
}));
},_onTouchStart:function(e){
this._touchMoved=false;
var _2a4;
if(e.targetTouches){
if(e.targetTouches.length){
this._touchStartY=e.targetTouches[0].clientY;
this._touchStartX=e.targetTouches[0].clientX;
_2a4=e.targetTouches[0].target;
}
}else{
if("clientY" in e){
this._touchStartY=e.clientY;
this._touchStartX=e.clientX;
_2a4=e.target;
this.connect(document.body,"mousemove",this,"_onTouchMove");
this.connect(document.body,"mouseup",this,"_onTouchEnd");
}else{
delete this._touchStartY;
delete this._touchStartX;
}
}
if("_touchStartY" in this){
this._touchLastY=this._touchStartY;
this._touchLastX=this._touchStartX;
if(this.onTouchStart(e,_2a4)){
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
}else{
wm.job(this.getRuntimeId()+".longClick",1000,this,"_onLongTouch");
}
}
},_onLongTouch:function(){
this.onLongTouch(this._touchStartX,this._touchStartY);
this._onTouchEnd(null,true);
},onTouchStart:function(_2a5){
},_onTouchMove:function(e){
var _2a6,_2a7,_2a8,_2a9;
if(e.targetTouches){
if(e.targetTouches.length!=1){
return false;
}
_2a6=e.targetTouches[0].clientY-this._touchStartY;
_2a7=e.targetTouches[0].clientY-this._touchLastY;
_2a8=e.targetTouches[0].clientX-this._touchStartX;
_2a9=e.targetTouches[0].clientX-this._touchLastX;
this._touchLastY=e.targetTouches[0].clientY;
this._touchLastX=e.targetTouches[0].clientX;
}else{
_2a6=e.clientY-this._touchStartY;
_2a7=e.clientY-this._touchLastY;
_2a8=e.clientX-this._touchStartX;
_2a9=e.clientX-this._touchLastX;
this._touchLastY=e.clientY;
this._touchLastX=e.clientX;
}
var posY=this._touchStartY+_2a6;
var posX=this._touchStartX+_2a8;
if(!this._touchMoved&&(Math.abs(_2a6)>5||Math.abs(_2a8)>5)){
this._touchMoved=true;
wm.cancelJob(this.getRuntimeId()+".longClick");
}
if(this._touchMoved){
this.onTouchMove(e,posY,_2a6,_2a7,posX,_2a8,_2a9);
}
},onTouchMove:function(_2aa,_2ab,_2ac,_2ad,_2ae,_2af,_2b0){
},_onTouchEnd:function(e,_2b1){
wm.cancelJob(this.getRuntimeId()+".longClick");
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
if(!_2b1){
this.onTouchEnd(e,this._touchMoved);
if(!this._touchMoved){
this.onTouch(this._touchStartX,this._touchStartY);
}
}
},onTouchEnd:function(_2b2,_2b3){
},onTouch:function(posX,posY){
},onLongTouch:function(posX,posY){
}});
dojo.declare("wm.TouchScrollMixin",wm.TouchMixin,{onTouchStart:function(_2b4){
this._touchTime=new Date().getTime();
if(this._touchAnimationId){
window.clearInterval(this._touchAnimationId);
}
},onTouchMove:function(_2b5,_2b6,_2b7,_2b8,_2b9,_2ba,_2bb){
var node=this._scrollNode||this.domNode;
node.scrollTop-=_2b8;
var _2bc=new Date().getTime();
if(this._touchTime!=_2bc){
this._touchVelocity=_2b8/(this._touchTime-_2bc);
this._touchTime=_2bc;
}
dojo.stopEvent(_2b5);
},onTouchEnd:function(_2bd,_2be){
if(_2be){
if(this._touchVelocity!=Infinity&&Math.abs(this._touchVelocity)>0.15){
if(this._touchAnimationId){
window.clearInterval(this._touchAnimationId);
}
this._touchAnimationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
}
},_onAnimateScroll:function(){
var node=this._scrollNode||this.domNode;
this._touchVelocity*=0.9;
var top=node.scrollTop;
node.scrollTop=node.scrollTop+this._touchVelocity*50;
var _2bf=node.scrollTop;
var diff=Math.abs(_2bf-top);
if(diff<=1){
window.clearInterval(this._touchAnimationId);
}
}});
if(wm.isMobile){
dojo.declare("wm.TouchMixinOptional",wm.TouchMixin,{});
}else{
dojo.declare("wm.TouchMixinOptional",null,{onLongTouch:function(posX,posY){
}});
}
if(wm.isIOS<=4||wm.isAndroid<=2||wm.isFakeMobile){
dojo.declare("wm.TouchScrollMixinOptional",wm.TouchScrollMixin,{});
}else{
dojo.declare("wm.TouchScrollMixinOptional",null,{});
}
wm.Widget=wm.Control;
dojo.declare("wm.Box",wm.Widget,{});
}
if(!dojo._hasResource["wm.base.Plugin"]){
dojo._hasResource["wm.base.Plugin"]=true;
dojo.provide("wm.base.Plugin");
wm.Plugin={targetClass:null,callerFactory:function(_2c0){
return function(_2c1,_2c2){
var fn=_2c0[_2c1.callee.nom];
if(fn){
return fn.apply(this,_2c2||_2c1||[]);
}
};
},plugin:function(_2c3,_2c4,_2c5){
var _2c6=[];
for(var p in _2c5){
if(dojo.isFunction(_2c5[p])&&_2c4.prototype[p]){
_2c6[p]=_2c4.prototype[p];
}
}
_2c5[_2c3+"Socket"]=this.callerFactory(_2c6);
_2c4.extend(_2c5);
}};
}
if(!dojo._hasResource["wm.base.components.Variable"]){
dojo._hasResource["wm.base.components.Variable"]=true;
dojo.provide("wm.base.components.Variable");
wm.getRuntimeService=function(_2c7){
var a=dojo.getObject("studio.wip.app")||app;
return wm.fire(a,"getRuntimeService");
};
wm.getRuntimeServiceDesignTime=function(_2c8){
var a=dojo.getObject("studio.wip.app")||app;
return wm.fire(a,"getRuntimeServiceDesignTime");
};
dojo.declare("wm.Variable",wm.Component,{json:"",type:"",saveInCookie:false,saveInPhonegap:false,isList:false,_updating:0,_dataSchema:{},_greedyLoadProps:false,_allowLazyLoad:true,cursor:0,_uniqueSubnardId:1,init:function(){
this.inherited(arguments);
if(this._isDesignLoaded){
this._subscriptions.push(dojo.subscribe("wmtypes-changed",this,"wmTypesChanged"));
}
},postInit:function(){
this.inherited(arguments);
this._inPostInit=true;
if(!this._subNard&&!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
this.setType(this.type,true);
if(window["PhoneGap"]&&this.saveInPhonegap){
var _2c9=window.localStorage.getItem(this.getRuntimeId());
if(_2c9){
this.json=_2c9;
}
}else{
if(this.saveInCookie){
var _2c9=dojo.cookie(this.getRuntimeId());
if(_2c9){
this.json=_2c9;
}
}
}
if(this.json){
this.setJson(this.json);
}else{
this._clearData();
}
this._inPostInit=false;
if(!this._updating&&this.$.binding){
this.$.binding.refresh();
}
},wmTypesChanged:function(){
if(this.owner instanceof wm.Variable){
this.beginUpdate();
}
if(this.isPrimitive||wm.typeManager.isType(this.type)){
this.setType(this.type);
}
if(studio.inspector&&studio.inspector.inspected==this){
studio.inspect(this);
}
if(this.owner instanceof wm.Variable){
this.endUpdate();
}
},canSetType:function(_2ca){
if(this.dataSet&&this.dataSet.type==this.type){
wm.logging&&undefined;
return;
}
return true;
},setType:function(_2cb,_2cc){
this._hasChanged=false;
if(_2cb==this.declaredClass||this.owner instanceof wm.Variable&&_2cb==this.owner.declaredClass){
_2cb="";
}
if(!this.canSetType(_2cb)){
return;
}
var t=_2cb;
if(wm.isListType(t)){
this.isList=true;
if(t.substring(t.length-1)=="]"){
t=t.slice(1,-1);
}
}else{
if(!(this.data&&this.data._list)&&!this._inPostInit){
this.isList=false;
}
}
var _2cd;
if(this.type!=t){
_2cd=true;
}else{
if(this._isDesignLoaded){
_2cd=dojo.toJson(this._getSchemaForType(_2cb))!=dojo.toJson(this._dataSchema);
}
}
this._hasChanged=_2cd;
this.type=t;
if(this._proxy){
this._proxy.setType(this.type);
}
this.typeChanged(this.type);
if(this.json&_2cd){
this.setJson(this.json);
}
if(!_2cc&&_2cd&&_2cb&&_2cb!="any"){
this.dataChanged();
}
},set_type:function(_2ce){
this.setType(_2ce);
studio.reinspect();
},typeChanged:function(_2cf){
var t=_2cf;
var _2d0=wm.typeManager.getPrimitiveType(t)||!t||t=="wm.Variable";
this.isPrimitive=Boolean(_2d0);
var _2d1=this._getSchemaForType(t);
if(_2d1){
this.setDataSchema(_2d1);
}
},_getSchemaForType:function(_2d2){
var p=wm.typeManager.getPrimitiveType(_2d2);
if(this.isPrimitive){
return {dataValue:{type:p||"String"}};
}else{
return wm.typeManager.getTypeSchema(_2d2)||{dataValue:{type:p||"String",isList:this.isList}};
}
},setDataSchema:function(_2d3){
this._dataSchema=_2d3;
},setJson:function(_2d4){
this.json=_2d4;
try{
var d=eval("("+_2d4+")");
}
catch(e){
console.error("Json error in "+this.name+": "+e);
}
this.setData(d);
},hasList:function(){
return this.data&&("list" in this.data);
},getDataTypeInfo:function(_2d5){
return this._dataSchema[_2d5];
},listDataProperties:function(){
var list=this._listSchemaProperties({},this._dataSchema,"getDataTypeInfo");
for(var i in list){
list[i].bindable=true;
}
return list;
},beginUpdate:function(){
this._updating++;
},endUpdate:function(){
this._updating--;
},isUpdating:function(){
return this._updating>0;
},clearData:function(){
this._clearData();
this.setType(this.type,true);
if(this.type&&this.type!=this.declaredClass&&!this._initializing){
this.notify();
}
},_clearData:function(){
this._isNull=false;
this._nostub=false;
if(!this.data){
this.data={};
}
if(this.isList){
this.data={_list:[]};
}else{
var d;
for(var i in this.data){
d=this.data[i];
if(d instanceof wm.Variable&&!wm.typeManager.getLiveService(d.type)){
d._clearData();
}else{
delete this.data[i];
}
}
}
},_setNull:function(_2d6){
this._isNull=_2d6;
if(!_2d6&&this._subNard&&this.owner){
this.owner._setNull(_2d6);
}
},setData:function(_2d7){
if(window["PhoneGap"]&&this.saveInPhonegap||this.saveInCookie){
var _2d8=this.getParentPage();
if(_2d8&&_2d8._loadingPage&&!_2d7){
return;
}
}
if(_2d7 instanceof wm.Variable){
_2d7=_2d7.getData();
}
this.onPrepareSetData(_2d7);
if(dojo.isArray(_2d7)){
this._setArrayData(_2d7);
}else{
if(this.isPrimitive){
this._setPrimitiveData(_2d7);
}else{
this._setObjectData(_2d7);
}
}
this.notify();
this.onSetData();
},onPrepareSetData:function(_2d9){
},onSetData:function(){
},notify:function(){
this.dataOwnerChanged();
this.dataChanged();
this.valueChanged("isEmpty",this.isEmpty());
if(this.isList){
this.valueChanged("count",this.getCount());
}
if(this.queriedItems){
this.setQuery(this._query);
}
this.updatePermanentMemory();
},_setPrimitiveData:function(_2da){
if(_2da!==null&&typeof _2da=="object"){
this.data=_2da;
}else{
this.data={dataValue:_2da};
}
this.isList=false;
},setIsList:function(_2db){
if(_2db&&!this.isList){
this.isList=true;
if(this.json&&!this.data._list){
this.setJson("["+this.json+"]");
}else{
if(wm.isEmpty(this.data)){
this._setArrayData([]);
}else{
var data=[];
data.push(this.getData());
this.setData(data);
}
}
}else{
if(!_2db&&this.isList){
if(this.json){
this.setJson(dojo.toJson(this.getItem(0).getData()));
}else{
if(wm.isEmpty(this.data._list)){
this.setData(null);
}else{
this.setData(this.getItem(0));
}
}
}
}
},_setArrayData:function(_2dc){
if(wm.defaultTypes[this.type]&&_2dc.length&&typeof _2dc[0]!="object"){
_2dc=dojo.map(_2dc,function(v){
return {dataValue:v};
});
}
this.data={_list:_2dc};
this.isList=true;
this._isNull=_2dc.length==0;
},_setObjectData:function(_2dd){
this.beginUpdate();
this._clearData();
this.isList=false;
delete this.data._list;
var d,v,nv,_2de=_2dd===null,_2df=wm.isEmpty(_2dd);
for(var i in this._dataSchema){
d=this.data[i];
v=!_2df?_2dd[i]:undefined;
nv=_2de?null:v;
if(this._isVariableProp(i)){
if(d instanceof wm.Variable){
if(nv!==undefined){
d.beginUpdate();
d.setData(nv);
d.endUpdate();
}
}else{
if(v!==undefined){
this._setDataValue(i,v);
}
}
}else{
if(nv!==undefined){
this._setDataValue(i,nv);
}
}
}
this._setNull(_2de);
this.endUpdate();
},getData:function(_2e0){
if(!this.data){
return;
}
if(this._isNull){
return null;
}else{
if(this.isList){
if(this.type=="byte"){
try{
if(this.data._list&&this.data._list[0] instanceof wm.Variable){
this.data._list[0]=this.data._list[0].data.dataValue;
}
this.data={dataValue:this.data._list.join("")};
}
catch(e){
this.data=null;
}
this.isList=false;
return dojo.clone(this.data);
}else{
if(wm.Variable.convertToHashMaps&&this.data._list&&wm.isHashMapType(this.type)){
var data={};
for(var i=0,l=this.getCount(),v;i<l;i++){
v=(this.getItem(i)||0).getData(_2e0);
data[v.name]=v.dataValue;
}
return data;
}else{
var data=[];
for(var i=0,l=this.getCount(),v;i<l;i++){
v=(this.getItem(i)||0).getData(_2e0);
if(v){
data.push(v);
}
}
return data;
}
}
}else{
if(_2e0&&this.isPrimitive&&this.data["dataValue"]!==undefined){
return this.data.dataValue;
}else{
if(this.isEmpty()){
return null;
}else{
var data={};
var _2e1=this.listDataProperties();
for(var i in _2e1){
var v=this.data[i];
if(wm.getDataConvertDates&&v instanceof Date){
v=v.getTime();
}
if(v!==undefined){
if(v instanceof wm.Variable){
if(v.isEmpty()){
v=null;
}else{
v=v.getData(_2e0);
}
}
if(v===undefined||(v!==null&&typeof v=="object"&&wm.isEmpty(v))){
continue;
}
data[i]=v;
}
}
if(!wm.isEmpty(data)){
return data;
}
}
}
}
}
},_getDataValue:function(n,_2e2){
if(!this.data){
this.data={};
}
var d,f;
if(this.isList){
f=this.getCursorItem();
d=f&&f.data;
}else{
d=this.data;
}
var v=d&&d[n],_2e3=this._dataSchema[n];
if(this._isVariableProp(n)&&(!v||(v._isStub&&v._isStub()))&&!_2e2){
v=d[n]=(f||this).marshallVariable(n,_2e3,v);
}
return v;
},_setDataValue:function(n,v){
if(this._isNull&&v!==undefined){
this._setNull(false);
}
this.beginUpdate();
var o;
if(v===null||v===undefined){
o=this._getDataValue(n,true);
if(o===v){
this.endUpdate();
return;
}
}else{
o=this._getDataValue(n);
if(o===undefined&&v instanceof wm.Variable){
o=this.data[n]=this.createVariable({type:v.type,_subNard:true,name:n});
}
}
this.endUpdate();
if(!o&&v instanceof wm.Variable){
}
if(o instanceof wm.Variable){
if(this._updating){
o._updating++;
}
o.setData(v);
if(this._updating){
o._updating--;
}
return;
}
if(!(v instanceof wm.Variable)){
this.data[n]=v;
this.dataValueChanged(n,v);
}
},getCount:function(){
if(this._isNull){
return 0;
}
if(this.isList){
return (this.data&&this.data._list)?this.data._list.length:0;
}
return 1;
},getIsEmpty:function(){
return this.isEmpty();
},isEmpty:function(){
if(!this.data){
return true;
}
if(this.data._list){
return !Boolean(this.data._list.length);
}
for(var _2e4 in this.data){
if(this.data[_2e4] instanceof wm.Variable){
if(!this.data[_2e4].isEmpty()){
return false;
}
}else{
if(this.data[_2e4]!=null){
return false;
}
}
}
return true;
},_isEmpty:function(obj){
for(var prop in obj){
if(obj.hasOwnProperty(prop)){
return false;
}
}
return true;
},_needItem:function(_2e5,_2e6){
if(_2e5>=this.getCount()&&_2e6===undefined){
return null;
}
var item=this.data._list[_2e5];
var data=_2e6;
if(!(item instanceof wm.Variable)){
data=_2e6||item;
item=this.createVariable({type:this.type,_subNard:true,itemIndex:_2e5});
this.data._list[_2e5]=item;
}
if(data!==undefined){
item.beginUpdate();
item.setData(data);
item.endUpdate();
}
return item;
},getItem:function(_2e7){
return this.isList&&this._needItem(_2e7)||!this.isList&&this;
},getItemData:function(_2e8){
if(!this.isList){
return;
}
var item=this.data._list[_2e8];
if(item instanceof wm.Variable){
return item.data;
}else{
return item;
}
},_populateItems:function(){
for(var i=0,c=this.getCount();i<c;i++){
this.getItem(i);
}
},forEach:function(_2e9){
var _2ea=this.getCount();
for(var i=0;i<_2ea;i++){
_2e9(this.getItem(i),i);
}
},map:function(_2eb){
var _2ec=[];
var _2ed=this.getCount();
for(var i=0;i<_2ed;i++){
_2ec.push(_2eb(this.getItem(i)));
}
return _2ec;
},filterItems:function(_2ee){
var _2ef=[];
this.forEach(function(item,_2f0){
if(_2ee(item,_2f0)){
_2ef.push(item.getData());
}
});
var v=new wm.Variable({type:this.type,owner:this});
v.setData(_2ef);
return v;
},sort:function(_2f1){
this._populateItems();
var l=this.isList&&this.data&&this.data._list;
if(l){
if(typeof _2f1=="function"){
l.sort(_2f1);
}else{
l.sort(function(a,b){
var v1=a.getValue(_2f1);
var v2=b.getValue(_2f1);
return wm.compareStrings(v1,v2);
});
}
this.notify();
}
},setCursor:function(_2f2){
this.cursor=Math.max(0,Math.min(this.getCount()-1,_2f2));
this.notify();
},setNext:function(){
this.setCursor(this.cursor+1);
},setPrevious:function(){
this.setCursor(this.cursor-1);
},setFirst:function(){
this.setCursor(0);
},setLast:function(){
this.setCursor(this.getCount()-1);
},getIndexInOwner:function(){
if(this.owner instanceof wm.Variable&&this.owner.data._list){
return dojo.indexOf(this.owner.data._list,this);
}
return -1;
},getCursorItem:function(){
return this.getItem(this.cursor||0)||this;
},setItem:function(_2f3,_2f4){
this._setItem(_2f3,_2f4);
this.cursor=_2f3;
this.notify();
},_setItem:function(_2f5,_2f6){
if(this.isList){
this._needItem(_2f5,_2f6);
}
},addItem:function(_2f7,_2f8){
this._addItem(_2f7,_2f8);
this.cursor=_2f8;
this.notify();
},_addItem:function(_2f9,_2fa){
if(this.isList){
var c=this.getCount();
if(_2fa>=0&&_2fa<c){
this.data._list.splice(_2fa,0,{});
}else{
_2fa=this.getCount();
}
this._setItem(_2fa,_2f9);
}
},removeItem:function(_2fb){
this._removeItem(_2fb);
this.cursor=0;
this.notify();
},_removeItem:function(_2fc){
if(this.isList){
this.data._list.splice(_2fc,1);
}
},getItemIndex:function(_2fd){
if(!this.isList){
return -1;
}
var list=(this.data||0)._list||[];
for(var i=0,l=list.length;i<l;i++){
if(_2fd==list[i]){
return i;
}
}
return -1;
},getItemIndexByPrimaryKey:function(_2fe,_2ff){
if(!this.isList||!_2ff||_2ff.length<1){
return -1;
}
var obj=_2fe;
if(obj instanceof wm.Variable){
obj=_2fe.getData();
}
var list=(this.data||0)._list||[];
for(var i=0,l=list.length;i<l;i++){
obj2=list[i] instanceof wm.Variable?list[i].getData():list[i];
var _300=true;
for(var j=0;j<_2ff.length;j++){
var f=_2ff[j];
if(obj[f]!=obj2[f]){
_300=false;
break;
}
}
if(_300){
return i;
}
}
return -1;
},getQueriedItems:function(){
if(!this.queriedItems){
this.queriedItems=new wm.Variable({isList:true,type:this.type,name:"queriedItems"});
this.queriedItems.setOwner(this,true);
this.queriedItems.setDataSet(this);
}
return this.queriedItems;
},setQuery:function(_301){
this._query=_301;
if(_301){
return this.query(_301,true);
}else{
this.getQueriedItems().setDataSet(this);
}
},query:function(_302,_303){
if(!this.isList){
return;
}
var _304=_302._maxResults||0;
delete _302._maxResults;
var _305=this.getCount();
var _306=[];
if(_302 instanceof wm.Variable){
_302=_302.getData();
}
if(!_302){
_302={};
}
for(var i=0;i<_305;i++){
var item=this.getItem(i);
if(this._queryItem(item,_302,i)){
_306.push(item);
}
if(_304){
if(_306.length>=_304){
break;
}
}
}
if(_303){
var v=this.getQueriedItems();
}else{
var v=new wm.Variable({type:this.type,isList:true,name:"QueryResults"});
v.setOwner(this,true);
}
v.setData(_306);
if(_304){
_302._maxResults=_304;
}
return v;
},_queryItem:function(_307,_308,_309){
var w="*";
for(var key in _308){
var _30a=true;
var a=_307.getValue(key);
var b=_308[key];
if(typeof b=="function"){
return b(a);
}
var _30b=String(b);
if(_30b.charAt(0)==w){
b=b.substring(1);
_30a=false;
}else{
if(_30b.charAt(0)==">"){
var _30c=false;
if(_30b.charAt(1)=="="){
_30c=true;
b=b.substring(2);
}else{
b=b.substring(1);
}
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
if(_30c){
if(a<b){
return false;
}
}else{
if(a<=b){
return false;
}
}
continue;
}else{
if(_30b.charAt(0)=="<"){
var _30c=false;
if(_30b.charAt(1)=="="){
_30c=true;
b=b.substring(2);
}else{
b=b.substring(1);
}
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
if(_30c){
if(a>b){
return false;
}
}else{
if(a>=b){
return false;
}
}
continue;
}else{
if(_30b.charAt(0)=="!"){
b=b.substring(1);
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
var _30d=true;
}
}
}
}
if(b==w){
if(_30d){
return false;
}else{
continue;
}
}
if(dojo.isString(a)&&dojo.isString(b)){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
a=a.toLowerCase();
b=b.toLowerCase();
var _30e=a.indexOf(b);
if(_30e==-1||_30e>0&&_30a){
if(!_30d){
return false;
}
}else{
if(_30d){
return false;
}
}
}else{
if(a!==b){
if(_30d){
continue;
}else{
return false;
}
}else{
if(_30d){
return false;
}
}
}
}
return true;
},dataRootChanged:function(){
if(this._subNard||!this.owner){
return;
}
var o=this.owner,p,root=this.getRoot();
while(o&&o!=root){
p=o;
o=o&&o.owner;
}
var n=p?p.getRuntimeId():this.getRuntimeId();
var _30f=n+"-rootChanged";
wm.logging&&undefined;
dojo.publish(_30f,[n]);
var root=this.getRoot().getRuntimeId();
if(root&&root.indexOf(".")&&n.indexOf(root)==0){
var tmpn=n.substring(root.length);
tmpn=root.substring(root.lastIndexOf(".")+1)+tmpn;
var _310=tmpn+"-rootChanged";
if(_310!=_30f){
wm.logging&&undefined;
dojo.publish(_310,[n]);
}
}
wm.logging&&undefined;
},dataOwnerChanged:function(){
if(this._updating||!this.owner){
return;
}
var n=this.getRuntimeId();
if(!n){
return;
}
var _311=n+"-ownerChanged";
wm.logging&&undefined;
dojo.publish(_311,[n]);
var root=this.getRoot().getRuntimeId();
if(root&&root.indexOf(".")&&n.indexOf(root)==0){
var tmpn=n.substring(root.length);
tmpn=root.substring(root.lastIndexOf(".")+1)+tmpn;
var _312=tmpn+"-ownerChanged";
if(_312!=_311){
wm.logging&&undefined;
dojo.publish(_312,[n]);
}
}
wm.logging&&undefined;
if(this._allowLazyLoad){
this.dataRootChanged();
}
var v=this.getCursorItem();
for(var i in v.data){
wm.fire(v.data[i],"dataOwnerChanged");
}
},dataChanged:function(){
if(this._updating||!this.owner){
return;
}
var id=this.getRuntimeId();
if(!id){
return;
}
var _313=[id,"-changed"].join("");
wm.logging&&undefined;
dojo.publish(_313,[this]);
var root=this.getRoot();
if(root){
root=root.getRuntimeId();
}
if(root&&root.indexOf(".")&&id.indexOf(root)==0){
var tmpn=id.substring(root.length);
tmpn=root.substring(root.lastIndexOf(".")+1)+tmpn;
var _314=tmpn+"-changed";
if(_314!=_313){
wm.logging&&undefined;
dojo.publish(_314,[this]);
}
}
if(this._subNard){
wm.fire(this.owner,"dataChanged");
}
wm.logging&&undefined;
},updatePermanentMemory:function(){
var _315=this.getParentPage();
if(_315&&_315._loadingPage){
return;
}
if(window["PhoneGap"]&&this.saveInPhonegap){
var _316=dojo.toJson(this.getData());
window.localStorage.setItem(this.getRuntimeId(),_316);
}else{
if(this.saveInCookie){
var _316=dojo.toJson(this.getData());
dojo.cookie(this.getRuntimeId(),_316);
}
}
},dataValueChanged:function(_317,_318){
if(!this._updating&&this.owner){
wm.Component.prototype.valueChanged.call(this,_317,_318);
this.dataChanged();
this.updatePermanentMemory();
}
},valueChanged:function(_319,_31a){
if(!this.type||this.type==this.declaredClass){
return;
}
if(!this.isDataProp(_319)){
this.inherited(arguments);
}
},getDataSet:function(){
return this.dataSet||this;
},_isVariableProp:function(_31b){
var _31c=this._dataSchema[_31b];
return Boolean(_31c&&(_31c.isList||wm.typeManager.isStructuredType(_31c.type)));
},isDataProp:function(_31d){
return _31d in this._dataSchema;
},_getValue:function(_31e){
return this.isDataProp(_31e)?this._getDataValue(_31e):this.inherited(arguments);
},_setValue:function(n,v){
if((this._isDesignLoaded&&this.schema[n]||0).defaultBindTarget||!this.isDataProp(n)){
this.inherited(arguments);
}else{
this._setDataValue(n,v);
}
},createVariable:function(_31f,_320){
if((window["studio"]||djConfig.isDebug)&&_31f.type&&!wm.typeManager.getType(_31f.type)){
app.toastWarning("A variable of type "+_31f.type+" has been created, but that type does not exist");
}
_31f._temporaryComponent=1;
if(!_31f.name){
_31f.name=this._uniqueSubnardId;
this._uniqueSubnardId++;
}
var v=new wm.Variable(_31f);
v.owner=this;
return v;
},marshallVariable:function(_321,_322,_323){
var p=_321,v=_323,t=_322.isList?"["+_322.type+"]":_322.type;
if(!(v instanceof wm.Variable)){
v=this.createVariable({name:p,type:t,_subNard:true},p);
if(_323||_323===null){
v.beginUpdate();
v.setData(_323);
v.endUpdate();
}
}
if(v._isStub()&&this.canLazyLoad(_322)){
this.beginUpdate();
this.lazyLoadData(p,v);
this.endUpdate();
}
return v;
},_isStub:function(){
if(!this._nostub&&!this._isNull){
if(this.data===undefined){
return true;
}
if(this.isList||this.hasList()){
return !this.data._list||!this.data._list.length;
}
if(this._greedyLoadProps){
var _324=this._dataSchema,s;
for(var i in _324){
s=_324[i];
if(!s.isList&&(this.data[i]===undefined)&&!wm.typeManager.isStructuredType(s.type)){
return true;
}
}
}else{
if(wm.isEmpty(this.data)){
return true;
}
}
}
this._nostub=true;
return false;
},lazyLoadData:function(_325,_326){
var s=wm.getRuntimeService(this),v=_326;
try{
if(s.ready){
var d=this.getData();
if(!wm.isEmpty(d)){
var args=[null,this.type,d,{properties:[_325]}];
wm.logging&&undefined;
var f=function(r){
var _327=r&&r[_325];
if(_327){
v.beginUpdate();
v.setData(_327);
v.endUpdate();
}
};
var d;
if(this.async){
d=s.requestAsync("read",args);
}else{
d=s.requestSync("read",args);
}
d.addCallback(dojo.hitch(this,function(){
f();
}));
}
}
}
catch(x){
}
},canLazyLoad:function(_328){
if(this._updating||!wm.typeManager.getLiveService(_328.type)){
return;
}
if(this.isDesignLoaded()&&!studio.isLiveLayoutReady()){
return false;
}
var o=this;
while(o instanceof wm.Variable){
if(!o._allowLazyLoad||wm.disableLazyLoad){
return false;
}
o=o.owner;
}
return _328.isList||this._hasRequiredReadData();
},_hasRequiredReadData:function(){
var ds=this._dataSchema,s,d;
for(var i in ds){
s=ds[i];
if(s.include&&dojo.indexOf(s.include,"read")>-1){
d=this.data[i];
if(d===undefined||d===null){
return false;
}
}
}
return true;
},toString:function(_329){
var t=_329||"";
var _32a=this.isEmpty();
t+="; "+wm.getDictionaryItem("wm.Variable.toString_TYPE",{type:this.type})+"; "+wm.getDictionaryItem("wm.Variable.toString_ISEMPTY",{isEmpty:_32a});
return this.inherited(arguments,[t]);
},_end:0});
wm.Variable.extend({_includeListProps:false,createVariable:function(_32b,_32c){
_32b=_32b||{};
if((window["studio"]&&this.isDesignLoaded()||!window["studio"]&&djConfig.isDebug)&&_32b.type&&!this._dataSchema){
app.alert(wm.getDictionaryItem("wm.Variable.TYPE_INVALID",{type:_32b.type.replace(/[\[\]]/g,""),name:this.getRuntimeId()}));
}
if(!_32b.name){
_32b.name=this._uniqueSubnardId;
this._uniqueSubnardId++;
}
_32b._temporaryComponent=1;
_32b.liveView=this.liveView;
var r=this._rootField,n=_32c;
_32b._rootField=r&&_32c?r+"."+_32c:(_32c||"");
var v=new wm.Variable(_32b);
v.setOwner(this,true);
return v;
},setDataSet:function(_32d){
this.dataSet="";
if(_32d instanceof wm.Variable){
this._rootField=_32d._rootField||"";
if(_32d.liveView){
this.setLiveView(_32d.liveView);
}
this.setType(_32d?_32d.type:"wm.Variable",true);
this.dataSet=_32d;
this.cursor=_32d.cursor;
}
this.setData(_32d);
},_getEagerProps:function(_32e){
var v=_32e,_32f=this.liveView?this.liveView.getSubRelated(v._rootField):[],_330=wm.typeManager.getTypeSchema(v.type);
return this._includeListProps?_32f:dojo.filter(_32f,function(r){
return !wm.typeManager.isPropInList(_330,r);
});
},_getLoadProps:function(_331,_332){
return [_331].concat(dojo.map(this._getEagerProps(_332),function(r){
return [_331,r].join(".");
}));
},lazyLoadData:function(_333,_334){
var s=wm.getRuntimeService(this),v=_334;
try{
if(s.ready){
var d=this.getData();
if(!wm.isEmpty(d)){
var _335=this._getLoadProps(_333,v),args=[null,this.type,d,{properties:_335}];
wm.logging&&undefined;
var f=function(r){
var _336=r&&r[_333];
if(_336){
v.beginUpdate();
v.setData(_336);
v.endUpdate();
}
};
if(this.async){
s.requestAsync("read",args,f);
}else{
s.requestSync("read",args);
f(s.result);
}
}
}
}
catch(x){
wm.logging&&undefined;
}
},setLiveView:function(_337){
this.liveView=_337;
},getViewType:function(){
return this.liveView&&this.liveView.getSubType(this._rootField);
},getViewFields:function(){
return (this.liveView&&this.liveView.getSubView(this._rootField))||[];
},getViewListFields:function(){
return (this.liveView&&this.liveView.getListView(this._rootField))||[];
},getViewRelated:function(){
return (this.liveView&&this.liveView.getSubRelated(this._rootField))||[];
}});
if(0){
wm.Variable.extend({getFeatures:function(){
return {"dojo.data.api.Read":true};
},getValue:function(_338,_339,_33a){
if(this.isItem(_338)){
if(_339=="_id"){
return _338.getIndexInOwner();
}
var _33b=_338.getValue(_339);
if(_33b===undefined){
_33b=_33a;
}
return _33b;
}else{
return this.inherited(arguments);
}
},getValues:function(_33c,_33d){
if(this.isItem(_33c)&&typeof _33d=="string"){
var _33e=this.getValue(_33c,_33d);
return [_33e];
}else{
throw "getValues must have a wm.Variable as input; and inAttribute must be a String; perhaps you want getValue?";
}
},getAttributes:function(_33f){
if(this.isItem(_33f)){
var type=wm.typeManager.getType(_33f.type);
var _340=[];
if(type&&type.fields){
for(var _341 in type.fields){
_340.push(_341);
}
}
if(!this.identity){
_340.push("_id");
}
return _340;
}else{
throw "getAttribute must have a wm.Variable as an input";
}
},hasAttribute:function(_342,_343){
if(this.isItem(_342)&&typeof _343=="string"){
var _344=_342.getValue(_342,_343);
return !(_344===undefined||_344===null);
}else{
throw "getValues must have a wm.Variable as input; and inAttribute must be a String.";
}
},containsValue:function(_345,_346,_347){
var _348=this.getValues(_345,_346);
return dojo.indexOf(_348,_347)!=-1;
},isItem:function(_349){
return _349 instanceof wm.Variable;
},isItemLoaded:function(_34a){
return false;
},loadItem:function(_34b){
return null;
},_fetchItems:function(_34c,_34d,_34e){
var opts=_34c.queryOptions;
var _34f=[];
var i,key;
if(_34c.query){
var _350=this.getCount();
for(i=0;i<_350;++i){
var _351=true;
var _352=this.getItem(i);
if(_352 instanceof wm.Variable==false){
_351=false;
}else{
for(key in _34c.query){
value=_34c.query[key];
if(value!="*"&&!this._containsValue(_352,key,value,opts)){
_351=false;
}
}
}
if(_351){
_34f.push(_352);
}
}
_34d(_34f,_34c);
}else{
var _350=this.getCount();
for(i=0;i<_350;++i){
var item=this.getItem(i);
if(item!==null){
_34f.push(item);
}
}
_34d(_34f,_34c);
}
},_containsValue:function(item,_353,_354,opts){
var _355=String(_354);
var _356=item.getValue(_353);
var _357=String(_356);
if(_354===_356){
return true;
}
if(opts.ignoreCase){
if(_355.toLowerCase()===_357.toLowerCase()){
return true;
}
}
if(!opts.exactMatch){
if(_355.indexOf(_357)!=-1){
return true;
}
}
return false;
},close:function(_358){
},getLabel:function(_359){
if(this.displayField){
return _359.getValue(this.displayField);
}else{
if(this.displayExpression){
return wm.expression.getValue(this.displayExpression,_359,this.getRoot());
}else{
return undefined;
}
}
},getLabelAttributes:function(_35a){
if(this.displayField){
return [this.displayField];
}else{
if(this.displayExpression){
var _35b=this.displayExpression.match(wm.expression._getSourceRegEx);
for(var i=0;i<_35b.length;i++){
_35b[i]=_35b[i].substring(2,_35b[i].length-1);
}
return _35b;
}else{
return this.getAttributes();
}
}
},_end:0});
wm.Variable.extend({getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},getIdentity:function(_35c){
if(this.identity){
return _35c.getValue(this.identity);
}else{
return _35c.getIndexInOwner();
}
},getIdentityAttributes:function(_35d){
if(this.identity){
return [this.identity];
}else{
return ["_id"];
}
},fetchItemByIdentity:function(_35e){
var item=this.getItem(_35e.identity);
if(item){
_35e.onItem.call(_35e.scope||dojo.global,item,_35e);
}else{
_35e.onError.call(_35e.scope||dojo.global,_35e);
}
},_end:0});
wm.Variable.extend({forEachItem:function(_35f,_360){
if(!_360){
option={count:0,stopOnTrue:false};
}
var _361=_360.stopOnTrue;
var _362=this.getCount();
for(var i=_360.start||0;i<_362;i++){
var item=this.getItem(i);
if(_35f(item)&&_361){
return;
}
}
},get:function(id){
var keys=this.primaryKeyFields.split(/\s*,\s*/);
var _363={};
if(keys.length==0){
return null;
}
for(var i=0;i<keys.length;i++){
if(id instanceof wm.Variable){
_363[keys[i]]=id.getValue(keys[i]);
}else{
if(id!==null&&typeof id=="object"){
_363[keys[i]]=id[keys[i]];
}else{
_363[keys[i]]=id;
}
}
}
return this.query(_363,{limit:1}).matches[0];
},query:function(_364,_365){
var _366=[];
var _367=function(val1,val2,_368){
if(_368.ignoreCase){
val1=val1.toLowerCase();
val2=val2.toLowerCase();
}
if(val1==val2){
return true;
}else{
if(!_368.exactMatch&&typeof val1=="string"&&val1.indexOf(val2)==0){
return true;
}
}
return false;
};
this.forEachItem(function(item){
for(key in _364){
var _369=_364[key];
if(_369 instanceof wm.Variable){
_369=_369.getValue(_364[key]);
}else{
if(_369!=null&&typeof _369=="object"){
_369=_369[_364[key]];
}
}
if(!_367(_369,item.getValue(_364[key]),_365)){
return false;
}
}
result.push(item);
return _365.count?result.length<_365.count:false;
},{stopOnTrue:true,start:_365.start||0});
return {total:result.length,matches:result,forEach:function(_36a,_36b){
return dojo.forEach(_366,_36a,_36b);
},filter:function(_36c,_36d){
return dojo.filter(_366,_36c,_36d);
},map:function(_36e,_36f){
return dojo.map(_366,_36e,_36f);
}};
},put:function(data,_370){
this.addItem(data);
},remove:function(id){
var item=this.get(id);
if(item){
var _371=this.getItemIndex(item);
if(_371!=-1){
this.removeItem(_371);
}
}
},getIdentity:function(item){
var keys=this.primaryKeyFields.split(/\s*,\s*/);
var _372="";
for(var i=0;i<keys.length;i++){
if(_372){
_372+="|";
}
_372+=item.getValue(keys[i]);
}
return _372;
},getChildren:function(item){
var _373=[];
var _374=this._dataSchema;
for(var i in _374){
var s=_374[i];
if(s.isList||wm.typeManager.isStructuredType(s.type)){
_373.push(item.getValue(i));
}
}
return {total:_373.length,matches:_373,forEach:function(_375,_376){
return dojo.forEach(results,_375,_376);
},filter:function(_377,_378){
return dojo.filter(results,_377,_378);
},map:function(_379,_37a){
return dojo.map(results,_379,_37a);
}};
}});
}
}
if(!dojo._hasResource["wm.base.components.Service"]){
dojo._hasResource["wm.base.components.Service"]=true;
dojo.provide("wm.base.components.Service");
dojo.declare("wm.Service",wm.Component,{_operations:{},result:null,error:null,getOperationsList:function(){
var l=[];
for(var i in this._operations){
l.push(i);
}
l.sort();
return l;
},makePropEdit:function(_37b,_37c,_37d){
var prop=this.schema?this.schema[_37b]:null;
var name=(prop&&prop.shortname)?prop.shortname:_37b;
switch(_37b){
case "operation":
return new wm.SelectMenu(dojo.mixin(_37d,{options:this.getOperationsList()}));
}
},getOperation:function(_37e){
return this._operations[_37e];
},initService:function(){
},invoke:function(_37f,_380,_381){
var d=new dojo.Deferred(),m=this[_37f];
if(m){
var _382=m.apply(this,_380);
this.onResult();
wm.onidle(function(){
d.callback(_382);
});
}else{
this.onError();
wm.onidle(function(){
d.errback("operation: "+_37f+" does not exist.");
});
}
return d;
},onResult:function(_383){
this.error=null;
return this.result=_383;
},onError:function(_384){
this.result=null;
return this.error=_384;
}});
wm.services={byName:{},_services:{},add:function(_385){
return wm.services.byName[_385.name]=_385;
},remove:function(_386){
var n=_386.name;
this._destroyService(n);
delete wm.services._services[n];
delete wm.services.byName[n];
},getNamesList:function(){
var l=[],_387=wm.services.byName,s;
for(var i in _387){
s=_387[i];
if(!s.clientHide){
l.push(i);
}
}
l.sort();
return l;
},forEach:function(_388){
wm.forEach(this.byName,function(s){
_388(s);
});
},clear:function(){
var n=wm.services.byName,s;
for(var i in n){
s=n[i];
if(!s.isClientService){
this.remove(s);
}else{
this._destroyService(s);
}
}
},getService:function(_389,_38a){
var s;
if(_389){
if(this._services[_389]){
s=this._services[_389];
}else{
s=this._services[_389]=this._createService(_389,_38a);
}
if(!s._service){
s.initService();
}
}
return s;
},_createService:function(_38b,_38c){
var _38d="wm.JsonRpcService",s=this.byName[_38b];
if(!s){
s=this.add({name:_38b,ctor:_38d,clientHide:_38c});
}
var ctor=dojo.getObject(s.ctor||_38d);
var _38e=window["studio"]?studio.application||studio._application:app;
var _38f=new ctor({name:_38b,service:_38b,owner:_38e});
return _38f;
},_destroyService:function(_390){
wm.fire(this._services[_390.name],"destroy");
}};
wm.Object.extendSchema(wm.Service,{operation:{type:"string"}});
}
if(!dojo._hasResource["wm.base.components.ServiceQueue"]){
dojo._hasResource["wm.base.components.ServiceQueue"]=true;
dojo.provide("wm.base.components.ServiceQueue");
dojo.declare("wm.ServiceQueue",wm.Component,{services:"",init:function(){
this._services=[];
this._serviceConnections=[];
this.inherited(arguments);
},getServicesCount:function(){
return this._services&&this._services.length;
},getServicesList:function(){
for(var i=0,l=[],ss=this.services.split(","),s,v;(s=ss[i]);i++){
v=this.getValueById(dojo.string.trim(s));
if(v){
l.push(v);
}
}
return l;
},update:function(){
this.beginUpdate();
},beginUpdate:function(){
this._services=this.getServicesList();
this.connectServices();
this._currentService=0;
this.updateNextService();
},getCurrentService:function(){
return this._services[this._currentService];
},updateNextService:function(){
if(this._currentService<this.getServicesCount()){
var s=this.getCurrentService();
this._currentService++;
s.update();
}else{
this.completeUpdate();
}
},completeUpdate:function(){
this.disconnectServices();
},abortUpdate:function(){
this.disconnectServices();
},connectServices:function(){
this.disconnectServices();
dojo.forEach(this._services,dojo.hitch(this,function(s){
this._serviceConnections.push(dojo.connect(s,"onResult",this,"updateNextService"));
this._serviceConnections.push(dojo.connect(s,"onError",this,"abortUpdate"));
}));
},disconnectServices:function(){
dojo.forEach(this._serviceConnections,function(s){
dojo.disconnect(s);
});
}});
wm.ServiceQueue.extend({getAvailableServicesList:function(){
var d=wm.listComponentIds([studio.application,studio.page],wm.ServiceVariable);
d=d.concat(wm.listComponentIds([studio.application,studio.page],wm.NavigationCall));
var i=dojo.indexOf(d,this.owner.getId());
if(i!=-1){
d.splice(i,1);
}
return d;
},write:function(_391){
return this.services?this.inherited(arguments):null;
}});
}
if(!dojo._hasResource["wm.base.components.ServiceCall"]){
dojo._hasResource["wm.base.components.ServiceCall"]=true;
dojo.provide("wm.base.components.ServiceCall");
dojo.declare("wm.ServiceCall",null,{autoUpdate:false,startUpdate:false,_startUpdateComplete:false,service:"",operation:"",_operationInfo:{},inFlightBehavior:"none",destroy:function(){
delete this._inFlightBacklog;
wm.fire(this._requester,"cancel");
delete this._requester;
this.inherited(arguments);
},init:function(){
this.inherited(arguments);
this._inFlightBacklog=[];
if(this._isDesignLoaded){
this.subscribe("wmservices-changed",dojo.hitch(this,"servicesChanged"));
}
},postInit:function(){
this.inherited(arguments);
this.connectStartUpdate();
if(!this.$.queue){
new wm.ServiceQueue({name:"queue",owner:this});
}
this.initInput();
this.setService(this.service);
this._setOperation(this.operation);
},initInput:function(){
this.input=this.$.input;
if(!this.input){
this.input=this.createInput();
}
this.subscribe(this.input.getRuntimeId()+"-changed",this,"inputChanged");
},setInput:function(_392){
if(this.$.input){
this.$.input.setDataSet(_392);
}
},setService:function(_393){
if(this._inSetService){
return;
}
try{
this._inSetService=true;
this.service=_393;
var _394=this.getOwnerApp();
this._service=wm.services.getService(this.service,_394&&_394.declaredClass=="StudioApplication")||new wm.Service({});
wm.fire(this._service,"setServiceCall",[this]);
this._setOperation(this.operation,1);
}
catch(e){
}
finally{
delete this._inSetService;
}
},wmTypesChanged:function(){
var _395=this.getOwnerApp();
this._service=wm.services.getService(this.service,_395&&_395.declaredClass=="StudioApplication")||new wm.Service({});
wm.fire(this._service,"setServiceCall",[this]);
this._setOperation(this.operation,1);
if(this.setType){
this.setType(this.type);
}
},_setOperation:function(_396,_397){
this.operation=_396;
this._operationInfo=this.getOperationInfo(this.operation);
this.operationChanged(_397);
},setOperation:function(_398){
this._setOperation(_398);
this.doAutoUpdate();
},getOperationInfo:function(_399){
return (this._service&&this._service.getOperation(_399))||{};
},operationChanged:function(_39a){
this.input.operationChanged(this.operation,this._operationInfo.parameters);
},createInput:function(){
var i=new wm.ServiceInput({name:"input",owner:this});
i.operationChanged(this.operation,this._operationInfo.parameters);
return i;
},inputChanged:function(){
this.doAutoUpdate();
},connectStartUpdate:function(){
if(this.owner&&this.owner.start){
this.connectOnce(this.owner,"start",this,"doStartUpdate");
}
},setAutoUpdate:function(_39b){
this.autoUpdate=_39b;
this.doAutoUpdate();
},setStartUpdate:function(_39c){
this.startUpdate=_39c;
if(this.startUpdate&&!this._loading&&this.isDesignLoaded()){
this.updateInternal();
}
},canStartUpdate:function(){
return this.startUpdate&&!this._loading&&(!window["PhoneGap"]||!this.saveInPhoneGap||this.isEmpty()||this.autoUpdate);
},doStartUpdate:function(){
if(this.canStartUpdate()){
this.updateInternal();
this._startUpdateComplete=true;
}
},canAutoUpdate:function(){
return (this.autoUpdate&&!this._loading&&(!this.startUpdate||this._startUpdateComplete||this.isDesignLoaded()));
},doAutoUpdate:function(){
if(this.canAutoUpdate()){
wm.job(this.getRuntimeId()+".doAutoUpdate",wm.isMobile?20:1,dojo.hitch(this,"updateInternal"));
}
},update:function(){
return this._isDesignLoaded?this.doDesigntimeUpdate():this._update();
},updateInternal:function(){
return this._isDesignLoaded?this.doDesigntimeUpdate():this._update();
},addToBacklog:function(){
var d=new dojo.Deferred();
if(this.inFlightBehavior=="executeLast"){
this._inFlightBacklog.pop();
}
if(this.inFlightBehavior=="executeLast"||this.inFlightBehavior=="executeAll"){
this._inFlightBacklog.push({args:this.getArgs(),operation:this.operation,deferred:d,eventChain:app.debugDialog?app.debugDialog.cacheEventChain():undefined});
}else{
d.errback("Unable to fire "+this.toString()+" because it is already firing, and the inFlightBehavior property is unset");
}
return d;
},_update:function(){
if(this._requester&&!this._isDesignLoaded){
var d=this.addToBacklog();
return d;
}
if(this.canUpdate()){
this.onBeforeUpdate(this.input);
wm.cancelJob(this.getRuntimeId()+".doAutoUpdate");
return this.request();
}else{
var d=new dojo.Deferred();
d.errback("ServiceCall.canUpdate returns false");
return d;
}
},canUpdate:function(){
var info={canUpdate:this._getCanUpdate()};
this.onCanUpdate(info);
return info.canUpdate;
},_getCanUpdate:function(){
return this._service&&this.operation;
},getArgs:function(){
return this.input.getArgs();
},getOperationType:function(){
var _39d=this._service;
var _39e;
if(_39d){
_39e=_39d._operations[this.operation];
}
if(_39e){
return _39e.operationType;
}else{
return "";
}
},request:function(_39f,_3a0,_3a1){
var args;
try{
args=_39f||this.getArgs();
}
catch(e){
this.error(e);
return;
}
var d=this._requester=this._service.invoke(_3a0||this.operation,args,this.owner,this);
if(_3a1){
d.then(function(_3a2){
_3a1.callback(_3a2);
},function(_3a3){
_3a1.errback(_3a3);
});
}
return this.processRequest(d);
},processRequest:function(_3a4){
var d=_3a4;
if(d){
d.addCallbacks(dojo.hitch(this,"result"),dojo.hitch(this,"error"));
return d;
}
},result:function(_3a5){
this._requester=false;
this.processResult(_3a5);
this._updateNextInQueue();
return _3a5;
},_updateNextInQueue:function(){
if(!this._isDesignLoaded&&this._inFlightBacklog&&this._inFlightBacklog.length){
wm.onidle(this,function(){
var _3a6=this._inFlightBacklog.shift();
if(_3a6){
this.request(_3a6.args,_3a6.operation,_3a6.deferred);
}
});
}
},processResult:function(_3a7){
this.onResult(_3a7);
this.onSuccess(_3a7);
if(!this.isDestroyed&&this.$.queue){
this.$.queue.update();
}
},error:function(_3a8){
this._requester=false;
this.processError(_3a8);
this._updateNextInQueue();
return _3a8;
},processError:function(_3a9){
this.onResult(_3a9);
this.onError(_3a9);
},_onCanUpdateBeforeStart:1,onCanUpdate:function(_3aa){
},onBeforeUpdate:function(_3ab){
},onResult:function(_3ac){
},onSuccess:function(_3ad){
},onError:function(_3ae){
}});
dojo.declare("wm.ServiceInput",wm.Variable,{_allowLazyLoad:false,_getSchemaForType:function(_3af){
return this.owner&&this.owner._operationInfo?this.owner._operationInfo.parameters:null;
},isDataProp:function(_3b0){
return wm.isEmpty(this._dataSchema)||(_3b0 in this._dataSchema);
},operationChanged:function(_3b1,_3b2){
this.setType(_3b1+"Inputs");
this.setDataSchema(_3b2);
if(this.$.binding&&_3b2){
this.$.binding.refresh();
}
},getArgsHash:function(){
var data=this.getData(),args={},d;
for(var p in this._dataSchema){
args[p]=(data[p]===undefined||data[p]===null)?"":data[p];
}
return args;
},getArgs:function(){
wm.Variable.convertToHashMaps=true;
try{
var data=this.getData(true),args=[],d;
}
catch(e){
}
wm.Variable.convertToHashMaps=false;
for(var p in this._dataSchema){
if(data){
if(data[p] instanceof Date){
d=data[p].getTime();
}else{
d=data[p];
}
}else{
d=undefined;
}
args.push(d!==undefined?d:null);
}
return args;
}});
wm.ServiceCall.extend({clearInput:"(clear input)",updateNow:"(update now)",queue:"(serviceCalls)",servicesChanged:function(){
if(this.service){
var _3b3=this.getOwnerApp();
this._service=wm.services.getService(this.service,_3b3&&_3b3.declaredClass=="StudioApplication");
if(!this._service){
this._service=new wm.Service({});
}
this._setOperation(this.operation,1);
}
},getUniqueName:function(_3b4){
if(_3b4==="input"){
return "input";
}
return this.inherited(arguments);
},doDesigntimeUpdate:function(){
this._designTime=true;
return studio.makeLiveDataCall(dojo.hitch(this,"_update"));
},doClearInput:function(){
this.input.destroy();
this.input=this.createInput();
},set_operation:function(_3b5){
this.setOperation(_3b5);
if(this.isDesignLoaded()&&studio.selected==this){
studio.inspector.inspect(studio.selected);
}
},getServicesList:function(){
return [""].concat(wm.services.getNamesList()||[]);
},showQueueDialog:function(){
var d=wm.ServiceQueue.dialog,q=this.$.queue;
if(d){
d.page.binding=q;
d.page.update();
}else{
wm.ServiceQueue.dialog=d=new wm.PageDialog({name:"queueDialog",owner:studio,contentWidth:600,contentHeight:400,hideControls:true,pageName:"QueueDialog",pageProperties:{binding:q}});
}
d.show();
},makePropEdit:function(_3b6,_3b7,_3b8){
var prop=this.schema?this.schema[_3b6]:null;
var name=(prop&&prop.shortname)?prop.shortname:_3b6;
switch(_3b6){
case "service":
return new wm.SelectMenu(dojo.mixin(_3b8,{options:this.getServicesList()}));
case "operation":
var s=this._service,_3b9=s&&s.getOperation(_3b7),_3ba=s&&s.getOperationsList();
if(!_3b9){
_3b7=_3ba?_3ba[0]:"";
if(_3b7&&_3b7!=this.operation){
this.set_operation(_3b7);
}
}
if(_3ba){
return new wm.SelectMenu(dojo.mixin(_3b8,{options:_3ba}));
}
break;
}
return this.inherited(arguments);
}});
wm.ServiceInputVariable=wm.ServiceInput;
}
if(!dojo._hasResource["wm.base.components.ServiceVariable"]){
dojo._hasResource["wm.base.components.ServiceVariable"]=true;
dojo.provide("wm.base.components.ServiceVariable");
dojo.declare("wm.ServiceVariable",[wm.Variable,wm.ServiceCall],{loadingDialog:null,downloadFile:false,_page:0,maxResults:0,designMaxResults:50,transposeHashMap:function(_3bb){
var data=[];
wm.forEachProperty(_3bb,function(_3bc,_3bd){
data.push({name:_3bd,dataValue:_3bc});
});
return data;
},processResult:function(_3be){
if(wm.isHashMapType(this.type)){
_3be=this.transposeHashMap(_3be);
}
this.setData(_3be);
if(this.service=="securityService"&&this.operation=="logout"){
wm.logoutSuccess();
}
this.inherited(arguments);
},processError:function(_3bf){
if(_3bf&&_3bf.message&&_3bf.message.indexOf("Invalid Long Polling Request:")===0){
this.request();
return;
}
this.handleSecurityErrors(_3bf);
this.inherited(arguments);
},handleSecurityErrors:function(_3c0){
var _3c1=(dojo.isObject(_3c0)?_3c0.message:_3c0).match(/(\d+)$/);
var _3c2=(_3c1)?_3c1[0]:"";
if(_3c2==403){
dojo.publish("session-expiration-servicecall",[this]);
if(app&&app.onSessionExpiration){
app.onSessionExpiration();
}
}else{
dojo.publish("service-variable-error",[this,_3c0]);
}
},setType:function(){
this.inherited(arguments);
if(this._isDesignLoaded&&this.input){
this.setService(this.service);
if(this==studio.selected){
studio.inspector.inspect(this);
}
}
},operationChanged:function(_3c3){
this.inherited(arguments);
var op=this._operationInfo;
if(op||_3c3){
this.setType(op.returnType);
this.clearData();
}
if((this.autoUpdate||this.startUpdate)&&!this._loading&&this.isDesignLoaded()){
this.update();
}
},getArgs:function(){
var args=this.inherited(arguments);
var _3c4=this.getOperationType();
if(_3c4=="hqlquery"){
var max=this.isDesignLoaded()?this.designMaxResults:this.maxResults;
var _3c5=max?{maxResults:max,firstResult:this.firstRow||0}:{};
args.push(_3c5);
}
return args;
},getDebugArgs:function(){
return this.input.getData();
},getTotal:function(){
return this.getCount();
},getPageCount:function(){
return Math.ceil(this.getTotal()/(this.getCount()||1));
},setPage:function(_3c6){
this._page=Math.max(0,Math.min(this.getPageCount()-1,_3c6));
this.firstRow=this._page*this.maxResults;
this.update();
},getPage:function(){
return this._page;
},setFirstPage:function(){
this.setPage(0);
},setPreviousPage:function(){
this.setPage(this._page-1);
},setNextPage:function(){
this.setPage(this._page+1);
},setLastPage:function(){
this.setPage(this.getPageCount());
},_update:function(){
if(this.loadingDialog&&!this._isDesignLoaded){
if(this.loadingDialog instanceof wm.LoadingDialog==false){
this.loadingDialog=new wm.LoadingDialog({owner:this,name:"loadingDialog",widgetToCover:this.loadingDialog});
this.loadingDialog.setServiceVariableToTrack(this);
}
}
return this.inherited(arguments);
},toString:function(_3c7){
var t=_3c7||"";
t+="; "+wm.getDictionaryItem("wm.ServiceVariable.toString_FIRING",{isFiring:Boolean(this._requester)});
return this.inherited(arguments,[t]);
},log:function(_3c8,_3c9,_3ca,_3cb){
if(!app.debugDialog){
return;
}
if(!this.debugId){
this.debugId=[];
}
if((_3c8!="serviceCall"&&_3c8!="serviceCallResponse")){
this._debug={trigger:_3c9||_3c8,eventName:_3c8,request:"",lastUpdate:new Date()};
}
if(_3c8=="autoUpdate"){
try{
var i=0;
var _3cc=arguments.callee.caller;
while(_3cc&&_3cc.nom!="dataValueChanged"&&i<15){
_3cc=_3cc.caller;
i++;
}
if(_3cc&&_3cc.nom=="dataValueChanged"){
var _3cd=_3cc.arguments[1];
this._debug.eventName="inputChanged: "+_3cc.arguments[0]+" set to "+(_3cd instanceof wm.Component?_3cd.toString():_3cd);
}
}
catch(e){
}
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"autoUpdate",sourceDescription:"An input has changed",resultDescription:"Because autoUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
}else{
if(_3c8=="start"){
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"start",sourceDescription:"Owner has loaded",resultDescription:"Because startUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.owner.getRuntimeId()})});
}else{
if(_3c8=="autoUpdateOnStart"){
var page=this.getParentPage()||app;
this._debug.trigger="autoUpdate"+(page&&page._loadingPage?": onStart":"unknown source");
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"autoUpdate",sourceDescription:"An input has initialized",resultDescription:"Because autoUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.owner.getRuntimeId()})});
}else{
if(_3c8=="update"){
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"update",sourceDescription:(_3c9?_3c9+"() called ":"")+this.getRuntimeId()+".update()",resultDescription:"Processing request to fire service variable",method:"update",affectedId:this.getRuntimeId(),firingId:""})});
}else{
if(_3c8=="serviceCall"){
if(_3ca&&_3ca.eventChain){
var _3ce=app.debugDialog.cacheEventChain();
app.debugDialog.restoreEventChain(_3ca.eventChain);
}
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"serviceCall",sourceDescription:this.getRuntimeId()+".update()",resultDescription:"Sending request to server",method:"request",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
this.debugEventChain=app.debugDialog.cacheEventChain();
if(_3ce){
app.debugDialog.restoreEventChain(_3ce);
}
}else{
if(_3c8=="serviceCallResponse"){
app.debugDialog.restoreEventChain(this.debugEventChain);
delete this.debugEventChain;
this.debugId.push({eventType:_3c8,id:app.debugDialog.newLogEvent({eventType:"serviceCallResponse",sourceDescription:"Response received from server",resultDescription:_3cb?"Calling "+this.getRuntimeId()+".onError()":"Calling "+this.getRuntimeId()+".onSuccess()",method:_3cb?"processError":"processResult",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
if(this._debug&&this._debug.lastUpdate){
this._debug.duration=new Date().getTime()-this._debug.lastUpdate.getTime();
}
}
}
}
}
}
}
if(_3c8!="serviceCall"&&_3c8!="serviceCallResponse"&&this._debug||this._debug&&!this._debug.eventId){
this._debug.eventId=this.debugId[this.debugId.length-1].id;
}
},endLog:function(_3cf){
if(!app.debugDialog){
return;
}
if(this.debugId&&this.debugId.length){
var _3d0=this.debugId.pop();
if(_3d0.eventType==_3cf){
app.debugDialog.endLogEvent(_3d0.id);
}
}
if(_3cf=="serviceCallResponse"){
app.debugDialog.clearEventChain();
}
},inputChanged:function(){
if(this.autoUpdate){
if(app.debugDialog){
this.log("autoUpdate");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("autoUpdate");
}
}
},doStartUpdate:function(){
if(this.canStartUpdate()){
if(app.debugDialog){
this.log("start");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("start");
}
}
},doAutoUpdate:function(){
if(this.canAutoUpdate()){
if(app.debugDialog&&!this._debug&&this._inPostInit){
this.log("autoUpdateOnStart");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("autoUpdateOnStart");
}
}
},request:function(_3d1,_3d2,_3d3){
if(app.debugDialog&&this._debug){
this._debug.request=this.getDebugArgs();
}
if(app.debugDialog){
this.log("serviceCall",null,_3d2);
this.endLog("serviceCall",null,_3d2);
}
if(!this.downloadFile){
return this.inherited(arguments);
}else{
var args=_3d1||this.input.getArgsHash();
var _3d4=window.location.href;
_3d4=_3d4.replace(/\?.*$/,"");
_3d4=_3d4.replace(/\/[^\/]*$/,"/");
var _3d5=_3d4+this._service._service.serviceUrl.replace(/\.json$/,".download");
var _3d6=dojo.byId("downloadFrame");
if(_3d6){
_3d6.parentNode.removeChild(_3d6);
}
_3d6=document.createElement("iframe");
dojo.attr(_3d6,{id:"downloadFrame",name:"downloadFrame"});
dojo.style(_3d6,{top:"1px",left:"1px",width:"1px",height:"1px",visibility:"hidden"});
dojo.body().appendChild(_3d6);
var _3d7=_3d6.contentDocument||_3d6.contentWindow.document;
_3d7.open("text/html");
_3d7.close();
var form=_3d7.createElement("form");
dojo.attr(form,{id:"downloadForm",method:"POST",action:_3d5});
var _3d8=_3d7.createElement("input");
dojo.attr(_3d8,{name:"method",value:_3d2||this.operation});
form.appendChild(_3d8);
wm.forEachProperty(args,function(_3d9,name){
var _3da=_3d7.createElement("textarea");
dojo.attr(_3da,{name:name,value:_3d9});
form.appendChild(_3da);
});
_3d7.body.appendChild(form);
form.submit();
}
},result:function(_3db){
delete this._lastError;
if(app.debugDialog){
this.log("serviceCallResponse");
if(this._jsonRpcServiceDeferred&&this._jsonRpcServiceDeferred.xhr){
var text=this._jsonRpcServiceDeferred.xhr.responseText;
this._lastResponse=(text||"").length>1000?text.substring(0,1000)+"...":text;
}
}
var _3dc=this.inherited(arguments);
if(app.debugDialog){
this.endLog("serviceCallResponse");
}
return _3db;
},error:function(_3dd){
if(djConfig.isDebug){
this.log("serviceCallResponse");
}
this._lastError=_3dd;
this.inherited(arguments);
if(djConfig.isDebug){
this.endLog("serviceCallResponse");
}
return _3dd;
}});
}
if(!dojo._hasResource["wm.base.widget.Container"]){
dojo._hasResource["wm.base.widget.Container"]=true;
dojo.provide("wm.base.widget.Container");
wm.define("wm.Container",wm.Control,{imageList:"",border:"0",container:true,lock:false,freeze:false,classNames:"wmcontainer",autoScroll:false,fitToContentWidth:false,fitToContentHeight:false,fitToContent:false,_needsFitToContent:false,constructor:function(){
this.c$=[];
},init:function(){
if(this.dockRight){
app.dockRight=this;
}
if(this.dockLeft){
app.dockLeft=this;
}
if(this.dockTop){
app.dockTop=this;
}
if(this.dockBottom){
app.dockBottom=this;
}
if(this.autoScroll&&app._touchEnabled&&!wm.disableTouchScroll){
var node=this.domNode;
this.connect(node,wm.isFakeMobile?"mousedown":"touchstart",this,"_ontouchstart");
if(!wm.isFakeMobile){
this.connect(node,"touchmove",this,"_ontouchmove");
this.connect(node,"touchend",this,"_ontouchend");
}
}
this.inherited(arguments);
this.setLayoutKind(this.layoutKind);
this.domNode.box=this.box="";
this._needsFitToContent=this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
},_ontouchstart:function(e){
if(app._touchY&&app._touchY.animationId){
window.clearInterval(app._touchY.animationId);
delete app._touchY.animationId;
}
if(!this._xscrollY){
return;
}
var node=this.domNode;
var _3de=e.touches?e.touches[0].target:e.target;
if(_3de.tagName=="INPUT"||_3de.tagName=="TEXTAREA"){
_3de.focus();
return;
}
dojo.stopEvent(e);
var y=e.touches&&e.touches.length?e.touches[0].screenY:e.screenY;
app._touchY={y:y,initialY:y,targetNode:_3de,targetWidget:this,time:new Date().getTime(),moved:false};
this.connect(node,wm.isFakeMobile?"mousemove":"touchmove",this,"_ontouchmove");
this.connect(node,wm.isFakeMobile?"mouseup":"touchend",this,"_ontouchend");
},_ontouchmove:function(e){
if(!app._touchY){
return;
}
dojo.publish("wmTouchMove",[this]);
var y=e.touches&&e.touches.length?e.touches[0].screenY:e.screenY;
var _3df=e.touches&&e.touches.length?e.touches[0].target:e.target;
if(_3df!=app._touchY.targetNode&&!wm.isFakeMobile){
return;
}
var node=this.domNode;
if(node.scrollHeight<=node.clientHeight){
return;
}
var _3e0=node.scrollTop;
var _3e1=app._touchY.y;
if(y==_3e1){
dojo.stopEvent(e);
return;
}
if(y<_3e1&&node.clientHeight+node.scrollTop>=node.scrollHeight||y>_3e1&&node.scrollTop<=0){
return;
}
var _3e2=_3e1-y;
var time=new Date().getTime();
var _3e3=time-app._touchY.time;
var _3e4=node.scrollTop;
var _3e5=_3e4+_3e2;
if(_3e5<0){
_3e5=0;
}else{
if(_3e5>node.scrollHeight){
_3e5=node.scrollHeight;
}
}
node.scrollTop=_3e5;
var _3e6=_3e0-node.scrollTop;
app._touchY.y=y;
app._touchY.velocity=_3e2/_3e3;
app._touchY.time=new Date().getTime();
if(Math.abs(y-app._touchY.initialY)>5){
app._touchY.moved=true;
}
dojo.stopEvent(e);
},_ontouchend:function(e){
var node=this.domNode;
if(node.scrollHeight<=node.clientHeight){
return;
}
if(app._touchY.velocity!=Infinity&&Math.abs(app._touchY.velocity)>0.15){
if(app._touchY.animationId){
window.clearInterval(app._touchY.animationId);
}
app._touchY.animationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
},_onAnimateScroll:function(){
var node=this.domNode;
app._touchY.velocity*=0.9;
var top=node.scrollTop;
var _3e7=node.scrollTop+Math.min(app._touchY.velocity*50,node.clientHeight);
node.scrollTop=_3e7;
if(app._touchY.velocity==Infinity||Math.abs(top-_3e7)<=1){
window.clearInterval(app._touchY.animationId);
return;
}
node.scrollTop+=Math.min(app._touchY.velocity*50,node.clientHeight);
},postInit:function(){
if(this.isDesignLoaded()){
this.setLock(this.lock);
}
this.inherited(arguments);
if(this.disabled){
wm.forEachProperty(this.widgets,dojo.hitch(this,function(w,name){
w.setParentDisabled(this._disabled);
}));
}
},connectOnEnterKey:function(){
this.connect(this.domNode,"onkeypress",this,"keypress");
},keypress:function(evt){
var self=this;
if(evt.keyCode==dojo.keys.ENTER&&evt.target.tagName!="TEXTAREA"){
wm.job(this.getRuntimeId()+".enterkeypress",50,dojo.hitch(this,function(){
if(!this.isDestroyed){
this.onEnterKeyPress(evt);
}
}));
}
},setThemeStyleType:function(_3e8){
var _3e9=this.getThemeStyleType();
if(_3e9){
this.removeUserClass(_3e9);
}
if(_3e8){
this.addUserClass(_3e8);
}
},getThemeStyleType:function(){
var _3ea=["MainContent","EmphasizedContent","HeaderContent"];
if(this._classes&&this._classes.domNode){
for(var i=0;i<_3ea.length;i++){
if(dojo.indexOf(this._classes.domNode,_3ea[i])!=-1){
return _3ea[i];
}
}
}
},destroy:function(){
if(this.dockRight){
delete app.dockRight;
}else{
if(this.dockLeft){
delete app.dockLeft;
}else{
if(this.dockTop){
delete app.dockTop;
}else{
if(this.dockBottom){
delete app.dockBottom;
}
}
}
}
if(this.domNode&&this.domNode.box){
delete this.domNode.box;
}
this.inherited(arguments);
},bc:function(){
this.inherited(arguments);
delete this.layoutJustify;
if(this.layoutAlign){
this.contentAlign=this.layoutAlign;
delete this.layoutAlign;
}
if(this.layoutFit){
this.fitToContentWidth=this.fitToContentHeight=this.layoutFit;
delete this.layoutFit;
}
if(this.box=="h"){
this.layoutKind="left-to-right";
}
if(this.boxPosition){
var _3eb=["topLeft","center","bottomRight"],_3ec=["top","middle","bottom"],_3ed=["left","center","right"],h=this.layoutKind=="left-to-right",i=dojo.indexOf(_3eb,this.boxPosition);
if(i!=-1){
if(h){
this.horizontalAlign=_3ed[i];
}else{
this.verticalAlign=_3ec[i];
}
}
}
},addWidget:function(_3ee){
this.inherited(arguments);
if(this.box=="h"&&!_3ee.width){
_3ee.setProp("width","64px");
}else{
if(this.box=="v"&&!_3ee.height){
_3ee.setProp("height","64px");
}
}
},getOrderedWidgets:function(){
return this.c$;
},addControl:function(_3ef){
this.c$.push(_3ef);
},removeControl:function(_3f0){
if(this.c$){
for(var i=0,c;c=this.c$[i];i++){
if(c==_3f0){
this.c$.splice(i,1);
return i;
}
}
}
},removeAllControls:function(){
while(this.c$.length){
var c=this.c$[0];
this.removeControl(c);
c.destroy();
}
this.reflow();
},insertControl:function(_3f1,_3f2){
this.c$.splice(_3f2,0,_3f1);
},moveControl:function(_3f3,_3f4){
var i0=this.removeControl(_3f3);
if(i0<_3f4){
_3f4--;
}
this.c$.splice(_3f4,0,_3f3);
},indexOfControl:function(_3f5){
for(var i=0,c;c=this.c$[i];i++){
if(c==_3f5){
return i;
}
}
return -1;
},nextSibling:function(_3f6,_3f7){
for(var i=0,c;c=this.c$[i];i++){
if(c==_3f6){
if(!_3f7){
return this.c$[i+1];
}else{
for(var j=i+1;j<this.c$.length;j++){
if(this.c$[j].showing){
return this.c$[j];
}
}
}
}
}
},prevSibling:function(_3f8,_3f9){
for(var i=0,c;c=this.c$[i];i++){
if(c==_3f8){
if(!_3f9){
return this.c$[i-1];
}else{
for(var j=i-1;j>=0;j--){
if(this.c$[j].showing){
return this.c$[j];
}
}
}
}
}
},setAutoScroll:function(_3fa){
this._xscrollX=false;
this._xscrollY=false;
this.inherited(arguments);
this.reflow();
},adjustSetSizeProp:function(n,v){
if(n=="height"&&this.fitToContentHeight&&this.getPreferredFitToContentHeight){
return this.getPreferredFitToContentHeight()+"px";
}
if(n=="width"&&this.fitToContentWidth&&this.getPreferredFitToContentWidth){
return this.getPreferredFitToContentWidth()+"px";
}
return v;
},reflow:function(){
this._boundsDirty=true;
if(!this.isReflowEnabled()){
return;
}
if(this.parent&&(this.fitToContent||this.parent.fitToContent)){
if(this._needsFitToContent){
delete this._needsFitToContent;
}
this.parent.reflow();
}else{
this.flow();
}
},adjustFlowForMobile:function(){
if(this.autoScroll||this.fitToContentHeight||studio.currentDeviceType=="desktop"||this._percEx.h){
return;
}
var max=0;
if(this.layoutKind=="left-to-right"){
max=this.bounds.h;
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(c.enableTouchHeight&&!c._percEx.h&&c.mobileHeight){
if(c.bounds.h>max){
max=c.bounds.h;
}
}
}
}else{
var _3fb=false;
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(c.enableTouchHeight&&!c._percEx.h&&c.mobileHeight){
_3fb=true;
break;
}
}
if(_3fb){
max=this.getPreferredFitToContentHeight();
}
}
if(max>this.bounds.h){
this.enableTouchHeight=true;
var h=max+"px";
this.mobileHeight=h;
this.setHeight(h);
}
},flow:function(){
if(this._boundsDirty&&this.isReflowEnabled()){
if(this._isDesignLoaded){
this.adjustFlowForMobile();
}
this.layout.flow(this,false);
}
},renderControls:function(){
for(var i=0,c;c=this.c$[i];i++){
if(c.showing){
c.renderBounds();
}
}
},removeDelayedReflow:function(){
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
},delayedReflow:function(){
if(wm.Container.delayedReflowWidgets[this.getRuntimeId()]){
return;
}
wm.Container.delayedReflowWidgets[this.getRuntimeId()]=this;
var _3fc=[];
try{
wm.forEachProperty(wm.Container.delayedReflowWidgets,dojo.hitch(this,function(_3fd,_3fe){
if(_3fd===this){
}else{
if(_3fd.parent===this.parent){
delete wm.Container.delayedReflowWidgets[_3fe];
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
_3fc.push(this.parent);
}else{
if(this.isAncestor(_3fd)){
delete wm.Container.delayedReflowWidgets[_3fe];
}else{
if(_3fd.isAncestor(this)){
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
}
}
}
}
}));
}
catch(e){
}
for(var i=0;i<_3fc.length;i++){
_3fc[i].delayedReflow();
}
if(!wm.Container._delayedReflowWidgetsId){
wm.Container._delayedReflowWidgetsId=window.setTimeout(wm.Container.runDelayedReflow,1);
}
},forEachControl:function(_3ff,_400){
dojo.forEach(this.c$,function(_401){
_3ff.apply(_401,(_400)?_400:[]);
});
},nodeBoundsChange:function(){
},imageListChanged:function(){
for(var i=0,c;c=this.c$[i];i++){
wm.fire(c,"imageListChanged");
}
},setImageList:function(_402){
this.imageList=_402;
this.imageListChanged();
},updateIsDirty:function(){
this.setValue("isDirty",this.getIsDirty());
wm.fire(this.parent,"updateIsDirty");
},getIsDirty:function(){
for(var i in this.widgets){
var w=this.widgets[i];
if(w.isDirty){
return true;
}else{
if(w.isDirty===undefined&&w.getIsDirty&&w.getIsDirty()){
return true;
}
}
}
},validate:function(){
this.setValue("invalid",this.getInvalid());
wm.fire(this.parent,"validate");
},getInvalid:function(){
var p=this.getParentPage();
for(var i in this.widgets){
var w=this.widgets[i];
if(p&&p.validateVisibleOnly&&(!w.showing||wm.Layer&&w instanceof wm.Layer&&!w.isActive())){
continue;
}
if(w.invalid){
return true;
}else{
if(w.invalid===undefined&&w.getInvalid&&w.getInvalid()){
return true;
}
}
}
if(dojo.isFunction(this.customGetValidate)){
return !this.customGetValidate();
}
return false;
},customGetValidate:function(){
return true;
},getInvalidWidget:function(){
var p=this.getParentPage();
for(var i in this.widgets){
var w=this.widgets[i];
if(p&&p.validateVisibleOnly&&(!w.showing||wm.Layer&&w instanceof wm.Layer&&!w.isActive())){
continue;
}
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
if(w.getInvalid()){
return w;
}
}else{
if(wm.isInstanceType(w,wm.Container)){
var tmp=w.getInvalidWidget();
if(tmp){
return tmp;
}
}
}
}
return null;
},getLock:function(){
return this.lock||(this.parent&&wm.fire(this.parent,"getLock"))||false;
},setLock:function(_403){
var _404=this.lock;
this.lock=_403;
if(window["studio"]&&(this.lock!=_404||this.lock)){
studio.refreshComponentOnTree(this);
}
},getFreeze:function(){
return this.freeze||this.getLock();
},isWidgetTypeAllowed:function(_405){
return true;
},_reorientChildren:function(_406){
var _407=this.containerNode||this.domNode;
wm.forEachProperty(this.widgets,function(w){
if(w.domNode.parentNode!=_407){
return;
}
var ww=w.width;
w.width=w.height;
w.height=ww;
w.updateBounds();
});
},clearData:function(){
var _408=function(w){
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
w.clear();
}
};
wm.forEachWidget(this,_408);
},resetData:function(){
var _409=function(w){
if(w instanceof wm.AbstractEditor){
w.reset();
}
};
wm.forEachWidget(this,_409);
},clearDirty:function(){
this.setValue("isDirty",false);
var _40a=function(w){
if(w instanceof wm.AbstractEditor){
w.clearDirty();
}
};
wm.forEachWidget(this,_40a);
},getCurrentMaxWidth:function(){
if(!this.parent||!this.parent.getCurrentMaxWidth){
return this.bounds.w-this.padBorderMargin.l-this.padBorderMargin.r;
}else{
if(this.fitToContent){
return this.parent.getCurrentMaxWidth();
}else{
if(this._percEx.w&&this.layoutKind=="top-to-bottom"){
return this.parent.getCurrentMaxWidth();
}else{
if(this._percEx.w&&this.layoutKind=="top-to-bottom"){
var _40b=this.parent.layout.getMaxFreeSpace(this.parent.c$,"w",this.parent.bounds.w-this.parent.padBorderMargin.l-this.parent.padBorderMargin.r);
return _40b+this.bounds.w;
}else{
return this.bounds.w-this.padBorderMargin.l-this.padBorderMargin.r;
}
}
}
}
},getCurrentMaxHeight:function(){
if(!this.parent||!this.parent.getCurrentMaxHeight){
return this.bounds.h-this.padBorderMargin.t-this.padBorderMargin.b;
}else{
if(this.fitToContent){
return this.parent.getCurrentMaxHeight();
}else{
if(this._percEx.h&&this.layoutKind=="left-to-right"){
return this.parent.getCurrentMaxHeight();
}else{
if(this._percEx.h&&this.layoutKind=="top-to-bottom"){
var _40c=this.parent.layout.getMaxFreeSpace(this.parent.c$,"h",this.parent.bounds.h-this.parent.padBorderMargin.t-this.parent.padBorderMargin.b);
return _40c+this.bounds.h;
}else{
return this.bounds.h-this.padBorderMargin.t-this.padBorderMargin.b;
}
}
}
}
}});
wm.Container.extend({getPreferredFitToContentWidth:function(){
var _40d=this.padBorderMargin.r+this.padBorderMargin.l;
var max=0;
var sum=0;
var _40e=0;
var v;
var _40f=0;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
_40f++;
if(c.fitToContentWidth||c instanceof wm.Container&&c._percEx.w==100&&!c.autoScroll&&c.parent&&(c.parent.fitToContentWidth||c.parent.autoScroll)){
v=c.getPreferredFitToContentWidth();
}else{
if(!c._percEx.w){
v=c.bounds.w;
}else{
v=parseInt(c.minWidth)||c.getMinWidthProp();
if(c.bounds.w>v||this.c$.length==1){
if(_40e<100){
_40e+=c._percEx.w;
}
}else{
_40e=100;
}
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _410=_40f==1;
if(!_410&&_40e&&_40e<100){
sum=Math.round(sum*100/_40e);
max=Math.round(max*100/_40e);
}
if(this.layoutKind=="fluid"){
return Math.min(this.bounds.w,max);
}
var _411=((this.layoutKind=="top-to-bottom")?max:sum)+_40d;
return Math.max(this.minWidth,Math.max(_411,wm.Control.prototype.getMinWidthProp.call(this)));
},getFluidHeight:function(){
return this.layout.flow(this,true);
},getPreferredFitToContentHeight:function(){
if(this.layoutKind=="fluid"){
return this.getFluidHeight();
}
var _412=this.padBorderMargin.t+this.padBorderMargin.b;
var max=0;
var sum=0;
var _413=0;
var v;
var _414=0;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
_414++;
if(c.fitToContentHeight||c instanceof wm.Container&&c._percEx.h==100&&!c.autoScroll&&c.parent&&(c.parent.fitToContentHeight||c.parent.autoScroll)){
v=c.getPreferredFitToContentHeight();
}else{
if(!c._percEx.h){
v=c.bounds.h;
}else{
v=c.getMinHeightProp();
if(c.bounds.h>v||this.c$.length==1){
if(_413<100){
_413+=c._percEx.h;
}
}else{
_413=100;
}
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _415=_414==1;
if(!_415&&_413&&_413<100){
sum=Math.round(sum*100/_413);
max=Math.round(max*100/_413);
}
var _416=((this.layoutKind=="left-to-right")?max:sum)+_412;
return Math.max(_416,wm.Control.prototype.getMinHeightProp.call(this));
},setBestWidth:function(){
this._inDesignResize=true;
this.setWidth(this.getPreferredFitToContentWidth()+"px");
delete this._inDesignResize;
},setBestHeight:function(){
this._inDesignResize=true;
this[this._isDesignLoaded?"set_height":"setHeight"](this.getPreferredFitToContentHeight()+"px");
delete this._inDesignResize;
},getMinWidthProp:function(){
if(this.fitToContentWidth){
return this.getPreferredFitToContentWidth();
}else{
return this.inherited(arguments);
}
},getMinHeightProp:function(){
if(this.fitToContentHeight){
return this.getPreferredFitToContentHeight();
}else{
return this.inherited(arguments);
}
},focusFirstEditor:function(){
for(var i=0;i<this.c$.length;i++){
var w=this.c$[i];
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
w.focus();
return w;
}else{
if(wm.isInstanceType(w,wm.Container)){
var tmp=w.focusFirstEditor();
if(tmp){
return tmp;
}
}
}
}
return null;
},clearEditors:function(){
return this.clearData();
},onEnterKeyPress:function(_417){
}});
wm.Container.extend({layoutKind:"top-to-bottom",horizontalAlign:"justified",verticalAlign:"justified",setLayoutKind:function(_418){
if(this.layoutKind!=_418||!this.layout){
this.layoutKind=_418;
this.layout=wm.layout.cache[_418];
}
if(this.isDesignLoaded()){
dojo.publish("LayoutKindChanged",[this]);
}
this.reflow();
},setHorizontalAlign:function(_419){
this.horizontalAlign=_419;
this.reflow();
},setVerticalAlign:function(_41a){
this.verticalAlign=_41a;
this.reflow();
},setFitToContentWidth:function(_41b){
this.fitToContentWidth=_41b;
this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
this.updateBounds();
this.reflowParent();
this.calcFitToContent();
this.reflowParent();
},setFitToContentHeight:function(_41c){
this.fitToContentHeight=_41c;
this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
this.updateBounds();
this.reflowParent();
this.calcFitToContent();
this.reflowParent();
},calcFitToContent:function(){
if(this.fitToContentHeight){
this.height=this.bounds.h+"px";
this._percEx.h=0;
}
if(this.fitToContentWidth){
this.width=this.bounds.w+"px";
this._percEx.w=0;
}
},toHtml:function(_41d){
if(this.customToHtml!=this.constructor.prototype.customToHtml){
return this.customToHtml();
}
var html=[];
var _41e=0;
var _41f=[];
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(this.layout.inFlow(c)){
_41f[i]=c.toHtml!=wm.Control.prototype.toHtml;
if(_41f[i]&&c.customToHtml!=c.constructor.prototype.customToHtml){
var _420=c.toHtml(_41d);
if(_420===""||_420===undefined||_420===null){
_41f[i]=false;
}
}
if(_41f[i]){
_41e++;
}
}
}
if(this.layoutKind=="top-to-bottom"||_41e<=1){
html.push("<div id='"+this.domNode.id+"' class='wmPanelTopToBottom'>");
for(var i=0;i<this.c$.length;i++){
if(_41f[i]){
var h=this.c$[i].toHtml(_41d);
if(h){
var _421=this.toHtmlStyles();
var _422=(this.c$[i]._classes&&this.c$[i]._classes.domNode?this.c$[i]._classes.domNode:[]);
_422=dojo.filter(_422,function(_423){
return _423.indexOf("wm_Font")==0||_423.indexOf("wm_Text")==0;
});
_422=_422.join(" ");
html.push("<div id='"+this.c$[i].domNode.id+"_Outer' "+_421+" class='"+_422+"'>"+h+"</div>");
}
}
}
}else{
var _424=_41d-4;
var _425=0;
var _426=[];
for(var i=0;i<this.c$.length;i++){
if(_41f[i]){
var c=this.c$[i];
if(!c._percEx.w){
_426[i]=c.bounds.w;
_424-=c.bounds.w;
}else{
_425+=c._percEx.w;
}
}
}
for(var i=0;i<this.c$.length;i++){
if(_41f[i]){
var c=this.c$[i];
if(c._percEx.w){
var _427=c._percEx.w/_425*_424;
_426[i]=_427;
}
}
}
html.push("<div id='"+this.domNode.id+"' class='wmPanelLeftToRight'>");
for(var i=0;i<this.c$.length;i++){
var h=this.c$[i].toHtml(_426[i]);
if(h){
var _421="";
var _422=(this.c$[i]._classes&&this.c$[i]._classes.domNode?this.c$[i]._classes.domNode:[]);
_422=dojo.filter(_422,function(_428){
return _428.indexOf("wm_Font")==0||_428.indexOf("wm_Text")==0;
});
_422=_422.join(" ");
html.push("<div id='"+this.c$[i].domNode.id+"_Outer' style='width:"+_426[i]+"px;' "+_421+" class='"+_422+"'>"+h+"</div>");
}
}
}
html.push("</div>");
return html.join("");
}});
wm.Container.delayedReflowWidgets={};
wm.Container._delayedReflowWidgetsId=0;
wm.Container.runDelayedReflow=function(){
var _429=wm.Container.delayedReflowWidgets;
wm.Container.delayedReflowWidgets={};
wm.Container._delayedReflowWidgetsId=0;
wm.forEachProperty(_429,function(_42a,_42b){
if(!_42a.isDestroyed){
_42a.reflow();
}
});
};
}
if(!dojo._hasResource["wm.base.widget.Layers.Decorator"]){
dojo._hasResource["wm.base.widget.Layers.Decorator"]=true;
dojo.provide("wm.base.widget.Layers.Decorator");
dojo.declare("wm.LayersDecorator",null,{decorationClass:"",constructor:function(_42c){
this.decoree=_42c;
},destroy:function(){
this.decoree=null;
},decorate:function(){
this.decorateContainer();
this.decorateLayers();
},decorateContainer:function(){
var d=this.decoree;
dojo.addClass(d.domNode,this.decorationClass);
},decorateLayers:function(){
dojo.forEach(this.decoree.layers,function(l,i){
this.decorateLayer(l,i);
},this);
},decorateLayer:function(_42d,_42e){
_42d.decorator=this;
},undecorate:function(){
this.undecorateContainer();
var _42f=this.decoree.layers;
for(var i=_42f.length-1;i>=0;i--){
this.undecorateLayer(_42f[i],i);
}
},undecorateContainer:function(){
dojo.removeClass(this.decoree.domNode,this.decorationClass);
},undecorateLayer:function(){
},setLayerShowing:function(_430,_431){
if(this.active){
wm.Control.prototype.setShowing.call(_430,_431);
}else{
_430.showing=_431;
}
},setLayerActive:function(_432,_433){
if(_432.active==_433&&_432.domNode.style.display!="none"){
return;
}
_432.inFlow=_433;
_432.active=_433;
var page=_432.getParentPage();
if(dojo.isIE<=9||wm.isAndroid<=3||this.decoree._cupdating||!page||page._loadingPage||window["studio"]||!this.decoree.transition||this.decoree.transition==="none"){
_432.domNode.style.display=_433?"":"none";
if(_433){
_432.reflowParent();
}
}else{
this.anim(_432,_433);
}
wm.fire(_432,"domNodeShowingChanged",[_433]);
},anim:function(_434,_435){
if(!_434._transitionEndSub){
if(!dojo.isIE||dojo.isIE>=10){
var _436;
if(dojo.isWebKit){
_436="webkitAnimationEnd";
}else{
if(dojo.isOpera){
_436="oanimationend";
}else{
if(dojo.isIE){
_436="MSAnimationEnd";
}else{
_436="animationend";
}
}
}
_434.domNode.addEventListener(_436,function(_437){
if(!_434.isActive()){
_434.domNode.style.display="none";
_434.domNode.style.opacity=1;
}
},false);
_434._transitionEndSub=true;
}
}
var _438=this.decoree.transition;
dojo.removeClass(_434.domNode,[_438+"OutLeftAnim",_438+"OutRightAnim",_438+"InLeftAnim",_438+"InRightAnim"]);
if(!_435){
var _439=_434._transitionNext?"Left":"Right";
dojo.addClass(_434.domNode,_438+"Out"+(_439)+"Anim");
}else{
var _439=_434._transitionNext?"Left":"Right";
_434.domNode.style.display="";
dojo.addClass(_434.domNode,_438+"In"+(_439)+"Anim");
_434.reflowParent();
}
},animFade:function(_43a,_43b){
if(_43b){
_43a.domNode.style.opacity=0.01;
_43a.domNode.style.display="";
}
var _43c=(_43b)?1:0.01;
var anim=dojo.animateProperty({node:_43a.domNode,properties:{opacity:_43c},duration:350});
dojo.connect(anim,"onEnd",function(){
if(!_43b){
_43a.domNode.style.display="none";
_43a.domNode.style.opacity=1;
}else{
_43a.reflow();
}
});
anim.play();
},activateLayer:function(_43d){
var d=this.decoree;
var old=d.getLayer(d.lastLayerIndex);
if(old&&old!=_43d){
old._transitionNext=_43d._transitionNext=_43d.getIndex()>old.getIndex();
this.setLayerActive(old,false);
}
this.setLayerActive(_43d,true);
},applyLayerCaption:function(){
},moveLayerIndex:function(_43e,_43f){
var d=this.decoree,l=d.getLayer(_43e);
d.client.removeControl(l);
d.client.insertControl(l,_43f);
}});
}
if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
}
if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_440,_441){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _442=dojo.date.stamp._isoRegExp.exec(_440),_443=null;
if(_442){
_442.shift();
if(_442[1]){
_442[1]--;
}
if(_442[6]){
_442[6]*=1000;
}
if(_441){
_441=new Date(_441);
dojo.forEach(dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _441["get"+prop]();
}),function(_444,_445){
_442[_445]=_442[_445]||_444;
});
}
_443=new Date(_442[0]||1970,_442[1]||0,_442[2]||1,_442[3]||0,_442[4]||0,_442[5]||0,_442[6]||0);
if(_442[0]<100){
_443.setFullYear(_442[0]||1970);
}
var _446=0,_447=_442[7]&&_442[7].charAt(0);
if(_447!="Z"){
_446=((_442[8]||0)*60)+(Number(_442[9])||0);
if(_447!="-"){
_446*=-1;
}
}
if(_447){
_446-=_443.getTimezoneOffset();
}
if(_446){
_443.setTime(_443.getTime()+_446*60000);
}
}
return _443;
};
dojo.date.stamp.toISOString=function(_448,_449){
var _44a=function(n){
return (n<10)?"0"+n:n;
};
_449=_449||{};
var _44b=[],_44c=_449.zulu?"getUTC":"get",date="";
if(_449.selector!="time"){
var year=_448[_44c+"FullYear"]();
date=["0000".substr((year+"").length)+year,_44a(_448[_44c+"Month"]()+1),_44a(_448[_44c+"Date"]())].join("-");
}
_44b.push(date);
if(_449.selector!="date"){
var time=[_44a(_448[_44c+"Hours"]()),_44a(_448[_44c+"Minutes"]()),_44a(_448[_44c+"Seconds"]())].join(":");
var _44d=_448[_44c+"Milliseconds"]();
if(_449.milliseconds){
time+="."+(_44d<100?"0":"")+_44a(_44d);
}
if(_449.zulu){
time+="Z";
}else{
if(_449.selector!="time"){
var _44e=_448.getTimezoneOffset();
var _44f=Math.abs(_44e);
time+=(_44e>0?"-":"+")+_44a(Math.floor(_44f/60))+":"+_44a(_44f%60);
}
}
_44b.push(time);
}
return _44b.join("T");
};
}
if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
new Date("X");
dojo.parser=new function(){
var d=dojo;
function _450(_451){
if(d.isString(_451)){
return "string";
}
if(typeof _451=="number"){
return "number";
}
if(typeof _451=="boolean"){
return "boolean";
}
if(d.isFunction(_451)){
return "function";
}
if(d.isArray(_451)){
return "array";
}
if(_451 instanceof Date){
return "date";
}
if(_451 instanceof d._Url){
return "url";
}
return "object";
};
function _452(_453,type){
switch(type){
case "string":
return _453;
case "number":
return _453.length?Number(_453):NaN;
case "boolean":
return typeof _453=="boolean"?_453:!(_453.toLowerCase()=="false");
case "function":
if(d.isFunction(_453)){
_453=_453.toString();
_453=d.trim(_453.substring(_453.indexOf("{")+1,_453.length-1));
}
try{
if(_453===""||_453.search(/[^\w\.]+/i)!=-1){
return new Function(_453);
}else{
return d.getObject(_453,false)||new Function(_453);
}
}
catch(e){
return new Function();
}
case "array":
return _453?_453.split(/\s*,\s*/):[];
case "date":
switch(_453){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_453);
}
case "url":
return d.baseUrl+_453;
default:
return d.fromJson(_453);
}
};
var _454={},_455={};
d.connect(d,"extend",function(){
_455={};
});
function _456(cls,_457){
for(var name in cls){
if(name.charAt(0)=="_"){
continue;
}
if(name in _454){
continue;
}
_457[name]=_450(cls[name]);
}
return _457;
};
function _458(_459,_45a){
var c=_455[_459];
if(!c){
var cls=d.getObject(_459),_45b=null;
if(!cls){
return null;
}
if(!_45a){
_45b=_456(cls.prototype,{});
}
c={cls:cls,params:_45b};
}else{
if(!_45a&&!c.params){
c.params=_456(c.cls.prototype,{});
}
}
return c;
};
this._functionFromScript=function(_45c,_45d){
var _45e="";
var _45f="";
var _460=(_45c.getAttribute(_45d+"args")||_45c.getAttribute("args"));
if(_460){
d.forEach(_460.split(/\s*,\s*/),function(part,idx){
_45e+="var "+part+" = arguments["+idx+"]; ";
});
}
var _461=_45c.getAttribute("with");
if(_461&&_461.length){
d.forEach(_461.split(/\s*,\s*/),function(part){
_45e+="with("+part+"){";
_45f+="}";
});
}
return new Function(_45e+_45c.innerHTML+_45f);
};
this.instantiate=function(_462,_463,args){
var _464=[],_463=_463||{};
args=args||{};
var _465=(args.scope||d._scopeName)+"Type",_466="data-"+(args.scope||d._scopeName)+"-";
d.forEach(_462,function(obj){
if(!obj){
return;
}
var node,type,_467,_468,_469,_46a;
if(obj.node){
node=obj.node;
type=obj.type;
_46a=obj.fastpath;
_467=obj.clsInfo||(type&&_458(type,_46a));
_468=_467&&_467.cls;
_469=obj.scripts;
}else{
node=obj;
type=_465 in _463?_463[_465]:node.getAttribute(_465);
_467=type&&_458(type);
_468=_467&&_467.cls;
_469=(_468&&(_468._noScript||_468.prototype._noScript)?[]:d.query("> script[type^='dojo/']",node));
}
if(!_467){
throw new Error("Could not load class '"+type);
}
var _46b={};
if(args.defaults){
d._mixin(_46b,args.defaults);
}
if(obj.inherited){
d._mixin(_46b,obj.inherited);
}
if(_46a){
var _46c=node.getAttribute(_466+"props");
if(_46c&&_46c.length){
try{
_46c=d.fromJson.call(args.propsThis,"{"+_46c+"}");
d._mixin(_46b,_46c);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_46c+"'");
}
}
var _46d=node.getAttribute(_466+"attach-point");
if(_46d){
_46b.dojoAttachPoint=_46d;
}
var _46e=node.getAttribute(_466+"attach-event");
if(_46e){
_46b.dojoAttachEvent=_46e;
}
dojo.mixin(_46b,_463);
}else{
var _46f=node.attributes;
for(var name in _467.params){
var item=name in _463?{value:_463[name],specified:true}:_46f.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){
continue;
}
var _470=item.value;
switch(name){
case "class":
_470="className" in _463?_463.className:node.className;
break;
case "style":
_470="style" in _463?_463.style:(node.style&&node.style.cssText);
}
var _471=_467.params[name];
if(typeof _470=="string"){
_46b[name]=_452(_470,_471);
}else{
_46b[name]=_470;
}
}
}
var _472=[],_473=[];
d.forEach(_469,function(_474){
node.removeChild(_474);
var _475=(_474.getAttribute(_466+"event")||_474.getAttribute("event")),type=_474.getAttribute("type"),nf=d.parser._functionFromScript(_474,_466);
if(_475){
if(type=="dojo/connect"){
_472.push({event:_475,func:nf});
}else{
_46b[_475]=nf;
}
}else{
_473.push(nf);
}
});
var _476=_468.markupFactory||_468.prototype&&_468.prototype.markupFactory;
var _477=_476?_476(_46b,node,_468):new _468(_46b,node);
_464.push(_477);
var _478=(node.getAttribute(_466+"id")||node.getAttribute("jsId"));
if(_478){
d.setObject(_478,_477);
}
d.forEach(_472,function(_479){
d.connect(_477,_479.event,null,_479.func);
});
d.forEach(_473,function(func){
func.call(_477);
});
});
if(!_463._started){
d.forEach(_464,function(_47a){
if(!args.noStart&&_47a&&dojo.isFunction(_47a.startup)&&!_47a._started&&(!_47a.getParent||!_47a.getParent())){
_47a.startup();
}
});
}
return _464;
};
this.parse=function(_47b,args){
var root;
if(!args&&_47b&&_47b.rootNode){
args=_47b;
root=args.rootNode;
}else{
root=_47b;
}
root=root?dojo.byId(root):dojo.body();
args=args||{};
var _47c=(args.scope||d._scopeName)+"Type",_47d="data-"+(args.scope||d._scopeName)+"-";
function scan(_47e,list){
var _47f=dojo.clone(_47e.inherited);
dojo.forEach(["dir","lang"],function(name){
var val=_47e.node.getAttribute(name);
if(val){
_47f[name]=val;
}
});
var _480=_47e.clsInfo&&!_47e.clsInfo.cls.prototype._noScript?_47e.scripts:null;
var _481=(!_47e.clsInfo||!_47e.clsInfo.cls.prototype.stopParser)||(args&&args.template);
for(var _482=_47e.node.firstChild;_482;_482=_482.nextSibling){
if(_482.nodeType==1){
var type,_483=_481&&_482.getAttribute(_47d+"type");
if(_483){
type=_483;
}else{
type=_481&&_482.getAttribute(_47c);
}
var _484=_483==type;
if(type){
var _485={"type":type,fastpath:_484,clsInfo:_458(type,_484),node:_482,scripts:[],inherited:_47f};
list.push(_485);
scan(_485,list);
}else{
if(_480&&_482.nodeName.toLowerCase()=="script"){
type=_482.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_480.push(_482);
}
}else{
if(_481){
scan({node:_482,inherited:_47f},list);
}
}
}
}
}
};
var _486={};
if(args&&args.inherited){
for(var key in args.inherited){
if(args.inherited[key]){
_486[key]=args.inherited[key];
}
}
}
var list=[];
scan({node:root,inherited:_486},list);
var _487=args&&args.template?{template:true}:null;
return this.instantiate(list,_487,args);
};
}();
(function(){
var _488=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.getObject("dijit.wai.onload")===dojo._loaders[0]){
dojo._loaders.splice(1,0,_488);
}else{
dojo._loaders.unshift(_488);
}
})();
}
if(!dojo._hasResource["dojo.dnd.Container"]){
dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(node,_489){
this.node=dojo.byId(node);
if(!_489){
_489={};
}
this.creator=_489.creator||null;
this.skipForm=_489.skipForm;
this.parent=_489.dropParent&&dojo.byId(_489.dropParent);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(_489&&_489._skipStartup)){
this.startup();
}
this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return dojo.query("> .dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dojo.dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_48a,_48b){
if(!this.parent.firstChild){
_48b=null;
}else{
if(_48a){
if(!_48b){
_48b=this.parent.firstChild;
}
}else{
if(_48b){
_48b=_48b.nextSibling;
}
}
}
if(_48b){
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_48b);
}
}else{
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_48c,node){
_48c._skipStartup=true;
return new dojo.dnd.Container(node,_48c);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dojo.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_48d){
var _48e="dojoDnd"+type;
var _48f=type.toLowerCase()+"State";
dojo.replaceClass(this.node,_48e+_48d,_48e+this[_48f]);
this[_48f]=_48d;
},_addItemClass:function(node,type){
dojo.addClass(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
dojo.removeClass(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _490=node.parentNode;_490;node=_490,_490=node.parentNode){
if(_490==this.parent&&dojo.hasClass(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!dojo.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dojo.dnd.getUniqueId();
}
dojo.addClass(t.node,"dojoDndItem");
return t;
}});
dojo.dnd._createNode=function(tag){
if(!tag){
return dojo.dnd._createSpan;
}
return function(text){
return dojo.create(tag,{innerHTML:text});
};
};
dojo.dnd._createTrTd=function(text){
var tr=dojo.create("tr");
dojo.create("td",{innerHTML:text},tr);
return tr;
};
dojo.dnd._createSpan=function(text){
return dojo.create("span",{innerHTML:text});
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _491=item&&dojo.isObject(item),data,type,n;
if(_491&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_491&&item.data)?item.data:item;
type=(_491&&item.type)?item.type:["text"];
n=(hint=="avatar"?dojo.dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dojo.dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
}
if(!dojo._hasResource["dojo.dnd.Selector"]){
dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(node,_492){
if(!_492){
_492={};
}
this.singular=_492.singular;
this.autoSync=_492.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"));
},singular:false,getSelectedNodes:function(){
var t=new dojo.NodeList();
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dojo.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dojo.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dojo.byId(i);
this.delItem(i);
dojo.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||dojo.global;
var s=this.selection,e=dojo.dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
dojo.dnd.Selector.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
dojo.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_493,data,_494,_495){
var _496=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_496.call(this,item,hint);
if(_493){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
dojo.dnd.Selector.superclass.insertNodes.call(this,data,_494,_495);
this._normalizedCreator=_496;
return this;
},destroy:function(){
dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null;
},markupFactory:function(_497,node){
_497._skipStartup=true;
return new dojo.dnd.Selector(node,_497);
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dojo.isCopyKey(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(e.button===dojo.mouseButtons.LEFT){
dojo.stopEvent(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dojo.isCopyKey(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0;
for(;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dojo.isCopyKey(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dojo.isCopyKey(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
dojo.stopEvent(e);
},onMouseUp:function(e){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(e){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove");
},onOutEvent:function(){
dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent;
},_removeSelection:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dojo.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
}
if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _498=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _499=dojo._docScroll();
return {w:_498.clientWidth,h:_498.clientHeight,l:_499.x,t:_499.y};
};
dojo.window.get=function(doc){
if(dojo.isIE&&window!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
dojo.window.scrollIntoView=function(node,pos){
try{
node=dojo.byId(node);
var doc=node.ownerDocument||dojo.doc,body=doc.body||dojo.body(),html=doc.documentElement||body.parentNode,isIE=dojo.isIE,isWK=dojo.isWebKit;
if((!(dojo.isMoz||isIE||isWK||dojo.isOpera)||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _49a=doc.compatMode=="BackCompat",_49b=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_49a?body:html),_49c=isWK?body:_49b,_49d=_49b.clientWidth,_49e=_49b.clientHeight,rtl=!dojo._isBodyLtr(),_49f=pos||dojo.position(node),el=node.parentNode,_4a0=function(el){
return ((isIE<=6||(isIE&&_49a))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_4a0(node)){
return;
}
while(el){
if(el==body){
el=_49c;
}
var _4a1=dojo.position(el),_4a2=_4a0(el);
if(el==_49c){
_4a1.w=_49d;
_4a1.h=_49e;
if(_49c==html&&isIE&&rtl){
_4a1.x+=_49c.offsetWidth-_4a1.w;
}
if(_4a1.x<0||!isIE){
_4a1.x=0;
}
if(_4a1.y<0||!isIE){
_4a1.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_4a1.w-=pb.w;
_4a1.h-=pb.h;
_4a1.x+=pb.l;
_4a1.y+=pb.t;
var _4a3=el.clientWidth,_4a4=_4a1.w-_4a3;
if(_4a3>0&&_4a4>0){
_4a1.w=_4a3;
_4a1.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_4a4:0;
}
_4a3=el.clientHeight;
_4a4=_4a1.h-_4a3;
if(_4a3>0&&_4a4>0){
_4a1.h=_4a3;
}
}
if(_4a2){
if(_4a1.y<0){
_4a1.h+=_4a1.y;
_4a1.y=0;
}
if(_4a1.x<0){
_4a1.w+=_4a1.x;
_4a1.x=0;
}
if(_4a1.y+_4a1.h>_49e){
_4a1.h=_49e-_4a1.y;
}
if(_4a1.x+_4a1.w>_49d){
_4a1.w=_49d-_4a1.x;
}
}
var l=_49f.x-_4a1.x,t=_49f.y-Math.max(_4a1.y,0),r=l+_49f.w-_4a1.w,bot=t+_49f.h-_4a1.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_49a)||isIE>=9)){
s=-s;
}
_49f.x+=el.scrollLeft;
el.scrollLeft+=s;
_49f.x-=el.scrollLeft;
}
if(bot*t>0){
_49f.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_49f.y-=el.scrollTop;
}
el=(el!=_49c)&&!_4a2&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo.position(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _4a5=n.scrollLeft,_4a6=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_4a5!=n.scrollLeft||_4a6!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}
if(!dojo._hasResource["dojo.dnd.Avatar"]){
dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.declare("dojo.dnd.Avatar",null,{constructor:function(_4a7){
this.manager=_4a7;
this.construct();
},construct:function(){
this.isA11y=dojo.hasClass(dojo.body(),"dijit_a11y");
var a=dojo.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_4a8=this.manager.source,node,b=dojo.create("tbody",null,a),tr=dojo.create("tr",null,b),td=dojo.create("td",null,tr),icon=this.isA11y?dojo.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td):null,span=dojo.create("span",{innerHTML:_4a8.generateText?this._generateText():""},td),k=Math.min(5,this.manager.nodes.length),i=0;
dojo.attr(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_4a8.creator){
node=_4a8._normalizedCreator(_4a8.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _4a9=dojo.create("table"),_4aa=dojo.create("tbody",null,_4a9);
_4aa.appendChild(node);
node=_4a9;
}
}
node.id="";
tr=dojo.create("tr",null,b);
td=dojo.create("td",null,tr);
td.appendChild(node);
dojo.attr(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
dojo.destroy(this.node);
this.node=false;
},update:function(){
dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
if(this.isA11y){
var icon=dojo.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
dojo.query(("tr.dojoDndAvatarHeader td span"+(this.isA11y?" span":"")),this.node).forEach(function(node){
node.innerHTML=this._generateText();
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
}
if(!dojo._hasResource["dojo.dnd.Manager"]){
dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Manager",null,{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:16,OFFSET_Y:16,overSource:function(_4ab){
if(this.avatar){
this.target=(_4ab&&_4ab.targetState!="Disabled")?_4ab:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
dojo.publish("/dnd/source/over",[_4ab]);
},outSource:function(_4ac){
if(this.avatar){
if(this.target==_4ac){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null]);
}
}else{
dojo.publish("/dnd/source/over",[null]);
}
},startDrag:function(_4ad,_4ae,copy){
this.source=_4ad;
this.nodes=_4ae;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[_4ad,_4ae,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp"),dojo.connect(dojo.doc,"ondragstart",dojo.stopEvent),dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent)];
var c="dojoDnd"+(copy?"Copy":"Move");
dojo.addClass(dojo.body(),c);
},canDrop:function(flag){
var _4af=Boolean(this.target&&flag);
if(this.canDropFlag!=_4af){
this.canDropFlag=_4af;
this.avatar.update();
}
},stopDrag:function(){
dojo.removeClass(dojo.body(),["dojoDndCopy","dojoDndMove"]);
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new dojo.dnd.Avatar(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
if(e.which===0){
this.onMouseUp();
return;
}
var a=this.avatar;
if(a){
dojo.dnd.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e))),_4b0=[this.source,this.nodes,copy,this.target,e];
dojo.publish("/dnd/drop/before",_4b0);
dojo.publish("/dnd/drop",_4b0);
}else{
dojo.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case dojo.keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case dojo.keys.ESCAPE:
dojo.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==dojo.keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.replaceClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){
if(!dojo.dnd._manager){
dojo.dnd._manager=new dojo.dnd.Manager();
}
return dojo.dnd._manager;
};
}
if(!dojo._hasResource["dojo.dnd.Source"]){
dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_4b1){
dojo.mixin(this,dojo.mixin({},_4b1));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
dojo.addClass(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
dojo.addClass(this.node,"dojoDndTarget");
}
if(this.horizontal){
dojo.addClass(this.node,"dojoDndHorizontal");
}
this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")];
},checkAcceptance:function(_4b2,_4b3){
if(this==_4b2){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_4b3.length;++i){
var type=_4b2.getItem(_4b3[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_4b4,self){
if(_4b4){
return true;
}
if(arguments.length<2){
self=this==dojo.dnd.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null;
},markupFactory:function(_4b5,node){
_4b5._skipStartup=true;
return new dojo.dnd.Source(node,_4b5);
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _4b6=this.getSelectedNodes();
if(_4b6.length){
m.startDrag(this,_4b6,this.copyState(dojo.isCopyKey(e),true));
}
}
}
if(this.isDragging){
var _4b7=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=dojo.position(this.current,true);
}
if(this.horizontal){
_4b7=(e.pageX-this.targetBox.x)<(this.targetBox.w/2);
}else{
_4b7=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_4b7!=this.before){
this._markTargetAnchor(_4b7);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
dojo.dnd.Source.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_4b8){
if(this!=_4b8){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_4b9,_4ba,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_4b9?(copy?"Copied":"Moved"):"");
}
var _4bb=this.accept&&this.checkAcceptance(_4b9,_4ba);
this._changeState("Target",_4bb?"":"Disabled");
if(this==_4b9){
dojo.dnd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_4bc,_4bd,copy,_4be){
if(this==_4be){
this.onDrop(_4bc,_4bd,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_4bf,_4c0,copy){
if(this!=_4bf){
this.onDropExternal(_4bf,_4c0,copy);
}else{
this.onDropInternal(_4c0,copy);
}
},onDropExternal:function(_4c1,_4c2,copy){
var _4c3=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _4c3.call(this,_4c1.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node,hint){
var t=_4c1.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node,hint){
var t=_4c1.getItem(node.id);
_4c1.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_4c1.selectNone();
}
this.insertNodes(true,_4c2,this.before,this.current);
if(!copy&&this.creator){
_4c1.deleteSelectedNodes();
}
this._normalizedCreator=_4c3;
},onDropInternal:function(_4c4,copy){
var _4c5=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _4c5.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_4c4,this.before,this.current);
this._normalizedCreator=_4c5;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_4c6){
if(this.current==this.targetAnchor&&this.before==_4c6){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_4c6;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(!dojo.mouseButtons.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(dojo.hasClass(node,"dojoDndHandle")){
return true;
}
if(dojo.hasClass(node,"dojoDndItem")||dojo.hasClass(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(node,_4c7){
this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource");
},markupFactory:function(_4c8,node){
_4c8._skipStartup=true;
return new dojo.dnd.Target(node,_4c8);
}});
dojo.declare("dojo.dnd.AutoSource",dojo.dnd.Source,{constructor:function(node,_4c9){
this.autoSync=true;
},markupFactory:function(_4ca,node){
_4ca._skipStartup=true;
return new dojo.dnd.AutoSource(node,_4ca);
}});
}
if(!dojo._hasResource["wm.base.widget.Layers.TabsDecorator"]){
dojo._hasResource["wm.base.widget.Layers.TabsDecorator"]=true;
dojo.provide("wm.base.widget.Layers.TabsDecorator");
dojo.declare("wm.TabsDecorator",[wm.LayersDecorator,wm.TouchMixinOptional],{decorationClass:"wmtablayers",decoratorPadding:"7, 0, 0, 0",undecorate:function(){
this.inherited(arguments);
this.tabsControl.destroy();
},decorateContainer:function(){
this.inherited(arguments);
this.btns=[];
if(this.tabsControl){
this.tabsControl.destroy();
}
this.tabsControl=new wm.TabsControl({parent:this.decoree,owner:this.decoree,padding:this.decoratorPadding,name:"tabsControl"});
this.decoree.moveControl(this.tabsControl,0);
if(this.decoree.dndTargetName||this.decoree.isDesignLoaded()){
this.dndObj=new dojo.dnd.Source(this.tabsControl.domNode,{accept:[this.decoree.dndTargetName||"designMoveLayers"]});
this.dndObjConnect=this.tabsControl.connect(this.dndObj,"onDndDrop",this,"onTabDrop");
}
},createTab:function(_4cb,_4cc,_4cd){
var b=this.btns[_4cc]=document.createElement("button");
dojo.attr(b,"id",this.decoree.domNode.id+"_decorator_button"+this.btns.length);
dojo.attr(b,"type","button");
dojo.attr(b,"type","button");
b.style.display=_4cd.showing?"":"none";
this.setBtnText(b,_4cb,_4cd.closable||_4cd.destroyable);
if(!wm.isMobile){
this.decoree.connect(b,"onclick",dojo.hitch(this,"onTabClick",_4cd));
}else{
this.addTouchListener(b);
}
var _4ce=(this.decoree.verticalButtons)?"-verticaltab":"-tab";
b.className=this.decorationClass+_4ce+(_4cd.closable||_4cd.destroyable?" "+this.decorationClass+"-closabletab":"");
if(!_4cb){
b.style.display="none";
}
this.tabsControl.domNode.appendChild(b);
if(this.dndObj){
this.dndObj.destroy();
dojo.disconnect(this.dndObjConnect);
dojo.addClass(b,"dojoDndItem");
dojo.attr(b,"dndType",this.decoree.dndTargetName||"designMoveLayers");
this.dndObj=new dojo.dnd.Source(this.tabsControl.domNode,{accept:[this.decoree.dndTargetName||"designMoveLayers"]});
this.dndObjConnect=this.tabsControl.connect(this.dndObj,"onDndDrop",this,"onTabDrop");
}
},onTabClick:function(_4cf,evt){
if(this.decoree.isDesignLoaded()){
dojo.stopEvent(evt);
}
if(evt.type=="submit"){
return;
}
var _4d0={target:evt.target,clientX:evt.clientX,clientY:evt.clientY};
wm.onidle(this,function(){
this.tabClicked(_4cf,_4d0);
_4d0.target.style.borderWidth="";
});
},onTouchStart:function(_4d1){
var _4d2=_4d1.target;
while(_4d2.tagName!="BUTTON"&&_4d2.tagName!="BODY"){
_4d2=_4d2.parentNode;
}
var _4d3=dojo.indexOf(this.btns,_4d2);
if(_4d3>=0){
this._touchedLayer=this.decoree.layers[_4d3];
}
},onTouchMove:function(_4d4,_4d5,_4d6,_4d7,_4d8,_4d9,_4da){
},onTouchEnd:function(_4db,_4dc){
if(!_4dc){
this.tabClicked(this._touchedLayer,_4db);
}
delete this._touchedLayer;
},getRuntimeId:function(){
return this.decoree.getRuntimeId()+".decorator";
},onTabDrop:function(_4dd,_4de,copy,_4df,_4e0){
if(dojo.dnd.manager().target!=this.dndObj){
return;
}
var _4e1=wm.getWidgetByDomNode(_4de[0]);
var _4e2=dojo.indexOf(_4e1.decorator.btns,_4de[0]);
if(_4e2==-1){
return;
}
var _4e3=_4e1.layers[_4e2];
if(!_4e3){
return;
}
var _4e4=dojo.indexOf(this.tabsControl.domNode.childNodes,_4de[0]);
var _4e5=false;
var _4e6=_4e3.parent!=this.decoree;
if(_4e6){
_4e3.setParent(this.decoree);
var _4e7=_4e1.layerIndex;
_4e1.layerIndex=-1;
_4e1.setLayerIndex(_4e1.layers.length>_4e7?_4e7:_4e1.layers.length-1);
var _4e8=this.btns;
var _4e9=this.tabsControl.domNode.childNodes;
if(_4e4==this.btns.length-1){
_4e5=true;
}
if(_4de[0].parentNode){
dojo.destroy(_4de[0]);
}
}else{
if(_4e2==_4e4){
_4e5=true;
}
}
if(_4e5){
var x=_4e0.offsetX;
var _4ea=false;
for(var i=0;i<this.btns.length;i++){
var b=this.btns[i];
var _4eb=dojo.marginBox(b);
_4eb.l+=dojo._getContentBox(b).l;
if(_4eb.l>x){
_4e4=i;
_4ea=true;
break;
}
}
if(!_4ea){
_4e4=this.btns.length;
}else{
if(_4e4>_4e2&&!_4e6){
_4e4--;
}
}
}
this.decoree.moveLayerIndex(_4e3,_4e4);
if(this.decoree.isDesignLoaded()){
studio.refreshWidgetsTree();
}
_4e3.activate();
_4e3.onTabDrop();
if(_4e1!=this.decoree&&_4e1.onTabRemoved){
_4e1.onTabRemoved();
}
this.decoree.onTabDrop();
},tabClicked:function(_4ec,e){
var d=this.decoree;
var _4ed=dojo.hasClass(e.target,"TabCloseIcon");
if(!_4ed&&(_4ec.closable||_4ec.destroyable)){
var _4ee=dojo.coords(e.target.firstChild);
var _4ef=dojo.coords(e.target);
if(e.clientX>=_4ee.x&&e.clientY<=_4ee.y+_4ee.h){
_4ed=true;
}
}
if(_4ed){
if(_4ec.customCloseOrDestroy!=_4ec.constructor.prototype.customCloseOrDestroy){
return _4ec.customCloseOrDestroy(_4ec);
}
_4ec.onCloseOrDestroy();
if(_4ec.parent.customCloseOrDestroy!=_4ec.parent.constructor.prototype.customCloseOrDestroy){
return _4ec.parent.customCloseOrDestroy(_4ec.parent,_4ec);
}
var _4f0=_4ec.parent.getActiveLayer();
var _4f1=_4f0.getIndex();
var _4f2=_4ec.parent;
_4f2.onCloseOrDestroy(_4ec);
if(_4ec.destroyable){
_4ec.destroy();
}else{
_4ec.hide();
}
this.decoree.renderBounds();
if(!_4f0.isDestroyed){
_4f0.activate();
_4f0.parent.layerIndex=dojo.indexOf(_4f0.parent.layers,_4f0);
}else{
if(_4f1>0){
_4f2.setLayerIndex(_4f1-1);
}else{
_4f2.setLayerIndex(0);
}
}
}else{
d.setLayer(_4ec);
}
},decorateLayer:function(_4f3,_4f4){
this.inherited(arguments);
this.createTab(_4f3.caption,_4f4,_4f3);
},undecorateLayer:function(_4f5,_4f6){
dojo._destroyElement(this.btns[_4f6]);
this.btns.splice(_4f6,1);
},setLayerShowing:function(_4f7,_4f8){
var i=_4f7.getIndex();
if(i!=-1){
this.btns[i].style.display=_4f8?"":"none";
}
this.inherited(arguments);
},setLayerActive:function(_4f9,_4fa){
var b=this.btns[_4f9.getIndex()];
if(b){
dojo[_4fa?"addClass":"removeClass"](b,this.decorationClass+"-selected");
}
this.inherited(arguments);
},applyLayerCaption:function(_4fb){
var d=this.decoree,i=_4fb.getIndex();
if(i!=-1){
this.setBtnText(this.btns[i],_4fb.caption,_4fb.closable||_4fb.destroyable);
}
},setBtnText:function(_4fc,_4fd,_4fe){
var _4ff=dojo.indexOf(this.btns,_4fc);
var _500=this.decoree.layers[_4ff];
if(_4fd){
if(_4fc.style.display&&_500.showing){
_4fc.style.display="";
}
dojo[_4fe?"addClass":"removeClass"](_4fc,this.decorationClass+"-closabletab");
_4fc.innerHTML=(_4fe?"<span class='TabCloseIcon'>x</span>":"")+(_4fd||"&nbsp;");
}else{
_4fc.style.display="none";
}
},getBtn:function(_501){
var d=this.decoree,i=d.indexOfLayerCaption(_501);
if(i!=-1){
return this.btns[i];
}
},disenableTab:function(_502,_503){
var b=this.getBtn(_502);
if(b){
b.disabled=_503?"disabled":"";
}
},disableTab:function(_504){
this.disenableTab(_504,true);
},enableTab:function(_505){
this.disenableTab(_505,false);
},moveLayerIndex:function(_506,_507){
this.inherited(arguments);
var d=this.tabsControl.domNode,f=this.btns[_506],t=this.btns[_507],c=this.decoree.getCount()-1;
if(_507<_506){
d.insertBefore(f,t);
}else{
if(_507>_506){
if(_507==c){
d.appendChild(f);
}else{
var nl=this.btns[_507+1];
if(nl){
d.insertBefore(f,nl);
}
}
}
}
wm.Array.removeElement(this.btns,f);
wm.Array.insertElementAt(this.btns,f,_507);
}});
dojo.declare("wm.RoundedTabsDecorator",wm.TabsDecorator,{});
dojo.declare("wm.TabsControl",wm.Control,{height:"27px",width:"100%",border:0,init:function(){
if(this.parent&&this.parent.isRelativePositioned){
this.isRelativePositioned=true;
}
dojo.addClass(this.domNode,"wmtablayers-tabbar");
if(this.owner){
if(this.owner.verticalButtons){
this.height="100%";
this.width=this.owner.headerWidth;
}else{
this.height=this.owner._headerHeight;
}
}
this.inherited(arguments);
},updateHeaderHeight:function(){
if(this.owner._lockHeaderHeight){
return this.bounds.h;
}
var _508=dojo.marginBox(this.domNode).h;
return _508;
if(_508!=_currHeight){
dojo.marginBox(this.domNode,{h:_currHeight});
return _508;
}
return false;
}});
}
if(!dojo._hasResource["wm.base.widget.Layers"]){
dojo._hasResource["wm.base.widget.Layers"]=true;
dojo.provide("wm.base.widget.Layers");
dojo.declare("wm.Layer",wm.Container,{height:"100%",width:"100%",caption:"",layoutKind:"top-to-bottom",closable:false,destroyable:false,showDirtyFlag:false,destroy:function(){
this._isLayerDestroying=true;
var _509=this.parent;
if(_509&&_509 instanceof wm.Layers){
_509.setCaptionMapLayer(this.caption,null);
}
this.inherited(arguments);
if(_509&&_509.conditionalTabButtons&&!_509.decorator.tabsControl.isDestroyed){
_509.decorator.tabsControl.setShowing(_509.getVisibleLayerCount()>1);
}
},init:function(){
this.inherited(arguments);
if(this.title){
this.caption=this.title;
delete this.title;
}
this.setCaption(this.caption);
if(!this.isRelativePositioned){
dojo.addClass(this.domNode,"wmlayer");
}
},setParent:function(_50a){
this.inherited(arguments);
if(this.parent){
this.setBorder(this.parent.clientBorder);
this.setBorderColor(this.parent.clientBorderColor);
}
},setName:function(_50b){
if(this.parent){
delete this.parent.widgets[this.name];
}
this.addRemoveDefaultCssClass(false);
wm.Component.prototype.setName.apply(this,arguments);
if(this.parent){
this.parent.widgets[this.name]=this;
}
this.addRemoveDefaultCssClass(true);
},activate:function(){
var p=this.parent;
if((this.showing||wm.BreadcrumbLayers&&this.parent instanceof wm.BreadcrumbLayers)&&!this.isActive()){
if(!this.showing){
this.show();
}
p.setLayer(this);
}
},activateAllParents:function(){
var p=this.parent;
p.setLayer(this);
var _50c=this.parent.isAncestorInstanceOf(wm.Layer);
if(_50c){
_50c.activateAllParents();
}else{
_50c=this.parent.isAncestorInstanceOf(wm.Dialog);
if(_50c){
_50c.show();
}
}
},update:function(){
this.activate();
},isActive:function(){
return this.active;
},setShowing:function(_50d){
if(!this.canChangeShowing()){
return;
}
var p=this.parent;
if(this.showing!=_50d){
this.showing=_50d;
this.decorator.setLayerShowing(this,_50d);
if(!_50d&&p.layerIndex==this.getIndex()){
p.setNext();
}
}
if(p&&p.conditionalTabButtons&&!p.decorator.tabsControl.isDestroyed){
p.decorator.tabsControl.setShowing(p.getVisibleLayerCount()>1);
}
},show:function(){
this.setShowing(true);
},hide:function(){
this.setShowing(false);
},setCaption:function(_50e){
this.caption=_50e;
if(this.parent){
this.parent.setCaptionMapLayer(_50e,this);
}
if(this.decorator){
this.decorator.applyLayerCaption(this);
}
},setIsDirty:function(_50f){
if(this.isDirty!=_50f){
this.isDirty=_50f;
if(this.showDirtyFlag){
var _510=this.caption;
_510=_510.replace(/^\<span class="DirtyTab"\>\*\<\/span\>\s*/,"");
if(_50f){
_510="<span class=\"DirtyTab\">*</span> "+_510;
}
this.setCaption(_510);
}
}
},getIndex:function(){
var p=this.parent;
return p&&p.indexOfLayer(this);
},onShow:function(){
this.callOnShowParent();
},onDeactivate:function(){
},onCloseOrDestroy:function(){
},customCloseOrDestroy:function(){
},setClosable:function(_511){
this.closable=_511;
this.decorator.applyLayerCaption(this);
},setDestroyable:function(_512){
this.destroyable=_512;
this.decorator.applyLayerCaption(this);
},handleBack:function(_513){
if(this.active){
return false;
}
this.activate();
return true;
},onTabDrop:function(){
}});
dojo.declare("wm.Layers",wm.Container,{manageHistory:true,manageURL:false,isMobileFoldingParent:false,transition:"none",clientBorder:"",clientBorderColor:"",layerIndex:-1,defaultLayer:-1,decoratorClass:wm.LayersDecorator,layersType:"Layers",layoutKind:"top-to-bottom",height:"100%",width:"100%",destroy:function(){
this.inherited(arguments);
if(this.decorator){
this.decorator.destroy();
this.decorator=null;
}
this.layers=null;
this.captionMap=null;
this.client=null;
},prepare:function(){
this.layers=[];
this.captionMap=[];
this.inherited(arguments);
var _514=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop";
this._headerHeight=(_514&&this.mobileHeaderHeight)?this.mobileHeaderHeight||this.headerHeight:this.headerHeight;
},build:function(){
this.inherited(arguments);
this.setLayersType(this.layersType);
},init:function(){
this.userDefHeaderHeight=this.headerHeight;
if(!this.isRelativePositioned){
dojo.addClass(this.domNode,"wmlayers");
}else{
this.setHeaderHeight("20px");
}
this.client=new wm.Panel({isRelativePositioned:this.isRelativePositioned,border:"0",margin:"0",padding:"0",name:"client",parent:this,owner:this,height:"100%",width:"100%",verticalAlign:"top",horizontalAlign:"left",flags:{notInspectable:true,bindInspectable:true}});
this.inherited(arguments);
this._isDesign=this.isDesignLoaded();
},postInit:function(){
this.inherited(arguments);
this._initDefaultLayer();
if(wm.widgetIsShowing(this)){
this._fireLayerOnShow();
}
if(this.manageURL&&this.owner.locationState){
this.restoreFromLocationHash(this.owner.locationState[this.getRuntimeId()]);
}
},_initDefaultLayer:function(){
var d=this.defaultLayer;
d=d!=-1?d:0;
var dl=this.getLayer(d);
if(dl&&!dl.showing){
d=this._getNextShownIndex(d);
dl=this.getLayer(d);
}
if(dl){
this._setLayerIndex(dl.getIndex());
}
},getVisibleLayerCount:function(){
var _515=0;
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].showing){
_515++;
}
}
return _515;
},createLayer:function(_516){
var _517=_516;
if(!_517){
_517=this.owner.getUniqueName("layer1");
}
var name=_517;
if(name){
name=name.replace(/\s/g,"_");
}
var _518=this.owner.getUniqueName(name);
var _519={width:"100%",height:"100%",caption:_517,parent:this,horizontalAlign:"left",verticalAlign:"top",themeStyleType:this.themeStyleType,border:this.clientBorder,borderColor:this.clientBorderColor};
var o=this.getRoot();
if(o){
return o.createComponent(_518,"wm.Layer",_519);
}
},addPageContainerLayer:function(_51a,_51b,_51c){
var _51d=this.getLayerByCaption(_51b);
if(_51d){
if(_51c||_51c===undefined){
_51d.activate();
}
return _51d;
}
_51d=this.createLayer(_51b);
new wm.PageContainer({owner:this.owner,parent:_51d,name:this.owner.getUniqueName(_51d.name+"PageContainer"),width:"100%",height:"100%",pageName:_51a,deferLoad:false});
if(_51c||_51c===undefined){
_51d.activate();
}
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
return _51d;
},themeStyleType:"",setThemeStyleType:function(_51e){
this.themeStyleType=_51e;
for(var i=0;i<this.layers.length;i++){
this.layers[i].setThemeStyleType(_51e);
}
},setClientBorder:function(_51f){
this.clientBorder=_51f;
var _520=this.isDesignLoaded()?"set_border":"setBorder";
for(var i=0;i<this.layers.length;i++){
this.layers[i][_520](_51f);
}
},setClientBorderColor:function(_521){
this.clientBorderColor=_521;
for(var i=0;i<this.layers.length;i++){
this.layers[i].setBorderColor(_521);
}
},addLayer:function(_522,_523){
var pg=this.createLayer(_522);
if(!_523){
this._setLayerIndex(this.getCount()-1);
}else{
pg.active=false;
}
return pg;
},addWidget:function(_524){
if(_524 instanceof wm.Layer){
this.client.addWidget(_524);
this.layers.push(_524);
this.setCaptionMapLayer(_524.caption,_524);
if(this.decorator){
this.decorator.decorateLayer(_524,this.getCount()-1);
this.decorator.setLayerActive(_524,false);
}
}else{
this.inherited(arguments);
}
},removeWidget:function(_525){
if(_525 instanceof wm.Layer){
var _526=_525.isActive();
var i=this.indexOfLayer(_525);
this.layers.splice(i,1);
this.setCaptionMapLayer(_525.caption,null);
this.decorator.undecorateLayer(_525,i);
_525.active=false;
_525.inFlow=false;
this.client.removeWidget(_525);
if(_526&&!this._isDestroying&&this.layers.length){
if(this.layers.length>i){
this.layerIndex=-1;
this.setLayerIndex(i);
}else{
this.setLayerIndex(i-1);
}
}else{
if(!this._isDestroying&&i<=this.layerIndex){
this.layerIndex--;
}
}
}else{
this.inherited(arguments);
}
},addControl:function(_527){
if(_527.owner==this){
this.inherited(arguments);
}else{
if(_527 instanceof wm.Layer){
this.client.addControl(_527);
}
}
},removeControl:function(_528){
if(_528.owner==this){
this.inherited(arguments);
}else{
if(_528 instanceof wm.Layer){
this.client.removeControl(_528);
}
}
},insertControl:function(_529,_52a){
if(_529 instanceof wm.Layer){
this.addControl(_529);
this.moveLayerIndex(_529,_52a);
}else{
this.inherited(arguments);
}
},moveControl:function(_52b,_52c){
if(_52b instanceof wm.Layer){
if(dojo.indexOf(this.layers,_52b)!=-1){
this.moveLayerIndex(_52b,_52c);
}else{
}
}else{
this.inherited(arguments);
}
},isWidgetTypeAllowed:function(_52d){
return _52d=="wm.Layer";
},getLayer:function(_52e){
return this.layers[_52e!=undefined?_52e:this.layerIndex];
},getActiveLayer:function(){
if(this.layerIndex!=-1){
return this.layers[this.layerIndex];
}
var _52f=(this.defaultLayer==-1)?0:this.defaultLayer;
return this.layers[_52f];
},removeLayer:function(_530){
if(!this.layers){
return;
}
var p=this.getLayer(_530);
if(p){
this.removeWidget(p);
}
},indexOfLayer:function(_531){
for(var i=0,l;(l=this.getLayer(i));i++){
if(l==_531){
return i;
}
}
return -1;
},indexOfLayerName:function(_532){
for(var i=0,l;(l=this.getLayer(i));i++){
if(l.name==_532){
return i;
}
}
return -1;
},indexOfLayerCaption:function(_533){
return this.indexOfLayer(this.captionMap[_533]);
},getLayerCaption:function(_534){
var p=this.getLayer(_534);
return p&&p.caption;
},getLayerByCaption:function(_535){
return this.getLayer(this.indexOfLayerCaption(_535));
},setLayerByCaption:function(_536){
var p=this.captionMap[_536];
this.setLayerByName(p&&p.name?p.name:_536);
},setLayerByName:function(_537){
var l=this.client.widgets[_537];
if(l){
this.setLayer(l);
}else{
if(_537){
this.addLayer(_537);
}
}
},setLayer:function(_538){
if(_538 instanceof wm.Layer){
this.setProp("layerIndex",_538.getIndex());
}else{
this.setLayerByName(_538);
}
},setLayerInactive:function(_539){
wm.fire(_539.decorator,"deactivateLayer",[_539]);
_539.onDeactivate();
},setLayerIndex:function(_53a){
if(_53a==this.layerIndex){
return;
}
var _53b=!this.loading;
var _53c=this.layers[this.layerIndex];
var l=this.getLayer(_53a);
if(_53b){
var info={newIndex:_53a,canChange:undefined};
this.oncanchange(info);
if(info.canChange===false){
return;
}
_53a=info.newIndex;
}
if(_53a<0||_53a>this.getCount()-1){
return;
}
if(_53b&&_53c){
_53c.callOnHideParent();
}
this._setLayerIndex(_53a);
if(_53b){
if(l){
if(app.debugDialog&&!this.isAncestor(app.debugDialog)){
var i=0;
var _53d=arguments.callee.caller;
var _53e=["setProp","setLayer","setLayerByName","setLayerByCaption","addLayer","activate","update"];
while(_53d&&dojo.indexOf(_53e,_53d.nom)!=-1&&i<15){
_53d=_53d.caller;
i++;
}
var _53f=app.debugDialog.newLogEvent({eventType:"layer",sourceDescription:(_53d&&_53d.nom?_53d.nom+"()":""),resultDescription:"Activating Layer: "+l.getRuntimeId()+".activate()",firingId:l.getRuntimeId(),affectedId:l.getRuntimeId(),method:"hide"});
}
l.onShow();
if(_53f){
app.debugDialog.endLogEvent(_53f);
}
}
_53c&&_53c.onDeactivate();
}
if(_53b&&this.lastLayerIndex!=this.layerIndex){
this.onchange(this.layerIndex);
}
if(!this._initialization&&_53c&&!this._isDesignLoaded&&this.manageHistory){
app.addHistory({id:_53c.getRuntimeId(),options:{},title:"Show "+l.caption});
}
},_setLayerIndex:function(_540){
this.lastLayerIndex=this.layerIndex;
this.layerIndex=_540;
var l=this.getLayer(_540);
if(l){
this.decorator.activateLayer(l);
var page=this.getParentPage();
if(page&&page.validateVisibleOnly){
this.validate();
}
}
},setDecoratorClass:function(_541){
this.decoratorClass=_541;
this.createDecorator();
},createDecorator:function(){
if(this.decorator){
this.decorator.destroy();
}
this.decorator=this.decoratorClass?new this.decoratorClass(this):null;
},setLayersType:function(_542){
var ctor=wm[_542+"Decorator"];
if(!ctor){
return;
}
this.layersType=_542;
var i=this.layerIndex;
if(this.decorator){
this.decorator.undecorate();
this.decorator.destroy();
this.decorator=null;
}
this.setDecoratorClass(ctor);
this.decorator.decorate();
this._setLayerIndex(i);
this.reflow();
},setDefaultLayer:function(_543){
this.defaultLayer=_543;
},getCount:function(){
return this.layers.length;
},setCaptionMapLayer:function(_544,_545){
try{
this.captionMap[_544]=_545;
}
catch(e){
}
},_getNextShownIndex:function(_546,_547){
var _548=this.layers.length;
for(var i=_546+1;i<_548&&!this.layers[i].showing;i++){
}
if(this.layers[i]&&this.layers[i].showing){
return i;
}
if(!_547){
return this._getPrevShownIndex(_546,true);
}
return 0;
},_getPrevShownIndex:function(_549,_54a){
for(var i=_549-1;i>=0&&!this.layers[i].showing;i--){
}
if(this.layers[i]&&this.layers[i].showing){
return i;
}
if(!_54a){
return this._getNextShownIndex(_549,true);
}
return 0;
},setNext:function(_54b){
var p=this._getNextShownIndex(Number(this.layerIndex),false);
if(p!==undefined){
this.setLayerIndex(p);
}
},setPrevious:function(_54c){
var p=this._getPrevShownIndex(Number(this.layerIndex),false);
if(p!==undefined){
this.setLayerIndex(p);
}
},moveLayerIndex:function(_54d,_54e){
var i=_54d.getIndex(),_54e=Math.max(0,Math.min(_54e,this.getCount()-1));
if(i==_54e){
return;
}
this.layers.splice(i,1);
this.layers.splice(_54e,0,_54d);
this.decorator.moveLayerIndex(i,_54e);
if(_54d.active){
this._setLayerIndex(_54e);
}else{
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].active){
this.layerIndex=i;
break;
}
}
}
},_fireLayerOnShow:function(){
var l=this.getLayer(this.layerIndex);
l&&l.onShow();
},_onShowParent:function(){
this._fireLayerOnShow();
},clear:function(){
wm.forEach(this.widgets,function(w){
w.destroy();
});
this.widgets={};
this.layers=[];
this.domNode.innerHTML="";
},_oncanchangeBeforeStart:1,oncanchange:function(_54f){
var l=this.getLayer(_54f.newIndex);
_54f.canChange=(l&&l.showing);
},onchange:function(_550){
},headerHeight:"27px",mobileHeaderHeight:"37px",setHeaderHeight:function(_551){
if(this.layersType!="Tabs"&&this.layersType!="RoundedTabs"&&this.layersType!="Wizard"&&this.layersType!="Breadcrumb"){
return;
}
this._headerHeight=_551;
this.decorator&&this.decorator.tabsControl&&this.decorator.tabsControl.setHeight(_551);
delete this._lastTabHeight;
this.renderBounds();
},renderBounds:function(){
this.inherited(arguments);
if(this.layersType!="Tabs"&&this.layersType!="RoundedTabs"){
return;
}
if(!this.decorator||!this.decorator.tabsControl){
return;
}
if(this.decorator.tabsControl.isDestroyed){
return;
}
wm.job(this.getRuntimeId()+".renderBounds",10,this,function(){
if(this.isDestroyed||this._lockHeaderHeight){
return;
}
if(this.decorator.btns.length<=1){
return;
}
var _552=this.decorator.tabsControl.bounds.h;
this.decorator.tabsControl.domNode.style.height="auto";
var _553;
var _554,_555;
for(var i=this.decorator.btns.length-1;i>=1;i--){
if(this.decorator.btns[i].style.display!="none"){
if(!_555){
_555=this.decorator.btns[i];
}
_554=this.decorator.btns[i];
break;
}
}
if(_554&&Math.abs(_555.offsetTop-_554.offsetTop)>4){
if(this._headerHeight==this.decorator.tabsControl.height){
this.decorator.tabsControl.domNode.style.height=this.decorator.tabsControl.bounds.h+"px";
}else{
this.decorator.tabsControl.setHeight(this._headerHeight);
}
}else{
_553=Math.max(this.decorator.tabsControl.domNode.clientHeight,parseInt(this._headerHeight));
if(_553!=this.decorator.tabsControl.bounds.h){
this.decorator.tabsControl.setHeight(_553+"px");
}else{
this.decorator.tabsControl.domNode.style.height=this.decorator.tabsControl.bounds.h+"px";
}
}
});
},getMinHeightProp:function(){
if(this.minHeight){
return this.minHeight;
}
var _556=80;
if(this.layersType.match(/tabs/i)){
_556+=parseInt(this._headerHeight);
}
return _556;
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
var _557=80;
if(this.layersType.match(/tabs/i)){
_557+=120;
}
return _557;
},restoreFromLocationHash:function(_558){
var _559=_558;
if(_559!==undefined){
var w=this.manageHistory;
this.manageHistory=false;
var _55a=Number(_558);
this.setLayerIndex(_558);
this.manageHistory=w;
}
},generateStateUrl:function(_55b){
if(!this._isDesignLoaded&&this.getActiveLayer()){
var _55c=this.defaultLayer==-1?0:this.defaultLayer;
var _55d=this.layerIndex;
if(_55d!=_55c&&!this.getActiveLayer()._mobileFoldingGenerated){
_55b[this.getRuntimeId()]=this.layerIndex;
}
}
}});
dojo.declare("wm.TabLayers",wm.Layers,{dndTargetName:"",themeStyleType:"ContentPanel",layersType:"Tabs",conditionalTabButtons:false,verticalButtons:false,headerWidth:"50px",postInit:function(){
this.inherited(arguments);
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
},addLayer:function(_55e,_55f){
var _560=this.inherited(arguments);
if(!this._cupdating&&!this.owner._loadingPage){
this.renderBounds();
}
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
return _560;
},removeLayer:function(_561){
this.inherited(arguments);
if(this.conditionalTabButtons&&!this.isDestroyed){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
},onCloseOrDestroy:function(_562){
},customCloseOrDestroy:function(_563){
},onTabDrop:function(){
},onTabRemoved:function(){
}});
}
if(!dojo._hasResource["wm.base.RbacPlugin"]){
dojo._hasResource["wm.base.RbacPlugin"]=true;
dojo.provide("wm.base.RbacPlugin");
wm.Plugin.plugin("rbac",wm.Widget,{roles:"",prepare:function(){
this.rbacSocket(arguments);
if(this.roles&&this.roles.length&&app.isSecurityEnabled){
this._rbacShowingRequested=this.showing;
this.showing=this.updateRbacShowing(this.showing);
this.subscribe("wmRbacUpdate",this,"reshowRbac");
}
},reshowRbac:function(){
this.setShowing(this._rbacShowingRequested);
},setShowing:function(_564){
if(this instanceof wm.Layer==false&&this.roles){
_564=this.updateRbacShowing(_564);
}
this.rbacSocket(arguments);
},updateRbacShowing:function(_565){
if(!this._cupdating){
this._rbacShowingRequested=_565;
}
return _565&&this.isRbacShowAllowed();
},isRbacShowAllowed:function(){
var _566=this._getUserRoles();
if(_566){
for(var i=0,r;(r=this.roles[i]);i++){
for(var j=0,ur;(ur=_566[j]);j++){
if(r==ur){
return true;
}
}
}
return false;
}
return true;
},_getUserRoles:function(){
if(this.isDesignLoaded()){
return null;
}else{
return wm.getUserRoles();
}
}});
wm.Plugin.plugin("rbacLayer",wm.Layer,{setShowing:function(_567){
if(this.roles&&this.roles.length){
_567=this.updateRbacShowing(_567);
}
this.rbacLayerSocket(arguments);
}});
wm.Plugin.plugin("rbacservice",wm.ServiceVariable,{roles:"",update:function(){
if(djConfig.isDebug){
try{
this.log("update",arguments.callee.caller.nom||arguments.callee.caller.name||"anonymous");
}
catch(e){
}
}
if(!this.roles||this.isRbacUpdateAllowed()){
return this.rbacserviceSocket(arguments);
}else{
return new dojo.Deferred();
}
},updateInternal:function(){
if(!this.roles||this.isRbacUpdateAllowed()){
return this.rbacserviceSocket(arguments);
}else{
}
},isRbacUpdateAllowed:function(){
var _568=this._getUserRoles();
if(_568){
for(var i=0,r;(r=this.roles[i]);i++){
for(var j=0,ur;(ur=_568[j]);j++){
if(r==ur){
return true;
}
}
}
return false;
}
return true;
},_getUserRoles:function(){
if(this.isDesignLoaded()){
return null;
}else{
return wm.getUserRoles();
}
}});
wm.Plugin.plugin("mobile",wm.Control,{deviceSizes:"",prepare:function(_569){
this.mobileSocket(arguments);
if(this.deviceSizes||_569.deviceSizes||window["studio"]&&this.deviceType){
this._mobileShowingRequested=this.showing;
this.showing=this.updateMobileShowing(this.showing);
this.subscribe("deviceSizeRecalc",this,"reshowMobile");
}
},reshowMobile:function(){
this.setShowing(this._mobileShowingRequested||this.showing);
},setShowing:function(_56a){
if(this instanceof wm.Layer==false&&this.deviceSizes||this._isDesignLoaded&&this.deviceType){
_56a=this.updateMobileShowing(_56a);
}
this.mobileSocket(arguments);
},updateMobileShowing:function(_56b){
if(!this._cupdating){
this._mobileShowingRequested=_56b;
}
if(this.deviceSizes&&this.deviceSizes.length||this._isDesignLoaded&&this.deviceType){
return _56b&&this.isMobileShowAllowed();
}else{
return _56b;
}
},isMobileShowAllowed:function(){
if(window["studio"]&&this.isDesignLoaded()){
var _56c=studio.currentDeviceType;
if(_56c&&this.deviceType&&dojo.indexOf(this.deviceType,_56c)==-1){
return false;
}
var _56d=studio.deviceSizeSelect.getDataValue();
if(!_56d){
return true;
}
if(_56c=="desktop"||studio.portraitToggleButton.clicked){
_56d=_56d.width;
}else{
_56d=_56d.height;
}
if(_56d=="100%"){
return true;
}
_56d=app.appRoot.calcDeviceSize(parseInt(_56d));
var isOk=true;
if(this.deviceSizes&&dojo.indexOf(this.deviceSizes,_56d)==-1){
return false;
}
return true;
}else{
var _56d=app.appRoot.deviceSize;
return (!_56d||dojo.indexOf(this.deviceSizes,_56d)!=-1);
}
}});
wm.Plugin.plugin("mobileLayer",wm.Layer,{deviceSizes:"",setShowing:function(_56e){
_56e=this.updateMobileShowing(_56e);
this.mobileLayerSocket(arguments);
}});
}
if(!dojo._hasResource["wm.base.I18nPlugin"]){
dojo._hasResource["wm.base.I18nPlugin"]=true;
dojo.provide("wm.base.I18nPlugin");
wm.getDictionaryItem=function(name,_56f){
if(_56f==undefined){
return wm.locale.phrases[name];
}
var _570={};
for(var i in _56f){
_570[i]=(_56f[i]===undefined||_56f[i]===null)?"":_56f[i];
}
return dojo.string.substitute(wm.locale.phrases[name],_570);
};
wm.Plugin.plugin("i18n",wm.Component,{prepare:function(_571){
if(_571&&_571.owner){
var _572=_571.owner.getDictionaryItem(_571.name);
}
if(_572){
_571=dojo.mixin(_571,_572);
}
if(wm.branding){
var app=_571.owner?_571.owner.getOwnerApp():null;
if(app&&app._brandingDictionary){
var _573=_571.owner;
var _574;
if(_573==app){
_574="app";
}else{
if(_573 instanceof wm.Page){
_574=_573.declaredClass;
}
}
if(_574&&app._brandingDictionary[_574]&&app._brandingDictionary[_574][_571.name]){
var _575=app._brandingDictionary[_574][_571.name];
var _576=dojo.locale;
for(prop in _575){
var _577=_575[prop];
if(_577[_576]!==undefined){
_571[prop]=_577[_576];
}else{
if(_577["default"]!==undefined){
_571[prop]=_577["default"];
}
}
}
}
}
}
this.i18nSocket(arguments);
},getDictionaryItem:function(name,_578){
if(!this._i18nDictionary){
if(this.owner){
return this.owner.getDictionaryItem(name,_578);
}else{
return "";
}
}
if(_578==undefined){
return this._i18nDictionary[name];
}else{
var _579={};
for(var i in _578){
_579[i]=(_578[i]===undefined||_578[i]===null)?"":_578[i];
}
return dojo.string.substitute(this._i18nDictionary[name],_579);
}
}});
}
if(!dojo._hasResource["wm.base.components.CssLoader"]){
dojo._hasResource["wm.base.components.CssLoader"]=true;
dojo.provide("wm.base.components.CssLoader");
dojo.declare("wm.CssLoader",wm.Component,{url:"",css:"",relativeUrl:true,init:function(){
this.inherited(arguments);
if(this.url){
this.setUrl(this.url);
}else{
this.setCss(this.css);
}
},destroy:function(){
this._sheet=null;
this.inherited(arguments);
},getStyleSheet:function(){
if(dojo.isIE&&!this._sheet){
this._sheet=wm.CssLoader.sheet||(wm.CssLoader.sheet=this.makeSheet());
}
if(!this._sheet){
this._sheet=this.makeSheet();
}
return this._sheet;
},makeSheet:function(){
var _57a=document.createElement("style");
_57a.setAttribute("type","text/css");
document.getElementsByTagName("head")[0].appendChild(_57a);
return _57a;
},setUrl:function(_57b){
this.url=_57b||"";
if(this.url){
var _57c=this.relativeUrl?this.getPath()+this.url:this.url;
this.setCss(wm.load(_57c,true));
}
},setCss:function(_57d){
this.clearCss();
this.css=_57d||"";
if(this.css){
this.addCss(this.css);
}
},clearCss:function(){
this.css="";
this.removeCss();
},removeCss:function(){
if(dojo.isIE){
return;
}
var s=this.getStyleSheet();
if(s){
if(s.styleSheet){
s.styleSheet.cssText="";
}else{
while(s.firstChild){
s.removeChild(s.firstChild);
}
}
}
},addCss:function(_57e){
if(this.isDesignLoaded()){
var p=this.getPath();
_57e=_57e.replace(/url\s*\(\s*([^(http:)\/].*)\.*\)/g,"url("+p+"$1)");
}
var s=this.getStyleSheet();
if(s.styleSheet){
s.styleSheet.cssText=[s.styleSheet.cssText,_57e].join("\n");
}else{
s.appendChild(document.createTextNode("\n"));
s.appendChild(document.createTextNode(_57e));
}
}});
}
if(!dojo._hasResource["wm.base.components.Application"]){
dojo._hasResource["wm.base.components.Application"]=true;
dojo.provide("wm.base.components.Application");
wm.componentLoaders=wm.componentLoaders||{};
wm.registerComponentLoader=function(_57f,_580){
wm.componentLoaders[_57f]=_580;
};
dojo.declare("wm.Application",wm.Component,{debugDialog:null,touchToClickDelay:500,touchToRightClickDelay:1500,eventDelay:wm.isMobile?100:0,manageURL:false,manageHistory:true,i18n:false,main:"Main",tabletMain:"",phoneMain:"",isSecurityEnabled:false,phoneGapLoginPage:"Login",disableDirtyEditorTracking:false,deletionDisabled:1,projectSubVersion:"Alpha",projectVersion:1,studioVersion:"",theme:"wm_notheme",toastPosition:"br",_lastTheme:"",init:function(){
this.history=[];
if(window["onpopstate"]!==undefined){
this._initializingBack=true;
this.connect(window,"onpopstate",this,"_onBack");
}
this.requireLocalization();
if(djConfig.isDebug){
dojo["require"]("common."+wm.version.replace(/[^a-zA-Z0-9]/g,"")+"_patches",true);
}
window.app=wm.application=wm.application||this;
this.connectList=[];
this.app=this;
if(this.i18n){
try{
dojo["requireLocalization"]("language","app");
this._i18nDictionary=dojo.i18n.getLocalization("language","app");
}
catch(e){
}
}
this.loadBranding();
this.inherited(arguments);
this._isDesignLoaded=(window["studio"]&&this!=app);
if(!this._isDesignLoaded){
wm.typeManager.initTypes();
}
if(this._isDesignLoaded){
studio._application=this;
}
var node=this._isDesignLoaded?null:document.body.parentNode;
if(node){
dojo.addClass(node,"WMApp");
}
var _581=window.location.search.match(/theme\=(.*?)\&/)||window.location.search.match(/theme\=(.*?)$/);
this.setTheme(_581?_581[1]:this.theme,true);
if(this._css){
this._cssLoader=new wm.CssLoader({owner:this});
this._cssLoader.setCss(this._css);
}
if(wm.isMobile){
if(wm.isAndroid>2||wm.isAndroid=="chrome"||wm.isIOS&&wm.isIOS>4){
}else{
this._touchEnabled=true;
}
}
this.$=this.components={};
if(!this._isDesignLoaded){
if(wm.serverTimeOffset===undefined){
this.getServerTimeOffset();
}else{
wm.currentTimeZone=new Date().getTimezoneOffset();
}
window.setInterval(dojo.hitch(this,"_pollForTimezoneChange"),10000);
}
this._setupKeys();
},_pollForTimezoneChange:function(){
if(new Date().getTimezoneOffset()!=wm.currentTimeZone){
wm.setTimeZoneOffset();
wm.currentTimeZone=new Date().getTimezoneOffset();
}
},getServerTimeOffset:function(){
if(!this.serverTimeSVar){
var _582=this.serverTimeSVar=new wm.ServiceVariable({owner:this,name:"serverTimeSVar",service:"waveMakerService",operation:"getServerTimeOffset",onSuccess:function(_583){
wm.serverTimeOffset=_583;
wm.setTimeZoneOffset();
wm.currentTimeZone=new Date().getTimezoneOffset();
}});
}
this.serverTimeSVar.update();
},_setupKeys:function(){
this._keys={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"BREAK",20:"CAPS",27:"ESC",32:" ",33:"PAGE UP",34:"PAGE DOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",45:"INSERT",46:"DELETE",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"LEFT WINDOW",92:"RIGHT WINDOW",93:"SELECT",96:"NUMPAD 0",97:"NUMPAD 1",98:"NUMPAD 2",99:"NUMPAD 3",100:"NUMPAD 4",101:"NUMPAD 5",102:"NUMPAD 6",103:"NUMPAD 7",104:"NUMPAD 8",105:"NUMPAD 9",106:"NUMPAD *",107:"NUMPAD +",108:"NUMPAD ENTER",109:"NUMPAD -",110:"NUMPAD .",111:"NUMPAD /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NUMLOCK",145:"SCROLLLOCK",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"\""};
},requireLocalization:function(){
if(djConfig.isDebug){
dojo.registerModulePath("wm.language",wm.libPath+"/wm/language");
}
wm.locale={};
wm.locale.phrases=dojo.i18n.getLocalization("wm.language","components");
wm.locale.props=dojo.i18n.getLocalization("wm.language","properties");
},loadBranding:function(){
if(wm.branding){
this._brandingDictionary=dojo.fromJson(wm.load("branding/"+wm.branding+"/branding.js"));
var _584=document.createElement("link");
_584.type="text/css";
_584.rel="stylesheet";
_584.href="branding/"+wm.branding+"/branding.css";
document.getElementsByTagName("head")[0].appendChild(_584);
}
},createDebugDialog:function(){
dojo["require"]("wm.base.debug.Dialog");
dojo["require"]("wm.base.components.JsonRpcService");
if(!this.debugDialog){
this.debugDialog=new wm.debug.Dialog({owner:this,titlebarButtons:"DebuggerHelpIcon",name:"debugDialog",width:"700px",height:"400px",corner:"cr"});
}
},setTheme:function(_585,_586,_587,_588,_589,_58a){
var _58b=window.location.search.match(/theme\=(.*?)\&/)||window.location.search.match(/theme\=(.*?)$/);
var node=this._isDesignLoaded?studio.designer.domNode:document.body;
dojo.removeClass(node,this.theme);
if(this._isDesignLoaded&&!_586){
try{
if(this._isDesignLoaded&&!_586){
this._themeChanged=true;
this.cacheWidgets();
}
}
catch(e){
}
}
this._lastTheme=this.theme;
this.theme=_585;
dojo.addClass(node,this.theme);
if(this._isDesignLoaded||!_586||_58b){
try{
this.loadThemeCss(this.theme,this._isDesignLoaded,_587);
this.loadThemePrototype(this.theme,_588);
if(this._isDesignLoaded&&!_586&&!_589){
this.useWidgetCache();
}
}
catch(e){
if(_585!="wm_notheme"){
this.setTheme("wm_notheme",_586,_587,_588,_589);
app.alert(wm.getDictionaryItem("wm.Application.ALERT_MISSING_THEME",{name:_585}));
}else{
app.alert(wm.getDictionaryItem("wm.Application.ALERT_MISSING_NOTHEME",{name:_585}));
}
return;
}
}else{
this.loadThemePrototype(this.theme,_588);
}
},cacheWidgets:function(){
if(!this._widgetsjs){
var _58c="";
var _58d=studio.page.components;
for(c in _58d){
if(_58d[c] instanceof wm.Dialog){
_58c+=_58d[c].write("")+",";
}
}
var _58e=dojo.fromJson("{"+_58c+studio.page.root.write("")+"}");
this._widgetsjs=_58e;
}
},useWidgetCache:function(){
studio.page.root.destroy();
delete studio.page.root;
var _58f=studio.page.components;
for(c in _58f){
if(_58f[c] instanceof wm.Dialog){
_58f[c].destroy();
}
}
studio.page.loadComponents(this._widgetsjs,null);
delete this._widgetsjs;
studio.page.reflow();
studio.refreshWidgetsTree();
},loadThemePrototype:function(_590,_591){
var _592=wm.Application.themeData[_590];
if(!_592||_591){
var path;
if(_590.match(/^wm_/)){
path=dojo.moduleUrl("wm")+"base/widget/themes/"+_590+"/Theme.js";
}else{
path=dojo.moduleUrl("common")+"themes/"+_590+"/Theme.js";
}
_592=_591||dojo.fromJson(dojo.xhrGet({url:path,sync:true,preventCache:true}).results[0]);
wm.Application.themeData[_590]=_592||{};
}
var _593=_592["wm.Control"];
for(var j in _593){
wm.Control.prototype[j]=_593[j];
}
wm.Application.themePrototypeData={"wm.Control":this.theme};
},loadThemePrototypeForClass:function(ctor,_594){
if(!this.theme||!ctor){
return;
}
if((window["StudioApplication"])&&!wm.defaultPrototypeValues){
wm.defaultPrototypeValues={};
}
var _595=ctor.prototype.declaredClass;
if(_595=="wm.Template"){
_595="wm.Panel";
}
if(!wm.Application.themePrototypeData[_595]||wm.Application.themePrototypeData[_595]!=this.theme){
var p=ctor.prototype;
var _596=wm.Application.themePrototypeData[_595];
var _597=wm.Application.themeData[_596];
if(_597){
var _598=_597[_595];
if(_598){
for(var j in _598){
if(wm.defaultPrototypeValues&&wm.defaultPrototypeValues[_595]&&j in wm.defaultPrototypeValues[_595]){
p[j]=wm.defaultPrototypeValues[_595][j];
delete wm.defaultPrototypeValues[_595][j];
}else{
delete p[j];
}
if(p[j]===undefined){
p[j]="";
}
}
}
if(wm.defaultPrototypeValues&&wm.defaultPrototypeValues[_595]){
delete wm.defaultPrototypeValues[_595];
}
}
var _599=wm.Application.themeData[this.theme];
var _59a=_599[ctor.prototype.declaredClass];
if(_59a){
for(var j in _59a){
if(wm.defaultPrototypeValues&&!wm.defaultPrototypeValues[_595]){
wm.defaultPrototypeValues[_595]={};
}
if(wm.defaultPrototypeValues){
wm.defaultPrototypeValues[_595][j]=ctor.prototype[j];
}
ctor.prototype[j]=_59a[j];
if(_594&&_598&&_594[j]===_598[j]){
_594[j]=_59a[j];
}
}
}
wm.Application.themePrototypeData[_595]=this.theme;
}
if(wm.locale.props){
var _59a=wm.locale.props[_595];
}
if(_59a){
for(var j in _59a){
ctor.prototype[j]=_59a[j];
if(_594){
_594[j]=_59a[j];
}
}
}
},loadThemeCss:function(_59b,_59c,_59d){
var path;
var _59e;
if(_59b.match(/^wm_/)){
path=dojo.moduleUrl("wm")+"base/widget/themes/"+_59b+"/theme.css";
}else{
path=dojo.moduleUrl("common")+"themes/"+_59b+"/theme.css";
}
if(_59c){
var _59f=path.replace(/\/[^\/]*$/,"/images");
while(_59f.match(/[^\/]+\/\.\.\//)){
_59f=_59f.replace(/[^\/]+\/\.\.\//,"");
}
if(_59d){
_59e=_59d;
}else{
var _5a0=dojo.xhrGet({url:path,sync:true,preventCache:false}).results;
if(_5a0[1]){
throw _5a0[1];
}
_59e=_5a0[0]||"";
var _5a0=dojo.xhrGet({url:path.replace(/theme\.css/,"custom.css"),sync:true,preventCache:false}).results;
if(!_5a0[1]){
_59e+=_5a0[0]||"";
}
}
_59e=_59e.replace(/url\s*\(\s*images/g,"url("+_59f);
setCss("theme_ss",_59e);
}else{
wm.headAppend(wm.createElement("link",{rel:"stylesheet",type:"text/css",href:path}));
}
},postInit:function(){
this.inherited(arguments);
},destroy:function(){
this._isDestroying=true;
wm.fire(this.scrim,"destroy");
wm.fire(this._runtimeService,"destroy");
this.inherited(arguments);
dojo.forEach(this.connectList,dojo.disconnect);
this.connectList=null;
delete this._page;
if(this.pageContainer){
this.pageContainer.destroy();
this.pageContainer=null;
}
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
if(this.pageDialog){
this.pageDialog.destroy();
}
delete this.pageDialog;
if(this.scrim){
this.scrim.destroy();
}
delete this.scrim;
delete this.app;
},createPageContainer:function(){
if(!this._isDesignLoaded){
this.appRoot=new wm.AppRoot({owner:this,name:"appRoot"});
if(wm.isMobile){
dojo.addClass(document.body,"wmmobile");
}
this.pageContainer=new wm.PageContainer({manageHistory:this.manageHistory,manageURL:this.manageURL,owner:this,parent:this.appRoot,width:"100%",height:"100%",getRuntimeId:function(){
return "";
}});
this.connectList[this.connectList.length]=this.connect(this.pageContainer._pageLoader,"onBeforeCreatePage",this,"beforeCreatePage");
this.connectList[this.connectList.length]=this.connect(this.pageContainer._pageLoader,"onPageChanged",this,"pageChanged");
}
},loadComponents:function(_5a1){
this._loading=true;
this.createComponents(_5a1);
this._loading=false;
},subPageLoaded:function(_5a2){
if(djConfig.isDebug){
if(this.debugSubPageList===undefined){
this.debugSubPageList={};
}
this.debugSubPageList[_5a2.name]=_5a2;
}
},subPageUnloaded:function(_5a3){
if(djConfig.isDebug&&_5a3){
if(this.debugSubPageList!=undefined){
delete (this.debugSubPageList[_5a3.name]);
}
}
},qualifyName:function(_5a4){
return _5a4;
},addComponent:function(_5a5){
this.inherited(arguments);
this[_5a5.name]=_5a5;
},removeComponent:function(_5a6){
delete this[_5a6.name];
this.inherited(arguments);
},getRuntimeService:function(_5a7){
if(!this._runtimeService){
this._runtimeService=new wm.JsonRpcService({service:"runtimeService",owner:_5a7});
}
return this._runtimeService;
},getRuntimeServiceDesignTime:function(_5a8){
if(!this._runtimeService){
this._runtimeService=new wm.JsonRpcService({service:"runtimeService",owner:_5a8||this,designTime:true});
}
return this._runtimeService;
},getRoot:function(){
return this;
},getRuntimeId:function(inId){
return inId;
},getId:function(inId){
if(inId){
return "app."+inId;
}else{
return "app";
}
},reflow:function(_5a9){
var d=this.domNode;
this.appRoot.reflow();
},reflowParent:function(){
this.reflow();
},loadComponent:function(_5aa,_5ab,_5ac,_5ad,_5ae,_5af,_5b0){
return _5ab.createComponent(_5aa,_5ac,_5ad,_5ae,_5af,this);
},hideLoadingIndicator:function(){
var l=dojo.byId("_wm_loading");
if(l){
dojo._destroyElement(l);
}
},run:function(){
app=wm.application=this;
dojo.addOnLoad(dojo.hitch(this,"runOnLoad"));
},runOnLoad:function(){
setTimeout(dojo.hitch(this,"doRun"),dojo.isIE<7?100:1);
},doRun:function(){
if(wm.isPhonegap){
dojo["require"]("build.Gzipped.wm_phonegap_misc",true);
dojo.forEach(wm.componentFixList._phonegap,function(fix){
try{
fix();
}
catch(e){
}
});
}
this.loadComponents(this.constructor.widgets||this.widgets);
this.createPageContainer();
this.domNode=this.appRoot.domNode;
this.reflow();
if(!this.debugDialog){
if(this._overrideDebugDialog!==undefined){
if(this._overrideDebugDialog){
this.createDebugDialog();
}
}else{
if(djConfig.isDebug&&(wm.device!="phone"||wm.isFakeMobile)){
this.createDebugDialog();
}
}
}
if(!wm.isPhonegap){
this.pageDialog=new wm.PageDialog({name:"pageDialog",owner:this});
}
if(dojo.isIE<=8){
var _5b1=document.createElement("BUTTON");
_5b1.style.width="1px";
_5b1.style.height="1px";
this.domNode.appendChild(_5b1);
}
var main;
if(wm.device=="tablet"){
main=this.tabletMain;
}else{
if(wm.device=="phone"){
main=this.phoneMain;
}
}
if(!main){
main=this.main;
}
this.pageContainer._initialPageName=main;
if(window["PhoneGap"]&&this.isSecurityEnabled&&this.isLoginPageEnabled&&this.phoneGapLoginPage){
this.loadPage(this.phoneGapLoginPage);
}else{
this.loadPage(main);
}
this.hideLoadingIndicator();
},start:function(){
},getServerComponents:function(){
if(this.serverComponents===undefined){
this.loadServerComponents();
}
return this.serverComponents;
},loadServerComponents:function(_5b2){
if(_5b2&&this.serverComponents){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c.type==_5b2){
this.serverComponents.splice(i--,1);
}
}
var cl=wm.componentLoaders[_5b2];
if(cl){
this.serverComponents=this.serverComponents.concat(cl.getComponents());
}
}else{
this.serverComponents=[];
for(var i in wm.componentLoaders){
this.serverComponents=this.serverComponents.concat(wm.componentLoaders[i].getComponents());
}
}
},addServerComponent:function(_5b3){
this.serverComponents.push(_5b3);
},removeServerComponent:function(_5b4){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c==_5b4){
this.serverComponents.splice(i,1);
return i;
}
}
},removeServerComponentByName:function(_5b5,_5b6){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c.type==_5b6&&c.name==_5b5){
this.serverComponents.splice(i,1);
return i;
}
}
},beforeCreatePage:function(){
this.pageContainer._pageLoader.pageConnect("start",this,"start");
this.pageLoadedDeferred=new dojo.Deferred();
},pageChanged:function(_5b7,_5b8){
this.page=this._page=_5b7;
var n=_5b7.name,o=(_5b8||0).name;
if(o){
window[o]=undefined;
delete this[o];
}
window[n]=this[n]=this._page;
if(this.pageLoadedDeferred){
this.pageLoadedDeferred.callback({page:_5b7,previousPage:_5b8});
}
this.connect(document,"keydown",_5b7,"keydown");
this.onPageChanged(_5b7,_5b8);
},loadPage:function(_5b9){
var _5ba=!Boolean(this.pageContainer.page);
if(_5ba){
var hash=window.location.hash;
if(hash.length>1){
try{
this.locationState=dojo.fromJson(hash.substring(1));
}
catch(e){
}
}
if(this.manageURL){
this._pageName=this.locationState&&this.locationState.pageName?this.locationState.pageName:_5b9;
}else{
this._pageName=_5b9;
}
}else{
this._pageName=_5b9;
}
try{
this.pageContainer.setPageName(this._pageName);
}
catch(e){
if(djConfig.isDebug){
console.error("loadPage error: "+e);
}
}
},forceReloadPage:function(){
this.loadPage(this._pageName);
},onPageChanged:function(_5bb,_5bc){
},onSessionExpiration:function(){
},getFullVersionNumber:function(){
return this.projectVersion+"."+this.projectSubVersion;
},getSessionId:function(){
if(!this.sessionId){
var a=new wm.JsonRpcService({service:"waveMakerService",sync:true});
a.requestSync("getSessionId",[]);
this.sessionId=a.result;
}
return this.sessionId;
},echoFile:function(_5bd,_5be,_5bf){
if(!this.echoFileService){
this.echoFileService=new wm.ServiceVariable({owner:app,name:"echoFileService",downloadFile:true,service:"waveMakerService",operation:"echo"});
this.echoFileService.input.setType("");
wm.typeManager.addType("echoInputs",{internal:false,fields:{contents:{type:"java.lang.String"},fileType:{type:"java.lang.String"},fileName:{type:"java.lang.String"}}});
this.echoFileService.input.setType("echoInputs");
}
this.echoFileService.input.setData({contents:_5bd,fileType:_5be,fileName:_5bf});
this.echoFileService.update();
},showLoadingDialog:function(_5c0,_5c1,_5c2){
if(!this.loadingDialog){
this.loadingDialog=new wm.LoadingDialog({owner:this,name:"loadingDialog",widgetToCover:this.appRoot});
}
this.loadingDialog.widgetToCover=_5c2||this.appRoot;
this.loadingDialog.setCaption(_5c0||"Loading...");
if(_5c1){
this.loadingDialog._label.setWidth(_5c1);
}
this.loadingDialog.show();
},hideLoadingDialog:function(){
if(this.loadingDialog){
this.loadingDialog.hide();
}
},warnOnce:function(_5c3,_5c4){
var _5c5=dojo.cookie(_5c3);
if(_5c5){
return false;
}
wm.require("wm.Checkbox");
this.alert(_5c4);
if(!this._warnOnceCheckbox){
this._warnOnceCheckbox=new wm.Checkbox({owner:this.alertDialog,parent:this.alertDialog.containerWidget.c$[0],margin:"10,0,0,0",height:"30px",width:"100%",caption:"Don't warn again",captionPosition:"right",captionAlign:"left",captionSize:"100%"});
}
if(this._warnOnceConnect){
this.disconnect(this._warnOnceConnect);
}
this._warnOnceConnect=this.alertDialog.connectOnce(this.alertDialog,"onClose",dojo.hitch(this,"_cleanupWarnOnce",_5c3));
return true;
},_cleanupWarnOnce:function(_5c6){
if(this._warnOnceCheckbox.getChecked()){
dojo.cookie(_5c6,true);
}
this._warnOnceCheckbox.destroy();
delete this._warnOnceCheckbox;
delete this._warnOnceConnect;
},alert:function(_5c7,_5c8){
if(!this.alertDialog){
this.alertDialog=new wm.GenericDialog({name:"alertDialog",_noAnimation:true,owner:this,title:wm.getDictionaryItem("wm.Application.TITLE_ALERT"),noEscape:false,width:"400px",height:"180px",button1Caption:wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK"),button1Close:true,userPrompt:""});
this.alertDialog.domNode.style.zIndex=45;
}
if(this.alertDialog.width!="400px"){
this.alertDialog.setWidth("400px");
}
if(dojo.isObject(_5c7)){
_5c7=_5c7.toString();
}
_5c8=Boolean(_5c8);
this.alertDialog.setUserPrompt(_5c7);
this.alertDialog.setModal(!_5c8);
this.alertDialog.show();
},confirmOKFunc:null,confirmCancelFunc:null,confirm:function(_5c9,_5ca,_5cb,_5cc,_5cd,_5ce,_5cf){
if(!this.confirmDialog){
this.confirmDialog=new wm.GenericDialog({name:"confirmDialog",_noAnimation:true,owner:this,noEscape:false,width:"350px",height:"180px",button1Caption:wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_OK"),button1Close:true,button2Caption:wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL"),button2Close:true,userPrompt:"confirm..."});
this.confirmDialog.domNode.style.zIndex=50;
this.confirmDialog.connect(this.confirmDialog,"onButton1Click",this,"confirmDialogOKClick");
this.confirmDialog.connect(this.confirmDialog,"onButton2Click",this,"confirmDialogCancelClick");
this.confirmDialog.connect(this.confirmDialog,"_onEsc",this,"confirmDialogCancelClick");
}
_5ca=Boolean(_5ca);
this.confirmDialog.setUserPrompt(_5c9);
this.confirmDialog.setModal(!_5ca);
this.confirmDialog.setShowInput(false);
this.confirmDialog.setTitle(wm.getDictionaryItem("wm.Application.TITLE_CONFIRM"));
this.confirmOKFunc=_5cb;
this.confirmCancelFunc=_5cc;
this.confirmDialog.setButton1Caption(_5cd||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_OK"));
this.confirmDialog.setButton2Caption(_5ce||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL"));
if(!_5cf){
this.confirmDialog.show();
}
},prompt:function(_5d0,_5d1,_5d2,_5d3,_5d4,_5d5){
this.confirm(_5d0,false,_5d2,_5d3,_5d4,_5d5,true);
this.confirmDialog.setShowInput(true);
this.confirmDialog.setTitle(wm.getDictionaryItem("wm.Application.TITLE_CONFIRM"));
this.confirmDialog.setInputDataValue(_5d1||"");
this.confirmDialog.show();
},confirmDialogOKClick:function(){
if(this.confirmDialog.showInput){
var val=this.confirmDialog.getInputDataValue();
if(!val){
return this.confirmDialogCancelClick();
}else{
if(this.confirmOKFunc){
this.confirmOKFunc(val);
}
}
}else{
if(this.confirmOKFunc){
this.confirmOKFunc();
}
}
},confirmDialogCancelClick:function(){
if(this.confirmCancelFunc){
this.confirmCancelFunc();
}
},createToastDialog:function(){
if(!this.toastDialog){
this.toastDialog=new wm.Toast({name:"toastDialog",owner:this});
}
},toastError:function(_5d6,_5d7){
this.createToastDialog();
this.toastDialog.showToast(_5d6,_5d7||8000,"Error");
},toastWarning:function(_5d8,_5d9){
this.createToastDialog();
this.toastDialog.showToast(_5d8,_5d9||8000,"Warning");
},toastSuccess:function(_5da,_5db){
this.createToastDialog();
this.toastDialog.showToast(_5da,_5db||5000,"Success");
},toastInfo:function(_5dc,_5dd){
this.createToastDialog();
this.toastDialog.showToast(_5dc,_5dd||5000,"Info");
},createToolTip:function(_5de,node,_5df,_5e0){
if(!this.toolTipDialog){
this.toolTipDialog=new wm.Dialog({_classes:{domNode:["AppToolTip"]},title:"",name:"toolTipDialog",modal:false,width:"350px",height:"50px",fitToContentHeight:true,owner:this,corner:"tr",_fixPosition:true,useContainerWidget:true,margin:"0",border:"1",padding:"4"});
this.toolTipDialog.containerWidget.destroy();
this.toolTipDialog.useContainerWidget=false;
delete this.toolTipDialog.containerWidget;
delete this.toolTipDialog.containerNode;
var html=new wm.Html({owner:this.toolTipDialog,parent:this.toolTipDialog,autoScroll:false,name:"html",width:"100%",height:"100%",margin:"0",padding:"0",autoSizeHeight:true});
this.toolTipDialog.html=html;
}
this.toolTipDialog.tipOwner=_5e0;
if(node){
this.toolTipDialog.fixPositionNode=node;
}else{
this.toolTipDialog.fixPositionNode=null;
var _5e1=this.toolTipDialog.bounds.l=_5df.screenX||_5df.clientX||_5df.mouseX;
var _5e2=this.toolTipDialog.bounds.t=_5df.screenY||_5df.clientY||_5df.mouseY;
}
this.toolTipDialog.html.setHtml();
this.toolTipDialog.show();
this.toolTipDialog._cupdating=true;
this.toolTipDialog.html.setAutoSizeWidth(false);
this.toolTipDialog.html.setAutoSizeHeight(false);
this.toolTipDialog.setFitToContentHeight(false);
this.toolTipDialog.setFitToContentWidth(false);
this.toolTipDialog.setHeight("25px");
this.toolTipDialog.setWidth("350px");
this.toolTipDialog.html.setHeight("100%");
this.toolTipDialog.html.setWidth("100%");
this.toolTipDialog._cupdating=false;
this.toolTipDialog.renderBounds();
this.toolTipDialog.html.setHtml(_5de);
if(String(_5de).length<30){
this.toolTipDialog.html.setAutoSizeWidth(true);
this.toolTipDialog.setFitToContentWidth(true);
dojo.addClass(this.toolTipDialog.domNode,"NoWrap");
}else{
this.toolTipDialog.html.setAutoSizeHeight(true);
this.toolTipDialog.setFitToContentHeight(true);
dojo.removeClass(this.toolTipDialog.domNode,"NoWrap");
}
var self=this;
if(this._testHintConnect){
dojo.disconnect(this._testHintConnect);
}
this._testHintConnect=this.connect(window.document.body,"onmousemove",this,function(evt){
if(evt.target===this.toolTipDialog.domNode||dojo.isDescendant(evt.target,this.toolTipDialog.domNode)){
return;
}
if(node){
if(evt.target!=node&&!dojo.isDescendant(evt.target,node)){
this.hideToolTip();
}
}else{
if(Math.abs(evt.clientX-_5e1)>20||Math.abs(evt.clientY-_5e2)>20){
this.hideToolTip();
}
}
});
},getToolTip:function(){
if(this.toolTipDialog){
return this.toolTipDialog.userPrompt;
}
return "";
},hideToolTip:function(){
dojo.disconnect(this._testHintConnect);
delete this._testHintConnect;
this.toolTipDialog.hide();
},createMinifiedDialogPanel:function(){
var _5e3=parseInt(parseInt(wm.isMobile?wm.Button.prototype.mobileHeight:wm.Button.prototype.height)*0.8);
_5e3+=3;
this.wmMinifiedDialogPanel=new wm.Panel({name:"wmMinifiedDialogPanel",width:"100%",height:_5e3+"px",border:"2,0,0,0",padding:"1,0,0,0",autoScroll:false,verticalAlign:"top",horizontalAlign:"left",layoutKind:"left-to-right",owner:this,parent:this.appRoot});
this.appRoot.reflow();
},createMinifiedDialogLabel:function(_5e4){
var l=new wm.Button({caption:_5e4,parent:app.wmMinifiedDialogPanel,owner:this,width:"100px",desktopHeight:"100%",height:"100%",margin:"0",padding:"0",border:"1"});
app.wmMinifiedDialogPanel.show();
return l;
},removeMinifiedDialogLabel:function(_5e5){
_5e5.destroy();
if(this.wmMinifiedDialogPanel){
this.wmMinifiedDialogPanel.setShowing(Boolean(this.wmMinifiedDialogPanel.c$.length));
}
},resizeMinifiedDialogPanel:function(){
var b={l:0,t:this._page.root.bounds.h-this.wmMinifiedDialogPanel.bounds.h,w:this._page.root.bounds.w,h:25};
this.wmMinifiedDialogPanel.setBounds(b);
this.wmMinifiedDialogPanel.renderBounds();
},createLeftToRightDockingPanel:function(){
if(!this._leftToRightDockingPanel){
this._leftToRightDockingPanel=new wm.Panel({name:"_leftToRightDockingPanel",width:"100%",height:"100%",border:"0",padding:"",layoutKind:"left-to-right",owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._leftToRightDockingPanel,this.appRoot.indexOfControl(this.pageContainer));
this.pageContainer.setParent(this._leftToRightDockingPanel);
}
},dockDialog:function(_5e6,_5e7){
if(_5e7=="l"||_5e7=="r"){
this.createLeftToRightDockingPanel();
}
var _5e8;
var _5e9=false;
switch(_5e7){
case "t":
if(this._topDock){
_5e8=this._topDock;
}else{
_5e9=true;
_5e8=this._topDock=new wm.Panel({owner:this,name:"_topDock",width:"100%",height:"100px",border:"0",padding:"",layoutKind:"left-to-right",parent:this.appRoot});
this.appRoot.moveControl(_5e8,0);
this._topSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._topSplitter,1);
this._topSplitter.findLayout();
}
break;
case "b":
if(this._bottomDock){
_5e8=this._bottomDock;
}else{
_5e9=true;
_5e8=this._bottomDock=new wm.Panel({owner:this,name:"_bottomDock",width:"100%",height:"100px",border:"0",padding:"",layoutKind:"left-to-right",parent:this.appRoot});
if(this.wmMinifiedDialogPanel){
this.appRoot.moveControl(_5e8,this.wmMinifiedDialogPanel.getIndexInParent());
}
this._bottomSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._bottomSplitter,_5e8.getIndexInParent());
this._bottomSplitter.findLayout();
}
break;
case "l":
if(this._leftDock){
_5e8=this._leftDock;
}else{
_5e9=true;
_5e8=this._leftDock=new wm.Panel({owner:this,name:"_leftDock",width:"150px",height:"100%",border:"0",padding:"",layoutKind:"top-to-bottom",parent:this._leftToRightDockingPanel});
this._leftToRightDockingPanel.moveControl(_5e8,0);
this._leftSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this._leftToRightDockingPanel});
this._leftToRightDockingPanel.moveControl(this._leftSplitter,1);
this._leftSplitter.findLayout();
}
break;
case "r":
if(this._rightDock){
_5e8=this._rightDock;
}else{
_5e9=true;
this._rightSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this._leftToRightDockingPanel});
_5e8=this._rightDock=new wm.Panel({owner:this,name:"_rightDock",width:"150px",height:"100%",border:"0",padding:"",layoutKind:"top-to-bottom",parent:this._leftToRightDockingPanel});
this._rightSplitter.findLayout();
}
break;
}
_5e6.setParent(_5e8);
switch(_5e7){
case "t":
case "b":
if(_5e6.minHeight>_5e8.bounds.h){
_5e8.setHeight(_5e6.minHeight+"px");
}
_5e6.setWidth("100%");
break;
case "l":
case "r":
if(_5e6.minWidth>_5e8.bounds.w){
_5e8.setWidth(_5e6.minWidth+"px");
}
_5e6.setHeight("100%");
break;
}
if(_5e9){
this.appRoot.reflow();
}else{
if(!_5e8.showing){
_5e8.show();
if(_5e8==this._topDock){
this._topSplitter.show();
}else{
if(_5e8==this._bottomDock){
this._bottomSplitter.show();
}else{
if(_5e8==this._rightDock){
this._rightSplitter.show();
}else{
if(_5e8==this._leftDock){
this._leftSplitter.show();
}
}
}
}
}else{
_5e8.reflow();
}
}
},removeDockedDialog:function(_5ea){
var _5eb=_5ea.parent;
_5ea.setParent(null);
if(_5eb.c$.length==0){
_5eb.hide();
if(_5eb==this._topDock){
this._topSplitter.hide();
}else{
if(_5eb==this._bottomDock){
this._bottomSplitter.hide();
}else{
if(_5eb==this._rightDock){
this._rightSplitter.hide();
}else{
if(_5eb==this._leftDock){
this._leftSplitter.hide();
}
}
}
}
}
},getDeviceSize:function(){
return this.appRoot?this.appRoot.deviceSize:"1000";
},addHistory:function(_5ec,_5ed){
if(this.history&&!this._handlingBack){
try{
if(!_5ed){
this.history.push({id:_5ec.id,options:_5ec.options});
}
var _5ee={};
this._handlingBack=true;
this._generateStateUrl(_5ee);
delete this._handlingBack;
if(window.history.pushState){
window.history.pushState(null,"",wm.isEmpty(_5ee)?"#":"#"+dojo.toJson(_5ee));
}
}
catch(e){
}
}
},_generateStateUrl:function(){
},generateStateUrl:function(_5ef){
},_onBack:function(_5f0){
if(this._initializingBack){
delete this._initializingBack;
return;
}
var _5f1=this.history.pop();
try{
if(_5f1){
var id=_5f1.id;
var c=this.getValueById(id);
if(c instanceof wm.Component&&c.handleBack){
try{
this._handlingBack=true;
if(!c.handleBack(_5f1.options)){
this._onBack();
}
}
catch(e){
}
delete this._handlingBack;
}else{
if(this.history.length){
this._onBack();
}
}
}
}
catch(e){
}
}});
wm.Application.themePrototypeData={};
wm.Application.themeData={};
}
if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){
dojo._hasResource["dojox.uuid.generateRandomUuid"]=true;
dojo.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){
var _5f2=16;
function _5f3(){
var _5f4=Math.floor((Math.random()%1)*Math.pow(2,32));
var _5f5=_5f4.toString(_5f2);
while(_5f5.length<8){
_5f5="0"+_5f5;
}
return _5f5;
};
var _5f6="-";
var _5f7="4";
var _5f8="8";
var a=_5f3();
var b=_5f3();
b=b.substring(0,4)+_5f6+_5f7+b.substring(5,8);
var c=_5f3();
c=_5f8+c.substring(1,4)+_5f6+c.substring(4,8);
var d=_5f3();
var _5f9=a+_5f6+b+_5f6+c+d;
_5f9=_5f9.toLowerCase();
return _5f9;
};
}
if(!dojo._hasResource["wm.base.components.JsonRpcService"]){
dojo._hasResource["wm.base.components.JsonRpcService"]=true;
dojo.provide("wm.base.components.JsonRpcService");
wm.inflight={_inflight:[],_inflightNames:[],getCount:function(){
return this._inflight.length;
},change:function(){
},add:function(_5fa,_5fb,_5fc,_5fd,_5fe,_5ff){
_5fa._timeStamp=new Date().getTime();
if(dojo.indexOf(this._inflight,_5fa)!=-1){
return;
}
this._inflight.push(_5fa);
var name;
if(_5fb!="runtimeService"){
name=_5fb+"."+_5fe;
}else{
if(_5fc){
name=_5fc+"."+_5fe;
}else{
if(_5fd[0]){
name=_5fd[0]+": "+_5fd[1];
}else{
name="LazyLoad: "+_5fd[1];
}
}
}
this._inflightNames.push(name);
_5fa.addBoth(dojo.hitch(this,"remove",_5fa));
this.change();
},remove:function(_600,_601){
var i=dojo.indexOf(this._inflight,_600);
if(i==-1){
return;
}
var _602=new Date().getTime()-_600._timeStamp;
this._inflight.splice(i,1);
this._inflightNames.splice(i,1);
this.change();
return _601;
},cancel:function(){
dojo.forEach(this._inflight,function(d){
if(!d.canceller){
d.canceller=function(){
};
}
d.cancel();
});
}};
dojo.subscribe("wm-unload-app",wm.inflight,"cancel");
dojo.declare("wm.JsonRpc",dojo.rpc.JsonService,{smd:null,required:false,sync:false,_designTime:false,requestHeaders:{},bind:function(_603,_604,_605,url){
url=url||this.serviceUrl;
if(_603=="runQuery"&&_604[0]==SALESFORCE_SERVICE){
url=wm.services.getService(SALESFORCE_SERVICE)._service.serviceUrl;
}
if(!url){
return;
}
var _606=this._requestHeaders||this.requestHeaders;
var _607={url:url||this.serviceUrl,postData:this.createRequest(_603,_604||[]),contentType:this.contentType,timeout:this.timeout,handleAs:"json",sync:this.sync,headers:_606};
if(this._requestHeaders){
delete this._requestHeaders;
}
if(this._designTime&&studio.isCloud()){
var _608=_607.postData;
_607.postData=this.createRequest("remoteRESTCall",[_607.url.replace(/^.*\//,studio._deployedUrl+"/"),_608,"POST","application/json"]);
_607.url="waveMakerService.json";
}
if(wm.xhrPath){
_607.url=wm.xhrPath+_607.url;
}
var def=dojo.rawXhrPost(_607);
if(this._designTime&&studio.isCloud()){
var _609=new dojo.Deferred();
def.addCallbacks(function(_60a){
_609.callback(dojo.fromJson(_60a.result));
},function(_60b){
_609.errback(_60b);
});
def=_609;
}
_605=dojo.mixin(_605,def.ioArgs);
def.addCallbacks(this.resultCallback(_605),this.errorCallback(_605));
},parseResults:function(obj){
return obj;
},addRequestHeader:function(_60c,_60d){
if(!this.requestHeaders){
this.requestHeaders={};
}
if(!this._requestHeaders){
this._requestHeaders=dojo.clone(this.requestHeaders);
}
this._requestHeaders[_60c]=_60d;
},setRequestHeaders:function(_60e){
this._requestHeaders=_60e;
},errorCallback:function(_60f){
return function(data){
_60f.errback(data);
};
}});
dojo.declare("wm.JsonRpcService",wm.Service,{operations:"",ready:false,service:"",timeout:0,errorLevel:10,sync:false,url:"",_methods:[],_operations:{},_service:null,init:function(){
this.inherited(arguments);
this.initService();
},setSync:function(_610){
this.sync=_610;
},getServiceRoot:function(){
return this.getPath()+"services/";
},getJsonPath:function(){
var p="";
if(this.isDesignLoaded()&&window.studio&&studio.project){
p="/"+studio.project.getProjectPath()+"/";
}
return p;
},initService:function(){
var n=this.service||this.name;
var rand=this.owner&&this.isDesignLoaded()&&studio.application?studio.application.getFullVersionNumber():(app&&!window["studio"]?app.getFullVersionNumber():new Date().getTime());
var _611=this.url||n+".smd";
var url=this.url||(n&&(this.getServiceRoot()+n+".smd"));
this._service=null;
if(url){
try{
if(window["studio"]){
this._service=new wm.JsonRpc(url+"?rand="+rand);
}else{
if(wm.JsonRpcService.smdCache[url]){
this._service=wm.JsonRpcService.smdCache[url];
}else{
if(wm.JsonRpcService.smdCache[_611]){
var _612=wm.JsonRpcService.smdCache[_611];
this._service=new wm.JsonRpc({methods:_612.methods,serviceType:_612.serviceType,serviceUrl:url.replace(/\.smd/,".json")});
}else{
var _613=window["PhoneGap"]?"":"?rand="+rand;
this._service=new wm.JsonRpc(url+_613);
}
}
}
wm.JsonRpcService.smdCache[url]=this._service;
if(this._designTime){
this._service._designTime=true;
}
this._service.timeout=this.timeout;
this.ready=Boolean(this._service&&this._service.smd);
if(this.ready){
this._service.serviceUrl=this.getJsonPath()+this._service.serviceUrl;
this.listOperations();
}
}
catch(e){
}
}
},setName:function(_614){
this.inherited(arguments);
if(!this.url){
this.initService();
}
},ensureArgs:function(_615,_616){
if(_615 in this._operations&&dojo.isArray(_616)){
var op=this._operations[_615],_617=0;
if(op){
for(var o in op.parameters){
_617++;
}
for(var i=_616.length;i<_617;i++){
_616.push(null);
}
}
}
},invoke:function(_618,_619,_61a,_61b){
this.invoke(_618,_619,_61a,_61b,false,false,null);
},invoke:function(_61c,_61d,_61e,_61f,_620,_621,_622){
if(!this._service){
return null;
}
this._service.sync=this.sync;
this.ensureArgs(_61c,_61d);
this.debugLastMethod=_61c;
this.result=null;
this.error=null;
var d;
this._service._designTime=this._isDesignLoaded;
if(wm.connectionTimeout>0){
if(_620){
this._service.addRequestHeader("wm-polling-request",_622);
}else{
_622=dojox.uuid.generateRandomUuid();
this._service.addRequestHeader("wm-initial-request",_622);
}
d=this._service.callRemote(_61c,_61d||[]);
var _623=_621||new dojo.Deferred();
d.addCallbacks(dojo.hitch(this,"onLongResponseTimeResult",_61c,_61d,_61e,_61f,_620,_622,_623,d),dojo.hitch(this,"onLongResponseTimeError",_61c,_61d,_61e,_61f,_620,_622,_623,d));
d=_623;
}else{
d=this._service.callRemote(_61c,_61d||[]);
d.addCallbacks(dojo.hitch(this,"onResult"),dojo.hitch(this,"onError"));
}
if(_61f&&app.debugDialog){
_61f._jsonRpcServiceDeferred=d;
}
wm.inflight.add(d,this.service,this.name,_61d,_61c,_61f);
this.inflight=true;
return d;
},request:function(_624,_625,_626,_627,_628){
var d=this.invoke(_624,_625,null,_628);
if(_626){
if(dojo.isFunction(_626)){
d.addCallback(_626);
}else{
d.addCallback(this.owner,_626);
}
}
if(_627){
if(dojo.isFunction(_627)){
d.addErrback(_627);
}else{
d.addErrback(this.owner,_627);
}
}
return d;
},requestSync:function(_629,_62a,_62b,_62c,_62d){
var s=this.sync;
this.sync=true;
var d=this.request.apply(this,[_629,_62a,_62b,_62c,null,_62d]);
this.sync=s;
return d;
},requestAsync:function(_62e,_62f,_630,_631,_632){
var s=this.sync;
this.sync=false;
var cb=_630?dojo.hitch(this,function(){
this.sync=s;
return _630.apply(this,dojo._toArray(arguments));
}):null,eb=_631?dojo.hitch(this,function(){
this.sync=s;
return _631.apply(this,dojo._toArray(arguments));
}):null;
return this.request(_62e,_62f,cb,eb,null,_632);
},getResultSync:function(_633,_634){
var d=this.requestSync(_633,_634);
return d.results[0];
},onLongResponseTimeResult:function(_635,_636,_637,_638,_639,_63a,_63b,_63c,_63d){
var r;
this.inflight=false;
var _63e=false;
if(_639){
var _63f=_63c.xhr.getResponseHeader("wm-json-response-status");
if(_63f=="processing"){
_63e=true;
}else{
if(_63f=="error"){
return this.onLongResponseTimeError(_635,_636,_637,_638,_639,_63a,_63b,_63d.result);
}else{
if(_63f=="done"){
r=this.fullResult=_63d;
this.result=(r||0).result;
_63b.callback(this.result);
}else{
_63e=true;
}
}
}
if(_63e){
wm.onidle(this,function(){
this.invoke(_635,_636,_637,_638,true,_63b,_63a);
});
}
}else{
_63b.callback(this.onResult(_63d));
}
},onLongResponseTimeError:function(_640,_641,_642,_643,_644,_645,_646,_647,_648){
if(!_647.xhr){
_646.errback(_648);
return;
}
if((_647.xhr.status==504)||(_647.xhr.status==502&&_647.xhr.getResponseHeader("X-Squid-Error")==="ERR_ZERO_SIZE_OBJECT 0")){
this.invoke(_640,_641,_642,_643,true,_646,_645);
}else{
_646.errback(this.onError(_648));
}
},onResult:function(_649){
this.inflight=false;
var r=this.fullResult=_649;
this.result=(r||0).result;
return this.result;
},onError:function(_64a){
this.inflight=false;
var _64b=_64a!=null&&dojo.isObject(_64a)?_64a.message:_64a;
try{
if(!_64a||_64b.match(/No ServiceWire found/)&&!djConfig.isDebug){
return;
}
if(_64b.indexOf("Invalid Long Polling Request:")==0){
var _64c=_64b.match(/Timeout for this server is: (\d+)/);
wm.connectionTimeout=_64c?Number(_64c[1]):30;
return;
}
if(console.groupCollapsed){
console.groupCollapsed("Service Call Failed: "+this.name+"."+this.debugLastMethod);
}else{
}
if(_64b){
console.error(_64b);
}
var _64d=_64b.match(/(\d+)$/);
var _64e=(_64d)?_64d[0]:"";
if(_64e==403){
dojo.publish("session-expiration",[]);
if(app&&app.onSessionExpiration){
app.onSessionExpiration();
}
}
}
catch(e){
if(wm.logging){
}
}
this.reportError(_64a);
return this.error=_64a;
},reportError:function(_64f){
var m=dojo.isString(_64f)?_64f:(_64f.message?"Error: "+_64f.message:"Unspecified Error");
m=(this.name?this.name+": ":"")+m;
if(this.errorLevel>5){
if(!_64f.dojoType=="cancel"){
console.error(m);
}
}else{
if(this.errorLevel>0){
wm.logging&&undefined;
}
}
},paramArrayToHash:function(_650){
var hash={};
for(var i=0,p;(p=_650[i]);i++){
hash[p.name]={type:p.type,hidden:p.hidden};
}
return hash;
},listOperations:function(){
this._methods=[];
this._operations={};
var m=(this._service.smd||0).methods||[];
for(var i=0,op;(op=m[i]);i++){
this._methods.push(op.name);
this._operations[op.name]={parameters:this.paramArrayToHash(op.parameters||[]),returnType:op.returnType||"any",operationType:op.operationType||""};
}
this._methods.sort();
},makePropEdit:function(_651,_652,_653){
if(_651=="operations"){
return new wm.SelectMenu(dojo.mixin(_653,{options:this._methods||[]}));
}
return this.inherited(arguments);
}});
wm.Object.extendSchema(wm.JsonRpcService,{ready:{ignore:1}});
wm.JsonRpcService.description="Any JsonRpc service.";
wm.JsonRpcService.smdCache={};
}
dojo.i18n._preloadLocalizations("dojo.nls.lib_build_phonegap",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
