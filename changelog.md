# Changelog

**./script/code.js**
* Variables in 'runSubmissionToPDF':
	* Declared 'subTime'.
		* Set using 'submission-timestamp.js' after the form submission object is retrieved.
	* Declared 'outputName'.
		* Set using 'submission-name.js' after all form elements have been parsed.
	* Renamed 'submissionCount' to 'subCount'.
	* Renamed 'submitterEmail' to 'subEmail'.

---

**./script/submission-timestamp.js**
* New file.
* Used to retrieve and convert submission timestamp into a readable string.
	* **Example:** 20210126-1306

---

**./script/submission-name.js**
* New file.
* Used to decide what the output document file will be called.
	* Based on the value of 'scriptSettings.documentNameMode'
	* Refer to 'nameOpts' in 'options.js'
	* "SUBMISSION_NUMBER" is default.

---

**./script/options.js**
* Changes to 'scriptSettings' properties:
	* Removed 'includeSubmissionNumber'
	* Removed 'includeSubmissionTimestamp'
	* Added 'includeSubmissionData'
	* 'includeEmailAddress' remains a separate option.
* Changes to 'nameOpts' properties:
	* Renamed "FIRST_SHORT_ANSWER" to "FIRST_TEXT"
	* Added "FORM_NAME_WITH_FIRST_TEXT" (3)
	* Updated flag values in order of definition.
* 'scriptSettings.documentNameMode' is currently set to "FORM_NAME_WITH_SUBMISSION_NUMBER"
