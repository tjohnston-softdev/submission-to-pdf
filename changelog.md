# Changelog

**./script/code.js**
* Reduced whitespace between 'parseFormElement' and 'constructDocumentElement'
* runSubmissionToPDF
	* Renamed variables:
		* 'documentBodyObject' to 'outputContents'
		* 'parsedObjectIndex' to 'renderIndex'
		* 'currentParsedObject' to 'currentRender'
		* 'formElementIndex' to 'elementIndex'
	* Added 'elementCutoff' variable.
		* Contains last index for element array.
		* Used by form element loop.
		* Assigned after 'subTime'.
* parseFormElement
	* Added new parameters:
		* eIndex - Form element index.
		* eLast - Last index for element array.
	* Updated 'handleSectionField' calls to use new parameters.

---

**./script/field-section.js**
* Added parameters to 'handleSectionField':
	* 'headerIndex' - Form element index.
	* 'headerLast' - Last element index.
* Added new result property 'breakAllowed'
	* Indicates whether there should be a break in the output document before this section header.
	* Set to 'false' by default.
	* Breaks will only be inserted between sections.
	* If this is the first or last form element, the value will remain false.

---

**./script/render-section.js**
* handleSectionRender
	* Added missing semicolon to 'constructSectionBreak' call.
	* 'constructSectionBreak' will only be called if the `parsedSection.allowBreak` is true.

---

**./script/options.js**
* scriptSettings
	* 'sectionBreak' is now "RULE"
	* 'includeSectionHeader' is now "TITLE_ONLY"
