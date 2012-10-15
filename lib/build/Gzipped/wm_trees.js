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

dojo.provide("wm.compressed.wm_trees");
if(!dojo._hasResource["wm.base.widget.Trees.Tree"]){
dojo._hasResource["wm.base.widget.Trees.Tree"]=true;
dojo.provide("wm.base.widget.Trees.Tree");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
dojo.addOnLoad(function(){
wm.preloadImage(wm.theme.getImagesPath()+"tree_blank.gif");
});
wm.collapseNode=function(n,_1,_2,_3){
n.style.display="none";
return;
var v=_1||30,a=_2||5,i=_3||2,h=n._height=n.offsetHeight,s=n.style;
function _4(){
h-=(v+=a);
if(h<=0){
s.display="none";
s.height="";
}else{
s.height=h+"px";
setTimeout(_4,i);
}
};
_4();
};
wm.expandNode=function(n,_5,_6,_7){
if(n){
n.style.display="";
}
return;
var v=_5||30,a=_6||5,i=_7||2,h=0,s=n.style;
s.display="";
if(!n._height){
var ns=n.parentNode.style,o=ns.overflow;
ns.overflow="hidden";
n._height=n.offsetHeight;
s.height="1px";
ns.overflow=o;
}else{
s.height="1px";
}
function _8(){
h+=(v+=a);
s.height=h+"px";
if(n.offsetHeight+v>=n._height){
s.height="";
}else{
setTimeout(_8,i);
}
};
_8();
};
dojo.declare("wm.TreeNode",null,{images:{none:"tree_blank.gif",leaf:"tree_leaf.gif",closed:"tree_closed.gif",open:"tree_open.gif"},touchimages:{none:"tree_blank.gif",leaf:"tree_leaf.gif",closed:"touch_tree_closed.png",open:"touch_tree_open.png"},classes:{leaf:"wmtree-leaf",lastLeaf:"wmtree-last-leaf",lastItem:"wmtree-last-item",content:"wmtree-content",selected:"wmtree-selected",rootLeaf:"wmtree-root-leaf",rootLastLeaf:"wmtree-root-last-leaf",open:"wmtree-open"},closed:false,canSelect:true,constructor:function(_9,_a){
this.addParent(_9);
this.initProps(_a);
this.placeInParent();
if(!this.tree._updating){
this.render();
}
},destroy:function(){
this.forEachDescendant(function(n){
n._destroy();
});
this._destroy();
},destroy:function(){
if(this.isDestroyed){
return;
}
this.isDestroyed=true;
this.removeChildren();
if(this.tree.nodes[this.id]){
this.tree._removeNode(this);
}
if(this.parent){
if(this.parent instanceof wm.TreeNode){
this.parent.kids=wm.Array.removeElement(this.parent.kids,this);
delete this.parent;
}
wm.fire(this.parent,"_remove",[this]);
}
if(this!=this.tree.root){
var d=this.domNode;
dojo._destroyElement(d);
}
},addParent:function(_b){
this.parent=_b;
this.tree=_b.tree;
this.tree._addNode(this);
},initProps:function(_c){
_c=_c||{};
dojo.mixin(this,{kids:[],content:"",data:{},_data:{},imageRoot:this.tree._imageRoot},_c);
if(this.closed){
this._childrenRendered=false;
}
},placeInParent:function(){
var i=this.parentIndex;
if(i!==undefined){
this.parent.kids.splice(i,0,this);
}else{
this.parent.kids.push(this);
}
},render:function(){
this.createNode();
this.domNode.nodeId=this.id;
this.styleContent();
this.parent.renderChild(this);
if(this.selected){
this.tree.selected=this;
}
if(!this.closed){
this.initKids();
}
},createKidsNode:function(){
if(this.kidsNode){
return this.kidsNode;
}
var n=this.kidsNode=document.createElement("ul");
n.style.display=(this.closed?"none":"");
return n;
},formatImage:function(_d,_e){
_d=_d||this.image;
_e=_e||this.imageSize||16;
if(!_d||_d.indexOf(".")!=-1){
return _d?["<img src=\"",_d,"\" style=\"height: ",_e,"px; width: ",_e,"px;\">&nbsp;"].join(""):"";
}else{
return _d?["<img src=\"lib/wm/base/widget/themes/default/images/blank.gif\" class=\"",_d,"\" style=\"height: ",_e,"px; width: ",_e,"px;\">&nbsp;"].join(""):"";
}
},formatContent:function(){
var i=this.formatImage();
return [i,i?"&nbsp;":"",this.content].join("");
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML="<img/><span>"+this.formatContent()+"</span>";
this.btnNode=li.firstChild;
this.contentNode=this.btnNode.nextSibling;
},isLastChild:function(){
var k=this.parent.kids;
return this==k[k.length-1];
},isRoot:function(){
return (this.parent==this.tree.root)&&(this==this.tree.root.kids[0]);
},isSelected:function(){
return this==this.tree.selected;
},styleNode:function(){
var n=this.domNode,i=n.firstChild,_f=this.isLastChild(),_10=this.isRoot();
if(!n){
return;
}
var ic=(_f?this.classes.lastLeaf:this.classes.leaf);
if(_10){
ic=(_f?this.classes.rootLastLeaf:this.classes.rootLeaf);
}
if(i&&i.className!=ic){
i.className=ic;
}
var nc=(_f?this.classes.lastItem:"")+(this.closed?"":" "+this.classes.open);
if(n.className!=nc){
n.className=nc;
}
var _11=!this._childrenRendered&&(this.hasChildren||this._hasChildren||(this._data.children&&this._data.children.length));
var img=!this.kids.length&&!_11?this.images.none:(this.closed?this.images.closed:this.images.open);
var s=this.imageRoot+img;
if(i&&i.src!=s){
i.src=s;
}
},styleNodeNoDom:function(){
var d=this.domNode,p=d.parentNode;
if(p){
p.removeChild(d);
}
this.styleNode();
if(p){
p.appendChild(d);
}
},renderChild:function(_12){
var i=dojo.indexOf(this.kids,_12);
if(i==-1){
_12.placeInParent(_12);
i=dojo.indexOf(this.kids,_12);
}
if(this.kids.length==1){
this.styleNode();
this.domNode.appendChild(this.createKidsNode());
}else{
if(i==this.kids.length-1){
var c=this.kids[this.kids.length-2];
c.styleNodeNoDom();
}else{
}
}
_12.styleNode();
dojo.setSelectable(_12.domNode,false);
if(i==this.kids.length-1){
this.createKidsNode().appendChild(_12.domNode);
}else{
this.createKidsNode().insertBefore(_12.domNode,this.kids[i+1].domNode);
}
},_findIndexInParent:function(_13){
var _14=_13.parent;
if(_14){
for(var i=0,l=_14.kids.length,k;i<l&&(k=_14.kids[i]);i++){
if(_13==k){
return i;
}
}
}
return -1;
},remove:function(_15){
_15.destroy();
},_remove:function(_16){
var i=this._findIndexInParent(_16);
if(i>=0){
var _17=(i==this.kids.length-1);
this.kids.splice(i,1);
if(_17&&this.kids.length){
this.kids[this.kids.length-1].styleNode();
}
if(!this.kids.length){
this.styleNode();
}
return true;
}
},removeChildren:function(){
while(this.kids.length){
this.remove(this.kids[0]);
}
},initKids:function(){
if(!this._childrenRendered){
if(this.initNodeChildren){
this.initNodeChildren(this);
}else{
this.tree.initNodeChildren(this);
}
}
this._childrenRendered=true;
},setOpen:function(_18){
this.initKids();
var c=this.closed;
this.closed=!_18;
if(c!=this.closed&&this.kidsNode){
(this.closed?wm.collapseNode:wm.expandNode)(this.kidsNode);
}
this.styleNode();
},btnToggled:function(e){
this.tree.dispatchNodeEvent("Btnclick",this,e);
},mousedown:function(e){
},click:function(e){
if(e.target==this.btnNode){
this.btnToggled(e);
}else{
this.tree.dispatchNodeEvent("Click",this,e);
}
},dblclick:function(e){
this.tree.dispatchNodeEvent("Dblclick",this,e);
},styleContent:function(){
this.contentNode.className=this.classes.content;
if(this.selected){
this.contentNode.className+=" "+this.classes.selected;
}
},setContent:function(_19){
this.content=_19;
var c=this.formatContent(),n=this.contentNode;
if(n.nodeType==3){
n.nodeValue=c;
}else{
n.innerHTML=c;
}
},forEach:function(_1a){
if(!_1a){
return;
}
_1a(this);
this.forEachDescendant(_1a);
},forEachDescendant:function(_1b){
for(var i=0,k,_1c=this.kids;(k=_1c[i]);i++){
k.forEach(_1b);
}
},forEachChild:function(_1d){
for(var i=0,k,_1e=this.kids;(k=_1e[i]);i++){
_1d(k);
}
},hasDescendant:function(_1f){
try{
if(_1f(this)){
return true;
}
}
catch(e){
}
for(var i=0,k,_20=this.kids;(k=_20[i]);i++){
if(k.hasDescendant(_1f)){
return true;
}
}
return false;
},findDescendant:function(_21){
try{
if(_21(this)){
return this;
}
}
catch(e){
}
for(var i=0,k,_22=this.kids;(k=_22[i]);i++){
var _23=k.findDescendant(_21);
if(_23){
return _23;
}
}
return null;
},findChild:function(_24){
for(var i=0,k,_25=this.kids;(k=_25[i]);i++){
if(_24(k)){
return k;
}
}
return null;
},buildPathString:function(_26){
if(this.parent==this.tree.root||this.parent==this.tree){
return "";
}
return this.parent.buildPathString(_26)+"/"+this.data.getItemName();
},findDomNode:function(_27){
if(this.domNode==_27||this.contentNode==_27){
return this;
}
for(var i=0;i<this.kids.length;i++){
var _28=this.kids[i].findDomNode(_27);
if(_28){
return _28;
}
}
return null;
}});
dojo.declare("wm.TreeCheckNode",wm.TreeNode,{checked:false,render:function(){
this.inherited(arguments);
this.setChecked(this.checked);
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/><input type=\"checkbox\" style=\"margin: 0 4px 0 0; padding:0;\"",this.checked?" checked=\"yes\"":"","><span>"+this.formatContent()+"</span>"].join("");
this.btnNode=li.firstChild;
this.checkboxNode=this.btnNode.nextSibling;
this.contentNode=this.checkboxNode.nextSibling;
},click:function(e){
if(e.target==this.checkboxNode){
this.checkboxClick(e);
}else{
this.inherited(arguments);
}
},checkboxClick:function(e){
this.tree.dispatchNodeEvent("Checkboxclick",this,e);
},getChecked:function(_29){
return this.checkboxNode?this.checkboxNode.checked:this.checked;
},setChecked:function(_2a){
this.checkboxNode.checked=_2a;
},toggleChecked:function(){
this.setChecked(!this.checkBoxNode.checked);
}});
dojo.declare("wm.TreeRadioNode",wm.TreeCheckNode,{createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/><input type=\"radio\" name=\""+this.tree.name+"\" style=\"margin: 0 4px 0 0; padding:0;\"",this.checked?" checked=\"yes\"":"","><span>"+this.formatContent()+"</span>"].join("");
this.btnNode=li.firstChild;
this.checkboxNode=this.btnNode.nextSibling;
this.contentNode=this.checkboxNode.nextSibling;
},click:function(e){
if(e.target==this.checkboxNode){
this.checkboxClick(e);
}else{
if(e.target==this.btnNode){
this.btnToggled(e);
}else{
this.checkboxNode.checked=true;
this.checkboxClick(e);
this.inherited(arguments);
}
}
}});
dojo.declare("wm.TreeTextNode",wm.TreeNode,{value:"",render:function(){
this.inherited(arguments);
},click:function(e){
if(e.target==this.inputNode){
this.inputNode.focus();
}else{
this.inherited(arguments);
}
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/>","<span>"+this.formatContent()+"</span>","<input type=\"text\" style=\"margin: 0 4px 0 0; padding:0;\" value=\"",this.value,"\">"].join("");
this.btnNode=li.firstChild;
this.contentNode=this.btnNode.nextSibling;
this.inputNode=this.contentNode.nextSibling;
dojo.connect(this.inputNode,"onchange",this,"onChange");
},getValue:function(_2b){
return this.inputNode?this.inputNode.value:this.value;
},setValue:function(_2c){
this.inputNode.value=_2c;
},onChange:function(){
}});
dojo.declare("wm.TreeRoot",wm.TreeNode,{render:function(_2d){
this.domNode=this.tree.domNode;
},addParent:function(_2e){
this.parent=this.tree=_2e;
this.tree._addNode(this);
},styleNode:function(){
},placeInParent:function(){
}});
dojo.declare("wm.Tree",wm.Box,{width:"100%",height:"",connectors:true,selected:null,autoScroll:true,init:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"wmtree");
this.setConnectors(this.connectors);
this._nodeId=0;
this.nodes=[];
this._imageRoot=wm.theme.getImagesPath();
this.root=new wm.TreeRoot(this,"");
this.connect(this.domNode,"onmousedown",this,"treeMouseDown");
this.connect(this.domNode,"onclick",this,"treeClick");
this.connect(this.domNode,"ondblclick",this,"treeDblClick");
},setConnectors:function(_2f){
var c=this.connectors=_2f;
dojo[c?"removeClass":"addClass"](this.domNode,"wmtree-noconnectors");
},setDisabled:function(_30){
this.inherited(arguments);
if(_30){
this.deselect();
}
dojo[_30?"addClass":"removeClass"](this.domNode,"wmtree-disabled");
},forEachNode:function(_31){
if(dojo.isFunction(_31)){
this.root.forEach(_31);
}
},clear:function(){
this._data={};
this._nodeId=0;
this.selected=null;
this.domNode.innerHTML="";
this.nodes=[];
this.root.destroy();
this.root=new wm.TreeRoot(this,"");
},toggle:function(_32){
var old=this.selected,neo=this.selected=(old==_32?null:_32);
old&&old.styleContent();
(old!=neo)&&neo&&neo.styleContent();
},eventSelect:function(_33){
var _34={canSelect:true};
this._oncanselect(_33,_34);
if(_33.canSelect&&_34.canSelect){
this.select(_33);
}
},addToSelection:function(_35){
if(_35){
var _36=_35.parent;
while(_36&&_36!=this.root){
if(_36.closed){
_36.setOpen(true);
}
_36=_36.parent;
}
this.selected=_35;
_35.selected=true;
_35.styleContent();
var n=_35.domNode,d=this.domNode,fc=n.firstChild;
if(n&&d&&fc){
var _37=(n.offsetTop<d.scrollTop),_38=(n.offsetTop+fc.offsetHeight>d.scrollTop+d.offsetHeight);
if((_37||_38)&&wm.widgetIsShowing(this)){
n.scrollIntoView(false);
}
}
}
},_deselect:function(){
var old=this.selected;
if(old){
if(this.selected){
this.selected.selected=false;
}
this.selected=null;
old.styleContent();
}
},_select:function(_39){
this._deselect();
this.addToSelection(_39);
},deselect:function(){
this.ondeselect(this.selected);
this._deselect();
},select:function(_3a){
if(this.selected!=_3a){
this.deselect();
this.addToSelection(_3a);
this.onselect(_3a);
}else{
if(this.selected&&!this.selected.selected){
this.selected.selected=true;
this.selected.styleContent();
}
}
},initNodeChildren:function(_3b){
this.oninitchildren(_3b);
this.renderDataNode(_3b,this.getNodeChildData(_3b));
},getNodeChildData:function(_3c){
return _3c._data.children;
},_render:function(){
this.renderData(this._data);
},renderData:function(_3d){
this.clear();
this._data=_3d;
this.renderDataNode(this.root,this._data);
},renderDataNode:function(_3e,_3f){
if(!_3f){
return;
}
_3e._childrenRendered=true;
dojo.forEach(_3f,dojo.hitch(this,function(d){
var p={data:d.data||d.content,_data:d,checked:d.checked,content:d.content,closed:d.closed,image:d.image,_childrenRendered:true},n=new wm[d.type=="checkbox"?"TreeCheckNode":"TreeNode"](_3e,p);
if(d.children&&!d.closed){
this.renderDataNode(n,d.children);
}
}));
},_addNode:function(_40){
var id=this.makeNodeId();
_40.id=id;
this.nodes[id]=_40;
},_removeNode:function(_41){
this.nodes[_41.id]=null;
},makeNodeId:function(){
return this._nodeId++;
},findEventNode:function(e){
var n=e.target;
while(n.nodeId===undefined&&n!=this.domNode){
n=n.parentNode;
}
if(n.nodeId!==undefined){
return this.nodes[n.nodeId];
}
},treeMouseDown:function(e){
var n=this.findEventNode(e);
if(n){
n.mousedown(e);
this.onmousedown(e,n);
}
},treeClick:function(e){
var n=this.findEventNode(e);
if(n){
n.click(e);
}else{
this.deselect();
}
},treeDblClick:function(e){
var n=this.findEventNode(e);
if(n){
n.dblclick(e);
}
},dispatchNodeEvent:function(_42,_43,_44){
if(this.disabled){
_44._treeHandled=true;
}else{
_44.treeNode=_43;
wm.fire(this,"node"+_42,[_43,_44]);
}
},nodeClick:function(_45,_46){
if(_46._treeHandled){
return;
}
_46._treeHandled=true;
this.eventSelect(_45);
setTimeout(dojo.hitch(this,"onclick",_45),1);
},nodeDblclick:function(_47,_48){
if(_48._treeHandled){
return;
}
_48._treeHandled=true;
wm.clearSelection();
this.ondblclick(_47);
},nodeCheckboxclick:function(_49,_4a){
if(_4a._treeHandled){
return;
}
_4a._treeHandled=true;
this.oncheckboxclick(_49,_4a);
},nodeBtnclick:function(_4b,_4c){
if(_4c._treeHandled){
return;
}
_4c._treeHandled=true;
_4b.setOpen(_4b.closed);
},_nodeMatchesProps:function(_4d,_4e){
for(var i in _4e){
if(_4d[i]!=_4e[i]){
return;
}
}
return true;
},findNode:function(_4f,_50){
var n=_50||this.root;
for(var i=0,k,c;(k=n.kids[i]);i++){
if(this._nodeMatchesProps(k,_4f)){
return k;
}else{
c=this.findNode(_4f,k);
if(c){
return c;
}
}
}
},findTreeNode:function(_51,_52){
var n=_52||this.root;
for(var i=0,k,c;(k=n.kids[i]);i++){
if(_51==k.data){
return k;
}else{
c=this.findTreeNode(_51,k);
if(c){
return c;
}
}
}
},findNodeByCallack:function(_53){
return this.root.findDescendant(_53);
},findDomNode:function(_54){
return this.root.findDomNode(_54);
},onclick:function(_55){
},_oncanselect:function(_56,_57){
},onmousedown:function(_58){
},onselect:function(_59){
},ondeselect:function(_5a){
},oncheckboxclick:function(_5b){
},ondblclick:function(_5c){
},oninitchildren:function(_5d){
}});
}
if(!dojo._hasResource["wm.base.widget.Trees.JSObjTreeNode"]){
dojo._hasResource["wm.base.widget.Trees.JSObjTreeNode"]=true;
dojo.provide("wm.base.widget.Trees.JSObjTreeNode");
dojo.declare("wm.JSObjTreeNode",wm.TreeNode,{closed:true,setContent:function(_5e){
this.content=_5e;
if(this.contentNode){
this.inherited(arguments);
}
},constructor:function(_5f,_60){
if(this.object!==undefined){
this.setObject(this.object);
}else{
this.setContent(this.prefix||"");
}
},setObject:function(_61){
this.object=_61;
var _62=this.prefix;
_62=(_62)?_62+":":"";
if(dojo.isArray(_61)&&_61.length==0){
this.setContent(_62+"[]");
}else{
if(_61===null||_61===undefined){
this.setContent(_62+""+String(_61));
}else{
if(typeof _61=="object"&&wm.isEmpty(_61)){
this.setContent(_62+"{}");
}else{
if(typeof _61=="object"){
this.hasChildren=true;
var _63="";
if(dojo.isArray(_61)){
_63="Array of length "+_61.length;
}else{
try{
_63=_61 instanceof wm.Component?_61.getRuntimeId():_61.toString();
}
catch(e){
_63="{?}";
}
}
this.setContent(_62+_63);
this.styleNode();
}else{
this.setContent(_62+_61);
}
}
}
}
},initNodeChildren:function(_64){
var _65=this.object;
for(var i in _65){
new wm.JSObjTreeNode(this,{prefix:i,object:_65[i]});
}
}});
}
if(!dojo._hasResource["wm.base.widget.Trees.ObjectTree"]){
dojo._hasResource["wm.base.widget.Trees.ObjectTree"]=true;
dojo.provide("wm.base.widget.Trees.ObjectTree");
dojo.declare("wm.ObjectTree",wm.Tree,{data:null,postInit:function(){
this.inherited(arguments);
if(this.data){
this.setData(this.data);
}
},setData:function(_66){
if(dojo.isString(_66)){
_66=dojo.fromJson(_66);
}
this.data=_66;
this.root.destroy();
this.root=new wm.JSPrettyObjTreeRootNode(this,{prefix:"",object:_66});
this.root.setOpen(true);
},makePropEdit:function(_67,_68,_69){
switch(_67){
case "data":
if(!_68){
_68="";
}else{
if(!dojo.isString(_68)){
_68=dojo.toJson(_68);
}
}
return new wm.LargeTextArea(dojo.mixin(_69,{height:"300px",dataValue:_68}));
}
return this.inherited(arguments);
},onselect:function(_6a,_6b){
},select:function(_6c){
if(this.selected!=_6c){
this.deselect();
this.addToSelection(_6c);
this.onselect(_6c,_6c.object||_6c.content);
}
}});
dojo.declare("wm.JSPrettyObjTreeNode",wm.JSObjTreeNode,{setObject:function(_6d){
this.object=_6d;
var _6e=this.prefix;
if(dojo.isArray(_6d)&&_6d.length==0){
this.setContent(_6e+": none");
}else{
if(_6d===null||_6d===undefined){
this.setContent(_6e+": none");
}else{
if(typeof _6d=="object"&&wm.isEmpty(_6d)){
this.setContent(_6e+": none");
}else{
if(typeof _6d=="object"){
this.hasChildren=true;
var _6f="";
if(dojo.isArray(_6d)){
_6f="";
}
if(_6f){
this.setContent(_6e+": "+_6f);
}else{
this.setContent(_6e);
}
this.styleNode();
}else{
if(_6e){
_6e+=": ";
}
this.setContent(_6e+_6d);
}
}
}
}
},getPropertyCount:function(){
var i=0;
for(prop in this.object){
i++;
}
return i;
},initNodeChildren:function(_70,_71){
var _72=this.object;
var _73=dojo.isArray(_72);
for(var i in _72){
if(_73&&dojo.isObject(_72[i])){
var p=this.prefix;
this.object=_72[i];
this.initNodeChildren(_70,_71||parseInt(i)+1);
this.object=_72;
}else{
var _74;
if(_71){
_74=_71+": "+i;
_71++;
}else{
if(_73){
_74=parseInt(i)+1;
}else{
_74=i;
}
}
new wm.JSPrettyObjTreeNode(this,{prefix:_74,object:_72[i]});
}
}
}});
dojo.declare("wm.JSPrettyObjTreeRootNode",[wm.JSPrettyObjTreeNode,wm.TreeRoot],{});
wm.ObjectBrowserTree=wm.ObjectTree;
}
if(!dojo._hasResource["wm.base.widget.Trees.PropertyTree"]){
dojo._hasResource["wm.base.widget.Trees.PropertyTree"]=true;
dojo.provide("wm.base.widget.Trees.PropertyTree");
dojo.declare("wm.PropertyTree",wm.Tree,{dataSet:"",configJson:"",_treeConfig:null,selectedItem:null,init:function(){
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
this.setConfigJson(this.configJson);
this.setDataSet(this.dataSet);
},setConfigJson:function(_75){
this.configJson=_75;
try{
this._treeConfig=eval("("+_75+")");
this.buildTree();
}
catch(e){
console.error("Json error in "+this.name+": "+e);
}
},setDataSet:function(_76){
this.dataSet=_76;
if(_76){
this.selectedItem.setType(_76.type);
}
this.buildTree();
},set_dataSet:function(_77){
if(_77&&!(_77 instanceof wm.Variable)){
var ds=this.getValueById(_77);
if(ds){
this.components.binding.addWire("","dataSet",ds.getId());
}
}else{
this.setDataSet(_77);
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},buildTree:function(){
this.clear();
if(!this.dataSet||!this._treeConfig){
return;
}
var _78=this.dataSet.getCount();
for(var i=0;i<_78;i++){
var _79=this.dataSet.getItem(i);
var _7a=this._treeConfig.childNodes;
var _7b=!wm.isEmpty(_7a);
var _7c;
if(this._treeConfig.displayExpression){
_7c=wm.expression.getValue(this._treeConfig.displayExpression,_79,this.owner);
}else{
_7c=_79.getValue(this._treeConfig.displayField);
}
var _7d=new wm.TreeNode(this.root,{closed:true,data:_79,dataValue:null,_nodeConfig:_7a,content:_7c});
if(_7b){
var _7e=new wm.TreeNode(_7d,{close:true,content:"_PLACEHOLDER"});
}
}
},buildSubTree:function(_7f){
var _80=_7f._nodeConfig;
for(var _81 in _80){
var _82=_7f.data.getValue(_81);
if(_82 instanceof wm.Variable){
var _83=_82;
var _84=_80[_81];
var _85=_84.childNodes;
var _86=!wm.isEmpty(_85);
if(_83.isList){
var _87=_83.getCount();
for(var i=0;i<_87;i++){
var _88=_83.getItem(i);
var _89;
if(_84.displayExpression){
_89=wm.expression.getValue(_84.displayExpression,_88,this.owner);
}else{
_89=_88.getValue(_84.displayField);
}
var _8a=new wm.TreeNode(_7f,{closed:true,data:_88,propertyName:_81,dataValue:null,_nodeConfig:_85,content:_89});
if(_86){
var _8b=new wm.TreeNode(_8a,{close:true,content:"_PLACEHOLDER"});
}
}
}else{
var _89;
var _88=_83;
if(_84.displayExpression){
_89=wm.expression.getValue(_84.displayExpression,_88);
}else{
_89=_88.getValue(_84.displayField);
}
var _8a=new wm.TreeNode(_7f,{closed:true,data:_83,propertyName:_81,dataValue:null,_nodeConfig:_85,content:_89});
if(_86){
var _8b=new wm.TreeNode(_8a,{closed:true,content:"_PLACEHOLDER"});
}
}
}else{
var _89;
if(_80[_81].displayExpression){
_89=wm.expression.getValue(_80[_81].displayExpression,_7f.data,this.owner);
}else{
_89=_82;
}
var _8a=new wm.TreeNode(_7f,{closed:true,data:_7f.data,propertyName:_81,dataValue:_82,content:_89});
}
}
},initNodeChildren:function(_8c){
if(_8c.kids.length==1&&_8c.kids[0].content=="_PLACEHOLDER"){
_8c.remove(_8c.kids[0]);
this.buildSubTree(_8c);
}
},select:function(_8d){
if(this.selected!=_8d){
this.deselect();
this.addToSelection(_8d);
this.selectedItem.setData(_8d.data);
var _8e=[_8d.data];
var _8f=_8d.parent;
while(_8f!=this.root){
if(dojo.indexOf(_8e,_8f.data)==-1){
_8e.push(_8f.data);
}
_8f=_8f.parent;
}
this.onselect(_8d,_8e,_8d.propertyName,_8d.dataValue);
}
},onselect:function(_90,_91,_92,_93){
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.Trees.DraggableTree"]){
dojo._hasResource["wm.base.widget.Trees.DraggableTree"]=true;
dojo.provide("wm.base.widget.Trees.DraggableTree");
dojo.declare("wm.DraggableTree",wm.Tree,{dragEnabled:true,classNames:"wmtree wmdraggabletree",dropBetweenNodes:false,init:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmouseup",this,"treeMouseUp");
},postInit:function(){
this.inherited(arguments);
this.dragger=new wm.DraggableTreeMover();
this.dragger.ondrop=dojo.hitch(this,"nodeDrop");
this.dragger.manager=this;
},setNoDrop:function(_94,_95){
_94.noDrop=_95;
dojo.toggleClass(_94.contentNode,"noDrop",_95);
},getNoDrop:function(_96){
return _96.noDrop;
},nodeDrop:function(){
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
if(this.dropBetweenNodes){
dojo.query(".dndHoverTop",this.root.domNode).removeClass("dndHoverTop");
dojo.query(".dndHoverBottom",this.root.domNode).removeClass("dndHoverBottom");
}
this.dragger.mouseUp();
var _97=this.draggedItem;
var _98=this.dragger.target;
if(!_98||this.getNoDrop(_98)&&!this.dropBetweenNodes){
return;
}
if(this.dropBetweenNodes){
var _99=!this.getNoDrop(_98.parent);
var _9a;
switch(this.dragger.targetArea){
case "top":
if(_99){
_9a=dojo.indexOf(_98.parent.kids,_98);
_98=_98.parent;
}else{
if(!this.getNoDrop(_98)){
_9a=_98.kids.length;
}else{
return;
}
}
break;
case "mid":
if(!this.getNoDrop(_98)){
_9a=_98.kids.length;
}else{
_9a=dojo.indexOf(_98.parent.kids,_98)+1;
_98=_98.parent;
}
break;
case "bot":
if(!this.getNoDrop(_98)&&!_98.closed&&_98.kids){
if(_98.declaredClass=="wm.TreeNode"&&_98.kids.length==0){
_9a=dojo.indexOf(_98.parent.kids,_98)+1;
_98=_98.parent;
}else{
_9a=0;
}
}else{
if(_99){
_9a=dojo.indexOf(_98.parent.kids,_98)+1;
_98=_98.parent;
}else{
return;
}
}
}
_97.parentIndex=_9a;
}
var _9b={result:true};
this.onCanDropNode(_97,_98,_9a,_9c,_9b);
if(!_9b.result){
return false;
}
var _9c=_97.parent;
_9c._remove(_97);
_97.addParent(_98);
_98.renderChild(_97);
this.onNodeDrop(_97,_98,_9a,_9c);
},onNodeDrop:function(_9d,_9e,_9f,_a0){
},onCanDropNode:function(_a1,_a2,_a3,_a4,_a5){
},treeMouseDown:function(e){
var _a6=this.findEventNode(e);
if(_a6!=null&&!_a6.isRoot()){
this.drag(_a6,e);
}
},drag:function(_a7,_a8){
this.dragger.root=this.root;
this.draggedItem=_a7;
if(this.dragEnabled){
this.dragger.beginDrag(_a8,{caption:_a7.content,control:_a7});
}
},treeMouseUp:function(_a9,_aa,_ab){
this.dragger.drag();
},_end:0});
dojo.declare("wm.DraggableTreeMover",wm.DragDropper,{constructor:function(){
this.info={};
this.hoverStyleNodes=[];
},beginDrag:function(_ac,_ad){
this.info=_ad||this.info;
this.mousedown(_ac);
},initNodes:function(){
this.inherited(arguments);
this.markNode=document.createElement("div");
this.markNode.style.cssText="position: absolute; z-index: 2; border: 2px solid green;";
this.scrimNode.appendChild(this.markNode);
this.hSnapNode=document.createElement("div");
this.hSnapNode.style.cssText="position: absolute; z-index: 2; border: 1px dotted red; display: none;";
this.scrimNode.appendChild(this.hSnapNode);
this.vSnapNode=document.createElement("div");
this.vSnapNode.style.cssText="position: absolute; z-index: 2; border: 1px dotted red; display: none;";
this.scrimNode.appendChild(this.vSnapNode);
},start:function(e){
this.target=null;
kit._setMarginBox(this.markNode,0,0,0,0);
this.rootOffset=wm.calcOffset(this.root.domNode,this.scrimNode);
this.inherited(arguments);
this.setTarget(null);
},drag:function(e){
this.inherited(arguments);
if(!this.rootOffset){
return;
}
var r={l:this.pxp-this.rootOffset.x,t:this.pyp-this.rootOffset.y,w:0,h:0};
this.findTarget(r);
},mouseUp:function(){
if(this.target){
dojo.removeClass(this.target.domNode,"dndHover");
}
},drop:function(e){
dojo.query(".dndHover").removeClass("dndHover");
this.inherited(arguments);
},setTarget:function(_ae){
dojo.forEach(this.hoverStyleNodes,function(e){
dojo.removeClass(e,"dndHoverTop");
dojo.removeClass(e,"dndHoverBottom");
});
if(this.target){
dojo.removeClass(this.target.domNode,"dndHover");
}
this.target=_ae;
if(this.target&&(this.manager.dropBetweenNodes||!this.manager.getNoDrop(this.target))){
this.setCursor("move");
this.targetNode=this.target.domNode;
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
dojo.addClass(this.target.domNode,"dndHover");
}else{
this.setCursor("no-drop");
this.targetNode=null;
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
}
},setTargetArea:function(_af){
if(!this.manager.dropBetweenNodes){
return;
}
this.targetArea=_af;
dojo.forEach(this.hoverStyleNodes,function(e){
dojo.removeClass(e,"dndHoverTop");
dojo.removeClass(e,"dndHoverBottom");
});
this.hoverStyleNodes=[];
switch(_af){
case "top":
dojo.addClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.domNode,"dndHoverTop");
this.hoverStyleNodes.push(this.target.domNode);
break;
case "bot":
if(!this.target.closed&&this.target.kids&&this.target.kids.length&&!this.manager.getNoDrop(this.target)){
dojo.removeClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.kids[0].domNode,"dndHoverTop");
this.hoverStyleNodes.push(this.target.kids[0].domNode);
}else{
dojo.addClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.domNode,"dndHoverBottom");
this.hoverStyleNodes.push(this.target.domNode);
}
break;
case "mid":
dojo.addClass(this.target.domNode,"dndHover");
if(this.manager.getNoDrop(this.target)){
dojo.addClass(this.target.domNode,"dndHoverBottom");
this.hoverStyleNodes.push(this.target.domNode);
}
}
},updateAvatar:function(){
this.showHideAvatar(true);
if(!this.target){
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
}else{
var dn=this.target.content;
var _b0="Drop <b>"+this.info.caption+"</b>";
if(!this.manager.dropBetweenNodes){
_b0+=" into ";
}else{
var _b1=!this.manager.getNoDrop(this.target.parent);
switch(this.targetArea){
case "top":
if(_b1){
var _b2=dojo.indexOf(this.target.parent.kids,this.target);
var _b3;
if(_b2>0){
_b3=this.target.parent.kids[_b2-1];
dn=_b3.content;
_b0+=" after ";
}else{
_b3=this.target.parent;
dn=_b3.content;
_b0+=" first child of ";
}
}else{
if(!this.manager.getNoDrop(this.target)){
_b0+=" into ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
case "bot":
if(!this.target.closed&&!this.manager.getNoDrop(this.target)){
if(this.target.declaredClass=="wm.TreeNode"&&this.target.kids.length==0){
_b0+=" after ";
}else{
_b0+=" first child of ";
}
}else{
if(_b1){
_b0+=" after ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
case "mid":
if(!this.manager.getNoDrop(this.target)){
_b0+=" into ";
}else{
if(_b1){
_b0+=" after ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
}
}
this.setAvatarContent(_b0+" <b>"+dn+"</b>");
}
},findTarget:function(_b4){
var t;
if(this.targetInRoot(_b4)){
t=this._findTarget(_b4,this.root);
}else{
t=null;
}
if(t==this.manager.draggedItem){
t=null;
}
if(t!=this.target){
this.setTarget(t);
if(this.target){
this.setTargetArea(this._targetArea);
}
}else{
if(this.target&&this.targetArea!=this._targetArea){
this.setTargetArea(this._targetArea);
}
}
this.updateAvatar();
},_findTarget:function(_b5){
var _b6=dojo.query("#"+this.manager.domNode.id+" .wmtree-content").filter(dojo.hitch(this,function(_b7){
if(this.manager.dropBetweenNodes||!dojo.hasClass(_b7,"noDrop")){
var loc=dojo.coords(_b7);
var inY=loc.t<_b5.t&&loc.t+loc.h>_b5.t;
var inX=loc.l<_b5.l&&loc.l+loc.w>_b5.l;
return (inY&&inX);
}
}));
if(_b6.length==0){
return null;
}
var _b8=_b6[_b6.length-1];
var _b9=dojo.coords(_b8);
var _ba=Math.floor(_b9.h/3);
var y=_b5.t-_b9.t;
if(y<=_ba){
this._targetArea="top";
}else{
if(y<=_ba*2){
this._targetArea="mid";
}else{
this._targetArea="bot";
}
}
var _bb=this.root.findDomNode(_b8);
return _bb;
},targetInRoot:function(_bc){
var h=_bc;
var b=wm.calcOffset(this.draggedItem,this.manager.root.domNode);
var _bd=!(h.l<0||h.t<0||h.l>b.w||h.t>b.h);
return _bd;
}});
}
