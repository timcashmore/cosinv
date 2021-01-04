sap.ui.define(['sap/m/MessageToast','cosinv/cosinv/controller/BaseController'],
	function(MessageToast, BaseController) {
	"use strict";

	return BaseController.extend("cosinv.cosinv.controller.ProdUpload", {
		handleUploadComplete: function(oEvent) {
			var sStatus = oEvent.getParameter("status");
			//Check if status is 2xx
			console.log("Product File Upload Failed with HTTP Status = " + sStatus);
			var sMsg = `Problem Uploading File - Status Code = ${sStatus}`;
			if (/^[2][0-9][0-9]$/.test(sStatus)) {
				sMsg = `File Successfully uploaded with HTTP Status Code = ${sStatus}`;
			}
			MessageToast.show(sMsg);
		},

		handleUploadPress: function() {
			var oFileUploader = this.byId("fileUploader");
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			});
		}
	});

});