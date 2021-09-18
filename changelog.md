# Changelog

**./script/definitions.gs**
* Restructured 'getSymbolDefinitions' object.
	* Nesting for list and symbol types.

---

**./scripts/Code.gs**
* Corrected arguments in function calls:
	* handleTextField (field-text.gs)
	* handleRadioListField (field-radio_list.gs)
	* handleCheckListField (field-check_list.gs)
	* handleRadioGridField (field-radio_grid.gs)
	* handleCheckGridField (field-check_grid.gs)
	* handleSectionField (field-section.gs)
	* chooseSymbols (render-common.gs)
	* setListOtherItalic (render-common.gs)
* Declared new variable 'eVis' (constructDocumentElement)
	* Indicates whether this element is visible.
	* Used to save space.
	* Replaces references to `eObject.visible`
* Declared new variable 'radioGridFlag' (constructDocumentElement)
	* Shortcut for 'radioGridMode' setting.

---

**./scripts/field-text.gs - handleTextField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'skipBlank' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/field-radio_list.gs - handleRadioListField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'skipBlank' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/field-check_list.gs - handleCheckListField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'skipBlank' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/field-radio_grid.gs - handleRadioGridField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'skipBlank' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/field-check_grid.gs - handleCheckGridField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'skipBlank' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/field-section.gs - handleSectionField**
* Removed 'rTypes' parameter.
* Added 'parseGlobal' parameter.
* 'headerUsageFlag' parameter is now a variable.
	* Reads desired value from 'parseGlobal'
* Replaced 'rTypes' reference with 'parseGlobal.renderTypes'

---

**./scripts/render-common.gs - chooseSymbols**
* Added parameters:
	* renderGlobal
	* listType
* The following parameters are now variables:
	* symbolsEnabled
	* plainSymbols
	* unicodeSymbols
* Declared new variable 'listSymbols'
	* Reads symbol definitions for respective list.

---

**./scripts/render-common.gs - setListOtherItalic**
* Added 'renderGlobal' parameter.
* 'markToggle' parameter is now a variable.
	* Reads desired value from 'renderGlobal'
