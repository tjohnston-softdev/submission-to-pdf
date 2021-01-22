var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FIRST_SHORT_ANSWER": 3,
  "TIMESTAMP": 4,
  "SUBMISSION_NUMBER": 5
};

var fileOpts =
{
  "LINK": 1,
  "TEXT": 0,
  "SKIP": -1
};

var renderTypeOpts =
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
  displayCheckList: true,
  uploadFileMode: fileOpts.LINK,
  pageBreakSection: true,
  includeSectionName: true,
  includeSectionDesc: true,
  ignoreEmptySections: true
};



function getNameOptions()
{
  return nameOpts;
}


function getRenderTypes()
{
  return renderTypeOpts;
}


function getScriptSettings()
{
  return scriptSettings;
}