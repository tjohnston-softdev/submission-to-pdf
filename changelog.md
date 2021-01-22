# Changelog

**./script**
* Added new file 'prepare-answer-text.js'
	* This file will contain functions that help when writing answer text.
	* Only has function for writing 'Scale' answers.

---

**./script/code.js**
* Renamed the following variables in 'runSubmissionToPDF':
	* 'targetFormObject' to 'targetForm'
	* 'previousSubmissionObject' to 'prevSubmission'
	* 'nameOptionsObject' to 'nameOptsObject'
	* 'checkboxOptionsObject' to 'chkOptsObject'
	* 'currentFormElement' to 'currentElement'
	* 'currentElementResult' to 'currentResult'
* Renamed the following variables in: 'parseFormElement':
	* 'chkModesObj' to 'chkModes'
	* 'renderTypesObj' to 'rTypesObj'
	* 'elementName' to 'eName'
	* 'elementType' to 'eType'
	* 'elementCast' to 'eCast'
* Expanded 'parseFormElement' to support 'Scale' form elements.
	* Writes answer as "%answer% / %upper"
	* Parsed as single-line text ('field-text.js)

---

**./script/field-text.js**, **field-radio_list.js**, **field-check_list.js**
* Renamed the 'answerGiven' property to 'canUse'

---

**./script/options.js**
* Renamed the 'renderTypeOpts' variable to 'renderTypeDefinitions'
