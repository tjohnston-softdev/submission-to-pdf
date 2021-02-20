# Changelog

**./script/code.js**
* Uncommented 'handleSectionRender' call.
* Added 'renderTypesObject' argument to 'getPreviousElementRenderType' call.

---

**./script/options.js**
* 'includeSectionHeader' in 'scriptSettings' is now "FULL" (options.js)

---

**./script/type-offset.js getPreviousElementRenderType**
* Added 'rTypes' parameter - Render types object.
* Renamed the 'currentPreviousObject' variable to 'currentPrev'
* Added `else if` condition to cover visible section objects.

---

**./script/render-text.js getTextRenderLineBreakPrefix**
* Added "SECTION" to prefix condition.
