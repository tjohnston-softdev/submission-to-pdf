# Changelog

**./script/code.js parseFormElement**
* Removed the 'eName' variable from the following calls:
	* handleTextField
	* handleRadioListField
	* handleCheckListField
	* handleRadioGridField
	* handleCheckGridField
* Added calls to 'setParsedElementTitle' throughout the IF structure after parsing form elements.
	* This applies to all conditions except for ones calling 'handleSectionField'
	* This is because 'handleSectionField' has its own code for resolving empty names.

---

**./script/field-text.js**
* handleTextField
	* Removed 'txtTitle' parameter.
	* 'elementTitle' result property is now empty.

---

**./script/field-radio_list.js**
* handleRadioListField
	* Removed 'rdoTitle' parameter.
	* 'elementTitle' result property is now empty.

---

**./script/field-check_list.js**
* handleCheckListField
	* Removed 'chkTitle' parameter.
	* 'elementTitle' result property is now empty.

---

**./script/field-radio_grid.js**
* handleRadioGridField
	* Removed 'gridName' parameter.
	* 'elementTitle' result property is now empty.

---

**./script/field-check_grid.js**
* handleCheckGridField
	* Removed 'gridName' parameter.
	* 'elementTitle' result property is now empty.

---

**field-section.js**
* handleSectionField
	* Moved the 'orderFlag' assignment IF structure into its own function 'setSectionOrderFlag'
	* 'elementTitle' default value is now "Section %headerNum%
		* eg. "Section 123"
	* Renamed the 'headerFlag' parameter to 'headerUsageFlag'

---

**./script/form-answer-help.js**
* Renamed to 'form-element-help.js'

---

**./script/form-element-help.js**
* Wrote new function 'setParsedElementTitle'
	* Used to save the form element title into the parsed object.
	* If the element does not have a title, a default will be used instead.
	* %typeDesc% %orderNumber%
	* eg. "Short answer 123"
