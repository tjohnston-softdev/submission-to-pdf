function runSubmissionToPDF()
{
  var nameOptsObject = {};
  var chkOptsObject = {};
  var renderTypesObject = {};
  var settingsObject = {};
  
  var targetForm = null;
  var formName = "";
  var formDesc = "";
  var collectEmail = false;
  var formItemList = [];
  var formSubmissionArray = [];
  var submissionCount = -1;
  var prevSubmission = null;

  var submissionTimestamp = "";
  var submitterEmail = "";
  
  var formElementIndex = 0;
  var currentElement = null;
  var currentResult = null;
  var currentSectionItems = [];
  
  var preparedElementsArray = [];


  nameOptsObject = getNameOptions();
  chkOptsObject = getCheckboxModes();
  renderTypesObject = getRenderTypes();
  settingsObject = getScriptSettings();

  targetForm = FormApp.getActiveForm();

  formName = targetForm.getTitle();
  formDesc = targetForm.getDescription();
  collectEmail = targetForm.collectsEmail();
  formItemList = targetForm.getItems();

  formSubmissionArray = targetForm.getResponses();
  submissionCount = formSubmissionArray.length;
  prevSubmission = formSubmissionArray[submissionCount - 1];

  submissionTimestamp = "";

  if (collectEmail === true)
  {
    submitterEmail = prevSubmission.getRespondentEmail();
  }

  for (formElementIndex = 0; formElementIndex < formItemList.length; formElementIndex = formElementIndex + 1)
  {
    currentElement = formItemList[formElementIndex];
    currentResult = parseFormElement(currentElement, prevSubmission, chkOptsObject, renderTypesObject, settingsObject);
  }

}



function parseFormElement(elementObj, submissionObj, chkModes, rTypesObj, settingsObj)
{
  var eName = elementObj.getTitle();
  var eType = elementObj.getType();
  var eCast = null;
  var givenAnswer = null;
  var preparedText = "";

  var parseRes = null;

  if (eType === FormApp.ItemType.TEXT)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.PARAGRAPH_TEXT)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, true, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE && settingsObj.displayRadioList === true)
  {
    eCast = elementObj.asMultipleChoiceItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleRadioListField(eName, givenAnswer, eCast, rTypesObj);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && settingsObj.checkboxMode === chkModes.FULL_LIST)
  {
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getCheckboxAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(eName, givenAnswer, eCast, true, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && settingsObj.checkboxMode === chkModes.BULLET_LIST)
  {
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getCheckboxAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(eName, givenAnswer, eCast, false, rTypesObj)
  }
  else if (eType === FormApp.ItemType.CHECKBOX)
  {
    givenAnswer = getCheckboxAnswer(elementObj, submissionObj);
    preparedText = givenAnswer.join();
    parseRes = handleTextField(eName, preparedText, true, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.LIST)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.SCALE)
  {
    eCast = elementObj.asScaleItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareScaleText(givenAnswer, eCast);
    parseRes = handleTextField(eName, preparedText, false, settingsObj.skipBlankQuestions, rTypesObj);
  }

  return parseRes;
}



function getStringAnswer(eObj, subObj)
{
  var answerObject = subObj.getResponseForItem(eObj);
  var readRes = "";

  if (answerObject !== null)
  {
    readRes = answerObject.getResponse();
  }

  return readRes;
}


function getCheckboxAnswer(eObj, subObj)
{
  var answerObject = subObj.getResponseForItem(eObj);
  var readRes = [];

  if (answerObject !== null)
  {
    readRes = answerObject.getResponse();
  }

  return readRes;
}