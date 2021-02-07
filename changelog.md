# Changelog

**./script/code.js**
* runSubmissionToPDF
	* Declared new variable 'breakOptsObject' 
		* Assigned after 'nameOptsObject'
		* Calls 'getSectionBreakOptions' (options.js)
	* Renamed 'symbolDefinitionObject' to 'symbolObject'
* constructDocumentElement
	* Uncommented calls to functions:
		* handleTextRender (render-text.js)
		* handleRadioListRender (render-radio_list.js)
	* Declared new parameter 'breakOptsObj'
	* Renamed 'symbolDefinitionsObj' parameter to 'symbolObj'
	* x

---

**./script/render-radio_list.js**
* Renamed 'radioUnfilled' variable to 'radioEmpty' (handleRadioListRender)
* Renamed 'unfilledText' parameter to 'emptyText' (constructRadioListOptions)

---

**./script/render-check_list.js**
* Renamed functions:
	* 'handleCheckListRenderFull' to 'handleCheckListRender'
	* 'constructCheckListHeaderTextFull' to 'constructCheckListHeaderText'
	* 'constructCheckListOtherFull' to 'constructCheckListOther'
* Renamed 'checkUnfilled' variable to 'checkEmpty' (handleCheckListRender)
* Renamed 'unfilledText' parameter to 'emptyText' (constructCheckListOptions)

---

**./script/render-radio_grid.js**
* Renamed 'cellUnfilledText' variable to 'cellEmptyText' (handleRadioGridRenderFull)
* Renamed 'unfilledText' parameter to 'emptyText' (prepareRadioGridCellsSelection)

---

**./script/render-check_grid.js**
* Renamed 'cellUnfilledText' variable to 'cellEmptyText' (handleCheckGridRender)
* Renamed 'unfilledText' parameter to 'emptyText' (prepareCheckGridCells)

---

**./script/render-section.js**
* New file
* Used to render sections for the output document.
	* This includes both the break and the header.

---

**./script/render-form_data.js**
* Changed heading level from "HEADING1" to "TITLE" (handleOverallHeadingRender)

---

**./script/options.js**
* Renamed "unfilled" properties to "empty" (getSymbolDefinitions)
* 'sectionBreak' is now "RULE" (scriptSettings)
* Wrote new function 'getSectionBreakOptions'
	* Used to expose 'sectionBreakOpts' object.
