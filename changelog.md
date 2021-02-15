**./script/code.js constructDocumentElement**
* "RADIO_LIST" and "CHECK_LIST"
	* Added 'enabled' condition.
	* Rewrote inner code from scratch to use merged functions from 'render-common.js'

---

**./script/render-common.js**
* Wrote new functions for rendering radio and check lists.
	* initializeListPreperationObject - Stores construction data.
	* chooseListSymbols - Assigns symbol text.
	* constructListHeaderText - Writes header text.
	* constructListOtherItem - Writes other text.
	* setListBoldStatus - Used to bold plain symbol text.
	* setListOtherItalic - Used to italicize the *other* option text.
* 'chooseListSymbols ' will also be used for when grid render code is merged. 

---

**./script/render-radio_list.js handleRadioListRender**
* This function has been removed.
* However, some of the code has been split into 'render-common.js'
* The 'preperationObject' variable is used as the basis for 'initializeListPreperationObject'
* The 'textContents' variable exists as 'textObject' property in 'initializeListPreperationObject'
* Symbol assignment
	* Variables:
		* radioEmpty
		* radioFilled
		* boldRadioSelectionText
	* They continue to exist as properties in 'initializeListPreperationObject'
	* They are assigned in the 'chooseListSymbols' function (render-common.js)
* The `parsedRadioList.enabledFlag` IF condition has been incorporated into 'code.js'

---

**./script/render-radio_list.js constructRadioListHeaderText**
* Removed function
* Now exists as 'constructListHeaderText' in 'render-common.js'

---

**./script/render-radio_list.js constructRadioListOptions**
* Removed 'boldSelection' parameter.
* Changed the following parameters to variables:
	* emptyText
	* filledText 
* Renamed the 'prepObject' parameter to 'dataObject'
* Replaced 'boldSelection' reference with 'dataObject.boldSelection'

---

**./script/render-radio_list.js constructRadioListOther**
* Removed function
* Now exists as 'constructListOtherItem' in 'render-common.js'

---

**./script/render-radio_list.js setRadioListBoldStatus**
* Moved into 'render-common.js' as 'setListBoldStatus'

---

**./script/render-radio_list.js setRadioListOtherItalic**
* Moved into 'render-common.js' as 'setListOtherItalic'

---

**./script/render-check_list.js**
* Removed all functions except for 'constructCheckListOptions'
* As for 'constructCheckListOptions' itself:
	* Removed the 'boldSelection' parameter.
	* Declared these parameters as variables:
		* filledText
		* emptyText
	* Renamed the 'prepObject' parameter to 'dataObject'
	* Replaced 'boldSelection' reference with 'dataObject.boldSelection'
