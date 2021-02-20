# Changelog

**./script/code.js constructDocumentElement**
* RADIO_GRID - Full
	* Rewrote IF condition to add the 'enabled' flag.
		* **Before:** `settingsObj.radioGridMode > 0`
		* **After:** `eObject.enabledFlag >= 0 && settingsObj.radioGridMode > 0`
	* Rewrote the inner code using merged functions from 'render-common.js'
* RADIO_GRID - Lite
	* Added the 'enabled' flag to the IF condition.
	* Inner code has not been rewritten yet.
	* The call to 'handleRadioGridRenderLite' remains commented out.

---

**./script/render-common.js**
* Renamed the 'chooseListSymbols' function to 'chooseSymbols'
* Corrected 'boldSelection' to 'boldArray' in 'constructListOtherItem'
* New functions for grid rendering:
	* initializeGridPreperationObject
		* Stores construction data.
	* constructGridHeading
		* Writes and formats heading text.
	* prepareGridHeaderRow
		* Writes header row based on column list.
	* standardizeCellFormatting
		* Handles base cell formatting.
		* Bolds inner cells if applicable.
		* Does not bold header cells.
	* formatGridHeaderRow
		* Bolds grid header row.
		* Can either start at the first or second cell.
		* 'RADIO_GRID - Lite' starts at the first.
		* Others start at the second.
	* formatGridHeaderColumn
		* Bolds grid header column.
		* First cell from second row onwards.

---

**./script/render-radio_grid handleRadioGridRenderFull**
* Removed function - Split across 'render-common.js'

---

**./script/render-radio_grid.js constructRadioGridHeaderText**
* Removed function.
* Now exists as 'constructGridHeading' (render-common.js)

---

**./script/render-radio_grid.js prepareRadioGridCellsHeader**
* Removed function.
* Now exists as 'prepareGridHeaderRow' (render-common.js)

---

**./script/render-radio_grid.js prepareRadioGridCellsSelection**
* Parameters:
	* Removed 'filledText', 'emptyText' and 'gObject'
	* Added 'dataObject'
* Replaced references:
	* 'filledText' with 'dataObject.filledItem'
	* 'emptyText' with 'dataObject.unfilledItem'
	* 'gObject' with 'dataObject.cellGrid'

---

**./script/render-radio_grid.js formatRadioGridCells**
* Removed function.
* Now exists as 'standardizeCellFormatting' (render-common.js)

---

**./script/render-radio_grid.js formatRadioGridInnerCells**
* Removed function.
* Merged into 'standardizeCellFormatting' (render-common.js)

---

**./script/render-radio_grid.js formatRadioGridHeaderRow**
* Removed function.
* Now exists as 'formatGridHeaderRow' (render-common.js)

---

**./script/render-radio_grid.js formatRadioGridHeaderColumn**
* Removed function.
* Now exists as 'formatGridHeaderColumn' (render-common.js)
