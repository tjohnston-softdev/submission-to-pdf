# Changelog

**./script/code.js constructDocumentElement**
* Rewrote inner code for 'RADIO_GRID - Full'
	* `eType === rendTypes.RADIO_GRID && eObject.enabledFlag >= 0`

---

**./script/render-radio_grid.js**
* Removed the 'handleRadioGridRenderLite' function.
* Changes to the 'prepareRadioGridCellsLite' function:
	* Added 'dataObject' parameter.
	* Removed the 'prepRes' variable.
	* Replaced 'prepRes' with 'dataObject.cellGrid'
	* Removed return.

---


**./script/options.js**
* Changed 'radioGridMode' in 'scriptSettings' to "LITE"
