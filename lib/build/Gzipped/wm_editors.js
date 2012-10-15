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

dojo.provide("wm.compressed.wm_editors");
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_1,_2){
var _3=this.containerNode;
if(_2&&typeof _2=="number"){
var _4=this.getChildren();
if(_4&&_4.length>=_2){
_3=_4[_2-1].domNode;
_2="after";
}
}
dojo.place(_1.domNode,_3,_2);
if(this._started&&!_1._started){
_1.startup();
}
},removeChild:function(_5){
if(typeof _5=="number"){
_5=this.getChildren()[_5];
}
if(_5){
var _6=_5.domNode;
if(_6&&_6.parentNode){
_6.parentNode.removeChild(_6);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_7){
dojo.forEach(this.getChildren(),function(_8){
_8.destroyRecursive(_7);
});
},_getSiblingOfChild:function(_9,_a){
var _b=_9.domNode,_c=(_a>0?"nextSibling":"previousSibling");
do{
_b=_b[_c];
}while(_b&&(_b.nodeType!=1||!dijit.byNode(_b)));
return _b&&dijit.byNode(_b);
},getIndexOfChild:function(_d){
return dojo.indexOf(this.getChildren(),_d);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_e){
_e.startup();
});
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_f,_10){
return new dojo.dnd.move.constrainedMoveable(_10,_f);
},constructor:function(_11,_12){
if(!_12){
_12={};
}
this.constraints=_12.constraints;
this.within=_12.within;
},onFirstMove:function(_13){
var c=this.constraintBox=this.constraints.call(this,_13);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_13.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_14,_15){
var c=this.constraintBox,s=_14.node.style;
this.onMoving(_14,_15);
_15.l=_15.l<c.l?c.l:c.r<_15.l?c.r:_15.l;
_15.t=_15.t<c.t?c.t:c.b<_15.t?c.b:_15.t;
s.left=_15.l+"px";
s.top=_15.t+"px";
this.onMoved(_14,_15);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_16,_17){
return new dojo.dnd.move.boxConstrainedMoveable(_17,_16);
},constructor:function(_18,_19){
var box=_19&&_19.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_1a,_1b){
return new dojo.dnd.move.parentConstrainedMoveable(_1b,_1a);
},constructor:function(_1c,_1d){
var _1e=_1d&&_1d.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_1e=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1e=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1e=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
if(!dojo._hasResource["dijit._HasDropDown"]){
dojo._hasResource["dijit._HasDropDown"]=true;
dojo.provide("dijit._HasDropDown");
dojo.declare("dijit._HasDropDown",null,{buttonNodeType:wm.isMobile?"span":"input",_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if(e instanceof Event){
dojo.stopEvent(e);
}
this._docHandler=this.connect(dojo.doc,"onmouseup","_onDropDownMouseUp");
if(!e.type.ontouchend&&!e.type.mouseup&&this._opened||!this._opened){
this.toggleDropDown();
}
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _1f=this.dropDown,_20=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_20){
if(dojo.hasClass(t,"dijitPopup")){
_20=true;
}else{
t=t.parentNode;
}
}
if(_20){
t=e.target;
if(_1f.onItemClick){
var _21;
while(t&&!(_21=dijit.byNode(t))){
t=t.parentNode;
}
if(_21&&_21.onClick&&_21.getParent){
_21.getParent().onItemClick(_21,e);
}
}
return;
}
}
}
if(this._opened&&_1f.focus&&_1f.autoFocus!==false){
window.setTimeout(dojo.hitch(_1f,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _22={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_22+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
if(!wm||!wm.isMobile){
this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
}else{
if(wm&&wm.isFakeMobile||navigator.userAgent.match(/(phone|ipad) OS (1|2|3|4)_/i)){
this.connect(this._buttonNode,"onmousedown","touchStart");
this.connect(this._buttonNode,"onmousemove","touchMove");
this.connect(this._buttonNode,"onmouseup","touchEnd");
}else{
this.connect(this._buttonNode,"ontouchstart","touchStart");
this.connect(this._buttonNode,"ontouchmove","touchMove");
this.connect(this._buttonNode,"ontouchend","touchEnd");
}
}
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},touchStart:function(e){
dojo.stopEvent(e);
if(!this._isTouched){
this._isTouched=true;
this.domNode.style.backgroundColor="black";
this.domNode.style.color="white";
}
},touchMove:function(e){
if(this._isTouched){
delete this._isTouched;
this.domNode.style.backgroundColor="";
this.domNode.style.color="";
}
},touchEnd:function(e){
if(this._isTouched){
if(e instanceof Event){
dojo.stopEvent(e);
}
this.domNode.style.backgroundColor="";
this.domNode.style.color="";
this._onDropDownMouseDown(e||{type:"ontouchend"});
}
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_23=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
dojo.stopEvent(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==dojo.keys.ESCAPE){
this.closeDropDown();
dojo.stopEvent(e);
}else{
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_23.tagName||"").toLowerCase()!=="input"||(_23.type&&_23.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
dojo.stopEvent(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
setTimeout(dojo.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _24=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_24);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_25){
_25();
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
if(!this.isLoaded()){
this.loadDropDown(dojo.hitch(this,"openDropDown"));
return;
}else{
this.openDropDown();
}
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _26=this.dropDown,_27=_26.domNode,_28=this._aroundNode||this.domNode,_29=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_27.style.width){
this._explicitDDWidth=true;
}
if(_27.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _2a={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_2a.width="";
}
if(!this._explicitDDHeight){
_2a.height="";
}
dojo.style(_27,_2a);
var _2b=this.maxHeight;
if(_2b==-1){
var _2c=dojo.window.getBox(),_2d=dojo.position(_28,false);
_2b=Math.floor(Math.max(_2d.y,_2c.h-(_2d.y+_2d.h)));
}
if(_26.startup&&!_26._started){
_26.startup();
}
dijit.popup.moveOffScreen(_26);
var mb=dojo._getMarginSize(_27);
var _2e=(_2b&&mb.h>_2b);
dojo.style(_27,{overflowX:"hidden",overflowY:_2e?"auto":"hidden"});
if(_2e){
mb.h=_2b;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_28.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_28.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_26.resize)){
_26.resize(mb);
}else{
dojo.marginBox(_27,mb);
}
}
var _2f=dijit.popup.open({parent:this,popup:_26,around:_28,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_29.closeDropDown(true);
},onCancel:function(){
_29.closeDropDown(true);
},onClose:function(){
dojo.attr(_29._popupStateNode,"popupActive",false);
dojo.removeClass(_29._popupStateNode,"dijitHasDropDownOpen");
_29._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_29._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _2f;
},closeDropDown:function(_30){
if(this._opened){
if(_30){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
}
if(!dojo._hasResource["dijit.form.Button"]){
dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdojoAttachPoint=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode"}),_onClick:function(e){
if(this.disabled){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var _31=this.domNode;_31.parentNode;_31=_31.parentNode){
var _32=dijit.byNode(_31);
if(_32&&typeof _32._onSubmit=="function"){
_32._onSubmit(e);
break;
}
}
}else{
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
}
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.focusNode,false);
},_fillContent:function(_33){
if(_33&&(!this.params||!("label" in this.params))){
this.set("label",_33.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_34){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_34);
},_setLabelAttr:function(_35){
this._set("label",_35);
this.containerNode.innerHTML=_35;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _36=this.iconClass||"dijitNoIcon",_37=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_37,_36);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),_fillContent:function(){
if(this.srcNodeRef){
var _38=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_38[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _39=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_39);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3a=this.dropDown;
return (!!_3a&&(!_3a.href||_3a.isLoaded));
},loadDropDown:function(){
var _3b=this.dropDown;
if(!_3b){
return;
}
if(!this.isLoaded()){
var _3c=dojo.connect(_3b,"onLoad",this,function(){
dojo.disconnect(_3c);
this.openDropDown();
});
_3b.refresh();
}else{
this.openDropDown();
}
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" dojoAttachPoint=\"buttonNode\" dojoAttachEvent=\"ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdojoAttachPoint=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdojoAttachEvent=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" dojoAttachPoint=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
dijit.focus(this._popupStateNode);
dojo.stopEvent(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
dijit.focus(this.titleNode);
dojo.stopEvent(evt);
}
},focus:function(_3d){
if(!this.disabled){
dijit.focus(_3d=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_3e,_3f){
this._set("checked",_3e);
dojo.attr(this.focusNode||this.domNode,"checked",_3e);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_3e);
this._handleOnChange(_3e,_3f);
},setChecked:function(_40){
dojo.deprecated("setChecked("+_40+") is deprecated. Use set('checked',"+_40+") instead.","","2.0");
this.set("checked",_40);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_41,_42){
_42=dojo.mixin({},_42||{});
var _43=dojo.i18n.normalizeLocale(_42.locale),_44=dojo.i18n.getLocalization("dojo.cldr","number",_43);
_42.customs=_44;
var _45=_42.pattern||_44[(_42.type||"decimal")+"Format"];
if(isNaN(_41)||Math.abs(_41)==Infinity){
return null;
}
return dojo.number._applyPattern(_41,_45,_42);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_46,_47,_48){
_48=_48||{};
var _49=_48.customs.group,_4a=_48.customs.decimal,_4b=_47.split(";"),_4c=_4b[0];
_47=_4b[(_46<0)?1:0]||("-"+_4c);
if(_47.indexOf("%")!=-1){
_46*=100;
}else{
if(_47.indexOf("‰")!=-1){
_46*=1000;
}else{
if(_47.indexOf("¤")!=-1){
_49=_48.customs.currencyGroup||_49;
_4a=_48.customs.currencyDecimal||_4a;
_47=_47.replace(/\u00a4{1,3}/,function(_4d){
var _4e=["symbol","currency","displayName"][_4d.length-1];
return _48[_4e]||_48.currency||"";
});
}else{
if(_47.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _4f=dojo.number._numberPatternRE;
var _50=_4c.match(_4f);
if(!_50){
throw new Error("unable to find a number expression in pattern: "+_47);
}
if(_48.fractional===false){
_48.places=0;
}
return _47.replace(_4f,dojo.number._formatAbsolute(_46,_50[0],{decimal:_4a,group:_49,places:_48.places,round:_48.round}));
};
dojo.number.round=function(_51,_52,_53){
var _54=10/(_53||10);
return (_54*+_51).toFixed(_52)/_54;
};
if((0.9).toFixed()==0){
(function(){
var _55=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _55(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_56,_57,_58){
_58=_58||{};
if(_58.places===true){
_58.places=0;
}
if(_58.places===Infinity){
_58.places=6;
}
var _59=_57.split("."),_5a=typeof _58.places=="string"&&_58.places.indexOf(","),_5b=_58.places;
if(_5a){
_5b=_58.places.substring(_5a+1);
}else{
if(!(_5b>=0)){
_5b=(_59[1]||[]).length;
}
}
if(!(_58.round<0)){
_56=dojo.number.round(_56,_5b,_58.round);
}
var _5c=String(Math.abs(_56)).split("."),_5d=_5c[1]||"";
if(_59[1]||_58.places){
if(_5a){
_58.places=_58.places.substring(0,_5a);
}
var pad=_58.places!==undefined?_58.places:(_59[1]&&_59[1].lastIndexOf("0")+1);
if(pad>_5d.length){
_5c[1]=dojo.string.pad(_5d,pad,"0",true);
}
if(_5b<_5d.length){
_5c[1]=_5d.substr(0,_5b);
}
}else{
if(_5c[1]){
_5c.pop();
}
}
var _5e=_59[0].replace(",","");
pad=_5e.indexOf("0");
if(pad!=-1){
pad=_5e.length-pad;
if(pad>_5c[0].length){
_5c[0]=dojo.string.pad(_5c[0],pad);
}
if(_5e.indexOf("#")==-1){
_5c[0]=_5c[0].substr(_5c[0].length-pad);
}
}
var _5f=_59[0].lastIndexOf(","),_60,_61;
if(_5f!=-1){
_60=_59[0].length-_5f-1;
var _62=_59[0].substr(0,_5f);
_5f=_62.lastIndexOf(",");
if(_5f!=-1){
_61=_62.length-_5f-1;
}
}
var _63=[];
for(var _64=_5c[0];_64;){
var off=_64.length-_60;
_63.push((off>0)?_64.substr(off):_64);
_64=(off>0)?_64.slice(0,off):"";
if(_61){
_60=_61;
delete _61;
}
}
_5c[0]=_63.reverse().join(_58.group||",");
return _5c.join(_58.decimal||".");
};
dojo.number.regexp=function(_65){
return dojo.number._parseInfo(_65).regexp;
};
dojo.number._parseInfo=function(_66){
_66=_66||{};
var _67=dojo.i18n.normalizeLocale(_66.locale),_68=dojo.i18n.getLocalization("dojo.cldr","number",_67),_69=_66.pattern||_68[(_66.type||"decimal")+"Format"],_6a=_68.group,_6b=_68.decimal,_6c=1;
if(_69.indexOf("%")!=-1){
_6c/=100;
}else{
if(_69.indexOf("‰")!=-1){
_6c/=1000;
}else{
var _6d=_69.indexOf("¤")!=-1;
if(_6d){
_6a=_68.currencyGroup||_6a;
_6b=_68.currencyDecimal||_6b;
}
}
}
var _6e=_69.split(";");
if(_6e.length==1){
_6e.push("-"+_6e[0]);
}
var re=dojo.regexp.buildGroupRE(_6e,function(_6f){
_6f="(?:"+dojo.regexp.escapeString(_6f,".")+")";
return _6f.replace(dojo.number._numberPatternRE,function(_70){
var _71={signed:false,separator:_66.strict?_6a:[_6a,""],fractional:_66.fractional,decimal:_6b,exponent:false},_72=_70.split("."),_73=_66.places;
if(_72.length==1&&_6c!=1){
_72[1]="###";
}
if(_72.length==1||_73===0){
_71.fractional=false;
}else{
if(_73===undefined){
_73=_66.pattern?_72[1].lastIndexOf("0")+1:Infinity;
}
if(_73&&_66.fractional==undefined){
_71.fractional=true;
}
if(!_66.places&&(_73<_72[1].length)){
_73+=","+_72[1].length;
}
_71.places=_73;
}
var _74=_72[0].split(",");
if(_74.length>1){
_71.groupSize=_74.pop().length;
if(_74.length>1){
_71.groupSize2=_74.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_71)+")";
});
},true);
if(_6d){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_75,_76,_77,_78){
var _79=["symbol","currency","displayName"][_77.length-1],_7a=dojo.regexp.escapeString(_66[_79]||_66.currency||"");
_76=_76?"[\\s\\xa0]":"";
_78=_78?"[\\s\\xa0]":"";
if(!_66.strict){
if(_76){
_76+="*";
}
if(_78){
_78+="*";
}
return "(?:"+_76+_7a+_78+")?";
}
return _76+_7a+_78;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_6a,decimal:_6b,factor:_6c};
};
dojo.number.parse=function(_7b,_7c){
var _7d=dojo.number._parseInfo(_7c),_7e=(new RegExp("^"+_7d.regexp+"$")).exec(_7b);
if(!_7e){
return NaN;
}
var _7f=_7e[1];
if(!_7e[1]){
if(!_7e[2]){
return NaN;
}
_7f=_7e[2];
_7d.factor*=-1;
}
_7f=_7f.replace(new RegExp("["+_7d.group+"\\s\\xa0"+"]","g"),"").replace(_7d.decimal,".");
return _7f*_7d.factor;
};
dojo.number._realNumberRegexp=function(_80){
_80=_80||{};
if(!("places" in _80)){
_80.places=Infinity;
}
if(typeof _80.decimal!="string"){
_80.decimal=".";
}
if(!("fractional" in _80)||/^0/.test(_80.places)){
_80.fractional=[true,false];
}
if(!("exponent" in _80)){
_80.exponent=[true,false];
}
if(!("eSigned" in _80)){
_80.eSigned=[true,false];
}
var _81=dojo.number._integerRegexp(_80),_82=dojo.regexp.buildGroupRE(_80.fractional,function(q){
var re="";
if(q&&(_80.places!==0)){
re="\\"+_80.decimal;
if(_80.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_80.places+"}";
}
}
return re;
},true);
var _83=dojo.regexp.buildGroupRE(_80.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_80.eSigned})+")";
}
return "";
});
var _84=_81+_82;
if(_82){
_84="(?:(?:"+_84+")|(?:"+_82+"))";
}
return _84+_83;
};
dojo.number._integerRegexp=function(_85){
_85=_85||{};
if(!("signed" in _85)){
_85.signed=[true,false];
}
if(!("separator" in _85)){
_85.separator="";
}else{
if(!("groupSize" in _85)){
_85.groupSize=3;
}
}
var _86=dojo.regexp.buildGroupRE(_85.signed,function(q){
return q?"[-+]":"";
},true);
var _87=dojo.regexp.buildGroupRE(_85.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=dojo.regexp.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_85.groupSize,_88=_85.groupSize2;
if(_88){
var _89="(?:0|[1-9]\\d{0,"+(_88-1)+"}(?:["+sep+"]\\d{"+_88+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_88)>0)?"(?:"+_89+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_89;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _86+_87;
};
}
if(!dojo._hasResource["dijit.form.HorizontalSlider"]){
dojo._hasResource["dijit.form.HorizontalSlider"]=true;
dojo.provide("dijit.form.HorizontalSlider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormValueWidget,dijit._Container],{templateString:dojo.cache("dijit.form","templates/HorizontalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n"),value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,slideDuration:dijit.defaultDuration,widgetsInTemplate:true,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{id:""}),baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",dynamicSlider:false,_onKeyUp:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
this._setValueAttr(this.value,true);
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
switch(e.charOrCode){
case dojo.keys.HOME:
this._setValueAttr(this.minimum,false);
break;
case dojo.keys.END:
this._setValueAttr(this.maximum,false);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):
case (this._descending===false?dojo.keys.DOWN_ARROW:dojo.keys.UP_ARROW):
case (this._descending===false?dojo.keys.PAGE_DOWN:dojo.keys.PAGE_UP):
this.increment(e);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):
case (this._descending===false?dojo.keys.UP_ARROW:dojo.keys.DOWN_ARROW):
case (this._descending===false?dojo.keys.PAGE_UP:dojo.keys.PAGE_DOWN):
this.decrement(e);
break;
default:
return;
}
dojo.stopEvent(e);
},_onHandleClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.sliderHandle);
}
dojo.stopEvent(e);
},_isReversed:function(){
return !this.isLeftToRight();
},_onBarClick:function(e){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
dijit.focus(this.sliderHandle);
dojo.stopEvent(e);
var _8a=dojo.position(this.sliderBarContainer,true);
var _8b=e[this._mousePixelCoord]-_8a[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_8a[this._pixelCount]-_8b):_8b,_8a[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_8c,_8d,_8e){
if(this.dynamicSlider){
var now=new Date().getTime();
if(!this._dynamicSliderTimestamp||this._dynamicSliderTimestamp+100<now){
_8e=true;
this._dynamicSliderTimestamp=now;
if(this.domNode&&this.domNode.id){
wm.cancelJob(this.domNode.id+"._setPixelValue");
}
}else{
if(this.domNode&&this.domNode.id){
var _8f=this;
wm.job(this.domNode.id+"._setPixelValue",60,function(){
_8f._setValueAttr((this.maximum-this.minimum)*_90/_91+this.minimum,true);
});
}
}
}
if(this.disabled||this.readOnly){
return;
}
_8c=_8c<0?0:_8d<_8c?_8d:_8c;
var _91=this.discreteValues;
if(_91<=1||_91==Infinity){
_91=_8d;
}
_91--;
var _92=_8d/_91;
var _90=Math.round(_8c/_92);
this._setValueAttr((this.maximum-this.minimum)*_90/_91+this.minimum,_8e);
},_setValueAttr:function(_93,_94){
this._set("value",_93);
this.valueNode.value=_93;
dijit.setWaiState(this.focusNode,"valuenow",_93);
this.inherited(arguments);
var _95=(_93-this.minimum)/(this.maximum-this.minimum);
var _96=(this._descending===false)?this.remainingBar:this.progressBar;
var _97=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_94&&this.slideDuration>0&&_96.style[this._progressPixelSize]){
var _98=this;
var _99={};
var _9a=parseFloat(_96.style[this._progressPixelSize]);
var _9b=this.slideDuration*(_95-_9a/100);
if(_9b==0){
return;
}
if(_9b<0){
_9b=0-_9b;
}
_99[this._progressPixelSize]={start:_9a,end:_95*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_96,duration:_9b,onAnimate:function(v){
_97.style[_98._progressPixelSize]=(100-parseFloat(v[_98._progressPixelSize]))+"%";
},onEnd:function(){
delete _98._inProgressAnim;
},properties:_99});
this._inProgressAnim.play();
}else{
_96.style[this._progressPixelSize]=(_95*100)+"%";
_97.style[this._progressPixelSize]=((1-_95)*100)+"%";
}
},_bumpValue:function(_9c,_9d){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _9e=this.discreteValues;
if(_9e<=1||_9e==Infinity){
_9e=c[this._pixelCount];
}
_9e--;
var _9f=(this.value-this.minimum)*_9e/(this.maximum-this.minimum)+_9c;
if(_9f<0){
_9f=0;
}
if(_9f>_9e){
_9f=_9e;
}
_9f=_9f*(this.maximum-this.minimum)/_9e+this.minimum;
this._setValueAttr(_9f,_9d);
},_onClkBumper:function(val){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
this._setValueAttr(val,true);
},_onClkIncBumper:function(){
this._onClkBumper(this._descending===false?this.minimum:this.maximum);
},_onClkDecBumper:function(){
this._onClkBumper(this._descending===false?this.maximum:this.minimum);
},decrement:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1);
},increment:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_UP?this.pageIncrement:1);
},_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _a0=!dojo.isMozilla;
var _a1=evt[(_a0?"wheelDelta":"detail")]*(_a0?1:-1);
this._bumpValue(_a1<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_a2){
if(this[_a2.container]!=this.containerNode){
this[_a2.container].appendChild(_a2.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_a3,_a4,e){
if(_a3==-1){
this._setValueAttr(this.value,true);
}else{
this[(_a4==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _a5=dojo.query("label[for=\""+this.id+"\"]");
if(_a5.length){
_a5[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_a5[0].id);
}
dijit.setWaiState(this.focusNode,"valuemin",this.minimum);
dijit.setWaiState(this.focusNode,"valuemax",this.maximum);
},postCreate:function(){
this.inherited(arguments);
if(this.showButtons){
this._connects.push(dijit.typematic.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500));
this._connects.push(dijit.typematic.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));
}
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var _a6=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_a6});
this._layoutHackIE7();
},destroy:function(){
this._movable.destroy();
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
this._supportingWidgets=dijit.findWidgets(this.domNode);
this.inherited(arguments);
}});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _a7=this.widget;
var _a8=_a7._abspos;
if(!_a8){
_a8=_a7._abspos=dojo.position(_a7.sliderBarContainer,true);
_a7._setPixelValue_=dojo.hitch(_a7,"_setPixelValue");
_a7._isReversed_=_a7._isReversed();
}
var _a9=e.touches?e.touches[0]:e,_aa=_a9[_a7._mousePixelCoord]-_a8[_a7._startingPixelCoord];
_a7._setPixelValue_(_a7._isReversed_?(_a8[_a7._pixelCount]-_aa):_aa,_a8[_a7._pixelCount],false);
},onMouseUp:function(e){
this.inherited(arguments);
this.destroy();
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _ab=this.widget;
_ab._abspos=null;
_ab._setValueAttr(_ab.value,true);
}});
}
if(!dojo._hasResource["dijit.form.VerticalSlider"]){
dojo._hasResource["dijit.form.VerticalSlider"]=true;
dojo.provide("dijit.form.VerticalSlider");
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:dojo.cache("dijit.form","templates/VerticalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"><!--#5629--></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t></center\n\t\t></td\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n></table>\n"),_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_descending:true,_isReversed:function(){
return this._descending;
}});
}
if(!dojo._hasResource["dijit.form._Spinner"]){
dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdojoAttachPoint=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdojoAttachPoint=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_ac){
return val;
},_arrowPressed:function(_ad,_ae,_af){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_ae*_af),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(_b0){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_b1,_b2,evt){
var inc=this.smallDelta;
if(_b2==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
_b2=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_b1==-1){
this._arrowReleased(_b2);
}else{
this._arrowPressed(_b2,(_b2==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _b3=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_b3!==0){
var _b4=this[(_b3>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(_b4,_b3,this.smallDelta);
if(!this._wheelTimer){
clearTimeout(this._wheelTimer);
}
this._wheelTimer=setTimeout(dojo.hitch(this,"_arrowReleased",_b4),50);
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
}
if(!dojo._hasResource["dijit.form.NumberTextBox"]){
dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_b5){
var _b6=typeof _b5.places=="number"?_b5.places:0;
if(_b6){
_b6++;
}
if(typeof _b5.max!="number"){
_b5.max=9*Math.pow(10,15-_b6);
}
if(typeof _b5.min!="number"){
_b5.min=-9*Math.pow(10,15-_b6);
}
this.inherited(arguments,[_b5]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _b7=this.format(val,this.constraints);
if(_b7!==undefined){
this.textbox.value=_b7;
}
}
this.inherited(arguments);
},format:function(_b8,_b9){
var _ba=String(_b8);
if(typeof _b8!="number"){
return _ba;
}
if(isNaN(_b8)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_b8,_b9))&&_b9.exponent!==false&&/\de[-+]?\d/i.test(_ba)){
return _ba;
}
if(this.editOptions&&this._focused){
_b9=dojo.mixin({},_b9,this.editOptions);
}
return this._formatter(_b8,_b9);
},_parser:dojo.number.parse,parse:function(_bb,_bc){
var v=this._parser(_bb,dojo.mixin({},_bc,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_bb,_bc);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_bd){
return (_bd===null||_bd===""||_bd===undefined)?NaN:this.inherited(arguments);
},serialize:function(_be,_bf){
return (typeof _be!="number"||isNaN(_be))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_c0,_c1,_c2){
if(_c0!==undefined&&_c2===undefined){
_c2=String(_c0);
if(typeof _c0=="number"){
if(isNaN(_c0)){
_c2="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_c0,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_c2)){
_c2=undefined;
}
}
}else{
if(!_c0){
_c2="";
_c0=NaN;
}else{
_c0=undefined;
}
}
}
this.inherited(arguments,[_c0,_c1,_c2]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+dojo.number._realNumberRegexp(dojo.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_c3){
if(!this._focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{baseClass:"dijitTextBox dijitNumberTextBox"});
}
if(!dojo._hasResource["dijit.form.NumberSpinner"]){
dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_c4){
var tc=this.constraints,v=isNaN(val),_c5=!isNaN(tc.max),_c6=!isNaN(tc.min);
if(v&&_c4!=0){
val=(_c4>0)?_c6?tc.min:_c5?tc.max:0:_c5?this.constraints.max:_c6?tc.min:0;
}
var _c7=val+_c4;
if(v||isNaN(_c7)){
return val;
}
if(_c5&&(_c7>tc.max)){
_c7=tc.max;
}
if(_c6&&(_c7<tc.min)){
_c7=tc.min;
}
return _c7;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _c8=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _c8=="number"){
this._setValueAttr(_c8,false);
}
dojo.stopEvent(e);
}
}});
}
if(!dojo._hasResource["dojo.cldr.monetary"]){
dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.getObject("cldr.monetary",true,dojo);
dojo.cldr.monetary.getData=function(_c9){
var _ca={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _cb={CHF:5};
var _cc=_ca[_c9],_cd=_cb[_c9];
if(typeof _cc=="undefined"){
_cc=2;
}
if(typeof _cd=="undefined"){
_cd=0;
}
return {places:_cc,round:_cd};
};
}
if(!dojo._hasResource["dojo.currency"]){
dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_ce){
_ce=_ce||{};
_ce.type="currency";
var _cf=dojo.i18n.getLocalization("dojo.cldr","currency",_ce.locale)||{};
var iso=_ce.currency;
var _d0=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(_d1){
_d0[_d1]=_cf[iso+"_"+_d1];
});
_d0.fractional=[true,false];
return dojo.mixin(_d0,_ce);
};
dojo.currency.format=function(_d2,_d3){
return dojo.number.format(_d2,dojo.currency._mixInDefaults(_d3));
};
dojo.currency.regexp=function(_d4){
return dojo.number.regexp(dojo.currency._mixInDefaults(_d4));
};
dojo.currency.parse=function(_d5,_d6){
return dojo.number.parse(_d5,dojo.currency._mixInDefaults(_d6));
};
}
if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){
dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_d7){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_d7,this.editOptions)])+"|":"")+dojo.currency.regexp(_d7)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_d8,_d9){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_d8)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_da){
if(!_da.currency&&this.currency){
_da.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_da,{exponent:false}))]);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Number"]){
dojo._hasResource["wm.base.widget.Editors.Number"]=true;
dojo.provide("wm.base.widget.Editors.Number");
dijit.form.NumberTextBox.extend({format:function(_db,_dc){
var _dd=String(_db);
if(typeof _db!="number"){
return _dd;
}
if(isNaN(_db)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_db,_dc))&&_dc.exponent!==false&&/de[-+]?d/i.test(_dd)){
return _dd;
}
_dc=dojo.mixin({},_dc,this.editOptions);
if(!this._focused){
delete _dc.pattern;
}
return this._formatter(_db,_dc);
},_refreshState:function(){
var _de=this.get("displayedValue");
var _df=_de.indexOf(".");
if(this.editOptions.places&&this.editOptions.placeWhileTyping&&_df!=-1){
var _e0=_de.substr(0,_df)+"."+_de.substr(_df+1,this.editOptions.places);
if(_e0!=_de){
this.focusNode.value=_e0;
}
}
this.inherited(arguments);
}});
dojo.declare("wm.Number",wm.Text,{spinnerButtons:false,minimum:"",maximum:"",places:"",applyPlacesWhileTyping:false,_messages:{rangeMin:"Minimum number must be less than the maximum setting of ${0}.",rangeMax:"Maximum number must be greater than the minimum setting of ${0}."},rangeMessage:"",validationEnabled:function(){
return true;
},connectEditor:function(){
this.inherited(arguments);
if(this.spinnerButtons){
this.addEditorConnect(this.editor,"onClick",this,"changed");
}
},getEditorConstraints:function(){
var _e1={};
if(!isNaN(parseInt(this.minimum))){
_e1.min=Number(this.minimum);
}
if(!isNaN(parseInt(this.maximum))){
_e1.max=Number(this.maximum);
}
return _e1;
},getEditorProps:function(_e2,_e3){
var v=this.displayValue;
var _e4=this.getEditorConstraints();
var p=dojo.mixin(this.inherited(arguments),{constraints:_e4,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):"",editOptions:dojo.clone(dijit.form.NumberTextBox.prototype.editOptions)},_e3||{});
var _e5=this._getPlaces();
if(_e5!==""){
p.editOptions.places=_e5;
p.editOptions.placeWhileTyping=this.applyPlacesWhileTyping;
}
return p;
},_getPlaces:function(){
if(this.places===""){
return this.places;
}else{
return Number(this.places);
}
},_createEditor:function(_e6,_e7){
var e;
if(this.spinnerButtons&&!wm.isMobile){
e=new dijit.form.NumberSpinner(this.getEditorProps(_e6,_e7));
}else{
e=new dijit.form.NumberTextBox(this.getEditorProps(_e6,_e7));
}
return e;
},setMaximum:function(_e8){
var v=(_e8==="")?"":Number(_e8);
if(this.minimum===""||this.minimum<v||v===""){
this.maximum=v;
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
}else{
if(this.isDesignLoaded()&&!(this.$.binding&&this.$.binding.wires.maximum)){
app.alert(dojo.string.substitute(this._messages.rangeMax,[this.minimum]));
}
}
},setMinimum:function(_e9){
var v=(_e9==="")?"":Number(_e9);
if(this.maximum===""||v<this.maximum||v===""){
this.minimum=v;
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
}else{
if(this.isDesignLoaded()&&!(this.$.binding&&this.$.binding.wires.minimum)){
app.alert(dojo.string.substitute(this._messages.rangeMin,[this.maximum]));
}
}
},_getReadonlyValue:function(){
return dojo.number.format(this.getDataValue(),this.getFormatProps());
},getFormatProps:function(){
var _ea={};
if(this.places&&this.places!=""){
_ea.places=parseInt(this.places);
}
return _ea;
},setSpinnerButtons:function(_eb){
if(this.spinnerButtons!=_eb){
this.spinnerButtons=_eb;
this.createEditor();
}
},calcIsDirty:function(a,b){
return a!==b;
}});
dojo.declare("wm.Currency",wm.Number,{currency:"",getEditorProps:function(_ec,_ed){
var _ee=this.inherited(arguments);
if(_ee.constraints){
delete _ee.constraints.pattern;
}
return dojo.mixin(_ee,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD"},_ed||{});
},_createEditor:function(_ef,_f0){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_ef,_f0));
},_getReadonlyValue:function(){
return dojo.currency.format(this.dataValue,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD",places:parseInt(this.places)});
},setEditorValue:function(_f1){
var v=_f1;
if(this.editor){
v=dojo.currency.parse(dojo.currency.format(String(v).replace(/[^0-9\-\.]/g,""),this.editor.constraints),this.editor.constraints);
}
wm.AbstractEditor.prototype.setEditorValue.call(this,v);
},getDataValue:function(){
return this.dataValue;
},editorChanged:function(){
var _f2=this.dataValue;
this.dataValue=this.getEditorValue();
var _f3=this.displayValue;
this.displayValue=this._getReadonlyValue();
var _f4=false;
if(_f2!=this._lastValue){
this.valueChanged("dataValue",this.dataValue);
_f4=true;
}
if(_f3!=this.displayValue){
this.valueChanged("displayValue",this.displayValue);
_f4=true;
}
if(_f4){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _f4;
},setCurrency:function(_f5){
this.currency=_f5;
this.createEditor();
}});
}
if(!dojo._hasResource["dijit.form.DropDownButton"]){
dojo._hasResource["dijit.form.DropDownButton"]=true;
dojo.provide("dijit.form.DropDownButton");
}
if(!dojo._hasResource["dijit.Calendar"]){
dojo._hasResource["dijit.Calendar"]=true;
dojo.provide("dijit.Calendar");
dojo.declare("dijit.Calendar",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Calendar.html","<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" dojoAttachEvent=\"onkeypress: _onKeyPress\" aria-labelledby=\"${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<!-- Copyright (C) 2011 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \n\t\t\t      WaveMaker: Moved year into header for cleaner mobile UI -->\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementYear\">\n\t\t\t  <span dojoAttachPoint=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\"></span>\n\t\t\t</th>\n\n\t\t\t<th class='dijitReset' colspan=\"3\">\n\t\t\t\t<div dojoType=\"dijit.form.DropDownButton\" dojoAttachPoint=\"monthDropDownButton\"\n\t\t\t\t\tid=\"${id}_mddb\" tabIndex=\"-1\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementYear\">\n\t\t\t  <span dojoAttachPoint=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\"></span>\n\t\t\t</th>\n\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent=\"onclick: _onDayClick, onmouseover: _onDayMouseOver, onmouseout: _onDayMouseOut, onmousedown: _onDayMouseDown, onmouseup: _onDayMouseUp\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">\n\t\t\t<td class=\"dijitReset dijitCalendarDateTemplate\" role=\"gridcell\"><span class=\"dijitCalendarDateLabel\"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<!-- Copyright (C) 2011 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \n\tWaveMaker: Moved year into header for cleaner mobile UI -->\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\" style='display:none'>\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\">\n\t\t\t\t<h3 class=\"dijitCalendarYearLabel\">\n\t\t\t\t<span dojoAttachPoint=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" id=\"${id}_year\"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n"),widgetsInTemplate:true,value:new Date(""),datePackage:"dojo.date",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},_isValidDate:function(_f6){
return _f6&&!isNaN(_f6)&&typeof _f6=="object"&&_f6.toString()!=this.constructor.prototype.value.toString();
},setValue:function(_f7){
dojo.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_f7);
},_getValueAttr:function(){
var _f8=new this.dateClassObj(this.value);
_f8.setHours(0,0,0,0);
if(_f8.getDate()<this.value.getDate()){
_f8=this.dateFuncObj.add(_f8,"hour",1);
}
return _f8;
},_setValueAttr:function(_f9,_fa){
if(_f9){
_f9=new this.dateClassObj(_f9);
}
if(this._isValidDate(_f9)){
if(!this._isValidDate(this.value)||this.dateFuncObj.compare(_f9,this.value)){
_f9.setHours(1,0,0,0);
if(!this.isDisabledDate(_f9,this.lang)){
this._set("value",_f9);
var _fb=dojo.query("[dijitDateValue="+_f9.valueOf()+"]",this.domNode);
if(_fb.length){
dojo.addClass(_fb[0],"dijitCalendarSelectedDate");
}
this.set("currentFocus",_f9);
if(_fa||typeof _fa=="undefined"){
this.onChange(this.get("value"));
this.onValueSelected(this.get("value"));
}
}
}
}else{
this._set("value",null);
this.set("currentFocus",this.currentFocus);
}
},_setText:function(_fc,_fd){
while(_fc.firstChild){
_fc.removeChild(_fc.firstChild);
}
_fc.appendChild(dojo.doc.createTextNode(_fd));
},_populateGrid:function(){
var _fe=new this.dateClassObj(this.currentFocus);
_fe.setDate(1);
var _ff=_fe.getDay(),_100=this.dateFuncObj.getDaysInMonth(_fe),_101=this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(_fe,"month",-1)),_102=new this.dateClassObj(),_103=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_103>_ff){
_103-=7;
}
dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_104,i){
i+=_103;
var date=new this.dateClassObj(_fe),_105,_106="dijitCalendar",adj=0;
if(i<_ff){
_105=_101-_ff+i+1;
adj=-1;
_106+="Previous";
}else{
if(i>=(_ff+_100)){
_105=i-_ff-_100+1;
adj=1;
_106+="Next";
}else{
_105=i-_ff+1;
_106+="Current";
}
}
if(adj){
date=this.dateFuncObj.add(date,"month",adj);
}
date.setDate(_105);
if(!this.dateFuncObj.compare(date,_102,"date")){
_106="dijitCalendarCurrentDate "+_106;
}
if(this._isSelectedDate(date,this.lang)){
_106="dijitCalendarSelectedDate "+_106;
}
if(this.isDisabledDate(date,this.lang)){
_106="dijitCalendarDisabledDate "+_106;
}
var _107=this.getClassForDate(date,this.lang);
if(_107){
_106=_107+" "+_106;
}
_104.className=_106+"Month dijitCalendarDateTemplate";
_104.dijitDateValue=date.valueOf();
dojo.attr(_104,"dijitDateValue",date.valueOf());
var _108=dojo.query(".dijitCalendarDateLabel",_104)[0],text=date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate();
this._setText(_108,text);
},this);
var _109=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_fe);
this.monthDropDownButton.dropDown.set("months",_109);
var _10a=this.dateLocaleModule.getNames("months","abbr","standAlone",this.lang,_fe);
this.monthDropDownButton.containerNode.innerHTML=(dojo.isIE==6?"":"<div class='dijitSpacer'>"+this.monthDropDownButton.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_10a[_fe.getMonth()]+" "+_fe.getFullYear()+"</div>";
var y=_fe.getFullYear()-1;
var d=new this.dateClassObj();
dojo.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(args){
var _10b=(args.datePackage&&(args.datePackage!="dojo.date"))?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_10b,false);
this.datePackage=args.datePackage||this.datePackage;
this.dateFuncObj=dojo.getObject(this.datePackage,false);
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
},postMixInProperties:function(){
if(isNaN(this.value)){
delete this.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
var _10c=dojo.hitch(this,function(_10d,n){
var _10e=dojo.query(_10d,this.domNode)[0];
for(var i=0;i<n;i++){
_10e.parentNode.appendChild(_10e.cloneNode(true));
}
});
_10c(".dijitCalendarDayLabelTemplate",6);
_10c(".dijitCalendarDateTemplate",6);
_10c(".dijitCalendarWeekTemplate",5);
var _10f=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang);
var _110=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_111,i){
this._setText(_111,_10f[(i+_110)%7]);
},this);
var _112=new this.dateClassObj(this.currentFocus);
this.monthDropDownButton.dropDown=new dijit.Calendar._MonthDropDown({id:this.id+"_mdd",onChange:dojo.hitch(this,"_onMonthSelect")});
this.set("currentFocus",_112,false);
var _113=this;
var _114=function(_115,_116,adj){
_113._connects.push(dijit.typematic.addMouseListener(_113[_115],_113,function(_117){
if(_117>=0){
_113._adjustDisplay(_116,adj);
}
},0.8,500));
};
_114("incrementMonth","month",1);
_114("decrementMonth","month",-1);
_114("nextYearLabelNode","year",1);
_114("previousYearLabelNode","year",-1);
},_adjustDisplay:function(part,_118){
this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus,part,_118));
},_setCurrentFocusAttr:function(date,_119){
var _11a=this.currentFocus,_11b=_11a?dojo.query("[dijitDateValue="+_11a.valueOf()+"]",this.domNode)[0]:null;
date=new this.dateClassObj(date);
date.setHours(1,0,0,0);
this._set("currentFocus",date);
this._populateGrid();
var _11c=dojo.query("[dijitDateValue="+date.valueOf()+"]",this.domNode)[0];
_11c.setAttribute("tabIndex",this.tabIndex);
if(this._focused||_119){
_11c.focus();
}
if(_11b&&_11b!=_11c){
if(dojo.isWebKit){
_11b.setAttribute("tabIndex","-1");
}else{
_11b.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onMonthSelect:function(_11d){
this.currentFocus=this.dateFuncObj.add(this.currentFocus,"month",_11d-this.currentFocus.getMonth());
this._populateGrid();
},_onDayClick:function(evt){
dojo.stopEvent(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!dojo.hasClass(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_onDayMouseOver:function(evt){
var node=dojo.hasClass(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&(node.dijitDateValue||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
dojo.addClass(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(dojo.hasClass(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
dojo.removeClass(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.addClass(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.removeClass(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var dk=dojo.keys,_11e=-1,_11f,_120=this.currentFocus;
switch(evt.keyCode){
case dk.RIGHT_ARROW:
_11e=1;
case dk.LEFT_ARROW:
_11f="day";
if(!this.isLeftToRight()){
_11e*=-1;
}
break;
case dk.DOWN_ARROW:
_11e=1;
case dk.UP_ARROW:
_11f="week";
break;
case dk.PAGE_DOWN:
_11e=1;
case dk.PAGE_UP:
_11f=evt.ctrlKey||evt.altKey?"year":"month";
break;
case dk.END:
_120=this.dateFuncObj.add(_120,"month",1);
_11f="day";
case dk.HOME:
_120=new this.dateClassObj(_120);
_120.setDate(1);
break;
case dk.ENTER:
case dk.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_11f){
_120=this.dateFuncObj.add(_120,_11f,_11e);
}
this._setCurrentFocusAttr(_120);
return false;
},_onKeyPress:function(evt){
if(!this.handleKey(evt)){
dojo.stopEvent(evt);
}
},onValueSelected:function(date){
},onChange:function(date){
},_isSelectedDate:function(_121,_122){
return this._isValidDate(this.value)&&!this.dateFuncObj.compare(_121,this.value,"date");
},isDisabledDate:function(_123,_124){
},getClassForDate:function(_125,_126){
}});
dojo.declare("dijit.Calendar._MonthDropDown",[dijit._Widget,dijit._Templated],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"dojoAttachEvent='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_127){
this.domNode.innerHTML=dojo.map(_127,function(_128,idx){
return _128?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_128+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(dojo.attr(evt.target,"month"));
},onChange:function(_129){
},_onMenuHover:function(evt){
dojo.toggleClass(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
}
if(!dojo._hasResource["dijit.form._DateTimeTextBox"]){
dojo._hasResource["dijit.form._DateTimeTextBox"]=true;
dojo.provide("dijit.form._DateTimeTextBox");
new Date("X");
dojo.declare("dijit.form._DateTimeTextBox",[dijit.form.RangeBoundTextBox,dijit._HasDropDown],{templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t>\n\t\t\t    <!-- Copyright (C) 2012 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),hasDownArrow:true,openOnClick:true,regExpGen:dojo.date.locale.regexp,datePackage:"dojo.date",compare:function(val1,val2){
var _12a=this._isInvalidDate(val1);
var _12b=this._isInvalidDate(val2);
return _12a?(_12b?0:-1):(_12b?1:dojo.date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_12c,_12d){
if(!_12c){
return "";
}
return this.dateLocaleModule.format(_12c,_12d);
},"parse":function(_12e,_12f){
return this.dateLocaleModule.parse(_12e,_12f)||(this._isEmpty(_12e)?null:undefined);
},serialize:function(val,_130){
if(val.toGregorian){
val=val.toGregorian();
}
return dojo.date.stamp.toISOString(val,_130);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(args){
var _131=args.datePackage?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_131,false);
this.value=new this.dateClassObj("");
this.datePackage=args.datePackage||this.datePackage;
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
this.regExpGen=this.dateLocaleModule.regexp;
this._invalidDate=dijit.form._DateTimeTextBox.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(this.openOnClick||!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_132){
_132.selector=this._selector;
_132.fullYear=true;
var _133=dojo.date.stamp.fromISOString;
if(typeof _132.min=="string"){
_132.min=_133(_132.min);
}
if(typeof _132.max=="string"){
_132.max=_133(_132.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_134){
return !_134||isNaN(_134)||typeof _134!="object"||_134.toString()==this._invalidDate;
},_setValueAttr:function(_135,_136,_137){
if(_135!==undefined){
if(typeof _135=="string"){
_135=dojo.date.stamp.fromISOString(_135);
}
if(this._isInvalidDate(_135)){
_135=null;
}
if(_135 instanceof Date&&!(this.dateClassObj instanceof Date)){
_135=new this.dateClassObj(_135);
}
}
this.inherited(arguments);
if(this.dropDown){
this.dropDown.set("value",_135,false);
}
},_set:function(attr,_138){
if(attr=="value"&&this.value instanceof Date&&this.compare(_138,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_139){
if(this.dropDown){
this.dropDown.destroy();
}
var _13a=dojo.getObject(this.popupClass,false),_13b=this,_13c=this.get("value");
this.dropDown=new _13a({onChange:function(_13d){
dijit.form._DateTimeTextBox.superclass._setValueAttr.call(_13b,_13d,true);
},id:this.id+"_popup",dir:_13b.dir,lang:_13b.lang,value:_13c,currentFocus:!this._isInvalidDate(_13c)?_13c:this.dropDownDefaultValue,constraints:_13b.constraints,filterString:_13b.filterString,datePackage:_13b.datePackage,isDisabledDate:function(date){
return !_13b.rangeCheck(date,_13b.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_13e,_13f){
this._setValueAttr(this.parse(_13e,this.constraints),_13f,_13e);
}});
}
if(!dojo._hasResource["dijit.form.DateTextBox"]){
dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:"dijit.Calendar",_selector:"date",value:new Date("")});
}
if(!dojo._hasResource["dijit._TimePicker"]){
dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dijit","templates/TimePicker.html","<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div dojoAttachPoint=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\n    ><div dojoAttachPoint=\"timeMenu,focusNode\" dojoAttachEvent=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div dojoAttachPoint=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\n></div>\n"),baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(_140){
dojo.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_140);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(_141,_142){
return false;
},_getFilteredNodes:function(_143,_144,_145,_146){
var _147=[],_148=_146?_146.date:this._refDate,n,i=_143,max=this._maxIncrement+Math.abs(i),chk=_145?-1:1,dec=_145?1:0,inc=1-dec;
do{
i=i-dec;
n=this._createOption(i);
if(n){
if((_145&&n.date>_148)||(!_145&&n.date<_148)){
break;
}
_147[_145?"unshift":"push"](n);
_148=n.date;
}
i=i+inc;
}while(_147.length<_144&&(i*chk)<max);
return _147;
},_showText:function(){
var _149=dojo.date.stamp.fromISOString;
this.timeMenu.innerHTML="";
this._clickableIncrementDate=_149(this.clickableIncrement);
this._visibleIncrementDate=_149(this.visibleIncrement);
this._visibleRangeDate=_149(this.visibleRange);
var _14a=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_14b=_14a(this._clickableIncrementDate),_14c=_14a(this._visibleIncrementDate),_14d=_14a(this._visibleRangeDate),time=(this.value||this.currentFocus).getTime();
this._refDate=new Date(time-time%(_14c*1000));
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._totalIncrements=_14d/_14b;
this._visibleIncrement=_14c/_14b;
this._maxIncrement=(60*60*24)/_14b;
var _14e=this._getFilteredNodes(0,Math.min(this._totalIncrements>>1,10)-1),_14f=this._getFilteredNodes(0,Math.min(this._totalIncrements,10)-_14e.length,true,_14e[0]);
dojo.forEach(_14f.concat(_14e),function(n){
this.timeMenu.appendChild(n);
},this);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_150){
dojo.mixin(this,_150);
if(!_150.locale){
_150.locale=this.lang;
}
},postCreate:function(){
this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addMouseListener(this.upArrow,this,"_onArrowUp",33,250));
this._connects.push(dijit.typematic.addMouseListener(this.downArrow,this,"_onArrowDown",33,250));
this.inherited(arguments);
},_buttonMouse:function(e){
dojo.toggleClass(e.currentTarget,e.currentTarget==this.upArrow?"dijitUpArrowHover":"dijitDownArrowHover",e.type=="mouseenter"||e.type=="mouseover");
},_createOption:function(_151){
var date=new Date(this._refDate);
var _152=this._clickableIncrementDate;
date.setHours(date.getHours()+_152.getHours()*_151,date.getMinutes()+_152.getMinutes()*_151,date.getSeconds()+_152.getSeconds()*_151);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _153=dojo.date.locale.format(date,this.constraints);
if(this.filterString&&_153.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=dojo.create("div",{"class":this.baseClass+"Item"});
div.date=date;
div.index=_151;
dojo.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_153},div);
if(_151%this._visibleIncrement<1&&_151%this._visibleIncrement>-1){
dojo.addClass(div,this.baseClass+"Marker");
}else{
if(!(_151%this._clickableIncrement)){
dojo.addClass(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(date)){
dojo.addClass(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!dojo.date.compare(this.value,date,this.constraints.selector)){
div.selected=true;
dojo.addClass(div,this.baseClass+"ItemSelected");
if(dojo.hasClass(div,this.baseClass+"Marker")){
dojo.addClass(div,this.baseClass+"MarkerSelected");
}else{
dojo.addClass(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},_onOptionSelected:function(tgt){
var _154=tgt.target.date||tgt.target.parentNode.date;
if(!_154||this.isDisabledDate(_154)){
return;
}
this._highlighted_option=null;
this.set("value",_154);
this.onChange(_154);
},onChange:function(time){
},_highlightOption:function(node,_155){
if(!node){
return;
}
if(_155){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=node;
}else{
if(this._highlighted_option!==node){
return;
}else{
this._highlighted_option=null;
}
}
dojo.toggleClass(node,this.baseClass+"ItemHover",_155);
if(dojo.hasClass(node,this.baseClass+"Marker")){
dojo.toggleClass(node,this.baseClass+"MarkerHover",_155);
}else{
dojo.toggleClass(node,this.baseClass+"TickHover",_155);
}
},onmouseover:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(!dojo.hasClass(tgr,this.baseClass+"Item")){
return;
}
this._highlightOption(tgr,true);
},onmouseout:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlightOption(tgr,false);
},_mouseWheeled:function(e){
this._keyboardSelected=null;
dojo.stopEvent(e);
var _156=(dojo.isIE?e.wheelDelta:-e.detail);
this[(_156>0?"_onArrowUp":"_onArrowDown")]();
},_onArrowUp:function(_157){
if(typeof _157=="number"&&_157==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _158=this.timeMenu.childNodes[0].index;
var divs=this._getFilteredNodes(_158,1,true,this.timeMenu.childNodes[0]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(divs[0],this.timeMenu.childNodes[0]);
}
},_onArrowDown:function(_159){
if(typeof _159=="number"&&_159==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _15a=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var divs=this._getFilteredNodes(_15a,1,false,this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(divs[0]);
}
},handleKey:function(e){
var dk=dojo.keys;
if(e.charOrCode==dk.DOWN_ARROW||e.charOrCode==dk.UP_ARROW){
dojo.stopEvent(e);
if(this._highlighted_option&&!this._highlighted_option.parentNode){
this._highlighted_option=null;
}
var _15b=this.timeMenu,tgt=this._highlighted_option||dojo.query("."+this.baseClass+"ItemSelected",_15b)[0];
if(!tgt){
tgt=_15b.childNodes[0];
}else{
if(_15b.childNodes.length){
if(e.charOrCode==dk.DOWN_ARROW&&!tgt.nextSibling){
this._onArrowDown();
}else{
if(e.charOrCode==dk.UP_ARROW&&!tgt.previousSibling){
this._onArrowUp();
}
}
if(e.charOrCode==dk.DOWN_ARROW){
tgt=tgt.nextSibling;
}else{
tgt=tgt.previousSibling;
}
}
}
this._highlightOption(tgt,true);
this._keyboardSelected=tgt;
return false;
}else{
if(e.charOrCode==dk.ENTER||e.charOrCode===dk.TAB){
if(!this._keyboardSelected&&e.charOrCode===dk.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.charOrCode===dk.TAB;
}
}
}});
}
if(!dojo._hasResource["dijit.form.TimeTextBox"]){
dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:"dijit._TimePicker",_selector:"time",value:new Date(""),_onKey:function(evt){
this.inherited(arguments);
switch(evt.keyCode){
case dojo.keys.ENTER:
case dojo.keys.TAB:
case dojo.keys.ESCAPE:
case dojo.keys.DOWN_ARROW:
case dojo.keys.UP_ARROW:
break;
default:
setTimeout(dojo.hitch(this,function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
}),0);
}
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Date"]){
dojo._hasResource["wm.base.widget.Editors.Date"]=true;
dojo.provide("wm.base.widget.Editors.Date");
dojo.declare("wm.Date",wm.Text,{openOnClick:true,useLocalTime:false,promptMessage:"",invalidMessage:"",minimum:"",maximum:"",dateMode:"Date",formatLength:"short",validationEnabled:function(){
return true;
},getEditorConstraints:function(){
var _15c={};
if(this.minimum){
_15c.min=this.convertValue(this.minimum);
}
if(this.maximum){
_15c.max=this.convertValue(this.maximum);
}
return _15c;
},getEditorProps:function(_15d,_15e){
var _15f=this.getEditorConstraints();
var prop=dojo.mixin(this.inherited(arguments),{promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",constraints:_15f,required:this.required,openOnClick:this.openOnClick,value:this.convertValue(this.displayValue)},_15e||{});
return prop;
},_createEditor:function(_160,_161){
var e=new wm.form.DateTextBox(this.getEditorProps(_160,_161));
if(wm.isMobile){
var self=this;
dojo.query("input",e.domNode).forEach(function(node){
dojo.attr(node,"readonly",true);
});
}
return e;
},convertValue:function(_162){
return wm.convertValueToDate(_162,{selector:this.dateMode.toLowerCase(),formatLength:this.formatLength,timePattern:this.use24Time?"HH:mm":"hh:mm a"});
},getEditorValue:function(){
var d=this.inherited(arguments);
if(d){
if(!this.useLocalTime){
var _163=(this.owner instanceof wm.DateTime==false||this.owner.dateMode=="Date")?360:0;
d.setHours(0,-60*wm.timezoneOffset+_163,0,0);
}
return d.getTime();
}
return this.makeEmptyValue();
},setDisplayValue:function(_164){
var tmp=this.useLocalTime;
this.useLocalTime=true;
this.setEditorValue(_164);
this.useLocalTime=tmp;
},setEditorValue:function(_165){
var v=this.convertValue(_165);
if(!this.useLocalTime&&v){
v=new Date(v);
var _166=(this.owner instanceof wm.DateTime==false||this.owner.dateMode=="Date")?360:0;
v.setHours(0,60*v.getHours()+v.getMinutes()+60*wm.timezoneOffset+_166,0,0);
}
this.inherited(arguments,[v]);
},setDefaultOnInsert:function(){
if(this.defaultInsert){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.setDataValue(this.defaultInsert);
this.invalidate();
}
},calcDisplayValue:function(_167){
var d=_167;
if(d instanceof Date==false){
d=new Date(_167);
}
return dojo.date.locale.format(d,{formatLength:this.formatLength,fullYear:true,selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a"});
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}else{
if(this.dataValue){
return this.calcDisplayValue(this.dataValue);
}else{
return "";
}
}
},setMaximum:function(_168){
if(!_168){
this.maximum=null;
}else{
this.maximum=_168;
}
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
},setMinimum:function(_169){
if(!_169){
this.minimum=null;
}else{
this.minimum=_169;
}
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1=0;
}
if(val2===undefined||val2===null){
val2=0;
}
if(val1 instanceof Date==false){
val1=new Date(val1);
}
if(val2 instanceof Date==false){
var val2=new Date(val2);
}
if(val1&&val2&&val1.getTime()==val2.getTime()){
return false;
}
val1=dojo.date.locale.format(val1,{formatLength:this.formatLength||"short",selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a"});
val2=dojo.date.locale.format(val2,{formatLength:this.formatLength||"short",selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a"});
return val1!=val2;
}});
dojo.declare("wm.Time",wm.Date,{useLocalTime:true,use24Time:false,timePattern:"hh:mm a",useWMDropDown:false,init:function(){
this.inherited(arguments);
if(this.use24Time){
this.timePattern=this.timePattern.replace(/h/g,"H").replace(/ a/,"");
}
},setDataValue:function(_16a){
if(_16a){
var d=new Date(_16a);
d.setYear(1970);
d.setMonth(0);
d.setDate(1);
}
this.inherited(arguments,[_16a?d.getTime():null]);
},getEditorProps:function(_16b,_16c){
var prop=dojo.mixin(this.inherited(arguments),{use24Time:this.use24Time,constraints:{timePattern:this.timePattern}},_16c||{});
return prop;
},convertValue:function(_16d){
return wm.convertValueToDate(_16d,{selector:"time"});
},_createEditor:function(_16e,_16f){
var e;
if(this.useWMDropDown){
e=new wm.form.TimeTextBox(this.getEditorProps(_16e,_16f));
}else{
e=new dijit.form.TimeTextBox(this.getEditorProps(_16e,_16f));
}
if(wm.isMobile){
var self=this;
dojo.query("input",e.domNode).forEach(function(node){
dojo.attr(node,"readonly",true);
});
}
return e;
},getEditorValue:function(){
var d=wm.Text.prototype.getEditorValue.call(this);
if(d){
if(!this.useLocalTime&&(this.owner instanceof wm.DateTime===false)){
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset,0);
}
return d.getTime();
}
return this.makeEmptyValue();
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1=0;
}
if(val2===undefined||val2===null){
val2=0;
}
if(val1 instanceof Date==false){
val1=new Date(val1);
}
if(val2 instanceof Date==false){
var val2=new Date(val2);
}
if(val1&&val2&&val1.getTime()==val2.getTime()){
return false;
}
val1=dojo.date.locale.format(val1,{timePattern:this.timePattern,selector:"time"});
val2=dojo.date.locale.format(val2,{timePattern:this.timePattern,selector:"time"});
return val1!=val2;
}});
dojo.declare("wm.DateTime",wm.Date,{editorBorder:false,use24Time:false,formatLength:"short",dateMode:"Date and Time",_createEditor:function(_170,_171){
this.containerWidget=new wm.Container({width:"100%",height:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top",name:"containerWidget",owner:this,domNode:_170});
this.dateEditor=new wm.Date({owner:this,parent:this.containerWidget,name:"date",showing:this.dateMode!="Time",width:"100%",height:"100%",padding:"0",openOnClick:this.openOnClick,useLocalTime:this.useLocalTime,formatLength:this.formatLength,maximum:this.maximum,minimum:this.minimum,onchange:dojo.hitch(this,"changed")});
this.timeEditor=new wm.Time({owner:this,useWMDropDown:true,name:"time",parent:this.containerWidget,showing:this.dateMode!="Date",width:"100%",height:"100%",padding:"0",openOnClick:this.openOnClick,useLocalTime:this.useLocalTime,formatLength:this.formatLength,use24Time:this.use24Time,onchange:dojo.hitch(this,"changed")});
if(this._disabled){
this.setDisabled(this.disabled);
}
return this.containerWidget;
},flow:function(){
if(this.containerWidget&&!this.containerWidget.isDestroyed){
this.containerWidget.flow();
}
},sizeEditor:function(){
this.inherited(arguments);
this.flow();
},setDisabled:function(_172){
wm.Control.prototype.setDisabled.call(this,_172);
if(this.containerWidget){
this.containerWidget._parentDisabled=this._disabled;
this.containerWidget.setDisabled(_172);
}
},focus:function(_173){
if(!this.editor){
return;
}
switch(this.dateMode){
case "Date and Time":
case "Date":
this.dateEditor.focus();
break;
case "Time":
this.timeEditor.focus();
break;
}
},_getValidatorNode:function(){
return null;
},setEditorValue:function(_174){
if(!this.editor){
this.dataValue=_174;
return;
}
var d;
if(_174 instanceof Date){
d=new Date(_174);
}else{
if(String(_174).match(/^\d+$/)){
d=new Date(_174);
}else{
if(_174){
d=wm.convertValueToDate(_174,{formatLength:this.formatLength,selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a"});
}
}
}
this.timeEditor.setDataValue(d);
this.dateEditor.setDataValue(d);
this.updateReadonlyValue();
},setDisplayValue:function(_175){
var tmp=this.useLocalTime;
this.useLocalTime=true;
this.dateEditor.useLocalTime=true;
this.timeEditor.useLocalTime=true;
this.setEditorValue(_175);
this.useLocalTime=tmp;
this.dateEditor.useLocalTime=tmp;
this.timeEditor.useLocalTime=tmp;
},getEditorValue:function(_176){
var d=new Date(0);
if(this.dateMode=="Date"||this.dateMode=="Date and Time"){
var v=this.dateEditor.getDataValue();
if(v){
d=new Date(v);
}else{
return null;
}
}
if(this.dateMode=="Time"||this.dateMode=="Date and Time"){
var v=this.timeEditor.getDataValue();
if(v){
var _177=new Date(v);
if(this.useLocalTime){
d.setHours(_177.getHours(),_177.getMinutes(),_177.getSeconds());
}else{
d.setHours(0,(_177.getHours()+d.getHours())*60+d.getMinutes()+_177.getMinutes(),_177.getSeconds());
}
}else{
if(this.useLocalTime){
d.setHours(0,0,0);
}
}
}
return d.getTime();
},setDateMode:function(_178){
var _179=this.getDataValue();
this.dateMode=_178;
if(this.editor){
switch(this.dateMode){
case "Date and Time":
this.dateEditor.show();
this.timeEditor.show();
break;
case "Date":
this.dateEditor.show();
this.timeEditor.hide();
break;
case "Time":
this.dateEditor.hide();
this.timeEditor.show();
break;
}
}
this.setDataValue(_179);
},_getReadonlyValue:function(){
var d=this.getDataValue();
if(d){
d=new Date(d);
if(!this.useLocalTime){
var _17a=(this.dateMode=="Date")?360:0;
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset+_17a);
}
}
return this.calcDisplayValue(d);
},getDisplayValue:function(){
var v=this.getDataValue();
if(v===null||v===undefined){
return "";
}
return this.calcDisplayValue(this.getDataValue());
},setMaximum:function(_17b){
this.maximum=_17b;
this.dateEditor.setMaximum(_17b);
},setMinimum:function(_17c){
this.minimum=_17c;
this.dateEditor.setMinimum(_17c);
},getInvalid:function(){
return this.editor?this.editor.getInvalid():false;
},connectEditor:function(){
this.disconnectEditor();
this.timeEditor.onChange=this.dateEditor.onChange=dojo.hitch(this,"changed");
this.timeEditor.onblur=this.dateEditor.onblur=dojo.hitch(this,"onblur");
this.timeEditor.onfocus=this.dateEditor.onfocus=dojo.hitch(this,"onfocus");
}});
dojo.declare("wm.form.DateTextBox",dijit.form.DateTextBox,{autoWidth:!Boolean(wm.isMobile),forceWidth:false,openDropDown:function(_17d){
this.inherited(arguments);
if(wm.device=="phone"){
var _17e=5;
var h=app.appRoot.bounds.h-_17e*2;
var w=app.appRoot.bounds.w-_17e*2;
dojo.marginBox(this.dropDown.domNode.parentNode,{l:3,t:3,w:app.appRoot.bounds.w,h:app.appRoot.bounds.h});
dojo.marginBox(this.dropDown.domNode,{l:0,t:0,w:w-8,h:h-5});
if(!this.xNode){
var x=this.xNode=document.createElement("span");
x.innerHTML="X";
dojo.addClass(x,"CalendarCloseButton");
this.dropDown.domNode.appendChild(x);
this.owner.connect(x,wm.isFakeMobile?"onclick":"onclick",this,function(){
this.closeDropDown(false);
});
}else{
this.dropDown.domNode.appendChild(this.xNode);
}
}
}});
dojo.declare("wm.form.TimeTextBox",dijit.form.TimeTextBox,{forceWidth:false,autoWidth:false,popupClass:"wm.TimePicker",openDropDown:function(_17f){
try{
this._openningDropDown=true;
if(!wm.TimePicker.dialog){
wm.TimePicker.dialog=new wm.TimePicker({owner:this,name:"DateTimePopup"});
}
if(this.dropDown&&this.dropDown._popupWrapper&&!this.dropDown._popupWrapper.style.display){
return;
}
var _180=Number(app.appRoot.deviceSize)<=450;
this.dropDown=wm.TimePicker.dialog;
this.dropDown._cupdating=true;
this.dropDown.okButton.setCaption("OK");
this.dropDown.cancelButton.setCaption("Cancel");
this.dropDown._updating=true;
this.dropDown.setUse24Time(this.use24Time);
this.dropDown._currentDijit=this;
this._aroundNode=app.appRoot.domNode;
this._preparedNode=true;
var _181=dijit._HasDropDown.prototype.openDropDown.call(this,_17f);
var _182=false;
if(_180){
_182=true;
var _183=5;
var h=app.appRoot.bounds.h-_183*2;
var w=app.appRoot.bounds.w-_183*2;
dojo.marginBox(this.dropDown.domNode.parentNode,{l:5,t:5,w:w,h:h});
this.dropDown.setWidth(w+"px");
this.dropDown.setHeight(h+"px");
}else{
if(wm.isMobile){
this.dropDown.setHeight("350px");
this.dropDown.setWidth("253px");
}else{
this.dropDown.setHeight("240px");
this.dropDown.setWidth("260px");
}
}
if(!_182){
var _184=dojo.coords(this.owner.editor.domNode);
var _185={h:this.dropDown.bounds.h,w:this.dropDown.bounds.w};
if(_184.y+_184.h+_185.h<app.appRoot.bounds.h){
_185.t=_184.y+_184.h;
}else{
if(_185.h<_184.y){
_185.t=_184.y-_185.h;
}else{
_185.t=0;
}
}
_185.l=_184.x;
if(_185.l+_185.w>app.appRoot.bounds.w){
_185.l=app.appRoot.bounds.w-_185.w;
}
dojo.marginBox(this.dropDown.domNode.parentNode,_185);
}
this.dropDown.buttonPanel.setShowing(wm.isMobile);
this.dropDown.callOnShowParent();
this.dropDown.setDataValue(this.get("value"));
this.dropDown._updating=false;
app.addHistory({id:this.owner.getRuntimeId(),options:{},title:"Hide Popup"});
this.dropDown._cupdating=false;
wm.onidle(this.dropDown,"showContents");
return _181;
}
finally{
this.dropDown.reflow();
this._openningDropDown=false;
}
}});
dojo.declare("wm.TimePicker",wm.Container,{use24Time:false,border:"1",borderColor:"#333",height:"452px",width:"220px",padding:"0",margin:"0",classNames:"wmdialog MainContent",horizontalAlign:"left",verticalAlign:"top",dataValue:null,prepare:function(_186){
_186.owner=app;
this.inherited(arguments);
},setUse24Time:function(_187){
this.use24Time=_187;
this.ampm.setShowing(!_187);
if(this.hours.showing){
var _188=[];
for(var i=_187?0:1;i<=(_187?23:12);i++){
_188.push({dataValue:i});
}
this.hours.renderData(_188);
}
},hideContents:function(){
this.mainPanel.setShowing(false);
},showContents:function(){
if(!this.mainPanel.showing){
this._cupdating=true;
this.mainPanel.setShowing(true);
this.hours.renderDojoObj();
this.minutes.renderDojoObj();
this._cupdating=false;
this.reflow();
this.renderBounds();
}
},postInit:function(){
var _189=dojo.hitch(this,"changed");
this.mainPanel=new wm.Panel({owner:this,parent:this,showing:false,name:"mainDateTimePickerPanel",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"center",width:"100%",height:"100%"});
wm.require("wm.List");
this.hours=new wm.List({owner:this,parent:this.mainPanel,selectionMode:wm.isMobile?"radio":"single",name:"hours",columns:[{"show":true,"title":"Hour","width":"100%","align":"left","field":"dataValue",mobileColumn:1}],_pkList:["dataValue"],height:"100%",padding:"2",width:"100%",minWidth:100,border:"0,2,0,0",padding:"0",margin:"0",onSelect:_189});
this.hours.selectedItem.setType("NumberData");
var _18a=[];
for(var i=0;i<12;i++){
_18a.push({dataValue:i});
}
this.hours.renderData(_18a);
this.minutes=new wm.List({owner:this,parent:this.mainPanel,selectionMode:wm.isMobile?"radio":"single",name:"minutes",columns:[{"show":true,"title":"Minute","width":"100%","align":"left","field":"dataValue",mobileColumn:1}],_pkList:["dataValue"],height:"100%",padding:"2",width:"100%",minWidth:100,border:"0,2,0,0",padding:"0",margin:"0",onSelect:_189});
this.minutes.selectedItem.setType("NumberData");
var _18b=[];
for(var i=0;i<60;i+=5){
_18b.push({dataValue:i});
}
this.minutes.renderData(_18b);
this.ampm=new wm.ToggleButtonPanel({owner:this,parent:this.mainPanel,name:"ampm",height:"90px",width:"60px",layoutKind:"top-to-bottom",verticalAlign:"middle",margin:"0,7,0,3",onChange:_189});
this.amButton=new wm.Button({owner:this,parent:this.ampm,height:"100%",caption:"AM",name:"amButton"});
this.pmButton=new wm.Button({owner:this,parent:this.ampm,height:"100%",caption:"PM",name:"pmButton"});
this.buttonPanel=new wm.Panel({owner:this,parent:this,_classes:{domNode:["dialogfooter"]},showing:wm.isMobile,name:"dateTimePickerButtonPanel",layoutKind:"left-to-right",horizontalAlign:"right",verticalAlign:"bottom",width:"100%",mobileHeight:"45px",desktopHeight:"32px"});
this.okButton=new wm.Button({owner:this,parent:this.buttonPanel,name:"okButton",caption:"OK",width:"80px",height:"100%",onclick:dojo.hitch(this,"onOkClick")});
this.cancelButton=new wm.Button({owner:this,parent:this.buttonPanel,name:"cancelButton",caption:"Cancel",width:"80px",height:"100%",onclick:dojo.hitch(this,"onCancelClick")});
this.inherited(arguments);
},changed:function(){
if(this._updating){
return;
}
var date=new Date(0);
var hour=this.hours.selectedItem.getValue("dataValue");
if(hour==12&&!this.use24Time){
hour=0;
}
var _18c=this.minutes.selectedItem.getValue("dataValue");
var isPM=this.pmButton.clicked;
date.setHours(hour+(isPM&&!this.use24Time?12:0),_18c);
this.dataValue=date;
if(this._currentDijit){
this._currentDijit.set("value",date);
}
},set:function(_18d,_18e){
},destroyRecursive:function(){
},reflowParent:function(){
this.reflow();
this.renderBounds();
},getContentBounds:function(){
var b=this.inherited(arguments);
b.l+=this.borderExtents.l;
b.t+=this.borderExtents.t;
return b;
},setDataValue:function(_18f){
this._initialValue=_18f;
var _190;
if(_18f instanceof Date){
_190=_18f;
}else{
if(!_18f){
_190="";
}else{
_190=wm.convertValueToDate(_18f);
}
}
this.dataValue=_190;
if(_190){
var time=dojo.date.locale.format(_190,{selector:"time",timePattern:this.use24Time?"HH:mm":"hh:mm a"});
if(this.use24Time){
var _191=time.match(/^(\d\d)\:(\d\d)$/);
}else{
var _191=time.match(/^(\d\d)\:(\d\d) (.*)$/);
}
var _192=Number(_191[2].replace(/^0*/,""));
this.minutes.deselectAll();
this.minutes.selectItemOnGrid({dataValue:_192},["dataValue"]);
var hour;
if(this.use24Time){
hour=Number(_191[1]);
}else{
var isPM=_191[3].toLowerCase()=="pm";
hour=Number(_191[1].replace(/^0*/,""));
if(isPM){
this.pmButton.onclick(this.pmButton);
}else{
this.amButton.onclick(this.amButton);
}
}
this.hours.deselectAll();
this.hours.selectItemOnGrid({dataValue:hour},["dataValue"]);
}
},onOkClick:function(){
this._currentDijit._opened=true;
this._currentDijit.closeDropDown();
},onCancelClick:function(){
this._currentDijit._opened=true;
this._currentDijit.closeDropDown();
this._currentDijit.set("value",this._initialValue);
},onChange:function(_193){
}});
}
if(!dojo._hasResource["wm.base.widget.dijit.Dijit"]){
dojo._hasResource["wm.base.widget.dijit.Dijit"]=true;
dojo.provide("wm.base.widget.dijit.Dijit");
dojo.addOnLoad(function(){
var _194=function(inId){
var n=dojo.byId(inId);
n&&(n.style.visibility="hidden");
};
_194("a11yTestNode");
});
dojo.declare("wm.Dijit",wm.Control,{dijitClass:null,nonDijitProps:{name:1,flex:1,box:1,left:1,top:1,width:1,height:1,owner:1,parent:1,publishClass:1,dijitClass:1,domNode:1,id:1},prepare:function(_195){
this.dijitProps={};
for(var i in _195){
if(!(i in this.nonDijitProps)){
this.dijitProps[i]=_195[i];
}
}
this.inherited(arguments);
},destroy:function(){
if(this.dijit){
this.dijit.destroy();
}
this.inherited(arguments);
},setDomNode:function(_196){
_196=this.initDijit(_196);
this.inherited(arguments);
},initDijit:function(_197){
if(this.dijitClass){
if(typeof this.dijitClass=="string"){
dojo["require"](this.dijitClass);
}
var n=document.createElement("div");
_197.appendChild(n);
var p=dojo.mixin({srcNodeRef:n},this.getProperties());
var _198=typeof this.dijitClass=="string"?dojo.getObject(this.dijitClass):this.dijitClass;
try{
this.dijit=_198?new _198(p):null;
this.setEvents();
}
catch(e){
console.error(e);
}
}
return _197;
},getProperties:function(){
return this.dijitProps;
},setEvents:function(){
for(var n in this.dijit){
if(!n.indexOf("on")){
var e="_"+n;
if(!this[e]){
e=n;
}
if(this[e]){
this.connect(this.dijit,n,this,e);
}
}
}
}});
wm.Object.extendSchema(wm.Dijit,{box:{ignore:1}});
dojo.declare("wm.DijitWrapper",wm.Dijit,{});
dojo.declare("wm.CustomDijit",wm.Dijit,{scrim:true,renderBoundsX:true,renderBoundsY:true,renderBounds:function(){
this.inherited(arguments);
if(this.dijit){
var b=this.getStyleBounds();
if(!this.renderBoundsX){
delete b.w;
}
if(!this.renderBoundsY){
delete b.h;
}
dojo.marginBox(this.dijit.domNode,b);
}
}});
dojo.declare("wm.DijitDesigner",wm.CustomDijit,{dijitPropList:"",dijitClass:"",setProp:function(_199,_19a){
if(_199.indexOf("wmdijit")==0){
this[_199]=_19a;
this.dijitSet(_199,_19a);
}else{
this.inherited(arguments);
}
},dijitSet:function(_19b,_19c){
if(_19b.indexOf("wmdijit")==0){
_19b=wm.decapitalize(_19b.substring(7));
}
if(this.dijit["set"+wm.capitalize(_19b)]){
this.dijit["set"+wm.capitalize(_19b)](_19c);
}else{
this.dijit.set(_19b,_19c);
}
},getProp:function(_19d){
if(_19d.indexOf("wmdijit")==0){
return this.dijitGet(_19d);
}else{
return this.inherited(arguments);
}
},dijitGet:function(_19e){
var _19f=null;
try{
if(_19e.indexOf("wmdijit")==0){
_19e=wm.decapitalize(_19e.substring(7));
}
if(this.dijit["get"+wm.capitalize(_19e)]){
_19f=this.dijit["get"+wm.capitalize(_19e)]();
}else{
_19f=this.dijit.get(_19e);
}
if(_19f instanceof Date){
_19f=this._isDesignLoaded?dojo.date.locale.format(_19f,{formatLength:"short"}):_19f.getTime();
}else{
if(wm.isNode(_19f)){
_19f=_19f.id;
}
}
}
catch(e){
}
return _19f;
},getProperties:function(){
var _1a0={};
var _1a1=this.dijitPropList.split(/,/);
for(var i=0;i<_1a1.length;i++){
var _1a2=_1a1[i];
if(_1a2.indexOf("wmdijit")==0){
_1a0[wm.decapitalize(_1a2.substring(7))]=this[_1a2];
}else{
_1a0[_1a2]=this[_1a2];
}
}
return _1a0;
},setEvents:function(){
for(var _1a3 in this.dijit){
if(_1a3.indexOf("on")==0&&!_1a3.match(/(Mouse|Key)/)){
var _1a4="onDijit"+_1a3.substring(2);
if(!this[_1a4]){
this[_1a4]=function(){
};
}
this.connect(this.dijit,_1a3,this,_1a4);
}
}
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.dijit.Calendar"]){
dojo._hasResource["wm.base.widget.dijit.Calendar"]=true;
dojo.provide("wm.base.widget.dijit.Calendar");
dojo.extend(dijit.Calendar,{specialDates:null,getClassForDate:function(date){
if(!this.specialDatesHash){
return;
}
var _1a5=this.owner.cssClassField;
var key=wm.dijit.Calendar.getDateKey(date);
if(this.specialDatesHash&&this.specialDatesHash[key]){
var _1a6="";
for(var i=0;i<this.specialDatesHash[key].length;i++){
var _1a7=this.specialDatesHash[key][i][_1a5];
if(typeof _1a7=="number"){
_1a7="class"+_1a7;
}
_1a6+=((_1a6)?" ":"")+_1a7;
}
return _1a6;
}
}});
dojo.declare("wm.dijit.Calendar",wm.Dijit,{minimum:"",maximum:"",useLocalTime:false,displayDate:"",dijitClass:dijit.Calendar,width:"360px",height:"160px",mobileHeight:"210px",enableTouchHeight:true,dialog:null,useDialog:true,specialDates:null,dateField:null,startDateField:null,endDateField:null,cssClassField:null,desciptionField:null,setSpecialDates:function(_1a8){
if(!_1a8){
this.specialDates=null;
this.specialDatesHash={};
this.refreshCalendar();
return;
}
var _1a9={};
if(this.isDesignLoaded()){
if(!(_1a8 instanceof wm.Variable)){
var ds=this.getValueById(_1a8);
if(ds){
this.components.binding.addWire("","specialDates",ds.getId());
return;
}
}
}
if(dojo.isString(_1a8)){
_1a8=this.owner.getValue(_1a8);
}
this.specialDates=_1a8;
if(_1a8 instanceof wm.Variable){
_1a8=_1a8.getData();
}
for(var i=0;i<_1a8.length;i++){
var data=_1a8[i];
if(!data.date&&data.dataValue){
data=data.dataValue;
}
var date=data[this.dateField];
if(date instanceof Date===false){
date=new Date(date);
}
var key=wm.dijit.Calendar.getDateKey(date);
if(!_1a9[key]){
_1a9[key]=[];
}
_1a9[key].push(data);
}
this.specialDatesHash=_1a9;
this.refreshCalendar();
},getProperties:function(){
var _1aa=this.inherited(arguments);
_1aa.owner=this;
if(this.dateValue){
_1aa.currentFocus=_1aa.value=new Date(this.dateValue);
}
return _1aa;
},renderBounds:function(){
this.inherited(arguments);
this.dijit._setStyleAttr({width:this.bounds.w+"px",height:this.bounds.h+"px"});
},focus:function(){
this.dijit.focus();
},refreshCalendar:function(){
this.dijitProps.specialDatesHash=this.specialDatesHash;
if(this.dijit){
this.dijit.destroy();
this.initDijit(this.domNode);
this.dijit._setStyleAttr({width:this.bounds.w+"px",height:this.bounds.h+"px"});
}
},prepare:function(){
this.inherited(arguments);
if(this.specialDates){
this.setSpecialDates(this.specialDates);
}
},init:function(){
this.dijitProps.isDisabledDate=dojo.hitch(this,"isDisabledDate");
this.setMinimum(this.minimum);
this.setMaximum(this.maximum);
this.inherited(arguments);
if(this.dateValue){
this.setDateValue(this.dateValue);
}
if(this.useDialog){
this.dialog=new wm.WidgetsJsDialog({width:200,height:160,modal:false,owner:this,corner:"cr",fixPositionNode:this.domNode,widgets_data:{startContainer:["wm.Panel",{height:"20px",width:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top"},{},{startHeading:["wm.Label",{width:"40px",height:"100%",caption:"FROM:"}],startDate:["wm.Label",{width:"100%",height:"100%"}]}],endContainer:["wm.Panel",{height:"20px",width:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top"},{},{endHeading:["wm.Label",{width:"40px",height:"100%",caption:"TO:"}],endDate:["wm.Label",{width:"100%",height:"100%"}]}],description:["wm.Label",{width:"100%",height:"20px",autoSizeHeight:true,singleLine:false}]}});
this.dialog.titleMinify.hide();
this.dialog.titleMaxify.hide();
}
},setMinimum:function(_1ab){
if(this._isDesignLoaded){
if(_1ab instanceof Date){
this.minimum=_1ab.getTime();
}else{
if(!_1ab){
this.minimum="";
}else{
this.minimum=_1ab;
}
}
}else{
if(_1ab instanceof Date){
this.minimum=_1ab;
}else{
if(!_1ab){
this.minimum="";
}else{
this.minimum=wm.convertValueToDate(_1ab);
}
}
if(this.dijit){
var _1ac=this.dijit.value;
var _1ad=this.dijit.currentFocus;
this.dijit.destroy();
this.initDijit(this.domNode);
this.renderBounds();
this.dijit.set("currentFocus",_1ad);
this.setDate(_1ac);
}
}
},setMaximum:function(_1ae){
if(this._isDesignLoaded){
if(_1ae instanceof Date){
this.maximum=_1ae.getTime();
}else{
if(!_1ae){
this.maximum="";
}else{
this.maximum=_1ae;
}
}
}else{
if(_1ae instanceof Date){
this.maximum=_1ae;
}else{
if(!_1ae){
this.maximum="";
}else{
this.maximum=wm.convertValueToDate(_1ae);
}
}
if(this.dijit){
var _1af=this.dijit.value;
var _1b0=this.dijit.currentFocus;
this.dijit.destroy();
this.initDijit(this.domNode);
this.renderBounds();
this.dijit.set("currentFocus",_1b0);
this.setDate(_1af);
}
}
},setDomNode:function(){
this.inherited(arguments);
var s=this.dijit.domNode.style;
s.width=s.height="100%";
},setDate:function(_1b1){
var d=wm.convertValueToDate(_1b1);
if(d&&!this.useLocalTime){
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset);
}
this.dijit.set("value",d);
},getDisplayDate:function(){
if(!this.dijit||this.dijit.value instanceof Date==false){
return "";
}
return dojo.date.locale.format(this.dijit.value,{selector:"date"});
},setDisplayDate:function(_1b2){
this.setDate(_1b2);
},getDateValue:function(){
var d=this.dijit.value;
if(d instanceof Date){
var _1b3=360;
if(!this.useLocalTime){
d.setHours(0,-60*wm.timezoneOffset+_1b3,0);
}else{
d.setHours(0,0,0);
}
return d.getTime();
}
return null;
},setDateValue:function(_1b4){
this.setDate(_1b4);
},_onValueSelected:function(_1b5){
if(this._cupdating){
return;
}
this.onValueSelected(_1b5);
},onValueSelected:function(_1b6){
var key=wm.dijit.Calendar.getDateKey(_1b6);
if(this.useDialog&&this.specialDatesHash&&this.specialDatesHash[key]){
var data=this.specialDatesHash[key][0];
this.dialog.setTitle(key);
this.dialog.show();
this.dialog.$.startContainer.setShowing(Boolean(data[this.startDateField]));
this.dialog.$.endContainer.setShowing(Boolean(data[this.endDateField]));
this.dialog.$.startDate.setCaption(wm.dijit.Calendar.getTime(data[this.startDateField]));
this.dialog.$.endDate.setCaption(wm.dijit.Calendar.getTime(data[this.endDateField]));
this.dialog.$.description.setCaption(data[this.descriptionField]);
}else{
if(this.useDialog&&this.dialog.showing){
this.dialog.dismiss();
}
}
this.valueChanged("dateValue",_1b6 instanceof Date?_1b6.getTime():null);
},isDisabledDate:function(date){
if(this.minimum){
if(dojo.date.compare(date,this.minimum,"date")<0){
return true;
}
}
if(this.maximum){
if(dojo.date.compare(date,this.maximum,"date")>0){
return true;
}
}
return false;
}});
wm.dijit.Calendar.getTime=function(date){
if(date instanceof Date===false){
date=new Date(date);
}
var hour=date.getHours();
var ampm="am";
if(hour==0){
hour=12;
}else{
if(hour==12){
ampm="pm";
}else{
if(hour>12){
hour=hour%12;
ampm="pm";
}
}
}
return hour+":"+date.getMinutes()+" "+ampm;
};
wm.dijit.Calendar.getDateKey=function(date){
return (date.getYear()+1900)+"-"+(date.getMonth()+1)+"-"+date.getDate();
};
wm.dijit.Calendar.description="A monthly calendar.";
}
if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
}
if(!dojo._hasResource["dijit.form.CheckBox"]){
dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdojoAttachPoint=\"focusNode\"\n\t \tdojoAttachEvent=\"onclick:_onClick\"\n/></div>\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_1b7){
this._set("readOnly",_1b7);
dojo.attr(this.focusNode,"readOnly",_1b7);
dijit.setWaiState(this.focusNode,"readonly",_1b7);
},_setValueAttr:function(_1b8,_1b9){
if(typeof _1b8=="string"){
this._set("value",_1b8);
dojo.attr(this.focusNode,"value",_1b8);
_1b8=true;
}
if(this._created){
this.set("checked",_1b8,_1b9);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_1ba){
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
this._set("value",this.params.value||"on");
dojo.attr(this.focusNode,"value",this.value);
},_onFocus:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onClick:function(e){
if(this.readOnly){
dojo.stopEvent(e);
return false;
}
return this.inherited(arguments);
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_1bb){
this.inherited(arguments);
if(!this._created){
return;
}
if(_1bb){
var _1bc=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_1bd){
if(_1bd.name==_1bc.name&&_1bd!=_1bc.focusNode&&_1bd.form==_1bc.focusNode.form){
var _1be=dijit.getEnclosingWidget(_1bd);
if(_1be&&_1be.checked){
_1be.set("checked",false);
}
}
});
}
},_clicked:function(e){
if(!this.checked){
this.set("checked",true);
}
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Checkbox"]){
dojo._hasResource["wm.base.widget.Editors.Checkbox"]=true;
dojo.provide("wm.base.widget.Editors.Checkbox");
dojo.declare("wm.Checkbox",wm.AbstractEditor,{_captionTagName:"label",classNames:"wmeditor wmeditor-cbeditor",width:"180px",dataType:"boolean",startChecked:false,checkedValue:true,touchStart:function(){
if(this._disabled){
return;
}
this._touched=true;
this.editorNode.style.backgroundColor="black";
if(this.getChecked()){
this.editorNode.style.color="white";
}
wm.job(this.getRuntimeId()+"."+".touch",app.touchToClickDelay,dojo.hitch(this,"touchEnd"));
},touchMove:function(){
if(this._touched){
wm.cancelJob(this.getRuntimeId()+"."+".touch");
this.editorNode.style.backgroundColor="";
this.editorNode.style.color="";
this._touched=false;
}
},touchEnd:function(evt){
if(this._touched){
wm.cancelJob(this.getRuntimeId()+"."+".touch");
this.editorNode.style.backgroundColor="";
this.editorNode.style.color="";
this.setChecked(!this.getChecked());
this._touched=false;
}
},_createEditor:function(_1bf,_1c0){
var e=new dijit.form.CheckBox(this.getEditorProps(_1bf,_1c0));
if(wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"){
e._connects.forEach(function(c){
dojo.disconnect(c[0]);
});
e._connects=[];
var a=document.createElement("div");
a.className="wmcheckbox_x";
a.innerHTML="X";
e.domNode.appendChild(a);
dojo.connect(this.domNode,wm.isFakeMobile?"onmousedown":"ontouchstart",this,"touchStart");
dojo.connect(this.domNode,wm.isFakeMobile?"onmousemove":"ontouchmove",this,"touchMove");
dojo.connect(this.domNode,wm.isFakeMobile?"onmouseup":"ontouchend",this,"touchEnd");
}
return e;
},setRequired:function(){
},connectEditor:function(){
this.inherited(arguments);
},sizeEditor:function(){
if(this._cupdating){
return;
}
this.inherited(arguments);
var node=this.editorNode;
var size=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
node.style.width=size+"px";
node.style.height=size+"px";
var _1c1=parseInt(node.style.lineHeight);
node.style.marginTop=(Math.floor(_1c1-size)/2)+"px";
},styleEditor:function(){
this.inherited(arguments);
var n=this.captionNode;
if(n){
dojo.setSelectable(n,false);
}
},render:function(){
this.inherited(arguments);
this.domNode.style.textAlign=(this.captionPosition=="right")?"right":"";
},setInitialValue:function(){
this.beginEditUpdate();
if(this.startChecked&&!this._setEditorValueCalled||Boolean(this.dataValue)){
this.setChecked(true);
}
this.endEditUpdate();
},editorChanged:function(){
if(this.inherited(arguments)){
this.valueChanged("checked",this.getChecked());
return true;
}
return false;
},changed:function(){
if(this.editor){
this.editor._lastValueReported=this.getChecked();
}
this.inherited(arguments);
this.valueChanged("checked",this.getChecked());
},getChecked:function(){
if(this.editor){
return Boolean(this.editor.checked);
}else{
return Boolean(this.dataValue);
}
},setChecked:function(_1c2){
this.editor.set("checked",_1c2,false);
if(!this._cupdating){
this.changed();
}
},getDisplayValue:function(){
return this.getDataValue();
},setDisplayValue:function(_1c3){
},getEditorValue:function(){
var c=this.editor&&this.editor.checked;
var v=this.checkedValue;
if(v===undefined){
v=this.getTypedValue(1);
}else{
v=this.getTypedValue(v);
}
return c?v:this.makeEmptyValue();
},makeEmptyValue:function(){
return this.getTypedValue(this.inherited(arguments));
},getTypedValue:function(_1c4){
var v=_1c4;
switch(this.dataType){
case "string":
if(v===false){
v="false";
}else{
if(v===0){
v="0";
}else{
if(!v){
v="";
}else{
v=String(v);
}
}
}
return v;
case "number":
var n=Number(v);
return isNaN(n)?Number(Boolean(v)):n;
default:
return Boolean(v);
}
},setEditorValue:function(_1c5){
this._setEditorValueCalled=true;
if(this.editor){
var _1c6=this.getChecked();
this.editor.set("checked",Boolean(_1c5),false);
if(_1c6!=Boolean(_1c5)){
this.changed();
}
}
},updateReadonlyValue:function(){
},setStartChecked:function(_1c7){
this.startChecked=_1c7;
this.createEditor();
},set_startChecked:function(_1c8){
this.dataValue=Boolean(_1c8);
this.setStartChecked(_1c8);
},setDataType:function(_1c9){
this.dataType=_1c9;
if(_1c9=="boolean"){
this.displayValue=true;
}
switch(_1c9){
case "string":
break;
case "number":
if(typeof this.checkedValue=="number"){
}else{
if(String(this.checkedValue).match(/^[0-9.]+$/)){
}else{
app.toastWarning(studio.getDictionaryItem("wm.Checkbox.TOAST_WARN_CHECKED_VALUE_NOT_A_NUMBER"));
}
}
break;
case "boolean":
if(typeof this.checkedValue=="boolean"){
}else{
if(this.checkedValue=="true"){
this.checkedValue=true;
}else{
if(this.checkedValue=="false"){
this.checkedValue=false;
}else{
app.toastWarning(studio.getDictionaryItem("wm.Checkbox.TOAST_WARN_CHECKED_VALUE_NOT_A_BOOLEAN"));
}
}
}
break;
}
},setDisabled:function(_1ca){
this.inherited(arguments);
if(!this.editor){
return;
}
this.editor.set("disabled",this.readonly||this._disabled);
},setReadonly:function(_1cb){
this.readonly=_1cb;
if(!this.editor){
return;
}
if(!this.readOnlyNode){
this.readOnlyNode=this.editor;
}
this.editor.set("disabled",this.readonly||this._disabled);
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
var _1cc=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
var _1cd=64;
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 40;
}else{
if(this.captionSize.match(/\%/)){
return _1cc+_1cd;
}else{
return _1cc+4+parseInt(this.captionSize);
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.DataSetEditor"]){
dojo._hasResource["wm.base.widget.Editors.DataSetEditor"]=true;
dojo.provide("wm.base.widget.Editors.DataSetEditor");
dojo.declare("wm.DataSetEditor",wm.AbstractEditor,{_multiSelect:false,dataSet:null,options:"",displayType:"Text",dataField:"",displayField:"",displayExpression:"",startUpdate:false,_allFields:"All Fields",selectedItem:null,init:function(){
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
if(this._multiSelect){
this.selectedItem.setIsList(true);
}
},postInit:function(){
if(this.options){
this.setOptionsVariable();
}
if(!this.displayField){
this._setDisplayField();
if(!this.dataField&&this.dataSet&&this.dataSet.type&&wm.defaultTypes[this.dataSet.type]){
this.dataField="dataValue";
}
}
this.inherited(arguments);
if(this.startUpdate){
this.update();
}
},_setDisplayField:function(){
var _1ce=this.dataSet;
if(!_1ce&&this.formField){
var form=this.getParentForm();
if(form){
_1ce=form.dataSet;
}
if(_1ce){
var _1cf=_1ce._dataSchema;
var _1d0=_1cf[this.formField];
if(_1d0){
var type=_1d0.type;
var _1d1=wm.typeManager.getDisplayField(type);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_1ce&&_1ce.type){
var type=_1ce.type;
var _1d1=wm.typeManager.getDisplayField(type);
}
}
if(_1d1){
return this.setDisplayField(_1d1);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _1d2=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_1d2){
app.debugDialog.endLogEvent(_1d2);
}
return d;
}
},hasValues:function(){
return (this.options||this.dataSet&&!this.dataSet.isEmpty());
},isAllDataFields:function(){
return (this.dataField==this._allFields||this.dataField=="");
},setDefaultOnInsert:function(){
if(this.editor&&this.defaultInsert){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.setEditorValue(this.defaultInsert);
this.changed();
}
},setInitialValue:function(){
this.beginEditUpdate();
this.selectedItem.setType(this.dataSet instanceof wm.Variable?this.dataSet.type:"AnyData");
var _1d3=this.dataValue;
var _1d4=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_1d3,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_1d3);
}else{
this.setDisplayValue(_1d4);
}
this.endEditUpdate();
if(!this._cupdating){
var _1d4=this.getDisplayValue();
if(_1d4!=this.displayValue){
this.changed();
}
}
},formatData:function(_1d5){
try{
if(this._formatter){
return this._formatter.format(_1d5);
}else{
if(this.displayType){
var ctor=wm.getFormatter(this.displayType);
this._formatter=new ctor({name:"format",owner:this});
return this._formatter.format(_1d5);
}else{
return _1d5;
}
}
}
catch(e){
}
},isReady:function(){
return this.inherited(arguments)&&this.hasValues();
},editorChanged:function(){
if(this.dataSet&&this.dataSet.getCount()){
return this.inherited(arguments);
}
},isAllDataFields:function(){
return (this.dataField==this._allFields||this.dataField=="");
},setDataSet:function(_1d6){
this.dataSet=_1d6;
if(_1d6&&_1d6.type!=this.selectedItem.type){
this.selectedItem.setType(_1d6.type);
}
var _1d7=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_1d8){
this.displayField=_1d8;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_1d9){
this.displayExpression=_1d9;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_1da){
if(_1da=="All Fields"){
this.dataField="";
}else{
this.dataField=_1da;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var data=[];
if(!this.options){
return data;
}
var opts=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=opts.length,d;i<l;i++){
d=dojo.string.trim(String(opts[i]));
data[i]={name:d,dataValue:d};
}
return data;
},setOptionsVariable:function(){
var opts=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(opts);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_1db){
var _1dc=this._cupdating;
this._cupdating=true;
if(_1db){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_1db;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _1dd=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_1dd){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_1dc){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_1de){
var _1df;
if(wm.isInstanceType(_1de,wm.Variable)){
_1df=_1de;
}else{
_1df=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_1df.setType(this.dataSet.type);
}
_1df.setData(dojo.clone(_1de));
}
var de=this.displayExpression,v=_1df;
var _1e0=de?wm.expression.getValue(de,v,this.owner):_1df.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_1e0=this.formatData(_1e0);
}
return _1e0==null?"":String(_1e0);
},calcIsDirty:function(val1,val2){
var _1e1="";
var _1e2="";
if(this.dataField){
_1e1=dojo.isArray(val1)?val1.join(","):String(val1||"");
_1e2=dojo.isArray(val2)?val2.join(","):String(val2||"");
return _1e1!=_1e2;
}
if(val1 instanceof wm.Variable&&val1.isList||dojo.isArray(val1)){
var _1e3=val1 instanceof wm.Variable?val1.getCount():val1.length;
for(var i=0;i<_1e3;i++){
if(i){
_1e1+=",";
}
_1e1+=this._getDisplayData(val1 instanceof wm.Variable?val1.getItem(i):val1[i]);
}
}else{
if(val1!==null&&typeof val1=="object"){
_1e1=this._getDisplayData(val1);
}else{
if(val1==null){
_1e1="";
}else{
_1e1=val1;
}
}
}
if(val2 instanceof wm.Variable&&val2.isList||dojo.isArray(val2)){
var _1e3=val2 instanceof wm.Variable?val2.getCount():val2.length;
for(var i=0;i<_1e3;i++){
if(i){
_1e2+=",";
}
_1e2+=this._getDisplayData(val2 instanceof wm.Variable?val2.getItem(i):val2[i]);
}
}else{
if(val2!==null&&typeof val2=="object"){
_1e2=this._getDisplayData(val2);
}else{
if(val2==null){
_1e2="";
}else{
_1e2=val2;
}
}
}
return _1e1!=_1e2;
},setEditorValue:function(_1e4){
this._setEditorValue(_1e4,false);
this.updateReadonlyValue();
},setDisplayValue:function(_1e5){
this._setEditorValue(_1e5,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_1e6,_1e7){
var self=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_1e6;
return;
}
this.beginEditUpdate();
try{
var _1e8=this._lastValue;
var _1e9=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_1e9;
this._lastValue=_1e8;
if(_1e6 instanceof wm.Variable){
_1e6=_1e6.getData();
}
var _1ea;
if(!_1e7&&this.dataField){
_1ea=this.dataField;
}else{
if(!this.displayExpression){
_1ea=this.displayField;
}
}
if(_1ea||this.displayExpression){
if(!dojo.isArray(_1e6)){
_1e6=_1e6===undefined||_1e6===null?[]:[_1e6];
}
var _1eb;
_1eb=_1e6.length;
var _1ec=this.dataSet.getCount();
if(_1ec==0){
this.dataValue=this._multiSelect?_1e6:_1e6[0];
}else{
for(var i=0;i<_1eb;i++){
var _1ed=dojo.isArray(_1e6)?_1e6[i]:_1e6;
var _1ee;
if(_1ea&&_1ed!==null&&typeof _1ed=="object"){
_1ee=_1ed instanceof wm.Variable?_1ed.getValue(_1ea):_1ed[_1ea];
}else{
if(!_1ea&&_1ed!==null&&typeof _1ed=="object"){
_1ee=this._getDisplayData(_1ed);
}else{
_1ee=_1ed;
}
}
var _1ef=false;
for(var j=0;j<_1ec;j++){
var item=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _1f0=_1ea?item.getValue(_1ea):this._getDisplayData(item);
if(_1f0==_1ee){
_1ef=true;
this.selectItem(j);
break;
}
}
if(!_1ef){
this._onSetEditorValueFailed(_1e6);
}
}
}
}
}
catch(e){
console.error(e);
}
this.endEditUpdate();
this.changed();
if(this.isDataSetValueValid(this.dataValue)){
this._lastValue=dojo.clone(this.dataValue);
}else{
this.dataValue="";
}
},isDataSetValueValid:function(_1f1){
if(dojo.isArray(_1f1)){
for(var i=0;i<_1f1.length;i++){
if(_1f1[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_1f1 instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_1f2){
},getEditorValue:function(){
if(!this.selectedItem){
return null;
}
if(this._dataValueValid){
return this.dataValue;
}
if(!this.dataSet||this.dataSet.getCount()==0){
return this.dataValue;
}
var _1f3=[];
if(this.dataField){
var _1f4=this.selectedItem.getCount();
for(var i=0;i<_1f4;i++){
_1f3.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_1f3=this.selectedItem.getData();
if(!dojo.isArray(_1f3)){
_1f3=[_1f3];
}
}
if(!this._multiSelect&&_1f3){
var _1f3=_1f3[0];
return (_1f3||_1f3===0)?_1f3:this.makeEmptyValue();
}else{
return _1f3;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _1f5="";
var _1f6=this.selectedItem.getCount();
for(var i=0;i<_1f6;i++){
if(i){
_1f5+=", ";
}
_1f5+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _1f5;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_1f7){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _1f8=this.editor;
if(this.dijits){
var self=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_1f8);
},_createEditor:function(_1f9){
this.editor=_1f9;
this.readOnlyNode=_1f9;
this.editor.className="wmCheckboxSet";
var html="";
if(this.dataSet){
var _1fa=this.dataSet.getCount();
for(var i=0;i<_1fa;i++){
var item=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
html+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
html+="<label class='wmeditor-caption'>"+this._getDisplayData(item)+"</label></div>";
}else{
html+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(item)+"</label></div>";
}
}
this.editor.innerHTML=html;
this.dijits=dojo.parser.parse(this.editor);
if(wm.isMobile){
dojo.forEach(this.dijits,dojo.hitch(this,function(e,i){
var a=document.createElement("div");
a.className="wmcheckbox_x";
a.innerHTML="X";
a.id=this.getRuntimeId()+"_x_"+i;
e.domNode.appendChild(a);
}));
}
var self=this;
dojo.forEach(this.dijits,function(_1fb){
self.connect(_1fb,"onChange",self,"changed");
self.connect(_1fb,"onFocus",self,"_onEditorFocused");
self.connect(_1fb,"onBlur",self,"_onEditorBlurred");
_1fb.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_1fc){
var node=_1fc.touches?_1fc.touches[0].target:_1fc.target;
while(node&&node!=this.domNode&&!dojo.hasClass(node,"wmCheckboxSetItem")){
node=node.parentNode;
}
if(!node||node==this.domNode){
return;
}
return node;
},onTouchStart:function(_1fd){
this.inherited(arguments);
var node=this._touchCheckboxNode=this._getTouchNode(_1fd);
if(node&&dojo.hasClass(node,"wmCheckboxSetItem")){
dojo.addClass(node.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_1fe,_1ff,_200,_201,_202,_203,_204){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_200)>5||Math.abs(_203)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_205,_206){
this.inherited(arguments);
if(!_206&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _207=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_207!=-1){
this.dijits[_207].set("checked",!this.dijits[_207].get("checked"));
}
}
},_onEditorFocused:function(){
if(!this._focused){
this._focused=true;
this.focused();
}
},_onEditorBlurred:function(){
wm.job(this.getRuntimeId()+".Blurred",100,dojo.hitch(this,function(){
if(this._focused&&!dojo.isDescendant(document.activeElement,this.domNode)){
this._focused=false;
this.blurred();
}
}));
},changed:function(){
if(!this.dijits){
return;
}
var data=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
data.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(data);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_208){
var _209=this.readonly;
this.readonly=Boolean(_208);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _20a=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_20a){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_209){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_20b){
this.inherited(arguments);
var d=this._disabled;
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
e.set("disabled",this._disabled||this.readonly);
}
},deselectAll:function(){
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
this.dijits[i].set("checked",false,false);
this.dijits[i]._lastValueReported=false;
}
},selectItem:function(_20c){
if(!this.dijits){
return;
}
this.dijits[_20c].set("checked",true,false);
this.dijits[_20c]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_20d){
if(_20d&&_20d.readonly){
delete _20d.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_20e){
this.selectionMode=_20e;
if(this.grid){
this.grid.setSelectionMode(_20e);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_20f){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
}
delete this._typeWas;
},setDataSet:function(_210){
var _211;
if(this._typeWas){
_211=this._typeWas;
}else{
_211=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_210&&_210.type!=_211){
this.createEditor();
}
var _212=this.dataValue;
this.grid.setDataSet(_210);
this._inSetDataValue=true;
this.setEditorValue(_212);
delete this._inSetDataValue;
}
},changed:function(){
this.selectedItem.setDataSet(this.grid.selectedItem);
this.doOnchange();
},doOnchange:function(){
var e=this.editor;
if(!this._loading&&!this.isUpdating()&&!this.readonly&&e&&!this.isLoading()){
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
this.valueChanged("displayValue",this.displayValue);
this.valueChanged("dataValue",this.dataValue);
this.onchange(this.getDisplayValue(),this.getDataValue(),this._inSetDataValue);
}
},_onShowParent:function(){
if(this.grid){
this.grid.renderDojoObj();
}
},flow:function(){
if(this.editor){
this.editor.flow();
}
},setShowSearchBar:function(_213){
this.showSearchBar=Boolean(_213);
if(this.showSearchBar){
if(!this.searchBar){
this.createSearchBar();
this.editor.moveControl(this.searchBar,0);
}else{
this.searchBar.show();
}
}else{
if(this.searchBar){
this.searchBar.hide();
}
}
},createSearchBar:function(){
this.searchBar=new wm.Text({owner:this,parent:this.editor,width:"100%",caption:"",changeOnKey:true,emptyValue:"emptyString",name:"searchBar"});
if(!this._noFilter){
this.connect(this.searchBar,"onchange",this,"filterList");
}
},filterList:function(_214,_215){
var _216=this.grid.getRowCount();
var _217={};
if(_214){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_217[this.grid.columns[i].field]="*"+_214+"*";
}
this.grid.setQuery(_217);
},_createEditor:function(_218){
this.editor=new wm.Container({owner:this,parent:this,name:"ListSetContainer",width:"100%",height:"100%",layoutKind:"top-to-bottom",verticalAlign:"top",horizontalAlign:"left"});
if(this.showSearchBar){
this.createSearchBar();
}
wm.require("wm.List");
this.grid=new wm.List({owner:this,parent:this.editor,name:"grid",width:"100%",height:"100%",noHeader:true,margin:"0",padding:"0",border:"0",minWidth:10,deleteColumn:this.deleteColumn,deleteConfirm:this.deleteConfirm,selectionMode:this.selectionMode});
this.grid.connect(this.grid,"renderDojoObj",this,"renderGrid");
this.grid.connect(this.grid,"onRowDeleted",this,"onRowDeleted");
this.grid._isDesignLoaded=false;
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",formatFunc:this.displayType!="Text"?"wm_"+this.displayType.toLowerCase()+"_formatter":"",expression:this.displayExpression}]);
if(this.dataSet){
this.grid.setDataSet(this.dataSet);
}
return this.editor;
},setReadonly:function(_219){
},setDeleteColumn:function(_21a){
this.deleteColumn=_21a;
if(this.grid){
this.grid.setDeleteColumn(_21a);
}
},setDeleteConfirm:function(_21b){
this.deleteConfirm=_21b;
if(this.grid){
this.grid.deleteConfirm=_21b;
}
},renderGrid:function(){
if(this.grid.dojoObj){
this.grid.dojoObj.scroller.contentNodes[0].parentNode.style.overflowX="hidden";
}
},connectEditor:function(){
if(!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
this.selectedItem.$.binding.addWire("","dataSet",this.name+".editor.selectedItem");
this.connect(this.grid,"onSelectionChange",this,"changed");
},deselectAll:function(){
this.grid.deselectAll();
},selectItem:function(_21c){
this.grid.setSelectedRow(_21c);
},onRowDeleted:function(_21d,_21e){
}});
}
if(!dojo._hasResource["dojo.data.util.sorter"]){
dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.getObject("data.util.sorter",true,dojo);
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_21f,_220){
var _221=[];
function _222(attr,dir,comp,s){
return function(_223,_224){
var a=s.getValue(_223,attr);
var b=s.getValue(_224,attr);
return dir*comp(a,b);
};
};
var _225;
var map=_220.comparatorMap;
var bc=dojo.data.util.sorter.basicComparator;
for(var i=0;i<_21f.length;i++){
_225=_21f[i];
var attr=_225.attribute;
if(attr){
var dir=(_225.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_221.push(_222(attr,dir,comp,_220));
}
}
return function(rowA,rowB){
var i=0;
while(i<_221.length){
var ret=_221[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
}
if(!dojo._hasResource["dojo.data.util.simpleFetch"]){
dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.getObject("data.util.simpleFetch",true,dojo);
dojo.data.util.simpleFetch.fetch=function(_226){
_226=_226||{};
if(!_226.store){
_226.store=this;
}
var self=this;
var _227=function(_228,_229){
if(_229.onError){
var _22a=_229.scope||dojo.global;
_229.onError.call(_22a,_228,_229);
}
};
var _22b=function(_22c,_22d){
var _22e=_22d.abort||null;
var _22f=false;
var _230=_22d.start?_22d.start:0;
var _231=(_22d.count&&(_22d.count!==Infinity))?(_230+_22d.count):_22c.length;
_22d.abort=function(){
_22f=true;
if(_22e){
_22e.call(_22d);
}
};
var _232=_22d.scope||dojo.global;
if(!_22d.store){
_22d.store=self;
}
if(_22d.onBegin){
_22d.onBegin.call(_232,_22c.length,_22d);
}
if(_22d.sort){
_22c.sort(dojo.data.util.sorter.createSortFunction(_22d.sort,self));
}
if(_22d.onItem){
for(var i=_230;(i<_22c.length)&&(i<_231);++i){
var item=_22c[i];
if(!_22f){
_22d.onItem.call(_232,item,_22d);
}
}
}
if(_22d.onComplete&&!_22f){
var _233=null;
if(!_22d.onItem){
_233=_22c.slice(_230,_231);
}
_22d.onComplete.call(_232,_233,_22d);
}
};
this._fetchItems(_226,_22b,_227);
return _226;
};
}
if(!dojo._hasResource["wm.base.data.SimpleStore"]){
dojo._hasResource["wm.base.data.SimpleStore"]=true;
dojo.provide("wm.base.data.SimpleStore");
dojo.declare("wm.base.data.SimpleStore",null,{constructor:function(_234,_235){
this.data=_234||[];
this.identity=_235;
},getCount:function(){
return this.data.length;
},_fetchItemByIdentity:function(_236){
var id=this.identity;
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(d[id]===_236){
return d;
}
}
},_getQuery:function(_237){
var _238=_237.query;
if(dojo.isString(_238)){
var q=_238;
_238={};
_238[this.identity]=q;
}
return _238;
},_objectsMatch:function(inA,inB){
var ac=0,a=inA instanceof wm.Variable?inA.getData():inA,b=inB instanceof wm.Variable?inB.getData():inB;
for(var i in a){
if(dojo.isObject(a[i])){
continue;
}
ac++;
if(a[i]!=(b&&b[i])){
return;
}
}
var bc=0;
for(var i in b){
if(!dojo.isObject(b[i])){
bc++;
}
}
return ac==bc;
},_itemInQuery:function(_239,_23a,_23b,_23c){
var d=_239,w="*",a,b,_23d;
for(var i in _23a){
a=d[i];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
b=_23a[i];
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
}
if(b==w){
continue;
}
_23d=_23c||(typeof b=="string"&&b.indexOf(w)==-1);
if(dojo.isString(a)&&dojo.isString(b)&&!_23d){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
if(_23b){
a=a.toLowerCase();
b=b.toLowerCase();
}
if(a.indexOf(b)!=0){
return;
}
}else{
if(dojo.isObject(a)&&dojo.isObject(b)){
return this._objectsMatch(a,b);
}else{
if(a!==b){
return;
}
}
}
}
return true;
},_fetchItems:function(_23e,_23f,_240){
var _241=this._getQuery(_23e),opts=_23e.queryOptions,_242=opts&&opts.ignoreCase,_243=opts&&opts.exactMatch,_244=[];
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(this._itemInQuery(d,_241,_242,_243)){
_244.push(d);
if(_243){
break;
}
}
}
_23f(_244,_23e);
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("Invalid item:",item);
}
},getValue:function(item,_245,_246){
this._assertIsItem(item);
var v=item[_245];
return v!==undefined?v:_246;
},getValues:function(item,_247){
var d=this.getValue(item,_247);
return d?[d]:[];
},getAttributes:function(item){
this._assertIsItem(item);
var _248=[];
for(var i in item){
_248.push(i);
}
return _248;
},hasAttribute:function(item,_249){
this._assertIsItem(item);
for(var i in item){
if(_249==i){
return true;
}
}
return false;
},containsValue:function(item,_24a,_24b){
this._assertIsItem(item);
return (this.getValue(item,_24a)===_24b);
},isItem:function(_24c){
return _24c&&dojo.isObject(_24c);
},isItemLoaded:function(_24d){
return this.isItem(_24d);
},loadItem:function(_24e){
if(!this.isItemLoaded(_24e.item)){
throw new Error("Unimplemented API: dojo.data.api.Read.loadItem");
}
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},close:function(_24f){
},getLabel:function(item){
this._assertIsItem(item);
return (item||[]).toString();
},getLabelAttributes:function(item){
return this.getAttributes(item);
},getIdentity:function(item){
this._assertIsItem(item);
return item[this.identity]||null;
},getIdentityAttributes:function(item){
return this.identity;
},fetchItemByIdentity:function(_250){
var _251=_250.identity;
if(_251===undefined){
if(_250.onError){
_250.onError.call(_252,"No item found");
}
return;
}
var item=this._fetchItemByIdentity(_251),_252=_250.scope?_250.scope:dojo.global;
if(item){
if(_250.onItem){
_250.onItem.call(_252,item);
}
}else{
if(_250.onError){
_250.onError.call(_252,"No item found");
}
}
}});
dojo.extend(wm.base.data.SimpleStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dojo.data.util.filter"]){
dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.getObject("data.util.filter",true,dojo);
dojo.data.util.filter.patternToRegExp=function(_253,_254){
var rxp="^";
var c=null;
for(var i=0;i<_253.length;i++){
c=_253.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_253.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_254){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
}
if(!dojo._hasResource["dijit.form.ComboBox"]){
dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",dijit._HasDropDown,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,hasDownArrow:true,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t>\n\t\t\t    <!-- Copyright (C) 2012 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitComboBox",dropDownClass:"dijit.form._ComboBoxMenu",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_255){
var pos=0;
if(typeof (_255.selectionStart)=="number"){
pos=_255.selectionStart;
}else{
if(dojo.isIE){
var tr=dojo.doc.selection.createRange().duplicate();
var ntr=_255.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_256,_257){
_257=parseInt(_257);
dijit.selectInputText(_256,_257,_257);
},_setDisabledAttr:function(_258){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"disabled",_258);
},_abortQuery:function(){
if(this.searchTimer){
clearTimeout(this.searchTimer);
this.searchTimer=null;
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._fetchHandle.abort();
}
this._fetchHandle=null;
}
},_onInput:function(evt){
if(!this.searchTimer&&(evt.type=="paste"||evt.type=="input")&&this._lastInput!=this.textbox.value){
this.searchTimer=setTimeout(dojo.hitch(this,function(){
this._onKey({charOrCode:229});
}),100);
}
this.inherited(arguments);
},_onKey:function(evt){
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==dojo.keys.SHIFT){
return;
}
var _259=false;
var pw=this.dropDown;
var dk=dojo.keys;
var _25a=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_25a=pw.getHighlightedOption();
}
switch(key){
case dk.PAGE_DOWN:
case dk.DOWN_ARROW:
case dk.PAGE_UP:
case dk.UP_ARROW:
if(this._opened){
this._announceOption(_25a);
}
dojo.stopEvent(evt);
break;
case dk.ENTER:
if(_25a){
if(_25a==pw.nextButton){
this._nextSearch(1);
dojo.stopEvent(evt);
break;
}else{
if(_25a==pw.previousButton){
this._nextSearch(-1);
dojo.stopEvent(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
evt.preventDefault();
}
case dk.TAB:
var _25b=this.get("displayedValue");
if(pw&&(_25b==pw._messages["previousMessage"]||_25b==pw._messages["nextMessage"])){
break;
}
if(_25a){
this._selectOption();
}
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_25a){
dojo.stopEvent(evt);
this._selectOption();
this.closeDropDown();
}else{
_259=true;
}
break;
case dk.DELETE:
case dk.BACKSPACE:
this._prev_key_backspace=true;
_259=true;
break;
default:
_259=typeof key=="string"||key==229;
}
if(_259){
this.item=undefined;
this.searchTimer=setTimeout(dojo.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
dijit.selectInputText(fn,fn.value.length);
var _25c=this.ignoreCase?"toLowerCase":"substr";
if(text[_25c](0).indexOf(this.focusNode.value[_25c](0))==0){
var cpos=this._getCaretPos(fn);
if((cpos+1)>fn.value.length){
fn.value=text;
dijit.selectInputText(fn,cpos);
}
}else{
fn.value=text;
dijit.selectInputText(fn);
}
},_openResultList:function(_25d,_25e){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_25e.query[this.searchAttr]!=this._lastQuery)){
return;
}
var _25f=this.dropDown._highlighted_option&&dojo.hasClass(this.dropDown._highlighted_option,"dijitMenuItemSelected");
this.dropDown.clearResultList();
if(!_25d.length&&!this._maxOptions){
this.closeDropDown();
return;
}
_25e._maxOptions=this._maxOptions;
var _260=this.dropDown.createOptions(_25d,_25e,dojo.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_25e.direction){
if(1==_25e.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_25e.direction){
this.dropDown.highlightLastOption();
}
}
if(_25f){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_25e.query[this.searchAttr])){
this._announceOption(_260[1]);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.displayMessage("");
this.openDropDown();
dijit.setWaiState(this.domNode,"expanded","true");
},loadDropDown:function(_261){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"expanded","false");
dijit.removeWaiState(this.focusNode,"activedescendant");
}
},_setBlurValue:function(){
var _262=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_262==pw._messages["previousMessage"]||_262==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_262);
}else{
if(_262===""){
this.item=null;
this.set("displayedValue",_262);
}else{
if(this.value!=this._lastValueReported){
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
}
this._refreshState();
}
}
}
},_onBlur:function(){
this.closeDropDown();
this.inherited(arguments);
},_setItemAttr:function(item,_263,_264){
if(!_264){
_264=this.store.getValue(item,this.searchAttr);
}
var _265=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_264;
this._set("item",item);
dijit.form.ComboBox.superclass._setValueAttr.call(this,_265,_263,_264);
},_announceOption:function(node){
if(!node){
return;
}
var _266;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_266=node.innerHTML;
this.item=undefined;
this.value="";
}else{
_266=this.store.getValue(node.item,this.searchAttr).toString();
this.set("item",node.item,false,_266);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
dijit.setWaiState(this.focusNode,"activedescendant",dojo.attr(node,"id"));
this._autoCompleteText(_266);
},_selectOption:function(evt){
if(evt){
this._announceOption(evt.target);
}
this.closeDropDown();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return dojo.string.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _267=this.id+"_popup",_268=dojo.getObject(this.dropDownClass,false);
this.dropDown=new _268({onChange:dojo.hitch(this,this._selectOption),id:_267,dir:this.dir});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_267);
}
var _269=dojo.clone(this.query);
this._lastInput=key;
this._lastQuery=_269[this.searchAttr]=this._getQueryString(key);
this.searchTimer=setTimeout(dojo.hitch(this,function(_26a,_26b){
this.searchTimer=null;
var _26c={queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:_26a,onBegin:dojo.hitch(this,"_setMaxOptions"),onComplete:dojo.hitch(this,"_openResultList"),onError:function(_26d){
_26b._fetchHandle=null;
console.error("dijit.form.ComboBox: "+_26d);
_26b.closeDropDown();
},start:0,count:this.pageSize};
dojo.mixin(_26c,_26b.fetchProperties);
this._fetchHandle=_26b.store.fetch(_26c);
var _26e=function(_26f,_270){
_26f.start+=_26f.count*_270;
_26f.direction=_270;
this._fetchHandle=this.store.fetch(_26f);
this.focus();
};
this._nextSearch=this.dropDown.onPage=dojo.hitch(this,_26e,this._fetchHandle);
},_269,this),this.searchDelay);
},_setMaxOptions:function(size,_271){
this._maxOptions=size;
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _272=this.srcNodeRef;
this.store=new dijit.form._ComboBoxDataStore(_272);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _273=this._getValueField();
this.value=this.store.getValue(item,_273);
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _274=dojo.query("label[for=\""+this.id+"\"]");
if(_274.length){
_274[0].id=(this.id+"_label");
dijit.setWaiState(this.domNode,"labelledby",_274[0].id);
}
this.inherited(arguments);
},_setHasDownArrowAttr:function(val){
this.hasDownArrow=val;
this._buttonNode.style.display=val?"":"none";
},_getMenuLabelFromItem:function(item){
var _275=this.labelFunc(item,this.store),_276=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_275=this.doHighlight(_275,this._escapeHtml(this._lastInput));
_276="html";
}
return {html:_276=="html",label:_275};
},doHighlight:function(_277,find){
var _278=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=dojo.regexp.escapeString(find);
return this._escapeHtml(_277).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_278),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_279){
return _279.getValue(item,this.labelAttr||this.searchAttr).toString();
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:"<ul class='dijitReset dijitMenu' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' style='overflow: \"auto\"; overflow-x: \"hidden\";'>"+"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton' role='option'></li>"+"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton' role='option'></li>"+"</ul>",_messages:null,baseClass:"dijitComboBoxMenu",postMixInProperties:function(){
this.inherited(arguments);
this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_27a){
this.value=_27a;
this.onChange(_27a);
},onChange:function(_27b){
},onPage:function(_27c){
},onClose:function(){
this._blurOptionNode();
},_createOption:function(item,_27d){
var _27e=dojo.create("li",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
var _27f=_27d(item);
if(_27f.html){
_27e.innerHTML=_27f.label;
}else{
_27e.appendChild(dojo.doc.createTextNode(_27f.label));
}
if(_27e.innerHTML==""){
_27e.innerHTML="&nbsp;";
}
_27e.item=item;
return _27e;
},createOptions:function(_280,_281,_282){
this.previousButton.style.display=(_281.start==0)?"none":"";
dojo.attr(this.previousButton,"id",this.id+"_prev");
dojo.forEach(_280,function(item,i){
var _283=this._createOption(item,_282);
if(item.indent){
dojo.addClass(_283,"indentOption"+((item.indent===true)?"":item.indent));
}
dojo.attr(_283,"id",this.id+i);
this.domNode.insertBefore(_283,this.nextButton);
},this);
var _284=false;
if(_281._maxOptions&&_281._maxOptions!=-1){
if((_281.start+_281.count)<_281._maxOptions){
_284=true;
}else{
if((_281.start+_281.count)>_281._maxOptions&&_281.count==_280.length){
_284=true;
}
}
}else{
if(_281.count==_280.length){
_284=true;
}
}
this.nextButton.style.display=_284?"":"none";
dojo.attr(this.nextButton,"id",this.id+"_next");
return this.domNode.childNodes;
},clearResultList:function(){
while(this.domNode.childNodes.length>2){
this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2]);
}
this._blurOptionNode();
},_onMouseDown:function(evt){
dojo.stopEvent(evt);
},_onMouseUp:function(evt){
if(evt.target===this.domNode||!this._highlighted_option){
return;
}else{
if(evt.target==this.previousButton){
this._blurOptionNode();
this.onPage(-1);
}else{
if(evt.target==this.nextButton){
this._blurOptionNode();
this.onPage(1);
}else{
var tgt=evt.target;
while(!tgt.item){
tgt=tgt.parentNode;
}
this._setValueAttr({target:tgt},true);
}
}
}
},_onMouseOver:function(evt){
if(evt.target===this.domNode){
return;
}
var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){
while(!tgt.item){
tgt=tgt.parentNode;
}
}
this._focusOptionNode(tgt);
},_onMouseOut:function(evt){
if(evt.target===this.domNode){
return;
}
this._blurOptionNode();
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.addClass(this._highlighted_option,"dijitMenuItemSelected");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.removeClass(this._highlighted_option,"dijitMenuItemSelected");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
if(!this.getHighlightedOption()){
var fc=this.domNode.firstChild;
this._focusOptionNode(fc.style.display=="none"?fc.nextSibling:fc);
}else{
var ns=this._highlighted_option.nextSibling;
if(ns&&ns.style.display!="none"){
this._focusOptionNode(ns);
}else{
this.highlightFirstOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},highlightFirstOption:function(){
var _285=this.domNode.firstChild;
var _286=_285.nextSibling;
this._focusOptionNode(_286.style.display=="none"?_285:_286);
dojo.window.scrollIntoView(this._highlighted_option);
},highlightLastOption:function(){
this._focusOptionNode(this.domNode.lastChild.previousSibling);
dojo.window.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
if(!this.getHighlightedOption()){
var lc=this.domNode.lastChild;
this._focusOptionNode(lc.style.display=="none"?lc.previousSibling:lc);
}else{
var ps=this._highlighted_option.previousSibling;
if(ps&&ps.style.display!="none"){
this._focusOptionNode(ps);
}else{
this.highlightLastOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},_page:function(up){
var _287=0;
var _288=this.domNode.scrollTop;
var _289=dojo.style(this.domNode,"height");
if(!this.getHighlightedOption()){
this._highlightNextOption();
}
while(_287<_289){
if(up){
if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){
break;
}
this._highlightPrevOption();
}else{
if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){
break;
}
this._highlightNextOption();
}
var _28a=this.domNode.scrollTop;
_287+=(_28a-_288)*(up?-1:1);
_288=_28a;
}
},pageUp:function(){
this._page(true);
},pageDown:function(){
this._page(false);
},getHighlightedOption:function(){
var ho=this._highlighted_option;
return (ho&&ho.parentNode)?ho:null;
},handleKey:function(evt){
switch(evt.charOrCode){
case dojo.keys.DOWN_ARROW:
this._highlightNextOption();
return false;
case dojo.keys.PAGE_DOWN:
this.pageDown();
return false;
case dojo.keys.UP_ARROW:
this._highlightPrevOption();
return false;
case dojo.keys.PAGE_UP:
this.pageUp();
return false;
default:
return true;
}
}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{_setValueAttr:function(_28b,_28c,_28d){
this._set("item",null);
var self=this;
this.store.fetchItemByIdentity({identity:_28b,onItem:function(item){
self._set("item",item);
}});
if(!_28b){
_28b="";
}
dijit.form.ValidationTextBox.prototype._setValueAttr.call(this,_28b,_28c,_28d);
}});
dojo.declare("dijit.form._ComboBoxDataStore",null,{constructor:function(root){
this.root=root;
if(root.tagName!="SELECT"&&root.firstChild){
root=dojo.query("select",root);
if(root.length>0){
root=root[0];
}else{
this.root.innerHTML="<SELECT>"+this.root.innerHTML+"</SELECT>";
root=this.root.firstChild;
}
this.root=root;
}
dojo.query("> option",root).forEach(function(node){
node.innerHTML=dojo.trim(node.innerHTML);
});
},getValue:function(item,_28e,_28f){
return (_28e=="value")?item.value:(item.innerText||item.textContent||"");
},isItemLoaded:function(_290){
return true;
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},_fetchItems:function(args,_291,_292){
if(!args.query){
args.query={};
}
if(!args.query.name){
args.query.name="";
}
if(!args.queryOptions){
args.queryOptions={};
}
var _293=dojo.data.util.filter.patternToRegExp(args.query.name,args.queryOptions.ignoreCase),_294=dojo.query("> option",this.root).filter(function(_295){
return (_295.innerText||_295.textContent||"").match(_293);
});
if(args.sort){
_294.sort(dojo.data.util.sorter.createSortFunction(args.sort,this));
}
_291(_294,args);
},close:function(_296){
return;
},getLabel:function(item){
return item.innerHTML;
},getIdentity:function(item){
return dojo.attr(item,"value");
},fetchItemByIdentity:function(args){
var item=dojo.query("> option[value='"+args.identity+"']",this.root)[0];
args.onItem(item);
},fetchSelectedItem:function(){
var root=this.root,si=root.selectedIndex;
return typeof si=="number"?dojo.query("> option:nth-child("+(si!=-1?si+1:1)+")",root)[0]:null;
}});
dojo.extend(dijit.form._ComboBoxDataStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dijit.form.FilteringSelect"]){
dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_297,_298,_299){
if((_298&&_298.query[this.searchAttr]!=this._lastQuery)||(!_298&&_297.length&&this.store.getIdentity(_297[0])!=this._lastQuery)){
return;
}
if(!_297.length){
this.valueNode.value="";
dijit.form.TextBox.superclass._setValueAttr.call(this,"",_299||(_299===undefined&&!this._focused));
this._set("item",null);
this.validate(this._focused);
}else{
this.set("item",_297[0],_299);
}
},_openResultList:function(_29a,_29b){
if(_29b.query[this.searchAttr]!=this._lastQuery){
return;
}
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_29c,_29d){
if(!this._onChangeActive){
_29d=null;
}
this._lastQuery=_29c;
if(_29c===null||_29c===""){
this._setDisplayedValueAttr("",_29d);
return;
}
var self=this;
this.store.fetchItemByIdentity({identity:_29c,onItem:function(item){
self._callbackSetLabel(item?[item]:[],undefined,_29d);
}});
},_setItemAttr:function(item,_29e,_29f){
this.inherited(arguments);
this.valueNode.value=this.value;
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_2a0,_2a1){
if(_2a0==null){
_2a0="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_2a1=false;
}
if(this.store){
this.closeDropDown();
var _2a2=dojo.clone(this.query);
this._lastQuery=_2a2[this.searchAttr]=this._getDisplayQueryString(_2a0);
this.textbox.value=_2a0;
this._lastDisplayedValue=_2a0;
this._set("displayedValue",_2a0);
var _2a3=this;
var _2a4={query:_2a2,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:function(_2a5,_2a6){
_2a3._fetchHandle=null;
dojo.hitch(_2a3,"_callbackSetLabel")(_2a5,_2a6,_2a1);
},onError:function(_2a7){
_2a3._fetchHandle=null;
console.error("dijit.form.FilteringSelect: "+_2a7);
dojo.hitch(_2a3,"_callbackSetLabel")([],undefined,false);
}};
dojo.mixin(_2a4,this.fetchProperties);
this._fetchHandle=this.store.fetch(_2a4);
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Select"]){
dojo._hasResource["wm.base.widget.Editors.Select"]=true;
dojo.provide("wm.base.widget.Editors.Select");
dojo.declare("wm.SelectMenu",wm.DataSetEditor,{indentField:"",placeHolder:"",_storeNameField:"_selectMenuName",pageSize:20,allowNone:false,autoComplete:true,hasDownArrow:true,restrictValues:true,_selectedData:null,init:function(){
if(wm.isMobile){
this.manageHistory=true;
}
this.inherited(arguments);
},handleBack:function(_2a8){
this.editor.closeDropDown();
this.editor.dropDown.hide();
return true;
},generateStore:function(){
if(wm.isMobile){
return;
}
var data=[];
if(this.dataSet){
var _2a9=this.dataSet.getCount();
for(var i=0;i<_2a9;i++){
var item={id:i,name:this._getDisplayData(this.dataSet.getItem(i))};
if(this.indentField){
item.indent=Boolean(this.dataSet.getItem(i).getValue(this.indentField));
}
data.push(item);
}
}
if(this.allowNone){
data.unshift({id:-1,name:""});
}
return new wm.base.data.SimpleStore(data,"name",this);
},getEditorProps:function(_2aa,_2ab){
var _2ac=this.generateStore();
return dojo.mixin(this.inherited(arguments),{placeHolder:this.placeHolder,required:this.required,store:_2ac,autoComplete:this.autoComplete,hasDownArrow:this.hasDownArrow,searchAttr:"name",pageSize:this.pageSize?this.pageSize:Infinity},_2ab||{});
},_createEditor:function(_2ad,_2ae){
var e;
if(wm.isMobile){
e=new wm.dijit.form.ComboBox(this.getEditorProps(_2ad,_2ae));
e.owner=this;
dojo.attr(e.focusNode,"readonly",true);
}else{
if(this.restrictValues){
e=new dijit.form.FilteringSelect(this.getEditorProps(_2ad,_2ae));
}else{
e=new dijit.form.ComboBox(this.getEditorProps(_2ad,_2ae));
}
}
return e;
},showPopup:function(){
if(this.editor){
this.editor.openDropDown();
}
},setPlaceHolder:function(_2af){
this.placeHolder=_2af;
if(this.editor){
this.editor.attr("placeHolder",_2af);
}
},setRestrictValues:function(_2b0){
var _2b1=this.getEditorValue();
var _2b2=this.restrictValues;
this.restrictValues=_2b0;
if(this.editor&&_2b2!=_2b0){
this.createEditor();
this.setEditorValue(_2b1);
}
},_onSetEditorValueFailed:function(_2b3){
if(!this.restrictValues){
this.editor.set("displayedValue",_2b3);
}
},setDataSet:function(_2b4,_2b5){
this._inSetDataSet=true;
this.inherited(arguments);
if(this.editor){
this.editor.set("store",this.generateStore());
if(!_2b5){
this.setEditorValue(this.dataValue);
}
}
delete this._inSetDataSet;
},clear:function(){
if(this.editor){
var _2b6=this.editor.get("displayedValue");
if(this.restrictValues){
this.editor.set("value","",false);
}else{
this.editor.set("value",undefined,false);
}
this.editor.item=null;
this.selectedItem.clearData();
this._lastValue=this.makeEmptyValue();
if(!this._inSetDataSet){
this.displayValue="";
this.dataValue=null;
this.editor._lastValueReported="";
this.updateReadonlyValue();
this.resetState();
}
if(!this._cupdating&&_2b6&&this.hasValues()){
this.changed();
}
}else{
this.resetState();
}
},validationEnabled:function(){
return !this.restrictValues;
},_getValidatorNode:function(){
var _2b7=dojo.query(".dijitValidationContainer",this.editor.domNode)[0];
_2b7.firstChild.value="";
return _2b7;
},blurred:function(){
this.inherited(arguments);
var _2b8=this.displayValue;
if(this.getDisplayValue()!=_2b8){
this.doOnchange();
}
},getInvalid:function(){
if(!this.validationEnabled()){
if(this.required&&!this.getDataValue()){
return true;
}
return false;
}
var _2b9;
if(!this.editor||this.editor._focused){
_2b9=true;
}else{
var _2ba=this.getDataValue();
var _2bb=Boolean(_2ba);
var _2bc=this.getDisplayValue();
this._isValid=(!this.restrictValues||(_2bc&&_2bb||!_2bc));
if(this.readonly){
_2b9=true;
}else{
if(this.required){
if(!this.restrictValues&&!_2bc){
_2b9=false;
}else{
if(this.restrictValues&&!_2bb){
_2b9=false;
}else{
_2b9=true;
}
}
}else{
if(this.restrictValues&&_2bc&&!_2bb){
_2b9=false;
}else{
_2b9=true;
}
}
}
}
if(_2b9){
this.validatorNode.style.display="none";
}
return !_2b9;
},getSelectedIndex:function(){
return this.getItemIndex(this.selectedItem.getData());
},getItemIndex:function(item){
if(!item){
return -1;
}
var data=this.editor.store.data;
for(var i=0;i<data.length;i++){
if(item==data[i]||item[this.dataField]==data[i][this.dataField]){
return i;
}
}
return -1;
},getEditorValue:function(){
var _2bd=this.inherited(arguments);
if(!_2bd&&!this.restrictValues){
_2bd=this.editor.get("displayedValue");
}
return (_2bd||_2bd===0)?_2bd:this.makeEmptyValue();
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}
return null;
},blurred:function(){
this.changed();
this.doOnblur();
},changed:function(){
if(wm.isMobile&&this.editor&&this.editor.focusNode==document.activeElement){
this.editor.focusNode.blur();
return;
}
var item;
var _2be;
if(this.editor){
item=this.editor.get("item");
}
var _2bf=null;
if(this.editor){
var _2c0=this.editor.get("displayedValue");
}
if(item&&wm.isMobile){
this.selectedItem.setData(item);
}else{
if(item&&_2c0==item.name){
_2be=item.id;
var _2bf=this.dataSet?this.dataSet.getItem(_2be):null;
this.selectedItem.setData(_2bf);
}else{
this.selectedItem.setData(null);
}
}
if(this.editor&&this.editor._lastValueReported===""&&_2c0!==""){
this.editor._lastValueReported=_2c0;
}
return this.inherited(arguments);
},selectItem:function(_2c1){
if(!this.editor){
return;
}
var item=this.dataSet.getItem(_2c1);
this.selectedItem.setData(item);
this.editor.set("value",this._getDisplayData(item),false);
if(wm.isMobile){
this.editor.item=item.getData();
}
}});
dojo.declare("wm.Lookup",wm.SelectMenu,{datatype:"",dataField:"",autoDataSet:true,startUpdate:true,maxResults:500,ignoreCase:true,init:function(){
this.inherited(arguments);
if(this.autoDataSet&&this.formField){
this.createDataSet();
}else{
if(!this.autoDataSet){
this.startUpdate=false;
}
}
},createDataSet:function(){
wm.fire(this.$.liveVariable,"destroy");
var _2c2=this.getParentForm();
if(_2c2){
if(wm.isInstanceType(_2c2,wm.LiveForm)&&!_2c2.dataSet){
return;
}
if(wm.isInstanceType(_2c2,wm.DataForm)&&!_2c2.dataSet&&!_2c2.type){
return;
}
if(!wm.getFormLiveView||!wm.getFormField){
return;
}
var view=wm.getFormLiveView(_2c2);
var _2c3=wm.isInstanceType(_2c2,wm.DataForm)?_2c2.type:_2c2.dataSet&&_2c2.dataSet.type;
var ff=wm.getFormField(this);
try{
var _2c4;
if(this.dataType){
_2c4=this.dataType;
}else{
if(_2c2 instanceof wm.ServiceInputForm){
var _2c5=_2c2.dataOutput._dataSchema;
if(_2c5){
_2c4=_2c5[ff]?_2c5[ff].type:null;
}
}else{
if(_2c3&&_2c3!="any"){
_2c4=wm.typeManager.getType(_2c3).fields[ff].type;
}else{
_2c4="string";
}
}
}
}
catch(e){
}
if(view){
view.addRelated(ff);
}
var lv=this.dataSet=new wm.LiveVariable({name:"liveVariable",owner:this,autoUpdate:false,startUpdate:false,_rootField:view?ff:null,liveView:view,liveSource:view?undefined:_2c4,maxResults:this.maxResults,ignoreCase:this.ignoreCase,refireOnDbChange:true,orderBy:this.orderBy});
this.selectedItem.setType(this.dataSet.type);
this.createDataSetWire(lv);
}
},createDataSetWire:function(_2c6){
if(!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
var w=this._dataSetWire=new wm.Wire({name:"dataFieldWire",target:this,owner:this.$.binding,source:_2c6.getId(),targetProperty:"dataSet"});
w.connectWire();
},setAutoDataSet:function(_2c7){
this.autoDataSet=_2c7;
if(this.autoDataSet){
this.createDataSet();
if(this.dataSet){
var _2c8=this.debugAutoSetData();
this.update();
if(_2c8){
app.debugDialog.endLogEvent(_2c8);
}
}
}
},debugAutoSetData:function(){
if(app.debugDialog){
var _2c9=app.debugDialog.newLogEvent({eventType:"update",sourceDescription:"Initializing "+this.getRuntimeId(),resultDescription:this.getRuntimeId()+".setAutoDataSet() called to populate Lookup editor from server",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId(),method:"update"});
return _2c9;
}
},_getFormSource:function(_2ca){
if(this.isAncestorInstanceOf(wm.RelatedEditor)){
var w=wm.data.getPropWire(_2ca,"dataSet");
return w&&w.source&&this.getRoot().getValueById(w.source);
}else{
var lf=this.isAncestorInstanceOf(wm.LiveForm)||this.isAncestorInstanceOf(wm.DataForm);
if(lf&&this.formField){
return lf.dataSet.getValue(this.formField);
}
}
},changed:function(){
if(this.isUpdating()){
return;
}
this.inherited(arguments);
if(wm.getParentForm){
var f=wm.getParentForm(this);
}
if(this.relationshipName&&!this.selectedItem.isEmpty()){
var _2cb=this.getParentForm();
var _2cc=_2cb.getParentForm();
_2cc.dataOutput.setValue(this.relationshipName,this.selectedItem);
}
}});
if(wm.isMobile){
wm.Lookup.extend({_createEditor:function(){
var e=this.inherited(arguments);
this.connect(e,"openDropDown",this,"_onOpenDropDown");
return e;
},_onOpenDropDown:function(){
this.inherited(arguments);
}});
}
dojo.declare("wm.FilteringLookup",wm.Lookup,{startUpdate:false,restrictValues:true,changeOnKey:true,pageSize:25,autoComplete:true,hasDownArrow:false,placeHolder:"Start typing to find matches",filterField:"",prepare:function(){
this.inherited(arguments);
this.maxResults=this.pageSize;
this.filterField=this.displayField;
this.orderBy="asc: "+this.displayField;
if(!this.autoDataSet){
this.changeOnKey=true;
}
},_onchange:function(_2cd){
if(this.disabled||this.readonly||!this.isActive()){
return;
}
var _2ce=this.autoDataSet&&this.getParentForm();
var _2cf=_2cd||this.editor.get("displayedValue");
if(_2ce){
var _2d0=this.dataSet.filter.getValue(this.filterField);
}
if(!this.editor.get("item")){
this.dataValue="";
}
if(_2cf!=this._lastQueryValue){
this._lastQueryValue=_2cf;
if(_2ce){
this.dataSet.filter.setValue(this.filterField,_2cf);
if(_2cf===undefined||_2cf===null||_2cf===""){
this.dataSet.setData([]);
}else{
this.dataSet.update();
}
}else{
this.displayValue=_2cf;
this.valueChanged("displayValue",_2cf);
this.dataSet.update();
}
}
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}else{
return this.inherited(arguments);
}
},setDataValue:function(_2d1){
if(this.dataSet&&_2d1){
this.dataSet.setData(_2d1?[_2d1]:null);
}
this.inherited(arguments);
},setPageSize:function(_2d2){
this.maxResults=this.pageSize=_2d2;
},isActive:function(){
return this.editor._focused||this.editor.dropDown&&this.editor.dropDown.domNode.parentNode&&this.editor.dropDown.domNode.parentNode.style.display!="none";
}});
if(!wm.isMobile){
wm.FilteringLookup.extend({getEditorProps:function(_2d3,_2d4){
var p=this.inherited(arguments);
p.queryExpr="*";
return p;
},setDataSet:function(_2d5){
this.inherited(arguments,[_2d5,true]);
if(this.dataSet&&!this.dataSet.isEmpty()&&this.isActive()){
wm.job(this.getRuntimeId()+".handleSetDataSet",1,dojo.hitch(this,function(){
if(this.editor.declaredClass!="wm.dijit.form.ComboBox"){
var item=this.editor.get("item");
if(item){
if(item[this._storeNameField]!=this.editor.get("displayedValue")){
item=null;
}
}
if(!item&&this.editor.get("displayedValue")){
this.editor._startSearchFromInput();
}
this._onchange();
}
}));
}
},doOnchange:function(){
this._onchange();
if(this.editor.get("item")){
this.inherited(arguments);
}
},_end:0});
}else{
wm.FilteringLookup.extend({getEditorProps:function(_2d6,_2d7){
var p=this.inherited(arguments);
p.noFilter=true;
delete p.placeHolder;
return p;
},setDataSet:function(_2d8){
this.inherited(arguments,[_2d8,true]);
if(this.dataSet){
if(this.editor&&this.editor.dropDown){
this.editor.listSet.setDataSet(this.dataSet);
}
}
},_onOpenDropDown:function(){
var l=this.editor.listSet;
l.searchBar.setPlaceHolder(this.placeHolder);
if(this._searchBarChangeConnect){
dojo.disconnect(this._searchBarChangeConnect);
wm.Array.removeElement(this._connections,this._searchBarChangeConnect);
}
this._searchBarChangeConnect=l.searchBar.connect(l.searchBar,"onchange",this,function(_2d9,_2da){
this._onchange(_2d9);
});
},_end:0});
}
dojo.declare("wm.dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit._HasDropDown],{baseClass:"dijitTextBox dijitComboBox",popupClass:"wm.ListSet",forceWidth:false,autoWidth:false,value:"",noFilter:false,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t>\n\t\t\t    <!-- Copyright (C) 2012 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),hasDownArrow:true,openOnClick:true,buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this.domNode;
},createDropDown:function(){
this.dropDown=new wm.Dialog({owner:this.owner,corner:wm.device=="phone"?"cc":"cc",fixPositionNode:wm.device=="tablet"?this.focusNode:undefined,width:wm.device=="phone"?"100%":"350px",height:wm.device=="phone"?"100%":"600px",border:"1",borderColor:"#666",useContainerWidget:true,padding:"0",margin:"10",title:"",destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
this.dropDown.dialogScrim.connect(this.dropDown.dialogScrim.domNode,wm.isFakeMobile?"onclick":"ontouchstart",this.dropDown,"hide");
var c=this.dropDown.containerWidget;
c.setPadding("0");
c.setMargin("0");
this.listSet=wm.ListSet({owner:this.dropDown,parent:c,_noFilter:this.noFilter,selectionMode:"radio",captionAlign:"left",captionPosition:"top",caption:"",border:"0",editorBorder:false,padding:"0",width:"100%",height:"100%",onchange:dojo.hitch(this,function(_2db,_2dc,_2dd){
if(this._cupdating||_2dd){
return;
}
var data=this.listSet.grid.selectedItem.getData();
if(data){
var _2de=this.owner._getDisplayData(data);
this.set("value",_2de);
data.name=this.listSet.grid.getCell(this.listSet.grid.getSelectedIndex(),"name");
this.set("item",data);
this.displayedValue=_2de;
this.owner.changed();
this.closeDropDown();
this.dropDown.hide();
}
})});
this.listSet.grid.setSelectionMode("radio");
this.closeButton=new wm.ToolButton({owner:this.owner,name:"closeButton",border:"1",borderColor:"#222",_classes:{domNode:["SelectCloseButton"]},width:"30px",height:"100%",margin:"4",padding:"0 4 0 4",parent:this.dropDown.titleBar,caption:"X",onclick:dojo.hitch(this,function(){
this.closeDropDown();
this.dropDown.hide();
})});
},openDropDown:function(_2df){
app.addHistory({id:this.owner.getRuntimeId(),options:{},title:"Hide Popup"});
if(!this.dropDown){
this.createDropDown();
}
this.listSet.setShowing(false);
this._cupdating=true;
this.dropDown.setTitle(this.owner.caption);
this.listSet.setDataSet(null);
this.dropDown.setShowing(true);
if(this.owner.displayExpression){
this.listSet.setDisplayField("");
this.listSet.setDisplayExpression(this.owner.displayExpression);
}else{
this.listSet.setDisplayExpression("");
this.listSet.setDisplayField(this.owner.displayField);
}
if(this.owner.allowNone){
if(!this.owner._dataSet){
this.owner._dataSet=new wm.Variable();
}
this.owner._dataSet.setDataSet(this.owner.dataSet);
var _2e0={};
for(var _2e1 in this.owner._dataSet._dataSchema){
_2e0[_2e1]="";
}
this.owner._dataSet.addItem(_2e0,0);
this.listSet.setDataSet(this.owner._dataSet);
}else{
this.listSet.setDataSet(this.owner.dataSet);
}
wm.onidle(this,function(){
this.listSet.setShowing(true);
this.listSet.grid._render();
this._cupdating=true;
this.listSet.grid._cupdating=true;
this.listSet.setDataValue(this.owner.dataValue);
this.listSet.grid._cupdating=false;
this._cupdating=false;
});
this._opened=true;
return true;
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_editors",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
