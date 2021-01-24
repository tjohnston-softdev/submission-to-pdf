# Changelog

**./script**
* Created new file 'field-radio_grid.js'
	* Used to parse 'Multiple-choice grid' form elements ("RADIO_GRID")

---

**./script/code.js**
* Removed the 'chkOptsObject' variable from 'runSubmissionToPDF'
* Made the following changes to 'parseFormElement':
	* Removed the 'chkModes' parameter.
	* Simplified conditions referring to 'settingsObj.checkboxMode':
		* If the value is positive, it will be parsed as a full list.
		* If the value is zero, it will be parsed as a bullet list.
		* Otherwise, it will be parsed as plain text.
	* Expanded IF structure to support 'Multiple-choice grid' elements.
* Renamed the 'getCheckboxAnswer' function to 'getObjectAnswer'.

---

**./script/options.js**
* Modified flag values in 'checkboxModeOpts':
	* "PLAIN_TEXT" is now -1 instead of 1 (Negative)
	* "BULLET_LIST" is now 0 instead of 2 (Zero)
	* "FULL_LIST" is now 1 instead of 3 (Positive)
* Removed the function 'getCheckboxModes'
* Added new type "RADIO_GRID" to 'renderTypeDefinitions'
	* Used when parsing 'Multiple-choice grid' form elements.
	* Uses flag value 4.
* Added new object 'radioGridModeOpts'.
	* Contains option definitions for how 'Multiple-choice grid' elements are displayed.
	* Corresponds to script setting 'radioGridMode'.
* Added new script setting 'radioGridMode'.
	* Set to 'radioGridMode.FULL' for now.
