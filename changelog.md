# Changelog

**./script/options.js**
* Removed from 'nameOpts'
	* FORM_NAME_WITH_SUBMISSION_TIMESTAMP
	* SUBMISSION_TIMESTAMP
* Changed 'scriptSettings.documentNameMode'
	* Before: -1
	* After: FORM_NAME_WITH_SUBMISSION_NUMBER
* Re-ordered 'nameOpts' flags.

---

**./script/submission-name.js - decideSubmissionName**
* Removed cases from IF structure.
	* `globalsObj.nameOpts.FORM_NAME_WITH_SUBMISSION_TIMESTAMP`
	* `globalsObj.nameOpts.SUBMISSION_TIMESTAMP`
* Removed 'writtenTimestamp' assignment.
* Changed comment.
	* Before: "Reads submission timestamp, and chosen name mode."
	* After: "Reads chosen name mode."
