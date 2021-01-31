# Changelog

**./script/code.js**
* Variables in 'runSubmissionToPDF'
	* Declared 'outputDocumentObject'
	* Declared 'documentBodyObject'
	* Declared 'parsedObjectIndex'
	* Declared 'currentParsedObject'
	* Renamed 'currentParsed' to 'currentParseSuccessful'
* Output document file is now created after all form elements have been parsed.
* Started writing loop for parsed form elements array (parsedElements.overall)
	* This will be used to construct the output document.
* Wrote definition for 'constructDocumentElement' function.
	* This is used to coordinate how individual form elements are rendered in the output document.
	* So far, this only returns 'true'. It is only a basic definition.
	* Called during the 'parsed form elements' loop in 'runSubmissionToPDF'

---

**./script/options.js**
* Wrote new function 'getRootFolderID'
	* Dynamically retrieves the folder ID of the user's Drive root.
	* Used to set 'documentFolderID' script option.
	* This is done for security reasons.
	* I'm not going to manually specify a folder ID for a public script
* When declaring 'scriptSettings', the 'documentFolderID' property initial value is "ROOT"
