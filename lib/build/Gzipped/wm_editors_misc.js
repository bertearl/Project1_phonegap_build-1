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

dojo.provide("wm.compressed.wm_editors_misc");
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
var _1=this.dataSet;
if(!_1&&this.formField){
var _2=this.getParentForm();
if(_2){
_1=_2.dataSet;
}
if(_1){
var _3=_1._dataSchema;
var _4=_3[this.formField];
if(_4){
var _5=_4.type;
var _6=wm.typeManager.getDisplayField(_5);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_1&&_1.type){
var _5=_1.type;
var _6=wm.typeManager.getDisplayField(_5);
}
}
if(_6){
return this.setDisplayField(_6);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _7=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_7){
app.debugDialog.endLogEvent(_7);
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
var _8=this.dataValue;
var _9=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_8,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_8);
}else{
this.setDisplayValue(_9);
}
this.endEditUpdate();
if(!this._cupdating){
var _9=this.getDisplayValue();
if(_9!=this.displayValue){
this.changed();
}
}
},formatData:function(_a){
try{
if(this._formatter){
return this._formatter.format(_a);
}else{
if(this.displayType){
var _b=wm.getFormatter(this.displayType);
this._formatter=new _b({name:"format",owner:this});
return this._formatter.format(_a);
}else{
return _a;
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
},setDataSet:function(_c){
this.dataSet=_c;
if(_c&&_c.type!=this.selectedItem.type){
this.selectedItem.setType(_c.type);
}
var _d=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_e){
this.displayField=_e;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_f){
this.displayExpression=_f;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_10){
if(_10=="All Fields"){
this.dataField="";
}else{
this.dataField=_10;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var _11=[];
if(!this.options){
return _11;
}
var _12=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=_12.length,d;i<l;i++){
d=dojo.string.trim(String(_12[i]));
_11[i]={name:d,dataValue:d};
}
return _11;
},setOptionsVariable:function(){
var _13=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(_13);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_14){
var _15=this._cupdating;
this._cupdating=true;
if(_14){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_14;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _16=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_16){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_15){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_17){
var _18;
if(wm.isInstanceType(_17,wm.Variable)){
_18=_17;
}else{
_18=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_18.setType(this.dataSet.type);
}
_18.setData(dojo.clone(_17));
}
var de=this.displayExpression,v=_18;
var _19=de?wm.expression.getValue(de,v,this.owner):_18.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_19=this.formatData(_19);
}
return _19==null?"":String(_19);
},calcIsDirty:function(_1a,_1b){
var _1c="";
var _1d="";
if(this.dataField){
_1c=dojo.isArray(_1a)?_1a.join(","):String(_1a||"");
_1d=dojo.isArray(_1b)?_1b.join(","):String(_1b||"");
return _1c!=_1d;
}
if(_1a instanceof wm.Variable&&_1a.isList||dojo.isArray(_1a)){
var _1e=_1a instanceof wm.Variable?_1a.getCount():_1a.length;
for(var i=0;i<_1e;i++){
if(i){
_1c+=",";
}
_1c+=this._getDisplayData(_1a instanceof wm.Variable?_1a.getItem(i):_1a[i]);
}
}else{
if(_1a!==null&&typeof _1a=="object"){
_1c=this._getDisplayData(_1a);
}else{
if(_1a==null){
_1c="";
}else{
_1c=_1a;
}
}
}
if(_1b instanceof wm.Variable&&_1b.isList||dojo.isArray(_1b)){
var _1e=_1b instanceof wm.Variable?_1b.getCount():_1b.length;
for(var i=0;i<_1e;i++){
if(i){
_1d+=",";
}
_1d+=this._getDisplayData(_1b instanceof wm.Variable?_1b.getItem(i):_1b[i]);
}
}else{
if(_1b!==null&&typeof _1b=="object"){
_1d=this._getDisplayData(_1b);
}else{
if(_1b==null){
_1d="";
}else{
_1d=_1b;
}
}
}
return _1c!=_1d;
},setEditorValue:function(_1f){
this._setEditorValue(_1f,false);
this.updateReadonlyValue();
},setDisplayValue:function(_20){
this._setEditorValue(_20,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_21,_22){
var _23=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_21;
return;
}
this.beginEditUpdate();
try{
var _24=this._lastValue;
var _25=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_25;
this._lastValue=_24;
if(_21 instanceof wm.Variable){
_21=_21.getData();
}
var _26;
if(!_22&&this.dataField){
_26=this.dataField;
}else{
if(!this.displayExpression){
_26=this.displayField;
}
}
if(_26||this.displayExpression){
if(!dojo.isArray(_21)){
_21=_21===undefined||_21===null?[]:[_21];
}
var _27;
_27=_21.length;
var _28=this.dataSet.getCount();
if(_28==0){
this.dataValue=this._multiSelect?_21:_21[0];
}else{
for(var i=0;i<_27;i++){
var _29=dojo.isArray(_21)?_21[i]:_21;
var _2a;
if(_26&&_29!==null&&typeof _29=="object"){
_2a=_29 instanceof wm.Variable?_29.getValue(_26):_29[_26];
}else{
if(!_26&&_29!==null&&typeof _29=="object"){
_2a=this._getDisplayData(_29);
}else{
_2a=_29;
}
}
var _2b=false;
for(var j=0;j<_28;j++){
var _2c=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _2d=_26?_2c.getValue(_26):this._getDisplayData(_2c);
if(_2d==_2a){
_2b=true;
this.selectItem(j);
break;
}
}
if(!_2b){
this._onSetEditorValueFailed(_21);
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
},isDataSetValueValid:function(_2e){
if(dojo.isArray(_2e)){
for(var i=0;i<_2e.length;i++){
if(_2e[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_2e instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_2f){
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
var _30=[];
if(this.dataField){
var _31=this.selectedItem.getCount();
for(var i=0;i<_31;i++){
_30.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_30=this.selectedItem.getData();
if(!dojo.isArray(_30)){
_30=[_30];
}
}
if(!this._multiSelect&&_30){
var _30=_30[0];
return (_30||_30===0)?_30:this.makeEmptyValue();
}else{
return _30;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _32="";
var _33=this.selectedItem.getCount();
for(var i=0;i<_33;i++){
if(i){
_32+=", ";
}
_32+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _32;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_34){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _35=this.editor;
if(this.dijits){
var _36=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_35);
},_createEditor:function(_37){
this.editor=_37;
this.readOnlyNode=_37;
this.editor.className="wmCheckboxSet";
var _38="";
if(this.dataSet){
var _39=this.dataSet.getCount();
for(var i=0;i<_39;i++){
var _3a=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
_38+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
_38+="<label class='wmeditor-caption'>"+this._getDisplayData(_3a)+"</label></div>";
}else{
_38+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(_3a)+"</label></div>";
}
}
this.editor.innerHTML=_38;
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
var _3b=this;
dojo.forEach(this.dijits,function(_3c){
_3b.connect(_3c,"onChange",_3b,"changed");
_3b.connect(_3c,"onFocus",_3b,"_onEditorFocused");
_3b.connect(_3c,"onBlur",_3b,"_onEditorBlurred");
_3c.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_3d){
var _3e=_3d.touches?_3d.touches[0].target:_3d.target;
while(_3e&&_3e!=this.domNode&&!dojo.hasClass(_3e,"wmCheckboxSetItem")){
_3e=_3e.parentNode;
}
if(!_3e||_3e==this.domNode){
return;
}
return _3e;
},onTouchStart:function(_3f){
this.inherited(arguments);
var _40=this._touchCheckboxNode=this._getTouchNode(_3f);
if(_40&&dojo.hasClass(_40,"wmCheckboxSetItem")){
dojo.addClass(_40.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_41,_42,_43,_44,_45,_46,_47){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_43)>5||Math.abs(_46)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_48,_49){
this.inherited(arguments);
if(!_49&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _4a=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_4a!=-1){
this.dijits[_4a].set("checked",!this.dijits[_4a].get("checked"));
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
var _4b=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
_4b.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(_4b);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_4c){
var _4d=this.readonly;
this.readonly=Boolean(_4c);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _4e=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_4e){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_4d){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_4f){
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
},selectItem:function(_50){
if(!this.dijits){
return;
}
this.dijits[_50].set("checked",true,false);
this.dijits[_50]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_51){
if(_51&&_51.readonly){
delete _51.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_52){
this.selectionMode=_52;
if(this.grid){
this.grid.setSelectionMode(_52);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_53){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
}
delete this._typeWas;
},setDataSet:function(_54){
var _55;
if(this._typeWas){
_55=this._typeWas;
}else{
_55=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_54&&_54.type!=_55){
this.createEditor();
}
var _56=this.dataValue;
this.grid.setDataSet(_54);
this._inSetDataValue=true;
this.setEditorValue(_56);
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
},setShowSearchBar:function(_57){
this.showSearchBar=Boolean(_57);
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
},filterList:function(_58,_59){
var _5a=this.grid.getRowCount();
var _5b={};
if(_58){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_5b[this.grid.columns[i].field]="*"+_58+"*";
}
this.grid.setQuery(_5b);
},_createEditor:function(_5c){
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
},setReadonly:function(_5d){
},setDeleteColumn:function(_5e){
this.deleteColumn=_5e;
if(this.grid){
this.grid.setDeleteColumn(_5e);
}
},setDeleteConfirm:function(_5f){
this.deleteConfirm=_5f;
if(this.grid){
this.grid.deleteConfirm=_5f;
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
},selectItem:function(_60){
this.grid.setSelectedRow(_60);
},onRowDeleted:function(_61,_62){
}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_63,_64){
var _65=this.containerNode;
if(_64&&typeof _64=="number"){
var _66=this.getChildren();
if(_66&&_66.length>=_64){
_65=_66[_64-1].domNode;
_64="after";
}
}
dojo.place(_63.domNode,_65,_64);
if(this._started&&!_63._started){
_63.startup();
}
},removeChild:function(_67){
if(typeof _67=="number"){
_67=this.getChildren()[_67];
}
if(_67){
var _68=_67.domNode;
if(_68&&_68.parentNode){
_68.parentNode.removeChild(_68);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_69){
dojo.forEach(this.getChildren(),function(_6a){
_6a.destroyRecursive(_69);
});
},_getSiblingOfChild:function(_6b,dir){
var _6c=_6b.domNode,_6d=(dir>0?"nextSibling":"previousSibling");
do{
_6c=_6c[_6d];
}while(_6c&&(_6c.nodeType!=1||!dijit.byNode(_6c)));
return _6c&&dijit.byNode(_6c);
},getIndexOfChild:function(_6e){
return dojo.indexOf(this.getChildren(),_6e);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_6f){
_6f.startup();
});
this.inherited(arguments);
}});
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
var _70=this.dropDown,_71=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_71){
if(dojo.hasClass(t,"dijitPopup")){
_71=true;
}else{
t=t.parentNode;
}
}
if(_71){
t=e.target;
if(_70.onItemClick){
var _72;
while(t&&!(_72=dijit.byNode(t))){
t=t.parentNode;
}
if(_72&&_72.onClick&&_72.getParent){
_72.getParent().onItemClick(_72,e);
}
}
return;
}
}
}
if(this._opened&&_70.focus&&_70.autoFocus!==false){
window.setTimeout(dojo.hitch(_70,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _73={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_73+"ArrowButton");
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
var d=this.dropDown,_74=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_74.tagName||"").toLowerCase()!=="input"||(_74.type&&_74.type.toLowerCase()!=="text"))))){
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
var _75=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_75);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_76){
_76();
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
var _77=this.dropDown,_78=_77.domNode,_79=this._aroundNode||this.domNode,_7a=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_78.style.width){
this._explicitDDWidth=true;
}
if(_78.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _7b={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_7b.width="";
}
if(!this._explicitDDHeight){
_7b.height="";
}
dojo.style(_78,_7b);
var _7c=this.maxHeight;
if(_7c==-1){
var _7d=dojo.window.getBox(),_7e=dojo.position(_79,false);
_7c=Math.floor(Math.max(_7e.y,_7d.h-(_7e.y+_7e.h)));
}
if(_77.startup&&!_77._started){
_77.startup();
}
dijit.popup.moveOffScreen(_77);
var mb=dojo._getMarginSize(_78);
var _7f=(_7c&&mb.h>_7c);
dojo.style(_78,{overflowX:"hidden",overflowY:_7f?"auto":"hidden"});
if(_7f){
mb.h=_7c;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_79.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_79.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_77.resize)){
_77.resize(mb);
}else{
dojo.marginBox(_78,mb);
}
}
var _80=dijit.popup.open({parent:this,popup:_77,around:_79,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_7a.closeDropDown(true);
},onCancel:function(){
_7a.closeDropDown(true);
},onClose:function(){
dojo.attr(_7a._popupStateNode,"popupActive",false);
dojo.removeClass(_7a._popupStateNode,"dijitHasDropDownOpen");
_7a._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_7a._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _80;
},closeDropDown:function(_81){
if(this._opened){
if(_81){
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
for(var _82=this.domNode;_82.parentNode;_82=_82.parentNode){
var _83=dijit.byNode(_82);
if(_83&&typeof _83._onSubmit=="function"){
_83._onSubmit(e);
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
},_fillContent:function(_84){
if(_84&&(!this.params||!("label" in this.params))){
this.set("label",_84.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_85){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_85);
},_setLabelAttr:function(_86){
this._set("label",_86);
this.containerNode.innerHTML=_86;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _87=this.iconClass||"dijitNoIcon",_88=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_88,_87);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),_fillContent:function(){
if(this.srcNodeRef){
var _89=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_89[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _8a=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_8a);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _8b=this.dropDown;
return (!!_8b&&(!_8b.href||_8b.isLoaded));
},loadDropDown:function(){
var _8c=this.dropDown;
if(!_8c){
return;
}
if(!this.isLoaded()){
var _8d=dojo.connect(_8c,"onLoad",this,function(){
dojo.disconnect(_8d);
this.openDropDown();
});
_8c.refresh();
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
},focus:function(_8e){
if(!this.disabled){
dijit.focus(_8e=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_8f,_90){
this._set("checked",_8f);
dojo.attr(this.focusNode||this.domNode,"checked",_8f);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_8f);
this._handleOnChange(_8f,_90);
},setChecked:function(_91){
dojo.deprecated("setChecked("+_91+") is deprecated. Use set('checked',"+_91+") instead.","","2.0");
this.set("checked",_91);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
}
if(!dojo._hasResource["dijit.form.CheckBox"]){
dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdojoAttachPoint=\"focusNode\"\n\t \tdojoAttachEvent=\"onclick:_onClick\"\n/></div>\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_92){
this._set("readOnly",_92);
dojo.attr(this.focusNode,"readOnly",_92);
dijit.setWaiState(this.focusNode,"readonly",_92);
},_setValueAttr:function(_93,_94){
if(typeof _93=="string"){
this._set("value",_93);
dojo.attr(this.focusNode,"value",_93);
_93=true;
}
if(this._created){
this.set("checked",_93,_94);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_95){
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
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_96){
this.inherited(arguments);
if(!this._created){
return;
}
if(_96){
var _97=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_98){
if(_98.name==_97.name&&_98!=_97.focusNode&&_98.form==_97.focusNode.form){
var _99=dijit.getEnclosingWidget(_98);
if(_99&&_99.checked){
_99.set("checked",false);
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
},_createEditor:function(_9a,_9b){
var e=new dijit.form.CheckBox(this.getEditorProps(_9a,_9b));
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
var _9c=this.editorNode;
var _9d=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
_9c.style.width=_9d+"px";
_9c.style.height=_9d+"px";
var _9e=parseInt(_9c.style.lineHeight);
_9c.style.marginTop=(Math.floor(_9e-_9d)/2)+"px";
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
},setChecked:function(_9f){
this.editor.set("checked",_9f,false);
if(!this._cupdating){
this.changed();
}
},getDisplayValue:function(){
return this.getDataValue();
},setDisplayValue:function(_a0){
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
},getTypedValue:function(_a1){
var v=_a1;
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
},setEditorValue:function(_a2){
this._setEditorValueCalled=true;
if(this.editor){
var _a3=this.getChecked();
this.editor.set("checked",Boolean(_a2),false);
if(_a3!=Boolean(_a2)){
this.changed();
}
}
},updateReadonlyValue:function(){
},setStartChecked:function(_a4){
this.startChecked=_a4;
this.createEditor();
},set_startChecked:function(_a5){
this.dataValue=Boolean(_a5);
this.setStartChecked(_a5);
},setDataType:function(_a6){
this.dataType=_a6;
if(_a6=="boolean"){
this.displayValue=true;
}
switch(_a6){
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
},setDisabled:function(_a7){
this.inherited(arguments);
if(!this.editor){
return;
}
this.editor.set("disabled",this.readonly||this._disabled);
},setReadonly:function(_a8){
this.readonly=_a8;
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
var _a9=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
var _aa=64;
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 40;
}else{
if(this.captionSize.match(/\%/)){
return _a9+_aa;
}else{
return _a9+4+parseInt(this.captionSize);
}
}
}});
}
if(!dojo._hasResource["dijit.form.RadioButton"]){
dojo._hasResource["dijit.form.RadioButton"]=true;
dojo.provide("dijit.form.RadioButton");
}
if(!dojo._hasResource["wm.base.widget.Editors.Radiobutton"]){
dojo._hasResource["wm.base.widget.Editors.Radiobutton"]=true;
dojo.provide("wm.base.widget.Editors.Radiobutton");
dojo.declare("wm.RadioSet",wm.CheckboxSet,{singleLine:false,_multiSelect:false,_dijitClass:"dijit.form.RadioButton",setDataSet:function(_ab){
this.inherited(arguments);
this.createEditor();
},changed:function(){
if(!this.dijits){
return;
}
var _ac=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
this.selectedItem.setData(this.dataSet.getItem(i));
this._dataValueValid=false;
wm.AbstractEditor.prototype.changed.call(this);
this._dataValueValid=true;
return;
}
}
}});
dojo.declare("wm.RadioButton",wm.Checkbox,{radioGroup:"default",dataType:"string",_createEditor:function(_ad,_ae){
var e=new dijit.form.RadioButton(this.getEditorProps(_ad,_ae));
if(wm.isMobile){
}
return e;
},getEditorProps:function(_af,_b0){
return dojo.mixin(this.inherited(arguments),{name:this.radioGroup},_b0||{});
},connectEditor:function(){
this.inherited(arguments);
this.addEditorConnect(this.domNode,"ondblclick",this,function(){
this.onDblClick();
});
},setInitialValue:function(){
this.beginEditUpdate();
var _b1=false;
var g=this.getGroup();
for(var i=0;i<g.length;i++){
var o=g[i].owner;
if(o._setEditorValueCalled){
_b1=true;
this.valueChanged("groupValue",this.groupValue=o.groupValue);
break;
}
}
if(this.startChecked&&!_b1||this.groupValue==this.checkedValue){
this.setChecked(true);
}
this.endEditUpdate();
},getChecked:function(){
if(this.editor){
return Boolean(this.editor.checked);
}else{
return this.groupValue==this.checkedValue;
}
},setEditorValue:function(_b2){
if(_b2==this.checkedValue){
if(this.editor){
this.editor.set("checked",true);
this.updateGroupValue();
this._lastValue=this.checkedValue;
}else{
this.groupValue=this.checkedValue;
this._lastValue=this.checkedValue;
}
var _b3=this.getGroup();
for(var i=0,v,o;(v=_b3[i]);i++){
if(v.owner&&v.owner!=this){
v.owner._lastValue=this.makeEmptyValue();
}
}
}else{
var _b4=false;
var _b3=this.getGroup(),gv=this.getGroupValue();
for(var i=0,v,o;(v=_b3[i]);i++){
if(v){
o=v.owner;
if(o.checkedValue==_b2){
o.setEditorValue(_b2);
o._lastValue=_b2;
_b4=true;
break;
}else{
o._lastValue=this.makeEmptyValue();
}
}
}
if(!_b4){
for(var i=0,v,o;(v=_b3[i]);i++){
if(v){
o=v.owner;
if(o.getChecked()){
o.setChecked(false);
this.updateGroupValue();
return;
}
}
}
}
}
this._setEditorValueCalled=true;
},setRadioGroup:function(_b5){
this.radioGroup=_b5?wm.getValidJsName(_b5):"";
var _b6=this.getGroup();
if(_b6.length){
this.dataType=_b6[0].dataType;
}
this.createEditor();
wm.fire(studio.inspector,"reinspect");
},getGroup:function(){
var _b7=[];
var _b8=dojo.query("input[type=radio][name="+(this.radioGroup||"default")+"]");
_b8.forEach(function(_b9,_ba,_bb){
_b7[_ba]=dijit.getEnclosingWidget(_b9);
});
return _b7;
},updateGroupValue:function(){
var _bc=this.getGroup(),gv=this.getGroupValue();
for(var i=0,v,o;(v=_bc[i]);i++){
if(v){
o=v.owner;
if(o){
if(o.groupValue!=gv){
o.groupValue=gv;
o.valueChanged("groupValue",gv);
o.onGroupValueChange(gv);
}
}
}
}
},onGroupValueChange:function(_bd){
},setGroupValue:function(_be){
this.setEditorValue(_be);
},getGroupValue:function(){
var _bf=this.getGroup();
for(var i=0,v;(v=_bf[i]);i++){
if(v.checked){
return v.owner.checkedValue;
}
}
for(var i=0,v;(v=_bf[i]);i++){
return v.owner.makeEmptyValue();
}
},isLoading:function(){
var l=this.inherited(arguments);
if(!l){
var _c0=this.getGroup();
for(var i=0,v,gl;(v=_c0[i]);i++){
gl=v.owner._rendering;
if(gl){
return true;
}
}
}
return l;
},setDataType:function(_c1){
this.inherited(arguments);
var _c2=this.getGroup();
for(var i=0,v;(v=_c2[i]);i++){
v.dataType=_c1;
}
},setStartChecked:function(_c3){
if(_c3){
var _c4=this.getGroup();
for(var i=0,v,r;(v=_c4[i]);i++){
if(v!=this){
v.owner.setStartChecked(false);
}
}
}
this.inherited(arguments);
},setChecked:function(_c5){
this.inherited(arguments);
if(this._cupdating&&_c5){
this.updateGroupValue();
this._setEditorValueCalled=true;
}
},editorChanged:function(){
this.inherited(arguments);
this.updateGroupValue();
return true;
},onDblClick:function(){
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_c6,_c7){
return new dojo.dnd.move.constrainedMoveable(_c7,_c6);
},constructor:function(_c8,_c9){
if(!_c9){
_c9={};
}
this.constraints=_c9.constraints;
this.within=_c9.within;
},onFirstMove:function(_ca){
var c=this.constraintBox=this.constraints.call(this,_ca);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_ca.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_cb,_cc){
var c=this.constraintBox,s=_cb.node.style;
this.onMoving(_cb,_cc);
_cc.l=_cc.l<c.l?c.l:c.r<_cc.l?c.r:_cc.l;
_cc.t=_cc.t<c.t?c.t:c.b<_cc.t?c.b:_cc.t;
s.left=_cc.l+"px";
s.top=_cc.t+"px";
this.onMoved(_cb,_cc);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_cd,_ce){
return new dojo.dnd.move.boxConstrainedMoveable(_ce,_cd);
},constructor:function(_cf,_d0){
var box=_d0&&_d0.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_d1,_d2){
return new dojo.dnd.move.parentConstrainedMoveable(_d2,_d1);
},constructor:function(_d3,_d4){
var _d5=_d4&&_d4.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_d5=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_d5=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_d5=="padding"){
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
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_d6,_d7){
_d7=dojo.mixin({},_d7||{});
var _d8=dojo.i18n.normalizeLocale(_d7.locale),_d9=dojo.i18n.getLocalization("dojo.cldr","number",_d8);
_d7.customs=_d9;
var _da=_d7.pattern||_d9[(_d7.type||"decimal")+"Format"];
if(isNaN(_d6)||Math.abs(_d6)==Infinity){
return null;
}
return dojo.number._applyPattern(_d6,_da,_d7);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_db,_dc,_dd){
_dd=_dd||{};
var _de=_dd.customs.group,_df=_dd.customs.decimal,_e0=_dc.split(";"),_e1=_e0[0];
_dc=_e0[(_db<0)?1:0]||("-"+_e1);
if(_dc.indexOf("%")!=-1){
_db*=100;
}else{
if(_dc.indexOf("‰")!=-1){
_db*=1000;
}else{
if(_dc.indexOf("¤")!=-1){
_de=_dd.customs.currencyGroup||_de;
_df=_dd.customs.currencyDecimal||_df;
_dc=_dc.replace(/\u00a4{1,3}/,function(_e2){
var _e3=["symbol","currency","displayName"][_e2.length-1];
return _dd[_e3]||_dd.currency||"";
});
}else{
if(_dc.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _e4=dojo.number._numberPatternRE;
var _e5=_e1.match(_e4);
if(!_e5){
throw new Error("unable to find a number expression in pattern: "+_dc);
}
if(_dd.fractional===false){
_dd.places=0;
}
return _dc.replace(_e4,dojo.number._formatAbsolute(_db,_e5[0],{decimal:_df,group:_de,places:_dd.places,round:_dd.round}));
};
dojo.number.round=function(_e6,_e7,_e8){
var _e9=10/(_e8||10);
return (_e9*+_e6).toFixed(_e7)/_e9;
};
if((0.9).toFixed()==0){
(function(){
var _ea=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _ea(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_eb,_ec,_ed){
_ed=_ed||{};
if(_ed.places===true){
_ed.places=0;
}
if(_ed.places===Infinity){
_ed.places=6;
}
var _ee=_ec.split("."),_ef=typeof _ed.places=="string"&&_ed.places.indexOf(","),_f0=_ed.places;
if(_ef){
_f0=_ed.places.substring(_ef+1);
}else{
if(!(_f0>=0)){
_f0=(_ee[1]||[]).length;
}
}
if(!(_ed.round<0)){
_eb=dojo.number.round(_eb,_f0,_ed.round);
}
var _f1=String(Math.abs(_eb)).split("."),_f2=_f1[1]||"";
if(_ee[1]||_ed.places){
if(_ef){
_ed.places=_ed.places.substring(0,_ef);
}
var pad=_ed.places!==undefined?_ed.places:(_ee[1]&&_ee[1].lastIndexOf("0")+1);
if(pad>_f2.length){
_f1[1]=dojo.string.pad(_f2,pad,"0",true);
}
if(_f0<_f2.length){
_f1[1]=_f2.substr(0,_f0);
}
}else{
if(_f1[1]){
_f1.pop();
}
}
var _f3=_ee[0].replace(",","");
pad=_f3.indexOf("0");
if(pad!=-1){
pad=_f3.length-pad;
if(pad>_f1[0].length){
_f1[0]=dojo.string.pad(_f1[0],pad);
}
if(_f3.indexOf("#")==-1){
_f1[0]=_f1[0].substr(_f1[0].length-pad);
}
}
var _f4=_ee[0].lastIndexOf(","),_f5,_f6;
if(_f4!=-1){
_f5=_ee[0].length-_f4-1;
var _f7=_ee[0].substr(0,_f4);
_f4=_f7.lastIndexOf(",");
if(_f4!=-1){
_f6=_f7.length-_f4-1;
}
}
var _f8=[];
for(var _f9=_f1[0];_f9;){
var off=_f9.length-_f5;
_f8.push((off>0)?_f9.substr(off):_f9);
_f9=(off>0)?_f9.slice(0,off):"";
if(_f6){
_f5=_f6;
delete _f6;
}
}
_f1[0]=_f8.reverse().join(_ed.group||",");
return _f1.join(_ed.decimal||".");
};
dojo.number.regexp=function(_fa){
return dojo.number._parseInfo(_fa).regexp;
};
dojo.number._parseInfo=function(_fb){
_fb=_fb||{};
var _fc=dojo.i18n.normalizeLocale(_fb.locale),_fd=dojo.i18n.getLocalization("dojo.cldr","number",_fc),_fe=_fb.pattern||_fd[(_fb.type||"decimal")+"Format"],_ff=_fd.group,_100=_fd.decimal,_101=1;
if(_fe.indexOf("%")!=-1){
_101/=100;
}else{
if(_fe.indexOf("‰")!=-1){
_101/=1000;
}else{
var _102=_fe.indexOf("¤")!=-1;
if(_102){
_ff=_fd.currencyGroup||_ff;
_100=_fd.currencyDecimal||_100;
}
}
}
var _103=_fe.split(";");
if(_103.length==1){
_103.push("-"+_103[0]);
}
var re=dojo.regexp.buildGroupRE(_103,function(_104){
_104="(?:"+dojo.regexp.escapeString(_104,".")+")";
return _104.replace(dojo.number._numberPatternRE,function(_105){
var _106={signed:false,separator:_fb.strict?_ff:[_ff,""],fractional:_fb.fractional,decimal:_100,exponent:false},_107=_105.split("."),_108=_fb.places;
if(_107.length==1&&_101!=1){
_107[1]="###";
}
if(_107.length==1||_108===0){
_106.fractional=false;
}else{
if(_108===undefined){
_108=_fb.pattern?_107[1].lastIndexOf("0")+1:Infinity;
}
if(_108&&_fb.fractional==undefined){
_106.fractional=true;
}
if(!_fb.places&&(_108<_107[1].length)){
_108+=","+_107[1].length;
}
_106.places=_108;
}
var _109=_107[0].split(",");
if(_109.length>1){
_106.groupSize=_109.pop().length;
if(_109.length>1){
_106.groupSize2=_109.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_106)+")";
});
},true);
if(_102){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_10a,_10b,_10c,_10d){
var prop=["symbol","currency","displayName"][_10c.length-1],_10e=dojo.regexp.escapeString(_fb[prop]||_fb.currency||"");
_10b=_10b?"[\\s\\xa0]":"";
_10d=_10d?"[\\s\\xa0]":"";
if(!_fb.strict){
if(_10b){
_10b+="*";
}
if(_10d){
_10d+="*";
}
return "(?:"+_10b+_10e+_10d+")?";
}
return _10b+_10e+_10d;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_ff,decimal:_100,factor:_101};
};
dojo.number.parse=function(_10f,_110){
var info=dojo.number._parseInfo(_110),_111=(new RegExp("^"+info.regexp+"$")).exec(_10f);
if(!_111){
return NaN;
}
var _112=_111[1];
if(!_111[1]){
if(!_111[2]){
return NaN;
}
_112=_111[2];
info.factor*=-1;
}
_112=_112.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _112*info.factor;
};
dojo.number._realNumberRegexp=function(_113){
_113=_113||{};
if(!("places" in _113)){
_113.places=Infinity;
}
if(typeof _113.decimal!="string"){
_113.decimal=".";
}
if(!("fractional" in _113)||/^0/.test(_113.places)){
_113.fractional=[true,false];
}
if(!("exponent" in _113)){
_113.exponent=[true,false];
}
if(!("eSigned" in _113)){
_113.eSigned=[true,false];
}
var _114=dojo.number._integerRegexp(_113),_115=dojo.regexp.buildGroupRE(_113.fractional,function(q){
var re="";
if(q&&(_113.places!==0)){
re="\\"+_113.decimal;
if(_113.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_113.places+"}";
}
}
return re;
},true);
var _116=dojo.regexp.buildGroupRE(_113.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_113.eSigned})+")";
}
return "";
});
var _117=_114+_115;
if(_115){
_117="(?:(?:"+_117+")|(?:"+_115+"))";
}
return _117+_116;
};
dojo.number._integerRegexp=function(_118){
_118=_118||{};
if(!("signed" in _118)){
_118.signed=[true,false];
}
if(!("separator" in _118)){
_118.separator="";
}else{
if(!("groupSize" in _118)){
_118.groupSize=3;
}
}
var _119=dojo.regexp.buildGroupRE(_118.signed,function(q){
return q?"[-+]":"";
},true);
var _11a=dojo.regexp.buildGroupRE(_118.separator,function(sep){
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
var grp=_118.groupSize,grp2=_118.groupSize2;
if(grp2){
var _11b="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_11b+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_11b;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _119+_11a;
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
var _11c=dojo.position(this.sliderBarContainer,true);
var _11d=e[this._mousePixelCoord]-_11c[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_11c[this._pixelCount]-_11d):_11d,_11c[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_11e,_11f,_120){
if(this.dynamicSlider){
var now=new Date().getTime();
if(!this._dynamicSliderTimestamp||this._dynamicSliderTimestamp+100<now){
_120=true;
this._dynamicSliderTimestamp=now;
if(this.domNode&&this.domNode.id){
wm.cancelJob(this.domNode.id+"._setPixelValue");
}
}else{
if(this.domNode&&this.domNode.id){
var self=this;
wm.job(this.domNode.id+"._setPixelValue",60,function(){
self._setValueAttr((this.maximum-this.minimum)*_121/_122+this.minimum,true);
});
}
}
}
if(this.disabled||this.readOnly){
return;
}
_11e=_11e<0?0:_11f<_11e?_11f:_11e;
var _122=this.discreteValues;
if(_122<=1||_122==Infinity){
_122=_11f;
}
_122--;
var _123=_11f/_122;
var _121=Math.round(_11e/_123);
this._setValueAttr((this.maximum-this.minimum)*_121/_122+this.minimum,_120);
},_setValueAttr:function(_124,_125){
this._set("value",_124);
this.valueNode.value=_124;
dijit.setWaiState(this.focusNode,"valuenow",_124);
this.inherited(arguments);
var _126=(_124-this.minimum)/(this.maximum-this.minimum);
var _127=(this._descending===false)?this.remainingBar:this.progressBar;
var _128=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_125&&this.slideDuration>0&&_127.style[this._progressPixelSize]){
var _129=this;
var _12a={};
var _12b=parseFloat(_127.style[this._progressPixelSize]);
var _12c=this.slideDuration*(_126-_12b/100);
if(_12c==0){
return;
}
if(_12c<0){
_12c=0-_12c;
}
_12a[this._progressPixelSize]={start:_12b,end:_126*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_127,duration:_12c,onAnimate:function(v){
_128.style[_129._progressPixelSize]=(100-parseFloat(v[_129._progressPixelSize]))+"%";
},onEnd:function(){
delete _129._inProgressAnim;
},properties:_12a});
this._inProgressAnim.play();
}else{
_127.style[this._progressPixelSize]=(_126*100)+"%";
_128.style[this._progressPixelSize]=((1-_126)*100)+"%";
}
},_bumpValue:function(_12d,_12e){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _12f=this.discreteValues;
if(_12f<=1||_12f==Infinity){
_12f=c[this._pixelCount];
}
_12f--;
var _130=(this.value-this.minimum)*_12f/(this.maximum-this.minimum)+_12d;
if(_130<0){
_130=0;
}
if(_130>_12f){
_130=_12f;
}
_130=_130*(this.maximum-this.minimum)/_12f+this.minimum;
this._setValueAttr(_130,_12e);
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
var _131=!dojo.isMozilla;
var _132=evt[(_131?"wheelDelta":"detail")]*(_131?1:-1);
this._bumpValue(_132<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_133){
if(this[_133.container]!=this.containerNode){
this[_133.container].appendChild(_133.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_134,_135,e){
if(_134==-1){
this._setValueAttr(this.value,true);
}else{
this[(_135==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _136=dojo.query("label[for=\""+this.id+"\"]");
if(_136.length){
_136[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_136[0].id);
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
var _137=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_137});
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
var _138=this.widget;
var _139=_138._abspos;
if(!_139){
_139=_138._abspos=dojo.position(_138.sliderBarContainer,true);
_138._setPixelValue_=dojo.hitch(_138,"_setPixelValue");
_138._isReversed_=_138._isReversed();
}
var _13a=e.touches?e.touches[0]:e,_13b=_13a[_138._mousePixelCoord]-_139[_138._startingPixelCoord];
_138._setPixelValue_(_138._isReversed_?(_139[_138._pixelCount]-_13b):_13b,_139[_138._pixelCount],false);
},onMouseUp:function(e){
this.inherited(arguments);
this.destroy();
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _13c=this.widget;
_13c._abspos=null;
_13c._setValueAttr(_13c.value,true);
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
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdojoAttachPoint=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdojoAttachPoint=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_13d){
return val;
},_arrowPressed:function(_13e,_13f,_140){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_13f*_140),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(node){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_141,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_141==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _142=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_142!==0){
var node=this[(_142>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_142,this.smallDelta);
if(!this._wheelTimer){
clearTimeout(this._wheelTimer);
}
this._wheelTimer=setTimeout(dojo.hitch(this,"_arrowReleased",node),50);
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
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_143){
var _144=typeof _143.places=="number"?_143.places:0;
if(_144){
_144++;
}
if(typeof _143.max!="number"){
_143.max=9*Math.pow(10,15-_144);
}
if(typeof _143.min!="number"){
_143.min=-9*Math.pow(10,15-_144);
}
this.inherited(arguments,[_143]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _145=this.format(val,this.constraints);
if(_145!==undefined){
this.textbox.value=_145;
}
}
this.inherited(arguments);
},format:function(_146,_147){
var _148=String(_146);
if(typeof _146!="number"){
return _148;
}
if(isNaN(_146)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_146,_147))&&_147.exponent!==false&&/\de[-+]?\d/i.test(_148)){
return _148;
}
if(this.editOptions&&this._focused){
_147=dojo.mixin({},_147,this.editOptions);
}
return this._formatter(_146,_147);
},_parser:dojo.number.parse,parse:function(_149,_14a){
var v=this._parser(_149,dojo.mixin({},_14a,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_149,_14a);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_14b){
return (_14b===null||_14b===""||_14b===undefined)?NaN:this.inherited(arguments);
},serialize:function(_14c,_14d){
return (typeof _14c!="number"||isNaN(_14c))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_14e,_14f,_150){
if(_14e!==undefined&&_150===undefined){
_150=String(_14e);
if(typeof _14e=="number"){
if(isNaN(_14e)){
_150="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_14e,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_150)){
_150=undefined;
}
}
}else{
if(!_14e){
_150="";
_14e=NaN;
}else{
_14e=undefined;
}
}
}
this.inherited(arguments,[_14e,_14f,_150]);
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
},isValid:function(_151){
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
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_152){
var tc=this.constraints,v=isNaN(val),_153=!isNaN(tc.max),_154=!isNaN(tc.min);
if(v&&_152!=0){
val=(_152>0)?_154?tc.min:_153?tc.max:0:_153?this.constraints.max:_154?tc.min:0;
}
var _155=val+_152;
if(v||isNaN(_155)){
return val;
}
if(_153&&(_155>tc.max)){
_155=tc.max;
}
if(_154&&(_155<tc.min)){
_155=tc.min;
}
return _155;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _156=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _156=="number"){
this._setValueAttr(_156,false);
}
dojo.stopEvent(e);
}
}});
}
if(!dojo._hasResource["dojo.cldr.monetary"]){
dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.getObject("cldr.monetary",true,dojo);
dojo.cldr.monetary.getData=function(code){
var _157={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _158={CHF:5};
var _159=_157[code],_15a=_158[code];
if(typeof _159=="undefined"){
_159=2;
}
if(typeof _15a=="undefined"){
_15a=0;
}
return {places:_159,round:_15a};
};
}
if(!dojo._hasResource["dojo.currency"]){
dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_15b){
_15b=_15b||{};
_15b.type="currency";
var _15c=dojo.i18n.getLocalization("dojo.cldr","currency",_15b.locale)||{};
var iso=_15b.currency;
var data=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(prop){
data[prop]=_15c[iso+"_"+prop];
});
data.fractional=[true,false];
return dojo.mixin(data,_15b);
};
dojo.currency.format=function(_15d,_15e){
return dojo.number.format(_15d,dojo.currency._mixInDefaults(_15e));
};
dojo.currency.regexp=function(_15f){
return dojo.number.regexp(dojo.currency._mixInDefaults(_15f));
};
dojo.currency.parse=function(_160,_161){
return dojo.number.parse(_160,dojo.currency._mixInDefaults(_161));
};
}
if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){
dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_162){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_162,this.editOptions)])+"|":"")+dojo.currency.regexp(_162)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_163,_164){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_163)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_165){
if(!_165.currency&&this.currency){
_165.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_165,{exponent:false}))]);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Number"]){
dojo._hasResource["wm.base.widget.Editors.Number"]=true;
dojo.provide("wm.base.widget.Editors.Number");
dijit.form.NumberTextBox.extend({format:function(_166,_167){
var _168=String(_166);
if(typeof _166!="number"){
return _168;
}
if(isNaN(_166)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_166,_167))&&_167.exponent!==false&&/de[-+]?d/i.test(_168)){
return _168;
}
_167=dojo.mixin({},_167,this.editOptions);
if(!this._focused){
delete _167.pattern;
}
return this._formatter(_166,_167);
},_refreshState:function(){
var _169=this.get("displayedValue");
var _16a=_169.indexOf(".");
if(this.editOptions.places&&this.editOptions.placeWhileTyping&&_16a!=-1){
var _16b=_169.substr(0,_16a)+"."+_169.substr(_16a+1,this.editOptions.places);
if(_16b!=_169){
this.focusNode.value=_16b;
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
var _16c={};
if(!isNaN(parseInt(this.minimum))){
_16c.min=Number(this.minimum);
}
if(!isNaN(parseInt(this.maximum))){
_16c.max=Number(this.maximum);
}
return _16c;
},getEditorProps:function(_16d,_16e){
var v=this.displayValue;
var _16f=this.getEditorConstraints();
var p=dojo.mixin(this.inherited(arguments),{constraints:_16f,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):"",editOptions:dojo.clone(dijit.form.NumberTextBox.prototype.editOptions)},_16e||{});
var _170=this._getPlaces();
if(_170!==""){
p.editOptions.places=_170;
p.editOptions.placeWhileTyping=this.applyPlacesWhileTyping;
}
return p;
},_getPlaces:function(){
if(this.places===""){
return this.places;
}else{
return Number(this.places);
}
},_createEditor:function(_171,_172){
var e;
if(this.spinnerButtons&&!wm.isMobile){
e=new dijit.form.NumberSpinner(this.getEditorProps(_171,_172));
}else{
e=new dijit.form.NumberTextBox(this.getEditorProps(_171,_172));
}
return e;
},setMaximum:function(_173){
var v=(_173==="")?"":Number(_173);
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
},setMinimum:function(_174){
var v=(_174==="")?"":Number(_174);
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
var _175={};
if(this.places&&this.places!=""){
_175.places=parseInt(this.places);
}
return _175;
},setSpinnerButtons:function(_176){
if(this.spinnerButtons!=_176){
this.spinnerButtons=_176;
this.createEditor();
}
},calcIsDirty:function(a,b){
return a!==b;
}});
dojo.declare("wm.Currency",wm.Number,{currency:"",getEditorProps:function(_177,_178){
var prop=this.inherited(arguments);
if(prop.constraints){
delete prop.constraints.pattern;
}
return dojo.mixin(prop,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD"},_178||{});
},_createEditor:function(_179,_17a){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_179,_17a));
},_getReadonlyValue:function(){
return dojo.currency.format(this.dataValue,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD",places:parseInt(this.places)});
},setEditorValue:function(_17b){
var v=_17b;
if(this.editor){
v=dojo.currency.parse(dojo.currency.format(String(v).replace(/[^0-9\-\.]/g,""),this.editor.constraints),this.editor.constraints);
}
wm.AbstractEditor.prototype.setEditorValue.call(this,v);
},getDataValue:function(){
return this.dataValue;
},editorChanged:function(){
var _17c=this.dataValue;
this.dataValue=this.getEditorValue();
var _17d=this.displayValue;
this.displayValue=this._getReadonlyValue();
var _17e=false;
if(_17c!=this._lastValue){
this.valueChanged("dataValue",this.dataValue);
_17e=true;
}
if(_17d!=this.displayValue){
this.valueChanged("displayValue",this.displayValue);
_17e=true;
}
if(_17e){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _17e;
},setCurrency:function(_17f){
this.currency=_17f;
this.createEditor();
}});
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _180=this;
dojo.mixin(_180,args);
_180.node=args.node;
_180._showArgs=dojo.mixin({},args);
_180._showArgs.node=_180.node;
_180._showArgs.duration=_180.showDuration;
_180.showAnim=_180.showFunc(_180._showArgs);
_180._hideArgs=dojo.mixin({},args);
_180._hideArgs.node=_180.node;
_180._hideArgs.duration=_180.hideDuration;
_180.hideAnim=_180.hideFunc(_180._hideArgs);
dojo.connect(_180.showAnim,"beforeBegin",dojo.hitch(_180.hideAnim,"stop",true));
dojo.connect(_180.hideAnim,"beforeBegin",dojo.hitch(_180.showAnim,"stop",true));
},show:function(_181){
return this.showAnim.play(_181||0);
},hide:function(_182){
return this.hideAnim.play(_182||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_183={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _184=function(_185){
this._index=-1;
this._animations=_185||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_184,{_onAnimate:function(){
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
},play:function(_186,_187){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_187&&this._current.status()=="playing"){
return this;
}
var _188=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_189=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_18a=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_188);
d.disconnect(_189);
d.disconnect(_18a);
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
},gotoPercent:function(_18b,_18c){
this.pause();
var _18d=this.duration*_18b;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_18d){
this._current=a;
return true;
}
_18d-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_18d/this._current.duration,_18c);
}
return this;
},stop:function(_18e){
if(this._current){
if(_18e){
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
d.extend(_184,_183);
dojo.fx.chain=function(_18f){
return new _184(_18f);
};
var _190=function(_191){
this._animations=_191||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_191,function(a){
var _192=a.duration;
if(a.delay){
_192+=a.delay;
}
if(this.duration<_192){
this.duration=_192;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var self=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(d.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
d.extend(_190,{_doAction:function(_193,args){
d.forEach(this._animations,function(a){
a[_193].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_194,args){
var t=this._pseudoAnimation;
t[_194].apply(t,args);
},play:function(_195,_196){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_197,_198){
var ms=this.duration*_197;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_198);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_199){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_190,_183);
dojo.fx.combine=function(_19a){
return new _190(_19a);
};
dojo.fx.wipeIn=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _19b=d.style(node,"height");
return Math.max(_19b,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
}
if(!dojo._hasResource["dojox.fx._base"]){
dojo._hasResource["dojox.fx._base"]=true;
dojo.provide("dojox.fx._base");
dojo.mixin(dojox.fx,{anim:dojo.anim,animateProperty:dojo.animateProperty,fadeTo:dojo._fade,fadeIn:dojo.fadeIn,fadeOut:dojo.fadeOut,combine:dojo.fx.combine,chain:dojo.fx.chain,slideTo:dojo.fx.slideTo,wipeIn:dojo.fx.wipeIn,wipeOut:dojo.fx.wipeOut});
dojox.fx.sizeTo=function(args){
var node=args.node=dojo.byId(args.node),abs="absolute";
var _19c=args.method||"chain";
if(!args.duration){
args.duration=500;
}
if(_19c=="chain"){
args.duration=Math.floor(args.duration/2);
}
var top,_19d,left,_19e,_19f,_1a0=null;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n),pos=cs.position,w=cs.width,h=cs.height;
top=(pos==abs?n.offsetTop:parseInt(cs.top)||0);
left=(pos==abs?n.offsetLeft:parseInt(cs.left)||0);
_19f=(w=="auto"?0:parseInt(w));
_1a0=(h=="auto"?0:parseInt(h));
_19e=left-Math.floor((args.width-_19f)/2);
_19d=top-Math.floor((args.height-_1a0)/2);
if(pos!=abs&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position=abs;
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
var _1a1=dojo.animateProperty(dojo.mixin({properties:{height:function(){
init();
return {end:args.height||0,start:_1a0};
},top:function(){
return {start:top,end:_19d};
}}},args));
var _1a2=dojo.animateProperty(dojo.mixin({properties:{width:function(){
return {start:_19f,end:args.width||0};
},left:function(){
return {start:left,end:_19e};
}}},args));
var anim=dojo.fx[(args.method=="combine"?"combine":"chain")]([_1a1,_1a2]);
return anim;
};
dojox.fx.slideBy=function(args){
var node=args.node=dojo.byId(args.node),top,left;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var _1a3=dojo.animateProperty(dojo.mixin({properties:{top:top+(args.top||0),left:left+(args.left||0)}},args));
dojo.connect(_1a3,"beforeBegin",_1a3,init);
return _1a3;
};
dojox.fx.crossFade=function(args){
var _1a4=args.nodes[0]=dojo.byId(args.nodes[0]),op1=dojo.style(_1a4,"opacity"),_1a5=args.nodes[1]=dojo.byId(args.nodes[1]),op2=dojo.style(_1a5,"opacity");
var _1a6=dojo.fx.combine([dojo[(op1==0?"fadeIn":"fadeOut")](dojo.mixin({node:_1a4},args)),dojo[(op1==0?"fadeOut":"fadeIn")](dojo.mixin({node:_1a5},args))]);
return _1a6;
};
dojox.fx.highlight=function(args){
var node=args.node=dojo.byId(args.node);
args.duration=args.duration||400;
var _1a7=args.color||"#ffff99",_1a8=dojo.style(node,"backgroundColor");
if(_1a8=="rgba(0, 0, 0, 0)"){
_1a8="transparent";
}
var anim=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:_1a7,end:_1a8}}},args));
if(_1a8=="transparent"){
dojo.connect(anim,"onEnd",anim,function(){
node.style.backgroundColor=_1a8;
});
}
return anim;
};
dojox.fx.wipeTo=function(args){
args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var dir=(args.width?"width":"height"),_1a9=args[dir],_1aa={};
_1aa[dir]={start:function(){
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s[dir]="1px";
s.display="";
s.visibility="";
return 1;
}else{
var now=dojo.style(node,dir);
return Math.max(now,1);
}
},end:_1a9};
var anim=dojo.animateProperty(dojo.mixin({properties:_1aa},args));
return anim;
};
}
if(!dojo._hasResource["dojox.fx"]){
dojo._hasResource["dojox.fx"]=true;
dojo.provide("dojox.fx");
}
if(!dojo._hasResource["dojox.form.RangeSlider"]){
dojo._hasResource["dojox.form.RangeSlider"]=true;
dojo.provide("dojox.form.RangeSlider");
(function(){
var _1ab=function(a,b){
return b-a;
},_1ac=function(a,b){
return a-b;
};
dojo.declare("dojox.form._RangeSliderMixin",null,{value:[0,100],postMixInProperties:function(){
this.inherited(arguments);
this.value=dojo.map(this.value,function(i){
return parseInt(i,10);
});
},postCreate:function(){
this.inherited(arguments);
this.value.sort(this._isReversed()?_1ab:_1ac);
var _1ad=this;
var _1ae=dojo.declare(dijit.form._SliderMoverMax,{constructor:function(){
this.widget=_1ad;
}});
this._movableMax=new dojo.dnd.Moveable(this.sliderHandleMax,{mover:_1ae});
dijit.setWaiState(this.focusNodeMax,"valuemin",this.minimum);
dijit.setWaiState(this.focusNodeMax,"valuemax",this.maximum);
var _1af=dojo.declare(dijit.form._SliderBarMover,{constructor:function(){
this.widget=_1ad;
}});
this._movableBar=new dojo.dnd.Moveable(this.progressBar,{mover:_1af});
},destroy:function(){
this.inherited(arguments);
this._movableMax.destroy();
this._movableBar.destroy();
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey){
return;
}
var _1b0=e.currentTarget,_1b1=false,_1b2=false,k=dojo.keys;
if(_1b0==this.sliderHandle){
_1b1=true;
}else{
if(_1b0==this.progressBar){
_1b2=_1b1=true;
}else{
if(_1b0==this.sliderHandleMax){
_1b2=true;
}
}
}
switch(e.keyCode){
case k.HOME:
this._setValueAttr(this.minimum,true,_1b2);
break;
case k.END:
this._setValueAttr(this.maximum,true,_1b2);
break;
case ((this._descending||this.isLeftToRight())?k.RIGHT_ARROW:k.LEFT_ARROW):
case (this._descending===false?k.DOWN_ARROW:k.UP_ARROW):
case (this._descending===false?k.PAGE_DOWN:k.PAGE_UP):
if(_1b1&&_1b2){
this._bumpValue([{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":true},{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":false}]);
}else{
if(_1b1){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1,true);
}else{
if(_1b2){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1);
}
}
}
break;
case ((this._descending||this.isLeftToRight())?k.LEFT_ARROW:k.RIGHT_ARROW):
case (this._descending===false?k.UP_ARROW:k.DOWN_ARROW):
case (this._descending===false?k.PAGE_UP:k.PAGE_DOWN):
if(_1b1&&_1b2){
this._bumpValue([{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:false},{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:true}]);
}else{
if(_1b1){
this._bumpValue(e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1);
}else{
if(_1b2){
this._bumpValue(e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,true);
}
}
}
break;
default:
dijit.form._FormValueWidget.prototype._onKeyPress.apply(this,arguments);
this.inherited(arguments);
return;
}
dojo.stopEvent(e);
},_onHandleClickMax:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.sliderHandleMax);
}
dojo.stopEvent(e);
},_onClkIncBumper:function(){
this._setValueAttr(this._descending===false?this.minimum:this.maximum,true,true);
},_bumpValue:function(_1b3,_1b4){
var _1b5=dojo.isArray(_1b3)?[this._getBumpValue(_1b3[0].change,_1b3[0].useMaxValue),this._getBumpValue(_1b3[1].change,_1b3[1].useMaxValue)]:this._getBumpValue(_1b3,_1b4);
this._setValueAttr(_1b5,true,!dojo.isArray(_1b3)&&((_1b3>0&&!_1b4)||(_1b4&&_1b3<0)));
},_getBumpValue:function(_1b6,_1b7){
var s=dojo.getComputedStyle(this.sliderBarContainer),c=dojo._getContentBox(this.sliderBarContainer,s),_1b8=this.discreteValues,_1b9=!_1b7?this.value[0]:this.value[1];
if(_1b8<=1||_1b8==Infinity){
_1b8=c[this._pixelCount];
}
_1b8--;
if((this._isReversed()&&_1b6<0)||(_1b6>0&&!this._isReversed())){
_1b9=!_1b7?this.value[1]:this.value[0];
}
var _1ba=(_1b9-this.minimum)*_1b8/(this.maximum-this.minimum)+_1b6;
if(_1ba<0){
_1ba=0;
}
if(_1ba>_1b8){
_1ba=_1b8;
}
return _1ba*(this.maximum-this.minimum)/_1b8+this.minimum;
},_onBarClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.progressBar);
}
dojo.stopEvent(e);
},_onRemainingBarClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.progressBar);
}
var _1bb=dojo.coords(this.sliderBarContainer,true),bar=dojo.coords(this.progressBar,true),_1bc=e[this._mousePixelCoord]-_1bb[this._startingPixelCoord],_1bd=bar[this._startingPixelCount],_1be=_1bd+bar[this._pixelCount],_1bf=this._isReversed()?_1bc<=_1bd:_1bc>=_1be,p=this._isReversed()?_1bb[this._pixelCount]-_1bc:_1bc;
this._setPixelValue(p,_1bb[this._pixelCount],true,_1bf);
dojo.stopEvent(e);
},_setPixelValue:function(_1c0,_1c1,_1c2,_1c3){
if(this.dynamicSlider){
_1c2=true;
}
if(this.disabled||this.readOnly){
return;
}
var _1c4=this._getValueByPixelValue(_1c0,_1c1);
this._setValueAttr(_1c4,_1c2,_1c3);
},_getValueByPixelValue:function(_1c5,_1c6){
_1c5=_1c5<0?0:_1c6<_1c5?_1c6:_1c5;
var _1c7=this.discreteValues;
if(_1c7<=1||_1c7==Infinity){
_1c7=_1c6;
}
_1c7--;
var _1c8=_1c6/_1c7;
var _1c9=Math.round(_1c5/_1c8);
return (this.maximum-this.minimum)*_1c9/_1c7+this.minimum;
},_setValueAttr:function(_1ca,_1cb,_1cc){
var _1cd=this.value;
if(!dojo.isArray(_1cd)){
_1cd=[0,0];
}
if(!dojo.isArray(_1ca)){
if(_1cc){
if(this._isReversed()){
_1cd[0]=_1ca;
}else{
_1cd[1]=_1ca;
}
}else{
if(this._isReversed()){
_1cd[1]=_1ca;
}else{
_1cd[0]=_1ca;
}
}
}else{
_1cd=_1ca;
}
this._lastValueReported="";
this.valueNode.value=this.value=_1ca=_1cd;
dijit.setWaiState(this.focusNode,"valuenow",_1cd[0]);
dijit.setWaiState(this.focusNodeMax,"valuenow",_1cd[1]);
this.value.sort(this._isReversed()?_1ab:_1ac);
dijit.form._FormValueWidget.prototype._setValueAttr.apply(this,arguments);
this._printSliderBar(_1cb,_1cc);
},_printSliderBar:function(_1ce,_1cf){
var _1d0=(this.value[0]-this.minimum)/(this.maximum-this.minimum);
var _1d1=(this.value[1]-this.minimum)/(this.maximum-this.minimum);
var _1d2=_1d0;
if(_1d0>_1d1){
_1d0=_1d1;
_1d1=_1d2;
}
var _1d3=this._isReversed()?((1-_1d0)*100):(_1d0*100);
var _1d4=this._isReversed()?((1-_1d1)*100):(_1d1*100);
var _1d5=this._isReversed()?((1-_1d1)*100):(_1d0*100);
if(_1ce&&this.slideDuration>0&&this.progressBar.style[this._progressPixelSize]){
var _1d6=_1cf?_1d1:_1d0;
var _1d7=this;
var _1d8={};
var _1d9=parseFloat(this.progressBar.style[this._handleOffsetCoord]);
var _1da=this.slideDuration/10;
if(_1da===0){
return;
}
if(_1da<0){
_1da=0-_1da;
}
var _1db={};
var _1dc={};
var _1dd={};
_1db[this._handleOffsetCoord]={start:this.sliderHandle.style[this._handleOffsetCoord],end:_1d3,units:"%"};
_1dc[this._handleOffsetCoord]={start:this.sliderHandleMax.style[this._handleOffsetCoord],end:_1d4,units:"%"};
_1dd[this._handleOffsetCoord]={start:this.progressBar.style[this._handleOffsetCoord],end:_1d5,units:"%"};
_1dd[this._progressPixelSize]={start:this.progressBar.style[this._progressPixelSize],end:(_1d1-_1d0)*100,units:"%"};
var _1de=dojo.animateProperty({node:this.sliderHandle,duration:_1da,properties:_1db});
var _1df=dojo.animateProperty({node:this.sliderHandleMax,duration:_1da,properties:_1dc});
var _1e0=dojo.animateProperty({node:this.progressBar,duration:_1da,properties:_1dd});
var _1e1=dojo.fx.combine([_1de,_1df,_1e0]);
_1e1.play();
}else{
this.sliderHandle.style[this._handleOffsetCoord]=_1d3+"%";
this.sliderHandleMax.style[this._handleOffsetCoord]=_1d4+"%";
this.progressBar.style[this._handleOffsetCoord]=_1d5+"%";
this.progressBar.style[this._progressPixelSize]=((_1d1-_1d0)*100)+"%";
}
}});
dojo.declare("dijit.form._SliderMoverMax",dijit.form._SliderMover,{onMouseMove:function(e){
var _1e2=this.widget;
var _1e3=_1e2._abspos;
if(!_1e3){
_1e3=_1e2._abspos=dojo.coords(_1e2.sliderBarContainer,true);
_1e2._setPixelValue_=dojo.hitch(_1e2,"_setPixelValue");
_1e2._isReversed_=_1e2._isReversed();
}
var _1e4=e.touches?e.touches[0]:e;
var _1e5=_1e4[_1e2._mousePixelCoord]-_1e3[_1e2._startingPixelCoord];
_1e2._setPixelValue_(_1e2._isReversed_?(_1e3[_1e2._pixelCount]-_1e5):_1e5,_1e3[_1e2._pixelCount],false,true);
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _1e6=this.widget;
_1e6._abspos=null;
_1e6._setValueAttr(_1e6.value,true);
}});
dojo.declare("dijit.form._SliderBarMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _1e7=this.widget;
if(_1e7.disabled||_1e7.readOnly){
return;
}
var _1e8=_1e7._abspos;
var bar=_1e7._bar;
var _1e9=_1e7._mouseOffset;
if(!_1e8){
_1e8=_1e7._abspos=dojo.coords(_1e7.sliderBarContainer,true);
_1e7._setPixelValue_=dojo.hitch(_1e7,"_setPixelValue");
_1e7._getValueByPixelValue_=dojo.hitch(_1e7,"_getValueByPixelValue");
_1e7._isReversed_=_1e7._isReversed();
}
if(!bar){
bar=_1e7._bar=dojo.coords(_1e7.progressBar,true);
}
var _1ea=e.touches?e.touches[0]:e;
if(!_1e9){
_1e9=_1e7._mouseOffset=_1ea[_1e7._mousePixelCoord]-_1e8[_1e7._startingPixelCoord]-bar[_1e7._startingPixelCount];
}
var _1eb=_1ea[_1e7._mousePixelCoord]-_1e8[_1e7._startingPixelCoord]-_1e9,_1ec=_1eb+bar[_1e7._pixelCount];
pixelValues=[_1eb,_1ec];
pixelValues.sort(_1ac);
if(pixelValues[0]<=0){
pixelValues[0]=0;
pixelValues[1]=bar[_1e7._pixelCount];
}
if(pixelValues[1]>=_1e8[_1e7._pixelCount]){
pixelValues[1]=_1e8[_1e7._pixelCount];
pixelValues[0]=_1e8[_1e7._pixelCount]-bar[_1e7._pixelCount];
}
var _1ed=[_1e7._getValueByPixelValue(_1e7._isReversed_?(_1e8[_1e7._pixelCount]-pixelValues[0]):pixelValues[0],_1e8[_1e7._pixelCount]),_1e7._getValueByPixelValue(_1e7._isReversed_?(_1e8[_1e7._pixelCount]-pixelValues[1]):pixelValues[1],_1e8[_1e7._pixelCount])];
_1e7._setValueAttr(_1ed,false,false);
},destroy:function(){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _1ee=this.widget;
_1ee._abspos=null;
_1ee._bar=null;
_1ee._mouseOffset=null;
_1ee._setValueAttr(_1ee.value,true);
}});
dojo.declare("dojox.form.HorizontalRangeSlider",[dijit.form.HorizontalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/HorizontalRangeSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div role=\"presentation\" class=\"dojoxRangeSliderBarContainer\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\n\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClickMax\" role=\"sliderMax\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n")});
dojo.declare("dojox.form.VerticalRangeSlider",[dijit.form.VerticalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/VerticalRangeSlider.html","<table class=\"dijitReset dijitSlider dijitSliderV dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderIncrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\" dojoAttachEvent=\"onclick: increment\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onclick:_onClkIncBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\n\t\t><td class=\"dijitReset\" style=\"height:100%;\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><center role=\"presentation\" style=\"position:relative;height:100%;\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClick\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\n\t\t\t\t\t></div\n\t\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" tabIndex=\"${tabIndex}\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onBarClick\"\n\t\t\t\t\t></div\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClickMax\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t></center\n\t\t></td\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onclick:_onClkDecBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderDecrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\" dojoAttachEvent=\"onclick: decrement\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n></table>\n")});
})();
}
if(!dojo._hasResource["wm.base.widget.Editors.Slider"]){
dojo._hasResource["wm.base.widget.Editors.Slider"]=true;
dojo.provide("wm.base.widget.Editors.Slider");
dojo.declare("wm.Slider",wm.AbstractEditor,{minimum:0,maximum:100,showButtons:true,discreteValues:"",verticalSlider:false,editorBorder:false,integerValues:true,dynamicSlider:true,showToolTip:true,reflow:function(){
},setVerticalSlider:function(_1ef){
this.verticalSlider=_1ef;
if(this.editor){
this.createEditor();
}
if(this.verticalSlider){
this.editor.incrementButton.style.width="auto";
this.editor.decrementButton.style.width="auto";
}
},getEditorProps:function(_1f0,_1f1){
var v=this.dataValue;
var minV=Number(this.minimum)?Number(this.minimum):0;
if(!v||(Number(v)<minV)){
v=this.displayValue=minV;
}
return dojo.mixin(this.inherited(arguments),{dynamicSlider:this.dynamicSlider,minimum:Number(this.minimum),maximum:Number(this.maximum),showButtons:Boolean(this.showButtons),discreteValues:Number(this.discreteValues)||Infinity,value:v},_1f1||{});
},setMaximum:function(_1f2){
this.maximum=(_1f2==="")?100:Number(_1f2);
if(this.editor){
this.editor.maximum=this.maximum;
this.editor._setValueAttr(this.dataValue,true);
}
},setMinimum:function(_1f3){
this.minimum=(_1f3==="")?0:Number(_1f3);
if(this.editor){
this.editor.minimum=this.minimum;
this.editor._setValueAttr(this.dataValue,true);
}
},_createEditor:function(_1f4,_1f5){
var div=dojo.create("div");
var _1f6;
if(this.verticalSlider){
_1f6=new dijit.form.VerticalSlider(this.getEditorProps(_1f4,_1f5));
}else{
_1f6=new dijit.form.HorizontalSlider(this.getEditorProps(_1f4,_1f5));
}
div.appendChild(_1f6.domNode);
_1f6.domNode=div;
return _1f6;
},sizeEditor:function(){
if(this._cupdating){
return;
}
this.inherited(arguments);
this.editor._setStyleAttr("height: "+this.editor.domNode.style.height+";width:"+this.editor.domNode.style.width);
},getEditorValue:function(){
var _1f7=this.inherited(arguments);
if(this.integerValues){
return Math.round(_1f7);
}else{
return _1f7;
}
},editorChanged:function(){
var _1f8=this.inherited(arguments);
if(_1f8){
if(this.showToolTip&&this.dynamicSlider&&!this._cupdating){
app.createToolTip(this.getDisplayValue(),this.domNode,null,this);
}
}
return _1f8;
}});
dojo.declare("wm.RangeSlider",wm.Slider,{init:function(){
this.inherited(arguments);
if(this.displayValue){
this.dataValue=this.displayValue.split(/,/);
}
wm.addStyleSheet("/wavemaker/lib/dojo/dojox/form/resources/RangeSlider.css");
},_createEditor:function(_1f9,_1fa){
var div=dojo.create("div");
var _1fb=new dojox.form.HorizontalRangeSlider(this.getEditorProps(_1f9,_1fa));
div.appendChild(_1fb.domNode);
_1fb.domNode=div;
return _1fb;
},getEditorValue:function(){
var _1fc=wm.AbstractEditor.prototype.getEditorValue.call(this);
if(this.integerValues){
_1fc[0]=Math.round(_1fc[0]);
_1fc[1]=Math.round(_1fc[1]);
}
return _1fc;
},getDisplayValue:function(){
var _1fd=this.getEditorValue();
return _1fd[0]+","+_1fd[1];
},getTopValue:function(){
return this.getEditorValue()[1];
},getBottomValue:function(){
return this.getEditorValue()[0];
},setDisplayValue:function(_1fe){
if(typeof _1fe=="string"){
_1fe=_1fe.split(/\s*,\s*/);
}
this.inherited(arguments,[_1fe]);
},setTopValue:function(_1ff){
this.setDataValue([this.getBottomValue(),_1ff]);
},setBottomValue:function(_200){
this.setDataValue([_200,this.getTopValue()]);
},calcIsDirty:function(_201,_202){
if(!_201&&_202||!_202&&_201){
return true;
}
return (_201[0]==_202[0]&&_201[1]==_202[1]);
},editorChanged:function(){
this.inherited(arguments);
var _203=this.getEditorValue();
this.valueChanged("bottomValue",_203[0]);
this.valueChanged("topValue",_203[1]);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_editors_misc",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
