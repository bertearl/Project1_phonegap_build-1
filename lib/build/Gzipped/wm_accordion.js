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

dojo.provide("wm.compressed.wm_accordion");
if(!dojo._hasResource["wm.base.widget.Layers.AccordionDecorator"]){
dojo._hasResource["wm.base.widget.Layers.AccordionDecorator"]=true;
dojo.provide("wm.base.widget.Layers.AccordionDecorator");
dojo.declare("wm.AccordionDecorator",wm.LayersDecorator,{decorationClass:"wmaccordion",captionBorder:0,captionBorderColor:"",decorateLayer:function(_1,_2){
this.inherited(arguments);
this.createHeader(_1,_2);
},createHeader:function(_3,_4){
var _5=_3.parent.captionHeight;
var p=this.decoree.client;
var h=_3.header=new wm.Label({caption:_3.caption,width:"100%",margin:"0,0,2,0",height:_5+"px",padding:"4,4,0,4",_classes:{domNode:["wmaccordion-header"]},showing:_3.showing,parent:p,owner:p,border:this.decoree.captionBorder!==undefined?this.decoree.captionBorder:this.captionBorder,borderColor:this.decoree.captionBorderColor!==undefined?this.decoree.captionBorderColor:this.captionBorderColor,onclick:dojo.hitch(this,"headerClicked",_3)});
h.domNode.appendChild(dojo.create("span",{innerHTML:"",className:"accordionArrowNode"}));
p.moveControl(h,_4*2);
dojo.addClass(_3.domNode,"wmaccordion-content");
},headerClicked:function(_6,e){
var d=this.decoree;
if(d.isDesignLoaded()){
dojo.stopEvent(e);
}
d.setProp(_6.active&&(d.multiActive||d._allowClickClose)?"layerInactive":"layer",_6);
_6.focusFirstEditor();
},getNewLayerIndex:function(_7){
for(var i=0,_8=this.decoree.layers,l;(l=_8[i]);i++){
if(l!=_7&&l.active){
return i;
}
}
},deactivateLayer:function(_9){
var _a=this.getNewLayerIndex(_9);
if(_a!=undefined||_9.parent.multiActive||_9.parent._allowClickClose){
this.setLayerActive(_9,false);
var d=this.decoree;
d.layerIndex=_a;
d.reflow();
}
},activateLayer:function(_b){
var d=this.decoree;
if(d.multiActive&&!d._loading){
this.setLayerActive(_b,true);
d.reflow();
}else{
this.inherited(arguments);
}
},undecorateLayer:function(_c,_d){
_c.header.destroy();
dojo.removeClass(_c.domNode,"wmaccordion-content");
},setLayerShowing:function(_e,_f){
_e.header.setShowing(_f);
this.inherited(arguments);
_e.domNode.style.display=_e.active&&_e.showing?"":"none";
},setLayerActive:function(_10,_11){
dojo[_11?"removeClass":"addClass"](_10.header.domNode,"wmaccordion-collapsed");
this.inherited(arguments);
},applyLayerCaption:function(_12){
_12.header.setCaption(_12.caption);
},moveLayerIndex:function(_13,_14){
var d=this.decoree,_15=d.client,l=d.getLayer(_13);
_15.removeControl(l);
_15.removeControl(l.header);
_15.insertControl(l.header,_13*2);
_15.insertControl(l,_13*2+1);
}});
}
if(!dojo._hasResource["wm.base.widget.AccordionLayers"]){
dojo._hasResource["wm.base.widget.AccordionLayers"]=true;
dojo.provide("wm.base.widget.AccordionLayers");
dojo.declare("wm.AccordionLayers",wm.Layers,{multiActive:false,themeStyleType:"ContentPanel",layersType:"Accordion",captionHeight:26,dndTargetName:"",setCaptionHeight:function(_16){
this.captionHeight=_16;
for(var i=0;i<this.layers.length;i++){
this.layers[i].header.setHeight(_16+"px");
}
},setBorderColor:function(_17){
this.inherited(arguments);
for(var i=0;i<this.layers.length;i++){
this.layers[i].setBorderColor(this.borderColor);
}
}});
}
