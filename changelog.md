# Changelog

**./script/text-styling.js**
* setStyleColour
	* Added 'defaultColour' parameter. Will be used if input validation fails.
	* Replaced 'colSettings.global' with 'defaultColour'
* setStyleFont
	* Removed 'attrObject' parameter.
	* Added 'defaultFont' parameter, same as above.
	* Replaced 'fontSettings.global' with 'defaultFont'
* prepareTextStyling
	* Added 'renderGlobal.colours.global' argument to 'setStyleColour' call.
	* Added 'renderGlobal.fonts.global' argument to 'setStyleFont' call.
* validateStylingInput
	* New function, validates colour and font input ahead of time.
	* Also validates the 'global' setting, defaulting to hard-coded values if this fails.
	* Default: "Arial" (`#000000`)

---

**./script/code.js - runSubmissionToPDF**
* Added call to 'validateStylingInput' after 'globalsObject' is ready.
