// Contains script settings (config.md)


// Document naming.
var nameOpts =
{
  "FORM_NAME_WITH_SUBMISSION_TIMESTAMP": 1,
  "FORM_NAME_WITH_SUBMISSION_NUMBER": 2,
  "FORM_NAME_WITH_FIRST_TEXT": 3,
  "FIRST_TEXT": 4,
  "SUBMISSION_TIMESTAMP": 5,
  "SUBMISSION_NUMBER": 6
};


// Radio grid display.
var radioGridModeOpts =
{
  "FULL": 1,
  "LITE": 0
};

// Section break.
var sectionBreakOpts =
{
  "PAGE": 1,
  "RULE": 2,
  "WHITESPACE": 3,
  "SKIP": -1
};

// Section header.
var sectionHeaderOpts =
{
  "FULL": 1,
  "TITLE_ONLY": 0,
  "SKIP": -1
}


// Script settings.
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
  includeSectionHeader: sectionHeaderOpts.FULL,
  ignoreEmptySections: true,
  useSymbols: true
};


// Colour options
var textColours =
{
  global: "#000000",
  mainHeading: "#EBA834",
  formDesc: "#A834EB",
  sectionHeading: "#EBA834",
  sectionDesc: "#3A34EB",
  question: "#EBA834",
  tableHeader: "#ABCDEF",
  meta: "#754F5D"
};

// Font options
var textFonts =
{
  global: "Arial",
  mainHeading: "Impact",
  formDesc: "Oswald",
  sectionHeading: "Impact",
  sectionDesc: "Oswald",
  question: "Quicksand",
  tableHeader: "",
  meta: "Dosis"
};



// GET 'nameOpts'
function getNameOptions()
{
  return nameOpts;
}


// GET 'sectionBreakOpts'
function getSectionBreakOptions()
{
  return sectionBreakOpts;
}


// GET 'scriptSettings'
function getScriptSettings()
{
  return scriptSettings;
}


// GET 'textColours'
function getTextColours()
{
  return textColours;
}

// GET 'textFonts'
function getTextFonts()
{
  return textFonts;
}