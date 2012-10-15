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

dojo.provide("wm.compressed.wm_list");
if(!dojo._hasResource["wm.base.widget.VirtualList"]){
dojo._hasResource["wm.base.widget.VirtualList"]=true;
dojo.provide("wm.base.widget.VirtualList");
dojo.declare("wm.VirtualListItem",wm.TouchMixin,{selected:false,className:"wmlist-item",getRuntimeId:function(){
return this.list.getRuntimeId()+"."+this.index;
},constructor:function(_1,_2,_3,_4){
this.list=_1;
this.index=this.list._formatIndex;
this._connections=[];
this._subscriptions=[];
this._debugSubscriptions=[];
if(_4){
this.domNode=_4;
}else{
this.create();
}
this.setContent(_2,_3);
},subscribe:function(){
wm.Component.prototype.subscribe.apply(this,arguments);
},connect:function(){
wm.Component.prototype.connect.apply(this,arguments);
},disconnectEvent:function(){
wm.Component.prototype.disconnectEvent.apply(this,arguments);
},destroy:function(){
dojo.forEach(this._connections,function(_5){
dojo.disconnect(_5);
});
dojo.forEach(this._subscriptions,function(_6){
dojo.unsubscribe(_6);
});
},create:function(){
var n=this.domNode=document.createElement("div");
dojo.addClass(n,this.className);
this.makeConnections();
},makeConnections:function(){
if(!wm.isMobile){
this.connect(this.domNode,"mouseover",this,"mouseover"),this.connect(this.domNode,"mouseout",this,"mouseout");
this.connect(this.domNode,"click",this,function(_7){
wm.onidle(this,"click",{target:_7.target});
});
this.connect(this.domNode,"dblclick",this,function(_8){
wm.onidle(this,"dblclick",{target:_8.target});
});
}else{
this.addTouchListener();
}
},onTouchStart:function(_9){
if(!this.list._disabled&&!this.selected&&this.list._selectionMode!="none"||this.list._selectionMode=="multiple"){
if(this.selected){
this._deselectionIndicatorOnly=true;
this.deselect(true);
}else{
this._selectionIndicatorOnly=true;
this.select(true);
}
this.list._touchedItem=this;
}
this.list._ontouchstart(_9);
},onTouchMove:function(_a,_b,_c,_d){
if(this.list._touchedItem==this){
delete this.list._touchedItem;
if(this._selectionIndicatorOnly){
delete this._selectionIndicatorOnly;
this.deselect();
}else{
if(this._deselectionIndicatorOnly){
delete this._deselectionIndicatorOnly;
this.select();
}
}
}
this.list._ontouchmove(_a,_b,_c,_d);
},onTouchEnd:function(_e,_f){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
if(this.list._touchedItem==this){
this.list._touchedItem=null;
if(!_e){
_e={target:this.domNode};
}
this.click(_e);
}
this.list._ontouchend(_e);
},onLongTouch:function(_10,_11){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
this.list._touchedItem=null;
this.longClick();
},setContent:function(_12){
this.domNode.innerHTML=_12;
},getContent:function(){
return this.domNode.innerHTML;
},doOver:function(){
dojo.addClass(this.domNode,this.className+"-over");
},mouseover:function(e){
if(e&&e.currentTarget==this.domNode){
this.list._onmouseover(e,this);
}
},mouseout:function(e){
if(e.currentTarget==this.domNode){
dojo.removeClass(this.domNode,this.className+"-over");
}
},click:function(e){
this.list.onclick(e,this);
},longClick:function(){
this.list.onLongClick(this);
},dblclick:function(e){
this.list.ondblclick(e,this);
},select:function(_13){
if(!_13){
this.selected=true;
}
dojo.addClass(this.domNode,this.className+"-selected");
},deselect:function(_14){
if(!_14){
this.selected=false;
}
dojo.removeClass(this.domNode,this.className+"-selected");
}});
dojo.declare("wm.VirtualList",wm.Control,{manageHistory:true,headerVisible:true,toggleSelect:false,width:"250px",height:"150px",box:"v",selectionMode:"single",_selectionMode:"single",className:"wmlist",selectedItem:null,init:function(){
this.inherited(arguments);
this.items=[];
this.selection=[];
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this,isList:this._selectionMode=="multiple"});
this.createHeaderNode();
this.createListNode();
this.domNode.appendChild(this.headerNode);
this.domNode.appendChild(this.listNodeWrapper||this.listNode);
this.setHeaderVisible(this.headerVisible);
if(this.onselect){
this.connect(this,"onSelect",this,"onselect");
}
if(this.ondeselect){
this.connect(this,"onDeselect",this,"ondeselect");
}
},postSetupScroller:function(){
var _15=this._listTouchScroll.scroller?this._listTouchScroll.scroller.outer:null;
if(_15){
_15.style.width="100%";
}
},dataSetToSelectedItem:function(_16){
this.selectedItem.setLiveView((_16||0).liveView);
this.selectedItem.setType(_16?_16.type:"any");
},getCount:function(){
return this.items.length;
},getItem:function(_17){
return this.items[_17];
},getItemByCallback:function(_18){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(_18(d)){
return this.items[i];
}
}
},getItemByFieldName:function(_19,_1a){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(d[_19]==_1a){
return this.items[i];
}
}
},createListNode:function(){
if(wm.isMobile){
this.listNodeWrapper=document.createElement("div");
dojo.addClass(this.listNodeWrapper,"wmlist-wrapper");
}
this.listNode=document.createElement("div");
this.listNode.flex=1;
dojo.addClass(this.listNode,"wmlist-list");
if(wm.isMobile){
this.listNodeWrapper.appendChild(this.listNode);
}
},createHeaderNode:function(){
this.headerNode=document.createElement("div");
dojo.addClass(this.headerNode,"wmlist-header");
},renderBounds:function(){
var _1b=this.inherited(arguments);
if(_1b){
var _1c=this.isAncestorHidden();
if(this.headerVisible&&!_1c){
wm.job(this.getRuntimeId()+".postRenderBounds",1,dojo.hitch(this,"postRenderBounds"));
}
}
return _1b;
},postRenderBounds:function(){
if(!this.isAncestorHidden()){
var _1d=(this.noHeader||!this.headerVisible)?{h:0}:dojo.marginBox(this.headerNode);
var _1e=this.getContentBounds().h-_1d.h;
(this.listNodeWrapper||this.listNode).style.height=Math.max(0,_1e)+"px";
}
},clear:function(_1f){
this._setHeaderVisible(false);
while(this.getCount()){
this.removeItem(this.getCount()-1);
}
this.deselectAll(_1f);
this._clearSelectedData();
},createItem:function(_20){
return new wm.VirtualListItem(this,_20);
},addItem:function(_21,_22){
var _23=this.createItem(_21);
var _24=this.listNode;
dojo.setSelectable(_23.domNode,false);
if(_22!=undefined){
this.items.splice(_22,0,_23);
_23.index=_22;
this.selection.splice(_22,0,false);
this.updateItemIndexes(_22+1,1);
var _25=_24.childNodes[_22];
if(_25){
_24.insertBefore(_23.domNode,_24.childNodes[_22]);
}else{
_24.appendChild(_23.domNode);
}
}else{
this.items.push(_23);
_23.index=this.items.length-1;
_24.appendChild(_23.domNode);
}
return _23;
},removeItem:function(_26){
var li=this.getItem(_26);
if(li){
if(li.domNode&&li.domNode.parentNode){
this.listNode.removeChild(li.domNode);
}
this.items.splice(_26,1);
this.selection.splice(_26,1);
this.updateItemIndexes(_26,-1);
li.destroy();
}
},updateItemIndexes:function(_27,_28){
for(var i=_27,l=this.getCount(),li;i<l&&(li=this.items[i]);i++){
li.index+=_28;
}
},removeItems:function(_29){
for(var i=_29.length,_2a;((_2a=_29[i])!=undefined);i--){
this.removeItem(_2a);
}
},modifyItem:function(_2b,_2c){
var li=this.getItem(_2b);
(li?li.setContent(_2c):this.addItem(_2c));
},renderHeader:function(_2d){
this.headerNode.innerHTML=_2d;
},_setHeaderVisible:function(_2e){
this.headerNode.style.display=_2e?"":"none";
},setHeaderVisible:function(_2f){
this.headerVisible=_2f;
if(this.headerVisible){
this.renderHeader();
}
this._setHeaderVisible(this.headerVisible);
this.reflow();
},_addSelectedData:function(_30){
if(this._selectionMode=="multiple"){
if(!dojo.isArray(this.selected)){
this.selected=[];
}
if(_30&&dojo.indexOf(this.selected,_30.index)==-1){
this.selected.push(_30.index);
}
var _31=[];
dojo.forEach(this.selected,dojo.hitch(this,function(_32){
var v=this.getItemData(_32);
if(typeof v=="object"){
_31.push(v);
}else{
_31.push({dataValue:v});
}
}));
this.selectedItem.setData(_31);
this.setValue("emptySelection",this.selected.length==0);
this.setValue("isRowSelected",this.selected.length>0);
}else{
this.selected=_30;
var d=this.selected?this.selected.getData():{},s=this.selectedItem;
if(dojo.isObject(d)&&!wm.typeManager.getType(s.type)){
s.setDataSchema(d);
}
if(this.selected&&dojo.isObject(d)){
s.setData(d);
}else{
s.clearData();
}
this.setValue("emptySelection",Boolean(!this.selected));
this.setValue("isRowSelected",Boolean(this.selected));
}
},_removeSelectedData:function(_33){
if(this._selectionMode=="multiple"){
this.selected=wm.Array.removeElement(this.selected,_33.index);
}
this._addSelectedData(null);
},_clearSelectedData:function(){
this.selected=this._selectionMode=="multiple"?[]:null;
this.selectedItem.setData(null);
this.setValue("emptySelection",true);
this.setValue("isRowSelected",false);
},addToSelection:function(_34){
if(!_34){
return;
}
this.selection[_34.index]=true;
this.lastSelected=this.selected;
this._addSelectedData(_34);
_34.select();
},removeFromSelection:function(_35){
this.selection[_35.index]=false;
_35.deselect();
this._removeSelectedData(_35);
},deselectAll:function(_36){
dojo.forEach(this.items,function(i){
if(i){
i.deselect();
}
});
var _37=this.selection?this.selection.length:0;
this.selection=[];
this.selected=this._selectionMode=="multiple"?[]:null;
if(!_36&&_37){
this._clearSelectedData();
this.onSelectionChange();
}
},isSelected:function(_38){
return this.selection[_38.index];
},ctrlSelect:function(_39){
if(this.isSelected(_39)){
this.eventDeselect(_39);
}else{
this.eventSelect(_39);
}
},shiftSelect:function(_3a){
var t=s=(this.selected||this.lastSelected||0).index,e=_3a.index,t;
this.deselectAll();
if(s>e){
s=e;
e=t;
}
for(var i=s,li;i<=e&&(li=this.getItem(i));i++){
this.addToSelection(li);
}
},clickSelect:function(_3b,_3c){
if(this._selectionMode=="none"||this._disabled){
return;
}
var _3d=this.getSelectedIndex();
if(this._selectionMode=="multiple"&&(_3c.ctrlKey||_3c.shiftKey)){
if(_3c.ctrlKey){
this.ctrlSelect(_3b);
}else{
if(_3c.shiftKey){
this.shiftSelect(_3b);
}
}
}else{
if(this._selectionMode=="multiple"){
if(dojo.indexOf(this.selected,_3b.index)==-1){
this.eventSelect(_3b);
}else{
this.eventDeselect(_3b,false);
}
}else{
var s=this.selected,_3e=s&&s.index,_3f=_3b.index;
if(_3e!==_3f){
this.eventDeselect(_3b,true);
this.eventSelect(_3b);
}else{
if(this.toggleSelect){
this.eventDeselect(_3b);
}
}
}
}
if(!this._isDesignLoaded&&!this._handlingBack&&this.manageHistory&&!this.isNavigationMenu){
app.addHistory({id:this.getRuntimeId(),options:{selectedRow:_3d},title:"SelectionChange"});
}
},eventDeselect:function(_40,_41){
if(this._disabled){
return;
}
if(this._selectionMode=="multiple"){
this.removeFromSelection(_40);
}else{
this.deselectAll(_41);
}
if(!_41){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onDeselect(_40);
this.onSelectionChange();
}));
}
},eventSelect:function(_42){
if(this._disabled){
return;
}
var _43={canSelect:true};
this._oncanselect(_42,_43);
if(_43.canSelect){
this.addToSelection(_42);
if(!this._cupdating){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onSelect(_42);
this.onSelectionChange();
}));
}
}
},select:function(_44){
if(_44){
if(this._selectionMode!="multiple"){
this.deselectAll();
}
this.eventSelect(_44);
}
},selectByIndex:function(_45){
var i=this.getItem(_45);
if(i){
this.select(i);
}
},getSelectedIndex:function(){
if(this._selectionMode=="multiple"){
return this.selected;
}else{
return this.selected?this.selected.index:-1;
}
},handleBack:function(_46){
this._handlingBack=true;
try{
var _47=_46.selectedRow;
this.select(_47);
}
catch(e){
}
delete this._handlingBack;
return true;
},_oncanmouseover:function(_48,_49,_4a){
},onLongClick:function(_4b){
},onclick:function(_4c,_4d){
var _4e=_4c.target;
if(_4e.firstChild&&dojo.attr(_4e.firstChild,"wmcontroller")){
_4e=_4e.firstChild;
}
if(_4e&&dojo.attr(_4e,"wmcontroller")){
if(_4e.type=="checkbox"){
if(!_4d.selected){
this.eventSelect(_4d);
}else{
this.eventDeselect(_4d);
}
dojo.stopEvent(_4c);
}else{
if(_4e.type=="radio"){
var _4f=this.toggleSelect;
this.toggleSelect=false;
this.clickSelect(_4d,_4c);
this.toggleSelect=_4f;
dojo.stopEvent(_4c);
}else{
if(dojo.hasClass(_4e,"wmDeleteColumn")||dojo.hasClass(_4e,"wmDeleteColumnImage")){
this._deleteItem(_4d);
}
}
}
}else{
this.clickSelect(_4d,_4c);
}
},_deleteItem:function(_50){
if(this.deleteConfirm){
app.confirm(this.deleteConfirm,false,dojo.hitch(this,function(){
this.deleteItem(_50);
}));
}else{
this.deleteItem(_50);
}
},deleteItem:function(_51){
var _52=dojo.indexOf(this.items,_51);
wm.Array.removeElementAt(this.items,_52);
dojo.destroy(_51.domNode);
return _52;
},ondblclick:function(_53,_54){
},onSelectionChange:function(){
},onselect:function(_55){
},ondeselect:function(_56){
},onSelect:function(_57){
},onDeselect:function(_58){
},_oncanselect:function(_59,_5a){
},_onmouseover:function(_5b,_5c){
var _5d={canMouseOver:true};
this._oncanmouseover(_5b,_5c,_5d);
if(_5d.canMouseOver){
_5c.doOver();
}
}});
}
if(!dojo._hasResource["wm.base.widget.Table.builder"]){
dojo._hasResource["wm.base.widget.Table.builder"]=true;
dojo.provide("wm.base.widget.Table.builder");
wm.getTr=function(_5e,_5f){
return _5e&&((_5e.rows||0)[_5f]||_5e.childNodes[_5f]);
};
wm.getTd=function(_60,_61,_62){
return (wm.getTr(_60,_61)||0).childNodes[_62];
};
dojo.declare("wm.table.builder",null,{rowCount:0,colCount:0,constructor:function(_63,_64,_65){
this.className=_63||"";
this.rowClassName=_64||"";
this.columnClassName=_65||"";
},_table:["<table class=\"","","\" cellspacing=\"0\" cellpadding=\"0\">"],generateCell:function(_66,_67,_68){
var tag=(_68?"th":"td");
var _69=["<",tag," "];
var s=this.getCellStyle&&this.getCellStyle(_66,_67);
var c=this.getCellClass&&this.getCellClass(_66,_67);
c=(c?c+" ":"")+this.columnClassName;
s&&_69.push([" style=\"",s,"\""].join(""));
c&&_69.push([" class=\"",c,"\""].join(""));
_69.push(">");
_69.push(this.getCellContent(_66,_67,_68));
_69.push("</"+tag+">");
return _69.join("");
},generateRow:function(_6a,_6b){
var s=(this.getRowStyle)&&this.getRowStyle(_6a),c=this.rowClassName||((this.getRowClass)&&this.getRowClass(_6a));
var _6c=["<tr"," style=\"",s,"\" class=\"",c,"\">"];
for(var i=0,l=this.colCount;i<l;i++){
_6c.push(this.generateCell(_6a,i,_6b));
}
_6c.push("</tr>");
return _6c.join("");
},generateTableStart:function(){
var _6d=this._table.concat([]);
_6d[1]=this.className;
return _6d.join("");
},generateTableEnd:function(){
return "</table>";
},generateHtml:function(){
result=[this.generateTableStart()];
for(var i=0,l=this.rowCount;i<l;i++){
result.push(this.generateRow(i));
}
result.push(this.generateTableEnd());
return result.join("");
},generateHeaderHtml:function(){
result=[this.generateTableStart()];
result.push(this.generateRow(-1,true));
result.push(this.generateTableEnd());
return result.join("");
},generateEmptyTable:function(){
return [this.generateTableStart(),this.generateTableEnd()].join("");
}});
}
if(!dojo._hasResource["wm.base.widget.List"]){
dojo._hasResource["wm.base.widget.List"]=true;
dojo.provide("wm.base.widget.List");
dojo.declare("wm.ListItem",wm.VirtualListItem,{create:function(){
this.inherited(arguments);
if(!this.domNode.id){
dojo.addClass(this.domNode,"wmlist-item");
this.rowId=this.list.nextRowId++;
this.domNode.id=this.list.getRuntimeId()+"_ITEM_"+this.rowId;
}
},format:function(_6e,_6f){
this.list.inSetContent=true;
var _70=(this.list.format?this.list.format(_6f,_6e):_6e);
delete this.list.inSetContent;
return _70;
},setContent:function(_71,_72){
var f=this.format(_71,this.index);
this.inherited(arguments,[f]);
this._data=this.getData();
},getData:function(){
return this.list.getItemData(this.index);
},update:function(){
var _73=this.format(this.getData(),this.index);
this.domNode.innerHTML=_73;
},getColumnFromNode:function(_74){
if(_74){
while(_74.tagName!="TD"){
_74=_74.parentNode;
}
var td=_74,tr=_74.parentNode;
for(var i=0,c;(c=tr.childNodes[i]);i++){
if(c==td){
return i;
}
}
}
return -1;
},select:function(_75){
this.inherited(arguments);
if(!_75&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=true;
});
}
},deselect:function(_76){
this.inherited(arguments);
if(!_76&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=false;
});
}
}});
wm.Object.extendSchema(wm.ListItem,{getData:{group:"method",returns:"Object"}});
dojo.declare("wm.List",wm.VirtualList,{scrollToTopOnDataChange:false,_regenerateOnDeviceChange:1,_scrollTop:0,styleAsGrid:true,rightNavArrow:false,selectFirstRow:false,scrollToSelection:false,renderVisibleRowsOnly:true,autoSizeHeight:false,nextRowId:0,query:{},width:"100%",height:"200px",minWidth:150,minHeight:60,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",autoScroll:false,constructor:function(){
this._data=[];
},columnWidths:"",dataFields:"",classNames:"wmlist",columns:"",_columnsHash:"",getItemForNode:function(_77){
var _78=wm.Array.indexOf(this.items,_77.id.replace(/^.*_/,""),function(_79,id){
return _79&&_79.rowId==id;
});
if(_78==-1){
return null;
}
return this.items[_78];
},deleteItem:function(_7a){
var _7b=this.inherited(arguments);
dojo.query(".wmlist-item.Odd",this.domNode).removeClass("Odd");
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
var _7c=this._data[_7b];
wm.Array.removeElementAt(this._data,_7b);
this.onRowDeleted(_7b,_7c);
},onRowDeleted:function(_7d,_7e){
},setColumns:function(_7f){
this.columns=_7f;
this._setSelectionColumn(this.selectionMode);
this._setDeleteColumn(this.deleteColumn);
this._setRightArrowColumn(this.rightNavArrow);
this._columnsHash={};
var _80=0;
for(var i=0;i<this.columns.length;i++){
var _81=this.columns[i];
this._columnsHash[_81.field||_81.id]=_81;
if(!_81.width){
_81.width="100%";
}
if(_81.width.match(/\%/)){
_80+=Number(_81.width);
}
if(_81.field=="PHONE COLUMN"&&!this._isDesignLoaded){
_81.expression=_81.expression.replace(/\$\{wm\.runtimeId\}/g,this.getRuntimeId()).replace(/wm\.List\.prototype\./g,"app.getValueById('"+this.getRuntimeId()+"').");
}
}
if(!this.isDesignLoaded()&&dojo.isIE<=8){
for(var i=0;i<this.columns.length;i++){
var _81=this.columns[i];
var w=_81.width;
if(w.match(/\%/)){
_81.width=(w*100/_80)+"%";
}
}
}
},setSelectionMode:function(_82){
this.selectionMode=_82;
if(_82=="checkbox"||_82=="extended"){
_82="multiple";
}else{
if(_82=="radio"){
_82="single";
}else{
if(_82=="extended"){
_82=this.selectionMode="multiple";
}
}
}
this._selectionMode=_82;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setRightArrowColumn:function(_83){
if(this.columns){
for(var i=this.columns.length-1;i>=0;i--){
if(this.columns[i].controller=="rightarrow"){
wm.Array.removeElementAt(this.columns,i);
}
}
if(_83){
this.columns.push({show:true,controller:"rightarrow",width:"20px",title:"-",field:"_rightArrow",mobileColumn:true});
}
}
},_setSelectionColumn:function(){
if(this.columns){
var _84=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="radio"||this.columns[i].controller=="checkbox"){
_84=true;
if(this.selectionMode=="checkbox"||this.selectionMode=="radio"){
this.columns[i].controller=this.selectionMode;
}else{
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_84&&(this.selectionMode=="radio"||this.selectionMode=="checkbox")){
var _85=this.columns[0].controller?1:0;
wm.Array.insertElementAt(this.columns,{width:"25px",title:"-",controller:this.selectionMode,field:"_selector",show:true,mobileColumn:true},_85);
}
}
},convertToColumns:function(){
if(this.dataFields){
var _86=this.dataFields.split(/\s*,\s*/);
}else{
if(this.dataSet&&this.dataSet._dataSchema){
var _86=wm.typeManager.getSimplePropNames(this.dataSet._dataSchema);
}
}
if(_86&&_86.length){
this.columns=[];
for(var i=0;i<_86.length;i++){
this.columns.push({width:"100%",field:_86[i],show:true,title:wm.capitalize(_86[i])});
}
}
if(this.columns){
this.setColumns(this.columns);
}
},init:function(){
this.inherited(arguments);
this.setSelectionMode(this.selectionMode);
if(this.noHeader){
this.headerVisible=false;
}
if(!this.styleAsGrid&&(!this._classes||!this._classes.domNode||dojo.indexOf(this._classes.domNode,"MobileListStyle")==-1)){
this.addUserClass("MobileListStyle");
}else{
if(this.styleAsGrid&&(!this._classes||!this._classes.domNode||dojo.indexOf(this._classes.domNode,"GridListStyle")==-1)){
this.addUserClass("GridListStyle");
}
}
var _87=this.spacerNodeTop=document.createElement("div");
_87.className="wmlist-spacer";
this.listNode.appendChild(_87);
var _88=this.spacerNodeBottom=document.createElement("div");
_88.className="wmlist-spacer";
this.listNode.appendChild(_88);
this.createSelectedItem();
this.createBuilder();
if(!this.columns&&this.columnWidths&&this.dataFields.split(",").length!=this.columnWidths.split(",").length){
console.error("Column width count does not match field list count");
}
this._setDataFields(this.dataFields);
this.setColumnWidths(this.columnWidths);
this._render();
this.domNode.onboundschange=dojo.hitch(this,"updateHeaderWidth");
},postInit:function(){
this.inherited(arguments);
if(this.renderVisibleRowsOnly&&!this._isDesignLoaded){
this.connect(this.listNode,"onscroll",this,wm.isMobile?"blockScrolling":"_onScroll");
}
if(wm.isIOS){
this.connect(this.domNode,"ontouchstart",dojo,"stopEvent");
if(this.listNodeWrapper){
this.connect(this.listNodeWrapper,"ontouchstart",dojo,"stopEvent");
}
}
},setDisabled:function(_89){
this.inherited(arguments);
dojo.toggleClass(this.domNode,"Disabled",this._disabled);
},_ontouchstart:function(e){
if(this._touchY&&this._touchY.animationId){
window.clearInterval(this._touchY.animationId);
}
this._touchY={time:new Date().getTime()};
if(this.listNode.clientHeight>this.listNodeWrapper.clientHeight){
dojo.stopEvent(e);
}
},_ontouchmove:function(e,_8a,_8b,_8c){
if(this.listNode.clientHeight<=this.listNodeWrapper.clientHeight||_8c>0&&this.getScrollTop()==0||_8c<0&&this.getScrollTop()>=Math.max(this.listNode.scrollHeight,this.listNodeWrapper.scrollHeight)){
return;
}
var _8d=new Date().getTime();
var _8e=_8d-this._touchY.time;
var _8f=this._scrollTop;
var _90=_8f-_8c;
if(_90<0){
_90=0;
}else{
if(_90>this.listNode.scrollHeight){
_90=this.listNode.scrollHeight;
}
}
this.setScrollTop(_90);
this._touchY={velocity:-_8c/_8e,time:new Date().getTime()};
dojo.stopEvent(e);
dojo.publish("wmTouchMove",[this]);
},_ontouchend:function(e,_91){
if(this.listNode.scrollHeight<=this.listNodeWrapper.clientHeight){
return;
}
if(this._touchedItem){
this._touchedItem.onTouchEnd();
}
if(this._touchY.velocity!=Infinity&&Math.abs(this._touchY.velocity)>0.01){
if(this._touchY.animationId){
window.clearInterval(this._touchY.animationId);
}
this._touchY.animationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
},_onAnimateScroll:function(){
this._touchY.velocity*=0.9;
var _92=this.spacerNodeBottom.offsetTop-this.listNodeWrapper.clientHeight;
var _93=(this._touchY.velocity==Infinity||Math.abs(this._touchY.velocity)<0.01||this.getScrollTop()>_92);
if(!_93){
var inc=Math.min(this._touchY.velocity*50,this.getListNodeHeight());
if(this._scrollTop+inc>_92){
inc=_92-this._scrollTop;
}
}
if(_93||!inc||Math.abs(inc)<=1){
window.clearInterval(this._touchY.animationId);
delete this._touchY.animationId;
return;
}
this.setScrollTop(this._scrollTop+inc);
this._onScroll();
},setScrollTop:function(_94){
var top=Math.max(0,_94);
if(wm.isMobile){
var _95=this._scrollTop;
top=Math.min(top,Math.max(0,this.listNode.clientHeight-this.listNodeWrapper.clientHeight));
if(dojo.isWebKit){
this.listNode.style.WebkitTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isMoz){
this.listNode.style.MozTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isOpera){
this.listNode.style.OTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isIE==8){
this.listNodeWrapper.scrollTop=top;
}else{
if(dojo.isIE){
this.listNode.style.MsTransform="translate(0,-"+top+"px)";
}
}
}
}
}
this.listNode.style.transform="translate(0,-"+top+"px)";
this._scrollTop=top;
if(!this._inScroll){
this._onScroll(top>_95?"down":"up");
}
}else{
this.listNode.scrollTop=top;
}
},scrollToRow:function(_96){
var _97=this.getItem(_96);
if(!_97){
this.renderVisibleRowsOnly=false;
this._render();
this.renderVisibleRowsOnly=true;
_97=this.getItem(_96);
}
var top=_97.domNode.offsetTop;
this._inScroll=true;
this.setScrollTop(Math.max(0,top-15));
this._inScroll=false;
},createSelectedItem:function(){
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
},createBuilder:function(){
this.builder=new wm.table.builder(this.className+"-table",this.className+"-row",this.className+"-cell");
this.builder.getCellContent=dojo.hitch(this,"getCellContent");
this.builder.getCellStyle=dojo.hitch(this,"getCellStyle");
this.builder.getCellClass=dojo.hitch(this,"getCellClass");
},createItem:function(_98,_99){
return new wm.ListItem(this,_98,null,_99);
},getEmptySelection:function(){
return !this.hasSelection();
},hasSelection:function(){
if(dojo.isArray(this.selected)){
return this.selected.length>0;
}else{
return Boolean(this.selected);
}
},setDeleteColumn:function(_9a){
this.deleteColumn=_9a;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setDeleteColumn:function(){
if(this.columns){
var _9b=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="deleteColumn"){
_9b=true;
if(!this.deleteColumn){
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_9b&&this.deleteColumn){
this.columns.unshift({width:"25px",title:"-",controller:"deleteColumn",field:"_deleteColumn",show:true,mobileColumn:true});
}
}
},_setDataFields:function(_9c){
if(!this.columns&&this.dataSet){
if(this._isDesignLoaded){
this.updateColumnData(false);
}else{
this.convertToColumns();
}
}
if(this.columns){
this._dataFields=[];
var _9d=false;
var _9e=(this._isDesignLoaded||window["studio"]&&this.isOwnedBy(studio.page));
var _9f=_9e?studio.currentDeviceType=="phone":wm.device=="phone";
var _a0=_9e?studio.currentDeviceType=="tablet":wm.device=="tablet";
var _a1=true;
if(_9f||_a0){
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
if(c.mobileColumn&&!c.controller){
_9d=true;
}
if(!c.controller&&c.show){
_a1=false;
}
}
}
if(_9d&&(_a1||_9f||this.desktopWidthExcedesBounds())){
this._useMobileColumn=_9d;
}else{
this._useMobileColumn=_9d=false;
}
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
var _a2=_9d&&c.mobileColumn||!_9d&&c.show||c.controller;
if(_a2){
this._dataFields.push(this.columns[i].field||this.columns[i].id);
}
}
}else{
var d=this.dataFields=_9c||"";
if(d){
var s=d.split(","),d=[];
for(var i=0,v,f;(f=s[i]);i++){
v=dojo.trim(f);
if(v){
d.push(v);
}
}
}else{
var _a3=(this.dataSet||0)._dataSchema;
if(_a3){
var d=[];
for(var i in _a3){
var ti=_a3[i];
if(!(ti||0).isList&&!wm.typeManager.isStructuredType((ti||0).type)){
d.push(i);
}
}
}else{
var row=this._data;
if(dojo.isArray(row)){
row=row[0];
}
if(dojo.isObject(row)&&!dojo.isArray(row)){
d=[];
for(var i in row){
if(!dojo.isObject(row[i])){
d.push(dojo.trim(i));
}
}
}
}
}
this.trimDataSetObjectFields(d);
this._dataFields=d;
}
},desktopWidthExcedesBounds:function(){
var _a4=20;
var _a5=0;
dojo.forEach(this.columns,function(_a6){
if(_a6.show){
_a5++;
var w=String(_a6.width);
if(w.indexOf("%")!=-1){
_a4+=80;
}else{
var _a7=parseInt(w);
if(_a7){
_a4+=_a7;
}
}
}
});
return (_a4>this.bounds.w)&&_a5>1;
},getDataSetObjectFields:function(){
var o={};
if(!this.dataSet){
return o;
}
var t=this.dataSet.type,tt=wm.typeManager.getTypeSchema(t)||{};
for(var i in tt){
if(wm.typeManager.isStructuredType(tt[i])){
o[i]=tt[i];
}
}
return o;
},trimDataSetObjectFields:function(_a8){
var f=this.getDataSetObjectFields();
for(var i in f){
for(var j=0,df;(df=_a8[j]);j++){
if(df==i){
_a8.splice(j,1);
break;
}
}
}
},setDataFields:function(_a9){
this._setDataFields(_a9);
this._render();
},setColumnWidths:function(_aa){
var c=this.columnWidths=_aa;
this._columnWidths=dojo.isArray(c)?c:c.split(",");
this._render();
},shouldShowHeader:function(){
var _ab=this._dataFields;
return (this.headerVisible&&(_ab||this._headerContent));
},getHeaderContent:function(){
return this._headerContent||this.builder.generateHeaderHtml();
},renderHeader:function(){
var s=this.shouldShowHeader();
this._setHeaderVisible(s);
if(s){
this.headerNode.innerHTML=this.getHeaderContent();
this.updateHeaderWidth();
}
},updateHeaderWidth:function(){
if(this.columns){
return;
}
var f=this.items&&this.items[0];
var n=f&&f.domNode.firstChild;
var b=n&&dojo.marginBox(n);
if(b&&this.headerNode.firstChild&&b.w){
dojo.marginBox(this.headerNode.firstChild,{w:b.w});
}
},_render:function(){
if(!this._cupdating){
if(this.dataSet){
this.renderDataSet(this.dataSet);
}else{
this.renderData(this._data);
}
}
},clear:function(_ac){
this._data=null;
this.inherited(arguments);
},getDataItemCount:function(){
return this._data?this._data.length:0;
},canSetDataSet:function(_ad){
return Boolean(_ad);
},setDataSet:function(_ae){
try{
var _af=this.dataSet;
if(!this.canSetDataSet(_ae)){
this.dataSet="";
}else{
this.dataSet=_ae;
}
var t=(_ae||0).type||"AnyData";
if(this._paging==="inc"){
var _b0=this.getScrollTop();
if(this.loadingNode&&this.loadingNode.parentNode){
this.listNode.removeChild(this.loadingNode);
}
this._data=_ae.getData();
this.updateBottomSpacerHeight();
this.setScrollTop(_b0);
this.scrollDownAddItems();
delete this._paging;
}else{
if(this._isDesignLoaded&&this.columns&&this.columns.length&&_ae&&_ae.type){
if(this._typeChangedConnect){
dojo.disconnect(this._typeChangedConnect);
}
this._typeChangedConnect=this.connect(_ae,"typeChanged",this,function(){
this.updateColumnData(true);
this._render();
});
if(!_af||!_af.type||_af.type==_ae.type){
this.updateColumnData(true);
}
}
this.setSelectedItemType(t);
this.dataSetToSelectedItem(_ae);
this.onsetdata(this.dataSet);
this.renderDataSet(this.dataSet);
}
}
catch(e){
alert(e.toString());
}
},setSelectedItemType:function(_b1){
this.selectedItem.setType(_b1);
},update:function(){
var ds=this.getValueById((this.components.binding.wires["dataSet"]||0).source);
wm.fire(ds,"update");
},renderDataSet:function(_b2){
if(this.isAncestorHidden()&&!this._renderHiddenGrid&&!this._isDesignLoaded){
this._renderDojoObjSkipped=true;
return;
}
this._renderDojoObjSkipped=false;
var d=_b2 instanceof wm.Variable?_b2.getData():[];
d=this.runQuery(d);
this.renderData(d);
},doAutoSize:function(){
},setAutoSizeHeight:function(_b3){
this.autoSizeHeight=_b3;
this._render();
},setBestHeight:function(){
if(this.autoSizeHeight){
this._doingAutoSize=true;
var _b4=0;
if(this.items.length){
var _b5=dojo.coords(this.items[this.items.length-1].domNode);
_b4+=_b5.h+_b5.t;
}
if(this.headerVisible){
var _b5=dojo.coords(this.headerNode);
_b4+=_b5.h+_b5.t;
}
_b4+=this.padBorderMargin.b+this.padBorderMargin.t+2;
this.setHeight(_b4+"px");
this._doingAutoSize=false;
}
},_onShowParent:function(){
if(this._renderDojoObjSkipped&&!this._headerRendered||this.spacerNodeTop.clientHeight){
wm.onidle(this,"_render");
}
if(this.isNavigationMenu){
this.deselectAll();
}
},setShowing:function(_b6){
var _b7=this.showing;
this.inherited(arguments);
if(!_b7&&_b6){
this._onShowParent();
}
},renderData_optimized:function(_b8){
var _b9=this.selectedItem.getData();
this.clear(true);
this._data=_b8;
if(!this.dataFields){
this._setDataFields();
}
this.updateBuilder();
if(!this._data){
return;
}
this.renderHeader();
this._headerRendered=true;
var i=0;
var f=dojo.hitch(this,function(_ba,_bb,_bc,_bd){
var max=Math.min(i+_bb,this.getDataItemCount());
for(;i<max;i++){
this.addItem(this.getItemData(i),i);
this._formatIndex=null;
}
if(i<this.getDataItemCount()){
wm.onidle(this,function(){
_bc(i,_bb,_bc,_bd);
});
}else{
_bd();
}
});
var _be=dojo.hitch(this,function(){
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
this.reflow();
if(this._listTouchScroll&&!this._listTouchScroll.scrollers.outer.style.width){
wm.job(this.getRuntimeId()+"ListSetupScroller",1,dojo.hitch(this._listTouchScroll,"setupScroller"));
}
var _bf=dojo.isArray(_b9);
if(this.columns&&(_bf&&_b9.length||!_bf&&_b9||this.selectFirstRow)){
this.selectItemOnGrid(_b9);
}
this.onRenderData();
});
f(0,20,f,_be);
},renderBounds:function(){
var h=parseInt(this.domNode.style.height);
if(this.inherited(arguments)&&this.renderVisibleRowsOnly&&!this._isDesignLoaded){
if(this._renderDojoObjSkipped){
this._render();
}else{
var _c0=this.listNode.childNodes.length>2?this.getItemForNode(this.listNode.childNodes[1]):null;
if(this.bounds.h>h){
this._onScroll("down");
}else{
this._onScroll("up");
}
}
}
},renderData:function(_c1){
var _c2=wm.device=="phone"?this.maxRenderedRowsPhone:this.maxRenderedRows;
if(this.selectedItem.type){
var _c3=this.selectedItem.getData();
}
this.clear(true);
if(this.scrollToTopOnDataChange){
this._inScroll=true;
this.setScrollTop(0);
delete this._inScroll;
}
this._data=_c1;
if(!this.dataFields){
this._setDataFields();
}
this.updateBuilder();
this.renderHeader();
this.spacerNodeBottom.style.height="0px";
this.spacerNodeTop.style.height="0px";
if(!this._data){
return;
}
this._scrollDirection="down";
if(this.renderVisibleRowsOnly&&!this._isDesignLoaded){
if(!this.isAncestorHidden()&&this.getListNodeHeight()>0&&!this._loading){
this.scrollDownAddItems(0);
this.avgHeight=this.getAverageItemHeight();
this.updateBottomSpacerHeight();
var sc=this.getScrollTop();
if(sc>0){
this.setScrollTop(sc);
}
}else{
this._renderDojoObjSkipped=true;
}
}else{
var _c4=this.getDataItemCount();
for(var i=0;i<_c4;i++){
this.addItem(this.getItemData(i),i);
}
if(this.autoSizeHeight){
if(!this.isAncestorHidden()||this._isDesignLoaded){
this.setBestHeight();
}else{
this._renderDojoObjSkipped=true;
}
}
}
this.reflow();
var _c5=dojo.isArray(_c3);
if(this.columns&&(_c5&&_c3.length||!_c5&&_c3||this.selectFirstRow)){
this.selectItemOnGrid(_c3);
}
this.onRenderData();
},_renderItem:function(i){
if(this.items[i]){
if(!this.items[i].domNode.parentNode||!this.items[i].domNode.parentNode.tagName){
var _c6=this.listNode;
var _c7=this.findNextSiblingNode(i);
_c6.insertBefore(this.items[i].domNode,_c7);
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
if(_c7!=this.spacerNodeBottom){
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-this.items[i].domNode.clientHeight)+"px";
}
}else{
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-this.getAverageItemHeight())+"px";
}
}
}
}else{
var _c8=false;
this._formatIndex=i;
this.addItem(this.getItemData(i),i);
this._formatIndex=null;
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
}else{
if(!_c8){
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-this.items[i].height)+"px";
}
}
}
}
if(i==0){
this.spacerNodeTop.style.height="0px";
}else{
if(i==this.getDataItemCount()-1){
this.spacerNodeBottom.style.height="0px";
}
}
},getNodeFromItem:function(_c9){
if(_c9){
return _c9.domNode;
}else{
return null;
}
},findNextSiblingNode:function(_ca){
var _cb=this.listNode;
if(_ca==0){
return _cb.childNodes[1];
}
if(this.items[_ca-1]){
var _cc=this.getNodeFromItem(this.items[_ca-1]);
if(_cc.parentNode&&_cc.parentNode.tagName){
return _cb.childNodes[dojo.indexOf(_cb.childNodes,_cc)+1];
}
}
if(this.items[_ca+1]){
var _cd=this.getNodeFromItem(this.items[_ca+1]);
if(_cd.parentNode&&_cd.parentNode.tagName){
return _cd;
}
}
for(var i=_ca-2;i>=0;i--){
if(this.items[i]){
var _cd=this.getNodeFromItem(this.items[i]);
if(_cd.parentNode&&_cd.parentNode.tagName){
return _cb.childNodes[dojo.indexOf(_cb.childNodes,_cd)+1];
}
}
}
return _cb.childNodes[1];
},onStyleRow:function(_ce,_cf){
},_onStyleRowBeforeStart:1,addItem:function(_d0,_d1,_d2){
var _d3=this.createItem(_d0,_d2);
var _d4=this.listNode;
dojo.setSelectable(_d3.domNode,false);
if(_d1!=undefined){
this.items[_d1]=_d3;
_d3.index=_d1;
var _d5=this.findNextSiblingNode(_d1);
if(_d5){
_d4.insertBefore(_d3.domNode,_d5);
}else{
_d4.insertBefore(_d3.domNode,this.spacerNodeBottom);
}
}else{
this.items.push(_d3);
_d3.index=this.items.length-1;
var _d5=(this.items.length==_d1+1)?this.spacerNodeBottom:_d4.childNodes[_d1+1];
_d4.insertBefore(_d3.domNode,_d5);
}
try{
var _d6=_d3.getData();
if(_d6){
var _d7={customClasses:"",customStyles:""};
this.onStyleRow(_d7,_d6);
if(_d7.customClasses){
dojo.addClass(_d3.domNode,_d7.customClasses);
}
if(_d7.customStyles){
_d3.domNode.style.cssText=_d7.customStyles;
}
}
}
catch(e){
}
return _d3;
},addSpacer:function(_d8,_d9){
var _da=document.createElement("div");
_da.className="wmlist-spacer";
_da.style.height=_d9+"px";
var _db=this.listNode.childNodes[_d8+1];
this.listNode.insertBefore(_da,_db);
this.items[_d8]=_da;
},addVisibleItems:function(_dc){
var _dd=this.listNode;
var _de=this.getDataItemCount();
if(_de==0){
return;
}
var _df=this.getScrollTop();
var _e0=this.getListNodeHeight()+_df;
var _e1=this.avgHeight=this.getAverageItemHeight();
if(_dc===undefined){
_dc=Math.floor(_df/_e1);
_dc=Math.max(0,_dc-10);
_dc=Math.min(_dc,_de);
}
if(this._scrollDirection=="down"){
for(var i=0;i<_dc;i++){
if(!this.items[i]){
this.addSpacer(i,_e1);
_e2+=_e1;
}
}
}else{
var _e3=_dd.childNodes[1];
var _e4=this.getItemForNode(_e3);
}
var _e2=_e0-1;
for(var i=_dc;i<_de&&_e2<_e0;i++){
this._renderItem(i);
if(!this.items[i]){
this._renderItem(i);
}
_e2=this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight;
}
var _e5=i+10;
for(;i<_de&&i<_e5;i++){
this._renderItem(i);
}
this.addOddClasses();
},updateTopSpacerHeight:function(){
var _e6=this.listNode.childNodes[1];
if(!_e6){
this.spacerNodeTop.style.height="0px";
}else{
var _e7=this.getItemForNode(_e6);
var _e8=dojo.indexOf(this.items,_e7);
var _e9=_e8*this.getAverageItemHeight();
this.spacerNodeTop.style.height=_e9+"px";
}
},updateBottomSpacerHeight:function(){
var _ea=this.getDataItemCount();
var _eb=this.listNode.childNodes;
if(_eb<=2){
this.spacerNodeBottom.style.height="0px";
return;
}
var _ec=_eb[_eb.length-2];
var _ed=this.getItemForNode(_ec);
var _ee=dojo.indexOf(this.items,_ed);
var _ef=_ea-_ee-1;
if(_ef>0){
this.spacerNodeBottom.style.height=(_ef*this.avgHeight)+"px";
}else{
this.spacerNodeBottom.style.height="0px";
}
},getListNodeHeight:function(){
return (this.listNodeWrapper||this.listNode).clientHeight;
},getScrollTop:function(){
if(wm.isMobile){
return this._scrollTop;
}else{
var _f0=this.listNode;
return _f0.scrollTop;
}
},updateAverageItemHeight:function(){
var h=0;
var _f1=0;
var _f2=this.listNode.childNodes;
for(var i=1;i<_f2.length-2;i++){
h+=_f2[i].clientHeight;
}
if(h>0){
this.avgHeight=h/(_f2.length-3);
}
return this.avgHeight;
},getAverageItemHeight:function(){
return this.avgHeight||20;
},blockScrolling:function(){
this.listNodeWrapper.scrollTop=0;
},_onScroll:function(_f3,_f4){
if(this._inScroll){
return;
}
this._inScroll=true;
try{
if(this._lastScrollTime&&(new Date().getTime()-this._lastScrollTime)<10){
return;
}
this._isScrolling=true;
var _f5=this.getScrollTop();
if(_f3=="down"||_f3!="up"&&(this._lastScrollTop===undefined||this._lastScrollTop<_f5)){
this._scrollDirection="down";
this.scrollDownRemoveItems();
this.scrollDownAddItems();
}else{
if(this._lastScrollTop>_f5){
this._scrollDirection="up";
this.scrollUpRemoveItems();
this.scrollUpAddItems();
wm.job(this.getRuntimeId()+".testScrollTop",200,this,"scrollUpAddItems");
}else{
this.scrollDownAddItems();
this.scrollUpAddItems();
}
}
}
catch(e){
}
finally{
this._lastScrollTop=_f5;
this._lastScrollTime=new Date().getTime();
this._isScrolling=false;
delete this._inScroll;
}
},_testScrollTop:function(){
this._onScroll(null,true);
},getLastItemNode:function(){
for(var i=this.listNode.childNodes.length-1;i>=0;i--){
if(this.listNode.childNodes[i].id){
return this.listNode.childNodes[i];
}
}
},scrollDownAddItems:function(_f6){
var _f7=0;
var _f8=this.listNode;
var _f9=this.getDataItemCount();
if(_f9==0){
return;
}
var _fa=this.getScrollTop();
var _fb=this.getListNodeHeight();
var _fc=0;
var _fd=_fb+_fa+this.spacerNodeTop.offsetTop;
dojo.forEach(this.listNode.childNodes,function(_fe){
_fe.style.border="";
});
if(_f6===undefined){
var _ff=this.getLastItemNode();
if(_ff){
var item=this.getItemForNode(_ff);
var _100=dojo.indexOf(this.items,item);
_f6=_100+1;
_fc=item.domNode.offsetTop+item.domNode.clientHeight;
}else{
_f7=this.getAverageItemHeight();
_f6=Math.floor(_fa/_f7);
_fc=this.spacerNodeTop.clientHeight;
}
if(_f8.childNodes.length==2){
var _101=_f7*_f6;
var _102=this.spacerNodeTop.clientHeight;
var _103=_101-_102;
this.spacerNodeTop.style.height=_101+"px";
var _104=this.spacerNodeBottom.clientHeight;
_104=_104-_103;
this.spacerNodeBottom.style.height=_104+"px";
}
}
var _105=false;
for(var i=_f6;i<_f9&&_fc<_fd;i++){
_105=true;
this._renderItem(i);
if(!_f7){
_f7=this.items[i].domNode.clientHeight||22;
}
_fc+=_f7;
}
if(i<_f9){
if(_105){
this._renderItem(i);
}
}else{
if(!this._paging){
if(this.dataSet instanceof wm.LiveVariable&&this.dataSet.getPage()<this.dataSet.getTotalPages()-1){
this.dataSet._appendData=true;
this.dataSet.setNextPage();
this._paging="inc";
}else{
this.onScrollToBottom();
var svar=!this.dataSet||this.dataSet instanceof wm.ServiceVariable?this.dataSet:this.dataSet.isAncestorInstanceOf(wm.ServiceVariable);
if(svar&&svar._requester){
this._paging="inc";
}
}
if(this._paging){
var _f8=this.listNode;
var node=this.loadingNode||dojo.create("div",{className:"wmlist-item wmlist-loading",innerHTML:"Loading..."});
_f8.insertBefore(node,this.spacerNodeBottom);
this.loadingNode=node;
}
}
}
this.addOddClasses();
this.updateAverageItemHeight();
},onScrollToBottom:function(){
},addOddClasses:function(){
wm.job(this.getRuntimeId()+".addOddClasses",10,this,function(){
dojo.query(".wmlist-item",this.domNode).forEach(function(node){
var id=parseInt(node.id.replace(/^.*_/,""));
dojo.toggleClass(node,"Odd",Boolean(id%2));
});
});
},scrollDownRemoveItems:function(){
var _106=this.getScrollTop();
var _107=this.spacerNodeTop.clientHeight;
var _108=this.getAverageItemHeight();
var _109=_106-_108;
var _107=this.spacerNodeTop.clientHeight;
var rows=this.listNode.childNodes;
var _10a=[];
for(var i=1;i<rows.length-1;i++){
var node=rows[i];
var h=node.clientHeight;
if(h+_107<_109){
_10a.push(node);
_107+=h;
}else{
break;
}
}
this.spacerNodeTop.style.height=_107+"px";
dojo.forEach(_10a,function(node){
node.parentNode.removeChild(node);
});
},scrollUpRemoveItems:function(){
var _10b=this.avgHeight=this.getAverageItemHeight();
var _10c=this._listTouchScroll?this.listNode.parentNode:this.listNode;
var _10d=this.getScrollTop()+this.getListNodeHeight()+this.spacerNodeTop.offsetTop;
var rows=this.listNode.childNodes;
var _10e=parseInt(this.spacerNodeBottom.style.height)||0;
while(rows.length>2){
var row=rows[rows.length-2];
if(row.offsetTop>_10d){
row.parentNode.removeChild(row);
}else{
break;
}
}
this.updateBottomSpacerHeight();
},scrollUpAddItems:function(){
var _10f=this.listNode;
var _110=this.getDataItemCount();
if(_110==0){
return;
}
var _111=this.getScrollTop();
var _112=this.getListNodeHeight()+_111+this.spacerNodeTop.offsetTop;
var _113=this.getAverageItemHeight();
var _114=_111;
var _115;
if(this.listNode.childNodes.length>2){
var item=this.getItemForNode(this.getLastItemNode());
var _116=dojo.indexOf(this.items,item);
_115=_116-1;
}else{
_115=Math.floor(_112/_113);
}
var _117=(_111&&_10f.childNodes.length==2);
if(_117){
this.spacerNodeBottom.style.height=_113*(_110-_115)+"px";
}
for(var i=_115;i>=0;i--){
this._renderItem(i);
if(this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight<_114){
break;
}
}
if(i>=0){
this._renderItem(i);
}
this.updateAverageItemHeight();
if(_111<=0){
this.spacerNodeTop.style.height="0px";
}else{
if(_117){
this.spacerNodeTop.style.height=_113*i+"px";
}
}
this.addOddClasses();
},onRenderData:function(){
},selectItemOnGrid:function(obj,_118){
if(obj instanceof wm.Variable){
obj=obj.getData();
}
if(obj===undefined||obj===null){
obj={};
}
var _119=[];
dojo.forEach(this.columns,function(col){
if(col.displayType=="Date"){
_119.push(col.field||col.id);
}
});
if(!_118){
_118=this.primaryKeyFields||this.dataSet?wm.data.getIncludeFields(this.dataSet.type):this._pkList||[];
}
if(_118.length==0&&this.dataSet){
var _11a=wm.typeManager.getTypeSchema(this.dataSet.type);
for(var _11b in _11a){
_118.push(_11b);
}
}
var q={};
dojo.forEach(_118,function(f){
q[f]=obj[f];
if(dojo.indexOf(_119,f)!=-1){
q[f]=new Date(obj[f]);
}
});
var _11c=this.runQuery(this._data,q);
if(_11c.length<1){
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
return;
}
if(_11c[0]._rowNumber!=undefined){
this._cupdating=true;
this.setSelectedRow(_11c[0]._rowNumber);
this._cupdating=false;
}else{
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
}
},runQuery:function(_11d,_11e){
var _11f=_11e||this.query;
if(wm.isEmpty(_11f)){
return _11d;
}else{
var _120=[];
for(var i=0;i<_11d.length;i++){
var d=_11d[i];
if(this.queryItem(_11f,d,i)){
d._rowNumber=i;
_120.push(d);
}
}
return _120;
}
},queryItem:function(_121,_122,_123){
var w="*";
var _124=true;
for(var key in _121){
if(this._columnsHash&&this._columnsHash[key]&&this._columnsHash[key].isCustomField){
var col=this._columnsHash[key];
if(col.expression){
_122[key]=wm.expression.getValue(col.expression,_122,this.owner);
}else{
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
case "wm_time_formatter":
case "Time (WaveMaker)":
case "wm_number_formatter":
case "Number (WaveMaker)":
case "wm_currency_formatter":
case "Currency (WaveMaker)":
case "wm_image_formatter":
case "Image (WaveMaker)":
case "wm_link_formatter":
case "Link (WaveMaker)":
break;
case "wm_array_formatter":
_122[key]=this.arrayFormatter(key,col.formatProps,null,null,null,_122[k]);
break;
default:
if(!this.isDesignLoaded()){
_122[key]=dojo.hitch(this.owner,col.formatFunc)("",_123,dojo.indexOf(this.columns,col),key,{customStyles:[],customClasses:[]},_122);
}
}
}
}
}
var a=_122[key];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
var b=_121[key];
var _125=true;
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
if(b.charAt(0)==w){
b=b.substring(1);
_125=false;
}
}
if(b==w){
continue;
}
if(dojo.isString(a)&&dojo.isString(b)){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
a=a.toLowerCase();
b=b.toLowerCase();
var _126=a.indexOf(b);
if(_126==-1||_126>0&&_125){
_124=false;
break;
}
}else{
if(a!==b){
_124=false;
break;
}
}
}
return _124;
},getHeading:function(_127){
if(this.columns){
var _128=this._columnsHash[_127];
var _129=_128.title;
return _129==null?"":_129;
}else{
var d=this._dataSource;
var s=d&&d.schema||0;
var si=s[_127]||0;
if(si.label){
return wm.capitalize(si.label);
}else{
var _12a=_127.replace(/^.*\./,"");
return wm.capitalize(_12a);
}
}
},getItemData:function(_12b){
return this._data[_12b];
},_getColumnDef:function(_12c){
var _12d=this._useMobileColumn;
var _12e=dojo.some(this.columns,function(c){
return c.mobileColumn&&!c.controller;
});
var _12f=-1;
for(var i=0;i<this.columns.length;i++){
if(_12d&&this.columns[i].mobileColumn||(!_12e||!_12d)&&this.columns[i].show){
_12f++;
}
if(_12f==_12c){
return this.columns[i];
}
}
},getCellContent:function(_130,_131,_132){
var _133=this._dataFields&&this._dataFields[_131];
var _134;
var i=this._formatIndex!=null?this._formatIndex:this.getCount();
if(this._firstItemIndex!==undefined){
i+=this._firstItemIndex;
}
if(_132){
_134="<div>"+this.getHeading(_133);
}else{
if(this.columns){
var _135=this._getColumnDef(_131);
if(_135.controller){
if(_135.controller=="deleteColumn"){
_134="<div wmcontroller='true' class='wmDeleteColumn'><div wmcontroller='true' class='wmDeleteColumnImage'/></div>";
}else{
if(_135.controller=="rightarrow"){
_134="<div class='mblArrowContainer'><div class='mblRightArrow mblArrow' /></div>";
}else{
_134="<input wmcontroller='true' type='"+_135.controller+"' />";
}
}
}else{
var _136=this._data[i];
var _134=_136;
var _137=_133.split(".");
for(var _138=0;_138<_137.length;_138++){
if(_134&&typeof _134=="object"){
_134=_134[_137[_138]];
}else{
_134=null;
}
}
_134=this.formatCell(_133,_134,_136,i,_131);
}
}
}
if(_134==undefined){
var d=this.getItemData(i);
f=wm.decapitalize(_133);
_134=_133?d[_133]:d;
}
var info={column:_131,data:_134,header:_132};
this.onformat(info,_131,_134,_132,_136);
if(!this.inSetContent){
this._formatIndex=null;
}
if(_134===undefined||_134===null){
_134="";
}
return "<div class='wmlist-content'>"+info.data+"</div>";
},getColWidth:function(_139){
if(this.columns){
return this.columns[_139].width;
}else{
var c=this._columnWidths;
if(!c||c.length==0||c.length==1&&!c[0]||c[_139]===undefined){
return Math.round(100/this.builder.colCount)+"%";
}else{
return c[_139];
}
}
},getCellStyle:function(_13a,_13b){
if(this.columns){
var text=[];
var _13c=this._dataFields[_13b];
var col=this._columnsHash[_13c];
var _13d=col.align;
if(_13a!=-1){
_13a=this._formatIndex!=null?this._formatIndex:this.getCount();
var data=this._data[_13a];
if(col.backgroundColor){
var _13e=wm.expression.getValue(col.backgroundColor,data,this.owner);
if(_13e){
text.push("background-color:"+_13e);
}
}
if(col.textColor){
var _13f=wm.expression.getValue(col.textColor,data,this.owner);
if(_13f){
text.push("color:"+_13f);
}
}
}
var _140=col.width;
if(_140){
text.push("width:"+_140);
}
if(_13d){
text.push("text-align:"+_13d);
}
return text.join(";");
}else{
return "width: "+this.getColWidth(_13b)+";";
}
},updateBuilder:function(){
this.builder.colCount=this._dataFields?this._dataFields.length:1;
this.builder.rowCount=1;
},format:function(_141,_142){
this._formatIndex=_141;
return this.builder.generateHtml(_142);
},_onformatBeforeStart:1,onformat:function(_143,_144,_145,_146,_147){
},onsetdata:function(_148){
}});
wm.List.extend({renderDojoObj:function(){
this._render();
},formatCell:function(_149,_14a,_14b,_14c,_14d){
if(!this._columnsHash){
return _14a;
}else{
var col=this._columnsHash[_149];
var _14e="";
if(col.expression){
var expr=col.expression;
try{
if(col.field=="PHONE COLUMN"){
expr=expr.replace(/\$\{wm\.rowId\}/g,_14c);
}
_14e=wm.expression.getValue(expr,_14b,this.owner);
}
catch(e){
}
}else{
_14e=_14a;
}
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
_14e=this.dateFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
_14e=this.localDateFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_time_formatter":
case "Time (WaveMaker)":
_14e=this.timeFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_number_formatter":
case "Number (WaveMaker)":
_14e=this.numberFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_array_formatter":
_14e=this.arrayFormatter(col.field||col.id,col.formatProps||{},null,null,null,_14e);
break;
case "wm_currency_formatter":
case "Currency (WaveMaker)":
_14e=this.currencyFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_image_formatter":
case "Image (WaveMaker)":
_14e=this.imageFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_link_formatter":
case "Link (WaveMaker)":
_14e=this.linkFormatter(col.formatProps||{},null,null,null,_14e);
break;
case "wm_button_formatter":
_14e=this.buttonFormatter(_149,col.formatProps||{},null,null,null,_14e,_14c);
break;
default:
if(!this.isDesignLoaded()){
if(this.owner[col.formatFunc]){
_14e=dojo.hitch(this.owner,col.formatFunc)(_14e,_14c,_14d,_149,{customStyles:[],customClasses:[]},_14b);
}
}else{
_14e="<i>runtime only...</i>";
}
break;
}
}
return _14e;
}
},dateFormatter:function(_14f,_150,_151,_152,_153){
if(!_153){
return _153;
}else{
if(typeof _153=="number"){
_153=new Date(_153);
}else{
if(_153 instanceof Date==false){
return _153;
}
}
}
var _154=_14f.dateType||"date";
if(!_14f.useLocalTime){
var _155=_154=="date"?360:0;
_153.setHours(0,60*_153.getHours()+_153.getMinutes()+60*wm.timezoneOffset+_155);
}
var _156={fullYear:true,selector:_154,formatLength:_14f.formatLength||"short",locale:dojo.locale,datePattern:_14f.datePattern,timePattern:_14f.timePattern};
return dojo.date.locale.format(_153,_156);
},numberFormatter:function(_157,_158,_159,_15a,_15b){
var _15c={places:_157.dijits||0,round:_157.round?0:-1,type:_157.numberType};
return dojo.number.format(_15b,_15c);
},arrayFormatter:function(_15d,_15e,_15f,_160,_161,_162){
if(!_15e.joinFieldName){
_15e.joinFieldName="dataValue";
}
if(!_15e.separator){
_15e.separator=",";
}
var str="";
if(_162){
dojo.forEach(_162,function(item){
if(str){
str+=_15e.separator+" ";
}
str+=item[_15e.joinFieldName];
});
}
return str;
},currencyFormatter:function(_163,_164,_165,_166,_167){
var _168=false;
if(this instanceof wm.DojoGrid){
_168=this._isDesignLoaded;
}
return dojo.currency.format(_167,{currency:_163.currency||(_168?studio.application.currencyLocale:app.currencyLocale)||"USD",places:_163.dijits==undefined?2:_163.dijits,round:_163.round?0:-1});
},imageFormatter:function(_169,_16a,_16b,_16c,_16d){
if(_16d&&_16d!=""){
var _16e=_169.width?" width=\""+_169.width+"px\"":"";
var _16f=_169.height?" height=\""+_169.height+"px\"":"";
if(_169.prefix){
_16d=_169.prefix+_16d;
}
if(_169.postfix){
_16d=_16d+_169.postfix;
}
return "<img "+_16e+_16f+" src=\""+_16d+"\">";
}
return "";
},linkFormatter:function(_170,_171,_172,_173,_174){
if(_174&&_174!=""){
var _175=String(_174);
var _176=String(_174);
if(_170.prefix){
_176=_170.prefix+_176;
}
if(_170.postfix){
_176=_176+_170.postfix;
}
var _177=_170.target||"_NewWindow";
if(_176.indexOf("://")==-1&&_176.charAt(0)!="/"){
_176="http://"+_176;
}
return "<a href=\""+_176+"\" target=\""+_177+"\">"+_175+"</a>";
}
return _174;
},buttonFormatter:function(_178,_179,_17a,_17b,_17c,_17d,_17e,_17f){
if(_17d&&_17d!=""){
var _180=_179.buttonclass?" class=\""+_179.buttonclass+"\" ":" class=\"wmbutton\" ";
var _181=this.getRuntimeId()+".gridButtonClicked(event,\""+_178+"\","+_17e+")' ";
if(wm.isMobile){
_181="ontouchstart='"+this.getRuntimeId()+".gridButtonTouchStart(event)' ontouchmove='"+this.getRuntimeId()+".gridButtonTouchMove(event)' ontouchend='"+_181+"'";
}else{
_181="onclick='"+_181+"'";
}
return "<button "+_181+_180+">"+_17d+"</button>";
}
return _17d;
},gridButtonTouchStart:function(_182){
_182=_182||window.event;
dojo.stopEvent(_182);
this._buttonTouchPos={y:_182.targetTouches?_182.targetTouches[0].clientY:_182.clientY,x:_182.targetTouches?_182.targetTouches[0].clientX:_182.clientX,isClick:true};
},gridButtonTouchMove:function(_183){
_183=_183||window.event;
dojo.stopEvent(_183);
if(this._buttonTouchPos.isClick){
var y=_183.targetTouches?_183.targetTouches[0].clientY:_183.clientY;
var x=_183.targetTouches?_183.targetTouches[0].clientX:_183.clientX;
this._buttonTouchPos.isClick=(Math.abs(y-this._buttonTouchPos.y)<5&&Math.abs(x-this._buttonTouchPos.x)<5);
}
},gridButtonClicked:function(_184,_185,_186){
_184=_184||window.event;
dojo.stopEvent(_184);
if(wm.isMobile&&!this._buttonTouchPos.isClick){
return;
}
var _187=this._data[_186];
this.onGridButtonClick(_185,_187,_186);
},onGridButtonClick:function(_188,_189,_18a){
},setSelectedRow:function(_18b){
this.eventSelect(this.items[_18b]);
},setSelectedItem:function(_18c){
if(_18c instanceof wm.Variable){
_18c=_18c.getData();
}
if(!_18c){
this.deselectAll();
return;
}
this.selectByQuery(_18c);
},select:function(_18d){
var _18e;
var item;
if(_18d===null){
_18e=-1;
item=null;
}else{
if(typeof _18d=="object"){
_18e=_18d.index;
item=_18d;
}else{
_18e=_18d;
item=this.getItem(_18e);
}
}
if(this._renderDojoObjSkipped||this.renderVisibleRowsOnly&&(!item||!item.domNode||!item.domNode.parentNode)&&!this._isDesignLoaded){
var _18f=this._renderHiddenGrid;
this._renderHiddenGrid=true;
if(this.renderVisibleRowsOnly){
this.renderVisibleRowsOnly=false;
this._render();
this.renderVisibleRowsOnly=true;
}else{
this._render();
}
this._renderHiddenGrid=_18f;
item=this.getItem(_18e);
}
this.inherited(arguments,[item]);
if(this.scrollToSelection){
wm.onidle(this,function(){
this.scrollToRow(_18e);
});
}
},selectByIndex:function(_190){
this.select(_190);
},selectByQuery:function(_191){
if(!this.dataSet){
return;
}
if(!_191){
this.deselectAll();
return;
}
var _192=this.dataSet.query(_191);
if(this.renderVisibleRowsOnly){
this.renderVisibleRowsOnly=false;
this._render();
this.renderVisibleRowsOnly=true;
}
this.deselectAll();
var _193=_192.getCount();
for(var i=0;i<_193;i++){
var item=_192.data._list[i];
this.addToSelection(this.items[dojo.indexOf(this.dataSet.data._list,item)]);
if(this._selectionMode=="single"){
break;
}
}
},getRow:function(_194){
return this._data[_194];
},findRowIndexByFieldValue:function(_195,_196){
var item;
for(var i=0;i<this._data.length;i++){
item=this._data[i];
if(item[_195]===_196){
return i;
}
}
return -1;
},getCell:function(_197,_198){
var row=this._data[_197];
if(row){
var col=this._columnsHash?this._columnsHash[_198]:null;
if(col&&col.isCustomField){
if(col.expression){
return wm.expression.getValue(col.expression,row,this.owner);
}else{
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
case "wm_time_formatter":
case "Time (WaveMaker)":
case "wm_number_formatter":
case "Number (WaveMaker)":
case "wm_currency_formatter":
case "Currency (WaveMaker)":
case "wm_image_formatter":
case "Image (WaveMaker)":
case "wm_link_formatter":
case "Link (WaveMaker)":
return undefined;
default:
if(!this.isDesignLoaded()){
return dojo.hitch(this.owner,col.formatFunc)("",_197,dojo.indexOf(this.columns,col),_198,{customStyles:[],customClasses:[]},row);
}
}
}
}
return undefined;
}else{
return row[_198];
}
}
return "";
},setCell:function(_199,_19a,_19b,_19c){
var item=this.dataSet.getItem(_199);
item.beginUpdate();
item.setValue(_19a,_19b);
item.endUpdate();
var row=this._data[_199];
if(row){
row[_19a]=_19b;
if(!_19c){
this.items[_199].setContent(row);
}
}
},getIsRowSelected:function(){
return !this.getEmptySelection();
},deleteRow:function(_19d){
this.dataSet.removeItem(_19d);
this._render();
},getRowCount:function(){
return this.items.length;
},addRow:function(_19e,_19f){
if(this.getRowCount()==0&&this.variable){
this.dataSet.setData([_19e]);
if(_19f){
this.select(0);
}
return;
}
var data=dojo.clone(_19e);
var v=new wm.Variable({type:this.dataSet.type});
v.setData(data);
var _1a0=this.dataSet.getCount();
this.dataSet.addItem(v);
this.dataSet.getItem(_1a0).data._new=true;
if(_19f||_19f===undefined){
this.select(_1a0);
}
},addEmptyRow:function(_1a1){
var obj={};
var _1a2=false;
for(var i=0;i<this.columns.length;i++){
var _1a3=this.columns[i];
var _1a4=_1a3.field||_1a3.id;
var _1a5=_1a4.split(".");
var _1a6=this.dataSet.type;
var type=wm.typeManager.getType(_1a6);
for(var _1a7=0;_1a7<_1a5.length;_1a7++){
if(type&&type.fields){
var _1a8=type.fields[_1a5[_1a7]];
if(_1a8){
_1a6=type.fields[_1a5[_1a7]].type;
type=wm.typeManager.getType(_1a6);
}else{
type="java.lang.String";
}
}
}
var _1a9=null;
switch(_1a6){
case "java.lang.Integer":
case "java.lang.Double":
case "java.lang.Float":
case "java.lang.Short":
_1a9=0;
break;
case "java.lang.Date":
_1a9=new Date().getTime();
_1a2=true;
break;
case "java.lang.Boolean":
_1a9=false;
break;
default:
_1a9="";
_1a2=true;
}
var _1aa=obj;
for(var _1a7=0;_1a7<_1a5.length;_1a7++){
if(_1a7+1<_1a5.length){
if(!_1aa[_1a5[_1a7]]){
_1aa[_1a5[_1a7]]={};
}
_1aa=_1aa[_1a5[_1a7]];
}else{
_1aa[_1a5[_1a7]]=_1a9;
}
}
}
this.addRow(obj,_1a1);
},getDataSet:function(){
return this.dataSet;
},setSortIndex:function(){
console.warn("setSortIndex not implemented for wm.List");
},setSortField:function(){
console.warn("setSortField not implemented for wm.List");
},setQuery:function(_1ab){
this.query=_1ab;
this.renderDataSet(this.dataSet);
},getColumnIndex:function(_1ac){
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].field==_1ac||this.columsn[i].id==_1ac){
return i;
}
}
return -1;
},getColumnShowing:function(_1ad,_1ae,_1af){
var _1b0=this.getColumnIndex(_1ad);
if(_1b0!=-1){
var c=this.columns[_1b0];
var show=this._useMobileColumn&&c.mobileColumn||!this._useMobileColumn&&c.show;
return show;
}
},setColumnShowing:function(_1b1,_1b2,_1b3){
var _1b4=this.getColumnIndex(_1b1);
if(_1b4!=-1&&this.columns[_1b4].show!=_1b2){
this.columns[_1b4].show=_1b2;
this.setColumns(this.columns);
this._setDataFields();
if(!_1b3){
this._render();
}
}
},setColumnWidth:function(_1b5,_1b6,_1b7){
this._columnsHash[_1b5].width=_1b6;
if(!_1b7){
this._render();
}
},getCellClass:function(_1b8,_1b9){
if(!this.columns){
return;
}
if(_1b8!=-1){
_1b8=this._formatIndex!=null?this._formatIndex:this.getCount();
var _1ba=this._dataFields[_1b9];
var col=this._columnsHash[_1ba];
var data=this._data[_1b8];
if(col.cssClass){
return wm.expression.getValue(col.cssClass,data,this.owner);
}
}
return "";
}});
if(wm.isMobile){
wm.DojoGrid=wm.List;
}
wm.FocusablePanelRegistry=[];
dojo.declare("wm.FocusableList",wm.List,{init:function(){
this.inherited(arguments);
wm.FocusablePanelRegistry.push(this);
dojo.connect(document,"keydown",this,"keydown");
},nextFocus:null,nextFocusableItemField:null,priorFocus:null,hasFocus:false,focusOnStart:false,focusEventTime:0,defaultFocusListIndex:0,getNextFocus:function(){
if(!(this.nextFocus instanceof Object)){
this.setNextFocus(this.nextFocus);
}
return this.nextFocus;
},setNextFocus:function(_1bb){
if(!(_1bb instanceof Object)){
var tmp=this.getRoot()[_1bb];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_1bb;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_1bc){
if(!(_1bc instanceof Object)){
this.priorFocus=this.getRoot()[_1bc];
}else{
this.priorFocus=_1bc;
}
},setFocus:function(_1bd,e){
this.focusEventTime=(e)?e.timeStamp:0;
this.hasFocus=_1bd;
if(_1bd){
this.show();
dojo.addClass(this.domNode,"wmselectedlist");
this.setBorderColor("rgb(0,0,160)");
for(var i=0;i<wm.FocusablePanelRegistry.length;i++){
if(wm.FocusablePanelRegistry[i]!=this){
wm.FocusablePanelRegistry[i].setFocus(false,e);
}
}
if(this.getSelectedIndex()==-1){
this.deselectAll(true);
if(this.defaultFocusListIndex!=-1){
this.eventSelect(this.getItem(this.defaultFocusListIndex));
}
}
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}else{
dojo.removeClass(this.domNode,"wmselectedlist");
this.setBorderColor("transparent");
}
},show:function(){
this.inherited(arguments);
var _1be=this.parent;
while(_1be&&!(_1be instanceof wm.Layer)){
_1be=_1be.parent;
}
if(this.autoShowLayer){
if(_1be&&(_1be instanceof wm.Layer)&&!_1be.active){
_1be.parent.setLayer(_1be);
}
}
},onclick:function(_1bf,_1c0){
this.inherited(arguments);
this.setFocus(true,_1bf);
},eventSelect:function(_1c1){
if(this.nextFocusableItemField){
var data=_1c1.getData();
var _1c2=new wm.Object();
_1c2.data=data;
var next=_1c2.getValue("data."+this.nextFocusableItemField);
if(next){
this.setNextFocus(next);
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}
}
this.inherited(arguments);
},keydown:function(e){
if(e.target&&e.target.nodeName.toLowerCase()=="input"){
return;
}
if(!this.hasFocus||this.focusEventTime==e.timeStamp){
return;
}
if(e.ctrlKey||e.shiftKey){
return;
}
if(e.keyCode==dojo.keys.UP_ARROW){
var _1c3=this.getSelectedIndex();
_1c3=_1c3-1;
if(_1c3<0){
_1c3=this.getCount()+_1c3;
}
_1c3=_1c3%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_1c3));
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.DOWN_ARROW){
var _1c3=this.getSelectedIndex();
_1c3=(_1c3+1)%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_1c3));
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.RIGHT_ARROW&&this.nextFocus){
this.getNextFocus().setFocus(true,e);
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.LEFT_ARROW&&this.priorFocus){
this.deselectAll();
this.getPriorFocus().setFocus(true,e);
dojo.stopEvent(e);
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}
}
}
}
},setDataSet:function(_1c4){
this.inherited(arguments);
if(this.focusOnStart){
this.setFocus(true,0);
window.focus();
}
this.focusOnStart=false;
},hideNextChain:function(){
this.hide();
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}});
dojo.declare("wm.FocusablePanel",wm.Container,{init:function(){
this.inherited(arguments);
wm.FocusablePanelRegistry.push(this);
dojo.connect(document,"keydown",this,"keydown");
dojo.connect(this.domNode,"click",this,"onclick");
if(this.focusOnStart){
this.setFocus(true,0);
}
},autoShowLayer:false,autoFormFocus:null,nextFocus:null,priorFocus:null,hasFocus:false,focusOnStart:false,focusEventTime:0,getNextFocus:function(){
if(!(this.nextFocus instanceof Object)){
this.setNextFocus(this.nextFocus);
}
return this.nextFocus;
},setNextFocus:function(_1c5){
if(!(_1c5 instanceof Object)){
var tmp=this.getRoot()[_1c5];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_1c5;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_1c6){
if(!(this.priorFocus instanceof Object)){
this.priorFocus=this.getRoot()[_1c6];
}else{
this.priorFocus=_1c6;
}
},setFocus:function(_1c7,e){
this.focusEventTime=e.timeStamp;
this.hasFocus=_1c7;
if(_1c7){
this.show();
this.setBorderColor("rgb(0,0,160)");
if(this.autoFormFocus){
this.getRoot()[this.autoFormFocus].focus();
}
for(var i=0;i<wm.FocusablePanelRegistry.length;i++){
if(wm.FocusablePanelRegistry[i]!=this){
wm.FocusablePanelRegistry[i].setFocus(false,e);
}
}
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}else{
this.setBorderColor("transparent");
}
},show:function(){
this.inherited(arguments);
var _1c8=this.parent;
while(_1c8&&!(_1c8 instanceof wm.Layer)){
_1c8=_1c8.parent;
}
if(this.autoShowLayer){
if(_1c8&&(_1c8 instanceof wm.Layer)&&!_1c8.active){
_1c8.parent.setLayer(_1c8);
}
}
},onclick:function(_1c9,_1ca){
this.inherited(arguments);
this.setFocus(true,_1c9);
},keydown:function(e){
if(e.target&&e.target.nodeName.toLowerCase()=="input"){
return;
}
if(!this.hasFocus||this.focusEventTime==e.timeStamp){
return;
}
if(e.ctrlKey||e.shiftKey){
return;
}
if(e.keyCode==dojo.keys.RIGHT_ARROW&&this.nextFocus){
this.getNextFocus().setFocus(true,e);
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.LEFT_ARROW&&this.priorFocus){
this.getPriorFocus().setFocus(true,e);
dojo.stopEvent(e);
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}else{
if(e.keyCode==dojo.keys.ENTER||e.keyCode==dojo.keys.NUMPAD_ENTER){
this.ondblclick({},this.selectedItem);
}
}
}
},hideNextChain:function(){
this.hide();
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}});
}
