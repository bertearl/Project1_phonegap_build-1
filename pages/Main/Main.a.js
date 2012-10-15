dojo.declare("Main", wm.Page, {
start: function() {
},
"preferredDevice": "tablet",
_end: 0
});

Main.widgets = {
brickproductLiveVariable1: ["wm.LiveVariable", {"type":"com.standardproductsdb.data.Brickproduct"}, {}, {
liveView: ["wm.LiveView", {"dataType":"com.standardproductsdb.data.Brickproduct","view":[{"caption":"Id","sortable":true,"dataIndex":"id","type":"java.lang.Integer","displayType":"Number","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},{"caption":"BrickName","sortable":true,"dataIndex":"brickName","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},{"caption":"BrickOwner","sortable":true,"dataIndex":"brickOwner","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},{"caption":"ProductName","sortable":true,"dataIndex":"productName","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},{"caption":"Revision","sortable":true,"dataIndex":"revision","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},{"caption":"Type","sortable":true,"dataIndex":"type","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},{"caption":"MaintReviewSchedule","sortable":true,"dataIndex":"maintReviewSchedule","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},{"caption":"Vendor","sortable":true,"dataIndex":"vendor","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},{"caption":"LifeCycleFlag","sortable":true,"dataIndex":"lifeCycleFlag","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},{"caption":"ModifiedDate","sortable":true,"dataIndex":"modifiedDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null},{"caption":"ModifiedBy","sortable":true,"dataIndex":"modifiedBy","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":10,"subType":null}]}, {}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
toggleButtonPanel1: ["wm.ToggleButtonPanel", {"horizontalAlign":"left","manageHistory":true,"manageURL":true,"margin":"0,1,0,0","verticalAlign":"top"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"navButton1","targetProperty":"currentButton"}, {}]
}],
navButton1: ["wm.Button", {"border":"0,1,0,0","caption":"Layer One","desktopHeight":"100%","height":"40px","margin":"0","width":"100%"}, {"onclick":"layer1"}],
navButton2: ["wm.Button", {"border":"0,1,0,0","caption":"Layer Two","desktopHeight":"100%","height":"40px","margin":"0","width":"100%"}, {"onclick":"layer2"}],
navButton3: ["wm.Button", {"border":"0","caption":"Layer Three","desktopHeight":"100%","height":"40px","margin":"0","width":"100%"}, {"onclick":"layer3"}]
}],
layers1: ["wm.Layers", {"margin":"3,0,0,0"}, {}, {
layer1: ["wm.Layer", {"borderColor":"","caption":"layer1","horizontalAlign":"left","layoutKind":"left-to-right","themeStyleType":"","verticalAlign":"top"}, {}, {
brickproductLivePanel1: ["wm.LivePanel", {"horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top"}, {}, {
brickproductDojoGrid: ["wm.List", {"_classes":{"domNode":["GridListStyle"]},"border":"1","columns":[{"show":false,"field":"id","title":"Id","width":"80px","align":"right","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":true,"field":"brickName","title":"BrickName","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"brickOwner","title":"BrickOwner","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"productName","title":"ProductName","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"revision","title":"Revision","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"type","title":"Type","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"maintReviewSchedule","title":"MaintReviewSchedule","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"vendor","title":"Vendor","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"lifeCycleFlag","title":"Std","width":"20%","align":"center","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"modifiedDate","title":"ModifiedDate","width":"80px","align":"left","formatFunc":"wm_date_formatter","mobileColumn":false},{"show":false,"field":"modifiedBy","title":"ModifiedBy","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","expression":"\"<div class='MobileRowTitle'>BrickName: \" + ${brickName} + \"</div>\"\n+ \"<div class='MobileRow'>ProductName: \" + ${productName} + \"</div>\"\n+ \"<div class='MobileRow'>Std: \" + ${lifeCycleFlag} + \"</div>\"\n","mobileColumn":false}],"height":"100%","width":"50%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"brickproductLiveVariable1","targetProperty":"dataSet"}, {}]
}]
}],
brickproductLiveForm1: ["wm.LiveForm", {"autoScroll":true,"desktopHeight":"40px","enableTouchHeight":true,"height":"425px","horizontalAlign":"center","mobileHeight":"425px","readonly":true,"verticalAlign":"top","width":"50%"}, {"onSuccess":"brickproductLiveVariable1"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"brickproductDojoGrid.selectedItem","targetProperty":"dataSet"}, {}]
}],
idEditor1: ["wm.Number", {"caption":"Id","captionSize":"140px","changeOnKey":true,"dataValue":0,"desktopHeight":"26px","emptyValue":"zero","formField":"id","height":"35px","readonly":true,"required":true,"width":"100%"}, {}],
brickNameEditor1: ["wm.Text", {"caption":"BrickName","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"brickName","height":"35px","readonly":true,"width":"100%"}, {}],
brickOwnerEditor1: ["wm.Text", {"caption":"BrickOwner","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"brickOwner","height":"35px","readonly":true,"width":"100%"}, {}],
productNameEditor1: ["wm.Text", {"caption":"ProductName","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"productName","height":"35px","readonly":true,"width":"100%"}, {}],
revisionEditor1: ["wm.Text", {"caption":"Revision","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"revision","height":"35px","readonly":true,"width":"100%"}, {}],
typeEditor1: ["wm.Text", {"caption":"Type","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"type","height":"35px","readonly":true,"width":"100%"}, {}],
maintReviewScheduleEditor1: ["wm.Text", {"caption":"MaintReviewSchedule","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"maintReviewSchedule","height":"35px","readonly":true,"width":"100%"}, {}],
vendorEditor1: ["wm.Text", {"caption":"Vendor","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"vendor","height":"35px","readonly":true,"width":"100%"}, {}],
lifeCycleFlagEditor1: ["wm.Text", {"caption":"LifeCycleFlag","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"lifeCycleFlag","height":"35px","readonly":true,"width":"100%"}, {}],
modifiedDateEditor1: ["wm.DateTime", {"caption":"ModifiedDate","captionSize":"140px","dateMode":"Date","desktopHeight":"26px","emptyValue":"zero","formField":"modifiedDate","height":"35px","readonly":true,"width":"100%"}, {}],
modifiedByEditor1: ["wm.Text", {"caption":"ModifiedBy","captionSize":"140px","changeOnKey":true,"dataValue":"","desktopHeight":"26px","emptyValue":"emptyString","formField":"modifiedBy","height":"35px","readonly":true,"width":"100%"}, {}],
brickproductSpacer: ["wm.Spacer", {"height":"100%","width":"10px"}, {}],
brickproductLiveForm1EditPanel: ["wm.EditPanel", {"desktopHeight":"32px","liveForm":"brickproductLiveForm1","operationPanel":"operationPanel1","savePanel":"savePanel1"}, {}, {
savePanel1: ["wm.Panel", {"height":"100%","horizontalAlign":"right","layoutKind":"left-to-right","showing":false,"verticalAlign":"top","width":"100%"}, {}, {
saveButton1: ["wm.Button", {"caption":"Save","height":"100%","margin":"4"}, {"onclick":"brickproductLiveForm1EditPanel.saveData"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"brickproductLiveForm1EditPanel.formInvalid","targetProperty":"disabled"}, {}]
}]
}],
cancelButton1: ["wm.Button", {"caption":"Cancel","height":"100%","margin":"4"}, {"onclick":"brickproductLiveForm1EditPanel.cancelEdit"}]
}],
operationPanel1: ["wm.Panel", {"height":"100%","horizontalAlign":"right","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
newButton1: ["wm.Button", {"caption":"New","height":"100%","margin":"4"}, {"onclick":"brickproductLiveForm1EditPanel.beginDataInsert"}],
updateButton1: ["wm.Button", {"caption":"Update","height":"100%","margin":"4"}, {"onclick":"brickproductLiveForm1EditPanel.beginDataUpdate"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"brickproductLiveForm1EditPanel.formUneditable","targetProperty":"disabled"}, {}]
}]
}],
deleteButton1: ["wm.Button", {"caption":"Delete","height":"100%","margin":"4"}, {"onclick":"brickproductLiveForm1EditPanel.deleteData"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"brickproductLiveForm1EditPanel.formUneditable","targetProperty":"disabled"}, {}]
}]
}]
}]
}]
}]
}]
}],
layer2: ["wm.Layer", {"borderColor":"","caption":"layer2","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
label2: ["wm.Label", {"caption":"PageContainer1 is below this label","padding":"4","styles":{"fontWeight":"bold","fontSize":"16px","textAlign":"center"},"width":"100%"}, {}],
pageContainer1: ["wm.PageContainer", {"deferLoad":true}, {}]
}],
layer3: ["wm.Layer", {"borderColor":"","caption":"layer3","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
label3: ["wm.Label", {"caption":"PageContainer2 is below this label","padding":"4","styles":{"fontWeight":"bold","fontSize":"16px","textAlign":"center"},"width":"100%"}, {}],
pageContainer2: ["wm.PageContainer", {"deferLoad":true}, {}]
}]
}]
}]
};

Main.prototype._cssText = '';
Main.prototype._htmlText = '';