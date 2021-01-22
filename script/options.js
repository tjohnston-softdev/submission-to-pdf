var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FIRST_SHORT_ANSWER": 3,
  "TIMESTAMP": 4,
  "SUBMISSION_NUMBER": 5
};

var checkboxModeOpts =
{
  "PLAIN_TEXT": 1,
  "BULLET_LIST": 2,
  "FULL_LIST": 3
};

var renderTypeDefinitions =
{
  "OVERALL_HEADING": -1,
  "FORM_DESCRIPTION": -2,
  "SUBMISSION_DATA": -3,
  "TEXT": 1,
  "RADIO_LIST": 2,
  "CHECK_LIST": 3
};


var scriptSettings =
{
  documentFolderID: "",
  documentNameMode: nameOpts.FORM_NAME_WITH_SUBMISSION_NUMBER,
  includeFormDesc: false,
  includeSubmissionNumber: true,
  includeSubmissionTimestamp: true,
  includeEmailAddress: true,
  skipBlankQuestions: true,
  displayRadioList: true,
  checkboxMode: checkboxModeOpts.FULL_LIST,
  indentOtherOption: true,
  pageBreakSection: true,
  includeSectionName: true,
  includeSectionDesc: true,
  ignoreEmptySections: true
};



function getNameOptions()
{
  return nameOpts;
}


function getCheckboxModes()
{
  return checkboxModeOpts;
}


function getRenderTypes()
{
  return renderTypeDefinitions;
}


function getScriptSettings()
{
  return scriptSettings;
}