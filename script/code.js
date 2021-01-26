function runSubmissionToPDF()
{
  var nameOptsObject = {};
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
  var submitterEmail = "";
  
  var formElementIndex = 0;
  var currentElement = null;
  var currentResult = null;
  var currentParsed = false;
  
  var parsedElements = {section: [], overall: []};


  nameOptsObject = getNameOptions();
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

  if (collectEmail === true)
  {
    submitterEmail = prevSubmission.getRespondentEmail();
  }

  for (formElementIndex = 0; formElementIndex < formItemList.length; formElementIndex = formElementIndex + 1)
  {
    currentElement = formItemList[formElementIndex];
    currentResult = parseFormElement(currentElement, prevSubmission, renderTypesObject, settingsObject);
    currentParsed = false;

    if (currentResult !== null && currentResult.elementType === renderTypesObject.SECTION)
    {
      handleParsedElementSectionBreak(currentResult, parsedElements, settingsObject, false);
      currentParsed = true;
    }
    else if (currentResult !== null)
    {
      parsedElements.section.push(currentResult);
      currentParsed = true;
    }
    else
    {
      currentParsed = false;
    }
  }

  handleParsedElementSectionBreak(null, parsedElements, settingsObject, true);
}



function parseFormElement(elementObj, submissionObj, rTypesObj, settingsObj)
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
    parseRes = handleRadioListField(eName, givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && settingsObj.checkboxMode >= 0)
  {
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(eName, givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX)
  {
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
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
  else if (eType === FormApp.ItemType.GRID)
  {
    eCast = elementObj.asGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleRadioGridField(eName, givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX_GRID)
  {
    eCast = elementObj.asCheckboxGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckGridField(eName, givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.DATE)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.TIME)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.DURATION)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareDurationText(givenAnswer, settingsObj.useFullDurationFormat);
    parseRes = handleTextField(eName, preparedText, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.DATETIME)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.PAGE_BREAK)
  {
    eCast = elementObj.asPageBreakItem();
    parseRes = handleSectionField(eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else if (eType === FormApp.ItemType.SECTION_HEADER)
  {
    eCast = elementObj.asSectionHeaderItem();
    parseRes = handleSectionField(eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else
  {
    parseRes = null;
  }

  return parseRes;
}