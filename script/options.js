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


var renderTypeDefinitions =
{
  "OVERALL_HEADING": -1,
  "FORM_DESCRIPTION": -2,
  "SUBMISSION_DATA": -3,
  "END_FORM_HEADER": -4,
  "TEXT": 1,
  "RADIO_LIST": 2,
  "CHECK_LIST": 3,
  "RADIO_GRID": 4,
  "CHECK_GRID": 5,
  "SECTION": 6
};


var scriptSettings =
{
  documentFolderID: "DRIVE ROOT FOLDER",
  documentNameMode: nameOpts.FORM_NAME_WITH_SUBMISSION_TIMESTAMP,
  includeFormDesc: true,
  includeSubmissionData: true,
  includeEmailAddress: true,
  skipBlankQuestions: false,
  displayRadioList: true,
  displayCheckList: true,
  markOtherOption: true,
  radioGridMode: radioGridModeOpts.FULL,
  useFullDurationFormat: true,
  sectionBreak: sectionBreakOpts.RULE,
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


function getSectionBreakOptions()
{
  return sectionBreakOpts;
}


function getRenderTypes()
{
  return renderTypeDefinitions;
}


function getSymbolDefinitions()
{
  var definitionRes = {};

  definitionRes["radioSymbol"] = {filled: "\u29BF", empty: "\u29BE"};
  definitionRes["checkSymbol"] = {filled: "\u2611", empty: "\u2610"};
  definitionRes["radioPlain"] = {filled: "(O)", empty: "(  )"};
  definitionRes["checkPlain"] = {filled: "[X]", empty: "[  ]"};

  return definitionRes;
}


function getScriptSettings()
{
  return scriptSettings;
}