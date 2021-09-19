# Changelog

**./script/render-common.js - constructListOtherItem**
* 'otherSelectRange' is assigned after 'selectEnd'
* Revised IF structure so that 'otherSelectRange' is added to 'listConstructData.symbolArray'
	* This is so that the symbol for the 'Other' option is correctly formatted.
	* Separate code whether the symbol will be bolded or not.
* Changed bold comment
	* Before "Indicates symbol text index range for bolding."
	* After: "Include symbol with custom styling at bold weight."
* Added comment referring to normal symbol weight.
