sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var cmisUploader = Control.extend("com.pih.vendorportal.RFHS.control.cmisUploader", {
		metadata: {
			properties: {
				folderName: {
					type: "string"
				},
				folderPath: {
					type: "string"
				},
				repositoryID: {
					type: "string"
				},
				maxSize: {
					type: "int"
				}
			},
			aggregations: {

			},
			events: {

			}
		},
		init: function () {

		}
	});

	cmisUploader.prototype.delete = function (oFilename, fnSuccess, fnError) {
		let that = this;
		if (that.getRepositoryID() !== undefined) {
			if (that.getFolderName() !== undefined) {
				let oForm = new FormData();
				oForm.append("cmisaction", "delete");
				jQuery.ajax({
					url: "/cmis/" + that.getRepositoryID() + "/root/" + that.getFolderName() + "/" + oFilename,
					type: "POST",
					async: false,
					contentType: false,
					processData: false,
					mimeType: "multipart/form-data",
					data: oForm,
					success: fnSuccess,
					error: fnError
				});
			} else {
				console.error("CMISUploader: Set Folder Name for Creation");
			}
		} else {
			console.error("CMISUploader: Set RepositoryID");
		}
	};

	cmisUploader.prototype.upload = function (oFile, fnSuccess, fnError) {
		let that = this;
		if (that.getRepositoryID() !== undefined) {
			if (that.getFolderName() !== undefined) {
				if (that.getMaxSize() >= oFile.size / 1024 / 1024) {
					let oForm = new FormData();
					oForm.append("datafile", oFile);
					oForm.append("cmisaction", "createDocument");
					oForm.append("propertyId[0]", "cmis:objectTypeId");
					oForm.append("propertyValue[0]", "cmis:document");
					oForm.append("propertyId[1]", "cmis:name");
					oForm.append("propertyValue[1]", oFile.name);
					jQuery.ajax({
						url: "/cmis/" + that.getRepositoryID() + "/root/" + that.getFolderName(),
						type: "POST",
						async: false,
						contentType: false,
						processData: false,
						mimeType: "multipart/form-data",
						data: oForm,
						success: fnSuccess,
						error: fnError
					});
				} else {
					sap.m.MessageBox.error("File Size exceeds " + that.getMaxSize() + " MB");
				}

			} else {
				console.error("CMISUploader: Set Folder Name for Creation");
			}
		} else {
			console.error("CMISUploader: Set RepositoryID");
		}
	};
	cmisUploader.prototype.createFolder = function () {
		let that = this;
		if (that.getRepositoryID() !== undefined) {
			if (that.getFolderName() !== undefined) {
				let oForm = new FormData();
				oForm.append("objectId", that.getRepositoryID());
				oForm.append("cmisaction", "createFolder");
				oForm.append("propertyId[0]", "cmis:name");
				oForm.append("propertyValue[0]", that.getFolderName());
				oForm.append("propertyId[1]", "cmis:objectTypeId");
				oForm.append("propertyValue[1]", "cmis:folder");
				oForm.append("succinct", "true");
				jQuery.ajax({
					url: "/cmis/" + that.getRepositoryID() + "/root",
					type: "POST",
					async: false,
					contentType: false,
					processData: false,
					mimeType: "multipart/form-data",
					data: oForm,
					success: function (oData) {
						console.log("CMISUploader: Folder Created Successfully " + that.getRepositoryID());
					},
					error: function (e) {
						sap.m.MessageBox.error(JSON.parse(e.responseText).message);
					}
				});
			} else {
				console.error("CMISUploader: Set Folder Name for Creation");
			}
		} else {
			console.error("CMISUploader: Set RepositoryID");
		}
	};
	return cmisUploader;

});
