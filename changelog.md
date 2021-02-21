# Changelog

**./script/code.js**
* Added comments.
* See below for specific changes.

---

**runSubmissionToPDF**
* Re-ordered 'settingsObject' variable.
	* Between 'breakOptsObject' and 'renderTypesObject'
* Added break between 'settingsObject' and 'renderTypesObject' variables.
* Grouped the following variables:
	* prevSubmission
	* subEmail
	* subTime
* Removed break between 'formItemList' and 'formSubmissionArray' assignments.
* Added break between 'subCount' and 'prevSubmission' assignments.
* Swapped 'subEmail' and 'subTime' variable declaration order.
* Removed break between 'currentParseSuccessful' and 'parsedElements' declarations.
* Removed break between 'targetForm' and 'formName' assignments.
* Moved 'outputName' variable to before 'outputDocumentObject'
	* Applies for both declaration and assignment.

---

**parseFormElement**
* Variables are now declared and assigned on separate lines.
	* Applies to 'eName' and 'eType'

---

**constructDocumentElement**
* Removed the 'chooseSymbols' call when rendering lite radio grids.
