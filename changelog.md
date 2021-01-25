# Changelog

**./script/**
* Created new file 'field-section.js'
	* Used to parse 'Page break' and 'Section header' form elements.

---

**./script/code.js**
* 'parseFormElement' function changes:
	* Wrote conditions to call parsing for section headers.
		* For some reason, my example form with several sections only flagged `FormApp.ItemType.PAGE_BREAK` rather than `SECTION_HEADER`
		* I included conditions for both element types just to be sure.
		* They both call 'field-section.js' and parse the same way.
		* The only difference is how the element type is cast.
	* Added final `else` condition to ignore unsupported element types.

---

**./script/options.js**
* Created new enumerator objects:
	* 'sectionBreakOpts' - Defines options for 'sectionBreak'.
	* 'sectionHeaderOpts' - Defines options for 'includeSectionHeader'.
* Updated 'scriptSettings' properties:
	* Removed 'pageBreakSection'.
	* Added 'sectionBreak'. (Set to "PAGE" for now)
	* Changed 'includeSectionHeader' type from boolean to enum
		* Uses 'sectionHeaderOpts' object.
		* Value currently set to "FULL".
* Added new render type definition "SECTION"
	* Refers to 'Page break' and 'Section header' elements.
	* Uses flag value 6.
