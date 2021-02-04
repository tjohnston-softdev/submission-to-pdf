# Changelog

**./script/code.js**
* Split the `[...] settingsObj.checkboxMode` condition in 'parseFormElement'.
	* **Positive** - Set to display as a full list. (FULL_LIST)
	* **Zero** - Set to display selected items only. (BULLET_LIST)
* Declared 'symbolDefinitionObject' variable in 'runSubmissionToPDF'
	* Assigned after 'renderTypesObject'
	* Calls 'getSymbolDefinitions' (options.js)
* Added new parameter 'symbolDefinitionsObj' to 'constructDocumentElement'.

---

**./script/field-check_list.js**
* handleCheckListField:
	* Added 'dispFull' parameter.
	* Added 'displayFull' property to 'fieldRes'
* Indicates whether the checklist should be displayed in full, or just the selected items.

---

**./script/render-radio_list.js**
* handleRadioListRender:
	* Added 'symbolDefs' parameter.
	* Updated the 'radioFilled' and 'radioUnfilled' variables to use the symbols as defined in 'symbolDefs'
	* The actual rendering remains unchanged.
* Changed radio button symbols:
	* **Before:** ⚪ ⚫
	* **After:** ⦾ ⦿
* Changed radio button plain text:
	* **Before:** [  ], [X]
	* **After:** (  ), (O)
	* The original strings will be used for plain checkboxes.

---

**./script/options.js**
* Wrote new function 'getSymbolDefinitions'
	* Defines an object containing symbol definitions for rendering certain form elements.
	* Includes both unicode and plain text
	* Unlike 'getRenderTypes', the object is defined inside the function, rather than globally.
* scriptSettings
	* 'useSymbols' is now true
