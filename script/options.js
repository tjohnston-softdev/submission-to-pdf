var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FORM_NAME_WITH_FIRST_TEXT": 3,
  "FIRST_TEXT": 4,
  "TIMESTAMP": 5,
  "SUBMISSION_NUMBER": 6
};

var checkboxModeOpts =
{
  "PLAIN_TEXT": -1,
  "BULLET_LIST": 0,
  "FULL_LIST": 1
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
  "IGNORE": -1
};

var sectionHeaderOpts =
{
  "FULL": 1,
  "TITLE_ONLY": 0,
  "SKIP": -1
}


var renderTypeDefinitions =
{
  "OVERALL_HEADING": -1,
  "FORM_DESCRIPTION": -2,
  "SUBMISSION_DATA": -3,
  "TEXT": 1,
  "RADIO_LIST": 2,
  "CHECK_LIST": 3,
  "RADIO_GRID": 4,
  "CHECK_GRID": 5,
  "SECTION": 6
};


var scriptSettings =
{
  documentFolderID: "ROOT",
  documentNameMode: nameOpts.FORM_NAME_WITH_SUBMISSION_TIMESTAMP,
  includeFormDesc: true,
  includeSubmissionData: true,
  includeEmailAddress: true,
  skipBlankQuestions: true,
  displayRadioList: true,
  checkboxMode: checkboxModeOpts.FULL_LIST,
  indentOtherOption: true,
  radioGridMode: radioGridModeOpts.FULL,
  useFullDurationFormat: true,
  sectionBreak: sectionBreakOpts.PAGE,
  includeSectionHeader: sectionHeaderOpts.FULL,
  ignoreEmptySections: true,
  useSymbols: true
};

scriptSettings.documentFolderID = getRootFolderID();




function getRootFolderID()
{
  var rootFolderObj = DriveApp.getRootFolder();
  var rootFolderID = rootFolderObj.getId();
  return rootFolderID;
}



function getNameOptions()
{
  return nameOpts;
}


function getRenderTypes()
{
  return renderTypeDefinitions;
}


function getScriptSettings()
{
  return scriptSettings;
}