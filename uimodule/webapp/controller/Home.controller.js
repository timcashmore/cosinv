sap.ui.define([
    "cosinv/cosinv/controller/BaseController"
 ], function (BaseController) {
    "use strict";
 
    return BaseController.extend("cosinv.cosinv.controller.Home", {
		onDisplayNotFound : function () {
			// display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget : "TargetApp"
			});
		},
        onNavToProductList : function () {
			this.getRouter().navTo("productList");
        },
        
        onNavToProdUpload : function () {
			this.getRouter().navTo("prodUpload");
        },

 
    });
 
 });