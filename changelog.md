# Changelog

**./script/code.js**
* Variables in 'constructDocumentElement'
	* Declared 'elementConstructed'
	* Renamed 'elementObj' to 'eObject'
	* Renamed 'bodyObj' to 'documentBody'
	* Renamed 'rTypesObj' to 'rendTypes'
* Started writing IF structure for constructing different element types in 'constructDocumentElement'
	* So far, this covers "OVERALL_HEADING" and "FORM_DESCRIPTION"

---

**./script/render-form_data.js**
* New file
* Used to render the form heading and description elements for the output document.

---

**./script/options.js**
* Changes to 'sectionBreakOpts' object:
	* Renamed "PARAGRAPH" to "WHITESPACE". Now uses flag value 3
	* Added "RULE" mode for horizontal rules. Uses flag value 2
* The 'sectionBreak' option in 'scriptSettings' is still set to "PAGE"
