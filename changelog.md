# Changelog

**./script/options.gs - textColours**
* New object - Sets colours of different document elements.
* Colourable elements:
	* Main heading
	* Form description
	* Section heading
	* Section description
	* Question text
	* Answer text
	* Meta field text (eg. Submission Number)
	* Meta value text
* Also includes global default colour.
* For testing purposes, I have set most elements a different colour.
	* Default colour is Black (`#000000`)
	* This will be changed upon release.

---

**./script/options.gs**
* Implemented GET function for 'textColours' (getTextColours)
* Corrected 'getScriptSettings' header comment to refer to the object.

---

**./script/Code.gs**
* Declared new variable 'coloursObject' in 'runSubmissionToPDF'
	* Refers to text colours.
	* Assigned after 'settingsObject'
* Declared new variable 'elementStyling' in 'constructDocumentElement'
	* This will specify the font and colour of the text element being created.
	* Defined before the element is actually created.
	* Styling changes not implemented yet.
