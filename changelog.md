# Changelog

**./scripts/options.js - textColours, textFonts**
* Merged text elements:
	* 'answer' into 'question'
	* 'metaProp' and 'metaValue' into 'meta'
* Added value to 'textColours.tableHeader'

---

**./scripts/Code.js - globalsObject**
* Added 'fonts' property
	* Assigned with 'getTextFonts'
	* Contains font settings.

---

**./scripts/Code.js - constructDocumentElement**
* Renamed 'elementStyling' variable to 'primaryStyle'
* Declared 'secondaryStyle' variable.
* Applied 'primaryStyle' and 'secondaryStyle' to cases as needed
* Affected calls:
	* handleOverallHeadingRender (render-form_data.js)
	* handleFormDescriptionRender (render-form_data.js)
	* handleSubmissionDataRender (render-form_data.js)
	* standardizeParagraphFormatting (render-common.js)
	* constructGridHeading (render-common.js)
	* formatGridHeaderRow (render-common.js)
	* formatGridHeaderColumn (render-common.js)
	* handleSectionRender (render-section.js)

---

**./scripts/text-styling.js**
* New file - Sets colour and font for different text elements.
* Hex colour validation is supported but dummied out for now.

---

**./scripts/render-form_data.js**
* handleOverallHeadingRender
	* Added 'styleObject' parameter.
	* Declared 'preparedStyle' variable.
	* Removed 'colourObject' variable.
	* Replaced 'colourObject' reference with 'preparedStyle'
	* 'preparedStyle' is 'styleObject' in a docs-ready format.
* handleFormDescriptionRender
	* Added 'styleObject' parameter.
	* Applied font and colour from 'styleObject' to 'textContents'
* handleSubmissionDataRender
	* Added 'styleObject' parameter.
	* Added 'styleObject' as argument to 'constructSubmissionDataField' calls.
* constructSubmissionDataField
	* Added 'styleObj' parameter.
	* Applied font and colour from 'styleObj' to 'fieldObject'

---

**./scripts/render-common.js**
* standardizeParagraphFormatting
	* Added 'styleObject' parameter.
	* Applied font and colour from 'styleObject' to 'txtObj'
* constructGridHeading
	* Added 'styleObject' parameter.
	* Applied font and colour from 'styleObject' to 'textObject'
	* Moved bold setting to after font and colour.
	* Added comments throughout formatting.
* formatGridHeaderRow, formatGridHeaderColumn
	* Added 'styleObject' parameter.
	* Applied font and colour from 'styleObject' to 'currentText'
	* Moved bold setting to after font and colour.

---

**./scripts/render-section.js**
* handleSectionRender
	* Removed parameters: renderSettings, breakModes
	* Added parameters: renderGlobal, headStyle, descStyle
	* Declared new variable 'secBreakFlag', reads from main settings.
	* Replaced 'renderSettings.sectionBreak' reference with 'secBreakFlag'
	* Replaced 'breakModes' reference with 'renderGlobal.breakOpts'
	* Added 'headStyle' argument to 'prepareRenderedSectionHeading' call.
	* Added 'descStyle' argument to 'prepareRenderedSectionDescription' call.
* prepareRenderedSectionHeading
	* Added 'styleObj' parameter.
	* Declared 'preparedStyle' variable.
	* 'preparedStyle' is 'styleObj' in a docs-ready format.
	* Applied styling from 'preparedStyle' to 'headingObject'
* prepareRenderedSectionDescription
	* Added 'styleObj' parameter.
	* Applied styling from 'styleObj' to 'textObject'
