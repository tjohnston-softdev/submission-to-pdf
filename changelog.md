# Changelog

**./script/code.js**
* Changes made to 'runSubmissionToPDF' variables:
	* Removed 'submissionTimestamp'.
	* Renamed 'currentSectionItems' to 'currentSection'
	* Renamed 'preparedElementsArray' to 'preparedElements'

---

**./script/field-text.js**
* Replaced 'canUse' result property with 'enabledFlag'.
* Modified IF conditions in 'handleTextField' to use 'enabledFlag' instead of 'canUse'.
	* If answer is entered, set flag to positive.
	* If answer is blank and should be skipped, set flag to negative.
	* If blank answers should not be skipped, set flag to zero.

---

**./script/field-radio_list.js**
* Replaced 'canUse' result property with 'enabledFlag'.
* Modified IF conditions in 'setRadioChoice' to use 'enabledFlag' instead of 'canUse'.
	* If a radio button was selected, set flag to positive.
	* If a custom option was entered, set flag to positive.
	* If no radio button was selected and should be skipped, set flag to negative.
	* If blank selections should not be skipped, set flag to zero.


---

**./script/field-check_list.js**
* Replaced 'canUse' result property with 'enabledFlag'.
* Modified IF conditions in 'setCheckListFinalAnswer' to use 'enabledFlag' instead of 'canUse'.
	* Refer to 'field-radio_list.js' for details.

---

**./script/field-radio_grid.js**
* Replaced 'canUse' result property with 'enabledFlag'.
* Modified post-loop IF conditions in 'setRadioGridFinalAnswer' to use 'enabledFlag' instead of 'canUse'.
	*  If the radio grid has at least one selected option across all rows, set flag to positive.
	* If blank answers should be skipped, set flag to negative.
	* If blank answers should not be skipped, set flag to zero.


---

**./script/field-check_grid.js**
* Replaced 'canUse' result property with 'enabledFlag'.
* Modified post-loop IF conditions in 'setCheckGridFinalAnswer' to use 'enabledFlag' instead of 'canUse'.
	* Refer to 'field-radio_grid.js' for details.
