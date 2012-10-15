/*
 *  Copyright (C) 2008-2012 VMware, Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

dojo.provide("wm.base.widget.dijit.ColorPalette");
dojo.require("wm.base.widget.dijit.Dijit");
dojo.require("dijit.ColorPalette");

dojo.declare("wm.dijit.ColorPalette", wm.Dijit, {
	prepare: function() {	
		this.inherited('prepare', arguments);
		this.dijitClass = dijit.ColorPalette;
	},
	palette: "7x10",
	/*getProperties: function() {
		return dojo.mixin({
			palette: this.palette
		}, this.dijitProps || {});
	},*/
	onColorSelect: function(inColor) {}
});