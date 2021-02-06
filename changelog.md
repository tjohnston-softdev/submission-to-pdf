# Changelog

**./script/code.js**
* Commented out calls to the following functions:
	* handleTextRender (render-text.js)
	* handleRadioListRender (render-radio_list.js)
	* handleCheckListRenderFull (render-check_list-full.js)
	* handleCheckListRenderBullet(render-check_list-bullet.js)
* Wrote IF conditions in 'constructDocumentElement' to support "RADIO_GRID" elements.
	* If the 'radioGridMode' setting is a positive flag, the full grid will be rendered.
	* Otherwise, it will be a table of selected answers.
* Added call to 'handleRadioGridRenderLite' (render-radio_grid.js)
	* Only the "LITE" mode is supported for now.
	* The "FULL" condition is only a stub.

---

**./script/render-radio_grid.js**
* New file
	* Used to render "RADIO_GRID" parsed form elements into the output document.
	* Only "LITE" mode is supported for now.
	* Unlike "CHECK_LIST", both rendering modes will use the same file.

---

**./script/options.js**
* scriptSettings
	* 'skipBlankQuestions' is now false.
	* 'radioGridMode' is now "LITE"
