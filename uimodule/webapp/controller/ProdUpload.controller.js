sap.ui.define(['sap/m/MessageToast','cosinv/cosinv/controller/BaseController'],
	function(MessageToast, BaseController) {
	"use strict";

	return BaseController.extend("cosinv.cosinv.controller.ProdUpload", {
		handleUploadComplete: function(oEvent) {
            var sResponse = oEvent.getParameter("response");
            
			if (sResponse) {
				var sMsg = "";
				var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
                }
                console.log("File Upload Message " + sMsg);

				MessageToast.show(sMsg);
			} else {
                console.log("Error infile uplaod " + oEvent.getParameter("status"));
                MessageToast.show("Error Processing File in BackEnd");

            }
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