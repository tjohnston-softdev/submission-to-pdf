# Changelog

**./scripts/Code.gs - runSubmissionToPDF**
* Merged the following into new variable 'globalsObject'
	* 'nameOptsObject' --> `nameOpts`
	* 'breakOptsObject' --> `breakOpts`
	* 'settingsObject' --> `mainSettings`
	* 'coloursObject' --> `colours`
	* 'renderTypesObject' --> `renderTypes`
	* 'symbolObject' --> `symbols`
* Corrected arguments in function calls:
	* decideSubmissionName (submission-name.gs)
	* parseFormElement
	* constructDocumentElement
	* handleFormDescriptionField (field-form_data.gs)
	* handleSubmissionDataField (field-form_data.gs)
	* handleParsedElementSectionBreak (parsed-section.gs)
	* DriveApp.getFolderById
	* handleOverallHeadingField (field-form_data.gs)
	* handleEndFormHeaderField (field-form_data.gs)
	* getPreviousElementRenderType (type-offset.gs)

---

**./scripts/Code.gs - parseFormElement**
* Changes to parameters:
	* Removed 'rTypesObj' and 'settingsObj'
	* Added 'globalsObj'
* Replaced references:
	* 'rTypesObj' with 'globalsObj.renderTypes'
	* 'settingsObj' with 'globalsObj.mainSettings'

---

**./scripts/Code.gs - constructDocumentElement**
* Changes to parameters:
	* Removed 'rendTypes', 'breakOptsObj', 'symbolObj', 'settingsObj'
	* Added 'globalsObj'
* Replaced references:
	* 'rendTypes' with 'globalsObj.renderTypes'
	* 'breakOptsObj' with 'globalsObj.breakOpts'
	* 'symbolObj' with 'globalsObj.symbols'
	* 'settingsObj' with 'globalsObj.mainSettings'

---

**./scripts/submission-name.gs - decideSubmissionName**
* Changes to parameters:
	* Removed 'settingsObj', 'nameObj', 'rTypesObj'
	* Added 'globalsObj'
* Replaced references:
	* 'settingsObj' with 'globalsObj.mainSettings'
	* 'nameObj' with 'globalsObj.nameOpts'
	* 'rTypesObj' with 'globalsObj.renderTypes'

---

**./scripts/field-form_data.gs - handleFormDescriptionField**
* Removed 'rTypes' parameter.
* Added 'globalsObj' parameter.
* 'includeOption' is now a variable instead of a parameter.
	* Reads the desired property from 'globalObj'
* Replaced 'rTypes' reference with 'globalObj.renderTypes'
---

**./scripts/field-form_data.gs - handleSubmissionDataField**
* Removed parameters: 'settingsObj' and 'rTypes'
* Added 'globalsObj' parameter.
* Declared new variable 'includeOption'
	* Indicates whether submission data should be included.
	* Reads the desired property from 'globalObj'
* Declared new variable 'includeEmail'
	* Indicates whether the submission E-Mail address should be shown.
	* Reads the desired property from 'globalObj'
* Replaced references:
	* 'settingsObj.includeSubmissionData' with 'includeOption'
	* 'settingsObj.includeEmailAddress' with 'includeEmail'
	* 'rTypes' with 'globalObj.renderTypes'
