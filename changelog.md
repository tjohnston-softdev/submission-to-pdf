# Changelog

**./script/code.js constructDocumentElement**
* Declared new variables
	* createdParagraph - Stores paragraph object.
	* constructionData - Stores properties for constructed document element.
* "FORM_DESCRIPTION" elements:
	* Added visibility and length conditions.
	* Assigned 'createdParagraph' with 'initializeParagraphObject'.
	* Updated 'handleFormDescriptionRender' call to use 'createdParagraph' instead of 'documentBody'.
* "SUBMISSION_DATA" elements:
	* Added visbility condition.
	* Assigned 'createdParagraph' with 'initializeParagraphObject'.
	* Updated 'handleSubmissionDataRender' call to use 'createdParagraph' instead of 'documentBody'.
* "END_FORM_DATA" element:
	* Appends horizontal rule directy to document body.
	* Does not call any functions.
* "TEXT" elements:
	* Assigned 'createdParagraph' with 'initializeParagraphObject'.
	* Updated 'handleTextRender' call:
		* Uses 'createdParagraph' instead of 'documentBody'
		* Assigns 'constructionData'
	* Adds calls to functions:
		* standardizeParagraphFormatting
		* setTextParagraphBoldHeader
* Commented out calls to:
	* handleRadioListRender
	* handleCheckListRender
	* handleRadioGridRenderFull
	* handleRadioGridRenderLite
	* handleCheckGridRender
	* handleSectionRender

---

**./script/render-common.js**
* New file
* Stores common functions that are used when writing the output document.

---

**./script/render-form_data.js handleFormDescriptionRender**
* Parameters:
	* Removed 'docBody'
	* Added 'descPara' - Form description paragraph object.
* Removed IF condition.
* Removed 'renderObject' variable.
	* Moved underlying code into 'initializeParagraphObject' function (render-common.js)
* This function only writes and formats description text.

---

**./script/render-form_data.js handleSubmissionDataRender**
* Parameters:
	* Removed 'docBody'
	* Added 'descPara' - Submission data paragraph object.
* Removed 'renderObject' variable.
* Removed IF condition.
* Replaced 'renderObject' with 'descPara' when calling 'constructSubmissionDataField'
* This function only writes and formats submission data.

---

**./script/render-form_data.js handleEndFormDataRender**
* Removed function.

---

**./script/render-text.js handleTextRender**
* Parameters:
	* Removed 'docBody'
	* Added 'textPara'
* Removed 'renderObject' variable.
* Moved IF condition into 'code.js'
* Renamed 'preperationObject' variable to 'createdText'
* Removed 'textContents' variable.
	* Assigned into 'createdText'
* Removed 'fullCutoff' variable.
* Returns 'createdText' variable.
* Moved`textContents.setBold([...]` into its own function 'setTextParagraphBoldHeader'

---

**./script/render-text.js prepareTextElementConstruction**
* Added 'textObject' property to result object.

---

**./script/render-text.js setTextParagraphBoldHeader**
* New function.
* Used to bold question title for TEXT elements.

---

**./docs/files.md**
* Added missing square bracket to 'type-offset' link.
* Added 'render-common' entry.
