# Changelog

**./script/code.js**
* Removed call to 'validateUtcOffset'
* Removed 'globalsObject' argument from 'readSubmissionTimestamp' call.

---

**./script/submission-timestamp.js**
* Removed 'validateUtcOffset' function.
* Removed from 'readSubmissionTimestamp'
	* 'globalObj' parameter.
	* Variables: 'utcMs', 'convertedMs', 'convertedTimestamp'
* Replaced references to 'convertedTimestamp' with 'retrievedTimestamp'

---

**./script/render-form_data.js - handleSubmissionDataRender**
* Commented out 'Timestamp' field.

---

**./script/options.js**
* Removed 'utcOffset' option from 'scriptSettings'
* Capitalized 'textColours.gridSymbol'
