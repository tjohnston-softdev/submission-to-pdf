# Changelog

**./script/code.js**
* Merged the 'currentSection' and 'preparedElements' variables into object 'parsedElements'.
* Declared new form element loop variable 'currentParsed'
* Wrote IF conditions that occur after form element parsing to handle object saving.
* Form element looping appears to be complete.
* Moved the following functions to 'form-answer-help.js'
	* getStringAnswer
	* getObjectAnswer
* Included calls to 'handleParsedElementSectionBreak' when:
	* A section element is parsed.
	* The form element loop is complete, for the last section.

---

**./script/parsed-section.js**
* New file
* Used to facilitate section breaking when looping through form elements.
* Form elements in a section are grouped together. After the section is complete, this file helps decide if they should be saved to the overall result.

---

**./script/form-answer-help.js**
* Renamed from 'prepare-answer-text.js'
* Now includes functions for casting form element response objects.

---

**./script/options.js**
* Added new settings property 'useSymbols'
	* This indicates whether the use of symbols and non-plain characters will be allowed when writing the result document.
