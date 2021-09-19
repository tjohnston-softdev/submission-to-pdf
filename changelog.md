# Changelog

**./script/render-common.js - standardizeCellFormatting**
* Added 'styleObject' parameter. Affects styling of inner grid symbols.
* Applied 'styleObject' to 'currentText'
	* Takes place first.
	* Before any bolding.

---

**./script/code.js - constructDocumentElement**
* Declared 'tertiaryStyle' variable.
* Changes to styling:
	* Assigns 'tertiaryStyle' as 'gridSymbol' element.
	* Added 'tertiaryStyle' as argument to 'standardizeCellFormatting' call.
* Affected cases:
	* `radioGridFlag > 0`
	* `globalsObj.renderTypes.RADIO_GRID`
	* `globalsObj.renderTypes.CHECK_GRID`

---

**./script/options.js**
* Set 'textColours.gridSymbol' to a Cyan colour for testing (`#13cec1`)
