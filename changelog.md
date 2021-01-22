# Changelog

**./script**
* Created new file: 'field-check_list.js'
	* Used to parse 'Checkbox' form elements when displaying them as a list.
	* Otherwise, they are parsed by 'field-text.js' instead.

---

**./script/code.js**
* Made the following variable changes in 'runSubmissionToPDF'
	* Added 'currentSectionItems' array
	* Removed 'submissionTimestamp' assignment. Replaced with blank.
	* Removed "@ts-ignore" comment regarding 'submissionTimestamp'.
* Renamed the 'readAnswer' function to 'getStringAnswer'
	* Used when retrieving the answer for 'text' and 'multiple choice' form elements.
	* Checkboxes require a separate function.
* Wrote new function 'getCheckboxAnswer'
	* Used to read the answers for 'Checkbox' elements.
	* Similar to 'getStringAnswer', but returns an empty array as default.
* Added new variable 'preparedText' to 'parseFormElement' function.
* Expanded the 'parseFormElement' function to support element types:
	* Checkbox
		* Similar to 'Multiple choice', they are parsed differently depending on whether lists are enabled.
	* Dropdown
		* Parsed the same as 'short answer' elements.

---

**./script/field-text.js**
* Added 'answerGiven' property to result object.
	* Set to True if a text answer is given.
* 'fieldRes' is no longer set to null if the element is skipped.
	* 'answerGiven' is set to False instead.

---

**./script/field-radio-list.js**
* Added 'answerGiven' property to result object in 'handleRadioListField'
	* Set during the 'setRadioChoice' function.
	* Becomes true if a radio button is selected, or 'other' text is entered.
* Keep in mind this only affects 'Multiple Choice' form elements when displaying them as a list.
	* Otherwise the answer is displayed as text
	* Refer to 'field-text.js'
* Corrected the 'choiceIndex' property typo in 'setRadioChoice'
	* choiceIndex --> chosenOption
	* The 'chosenOption' property is now set correctly.

---

**./script/options.js**
* Added "CHECK_LIST" to 'renderTypeOpts'. Refers to 'Checkboxes' form element. 
