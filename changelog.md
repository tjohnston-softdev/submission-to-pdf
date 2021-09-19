# Changelog

**./script/text-styling.js**
* Renamed functions:
	* 'setStyleColour' to 'readColourInput'
	* 'setStyleFont' to 'readFontInput'
* Corrected function calls in 'validateStylingInput'
* Modified 'prepareTextStyling' to read the values from 'renderGlobal' directly.
	* This avoids redundant validation.
	* Validation is performed all at once from the start.
	* No longer on a per-element basis.
	* Removes calls to 'read_____Input' functions.
