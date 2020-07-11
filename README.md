# SAP Cloud CMIS Uploader
![](https://img.shields.io/badge/SAPUI5-Library-blue)
## Features
- Create New Folder
- Delete Folder
- Update Folder
- Upload File under different Folders
- File Size Validation
- File Format Validation

## Properties
- #### cmisUploader().setFolderName(`String`) 
Root Folder Name where to save you documents.

- #### cmisUploader().getFolderName() 
To get Root Folder Name.

- #### cmisUploader().setFolderPath(`String`) 
Root Folder Path for Nested Hierarchical Folder

- #### cmisUploader().getFolderPath() 
To get Root Folder Path for Nested Hierarchical Folder

- #### cmisUploader().setRepositoryID(`String`) 
CMIS RepositoryID 

- #### cmisUploader().getRepositoryID() 
To get CMIS RepositoryID 

- #### cmisUploader().setMaxSize(`Integer`) 
File Size validation in MB

- #### cmisUploader().setMaxSize() 
To get File Size validation in MB

- #### cmisUploader().delete(`String`, `Success Function`,`Error Function`) 
To delete the file in respective folder of repositoryID. You define call back function's for  Success and Error fuction once the delete call completed.

- #### cmisUploader().upload(`Input File`, `Success Function`,`Error Function`) 
To upload  the file in respective folder of repositoryID. You define call back function's for  Success and Error fuction once the delete call completed.

- #### cmisUploader().createFolder() 
To createa folder you need to define RepositoryID and FolderName then only this createFolder will create the directory.

## Usage

- #### Initialize CMISUploader in global variable and creating Folder.
```javascript
this.oCMISUploader = new cmisUploader();
this.oCMISUploader.setRepositoryID("0f9abb821990708c4345et23");
this.oCMISUploader.setFolderName("CMIS Demo");
this.oCMISUploader.createFolder();
```

- #### Uploading File through FileUploader
```javascript
this.oCMISUploader.setMaxSize(10);
this.oCMISUploader.upload(
	this.getView().byId("uploader").getFocusDomRef().files[0], 
	function(data){console.log("Success")}, 
	function(e){console.log("Error")}
);
```

- #### Deleting Uploaded File
```javascript
this.oCMISUploader.delete(
	"CMIS_Test_document.txt", 
	function(data){console.log("Success")}, 
	function(e){console.log("Error")}
);
```
