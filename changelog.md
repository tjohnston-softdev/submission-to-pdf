# Changelog

**./script/code.js**
* Changes to 'constructDocumentElement'
	* Removed `eObject !== null` condition from the IF structure
	* Declared 'eType' variable. Contains parsed form element type.
	* IF structure now uses 'eType' instead of 'eObject.elementType'
	* Expanded IF structure to support "SUBMISSION_DATA" elements.
* Changes to 'runSubmissionToPDF'
	* Parsed form element loop now checks for null before calling 'constructDocumentElement'
		* `if (currentParsedObject !== null)`
	* Declared variable 'endFormHeaderElement'
		* Assigned after submission data has been parsed
		* Calls 'handleEndFormHeaderField' from 'field-form_data.js'
	* 'endFormHeaderElement' is placed into 'parsedElements.overall'
		* Placed at the beginning.
		* After 'submissionDataElement'.
		* Before main elements.

---

**./script/field-form_data.js**
* handleSubmissionDataField
	* The 'submissionNumber' property in the result object is now a string.
	* 'subNumber' is now cast into a string when assigned into the result object.
* New function: handleEndFormHeaderField
	* Creates a parsed object with the type "END_FORM_HEADER"
	* Unlike most similar functions, this is just a placeholder with no preparation necessary.

---

**./script/render-form_data.js**
* Wrote new functions:
	* 'handleSubmissionDataRender' is used to render "SUBMISSION_DATA" elements.
	* 'constructSubmissionDataField' is used to write an individual submission data field.
		* Number
		* Timestamp
		* E-Mail Address (optional)
	* 'handleEndFormDataRender' is used to render "END_FORM_HEADER" elements.
		* This only adds a horizontal rule and line break.
		* Nothing special.

---

**./script/options.js**
* Added "END_FORM_HEADER" to 'renderTypeDefinitions'
	* Refers to a separator between meta information and normal form elements.
	* Uses flag value -4
