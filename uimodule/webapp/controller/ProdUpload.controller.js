sap.ui.define([
			'sap/m/MessageToast',
			'cosinv/cosinv/controller/BaseController',
			'sap/ui/unified/FileUploaderParameter'
			],
	function(MessageToast, BaseController, FileUploaderParameter) {
	"use strict";

	var csrfToken;  // Global variable for CSRF Token

	return BaseController.extend("cosinv.cosinv.controller.ProdUpload", {
		handleUploadComplete: function(oEvent) {
			var sStatus = oEvent.getParameter("status");
			//Check if status is 2xx		
			var sMsg = "";
			if (/^[2][0-9][0-9]$/.test(sStatus)) {
				sMsg = `File Successfully uploaded with HTTP Status Code = ${sStatus}`;
				console.log(sMsg);
			} else {			
				sMsg = `Problem Uploading File - Status Code = ${sStatus}`;
				console.log(sMsg);
			}
			MessageToast.show(sMsg);
		},

		handleUploadPress: function() {
			var oFileUploader = this.byId("fileUploader");
			this._getXsrfToken();   // Fetch the CSRF Token
			console.log(`XsrfToken + ${csrfToken}`);
			oFileUploader.destroyHeaderParameters();  // Refresh with a new token if needed
			oFileUploader.addHeaderParameter(new FileUploaderParameter({
				name: "X-CSRF-Token", value: `${csrfToken}`
			}));
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			}); 
		},

		_getXsrfToken: function() {
			// Clear token
			console.log("getToken " + csrfToken);
			csrfToken = null;
			console.log("getToken2 " + csrfToken);
			$.ajax({
				url: '/api/produpload',
				type: 'GET',
//				dataType: 'json',  // Get Parse Error if leave this in
				async: false,
//				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-CSRF-Token', 'fetch');
				},
				complete: function(response, status) {
					csrfToken = response.getResponseHeader('X-CSRF-Token');  // Set the CSRF Token
					console.log("Token = " + csrfToken);
				},
				error: function(error, status) {
					console.log("Error on Token Fetch: "+ status);
				}
			  });
		}
	});

});