# Changelog

**./script/code.js**
* Uncommented calls to:
	* handleRadioGridRenderFull
	* handleRadioGridRenderLite
	* handleCheckGridRender

---

**./script/submission-name.js**
* Wrote new function 'writeCurrentTimeOfDay'
* Added 'debug' naming mode with execution timestamp
	* By default, the document name will simply be the submission number.
	* Now, this only applies to zero-positive numbers.
	* For negative values, the time of day will be used instead (hh:mm:ss)
	* Assigned using 'writeCurrentTimeOfDay'
	* Since this is Google, the time zone will be UTC-5.
	* This is only for debug purposes so the actual time zone does not matter too much.

---

**./script/options.js**
* scriptSettings
	* 'documentNameMode' is now -1
	* 'includeEmailAddress' is now true.
	* 'skipBlankQuestions' is now false.
	* 'sectionBreak' is now "RULE"
	* 'includeSectionHeader' is now "TITLE_ONLY"
