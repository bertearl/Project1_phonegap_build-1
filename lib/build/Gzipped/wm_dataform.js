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

dojo.provide("wm.compressed.wm_dataform");
if(!dojo._hasResource["wm.base.widget.DataForm"]){
dojo._hasResource["wm.base.widget.DataForm"]=true;
dojo.provide("wm.base.widget.DataForm");
wm.getMatchingFormWidgets=function(_1,_2){
var _3=[];
wm.forEach(_1.widgets,function(w){
if(_2(w)){
_3.push(w);
}
if(w instanceof wm.Container&&!wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
_3=_3.concat(wm.getMatchingFormWidgets(w,_2));
}
});
return _3;
};
wm.getDataFormLiveView=function(_4){
var lv=_4&&(_4.findLiveVariable&&_4.findLiveVariable()||_4.getDataSetServiceVariable&&_4.getDataSetServiceVariable());
return lv&&lv.liveView;
};
dojo.declare("wm.FormPanel",wm.Container,{type:"",margin:"0",padding:"2",enableTouchHeight:true,editorHeight:"26px",editorWidth:"100%",captionSize:"120px",autoSizeCaption:false,_minEditorSizeForAutoSize:60,captionAlign:"right",captionPosition:"left",height:"250px",width:"100%",layoutKind:"top-to-bottom",readonly:false,verticalAlign:"top",horizontalAlign:"left",init:function(){
if(this.type==this.declaredClass){
this.type="";
}
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
this.updateCaptionSizes();
},updateCaptionSizes:function(){
if(this.autoSizeCaption){
wm.job(this.getRuntimeId()+".updateCaptionSizes",10,this,"_updateCaptionSizes");
}
},renderBounds:function(){
if(this.inherited(arguments)){
var _5=this.getEditorsArray();
dojo.forEach(_5,function(e){
e.captionNode.style.maxWidth="";
});
this.updateCaptionSizes();
}
},_updateCaptionSizes:function(){
if(this._isDestroyed){
return;
}
var _6=this.getEditorsArray();
var _7=0;
var _8;
dojo.forEach(_6,function(e){
if(e.showing&&e.parent.showing&&e.captionNode&&e.captionSize!="100%"&&e.captionPosition=="left"){
var w=Math.min(e.captionNode.clientWidth,e.bounds.w-this._minEditorSizeForAutoSize);
if(w>_7){
_7=w;
_8=e;
}
}
},this);
_7+=5;
if(_7>this.bounds.w/2){
_7=Math.floor(this.bounds.w/2);
}
this.captionSize=_7+"px";
dojo.forEach(_6,dojo.hitch(this,function(e){
if(e.captionSize!="100%"&&e.captionPosition=="left"){
e.setCaptionSize(this.captionSize);
if(e.captionNode.clientWidth>_7){
e.captionNode.style.maxWidth=_7+"px";
}
e._isMaxEditor=_8?(e==_8):undefined;
}
}));
},addWidget:function(_9){
this.inherited(arguments);
if(_9 instanceof wm.AbstractEditor){
this.updateCaptionSizes();
}
},removeControl:function(_a){
this.inherited(arguments);
if(_a instanceof wm.AbstractEditor){
this.updateCaptionSizes();
}
},getEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return w instanceof wm.AbstractEditor;
});
},canChangeEditorReadonly:function(_b,_c,_d){
if(_b.ignoreParentReadonly){
return false;
}
var c=dojo.isFunction(_d);
return !c||_d(_b,this,_c);
},_setReadonly:function(_e,_f){
dojo.forEach(this.getEditorsArray(),function(e){
if(!e.ignoreParentReadonly){
if(this.canChangeEditorReadonly(e,_e,_f)){
e.setReadonly(_e);
}else{
e.setReadonly(!_e);
}
}
},this);
},setReadonly:function(_10){
this.readonly=_10;
this._setReadonly(_10);
},setCaptionSize:function(_11){
var _12=this.captionSize;
this.captionSize=_11;
dojo.forEach(this.getEditorsArray(),function(e){
if((e.captionPosition=="top"||e.captionPosition=="bottom")&&_11>40){
return;
}
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionSize(_11);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===_12&&c.captionPosition==this.captionPosition){
c.setCaptionSize(_11);
}
}),true);
},setCaptionAlign:function(_13){
this.captionAlign=_13;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionAlign(_13);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===this.captionSize&&c.captionPosition==this.captionPosition){
c.setCaptionAlign(_13);
}
}),true);
},setCaptionPosition:function(pos){
var _14=this.captionPosition;
var _15=this.captionSize;
this.captionPosition=pos;
if((_14=="left"||_14=="right")&&(pos=="bottom"||pos=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)<54){
this.editorHeight="54px";
}
this.captionSize="28px";
}else{
if((pos=="left"||pos=="right")&&(_14=="bottom"||_14=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)>=54){
this.editorHeight=wm.AbstractEditor.prototype.height;
}
if(this.captionSize.match(/px/)&&parseInt(this.captionSize)<100){
this.captionSize="100px";
}
}
}
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionPositionLF(pos,this);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===_15&&c.captionPosition==_14){
c.setCaptionPosition(pos);
}
}),true);
},setEditorWidth:function(_16){
this.editorWidth=_16;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
if(e.parent.horizontalAlign!="justified"){
e.setWidth(_16);
}
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel){
c.setEditorWidth(_16);
}
}),true);
},setEditorHeight:function(_17){
this.editorHeight=_17;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setValue("height",_17);
},this);
wm.forEachWidget(this,function(c){
if(c!=this&&c instanceof wm.FormPanel){
c.setEditorHeight(_17);
}
},true);
},getEditorParent:function(){
return this;
},_end:0});
dojo.declare("wm.DataForm",wm.FormPanel,{dataSet:null,dataOutput:null,type:"",setReadonlyOnPrimaryKeys:true,confirmChangeOnDirty:"Unsaved changes will be lost; continue?",noDataSet:true,generateInputBindings:false,generateOutputBindings:false,init:function(){
this.dataOutput=new wm.Variable({name:"dataOutput",owner:this,type:this.type,_allowLazyLoad:false});
this.dataSet=new wm.Variable({name:"dataSet",owner:this,type:this.type});
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(wm.pasting){
wm.fire(this,"designPasted");
}
if(!this.generateInputBindings){
this.populateEditors();
var _18=this.getEditorsArray();
dojo.forEach(_18,function(e){
e.connect(e,"onchange",this,"_onEditorChange");
},this);
}
},_onEditorChange:function(){
if(!this._inDataSet){
this.populateDataOutput();
}
var _19=this.getParentForm();
if(_19){
_19._onEditorChange();
}
},_setReadonly:function(_1a,_1b){
this.inherited(arguments);
dojo.forEach(this.getRelatedEditorsArray(),function(e){
e.setReadonly(_1a);
});
},doConfirmChangeOnDirty:function(_1c){
if(!this._isDesignLoaded&&!this._skipChangeOnDirty&&this.confirmChangeOnDirty&&this.getIsDirty()){
app.confirm(this.confirmChangeOnDirty,false,dojo.hitch(this,function(){
this.clearDirty();
this.setDataSet(_1c);
}));
return true;
}
return false;
},setDataOutput:function(_1d){
if(this.dataOutput){
this.dataOutput.setDataSet(_1d);
}
},setDataSet:function(_1e){
this._inDataSet=true;
try{
if(this.doConfirmChangeOnDirty(_1e)){
return;
}
if(_1e){
this.onDataSetChanging(_1e.getCursorItem().getData());
}
this.dataSet.setDataSet(_1e?_1e.getCursorItem():null);
if(_1e&&this.dataOutput.type!=_1e.type){
this.dataOutput.setType(this.dataSet.type);
}
var d=this.dataSet;
if(!this.generateInputBindings){
this.beginEditUpdate();
this.populateEditors();
this.endEditUpdate();
this.liveFormChanged();
}
if(!this.generateOutputBindings){
this.dataOutput.setData(d);
}
this.valueChanged("noDataSet",this.noDataSet=d.isEmpty());
this.onDataSetChanged(this.dataSet.getData());
}
catch(e){
}
finally{
delete this._inDataSet;
}
},onDataSetChanged:function(_1f){
},onDataSetChanging:function(_20){
},clearData:function(){
this._skipChangeOnDirty=true;
this.beginEditUpdate();
this.dataOutput.setData({});
this.inherited(arguments);
this.endEditUpdate();
this._skipChangeOnDirty=false;
},beginEditUpdate:function(){
this.dataOutput.beginUpdate();
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"beginEditUpdate");
});
},endEditUpdate:function(){
this.dataOutput.endUpdate();
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"endEditUpdate");
});
},liveFormChanged:function(){
dojo.forEach(this.getEditorsArray(),function(e){
if(e.changed){
e._inSetDataValue=true;
e.changed();
e._inSetDataValue=false;
}
if(e.clearDirty){
e.clearDirty();
}
});
},populateEditors:function(){
var _21=this.dataSet;
var _22=_21?_21.getData():null;
if(!_22){
_22={};
}
var _23=this.getEditorsArray();
dojo.forEach(_23,dojo.hitch(this,function(e){
if(wm.OneToMany&&e instanceof wm.OneToMany){
e.setDataSet(this.dataSet.getValue(e.formField));
}else{
if(wm.Lookup&&e instanceof wm.Lookup&&(!e.dataSet||!e.dataSet.type)){
e.setAutoDataSet(e.autoDataSet);
}
wm.fire(e,"setDataValue",[e.formField&&_22?_22[e.formField]:_22]);
}
}));
dojo.forEach(this.getRelatedEditorsArray(),dojo.hitch(this,function(e){
if(!this._operationSucceeded){
e.setDataSet(this.dataSet.getValue(e.formField));
}
}));
},applyDataValueBindings:function(_24){
var _25=this.getEditorsArray();
dojo.forEach(_25,dojo.hitch(this,function(e){
if(e.$.binding){
if(e.$.binding.wires.dataValue&&(e.dataValueBindingEvaluated=="onInsert"&&_24=="insert"||e.dataValueBindingEvaluated=="onUpdate"&&_24=="update"||e.dataValueBindingEvaluated=="both")){
e.$.binding.wires.dataValue.refreshValue();
}
}
}));
var _26=this.getRelatedEditorsArray();
dojo.forEach(_26,function(e){
e.applyDataValueBindings(_24);
});
},populateDataOutput:function(){
var d=this.dataOutput||this.$.dataOutput;
if(this._inPopulateDataOutput){
return d;
}
this._inPopulateDataOutput=true;
try{
dojo.forEach(this.getEditorsArray(),dojo.hitch(this,function(e){
if(e instanceof wm.DataForm||e instanceof wm.SubForm||wm.isInstanceType(e,wm.SubForm)){
}else{
if(e.formField){
d.setValue(e.formField,e.getDataValue());
}
}
}));
dojo.forEach(this.getRelatedEditorsArray(),dojo.hitch(this,function(_27){
_27.populateDataOutput();
d.setValue(_27.formField,_27.dataOutput);
}));
if(this.$.binding){
var _28=this.$.binding.findWires(function(_29){
return (_29.targetProperty=="dataOutput"||_29.targetProperty.indexOf("dataOutput.")==0);
});
dojo.forEach(_28,function(_2a){
_2a.refreshValue();
});
}
wm.forEachProperty(d._dataSchema,dojo.hitch(this,function(_2b,_2c){
var _2d=d.getValue(_2c);
if(_2d instanceof wm.Variable&&_2d.isList&&!_2b.isList){
d.setValue(_2c,_2d.getItem(0));
}
}));
}
finally{
delete this._inPopulateDataOutput;
}
return d;
},getDataOutput:function(){
if(!this.generateOutputBindings&&!this._inGetDataOutput){
this._inGetDataOutput=true;
this.populateDataOutput();
delete this._inGetDataOutput;
}
return this.dataOutput;
},getEditorsArray:function(_2e){
return wm.getMatchingFormWidgets(this,function(w){
return (w instanceof wm.AbstractEditor||_2e&&wm.isInstanceType(w,[wm.SubForm,wm.OneToMany]))&&(w.formField!==undefined);
});
},getRelatedEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return (wm.isInstanceType(w,wm.SubForm)&&w.formField);
});
},valueChanged:function(_2f,_30){
if(this[_2f] instanceof wm.Variable){
return;
}else{
this.inherited(arguments);
}
},editNewObject:function(){
this.beginEditUpdate();
this.clearDirty();
this.setDataSet(null);
this.endEditUpdate();
this.applyDataValueBindings("insert");
if(this.readonly||this.setReadonlyOnPrimaryKeys){
this.readonly=false;
this._setReadonly(false,dojo.hitch(this,"_canChangeEditorReadonly",["insert"]));
}
this.liveFormChanged();
this.onEditNewObject();
wm.onidle(this,"focusFirstEditor");
},onEditNewObject:function(){
},editCurrentObject:function(){
if(this.readonly||this.setReadonlyOnPrimaryKeys){
this._setReadonly(false,dojo.hitch(this,"_canChangeEditorReadonly",["update"]));
}
this.applyDataValueBindings("update");
this.onEditCurrentObject();
wm.onidle(this,"focusFirstEditor");
},onEditCurrentObject:function(){
},setDefaultOnInsert:function(){
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"setDefaultOnInsert");
});
},_canChangeEditorReadonly:function(_31,_32,_33,_34){
if(!this.setReadonlyOnPrimaryKeys){
return true;
}
var _35=wm.typeManager.getType(this.type);
var _36=_35&&_35.liveService;
if(wm.isInstanceType(_32,wm.AbstractEditor)&&_32.formField&&_36){
var _37=_32.formField;
var _38=_33.type;
var _35=wm.typeManager.getType(_38);
if(_35){
var _39=_35.fields;
}
var _3a=wm.typeManager.getPropertyInfoFromSchema(_39,_37);
var ops=_31;
if(!_37){
return true;
}
var _3b=_3a&&dojo.some(_3a.noChange,function(i){
return (dojo.indexOf(ops,i)>-1);
}),_3c=_3a&&dojo.some(_3a.exclude,function(i){
return (dojo.indexOf(ops,i)>-1);
});
if(!_34&&(_3b||_3c)){
return false;
}
}
return true;
},cancelEdit:function(){
this.clearDirty();
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.wires.dataSet.refreshValue();
}
this.onCancelEdit();
},onCancelEdit:function(){
},beginDataInsert:function(){
this.editNewObject();
},beginDataUpdate:function(){
this.editCurrentObject();
},getFormEditorsArray:function(){
return this.getEditorsArray();
},findLiveVariable:function(){
var s=this.dataSet.dataSet;
if(!s){
var _3d=this.$.binding&&this.$.binding.wires.dataSet?this.$.binding.wires.dataSet.source:"";
if(_3d){
_3d=this.owner.getValueById(_3d);
}
s=_3d;
}
var o=s&&s.owner;
var ds=null;
o=o&&!(wm.isInstanceType(o,wm.Variable))?o:null;
if(o){
try{
if(wm.isInstanceType(o,wm.DojoGrid)){
ds=o.variable;
}else{
ds=o.dataSet;
}
}
catch(e){
ds=o.dataSet;
}
}
if(o&&ds&&wm.isInstanceType(ds,wm.LiveVariable)){
return ds;
}
while(s){
if(wm.isInstanceType(s,wm.LiveVariable)){
return s;
}
s=s.owner;
if(!(wm.isInstanceType(s.owner,wm.Variable))){
break;
}
}
},_end:0});
dojo.declare("wm.SubForm",wm.DataForm,{formField:"",_getFormField:function(_3e){
if(_3e.indexOf(".")==-1){
return _3e;
}
var f=this._getRelativeFormField(_3e);
if(f&&f.indexOf(".")==-1){
return f;
}
},_getRootFormField:function(){
var a=[];
var w=this;
while(w){
if(w.formField){
a.unshift(w.formField);
}
w=w.getParentForm();
}
return a.join(".");
},_getRelativeFormField:function(_3f){
var _40=this._getRootFormField();
if(_3f.indexOf(_40)==0){
return _3f.substring(_40.length);
}
},getViewDataIndex:function(_41){
var r=this._getRootFormField();
return (r?r+".":"")+_41;
}});
dojo.declare("wm.DBForm",wm.DataForm,{noDataSet:true,useLoadingDialog:true,formBehavior:"standard",serviceVariable:null,deleteConfirmation:"Are you sure you want to delete this data?",readonlyManager:false,insertOp:"insert",updateOp:"update",deleteOp:"delete",init:function(){
this.inherited(arguments);
this.initServiceVariable();
},postInit:function(){
this.inherited(arguments);
if(!this.readonlyManager&&this.servicevariable){
this._editSomeObject();
}
if(this.useLoadingDialog){
this._loadingDialog=new wm.LoadingDialog({owner:this,name:"_loadingDialog",caption:"Saving..."});
this._loadingDialog.widgetToCover=this;
this._loadingDialog.setServiceVariableToTrack(this.serviceVariable);
}
},setDataSet:function(_42){
if(this._updating){
return;
}
this.inherited(arguments);
if(_42&&_42.liveSource){
this.serviceVariable.setLiveSource(_42.liveSource);
}
if(!this.readonlyManager&&!this._isDesignLoaded){
this._editSomeObject();
}
},initServiceVariable:function(){
if(this.type){
this.serviceVariable=new wm.LiveVariable({name:"serviceVariable",owner:this,type:this.type,liveView:this.getSourceLiveView(),operation:this.operation||"insert",autoUpdate:false});
this.insertOp="insert";
this.updateOp="update";
this.deleteOp="delete";
}
var _43=this.serviceVariable;
this.connect(_43,"onSuccess",this,"operationSucceeded");
this.connect(_43,"onResult",this,"operationResult");
this.connect(_43,"onError",this,"operationFailed");
},getSourceLiveView:function(){
if(!this.dataSet){
return;
}
var _44=this.dataSet.dataSet||this.dataSet;
var _45=this.dataSet;
while(_45&&(_45.owner instanceof wm.Variable&&_45.owner instanceof wm.LiveVariable==false||_45.owner instanceof wm.Control)){
if(_45==this){
break;
}else{
if(_45.owner instanceof wm.Variable){
_45=_45.owner;
}else{
if(_45.owner instanceof wm.Control&&_45.owner.dataSet&&_45.owner.dataSet!=this.dataSet){
_45=_45.owner.dataSet;
}else{
break;
}
}
}
}
if(_45 instanceof wm.Control){
_45=null;
}
if(_45 instanceof wm.LiveVariable){
return _45.liveView;
}
},cancelEdit:function(){
this.inherited(arguments);
this.endEdit();
},_editSomeObject:function(){
if(this._inEditSomeObject){
return;
}
this._inEditSomeObject=true;
try{
switch(this.formBehavior){
case "insertOnly":
this.editNewObject();
break;
case "updateOnly":
this.editCurrentObject();
break;
default:
if(this.noDataSet){
this.editNewObject();
}else{
this.editCurrentObject();
}
}
}
catch(e){
}
delete this._inEditSomeObject;
},editNewObject:function(){
this.operation=this.insertOp;
this.serviceVariable.setOperation(this.operation);
this.inherited(arguments);
this.updateButtonShowingState(true);
return true;
},editCurrentObject:function(){
this.operation=this.updateOp;
this.serviceVariable.setOperation(this.operation);
this.inherited(arguments);
this.updateButtonShowingState(true);
return true;
},updateButtonShowingState:function(_46){
if(this.readonlyManager){
if(this.saveButton&&this.saveButton.isAncestor(this)){
this.saveButton.setShowing(_46);
}
if(this.cancelButton&&this.cancelButton.isAncestor(this)){
this.cancelButton.setShowing(_46);
}
if(this.editButton&&this.editButton.isAncestor(this)){
this.editButton.setShowing(!_46);
}
if(this.deleteButton&&this.deleteButton.isAncestor(this)){
this.deleteButton.setShowing(!_46);
}
if(this.newButton&&this.newButton.isAncestor(this)){
this.newButton.setShowing(!_46);
}
}else{
if(this.newButton&&this.newButton.isAncestor(this)){
this.newButton.setShowing(this.operation!="insert");
}
if(this.deleteButton&&this.deleteButton.isAncestor(this)){
this.deleteButton.setShowing(this.operation!="insert");
}
}
},endEdit:function(){
this.updateButtonShowingState(false);
if(this.readonlyManager){
this.setReadonly(true);
}else{
if(this.formBehavior=="insertOnly"){
this.editNewObject();
}
}
},saveData:function(_47){
if(_47!==true){
var _48=this.getInvalidWidget();
if(_48){
this.onSaveInvalidated(_48);
return;
}
}
switch(this.formBehavior){
case "insertOnly":
this.operation="insert";
break;
case "updateOnly":
this.operation="update";
break;
}
if(this.operation!=this.insertOp&&this.operation!=this.updateOp){
if(djConfig.isDebug){
app.toastError("Operation of '"+this.operation+"' is not valid");
return;
}
}
this.doOperation(this.operation);
},saveDataGuessOperation:function(){
var _49="update";
if(!this.generateOutputBindings){
this.populateDataOutput();
}
var _4a=this.dataOutput.getData();
var _4b=wm.typeManager.getType(this.type).fields;
for(var _4c in _4b){
if(_4b[_4c].exclude&&dojo.indexOf(_4b[_4c].exclude,"insert")!=-1&&!_4a[_4c]){
_49="insert";
}
}
this.operation=_49;
},onSaveInvalidated:function(_4d){
},deleteData:function(){
var _4e=dojo.hitch(this,function(){
return this.doOperation("delete");
});
if(!this.deleteConfirmation){
_4e();
}else{
app.confirm(this.deleteConfirmation,false,_4e,dojo.hitch(this,function(){
this.onCancelDelete();
}));
}
},onCancelDelete:function(){
},doOperation:function(_4f){
if(!this.generateOutputBindings){
this.populateDataOutput();
}
var _50=this.dataOutput.getData();
var _51=this.serviceVariable;
_51.setOperation(_4f);
switch(this.operation){
case this.insertOp:
this.onBeforeInsertCall(_50);
break;
case this.updateOp:
this.onBeforeUpdateCall(_50);
break;
case this.deleteOp:
this.onBeforeDeleteCall(_50);
break;
}
var _52=false;
if(this.operation=="update"){
var _53=this.getRelatedEditorsArray();
dojo.forEach(_53,dojo.hitch(this,function(_54){
if(_54.getIsDirty()){
_52=true;
}
}));
}
this.setServerParams(_50);
if(!_52){
this.serviceVariable.update();
}else{
this._disableEventHandling=true;
this.serviceVariable.setOperation("delete");
this.serviceVariable.sourceData.setData(this.dataSet);
var def=this.serviceVariable.update();
def.addCallbacks(dojo.hitch(this,function(){
this.setServerParams(_50);
this.serviceVariable.setOperation("insert");
this.serviceVariable.update();
wm.onidle(this,function(){
delete this._disableEventHandling;
this.serviceVariable.setOperation("update");
});
}),dojo.hitch(this,function(){
wm.onidle(this,function(){
delete this._disableEventHandling;
this.serviceVariable.setOperation("update");
});
}));
}
},setServerParams:function(_55){
this.serviceVariable.sourceData.setData(_55);
},onBeforeInsertCall:function(_56){
},onBeforeUpdateCall:function(_57){
},onBeforeDeleteCall:function(_58){
},operationSucceeded:function(_59){
if(this._disableEventHandling){
return;
}
if(dojo.isArray(_59)){
_59=_59[0];
}
var op=this.serviceVariable.operation;
var _5a=this.canApplyReturnedData();
if(_5a){
this.applyReturnedData(this.dataSet,_59);
}
switch(op){
case this.insertOp:
this.onInsertSuccess(_59);
break;
case this.updateOp:
this.onUpdateSuccess(_59);
break;
case this.deleteOp:
this.setDataSet(null);
this.onDeleteSuccess(_59);
break;
}
this.onSuccess(_59);
this.endEdit();
},canApplyReturnedData:function(){
return true;
},applyReturnedData:function(_5b,_5c){
try{
this.clearDirty();
_5b.beginUpdate();
var _5d=this.serviceVariable._dataSchema;
for(var _5e in _5c){
if(!wm.typeManager.isStructuredType(_5d[_5e].type)){
_5b.setValue(_5e,_5c[_5e]);
}else{
_5b.setValue(_5e,this.dataOutput.getValue(_5e));
}
}
_5b.endUpdate();
_5b.notify();
if(_5b.owner==this){
this.setDataSet(_5b);
}
var d=this.dataSet.getData();
}
catch(e){
}
if(this.$.binding&&this.$.binding.wires.dataSet){
var _5f=this.owner.getValueById(this.$.binding.wires.dataSet.source);
if(_5f&&wm.isInstanceType(_5f,wm.Variable)){
if(d){
this._updating=true;
_5f.getCursorItem().setData(d);
this._updating=false;
}
if(_5f.owner&&_5f.owner instanceof wm.Control&&_5f.owner.dataSet instanceof wm.Variable&&_5f!=_5f.owner.dataSet){
var _60=_5f.owner.dataSet;
}
}
}
if(_60){
this._updating=true;
try{
var op=this.serviceVariable.operation;
switch(op){
case this.insertOp:
if(d){
_60.addItem(d,0);
}
break;
case this.updateOp:
if(d){
var _61=this.getRelatedEditorsArray();
var _62=_60.getItem(_5f.dataSet.itemIndex);
_62.beginUpdate();
_62.setData(d);
_62.endUpdate();
_60.notify();
}
break;
case this.deleteOp:
_60.removeItem(_5f.dataSet.itemIndex);
this.onDeleteSuccess(_5c);
break;
}
}
catch(e){
console.error(e);
}
this._updating=false;
}
},onInsertSuccess:function(_63){
},onUpdateSuccess:function(_64){
},onDeleteSuccess:function(_65){
},onSuccess:function(_66){
},onResult:function(_67){
},operationResult:function(_68){
if(this._disableEventHandling){
return;
}
this.onResult(_68);
},operationFailed:function(_69){
switch(this.operation){
case this.insertOp:
this.onInsertError(_69);
break;
case this.updateOp:
this.onUpdateError(_69);
break;
case this.deleteOp:
this.clearData();
this.onDeleteError(_69);
break;
}
this.onError(_69);
},onInsertError:function(_6a){
},onUpdateError:function(_6b){
},onDeleteError:function(_6c){
},onError:function(_6d){
},_end:0});
dojo.declare("wm.ServiceForm",wm.DBForm,{saveData:function(_6e){
if(_6e!==true){
var _6f=this.getInvalidWidget();
if(_6f){
this.onSaveInvalidated(_6f);
return;
}
}
if(this.formBehavior=="updateOnly"&&this.noDataSet){
return app.toastError("Can not insert with an updateOnly form");
}
if(this.operation!=this.insertOp&&this.operation!=this.updateOp){
if(djConfig.isDebug){
app.toastError("Operation of '"+this.operation+"' is not valid");
}
}
this.doOperation(this.operation);
},_end:0});
dojo.declare("wm.ServiceInputForm",wm.DataForm,{serviceVariable:null,setReadonlyOnPrimaryKeys:false,generateInputBindings:false,generateOutputBindings:true,populateEditors:function(){
},getTypeDef:function(){
if(this.serviceVariable&&this.serviceVariable.input){
return {fields:this.serviceVariable.input._dataSchema};
}
return null;
},init:function(){
this.inherited(arguments);
this.dataOutput.destroy();
this.dataOutput=new wm.ServiceInput({name:"dataOutput",owner:this});
},setServiceVariable:function(_70){
this.serviceVariable=_70;
if(_70){
this.dataOutput.operationChanged(_70.operation,_70._operationInfo.parameters);
}
},_end:0});
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
var _71=this.dataSet;
if(!_71&&this.formField){
var _72=this.getParentForm();
if(_72){
_71=_72.dataSet;
}
if(_71){
var _73=_71._dataSchema;
var _74=_73[this.formField];
if(_74){
var _75=_74.type;
var _76=wm.typeManager.getDisplayField(_75);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_71&&_71.type){
var _75=_71.type;
var _76=wm.typeManager.getDisplayField(_75);
}
}
if(_76){
return this.setDisplayField(_76);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _77=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_77){
app.debugDialog.endLogEvent(_77);
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
var _78=this.dataValue;
var _79=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_78,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_78);
}else{
this.setDisplayValue(_79);
}
this.endEditUpdate();
if(!this._cupdating){
var _79=this.getDisplayValue();
if(_79!=this.displayValue){
this.changed();
}
}
},formatData:function(_7a){
try{
if(this._formatter){
return this._formatter.format(_7a);
}else{
if(this.displayType){
var _7b=wm.getFormatter(this.displayType);
this._formatter=new _7b({name:"format",owner:this});
return this._formatter.format(_7a);
}else{
return _7a;
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
},setDataSet:function(_7c){
this.dataSet=_7c;
if(_7c&&_7c.type!=this.selectedItem.type){
this.selectedItem.setType(_7c.type);
}
var _7d=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_7e){
this.displayField=_7e;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_7f){
this.displayExpression=_7f;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_80){
if(_80=="All Fields"){
this.dataField="";
}else{
this.dataField=_80;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var _81=[];
if(!this.options){
return _81;
}
var _82=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=_82.length,d;i<l;i++){
d=dojo.string.trim(String(_82[i]));
_81[i]={name:d,dataValue:d};
}
return _81;
},setOptionsVariable:function(){
var _83=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(_83);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_84){
var _85=this._cupdating;
this._cupdating=true;
if(_84){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_84;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _86=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_86){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_85){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_87){
var _88;
if(wm.isInstanceType(_87,wm.Variable)){
_88=_87;
}else{
_88=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_88.setType(this.dataSet.type);
}
_88.setData(dojo.clone(_87));
}
var de=this.displayExpression,v=_88;
var _89=de?wm.expression.getValue(de,v,this.owner):_88.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_89=this.formatData(_89);
}
return _89==null?"":String(_89);
},calcIsDirty:function(_8a,_8b){
var _8c="";
var _8d="";
if(this.dataField){
_8c=dojo.isArray(_8a)?_8a.join(","):String(_8a||"");
_8d=dojo.isArray(_8b)?_8b.join(","):String(_8b||"");
return _8c!=_8d;
}
if(_8a instanceof wm.Variable&&_8a.isList||dojo.isArray(_8a)){
var _8e=_8a instanceof wm.Variable?_8a.getCount():_8a.length;
for(var i=0;i<_8e;i++){
if(i){
_8c+=",";
}
_8c+=this._getDisplayData(_8a instanceof wm.Variable?_8a.getItem(i):_8a[i]);
}
}else{
if(_8a!==null&&typeof _8a=="object"){
_8c=this._getDisplayData(_8a);
}else{
if(_8a==null){
_8c="";
}else{
_8c=_8a;
}
}
}
if(_8b instanceof wm.Variable&&_8b.isList||dojo.isArray(_8b)){
var _8e=_8b instanceof wm.Variable?_8b.getCount():_8b.length;
for(var i=0;i<_8e;i++){
if(i){
_8d+=",";
}
_8d+=this._getDisplayData(_8b instanceof wm.Variable?_8b.getItem(i):_8b[i]);
}
}else{
if(_8b!==null&&typeof _8b=="object"){
_8d=this._getDisplayData(_8b);
}else{
if(_8b==null){
_8d="";
}else{
_8d=_8b;
}
}
}
return _8c!=_8d;
},setEditorValue:function(_8f){
this._setEditorValue(_8f,false);
this.updateReadonlyValue();
},setDisplayValue:function(_90){
this._setEditorValue(_90,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_91,_92){
var _93=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_91;
return;
}
this.beginEditUpdate();
try{
var _94=this._lastValue;
var _95=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_95;
this._lastValue=_94;
if(_91 instanceof wm.Variable){
_91=_91.getData();
}
var _96;
if(!_92&&this.dataField){
_96=this.dataField;
}else{
if(!this.displayExpression){
_96=this.displayField;
}
}
if(_96||this.displayExpression){
if(!dojo.isArray(_91)){
_91=_91===undefined||_91===null?[]:[_91];
}
var _97;
_97=_91.length;
var _98=this.dataSet.getCount();
if(_98==0){
this.dataValue=this._multiSelect?_91:_91[0];
}else{
for(var i=0;i<_97;i++){
var _99=dojo.isArray(_91)?_91[i]:_91;
var _9a;
if(_96&&_99!==null&&typeof _99=="object"){
_9a=_99 instanceof wm.Variable?_99.getValue(_96):_99[_96];
}else{
if(!_96&&_99!==null&&typeof _99=="object"){
_9a=this._getDisplayData(_99);
}else{
_9a=_99;
}
}
var _9b=false;
for(var j=0;j<_98;j++){
var _9c=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _9d=_96?_9c.getValue(_96):this._getDisplayData(_9c);
if(_9d==_9a){
_9b=true;
this.selectItem(j);
break;
}
}
if(!_9b){
this._onSetEditorValueFailed(_91);
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
},isDataSetValueValid:function(_9e){
if(dojo.isArray(_9e)){
for(var i=0;i<_9e.length;i++){
if(_9e[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_9e instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_9f){
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
var _a0=[];
if(this.dataField){
var _a1=this.selectedItem.getCount();
for(var i=0;i<_a1;i++){
_a0.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_a0=this.selectedItem.getData();
if(!dojo.isArray(_a0)){
_a0=[_a0];
}
}
if(!this._multiSelect&&_a0){
var _a0=_a0[0];
return (_a0||_a0===0)?_a0:this.makeEmptyValue();
}else{
return _a0;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _a2="";
var _a3=this.selectedItem.getCount();
for(var i=0;i<_a3;i++){
if(i){
_a2+=", ";
}
_a2+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _a2;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_a4){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _a5=this.editor;
if(this.dijits){
var _a6=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_a5);
},_createEditor:function(_a7){
this.editor=_a7;
this.readOnlyNode=_a7;
this.editor.className="wmCheckboxSet";
var _a8="";
if(this.dataSet){
var _a9=this.dataSet.getCount();
for(var i=0;i<_a9;i++){
var _aa=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
_a8+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
_a8+="<label class='wmeditor-caption'>"+this._getDisplayData(_aa)+"</label></div>";
}else{
_a8+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(_aa)+"</label></div>";
}
}
this.editor.innerHTML=_a8;
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
var _ab=this;
dojo.forEach(this.dijits,function(_ac){
_ab.connect(_ac,"onChange",_ab,"changed");
_ab.connect(_ac,"onFocus",_ab,"_onEditorFocused");
_ab.connect(_ac,"onBlur",_ab,"_onEditorBlurred");
_ac.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_ad){
var _ae=_ad.touches?_ad.touches[0].target:_ad.target;
while(_ae&&_ae!=this.domNode&&!dojo.hasClass(_ae,"wmCheckboxSetItem")){
_ae=_ae.parentNode;
}
if(!_ae||_ae==this.domNode){
return;
}
return _ae;
},onTouchStart:function(_af){
this.inherited(arguments);
var _b0=this._touchCheckboxNode=this._getTouchNode(_af);
if(_b0&&dojo.hasClass(_b0,"wmCheckboxSetItem")){
dojo.addClass(_b0.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_b1,_b2,_b3,_b4,_b5,_b6,_b7){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_b3)>5||Math.abs(_b6)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_b8,_b9){
this.inherited(arguments);
if(!_b9&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _ba=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_ba!=-1){
this.dijits[_ba].set("checked",!this.dijits[_ba].get("checked"));
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
var _bb=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
_bb.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(_bb);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_bc){
var _bd=this.readonly;
this.readonly=Boolean(_bc);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _be=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_be){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_bd){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_bf){
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
},selectItem:function(_c0){
if(!this.dijits){
return;
}
this.dijits[_c0].set("checked",true,false);
this.dijits[_c0]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_c1){
if(_c1&&_c1.readonly){
delete _c1.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_c2){
this.selectionMode=_c2;
if(this.grid){
this.grid.setSelectionMode(_c2);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_c3){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
}
delete this._typeWas;
},setDataSet:function(_c4){
var _c5;
if(this._typeWas){
_c5=this._typeWas;
}else{
_c5=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_c4&&_c4.type!=_c5){
this.createEditor();
}
var _c6=this.dataValue;
this.grid.setDataSet(_c4);
this._inSetDataValue=true;
this.setEditorValue(_c6);
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
},setShowSearchBar:function(_c7){
this.showSearchBar=Boolean(_c7);
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
},filterList:function(_c8,_c9){
var _ca=this.grid.getRowCount();
var _cb={};
if(_c8){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_cb[this.grid.columns[i].field]="*"+_c8+"*";
}
this.grid.setQuery(_cb);
},_createEditor:function(_cc){
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
},setReadonly:function(_cd){
},setDeleteColumn:function(_ce){
this.deleteColumn=_ce;
if(this.grid){
this.grid.setDeleteColumn(_ce);
}
},setDeleteConfirm:function(_cf){
this.deleteConfirm=_cf;
if(this.grid){
this.grid.deleteConfirm=_cf;
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
},selectItem:function(_d0){
this.grid.setSelectedRow(_d0);
},onRowDeleted:function(_d1,_d2){
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.OneToMany"]){
dojo._hasResource["wm.base.widget.Editors.OneToMany"]=true;
dojo.provide("wm.base.widget.Editors.OneToMany");
dojo.declare("wm.OneToMany",wm.ListSet,{minHeight:100,relationshipName:"",_multiSelect:false,showSearchBar:false,dataField:"",startUpdate:true,deleteColumn:false,noItemsLabel:"No data",setEditorValue:function(_d3){
},calcIsDirty:function(){
return false;
},_createEditor:function(_d4){
var e=this.inherited(arguments);
var _d5=this.dataSet&&!this.dataSet.isEmpty();
this.grid.setShowing(_d5);
this.noRelatedObjectsLabel=new wm.Label({parent:e,owner:this,showing:!_d5,caption:this.noItemsLabel,width:"100%"});
return e;
},setDataSet:function(_d6){
if(this.grid){
if(_d6&&_d6.getCount()){
this.grid.show();
this.noRelatedObjectsLabel.hide();
}else{
this.grid.hide();
this.noRelatedObjectsLabel.show();
}
}
this.inherited(arguments);
},onRowDeleted:function(_d7,_d8){
this.selectedItem.setData(_d8);
}});
}
