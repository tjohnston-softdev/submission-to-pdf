# Changelog

**./script/options.js - scriptSettings**
* Added new option: 'utcOffset'
	* Offset in minutes from UTC.
	* Used to render submission timestamps in the desired time-zone.
	* eg. +600 refers to Eastern Australian time (GMT +10)

---

**./script/submission-timestamp.js**
* Wrote new function 'validateUtcOffset'
	* Used to validate 'utcOffset' setting.
	* Values within 20 hours are considered valid. (1200 minutes)
	* If the input value is unsafe, it will default to zero (UTC)
* Added 'globalObj' parameter to 'readSubmissionTimestamp'
* New variables in 'readSubmissionTimestamp'
	* 'utcMs' - Submission timestamp in UTC milliseconds.
	* 'convertedMs' - Submission timestamp in set timezone milliseconds.
	* 'convertedTimestamp' - Submission timestamp object in set timezone.
* Replaced references to 'retrievedTimestamp' with 'convertedTimestamp'

---

**./script/code.js - runSubmissionToPDF**
* Added call to 'validateUtcOffset'
* Added 'globalsObject' argument to 'readSubmissionTimestamp' call.
