# Changelog

**./script/code.js**
* Added new conditions to 'parseFormElement':
	* `FormApp.ItemType.DATE` calls parsing for regular 'Date' elements.
	* `FormApp.ItemType.TIME` calls parsing for regular 'Time' elements.
	* `FormApp.ItemType.DURATION` calls parsing for 'Time-Duration'.
	* `FormApp.ItemType.DATETIME` calls parsing for 'Date' elements with time included.

---

**./script/prepare-answer-text.js**
* Wrote new functions:
	* prepareDurationText
		* Used to prepare answer text from 'Time-Duration' elements.
		* The final text is written differently depending on 'useFullDurationFormat'.
	* writeFullDurationFormat
		* Converts duration string to long format.

---

**./script/options.js**
* Added missing semicolon at the end of 'radioGridModeOpts'
* Added new 'scriptSettings' option 'useFullDurationFormat'
	* This affects how 'Time-Duration' answers will be parsed.
		* **true:** 7 hours, 30 minutes, 52 seconds
		* **false:** 07:30:52
