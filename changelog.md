**./script/code.js**
* Commented out calls to:
	* handleRadioGridRenderFull
	* handleRadioGridRenderLite
	* handleCheckGridRender	
* Declared variable 'currentPrevType' in 'runSubmissionToPDF'
	* Used in the element rendering loop.
	* Stores the render type of the previous element.
	* Calls 'getPreviousElementRenderType' (type-offset.js)
* Added 'prevType' parameter to 'constructDocumentElement'
* x

---

**./script/submission-name.js**
* Updated "TIMESTAMP" condition in 'decideSubmissionName' to use new name.

---

**./script/type-offset.js**
* New file
* Used to retrieve the render type of previous answered element in the array.

---

**./script/render-text.js - New functions**
* getTextRenderLineBreakPrefix
	* Checks whether line break prefix is required.
	* Returns 'true' if previous type is "RADIO_LIST" or "CHECK_LIST"
* constructTextElementLineBreakPrefix
	* Adds prefix line break before element text if required.
	* Also sets bold start.
* constructTextElementQuestion
	* Writes question text.
	* This is the same, no matter what.
* constructTextElementAnswer
	* Writes answer text.
	* Different depending on the 'blockFlag' value.

---

**./script/render-text.js - handleTextRender**
* New parameters:
	* previousParsedType - Render type of previous element.
	* renderDefs - Render type definitions.
* Declared new variable 'breakPrefixRequired'
	* Assigned before 'renderObject'
	* Calls 'getTextRenderLineBreakPrefix'
* Declared new variable 'fullCutoff'
	* Last character index for element text.
	* Previously part of the preperation object.
	* Is now a local variable because of redundancy.
	* Assigned before 'textContents'
* Updated 'setBold' and 'setItalic' calls to use 'fullCutoff'
* Added calls to the new construct functions.
	* constructTextElementLineBreakPrefix
	* constructTextElementQuestion
	* constructTextElementAnswer

---

**./script/render-text.js - prepareTextElementConstruction**
* Result properties:
	* Removed 'fullCutoff'
	* Added 'prefixLinebreak' - Decides if a blank line is required before text.
	* Added 'blockFlag' - Decides how text is written.
		* **Positive:** Paragraph - Question and answer on separate line.
		* **Zero:** Inline - Question and answer on same line.
		* **Negative:** No answer given.
* Added 'usePrefix' parameter.
* Revised overall structure.
	* Only handles the preparation object.
	* It does not write the element text itself.
	* Only decides how to write the text.
* Split the existing text write code into new functions.

---

**./script/options.js**
* Renamed the "TIMESTAMP" option in 'nameOpts' to "SUBMISSION_TIMESTAMP"
* scriptSettings
	* 'sectionBreak' is now "SKIP"
	* 'includeSectionHeader' is now "SKIP"
	* 'skipBlankQuestions' is now true.

---

**./docs/files.md**
* Wrote description for 'type-offset.js'
	* Before 'render-form_data'
	* After 'submission-name'