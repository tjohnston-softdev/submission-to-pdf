# Changelog

**./script/render-common.js**
* Added 'symbolArray' variable to 'initializeListPreperationObject'
	* Defines locations to apply symbol styling.
	* Applies on top of the 'question' element.
* Wrote new function 'setListSymbolStyling'
	* Applies styling to symbols on radio and checklists.
	* Overrides 'question' element styling.
	* Before any text is bolded.

---

**./script/render-text.js**
* Minor changes to whitespacing.

---

**./script/render-radio_list.js**
* Renamed 'currentBold' variable to 'currentSymbolLocation'
	* Assigned after 'currentSelectEnd'
	* Added to 'dataObject.symbolArray' regardless.
	* Added to 'dataObject.boldArray' if enabled.

---

**./script/render-check_list.js**
* Renamed 'currentBold' variable to 'currentSymbolLocation' (same as above).

---

**./script/code.js - constructDocumentElement**
* Changes:
	* Assigned 'secondaryStyle' for 'listSymbol'
	* Added call to 'setListSymbolStyling'
* Affected cases:
	* `globalsObj.renderTypes.RADIO_LIST`
	* `globalsObj.renderTypes.CHECK_LIST`
