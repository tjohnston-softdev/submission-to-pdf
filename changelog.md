# Changelog

**./script/code.js**
* New variables in 'runSubmissionToPDF'
	* overallHeadingElement
	* formDescriptionElement
	* submissionDataElement
* Set after 'decideSubmissionName'
* Calls are made to functions in 'field-form_data.js'
* Parsed 'field-form_data.js' elements are added to the beginning of 'parsedElements.overall'

---

**./script/submission-timestamp.js**
* Removed variables from 'readSubmissionTimestamp':
	* datePart, timePart
	* yearText, monthText, dayText
	* hourText, minuteText, secondText
* readSubmissionTimestamp now returns an object instead of a string (timestampRes)
	* Individual object properties refer to timestamp components.


---

**./script/submission-name.js**
* Declared new function 'writeTimestampFileName'
	* Converts prepared timestamp object into a string suitable for a file name
	* eg. 20210126-143912
* Renamed the 'subTime' parameter in 'decideSubmissionName' to 'sTimeObj'
	* Consumes value of 'writeTimestampFileName'
	* Used for timestamps when writing file name.

---

**./script/field-form_data.js**
* New file.
* Parses form name, description, and submission data into elements for the output document.
* Covers the rendering types:
	* "OVERALL_HEADING"
	* "FORM_DESCRIPTION"
	* "SUBMISSION_DATA"

---

**./script/options.js**
* Changed 'scriptSettings' property values
	* 'documentNameMode' to "FORM_NAME_WITH_SUBMISSION_TIMESTAMP"
	* 'includeFormDesc' to true
	* 'includeSubmissionData' to true

