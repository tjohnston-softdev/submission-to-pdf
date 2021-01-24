# Changelog

**./script/code.js**
* Changes to the 'parseFormElement' function:
	* Revised the following function calls to include 'settingsObj.skipBlankQuestions':
		* handleRadioListField
		* handleCheckListField
		* handleRadioGridField
	* Merged the conditions referring to 'settingsObj.checkboxMode'
		* **Before**: Separate conditions for positive and zero values.
		* **After:** Single condition covers zero-positive values.

---

**./script/field-radio_list.js**
* Added 'skipBlank' parameter to 'handleRadioListField' function.
* Added 'sBlank' parameter to 'setRadioChoice' function.
* Revised IF structure in 'setRadioChoice' to incorporate skipping blank answers.
	* `else` was changed to `else  if (sBlank === true)`
	* New `else` condition: `canUse` is set to true.
---

**./script/field-check_list.js**
* Modified 'handleCheckListField' function parameters:
	* Removed 'dispAll'
	* Added 'skipBlank'
* Removed the 'displayFullList' result variable.
* Added 'sBlank' parameter to the 'setCheckListFinalAnswer' function.
* Revised IF structure in 'setCheckListFinalAnswer' to incorporate skipping blank answers.
	* `else` was changed to `else  if (sBlank === true)`
	* New `else` condition: `canUse` is set to true.

---

**./script/field-radio_grid.js**
* Added 'skipBlank' parameter to 'handleRadioGridField' function.
* Made changes to the 'setRadioGridFinalAnswer' function:
	* Added 'sBlank' parameter.
	* Wrote IF structure to set 'canUse' result based on whether a valid answer is found.

---

**./script/options.js**
* Changed 'scriptSettings' object:
	* Removed 'includeSectionDesc'.
	* Renamed 'includeSectionName' to 'includeSectionHeader'.
