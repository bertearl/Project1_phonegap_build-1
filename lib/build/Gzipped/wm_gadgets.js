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

dojo.provide("wm.compressed.wm_gadgets");
if(!dojo._hasResource["wm.base.widget.IFrame"]){
dojo._hasResource["wm.base.widget.IFrame"]=true;
dojo.provide("wm.base.widget.IFrame");
dojo.declare("wm.IFrame",wm.Control,{scrim:true,source:"",build:function(){
this.frame=document.createElement("iframe");
this.domNode=dojo.byId(this.domNode||this.id||undefined);
if(!this.domNode){
this.domNode=this.frame;
}else{
this.domNode.appendChild(this.frame);
}
},init:function(){
dojo.addClass(this.domNode,"wmiframe");
this.inherited(arguments);
this.setSource(this.getSource());
},buildCssSetterObj:function(){
var _1=this.inherited(arguments);
_1.overflow="";
_1.overflowX="";
_1.overflowY="";
return _1;
},getSource:function(){
return this.source;
},setSource:function(_2){
if(!dojo.isString(_2)||_2=="undefined"){
_2="";
}
this.source=_2;
var _3=this.source.slice(0,4)!="http"&&this.source.slice(0,1)!="/"?this.getPath():"";
this.frame.src=this.source?_3+this.source:this.source;
this.valueChanged("source",this.source);
},toHtml:function(){
return "<iframe src='"+this.source+"'></iframe>";
}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Gadget"]){
dojo._hasResource["wm.base.widget.gadget.Gadget"]=true;
dojo.provide("wm.base.widget.gadget.Gadget");
dojo.declare("wm.Gadget",wm.IFrame,{width:"268px",height:"246px",update:function(){
this.setSource(this.source);
}});
wm.Object.extendSchema(wm.Gadget,{source:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Stocks"]){
dojo._hasResource["wm.base.widget.gadget.Stocks"]=true;
dojo.provide("wm.base.widget.gadget.Stocks");
dojo.declare("wm.gadget.Stocks",wm.Gadget,{ticker:"GOOG",source:"http://gmodules.com/ig/ifr?url=http://www.tigersyard.com/gadgets/stock.xml&up_price1=200&up_refreshtime=1000&up_symbol1=GOOG&up_shares1=5&up_link=google&synd=open&w=320&h=190&title=Stocks&border=%23ffffff%7C3px%2C1px+solid+%23999999",setTicker:function(_4){
this.ticker=_4;
this.update();
},update:function(){
var rx=new RegExp("up_symbol1=[^&]*&","g");
this.source=this.source.replace(rx,"up_symbol1="+this.ticker+"&");
this.inherited(arguments);
}});
wm.Object.extendSchema(wm.gadget.Stocks,{ticker:{bindable:1,type:"String"}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Weather"]){
dojo._hasResource["wm.base.widget.gadget.Weather"]=true;
dojo.provide("wm.base.widget.gadget.Weather");
dojo.declare("wm.gadget.Weather",wm.Gadget,{zip:"94105",source:"http://gmodules.com/ig/ifr?url=http://www.labpixies.com/campaigns/weather/weather.xml&up_degree_unit_type=0&up_city_code=none&up_zip_code=94105&synd=open&w=320&h=224&title=Live+Weather&border=%23ffffff%7C3px%2C1px+solid+%23999999",setZip:function(_5){
this.zip=_5;
this.update();
},update:function(){
var rx=new RegExp("up_zip_code=[^&]*&","g");
this.source=this.source.replace(rx,"up_zip_code="+this.zip+"&");
this.inherited(arguments);
}});
wm.Object.extendSchema(wm.gadget.Weather,{zip:{bindable:1,type:"String"}});
}
if(!dojo._hasResource["wm.base.widget.gadget.YouTube"]){
dojo._hasResource["wm.base.widget.gadget.YouTube"]=true;
dojo.provide("wm.base.widget.gadget.YouTube");
dojo.declare("wm.gadget.YouTube",wm.Gadget,{videoId:"http://youtu.be/Zmqu39fzPxY",autoScroll:true,build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"allowfullscreen","true");
},getSource:function(){
if(!this.videoId||this._isDesignLoaded){
return "";
}
var id=this.videoId||"";
id=id.replace(/^.*\//,"");
id=id.replace(/^watch\?v\=/,"");
return "http://www.youtube.com/embed/"+id;
},setVideoId:function(_6){
this.videoId=_6;
this.setSource(this.getSource());
}});
wm.Object.extendSchema(wm.gadget.YouTube,{videoId:{bindTarget:1,group:"display",subgroup:"behavior",requiredGroup:1}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Facebook"]){
dojo._hasResource["wm.base.widget.gadget.Facebook"]=true;
dojo.provide("wm.base.widget.gadget.Facebook");
dojo.declare("wm.gadget.Facebook",wm.Gadget,{});
dojo.declare("wm.gadget.FacebookLikeButton",wm.gadget.Facebook,{width:"400px",height:"100px",base_source:"http://www.facebook.com/plugins/like.php",href:"",layout:"standard",show_faces:true,action:"like",font:"arial",colorscheme:"dark",ref:"",updateSource:function(){
var b=this.getContentBounds();
this._width=b.w;
this._height=b.h;
this.source=this.base_source+"?"+"href="+this.href+"&layout="+this.layout+"&show_faces="+this.show_faces+"&action="+this.action+"&font="+this.font+"&width="+this._width+"&height="+this._height+"&ref="+this.ref+"&colorscheme="+this.colorscheme;
this.setSource(this.source);
},renderBounds:function(){
this.inherited(arguments);
var b=this.getContentBounds();
if(b.w!=this._width||b.h!=this._height){
this.updateSource();
}
},setHref:function(_7){
this.href=_7;
this.updateSource();
},setLayout:function(_8){
this.layout=_8;
switch(_8){
case "box_count":
this.setWidth(87+this.padBorderMargin.r+this.padBorderMargin.l+"px");
this.setHeight(62+this.padBorderMargin.t+this.padBorderMargin.b+"px");
break;
case "button_count":
this.setWidth(70+this.padBorderMargin.r+this.padBorderMargin.l+"px");
this.setHeight(21+this.padBorderMargin.t+this.padBorderMargin.b+"px");
break;
case "standard":
if(this.bounds.w<150){
this.setWidth(400+this.padBorderMargin.r+this.padBorderMargin.l+"px");
}
if(this.bounds.h<50){
this.setHeight(80+this.padBorderMargin.t+this.padBorderMargin.b+"px");
}
break;
}
this.updateSource();
},setShow_Faces:function(_9){
this.show_faces=_9;
this.updateSource();
},setAction:function(_a){
this.action=_a;
this.updateSource();
},setFont:function(_b){
this.font=_b;
this.updateSource();
},setColorscheme:function(_c){
this.colorscheme=_c;
this.updateSource();
}});
dojo.declare("wm.gadget.FacebookActivityFeed",wm.gadget.Facebook,{width:"200px",height:"400px",base_source:"http://www.facebook.com/plugins/activity.php",site:"wavemaker.com",showHeader:true,font:"arial",colorscheme:"dark",showRecommendations:false,ref:"",updateSource:function(){
var b=this.getContentBounds();
this._width=b.w;
this._height=b.h;
this.source=this.base_source+"?"+"site="+this.site+"&header="+this.showHeader+"&recommendations="+this.showRecommendations+"&font="+this.font+"&width="+this._width+"&height="+this._height+"&ref="+this.ref+"&colorscheme="+this.colorscheme;
this.setSource(this.source);
},renderBounds:function(){
this.inherited(arguments);
var b=this.getContentBounds();
if(b.w!=this._width||b.h!=this._height){
this.updateSource();
}
},setSite:function(_d){
this.site=_d;
this.updateSource();
},setShowHeader:function(_e){
this.showHeader=_e;
this.updateSource();
},setShowRecommendations:function(_f){
this.showRecommendations=_f;
this.updateSource();
},setFont:function(_10){
this.font=_10;
this.updateSource();
},setColorscheme:function(_11){
this.colorscheme=_11;
this.updateSource();
}});
}
if(!dojo._hasResource["wm.base.widget.gadget.TwitterGadgets"]){
dojo._hasResource["wm.base.widget.gadget.TwitterGadgets"]=true;
dojo.provide("wm.base.widget.gadget.TwitterGadgets");
dojo.declare("wm.gadget.TwitterFollowButton",wm.Gadget,{scrim:true,autoScroll:false,width:"300px",height:"20px",screenName:"WaveMakerDev",showFollowerCount:true,buttonColor:"blue",linkColor:"",textColor:"",build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"scrolling","no");
dojo.attr(this.domNode,"allowtransparency","true");
},getSource:function(){
return "http://platform.twitter.com/widgets/follow_button.html?"+"screen_name="+this.screenName+"&button="+this.buttonColor+(this.linkColor?"&link_color="+this.linkColor.substring(1):"")+(this.textColor?"&text_color="+this.textColor.substring(1):"")+"&show_count="+this.showFollowerCount+"&lang="+dojo.locale;
},setScreenName:function(_12){
this.screenName=_12;
this.setSource(this.getSource());
},setButtonColor:function(_13){
this.buttonColor=_13;
this.setSource(this.getSource());
},setLinkColor:function(_14){
this.linkColor=_14;
this.setSource(this.getSource());
},setTextColor:function(_15){
this.textColor=_15;
this.setSource(this.getSource());
},setShowFollowerCount:function(_16){
this.showFollowerCount=Boolean(_16);
this.setSource(this.getSource());
}});
wm.Object.extendSchema(wm.gadget.TwitterFollowButton,{screenName:{bindTarget:1,group:"widgetName",subgroup:"data"},buttonColor:{group:"widgetName",subgroup:"style",options:["blue","grey"]},showFollowerCount:{group:"widgetName",subgroup:"layout",type:"Boolean"},linkColor:{group:"widgetName",subgroup:"style",editor:"wm.ColorPicker"},textColor:{group:"widgetName",subgroup:"style",editor:"wm.ColorPicker"}});
dojo.declare("wm.gadget.TwitterTweetButton",wm.Gadget,{scrim:true,autoScroll:false,width:"100px",height:"20px",url:"http://dev.wavemaker.com/",via:"",countPosition:"horizontal",build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"scrolling","no");
dojo.attr(this.domNode,"allowtransparency","true");
},getSource:function(){
return "http://platform.twitter.com/widgets/tweet_button.html?"+"url="+escape(this.url)+"&count="+this.countPosition+(this.via?"&via="+this.via:"");
},setUrl:function(_17){
this.url=_17;
this.setSource(this.getSource());
},setVia:function(_18){
this.via=_18;
this.setSource(this.getSource());
},setCountPosition:function(_19){
this.countPosition=_19;
this.setSource(this.getSource());
if(this._isDesignLoaded){
switch(_19){
case "vertical":
this.setWidth("56px");
this.setHeight("63px");
break;
case "horizontal":
this.setWidth("100px");
this.setHeight("20px");
break;
case "none":
this.setWidth("55px");
this.setHeight("20px");
break;
}
}
}});
wm.Object.extendSchema(wm.gadget.TwitterTweetButton,{url:{bindTarget:1,group:"widgetName",subgroup:"data"},via:{bindTarget:1,group:"widgetName",subgroup:"data"},countPosition:{group:"widgetName",subgroup:"layout",options:["none","horizontal","vertical"]}});
}
if(!dojo._hasResource["wm.base.widget.gadget.GoogleMap"]){
dojo._hasResource["wm.base.widget.gadget.GoogleMap"]=true;
dojo.provide("wm.base.widget.gadget.GoogleMap");
dojo.declare("wm.gadget.GoogleMap",wm.Control,{scrim:true,width:"100%",height:"100%",minHeight:"100",latitude:37.789607,longitude:-122.39984,zoom:17,mapType:"ROADMAP",dataSet:"",addressField:"",latitudeField:"",longitudeField:"",titleField:"",descriptionField:"",iconField:"",_map:"",_markers:"",_infoWindow:"",selectedItem:"",init:function(){
this._dataToGeocode=[];
if(!dojo.byId("GoogleMapsScript")){
var _1a=document.createElement("script");
_1a.type="text/javascript";
_1a.id="GoogleMapsScript";
_1a.src="http://maps.google.com/maps/api/js?sensor=false&callback=wm.gadget.GoogleMap.initialize";
document.body.appendChild(_1a);
}
this._markers=[];
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
if(!this._isDesignLoaded){
if(!this.latitudeField){
this.latitudeField="_latitude";
}
if(!this.longitudeField){
this.longitudeField="_longitude";
}
}
},postInit:function(){
this.inherited(arguments);
if(window.google&&window.google.maps){
this.initialize();
}else{
wm.gadget.GoogleMap.waitingForInitialize.push(this);
}
},initialize:function(){
var _1b=new google.maps.LatLng(this.latitude,this.longitude);
var _1c={zoom:this.zoom,center:_1b,mapTypeId:google.maps.MapTypeId[this.mapType]};
this._map=new google.maps.Map(this.domNode,_1c);
if(this.dataSet&&this.dataSet.getCount()){
this.generateMarkers();
}
this._infoWindow=new google.maps.InfoWindow();
},renderBounds:function(){
if(this.inherited(arguments)&&this._map){
google.maps.event.trigger(this._map,"resize");
}
},setZoom:function(_1d){
this.zoom=_1d;
if(this._map){
this._map.setZoom(Number(_1d));
}
},setLatitude:function(_1e){
this.latitude=_1e;
wm.onidle(this,function(){
if(this._map){
this._map.setCenter(new google.maps.LatLng(this.latitude,this.longitude));
}
});
},setLongitude:function(_1f){
this.longitude=_1f;
wm.onidle(this,function(){
if(this._map){
this._map.setCenter(new google.maps.LatLng(this.latitude,this.longitude));
}
});
},fitToMarkers:function(){
var _20=10000000;
var _21=10000000;
var _22=-1000000;
var _23=-1000000;
if(!this.dataSet){
return;
}
var _24=this.dataSet.getCount();
if(_24==0){
return;
}
for(var i=0;i<_24;i++){
var _25=this.dataSet.getItem(i);
var lat=_25.getValue(this.latitudeField);
var lon=_25.getValue(this.longitudeField);
if(lat<_20){
_20=lat;
}
if(lat>_22){
_22=lat;
}
if(lon<_21){
_21=lon;
}
if(lon>_23){
_23=lon;
}
}
var _26=new google.maps.LatLng(_22,_23);
var _27=new google.maps.LatLng(_20,_21);
this._map.fitBounds(new google.maps.LatLngBounds(_27,_26));
},setMapType:function(_28){
this.mapType=_28;
if(this._map){
this._map.setMapTypeId(google.maps.MapTypeId[this.mapType]);
}
},setDataSet:function(_29){
this.dataSet=_29;
if(_29){
this.selectedItem.setType(_29.type);
}
dojo.forEach(this._markers,function(m){
m.setMap(null);
});
this._markers=[];
if(this._map&&_29){
this.generateMarkers();
}
},onGeocodeError:function(_2a,_2b){
},geocode:function(_2c){
this._dataToGeocode.push(_2c);
this.geocodeNext();
},geocodeNext:function(){
if(this._geocoding){
return;
}
this._geocoding=true;
this.onIncrementGeocodeCount(this._dataToGeocode.length,this.dataSet.getCount());
this._geocode(this._dataToGeocode.shift(),this._dataToGeocode.length?dojo.hitch(this,"geocodeNext"):dojo.hitch(this,"onGeocodeComplete"));
},onIncrementGeocodeCount:function(_2d,_2e){
},onGeocodeComplete:function(){
},onGeocodeSuccess:function(_2f){
},onGeocodeError:function(_30,_31){
},_geocode:function(_32,_33){
var _34=this;
var _35;
if(!this.geocoder){
this.geocoder=new google.maps.Geocoder();
}
this.geocoder.geocode({"address":_32[this.addressField]},function(_36,_37){
_34._geocoding=false;
if(_37==google.maps.GeocoderStatus.OK){
var _38=_36[0].geometry.location;
_32[_34.latitudeField]=_38.lat();
_32[_34.longitudeField]=_38.lng();
_34.generateMarker(_32);
_34.onGeocodeSuccess(_32);
}else{
if(_37==google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
_34._dataToGeocode.push(_32);
wm.job("geocodeNext",500,dojo.hitch(_34,"geocodeNext"));
return;
}else{
console.error("Failed to geocode "+_32[_34.addressField]+"; "+_37);
_34.onGeocodeError(_37,_32);
}
}
if(_33){
_33();
}
});
},generateMarkers:function(){
var _39=this.dataSet.getData();
if(_39){
for(var i=0;i<_39.length;i++){
_39[i]._index=i+1;
this.generateMarker(_39[i]);
}
if(this._dataToGeocode.length){
this.geocodeNext();
}
}
},generateMarker:function(d){
var lat=d[this.latitudeField];
var lon=d[this.longitudeField];
var _3a=d[this.addressField];
var _3b=d[this.titleField];
var _3c=d[this.descriptionField];
var _3d=d[this.iconField];
if(_3a&&!lat&&!lon){
this._dataToGeocode.push(d);
return;
}
switch(_3d){
case "green":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/green/blank.png";
break;
case "blue":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png";
break;
case "red":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png";
break;
case "pink":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/pink/blank.png";
break;
case "orange":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/blank.png";
break;
case "green1":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/green/marker"+d._index+".png";
break;
case "blue1":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/marker"+d._index+".png";
break;
case "red1":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/red/marker"+d._index+".png";
break;
case "pink1":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/pink/marker"+d._index+".png";
break;
case "orange1":
_3d="http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/marker"+d._index+".png";
break;
}
var _3e=new google.maps.Marker({icon:_3d,position:new google.maps.LatLng(lat,lon),map:this._map,title:_3b});
this._markers.push(_3e);
google.maps.event.addListener(_3e,"click",dojo.hitch(this,function(){
if(_3c){
this._infoWindow.setContent("<h3>"+_3b+"</h3>"+_3c);
this._infoWindow.open(this._map,_3e);
}
this.selectedItem.setData(d);
this.onMarkerClick(d);
this.onMarkerChange(d);
}));
},selectMarkerByIndex:function(_3f){
this._clickMarker(this._markers[_3f],this.dataSet.getItem(_3f));
},_clickMarker:function(_40,_41){
var _42="<h3 class='MapMarkerTitle'>"+_41.getValue(this.titleField)+"</h3><div class='MapMarkerDescription'>"+_41.getValue(this.descriptionField)+"</div>";
this._infoWindow.setContent(_42);
this._infoWindow.open(this._map,_40);
this.onMarkerChange(_41);
},onMarkerClick:function(_43){
},onMarkerChange:function(_44){
},_end:0});
wm.gadget.GoogleMap.waitingForInitialize=[];
wm.gadget.GoogleMap.initialize=function(){
dojo.forEach(wm.gadget.GoogleMap.waitingForInitialize,function(w){
w.initialize();
});
wm.gadget.GoogleMap.waitingForInitialize=[];
};
}
