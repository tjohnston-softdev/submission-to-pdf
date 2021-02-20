# Changelog

**./script/code.js constructDocumentElement**
* CHECK_GRID
	* Added 'enabled' condition.
	* Rewrote inner code using merged functionality.

---

**./script/render-radio_grid.js**
* Removed the 'handleRadioGridRenderLite' function.

---

**./script/render-check_grid.js**
* Removed functions:
	* List:
		* handleCheckGridRender
		* constructCheckGridHeaderText
		* prepareCheckGridHeaderRow
		* formatCheckGridCells
		* formatCheckGridHeaderRow
		* formatCheckGridHeaderColumns
		* formatCheckGridInnerCells
	* This is because of merged functionality in 'render-common.js'
* Changes to 'prepareCheckGridCells'
	* Parameters:
		* Removed 'filledText', 'emptyText', and 'gObject'
		* Added 'dataObject'
	* Replaced references:
		* 'filledText' with 'dataObject.filledItem'
		* 'emptyText' with 'dataObject.unfilledItem'
		* 'gObject' with 'dataObject.cellGrid'

---


**./script/options.js**
* Changed 'radioGridMode' in 'scriptSettings' to "FULL"
