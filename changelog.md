# Changelog

**./script/code.js**
* Included support for full radio grids in 'constructDocumentElement'
* Calls to functions from 'render-radio_grid.js'
	* Commented out call to 'handleRadioGridRenderLite'
	* Added call to 'handleRadioGridRenderFull'

---

**./script/render-radio_grid.js**
* "RADIO_GRID" form elements can now be rendered in full.
	* 'handleRadioGridRenderFull' is the main function
	* 'prepareRadioGridCellsHeader' writes the header row. (columns)
	* 'prepareRadioGridCellsSelection' writes the inner cells.
	* 'formatRadioGridHeaderColumn' formats first column.
	* 'formatRadioGridInnerCells' bolds the inner cells, if applicable.
* Renamed the function 'formatRadioGridHeaderLite' to 'formatRadioGridHeaderRow'
* Other changes to 'formatRadioGridHeaderRow'
	* Added 'startCell' parameter.
	* 'startCell' is assigned to 'cellIndex'
	* 'startCell' should be 0 (lite), or 1 (full)

---

**./script/options.js**
* scriptSettings:
	* 'documentFolderID' placeholder text is now "DRIVE ROOT FOLDER"
	* 'radioGridMode' is now "FULL"
	* 'sectionBreak' is now "IGNORE"
* Removed 'markedCell' from 'getSymbolDefinitions'
	* Grids will use the same characters as radio and check list elements.
