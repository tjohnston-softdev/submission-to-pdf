### Configuration
This script enables several customization options as to how the script functions. This includes how the form is parsed, how the document is rendered, and where output PDF files will be stored.

To configure the script, open the [options.gs](../script/options.js) file and navigate to the `scriptSettings` global object.

---

#### Script Settings

| Program Setting       | Type                              | Description                                                                                                                                                                                                                                                               | Example                          |
|-----------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| outputFolderID        | string                            | The ID of the Google Drive folder where output PDFs will be stored.                                                                                                                                                                                                       | BgR2Zcgwj7b51DJJkT6JiulwNLNUVJlR |
| documentNameMode      | [name](#name)                     | Decides the name of the output file. This can include the form name along with the submission number and timestamp.                                                                                                                                                       | FORM_NAME_WITH_SUBMISSION_NUMBER |
| includeFormDesc       | boolean                           | If this is true, the form description will be displayed at the beginning of the document.                                                                                                                                                                                 | true                             |
| includeSubmissionData | boolean                           | If this is true, the submission number, timestamp, and E-Mail Address (optional) will be displayed at the beginning of the document                                                                                                                                       | true                             |
| includeEmailAddress   | boolean                           | If this is true, the submitter’s E-Mail Address will be displayed with the submission data if enabled.                                                                                                                                                                    | false                            |
| skipBlankQuestions    | boolean                           | If this is true, questions without an answer will not be displayed.                                                                                                                                                                                                       | false                            |
| displayRadioList      | boolean                           | If this is true, ‘Multiple choice’ form elements will be displayed as a complete list. Otherwise, only the selected option will be displayed as a ‘Short answer’                                                                                                          | true                             |
| displayCheckList      | boolean                           | If this is true, ‘Checklist’ form elements will be displayed as a complete list indicating which options were selected. Otherwise, only the selected options will be displayed as a ‘Paragraph’                                                                           | true                             |
| markOtherOption       | boolean                           | If this is true, the ‘other’ option when reading ‘Multiple choice’ and ‘Checklist’ answers will be formatted in italics. Otherwise, it will be displayed as normal. This only applies when ‘displayRadioList’ or ‘displayCheckList’ is enabled for the respective element | true                             |
| radioGridMode         | [radioGridMode](#radio-grid-mode) | Decides whether to display ‘Multiple choice grid’ elements as the full grid, or only with the selected answers.                                                                                                                                                           | FULL                             |
| useFullDurationFormat | boolean                           | If this is true, the answers to ‘Duration’ form elements will be written as a description (eg. 7 Hours, 30 Minutes, 52 Seconds). Otherwise, it will be written as “07:30:52”                                                                                              | true                             |
| sectionBreak          | [sectionBreak](#section-break)    | Decides how to separate form sections in the output document.                                                                                                                                                                                                             | RULE                             |
| includeSectionHeader  | [sectionHeader](#section-header)  | Decides how to display form section headers.                                                                                                                                                                                                                              | FULL                             |
| ignoreEmptySections   | boolean                           | If this is true, form sections without any complete answers will be omitted from the output document.                                                                                                                                                                     | false                            |
| useSymbols            | boolean                           | If this is true, unicode characters will be used to represent radio buttons and checkboxes. Otherwise, plain text equivalents will be used.                                                                                                                               | true                             |

---

#### Name

| Option                              | Description                                                                                                                                                                   |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FORM_NAME_WITH_SUBMISSION_TIMESTAMP | Includes the name of the form, and the timestamp of that particular submission.                                                                                               |
| FORM_NAME_WITH_SUBMISSION_NUMBER    | Includes the name of the form, and the number of that particular submission.                                                                                                  |
| FORM_NAME_WITH_FIRST_TEXT           | Includes the name of the form, and the first answered question parsed as a ‘Short answer’. This depends on how the form element is parsed. Not necessarily the question type. |
| FIRST_TEXT                          | The first answered question parsed as a ‘Short answer’                                                                                                                        |
| TIMESTAMP                           | The timestamp of the form submission.                                                                                                                                         |
| SUBMISSION_NUMBER                   | The number of the form submission.                                                                                                                                            |

---

#### Radio Grid Mode

| Option | Description                                                                                                         |
|--------|---------------------------------------------------------------------------------------------------------------------|
| FULL   | The ‘Multiple choice grid’ will be displayed in full, as it would appear when editing the form.                     |
| LITE   | The ‘Multiple choice grid’ will only be displayed as a small table indicating which answer was chosen for each row. |

---

#### Section Break

| Option     | Description                                                 |
|------------|-------------------------------------------------------------|
| PAGE       | Form sections will start on a new page.                     |
| RULE       | There will be a horizontal rule between form sections.      |
| WHITESPACE | There will be several blank lines between form sections.    |
| SKIP       | There will be no distinct separation between form sections. |

---

#### Section Header

| Option     | Description                                              |
|------------|----------------------------------------------------------|
| FULL       | Both the section name and description will be displayed. |
| TITLE_ONLY | Only the section name will be displayed.                 |
| SKIP       | No section header will be displayed.                     |

---

[Return to Index](../readme.md) 