# Changelog

**./script/code.js**
* Uncommented call to 'handleTextRender' (render-text.js)
* "CHECK_LIST" parsed form elements are now being rendered.
	* 'handleCheckListRenderFull' is called when rendering as a full checklist (render-check_list-full.js)
	* 'handleCheckListRenderBullet" is called when rendering as bullet points. (render-check_list-bullet.js)

---

**./script/render-radio_list.js**
* Removed the function 'initializeRadioListRenderPrep'
* 'preperationObject' in 'handleRadioListRender' function:
	*  Now defined locally rather than using a separate function.
	* 'otherRange' is initially set to null, rather than an empty array.
* 'setRadioListOtherItalic' function:
	* New variable 'otherDefined' checks whether 'otherObj' is an array.
	* 'otherDefined' is now checked as part of the IF condition.
	* Array length check remains unchanged.

---

**./script/render-check_list-full.js**
* New file
* Used to render "CHECK_LIST" elements as a full, complete list.
* Symbols used:
	* **Plain:** [  ], [X]
	* **Unicode:** ☐ ☑

---

**./script/render-check_list-bullet.js**
* New file
* Used to render "CHECK_LIST" elements as bullet points
	* Only selected items will be listed.
* Bullet points are a filled black square.
	* Like this: ■

---

**./script/options.js**
* 'checkboxMode' option is now "FULL_LIST"
* 'skipBlankQuestions' option is now true.
