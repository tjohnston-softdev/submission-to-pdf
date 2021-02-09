# Changelog

**./script/definitions.js**
* New file
* Contains definitions for:
	* Form element rendering types
	* Symbol characters.
* Split from 'options.js'
* Because all functions share the same namespace, no further changes were necessary.

---

**./script/options.js**
* Moved the following to 'definitions.js'
	* 'renderTypeDefinitions' object.
	* 'getRenderTypes' function.
	* 'getSymbolDefinitions' function.
* Removed 'getRootFolderID' function.
* 'ignoreEmptySections' in 'scriptSettings' is now true.
