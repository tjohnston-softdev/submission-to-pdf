# Changelog

**./script/code.js**
* runSubmissionToPDF
	* Renamed 'elementCutoff' variable to 'elementCount'.
	* 'elementCount' now contains the number of form elements.
	* Form element loop now uses 'elementCount'
	* Declared new variable 'currentNumber'
		* Used in form element loop.
		* `elementIndex + 1`
	* Updated 'parseFormElement' call to use:
		* currentNumber
		* elementCount
* parseFormElement
	* Renamed 'eLast' parameter to 'eCount'.
	* Renamed 'eIndex' parameter to 'eNumber'.
	* Changed 'handleSectionField' calls to use:
		* eNumber
		* eCount

---

**./script/field-section.js**
* handleSectionField
	* Renamed 'headerIndex' parameter to 'headerNum'
	* Renamed 'headerLast' parameter to 'totalCount'
	* Removed 'allowBreak' property from result object.
	* Added 'orderFlag' property to result object.
		* **Negative:** Last form element - Ignore entirely.
		* **Zero:** First form element - Header without break. 
		* **Positive:** Between form elements - Break and header.

---

**./script/render-section.js**
* Renamed 'constructSectionBreak' function to 'prepareSectionBreak'
* Rewrote 'handleSectionRender' to use the 'orderFlag' property.
* Removed the extra whitespace when rendering horizontal rules in 'prepareSectionBreak'

---

**./script/render-form_data.js**
* handleEndFormDataRender
	* Removed extra blank lines when rendering "END_FORM_HEADER elements.
