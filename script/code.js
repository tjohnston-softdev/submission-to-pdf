function runSubmissionToPDF()
{
  var nameOptsObject = {};
  var breakOptsObject = {};
  var renderTypesObject = {};
  var symbolObject = {};
  var settingsObject = {};
  
  var targetForm = null;
  var formName = "";
  var formDesc = "";
  var collectEmail = false;
  var formItemList = [];
  var formSubmissionArray = [];
  var subCount = -1;
  var prevSubmission = null;

  var subEmail = "";
  var subTime = null;

  var elementIndex = 0;
  var elementCutoff = -1;
  var currentElement = null;
  var currentResult = null;
  var currentParseSuccessful = false;
  
  var parsedElements = {section: [], overall: []};
  var outputName = "";
  var overallHeadingElement = null;
  var formDescriptionElement = null;
  var submissionDataElement = null;
  var endFormHeaderElement = null;

  var outputDocumentObject = null;
  var outputContents = null;
  var renderIndex = 0;
  var currentRender = null;

  var documentFileID = "";
  var documentFileObject = null;
  var documentBinary = null;
  var pdfFileObject = null;
  var targetFolderObject = null;


  nameOptsObject = getNameOptions();
  breakOptsObject = getSectionBreakOptions();
  renderTypesObject = getRenderTypes();
  symbolObject = getSymbolDefinitions();
  settingsObject = getScriptSettings();

  targetForm = FormApp.getActiveForm();

  formName = targetForm.getTitle();
  formDesc = targetForm.getDescription();
  collectEmail = targetForm.collectsEmail();
  formItemList = targetForm.getItems();

  formSubmissionArray = targetForm.getResponses();
  subCount = formSubmissionArray.length;
  prevSubmission = formSubmissionArray[subCount - 1];
  subTime = readSubmissionTimestamp(prevSubmission);

  elementCutoff = formItemList.length - 1;

  if (collectEmail === true)
  {
    subEmail = prevSubmission.getRespondentEmail();
  }

  for (elementIndex = 0; elementIndex <= elementCutoff; elementIndex = elementIndex + 1)
  {
    currentElement = formItemList[elementIndex];
    currentResult = parseFormElement(elementIndex, elementCutoff, currentElement, prevSubmission, renderTypesObject, settingsObject);
    currentParseSuccessful = false;

    if (currentResult !== null && currentResult.elementType === renderTypesObject.SECTION)
    {
      handleParsedElementSectionBreak(currentResult, parsedElements, settingsObject, false);
      currentParseSuccessful = true;
    }
    else if (currentResult !== null)
    {
      parsedElements.section.push(currentResult);
      currentParseSuccessful = true;
    }
    else
    {
      currentParseSuccessful = false;
    }
  }

  handleParsedElementSectionBreak(null, parsedElements, settingsObject, true);
  outputName = decideSubmissionName(settingsObject, nameOptsObject, formName, subCount, subTime, parsedElements, renderTypesObject);

  overallHeadingElement = handleOverallHeadingField(formName, renderTypesObject);
  formDescriptionElement = handleFormDescriptionField(formDesc, settingsObject.includeFormDesc, renderTypesObject);
  submissionDataElement = handleSubmissionDataField(subCount, subTime, subEmail, settingsObject, renderTypesObject);
  endFormHeaderElement = handleEndFormHeaderField(renderTypesObject);
  parsedElements.overall.unshift(overallHeadingElement, formDescriptionElement, submissionDataElement, endFormHeaderElement);

  outputDocumentObject = DocumentApp.create(outputName);
  outputContents = outputDocumentObject.getBody();


  for (renderIndex = 0; renderIndex < parsedElements.overall.length; renderIndex = renderIndex + 1)
  {
    currentRender = parsedElements.overall[renderIndex];

    if (currentRender !== null)
    {
      constructDocumentElement(currentRender, outputContents, renderTypesObject, breakOptsObject, symbolObject, settingsObject);
    }
  }

  outputDocumentObject.saveAndClose();
  documentFileID = outputDocumentObject.getId();
  documentFileObject = DriveApp.getFileById(documentFileID);
  documentBinary = documentFileObject.getAs("application/pdf");
  pdfFileObject = DriveApp.createFile(documentBinary);

  targetFolderObject = DriveApp.getFolderById(settingsObject.outputFolderID);
  pdfFileObject.moveTo(targetFolderObject);
  documentFileObject.setTrashed(true);
}



function parseFormElement(eIndex, eLast, elementObj, submissionObj, rTypesObj, settingsObj)
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
    parseRes = handleTextField(eName, givenAnswer, true, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.PARAGRAPH_TEXT)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, true, true, settingsObj.skipBlankQuestions, rTypesObj);
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
    parseRes = handleTextField(eName, givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && settingsObj.displayCheckList === true)
  {
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(eName, givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.CHECKBOX)
  {
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    preparedText = givenAnswer.join();
    parseRes = handleTextField(eName, preparedText, false, true, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.LIST)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.SCALE)
  {
    eCast = elementObj.asScaleItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareScaleText(givenAnswer, eCast);
    parseRes = handleTextField(eName, preparedText, false, false, settingsObj.skipBlankQuestions, rTypesObj);
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
    parseRes = handleTextField(eName, givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.TIME)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.DURATION)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareDurationText(givenAnswer, settingsObj.useFullDurationFormat);
    parseRes = handleTextField(eName, preparedText, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.DATETIME)
  {
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(eName, givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
  }
  else if (eType === FormApp.ItemType.PAGE_BREAK)
  {
    eCast = elementObj.asPageBreakItem();
    parseRes = handleSectionField(eIndex, eLast, eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else if (eType === FormApp.ItemType.SECTION_HEADER)
  {
    eCast = elementObj.asSectionHeaderItem();
    parseRes = handleSectionField(eIndex, eLast, eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else
  {
    parseRes = null;
  }

  return parseRes;
}


/* ----------------- */


function constructDocumentElement(eObject, documentBody, rendTypes, breakOptsObj, symbolObj, settingsObj)
{
  var eType = eObject.elementType;

  if (eType === rendTypes.OVERALL_HEADING)
  {
    handleOverallHeadingRender(documentBody, eObject);
  }
  else if (eType === rendTypes.FORM_DESCRIPTION)
  {
    handleFormDescriptionRender(documentBody, eObject);
  }
  else if (eType === rendTypes.SUBMISSION_DATA)
  {
    handleSubmissionDataRender(documentBody, eObject);
  }
  else if (eType === rendTypes.END_FORM_HEADER)
  {
    handleEndFormDataRender(documentBody);
  }
  else if (eType === rendTypes.TEXT)
  {
    handleTextRender(documentBody, eObject);
  }
  else if (eType === rendTypes.RADIO_LIST)
  {
    handleRadioListRender(documentBody, eObject, settingsObj, symbolObj);
  }
  else if (eType === rendTypes.CHECK_LIST)
  {
    handleCheckListRender(documentBody, eObject, settingsObj, symbolObj);
  }
  else if (eType === rendTypes.RADIO_GRID && settingsObj.radioGridMode > 0)
  {
    handleRadioGridRenderFull(documentBody, eObject, settingsObj, symbolObj);
  }
  else if (eType === rendTypes.RADIO_GRID)
  {
    handleRadioGridRenderLite(documentBody, eObject);
  }
  else if (eType === rendTypes.CHECK_GRID)
  {
    handleCheckGridRender(documentBody, eObject, settingsObj, symbolObj);
  }
  else if (eType === rendTypes.SECTION)
  {
    handleSectionRender(documentBody, eObject, settingsObj, breakOptsObj);
  }

}