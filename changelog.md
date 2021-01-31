# Changelog

**./script/code.js**
* Changes to 'constructDocumentElement'
	* Expanded IF structure to support "END_FORM_HEADER" placeholder.
		* I forgot to document this change in the previous commit but it is only a placeholder element so that is no big deal.
	* Expanded IF structure to support "TEXT" elements.
* Added a divider between 'parseFormElement' and 'constructDocumentElement'

---

**./script/render-text.js**
* New file.
* Used to construct "TEXT" elements for the output document.

---

**./script/render-form_data.js**
* Form description font size is set to 11 (handleFormDescriptionRender)

---

**./script/form-answer-help.js**
* The function 'writeFullDurationFormat' now uses a Regular Expression to detect and remove colon characters from the short duration string.
	* Otherwise, it only removes the first one and not both.

---

**./script/options.js**
* Changed 'scriptSettings' properties:
	* 'displayRadioList' is now false.
	* 'checkboxMode' is now "PLAIN_TEXT"
	* 'useSymbols' is now false.
	* 'skipBlankQuestions' is now false.
* These changes are to help validate text element rendering.
