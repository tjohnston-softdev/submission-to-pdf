# Changelog

**./script/code.js**
* Removed 'settingsObj.useFullDurationFormat' from 'prepareDurationText' call

---

**./script/form-element-help.js**
* Removed the 'fullFormat' parameter from 'prepareDurationText'
* Removed the 'writeFullDurationFormat' function.
	* Rewrote inside 'prepareDurationText' with a simpler format.
* IF structure revised to only have one condition.
* String format
	* **Before:** 7 Hours, 30 Minutes, 52 Seconds
	* **After:** 7h 30m 52s

---

**./script/options.js**
* Removed 'useFullDurationFormat' from 'scriptSettings'

---

**./docs/files.md**
* Renamed the 'form-answer-help' entry to 'form-element-help'
	* Matches the new file name.
* Expanded the 'form-element-help' description to explain name preparation.

---

**./docs/config.md**
* Removed 'useFullDurationFormat' row from "Script Settings" table.
