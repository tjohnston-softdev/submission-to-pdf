# Changelog

**./script/text-styling.js - validateStylingInput**
* Replaced variables with literal strings:
	* origColour
	* origFont
* 'elementProps' population is split onto two lines.
* Variable declaration and assignment is now separate.
* Added commenting to both header and body. 

---

**./script/text-styling.js - readColourInput**
* Changed header comment.
	* Before: "Read text colour."
	* After: "Read input text colour for given element."

---

**./script/text-styling.js - readFontInput**
* Changed header comment.
	* Before: "Read text font."
	* After: "Read input text font for given element."

---

**./script/render-common.js**
* Changed 'standardizeParagraphFormatting' header comment.
	* Before "Sets text paragraph bold, italic, and font size."
	* After: "Applies standard styling to text elements."
* Changed 'standardizeCellFormatting' header comment.
	* Before: "Sets bold, italic, and font size for grid cells."
	* After: "Applies standard styling to grid cells."
* Changed 'Glyph' comment in 'chooseSymbols'
	* Before "Glyph symbols."
	* After: "Glyphs."
* Added "Reads current symbol range." comment to 'setListSymbolStyling'
