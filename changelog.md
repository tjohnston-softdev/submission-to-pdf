# Changelog

**./script/render-form_data.gs - handleOverallHeadingRender**
* Declared new variable 'colourObject'
	* Used to set text colour for heading.
* Form headings will be coloured Orange (`#eba834`) for testing purposes.
	* Text colouring works successfully.

---

**./script/options.gs**
* Changed 'documentNameMode' option.
	* Before: "FORM_NAME_WITH_SUBMISSION_TIMESTAMP"
	* After: "SUBMISSION_NUMBER"
* Just to clarify:
	* This only affects the file name.
	* Not the contents of the document itself.
