# Changelog

**./script/options.js**
* Renamed 'tableHeader' property to 'gridHeader' in objects:
	* textColours
	* textFonts

---

**./script/table-styling.js**
* validateStylingInput
	* Corrected 'tableHeader' property to 'gridHeader'
	* New variables: 'origColour' and 'origFont'
	* Replaced literal string for 'globalColour' assignment with 'origColour'
	* Replaced literal string for 'globalFont' assignment with 'origFont'
* Changed 'prepareTextStyling' header comment.
	* Before: "Main function."
	* After: "Prepare style object for current element."
* Replaced "Set" with "Read" for header comments:
	* readColourInput
	* readFontInput

---

**./script/code.js - constructDocumentElement**
* Replaced 'tableHeader' with 'gridHeader' element for applicable cases
