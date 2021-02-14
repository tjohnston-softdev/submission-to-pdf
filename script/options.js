var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FORM_NAME_WITH_FIRST_TEXT": 3,
  "FIRST_TEXT": 4,
  "SUBMISSION_TIMESTAMP": 5,
  "SUBMISSION_NUMBER": 6
};

var radioGridModeOpts =
{
  "FULL": 1,
  "LITE": 0
};

var sectionBreakOpts =
{
  "PAGE": 1,
  "RULE": 2,
  "WHITESPACE": 3,
  "SKIP": -1
};

var sectionHeaderOpts =
{
  "FULL": 1,
  "TITLE_ONLY": 0,
  "SKIP": -1
}


var scriptSettings =
{
  outputFolderID: "",
  documentNameMode: -1,
  includeFormDesc: true,
  includeSubmissionData: true,
  includeEmailAddress: true,
  skipBlankQuestions: false,
  displayRadioList: true,
  displayCheckList: true,
  markOtherOption: true,
  radioGridMode: radioGridModeOpts.FULL,
  sectionBreak: sectionBreakOpts.RULE,
  includeSectionHeader: sectionHeaderOpts.TITLE_ONLY,
  ignoreEmptySections: false,
  useSymbols: true
};



function getNameOptions()
{
  return nameOpts;
}


function getSectionBreakOptions()
{
  return sectionBreakOpts;
}


function getScriptSettings()
{
  return scriptSettings;
}