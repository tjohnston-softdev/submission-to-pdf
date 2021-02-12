# Changelog

**./script/code.js**
* constructDocumentElement
	* Removed the 'elementConstructed' variable.
	* Removed the `else` condition.
	* Function calls remain unchanged.

---

**./script/render-form_data.js**
* Removed 'handleRes' variable from these functions:
	* handleOverallHeadingRender
	* handleFormDescriptionRender
	* handleSubmissionDataRender
* Removed `return true` from 'handleEndFormDataRender'

---

**./script/render-text.js**
* Removed 'handleRes' from 'handleTextRender'

---

**./script/render-radio_list.js**
* handleRadioListRender
	* Removed 'handleRes' variable.
	* Removed extra line break at end.

---

**./script/render-check_list.js**
* handleCheckListRender
	* Removed 'handleRes' variable.
	* Removed extra line break at end.

---

**./script/render-radio_grid.js**
* handleRadioGridRenderFull
	* Renamed 'handleRes' variable to 'tableConstructed'
	* Removed return.

---

**./script/render-check_grid.js**
* handleCheckGridRender
	* Renamed 'handleRes' variable to 'tableConstructed'
	* Removed return.

---

**./script/render-section.js**
* Removed variables from 'handleSectionRender':
	* breakConstructed
	* headerConstructed
	* handleRes
* Removed return from 'constructSectionBreak'
	* 'constructionRes' variable remains intact, just not returned.
* Merged 'constructSectionHeader' into 'handleSectionRender'
* Renamed 'bObject' parameter to 'dBody' in these functions:
	* prepareRenderedSectionHeading
	* prepareRenderedSectionDescription

---

**./script/options.js**
* Cleared 'outputFolderID' setting That was a mistake.
	* Although this will cause an error, PDF generation is successful.
* 'documentNameMode' setting is now "FORM_NAME_WITH_SUBMISSION_NUMBER"
