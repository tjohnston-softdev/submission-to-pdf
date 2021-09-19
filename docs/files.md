## Script Files

---

**code**  ([link](../script/code.js))

This is the main script file. To execute the script, use the function 'runSubmissionToPDF'

\
**field-text** ([link](../script/field-text.js))

Reads the answers for any question types that can be interpreted as text. These are:

* Short answer
* Paragraph
* Multiple choice (If 'displayRadioList' is false)
* Checkboxes (If 'displayCheckList' is false)
* Drop-down
* Linear Scale
* Date
* Time / Duration

\
**field-radio_list** ([link](../script/field-radio_list.js))

Reads the answers for 'Multiple choice' questions when they are set to be displayed as a full list with the selected option marked. If 'displayRadioList' is not enabled, the selected option will be read as a 'Short answer' (field-text)

\
**field-check_list** ([link](../script/field-check_list.js))

Reads the answers for a 'Checkboxes' form item when they are set to be displayed as a full list with the selected options ticked. If 'displayCheckList' is not enabled, the ticked options will be read as a 'Paragraph' (field-text)

\
**field-radio_grid** ([link](../script/field-radio_grid.js))

Reads the answers for 'Multiple-choice grid' form items.

\
**field-check_grid** ([link](../script/field-check_grid.js))

Reads the answers for 'Tick box grid' form items.

\
**field-section** ([link](../script/field-section.js))

Reads the section headers on the form and decides how to display them in the output document.

\
**field-form_data** ([link](../script/field-form_data.js))

Reads the form name and description so that they can be displayed in the output document. This file also saves the number, timestamp, and E-Mail address of the submission being converted.

\
**form-element-help** ([link](../script/form-element-help.js))

This file is used to retrieve submitted answers for a corresponding form element, format 'Linear scale' and 'Time / Duration' answers into readable text, and prepare form element names.

\
**parsed-section** ([link](../script/parsed-section.js))

When the end of a section on the form is reached, this file checks whether any questions have been answered for that section. If no answers have been given and 'ignoreEmptySections' is set to true, then the section elements will be ignored and will not be displayed in the output document.

\
**submission-timestamp** ([link](../script/submission-timestamp.js))

Used to convert the form submission timestamp into a readable string. (DEPRECIATED)

\
**submission-name** ([link](../script/submission-name.js))

Decides the file name of the output document depending on the [chosen option](./config.md#name).

\
**type-offset** ([link](../script/type-offset.js))

Used to retrieve the render type of the previously answered form element when constructing the output document.

\
**text-styling** ([link](../script/text-styling.js))

Used to validate input for custom element colours and fonts. Also handles style preparation for form elements before they are rendered. This does not apply the styling to the document itself. It only prepares the input arguments.

\
**render-common** ([link](../script/render-common.js))

Stores common functions that are used when writing the output document.

\
**render-form_data** ([link](../script/render-form_data.js))

Writes the form name, form description, and submission data at the start of the output document.

\
**render-text** ([link](../script/render-text.js))

Writes submitted form answers that have been interpreted as text (field-text) to the output document.

\
**render-radio_list** ([link](../script/render-radio_list.js))

Writes parsed radio lists based on 'Multiple choice' form elements to the output document. (field-radio_list)

\
**render-check_list** ([link](../script/render-check_list.js))

Writes parsed check lists based on 'Checkboxes' form elements to the output document. (field-check_list)

\
**render-radio_grid** ([link](../script/render-radio_grid.js))

Writes parsed radio grids based on 'Multiple-choice grid' form elements to the output document. (field-radio_grid). These items can be displayed as either a full grid, or with selected answers only.

\
**render-check_grid** ([link](../script/render-check_grid.js))

Writes parsed check grids based on 'Tickbox grid' form elements to the output document (field-check_grid). Unlike their radio button counterparts, they are always displayed as the complete grid with no "LITE" option.

\
**render-section** ([link](../script/render-section.js))

Used to add separators between different form sections, and write the section header to the output document. There are [options](./config.md#section-break) as to how this is performed.

\
**definitions** ([link](../script/definitions.js))

Contains definitions for:

* Element rendering types
* Symbol characters for radio buttons and checkboxes.

\
**options** ([link](../script/options.js))

Contains [script settings](./config.md).

---

[Return to Index](../readme.md) 
