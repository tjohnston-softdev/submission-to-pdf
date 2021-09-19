## Styling

In addition to different customization options, this script allows you to specify the font and colour of several different elements in the generated submission document.

To apply custom text colours and fonts, open the [options.gs](../script/options.js) file and navigate to objects: `textColours` and `textFonts`. Both of them have the same properties but receive different input.

* Hex values for text colours (eg. `#123456`)
* Names for text fonts (eg. "Arial").
	* Refer to [Google Docs](https://docs.google.com) itself for all supported fonts.

---

### Elements

| Property | Description |
|---|---|
| global | This is the default value. If specific elements are blank or invalid, this will be used instead. |
| mainHeading | The title of the submission document. |
| formDesc | The form's overall description. |
| sectionHeading | The heading of a particular form section. |
| sectionDesc | The description of a particular form section. |
| question | Individual form items, both the named question and the submitted answer. |
| gridHeader | Header cells for radio or checkbox grids. |
| meta | Submission number and submitter's E-Mail address |
| listSymbol | Symbol text for radio button and checkbox lists. |
| gridSymbol | Symbol text for radio and checkbox grids. |

---

[Return to Index](../readme.md) 
