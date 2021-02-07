# Changelog

**./script/code.js**
* runSubmissionToPDF
	* Output document is manually saved after rendering loop.
	* Declared new variables assigned after output document is written.
		* documentFileID - ID of output document file.
		* documentFileObject - Output document file object.
		* documentBinary - Output document converted to PDF.
		* pdfFileObject - Converted PDF file object.
		* targetFolderObject - Target output folder object. (documentFolderID)
	*  Output document is converted to PDF and moved to the target folder.
	* Original Google Docs file is deleted after successful conversion.

---

**./script/code.js** (previous)
* constructDocumentElement
	* Added IF condition to render "SECTION" elements.
	* Added `else` condition

---

**./script/options.js**
* Removed `scriptSettings.documentFolderID` assignment.
* 'getRootFolderID' still exists for testing purposes.
