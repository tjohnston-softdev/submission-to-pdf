var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FORM_NAME_WITH_FIRST_TEXT": 3,
  "FIRST_TEXT": 4,
  "TIMESTAMP": 5,
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
  outputFolderID: "1438ccdTouENBrkwyP1zeAmP1Krcs74Jf",
  documentNameMode: nameOpts.FORM_NAME_WITH_FIRST_TEXT,
  includeFormDesc: true,
  includeSubmissionData: true,
  includeEmailAddress: false,
  skipBlankQuestions: false,
  displayRadioList: true,
  displayCheckList: true,
  markOtherOption: true,
  radioGridMode: radioGridModeOpts.FULL,
  useFullDurationFormat: true,
  sectionBreak: sectionBreakOpts.SKIP,
  includeSectionHeader: sectionHeaderOpts.SKIP,
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