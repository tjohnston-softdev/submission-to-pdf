# Changelog

**./script/code.js**
* Updated the 'handleTextField' calls to use the 'textboxUsed' parameter.
	* `eType === FormApp.ItemType.TEXT` is true
	* `eType === FormApp.ItemType.PARAGRAPH_TEXT` is true
	* All others are false.

---

**./script/field-text.js**
* Added 'textboxUsed' parameter to 'handleTextField'
	* Indicates whether the element being parsed is a literal textbox, or something else.
	* This is 'true' for 'Short answer' and 'Paragraph' elements.
* Added 'textbox' property to result object.
	* Contains the value of 'textboxUsed' parameter
	* Used for the purpose of determining the first short answer question for a document name. 

---

**./script/submission-name.js**
* Added new variables to 'getFirstTextAnswer'
	* 'currentAnswered' indicates if the current text question has been answered.
	* 'currentBox' indicates whether the current element is a literal textbox.
	* 'currentBreak' indicates whether the text question is a paragraph.
* 'getFirstTextAnswer' element loop:
	* At each iteration, these existing variables are set to -1:
		* currentEnabled
		* currentLength
	* At each iteration, the new variables are all set to false.
	* Expanded the iteration code to check whether the element is an inline textbox.
		* Based on the new variables.
		* If the test passes, the target answer has been found.

---

**./script/render-radio_list.js**
* handleRadioListRender
	* 'fullCutoff' is now assigned before 'textContents'
	* Added an extra line break at the end of 'preperationObject.textString' for now.

---

**./script/render-check_list.js**
* handleCheckListRender
	*  'fullCutoff' is now assigned before 'textContents'
	* Added an extra line break at the end of 'preperationObject.textString' for now.

---

**./script/options.js**
* scriptSettings
	* 'ignoreEmptySections' is now false.
	* 'documentNameMode' is now "FORM_NAME_WITH_FIRST_TEXT"
	* 'includeSectionHeader' is now "SKIP"
	* 'sectionBreak' is now "SKIP"

---

**./docs/config.md**
* Rewrote the "FORM_NAME_WITH_FIRST_TEXT" and "FIRST_TEXT" descriptions to clarify that the chosen element is the first 'Short answer' question
	* Not just any element parsed as "TEXT"