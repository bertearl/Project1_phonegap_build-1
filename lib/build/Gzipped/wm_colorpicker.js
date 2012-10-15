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

dojo.provide("wm.compressed.wm_colorpicker");
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
var _1=this.dropDown,_2=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_2){
if(dojo.hasClass(t,"dijitPopup")){
_2=true;
}else{
t=t.parentNode;
}
}
if(_2){
t=e.target;
if(_1.onItemClick){
var _3;
while(t&&!(_3=dijit.byNode(t))){
t=t.parentNode;
}
if(_3&&_3.onClick&&_3.getParent){
_3.getParent().onItemClick(_3,e);
}
}
return;
}
}
}
if(this._opened&&_1.focus&&_1.autoFocus!==false){
window.setTimeout(dojo.hitch(_1,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _4={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_4+"ArrowButton");
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
var d=this.dropDown,_5=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_5.tagName||"").toLowerCase()!=="input"||(_5.type&&_5.type.toLowerCase()!=="text"))))){
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
var _6=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_6);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_7){
_7();
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
var _8=this.dropDown,_9=_8.domNode,_a=this._aroundNode||this.domNode,_b=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_9.style.width){
this._explicitDDWidth=true;
}
if(_9.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _c={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_c.width="";
}
if(!this._explicitDDHeight){
_c.height="";
}
dojo.style(_9,_c);
var _d=this.maxHeight;
if(_d==-1){
var _e=dojo.window.getBox(),_f=dojo.position(_a,false);
_d=Math.floor(Math.max(_f.y,_e.h-(_f.y+_f.h)));
}
if(_8.startup&&!_8._started){
_8.startup();
}
dijit.popup.moveOffScreen(_8);
var mb=dojo._getMarginSize(_9);
var _10=(_d&&mb.h>_d);
dojo.style(_9,{overflowX:"hidden",overflowY:_10?"auto":"hidden"});
if(_10){
mb.h=_d;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_a.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_a.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_8.resize)){
_8.resize(mb);
}else{
dojo.marginBox(_9,mb);
}
}
var _11=dijit.popup.open({parent:this,popup:_8,around:_a,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_b.closeDropDown(true);
},onCancel:function(){
_b.closeDropDown(true);
},onClose:function(){
dojo.attr(_b._popupStateNode,"popupActive",false);
dojo.removeClass(_b._popupStateNode,"dijitHasDropDownOpen");
_b._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_b._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _11;
},closeDropDown:function(_12){
if(this._opened){
if(_12){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_13,_14){
return new dojo.dnd.move.constrainedMoveable(_14,_13);
},constructor:function(_15,_16){
if(!_16){
_16={};
}
this.constraints=_16.constraints;
this.within=_16.within;
},onFirstMove:function(_17){
var c=this.constraintBox=this.constraints.call(this,_17);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_17.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_18,_19){
var c=this.constraintBox,s=_18.node.style;
this.onMoving(_18,_19);
_19.l=_19.l<c.l?c.l:c.r<_19.l?c.r:_19.l;
_19.t=_19.t<c.t?c.t:c.b<_19.t?c.b:_19.t;
s.left=_19.l+"px";
s.top=_19.t+"px";
this.onMoved(_18,_19);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_1a,_1b){
return new dojo.dnd.move.boxConstrainedMoveable(_1b,_1a);
},constructor:function(_1c,_1d){
var box=_1d&&_1d.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_1e,_1f){
return new dojo.dnd.move.parentConstrainedMoveable(_1f,_1e);
},constructor:function(_20,_21){
var _22=_21&&_21.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_22=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_22=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_22=="padding"){
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
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(_23){
var _24=this;
dojo.mixin(_24,_23);
_24.node=_23.node;
_24._showArgs=dojo.mixin({},_23);
_24._showArgs.node=_24.node;
_24._showArgs.duration=_24.showDuration;
_24.showAnim=_24.showFunc(_24._showArgs);
_24._hideArgs=dojo.mixin({},_23);
_24._hideArgs.node=_24.node;
_24._hideArgs.duration=_24.hideDuration;
_24.hideAnim=_24.hideFunc(_24._hideArgs);
dojo.connect(_24.showAnim,"beforeBegin",dojo.hitch(_24.hideAnim,"stop",true));
dojo.connect(_24.hideAnim,"beforeBegin",dojo.hitch(_24.showAnim,"stop",true));
},show:function(_25){
return this.showAnim.play(_25||0);
},hide:function(_26){
return this.hideAnim.play(_26||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_27={_fire:function(evt,_28){
if(this[evt]){
this[evt].apply(this,_28||[]);
}
return this;
}};
var _29=function(_2a){
this._index=-1;
this._animations=_2a||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_29,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_2b,_2c){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_2c&&this._current.status()=="playing"){
return this;
}
var _2d=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_2e=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_2f=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_2d);
d.disconnect(_2e);
d.disconnect(_2f);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_30,_31){
this.pause();
var _32=this.duration*_30;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_32){
this._current=a;
return true;
}
_32-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_32/this._current.duration,_31);
}
return this;
},stop:function(_33){
if(this._current){
if(_33){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_29,_27);
dojo.fx.chain=function(_34){
return new _29(_34);
};
var _35=function(_36){
this._animations=_36||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_36,function(a){
var _37=a.duration;
if(a.delay){
_37+=a.delay;
}
if(this.duration<_37){
this.duration=_37;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var _38=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_38._connects.push(d.connect(_38._pseudoAnimation,evt,function(){
_38._fire(evt,arguments);
}));
});
};
d.extend(_35,{_doAction:function(_39,_3a){
d.forEach(this._animations,function(a){
a[_39].apply(a,_3a);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_3b,_3c){
var t=this._pseudoAnimation;
t[_3b].apply(t,_3c);
},play:function(_3d,_3e){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_3f,_40){
var ms=this.duration*_3f;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_40);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_41){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_35,_27);
dojo.fx.combine=function(_42){
return new _35(_42);
};
dojo.fx.wipeIn=function(_43){
var _44=_43.node=d.byId(_43.node),s=_44.style,o;
var _45=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _46=d.style(_44,"height");
return Math.max(_46,1);
}
},end:function(){
return _44.scrollHeight;
}}}},_43));
d.connect(_45,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _45;
};
dojo.fx.wipeOut=function(_47){
var _48=_47.node=d.byId(_47.node),s=_48.style,o;
var _49=d.animateProperty(d.mixin({properties:{height:{end:1}}},_47));
d.connect(_49,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_49,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _49;
};
dojo.fx.slideTo=function(_4a){
var _4b=_4a.node=d.byId(_4a.node),top=null,_4c=null;
var _4d=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_4c=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
_4c=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_4c+"px";
}
};
})(_4b);
_4d();
var _4e=d.animateProperty(d.mixin({properties:{top:_4a.top||0,left:_4a.left||0}},_4a));
d.connect(_4e,"beforeBegin",_4e,_4d);
return _4e;
};
})();
}
if(!dojo._hasResource["dojo.colors"]){
dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
dojo.getObject("colors",true,dojo);
(function(){
var _4f=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=function(_50,obj){
var m=_50.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=dojo.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
return dojo.colorFromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_4f(m1,m2,H+1/3)*256,_4f(m1,m2,H)*256,_4f(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
}
return null;
};
var _51=function(c,low,_52){
c=Number(c);
return isNaN(c)?_52:c<low?low:c>_52?_52:c;
};
dojo.Color.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_51(t.r,0,255));
t.g=Math.round(_51(t.g,0,255));
t.b=Math.round(_51(t.b,0,255));
t.a=_51(t.a,0,1);
return this;
};
})();
dojo.colors.makeGrey=function(g,a){
return dojo.colorFromArray([g,g,g,a]);
};
dojo.mixin(dojo.Color.named,{aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]});
}
if(!dojo._hasResource["dojox.color._base"]){
dojo._hasResource["dojox.color._base"]=true;
dojo.provide("dojox.color._base");
dojox.color.Color=dojo.Color;
dojox.color.blend=dojo.blendColors;
dojox.color.fromRgb=dojo.colorFromRgb;
dojox.color.fromHex=dojo.colorFromHex;
dojox.color.fromArray=dojo.colorFromArray;
dojox.color.fromString=dojo.colorFromString;
dojox.color.greyscale=dojo.colors.makeGrey;
dojo.mixin(dojox.color,{fromCmy:function(_53,_54,_55){
if(dojo.isArray(_53)){
_54=_53[1],_55=_53[2],_53=_53[0];
}else{
if(dojo.isObject(_53)){
_54=_53.m,_55=_53.y,_53=_53.c;
}
}
_53/=100,_54/=100,_55/=100;
var r=1-_53,g=1-_54,b=1-_55;
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromCmyk:function(_56,_57,_58,_59){
if(dojo.isArray(_56)){
_57=_56[1],_58=_56[2],_59=_56[3],_56=_56[0];
}else{
if(dojo.isObject(_56)){
_57=_56.m,_58=_56.y,_59=_56.b,_56=_56.c;
}
}
_56/=100,_57/=100,_58/=100,_59/=100;
var r,g,b;
r=1-Math.min(1,_56*(1-_59)+_59);
g=1-Math.min(1,_57*(1-_59)+_59);
b=1-Math.min(1,_58*(1-_59)+_59);
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsl:function(hue,_5a,_5b){
if(dojo.isArray(hue)){
_5a=hue[1],_5b=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_5a=hue.s,_5b=hue.l,hue=hue.h;
}
}
_5a/=100;
_5b/=100;
while(hue<0){
hue+=360;
}
while(hue>=360){
hue-=360;
}
var r,g,b;
if(hue<120){
r=(120-hue)/60,g=hue/60,b=0;
}else{
if(hue<240){
r=0,g=(240-hue)/60,b=(hue-120)/60;
}else{
r=(hue-240)/60,g=0,b=(360-hue)/60;
}
}
r=2*_5a*Math.min(r,1)+(1-_5a);
g=2*_5a*Math.min(g,1)+(1-_5a);
b=2*_5a*Math.min(b,1)+(1-_5a);
if(_5b<0.5){
r*=_5b,g*=_5b,b*=_5b;
}else{
r=(1-_5b)*r+2*_5b-1;
g=(1-_5b)*g+2*_5b-1;
b=(1-_5b)*b+2*_5b-1;
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsv:function(hue,_5c,_5d){
if(dojo.isArray(hue)){
_5c=hue[1],_5d=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_5c=hue.s,_5d=hue.v,hue=hue.h;
}
}
if(hue==360){
hue=0;
}
_5c/=100;
_5d/=100;
var r,g,b;
if(_5c==0){
r=_5d,b=_5d,g=_5d;
}else{
var _5e=hue/60,i=Math.floor(_5e),f=_5e-i;
var p=_5d*(1-_5c);
var q=_5d*(1-(_5c*f));
var t=_5d*(1-(_5c*(1-f)));
switch(i){
case 0:
r=_5d,g=t,b=p;
break;
case 1:
r=q,g=_5d,b=p;
break;
case 2:
r=p,g=_5d,b=t;
break;
case 3:
r=p,g=q,b=_5d;
break;
case 4:
r=t,g=p,b=_5d;
break;
case 5:
r=_5d,g=p,b=q;
break;
}
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
}});
dojo.extend(dojox.color.Color,{toCmy:function(){
var _5f=1-(this.r/255),_60=1-(this.g/255),_61=1-(this.b/255);
return {c:Math.round(_5f*100),m:Math.round(_60*100),y:Math.round(_61*100)};
},toCmyk:function(){
var _62,_63,_64,_65;
var r=this.r/255,g=this.g/255,b=this.b/255;
_65=Math.min(1-r,1-g,1-b);
_62=(1-r-_65)/(1-_65);
_63=(1-g-_65)/(1-_65);
_64=(1-b-_65)/(1-_65);
return {c:Math.round(_62*100),m:Math.round(_63*100),y:Math.round(_64*100),b:Math.round(_65*100)};
},toHsl:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _66=max-min;
var h=0,s=0,l=(min+max)/2;
if(l>0&&l<1){
s=_66/((l<0.5)?(2*l):(2-2*l));
}
if(_66>0){
if(max==r&&max!=g){
h+=(g-b)/_66;
}
if(max==g&&max!=b){
h+=(2+(b-r)/_66);
}
if(max==b&&max!=r){
h+=(4+(r-g)/_66);
}
h*=60;
}
return {h:h,s:Math.round(s*100),l:Math.round(l*100)};
},toHsv:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _67=max-min;
var h=null,s=(max==0)?0:(_67/max);
if(s==0){
h=0;
}else{
if(r==max){
h=60*(g-b)/_67;
}else{
if(g==max){
h=120+60*(b-r)/_67;
}else{
h=240+60*(r-g)/_67;
}
}
if(h<0){
h+=360;
}
}
return {h:h,s:Math.round(s*100),v:Math.round(max*100)};
}});
}
if(!dojo._hasResource["dojox.color"]){
dojo._hasResource["dojox.color"]=true;
dojo.provide("dojox.color");
}
if(!dojo._hasResource["dojox.widget.ColorPicker"]){
dojo._hasResource["dojox.widget.ColorPicker"]=true;
dojo.provide("dojox.widget.ColorPicker");
dojo.experimental("dojox.widget.ColorPicker");
(function(d){
var _68=function(hex){
return hex;
};
dojo.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,liveUpdate:false,PICKER_HUE_H:150,PICKER_SAT_VAL_H:150,PICKER_SAT_VAL_W:150,PICKER_HUE_SELECTOR_H:8,PICKER_SAT_SELECTOR_H:10,PICKER_SAT_SELECTOR_W:10,value:"#ffffff",_underlay:d.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),_hueUnderlay:d.moduleUrl("dojox.widget","ColorPicker/images/hue.png"),_pickerPointer:d.moduleUrl("dojox.widget","ColorPicker/images/pickerPointer.png"),_huePickerPointer:d.moduleUrl("dojox.widget","ColorPicker/images/hueHandle.png"),_huePickerPointerAlly:d.moduleUrl("dojox.widget","ColorPicker/images/hueHandleA11y.png"),templateString:dojo.cache("dojox.widget","ColorPicker/ColorPicker.html","<table class=\"dojoxColorPicker\" dojoAttachEvent=\"onkeypress: _handleKey\" cellpadding=\"0\" cellspacing=\"0\">\n\t<tr>\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t<div class=\"dojoxColorPickerBox\">\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\n\t\t\t\t<img role=\"status\" title=\"${saturationPickerTitle}\" alt=\"${saturationPickerTitle}\" class=\"dojoxColorPickerPoint\" src=\"${_pickerPointer}\" tabIndex=\"0\" dojoAttachPoint=\"cursorNode\" style=\"position: absolute; top: 0px; left: 0px;\">\n\t\t\t\t<img role=\"presentation\" alt=\"\" dojoAttachPoint=\"colorUnderlay\" dojoAttachEvent=\"onclick: _setPoint, onmousedown: _stopDrag\" class=\"dojoxColorPickerUnderlay\" src=\"${_underlay}\" ondragstart=\"return false\">\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t<div class=\"dojoxHuePicker\">\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\n\t\t\t\t<img role=\"status\" dojoAttachPoint=\"hueCursorNode\" tabIndex=\"0\" class=\"dojoxHuePickerPoint\" title=\"${huePickerTitle}\" alt=\"${huePickerTitle}\" src=\"${_huePickerPointer}\" style=\"position: absolute; top: 0px; left: 0px;\">\n\t\t\t\t<div class=\"dojoxHuePickerUnderlay\" dojoAttachPoint=\"hueNode\">\n\t\t\t\t    <img role=\"presentation\" alt=\"\" dojoAttachEvent=\"onclick: _setHuePoint, onmousedown: _stopDrag\" src=\"${_hueUnderlay}\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign=\"top\">\n\t\t\t<table cellpadding=\"0\" cellspacing=\"0\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerPreviewContainer\">\n\t\t\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"previewNode\" class=\"dojoxColorPickerPreview\"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td valign=\"top\">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"safePreviewNode\" class=\"dojoxColorPickerWebSafePreview\"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign=\"bottom\">\n\t\t\t\t\t\t<table class=\"dojoxColorPickerOptional\" cellpadding=\"0\" cellspacing=\"0\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerRgb\" dojoAttachPoint=\"rgbNode\">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_r\">${redLabel}</label></td><td><input id=\"${_uId}_r\" dojoAttachPoint=\"Rval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_g\">${greenLabel}</label></td><td><input id=\"${_uId}_g\" dojoAttachPoint=\"Gval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_b\">${blueLabel}</label></td><td><input id=\"${_uId}_b\" dojoAttachPoint=\"Bval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!--  Copyright (C) 2011 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \n\t\t\t\t\t\t\t WaveMaker: Added ok/cancel buttons-->\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t  <button class=\"wmbutton StudioButton OKButton\">OK</button>\n\t\t\t\t\t\t\t\t  <button class=\"wmbutton StudioButton CancelButton\">Cancel</button>\n\t\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<!--  Copyright (C) 2011 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \n\t\t\t\t\t\t\t WaveMaker: set display:none because it was not laid out to our satisfaction -->\n\t\t\t\t\t\t\t\t<td style=\"display:none\">\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerHsv\" dojoAttachPoint=\"hsvNode\">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_h\">${hueLabel}</label></td><td><input id=\"${_uId}_h\" dojoAttachPoint=\"Hval\"size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${degLabel}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_s\">${saturationLabel}</label></td><td><input id=\"${_uId}_s\" dojoAttachPoint=\"Sval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_v\">${valueLabel}</label></td><td><input id=\"${_uId}_v\" dojoAttachPoint=\"Vval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!--  Copyright (C) 2011 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \n\t\t\t\t\t\t\t WaveMaker: set display:none because it was not laid out to our satisfaction -->\n\t\t\t\t\t\t\t<tr style=\"display:none\">\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t\t\t\t\t<div class=\"dojoxColorPickerHex\" dojoAttachPoint=\"hexNode\" aria-live=\"polite\">\t\n\t\t\t\t\t\t\t\t\t\t<label for=\"${_uId}_hex\">&nbsp;${hexLabel}&nbsp;</label><input id=\"${_uId}_hex\" dojoAttachPoint=\"hexCode, focusNode, valueNode\" size=\"6\" class=\"dojoxColorPickerHexCode\" dojoAttachEvent=\"onchange: _colorInputChange\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</td>\n\t</tr>\n</table>\n\n"),postMixInProperties:function(){
if(dojo.hasClass(dojo.body(),"dijit_a11y")){
this._huePickerPointer=this._huePickerPointerAlly;
}
this._uId=dijit.getUniqueId(this.id);
dojo.mixin(this,dojo.i18n.getLocalization("dojox.widget","ColorPicker"));
dojo.mixin(this,dojo.i18n.getLocalization("dojo.cldr","number"));
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(d.isIE<7){
this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=this._blankGif.toString();
}
if(!this.showRgb){
this.rgbNode.style.visibility="hidden";
}
if(!this.showHsv){
this.hsvNode.style.visibility="hidden";
}
if(!this.showHex){
this.hexNode.style.visibility="hidden";
}
if(!this.webSafe){
this.safePreviewNode.style.visibility="hidden";
}
},startup:function(){
if(this._started){
return;
}
this._started=true;
this.set("value",this.value);
this._subs=[];
this._keyListeners=[];
this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.LEFT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.RIGHT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
},_setValueAttr:function(_69){
if(!this._started){
return;
}
this.setColor(_69,true);
},setColor:function(_6a,_6b){
var col=dojox.color.fromString(_6a);
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,_6b);
},_setTimer:function(_6c){
dijit.focus(_6c.node);
d.setSelectable(this.domNode,false);
this._timer=setInterval(d.hitch(this,"_updateColor"),45);
},_clearTimer:function(_6d){
clearInterval(this._timer);
this._timer=null;
this.onChange(this.value);
d.setSelectable(this.domNode,true);
},_setHue:function(h){
d.style(this.colorUnderlay,"backgroundColor",dojox.color.fromHsv(h,100,100).toHex());
},_updateHueCursorNode:function(_6e,_6f,e){
if(_6e!==-1){
var y=dojo.style(this.hueCursorNode,"top");
var _70=(this.PICKER_HUE_SELECTOR_H/2);
y+=_70;
var _71=false;
if(e.charOrCode==dojo.keys.UP_ARROW){
if(y>0){
y-=1;
_71=true;
}
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW){
if(y<this.PICKER_HUE_H){
y+=1;
_71=true;
}
}
}
y-=_70;
if(_71){
dojo.style(this.hueCursorNode,"top",y+"px");
}
}else{
this._updateColor(true);
}
},_updateCursorNode:function(_72,_73,e){
var _74=this.PICKER_SAT_SELECTOR_H/2;
var _75=this.PICKER_SAT_SELECTOR_W/2;
if(_72!==-1){
var y=dojo.style(this.cursorNode,"top");
var x=dojo.style(this.cursorNode,"left");
y+=_74;
x+=_75;
var _76=false;
if(e.charOrCode==dojo.keys.UP_ARROW){
if(y>0){
y-=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW){
if(y<this.PICKER_SAT_VAL_H){
y+=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.LEFT_ARROW){
if(x>0){
x-=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.RIGHT_ARROW){
if(x<this.PICKER_SAT_VAL_W){
x+=1;
_76=true;
}
}
}
}
}
if(_76){
y-=_74;
x-=_75;
dojo.style(this.cursorNode,"top",y+"px");
dojo.style(this.cursorNode,"left",x+"px");
}
}else{
this._updateColor(true);
}
},_updateColor:function(){
var _77=this.PICKER_HUE_SELECTOR_H/2,_78=this.PICKER_SAT_SELECTOR_H/2,_79=this.PICKER_SAT_SELECTOR_W/2;
var _7a=d.style(this.hueCursorNode,"top")+_77,_7b=d.style(this.cursorNode,"top")+_78,_7c=d.style(this.cursorNode,"left")+_79,h=Math.round(360-(_7a/this.PICKER_HUE_H*360)),col=dojox.color.fromHsv(h,_7c/this.PICKER_SAT_VAL_W*100,100-(_7b/this.PICKER_SAT_VAL_H*100));
this._updateColorInputs(col);
this._updateValue(col,true);
if(h!=this._hue){
this._setHue(h);
}
},_colorInputChange:function(e){
var col,_7d=false;
switch(e.target){
case this.hexCode:
col=dojox.color.fromString(e.target.value);
_7d=true;
break;
case this.Rval:
case this.Gval:
case this.Bval:
col=dojox.color.fromArray([this.Rval.value,this.Gval.value,this.Bval.value]);
_7d=true;
break;
case this.Hval:
case this.Sval:
case this.Vval:
col=dojox.color.fromHsv(this.Hval.value,this.Sval.value,this.Vval.value);
_7d=true;
break;
}
if(_7d){
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,true);
}
},_updateValue:function(col,_7e){
var hex=col.toHex();
this.value=this.valueNode.value=hex;
if(_7e&&(!this._timer||this.liveUpdate)){
this.onChange(hex);
}
},_updatePickerLocations:function(col){
var _7f=this.PICKER_HUE_SELECTOR_H/2,_80=this.PICKER_SAT_SELECTOR_H/2,_81=this.PICKER_SAT_SELECTOR_W/2;
var hsv=col.toHsv(),_82=Math.round(this.PICKER_HUE_H-hsv.h/360*this.PICKER_HUE_H)-_7f,_83=Math.round(hsv.s/100*this.PICKER_SAT_VAL_W)-_81,_84=Math.round(this.PICKER_SAT_VAL_H-hsv.v/100*this.PICKER_SAT_VAL_H)-_80;
if(this.animatePoint){
d.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_82,left:0}).play();
d.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_84,left:_83}).play();
}else{
d.style(this.hueCursorNode,"top",_82+"px");
d.style(this.cursorNode,{left:_83+"px",top:_84+"px"});
}
if(hsv.h!=this._hue){
this._setHue(hsv.h);
}
},_updateColorInputs:function(col){
var hex=col.toHex();
if(this.showRgb){
this.Rval.value=col.r;
this.Gval.value=col.g;
this.Bval.value=col.b;
}
if(this.showHsv){
var hsv=col.toHsv();
this.Hval.value=Math.round((hsv.h));
this.Sval.value=Math.round(hsv.s);
this.Vval.value=Math.round(hsv.v);
}
if(this.showHex){
this.hexCode.value=hex;
}
this.previewNode.style.backgroundColor=hex;
if(this.webSafe){
this.safePreviewNode.style.backgroundColor=_68(hex);
}
},_setHuePoint:function(evt){
var _85=(this.PICKER_HUE_SELECTOR_H/2);
var _86=dojo.coords(this.colorUnderlay);
var _87=evt.pageY-_86.y-2;
if(this.animatePoint){
d.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_87,left:0,onEnd:d.hitch(this,function(){
this._updateColor(true);
dijit.focus(this.hueCursorNode);
})}).play();
}else{
d.style(this.hueCursorNode,"top",_87+"px");
this._updateColor(false);
}
},_setPoint:function(evt){
var _88=this.PICKER_SAT_SELECTOR_H/2;
var _89=this.PICKER_SAT_SELECTOR_W/2;
var _8a=dojo.coords(this.colorUnderlay);
var _8b=evt.pageY-_8a.y;
var _8c=evt.pageX-_8a.x;
if(evt){
dijit.focus(evt.target);
}
if(this.animatePoint){
d.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_8b,left:_8c,onEnd:d.hitch(this,function(){
this._updateColor(true);
dijit.focus(this.cursorNode);
})}).play();
}else{
d.style(this.cursorNode,{left:_8c+"px",top:_8b+"px"});
this._updateColor(false);
}
},_handleKey:function(e){
},focus:function(){
if(!this._focused){
dijit.focus(this.focusNode);
}
},_stopDrag:function(e){
dojo.stopEvent(e);
},destroy:function(){
this.inherited(arguments);
dojo.forEach(this._subs,function(sub){
dojo.unsubscribe(sub);
});
delete this._subs;
}});
})(dojo);
}
if(!dojo._hasResource["wm.base.widget.Editors.ColorPicker"]){
dojo._hasResource["wm.base.widget.Editors.ColorPicker"]=true;
dojo.provide("wm.base.widget.Editors.ColorPicker");
dojo.declare("wm.ColorPicker",wm.Text,{changeOnKey:true,className:"wmeditor wmcolorpickereditor",_editorBackgroundColor:true,defaultColor:"",colorPickerDialog:null,cancelValue:null,_empty:true,regExp:"#[0-9a-fA-F]{6}|{.*}",showMessages:false,gradient:false,_createEditor:function(_8d,_8e){
return new wm.dijit.form.ColorPicker(this.getEditorProps(_8d,_8e));
},setInitialValue:function(){
this.inherited(arguments);
this.updateEditorColors(this.dataValue);
},getDataValue:function(){
if(!this.gradient){
return this.inherited(arguments)||this.defaultColor;
}else{
return this.inherited(arguments);
}
},getEditorValue:function(){
var _8f=this.inherited(arguments);
if(this.gradient&&_8f){
_8f=(dojo.fromJson(_8f));
}
return _8f;
},setEditorValue:function(_90){
if(this.gradient&&_90&&typeof _90=="object"){
_90=dojo.toJson(_90);
}
this.inherited(arguments);
},onClose:function(){
},onchange:function(_91){
this.updateEditorColors(_91);
},updateEditorColors:function(_92){
if(this._inColorChange){
return;
}
this._inColorChange=true;
if(!this.gradient){
if(_92){
this.editorNode.style.backgroundColor=_92;
var v1,v2,v3;
if(_92.length>5){
v1=parseInt(_92.substr(1,2),16);
v2=parseInt(_92.substr(3,2),16);
v3=parseInt(_92.substr(5,2),16);
}else{
v1=parseInt(_92.substr(1,1),16);
v2=parseInt(_92.substr(2,1),16);
v3=parseInt(_92.substr(3,1),16);
}
this.editorNode.style.color=(v1+v2<100||v1+v3<100||v2+v3<100||v1+v2+v3<250)&&(v1+v2+v3<250)?"white":"black";
}else{
this.editorNode.style.backgroundColor="";
this.editorNode.style.color="";
}
}else{
if(typeof _92=="string"&&_92.length){
_92=dojo.fromJson(_92);
}
var _93=_92?wm.getBackgroundStyle(_92.startColor,_92.endColor,_92.colorStop,_92.direction,""):"";
if(dojo.isIE<10){
this.editorNode.style.filter=_93;
}else{
this.editorNode.style.background=_93;
}
}
wm.job(this.getRuntimeId()+".ClearInColorChange",10,this,function(){
this._inColorChange=false;
});
}});
dojo.declare("wm.dijit.form.ColorPicker",[dijit.form.ValidationTextBox,dijit._HasDropDown],{baseClass:"dijitTextBox dijitComboBox",popupClass:"wm.ListSet",forceWidth:false,autoWidth:false,value:"",noFilter:false,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t>\n\t\t\t    <!-- Copyright (C) 2012 VMware, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),hasDownArrow:true,openOnClick:true,buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this.domNode;
},createDropDown:function(){
if(this.owner.gradient){
this.dropDown=new wm.GradientPickerPanel({owner:this.owner,dataValue:this.dataValue||{direction:"vertical",startColor:"#0101b7",endColor:"#011d65",colorStop:"20"},destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
}else{
this.dropDown=new wm.ColorPickerPanel({owner:this.owner,destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
}
if(wm.isMobile){
this.dropDown.dialogScrim.connect(this.dropDown.dialogScrim.domNode,wm.isFakeMobile?"onclick":"ontouchstart",this.dropDown,"hide");
}
this.dropDown.connect(this.dropDown,"onChange",this,function(_94){
if(this.dropDown.showing){
if(!this.owner.gradient){
this.set("value",_94);
}else{
this.set("value",dojo.toJson(_94));
}
}
this.onChange(_94);
});
},openDropDown:function(_95){
if(!this.dropDown){
this.createDropDown();
}
if(this.owner.dataValue){
this.dropDown.reset();
}
this.dropDown.setShowing(true);
return dijit._HasDropDown.prototype.openDropDown.call(this,_95);
},closeDropDown:function(){
var _96=this._opened;
this.inherited(arguments);
if(_96){
wm.onidle(this,function(){
if(!this._opened){
this.owner.onClose();
}
});
}
}});
dojo.declare("wm.ColorPickerPanel",wm.Container,{colorPicker:null,colorPickerSet:false,border:"0",borderColor:"#888888",width:"325px",height:"185px",modal:false,colorPickerControl:null,init:function(){
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(!wm.ColorPickerPanel.cssLoaded){
var _97=document.createElement("link");
_97.rel="stylesheet";
_97.type="text/css";
_97.href=dojo.moduleUrl("dojox.widget.ColorPicker").uri+"ColorPicker.css";
document.getElementsByTagName("head")[0].appendChild(_97);
wm.ColorPickerPanel.cssLoaded=true;
}
this.colorPickerControl=new wm.Control({name:"colorPickerControl",width:"325px",height:"170px",owner:this,parent:this});
this.colorPicker=new dojox.widget.ColorPicker({animatePoint:true,showHsv:false,showRtb:true,webSave:false,onChange:dojo.hitch(this,"valueChange")},this.colorPickerControl.domNode);
wm.onidle(this,function(){
this.colorPicker.startup();
this.connect(dojo.query(".OKButton",this.domNode)[0],"onclick",this,"onOKClick");
this.connect(dojo.query(".CancelButton",this.domNode)[0],"onclick",this,"onCancelClick");
});
this.colorPicker.PICKER_SAT_VAL_H=152;
this.colorPicker.PICKER_SAT_VAL_W=152;
this.colorPicker.PICKER_HUE_H=150;
},onCancelClick:function(){
this.owner.setDataValue(this._initialValue);
this.owner.editor.closeDropDown();
},onOKClick:function(){
this.owner.editor.closeDropDown();
},reset:function(){
if(this.getValue()!=this.owner.getDataValue()){
this.setDijitValue(this.owner.getDataValue());
}
this._initialValue=this.getValue();
},getValue:function(){
if(this.colorPicker){
return this.colorPicker.getValue();
}else{
return this._tmpValue;
}
},setDijitValue:function(_98){
if(this.colorPicker){
if(_98){
this.colorPicker.setColor(_98);
}
}else{
this._tmpValue=_98;
}
if(this.text&&_98!=this.text.getDataValue()){
this.text.setDataValue(_98);
}
},valueChange:function(_99){
this._changed=true;
this.onChange(_99);
},onExecute:function(){
},onChange:function(_9a){
},destroy:function(){
if(this.colorPicker){
this.colorPicker.destroyRecursive();
}
this.inherited(arguments);
}});
dojo.declare("wm.GradientPickerPanel",wm.Container,{border:"0",borderColor:"#888888",width:"500px",height:"200px",backgroundColor:"white",layoutKind:"top-to-bottom",verticalAlign:"top",horizontalAlign:"left",postInit:function(){
this.inherited(arguments);
var _9b=new wm.Panel({owner:this,parent:this,verticalAlign:"top",horizontalAlign:"left",width:"100%",height:"30px",layoutKind:"left-to-right"});
this.startColor=new wm.ColorPicker({name:"startColor",owner:this,parent:_9b,width:"100%",dataValue:this.dataValue.startColor});
this.endColor=new wm.ColorPicker({name:"endColor",owner:this,parent:_9b,width:"100%",dataValue:this.dataValue.endColor});
this.direction=new wm.SelectMenu({name:"direction",owner:this,parent:_9b,width:"100%",options:"vertical, horizontal",dataValue:this.dataValue.direction});
this.bottomPanel=new wm.Panel({owner:this,parent:this,verticalAlign:"top",horizontalAlign:"left",width:"100%",height:"100%",layoutKind:"left-to-right"});
this.colorStop=new wm.Slider({name:"colorStop",owner:this,parent:this.bottomPanel,width:"30px",height:"100%",captionPosition:"left",caption:"",verticalSlider:true,dataValue:this.dataValue.direction=="horizontal"?this.dataValue.colorStop:100-this.dataValue.colorStop});
this.connect(this.startColor,"onchange",this,"_onChange");
this.connect(this.endColor,"onchange",this,"_onChange");
this.connect(this.direction,"onchange",this,"_onDirectionChange");
this.connect(this.colorStop,"onchange",this,"_onChange");
this.html=new wm.Html({name:"html",owner:this,parent:this.bottomPanel,width:"100%",height:"100%",border:"1",borderColor:"black"});
this.buttonPanel=new wm.Panel({_classes:{domNode:["dialogfooter"]},owner:this,parent:this,verticalAlign:"top",horizontalAlign:"right",width:"100%",height:"30px",layoutKind:"left-to-right"});
this.okButton=new wm.Button({_classes:{domNode:["StudioButton","OKButton"]},owner:this,parent:this.buttonPanel,caption:"OK",width:"80px",onclick:dojo.hitch(this,"onOKClick")});
this.cancelButton=new wm.Button({_classes:{domNode:["StudioButton","CancelButton"]},owner:this,parent:this.buttonPanel,caption:"Cancel",width:"80px",onclick:dojo.hitch(this,"onCancelClick")});
wm.onidle(this,function(){
this.reflow();
this._cupdating=true;
this._onChange();
this._cupdating=false;
});
},onOKClick:function(){
this.owner.editor.closeDropDown();
},onCancelClick:function(){
this.owner.setEditorValue(this._initialValue);
this.owner.editor.closeDropDown();
},reset:function(){
this._cupdating=true;
this.startColor.setDataValue(this.owner.dataValue?this.owner.dataValue.startColor:"");
this.endColor.setDataValue(this.owner.dataValue?this.owner.dataValue.endColor:"");
this.direction.setDataValue(this.owner.dataValue?this.owner.dataValue.direction:"");
this.colorStop.setDataValue(this.owner.dataValue?(this.direction.getDataValue()=="vertical"?100-this.owner.dataValue.colorStop:this.owner.dataValue.colorStop):"");
this._initialValue=dojo.clone(this.owner.dataValue);
this._cupdating=false;
},onExecute:function(){
},_onDirectionChange:function(){
var _9c=this.direction.getDataValue();
if(_9c=="vertical"){
if(this.bottomPanel.layoutKind=="top-to-bottom"){
this.bottomPanel.setLayoutKind("left-to-right");
this.colorStop.setVerticalSlider(true);
this.colorStop.setHeight("100%");
this.colorStop.setWidth("30px");
this.colorStop.setDataValue(90);
}
}else{
if(this.bottomPanel.layoutKind=="left-to-right"){
this.bottomPanel.setLayoutKind("top-to-bottom");
this.colorStop.setVerticalSlider(false);
this.colorStop.setWidth("100%");
this.colorStop.setHeight("30px");
this.colorStop.setDataValue(10);
}
}
this._onChange();
},_onChange:function(){
var _9d=this.direction.getDataValue();
var _9e=_9d=="vertical"?100-this.colorStop.getDataValue():this.colorStop.getDataValue();
var _9f=this.startColor.getDataValue();
var _a0=this.endColor.getDataValue();
var _a1=wm.getBackgroundStyle(_9f,_a0,_9e,_9d,"");
if(dojo.isIE<10){
this.html.domNode.style.filter=_a1;
}else{
this.html.domNode.style.background=_a1;
}
if(!this._cupdating){
this.owner.setEditorValue({direction:_9d,startColor:_9f,endColor:_a0,colorStop:_9e});
}
},destroy:function(){
if(this.colorPicker){
this.colorPicker.destroyRecursive();
}
this.inherited(arguments);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_colorpicker",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
