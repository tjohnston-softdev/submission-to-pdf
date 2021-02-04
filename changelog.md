# Changelog

**./script/code.js**
* Commented out call to 'handleTextRender' (render-text.js)
* Expanded 'constructDocumentElement' to support "RADIO_LIST" elements.

---

**./script/render-radio_list.js**
* New file
* Used to render "RADIO_LIST" elements for the output document.

---

**./script/options.js**
* Changes to 'scriptSettings':
	* Renamed 'indentOtherOption' to 'markOtherOption'
	* 'displayRadioList' is now true
* Rather than indenting the 'other' option text for radio lists and check lists, the text will be formatted in italics (*like this*)
