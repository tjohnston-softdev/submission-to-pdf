# Changelog

**./script/code.js**
* Added new variable 'checkboxOptionsObject' to the 'runSubmissionToPDF' function.
* Added new parameter 'chkModesObj' to the 'parseFormElement' function.
* Parsing for 'Multiple choice' elements is left as-is.
* Changed conditions in 'parseFormElement':
	* Updated existing condition to use checkbox 'full list' display mode.
	* Added new condition to support checkbox 'bullet list' display mode.
		* Similar to the former but 'displayFullList' is false.

---

**./script/field-check-list.js**
* Added 'dispAll' parameter to the 'handleCheckListField' function.
* Added 'displayFullList' property to result object.
	* Corresponds to 'dispAll' parameter.
* No changes made to parse functionality itself.

---

**./script/options.js**
* Removed the 'fileOpts' variable.
* Added new variable 'checkboxModeOpts'.
	* Defines display modes for checkbox elements.
	* "FULL_LIST" is now the equivilant of `displayCheckList = true`
* Changed the properties in 'scriptSettings':
	* Removed 'uploadFileMode'
	* Renamed 'displayCheckList' to 'checkboxMode'
	* 'checkboxMode' is set to "FULL_LIST" for now.
	* Added 'indentOtherOption'
* Added new function 'getCheckboxModes'
	* Exposes 'checkboxModeOpts' to 'code.js'
