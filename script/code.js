function runSubmissionToPDF()
{
  var nameOptionsObject = {};
  var renderTypesObject = {};
  var settingsObject = {};
  
  var targetFormObject = null;
  var formName = "";
  var formDesc = "";
  var collectEmail = false;
  var formItemList = [];
  var formSubmissionArray = [];
  var submissionCount = -1;
  var previousSubmissionObject = null;

  var submissionTimestamp = "";
  var submitterEmail = "";
  
  var formElementIndex = 0;
  var currentFormElement = null;
  var currentElementResult = null;

  var preparedElementsArray = [];


  nameOptionsObject = getNameOptions();
  renderTypesObject = getRenderTypes();
  settingsObject = getScriptSettings();

  targetFormObject = FormApp.getActiveForm();

  formName = targetFormObject.getTitle();
  formDesc = targetFormObject.getDescription();
  collectEmail = targetFormObject.collectsEmail();
  formItemList = targetFormObject.getItems();

  formSubmissionArray = targetFormObject.getResponses();
  submissionCount = formSubmissionArray.length;
  previousSubmissionObject = formSubmissionArray[submissionCount - 1];

  // @ts-ignore
  submissionTimestamp = previousSubmissionObject.getTimestamp();

  if (collectEmail === true)
  {
    submitterEmail = previousSubmissionObject.getRespondentEmail();
  }

  for (formElementIndex = 0; formElementIndex < formItemList.length; formElementIndex = formElementIndex + 1)
  {
    currentFormElement = formItemList[formElementIndex];
    currentElementResult = parseFormElement(currentFormElement, previousSubmissionObject, renderTypesObject, settingsObject);
  }

}



function parseFormElement(elementObj, submissionObj, renderTypesObj, settingsObj)
{
  var elementName = elementObj.getTitle();
  var elementType = elementObj.getType();
  var elementCast = null;
  var givenAnswer = null;

  var parseRes = null;

  if (elementType === FormApp.ItemType.TEXT)
  {
    givenAnswer = readAnswer(elementObj, submissionObj);
    parseRes = handleTextField(elementName, givenAnswer, false, settingsObj.skipBlankQuestions, renderTypesObj);
  }
  else if (elementType === FormApp.ItemType.PARAGRAPH_TEXT)
  {
    givenAnswer = readAnswer(elementObj, submissionObj);
    parseRes = handleTextField(elementName, givenAnswer, true, settingsObj.skipBlankQuestions, renderTypesObj);
  }
  else if (elementType === FormApp.ItemType.MULTIPLE_CHOICE && settingsObj.displayRadioList === true)
  {
    elementCast = elementObj.asMultipleChoiceItem();
    givenAnswer = readAnswer(elementObj, submissionObj);
    parseRes = handleRadioListField(elementName, givenAnswer, elementCast, renderTypesObj);
  }
  else if (elementType === FormApp.ItemType.MULTIPLE_CHOICE)
  {
    givenAnswer = readAnswer(elementObj, submissionObj);
    parseRes = handleTextField(elementName, givenAnswer, false, settingsObj.skipBlankQuestions, renderTypesObj);
  }


  return parseRes;
}



function readAnswer(eObj, subObj)
{
  var answerObject = subObj.getResponseForItem(eObj);
  var readRes = "";

  if (answerObject !== null)
  {
    readRes = answerObject.getResponse();
  }

  return readRes;
}