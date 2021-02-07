# Changelog

**./script/code.js**
* parseFormElement
	* Removed `[...]settingsObj.checkboxMode === 0` condition
	* Changed 'checkbox list' condition
		* **Before:** `[...]settingsObj.checkboxMode > 0`
		* **After:** `[...]settingsObj.displayCheckList === true`
* constructDocumentElement
	* There is now only one "CHECK_LIST" condition
		* Calls 'handleCheckListRenderFull' (render-check_list-full.js)
		* Said call has been uncommented.
	* Uncommented call to 'handleRadioGridRenderLite' (render-radio_grid-lite.js)

---

**./script/field-check_list.js**
* Changes made to 'handleCheckListField':
	* Removed 'dispFull' parameter.
	* Removed 'displayFull' result property.

---

**./script/render-check_list-bullet.js**
* Deleted file
	* Bullet point lists no longer supported.

---

**./script/options.js**
* Renamed the "IGNORE" option in 'sectionBreakOpts' to "SKIP"
* Removed 'checkboxModeOpts' object.
* Changes to 'scriptSettings':
	* Removed 'checkboxMode'
	* Added 'displayCheckList' (true)
	* 'sectionBreak' is now "SKIP", as per the value rename.
