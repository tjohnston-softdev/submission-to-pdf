/*
  This is the main script file.
  To execute the script, use the function:
  'runSubmissionToPDF'
*/


function runSubmissionToPDF()
{
  
  // Settings object variables.
  var nameOptsObject = {};
  var breakOptsObject = {};
  var settingsObject = {};
  var coloursObject = {};
  
  // Definition object variables.
  var renderTypesObject = {};
  var symbolObject = {};
  
  // Form variables.
  var targetForm = null;
  var formName = "";
  var formDesc = "";
  var collectEmail = false;
  var formItemList = [];
  var formSubmissionArray = [];
  var subCount = -1;

  // Submission variables
  var prevSubmission = null;
  var subTime = null;
  var subEmail = "";

  // Form element loop variables.
  var elementIndex = 0;
  var elementCount = -1;
  var currentNumber = -1;
  var currentElement = null;
  var currentResult = null;
  var currentParseSuccessful = false;
  var parsedElements = {section: [], overall: []};

  // Parsed form and submission data elements.
  var overallHeadingElement = null;
  var formDescriptionElement = null;
  var submissionDataElement = null;
  var endFormHeaderElement = null;

  // Document construction variables.
  var outputName = "";
  var outputDocumentObject = null;
  var outputContents = null;
  var renderIndex = 0;
  var currentRender = null;
  var currentPrevType = null;

  // PDF export variables.
  var documentFileID = "";
  var documentFileObject = null;
  var documentBinary = null;
  var pdfFileObject = null;
  var targetFolderObject = null;


  // Reads settings and definition objects.
  nameOptsObject = getNameOptions();
  breakOptsObject = getSectionBreakOptions();
  settingsObject = getScriptSettings();
  coloursObject = getTextColours();
  renderTypesObject = getRenderTypes();
  symbolObject = getSymbolDefinitions();

  // Reads attatched form details.
  targetForm = FormApp.getActiveForm();
  formName = targetForm.getTitle();
  formDesc = targetForm.getDescription();
  collectEmail = targetForm.collectsEmail();
  formItemList = targetForm.getItems();
  formSubmissionArray = targetForm.getResponses();
  subCount = formSubmissionArray.length;

  // Reads previous submission.
  prevSubmission = formSubmissionArray[subCount - 1];
  subTime = readSubmissionTimestamp(prevSubmission);

  // Counts form elements.
  elementCount = formItemList.length;

  // Reads submitter E-Mail if applicable.
  if (collectEmail === true)
  {
    subEmail = prevSubmission.getRespondentEmail();
  }

  // Loops through all elements in the form.
  for (elementIndex = 0; elementIndex < elementCount; elementIndex = elementIndex + 1)
  {
    // Reads and parses current form element.
    currentNumber = elementIndex + 1;
    currentElement = formItemList[elementIndex];
    currentResult = parseFormElement(currentNumber, elementCount, currentElement, prevSubmission, renderTypesObject, settingsObject);
    currentParseSuccessful = false;

    // IF structure controls parsed element.
    if (currentResult !== null && currentResult.elementType === renderTypesObject.SECTION)
    {
      // Section break - Decide whether to export current section elements.
      handleParsedElementSectionBreak(currentResult, parsedElements, settingsObject, false);
      currentParseSuccessful = true;
    }
    else if (currentResult !== null)
    {
      // Parse successful - Add to section elements.
      parsedElements.section.push(currentResult);
      currentParseSuccessful = true;
    }
    else
    {
      // Ignore current element.
      currentParseSuccessful = false;
    }
  }
  // End loop

  
  // Decide whether to export final section elements.
  handleParsedElementSectionBreak(null, parsedElements, settingsObject, true);

  // Parses form and submission data into elements for output document.
  overallHeadingElement = handleOverallHeadingField(formName, renderTypesObject);
  formDescriptionElement = handleFormDescriptionField(formDesc, settingsObject.includeFormDesc, renderTypesObject);
  submissionDataElement = handleSubmissionDataField(subCount, subTime, subEmail, settingsObject, renderTypesObject);
  endFormHeaderElement = handleEndFormHeaderField(renderTypesObject);
  
  // These elements will be placed at the beginning of the document.
  parsedElements.overall.unshift(overallHeadingElement, formDescriptionElement, submissionDataElement, endFormHeaderElement);

  // Creates output document file.
  outputName = decideSubmissionName(settingsObject, nameOptsObject, formName, subCount, subTime, parsedElements, renderTypesObject);
  outputDocumentObject = DocumentApp.create(outputName);
  outputContents = outputDocumentObject.getBody();


  // Loops through parsed elements.
  for (renderIndex = 0; renderIndex < parsedElements.overall.length; renderIndex = renderIndex + 1)
  {
    // Reads current element, and previous element type.
    currentRender = parsedElements.overall[renderIndex];
    currentPrevType = getPreviousElementRenderType(renderIndex, parsedElements.overall, renderTypesObject);

    // If parsed element exists, add to output document.
    if (currentRender !== null)
    {
      constructDocumentElement(currentRender, currentPrevType, outputContents, renderTypesObject, breakOptsObject, symbolObject, settingsObject);
    }
  }

  
  // Converts output document file to PDF.
  outputDocumentObject.saveAndClose();
  documentFileID = outputDocumentObject.getId();
  documentFileObject = DriveApp.getFileById(documentFileID);
  documentBinary = documentFileObject.getAs("application/pdf");
  pdfFileObject = DriveApp.createFile(documentBinary);

  // Moves PDF to target folder.
  targetFolderObject = DriveApp.getFolderById(settingsObject.outputFolderID);
  pdfFileObject.moveTo(targetFolderObject);

  // Deletes original document.
  documentFileObject.setTrashed(true);
}



// Reads current form element.
function parseFormElement(eNumber, eCount, elementObj, submissionObj, rTypesObj, settingsObj)
{
  // Local variables.
  var eName = "";
  var eType = null;
  var eCast = null;                 // Element object cast as specific type.
  var givenAnswer = null;           // Submitted answer for element.
  var preparedText = "";            // Prepared text answer.

  // Result variable.
  var parseRes = null;


  // Reads element name and type.
  eName = elementObj.getTitle();
  eType = elementObj.getType();

  
  // IF structure parses form element based on type.
  if (eType === FormApp.ItemType.TEXT)
  {
    // Short answer.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, true, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Short answer", eNumber);
  }
  else if (eType === FormApp.ItemType.PARAGRAPH_TEXT)
  {
    // Paragraph.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, true, true, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Paragraph", eNumber);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE && settingsObj.displayRadioList === true)
  {
    // Multiple choice - Displayed as list.
    eCast = elementObj.asMultipleChoiceItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleRadioListField(givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Multiple choice list", eNumber);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE)
  {
    // Multiple choice - Displayed as text.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Multiple choice", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && settingsObj.displayCheckList === true)
  {
    // Checkboxes - Displayed as list.
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Checkbox list", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX)
  {
    // Checkboxes - Displayed as text. Selected answers comma-separated.
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    preparedText = givenAnswer.join();
    parseRes = handleTextField(preparedText, false, true, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Checkbox", eNumber);
  }
  else if (eType === FormApp.ItemType.LIST)
  {
    // Drop-down.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Drop-down", eNumber);
  }
  else if (eType === FormApp.ItemType.SCALE)
  {
    // Linear scale.
    eCast = elementObj.asScaleItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareScaleText(givenAnswer, eCast);
    parseRes = handleTextField(preparedText, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Linear scale", eNumber);
  }
  else if (eType === FormApp.ItemType.GRID)
  {
    // Multiple-choice grid.
    eCast = elementObj.asGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleRadioGridField(givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Multiple-choice grid", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX_GRID)
  {
    // Tick box grid.
    eCast = elementObj.asCheckboxGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckGridField(givenAnswer, eCast, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Tick box grid", eNumber);
  }
  else if (eType === FormApp.ItemType.DATE)
  {
    // Date - Base.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Date", eNumber);
  }
  else if (eType === FormApp.ItemType.TIME)
  {
    // Time - Base.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Time", eNumber);
  }
  else if (eType === FormApp.ItemType.DURATION)
  {
    // Time - Duration.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareDurationText(givenAnswer);
    parseRes = handleTextField(preparedText, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Duration", eNumber);
  }
  else if (eType === FormApp.ItemType.DATETIME)
  {
    // Date - Include time.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, settingsObj.skipBlankQuestions, rTypesObj);
    setParsedElementTitle(parseRes, eName, "Timestamp", eNumber);
  }
  else if (eType === FormApp.ItemType.PAGE_BREAK)
  {
    // Section - Active.
    eCast = elementObj.asPageBreakItem();
    parseRes = handleSectionField(eNumber, eCount, eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else if (eType === FormApp.ItemType.SECTION_HEADER)
  {
    // Section - Depreciated.
    eCast = elementObj.asSectionHeaderItem();
    parseRes = handleSectionField(eNumber, eCount, eName, eCast, settingsObj.includeSectionHeader, rTypesObj);
  }
  else
  {
    // Unsupported.
    parseRes = null;
  }

  return parseRes;
}


/* ----------------- */


// Adds current parsed element to the output document.
function constructDocumentElement(eObject, prevType, documentBody, rendTypes, breakOptsObj, symbolObj, settingsObj)
{
  var elementStyling = null;
  var createdParagraph = null;
  var constructionData = null;
  var eType = eObject.elementType;

  
  // IF structure builds element differently based on parse type.
  if (eType === rendTypes.OVERALL_HEADING)
  {
    // Document heading.
    handleOverallHeadingRender(documentBody, eObject);
  }
  else if (eType === rendTypes.FORM_DESCRIPTION && eObject.visible === true && eObject.descriptionText.length > 0)
  {
    // Form description.
    createdParagraph = initializeParagraphObject(documentBody);
    handleFormDescriptionRender(createdParagraph, eObject);
  }
  else if (eType === rendTypes.SUBMISSION_DATA && eObject.visible === true)
  {
    // Submission data (Number, Timestamp, E-Mail)
    createdParagraph = initializeParagraphObject(documentBody);
    handleSubmissionDataRender(createdParagraph, eObject);
  }
  else if (eType === rendTypes.END_FORM_HEADER)
  {
    // Separates header and content.
    documentBody.appendHorizontalRule();
  }
  else if (eType === rendTypes.TEXT && eObject.enabledFlag >= 0)
  {
    // Plain text.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = handleTextRender(createdParagraph, eObject, prevType, rendTypes);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setTextParagraphBoldHeader(constructionData);
  }
  else if (eType === rendTypes.RADIO_LIST && eObject.enabledFlag >= 0)
  {
    // Radio button list.
    
    // Initializes data and chooses radio button symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeListPreperationObject();
    chooseSymbols(settingsObj.useSymbols, symbolObj.radioPlain, symbolObj.radioSymbol, constructionData);
    
    // Write text.
    constructListHeaderText(eObject.elementTitle, constructionData);
    constructRadioListOptions(eObject, constructionData);
    constructListOtherItem(eObject, constructionData);
    
    // Format text.
    constructionData.textObject = createdParagraph.appendText(constructionData.textString);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setListBoldStatus(constructionData.textObject, constructionData.boldArray);
    setListOtherItalic(constructionData.textObject, constructionData.otherRange, settingsObj.markOtherOption);
  }
  else if (eType === rendTypes.CHECK_LIST && eObject.enabledFlag >= 0)
  {
    // Checkbox list.
    
    // Initializes data and chooses checkbox symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeListPreperationObject();
    chooseSymbols(settingsObj.useSymbols, symbolObj.checkPlain, symbolObj.checkSymbol, constructionData);
    
    // Write text.
    constructListHeaderText(eObject.elementTitle, constructionData);
    constructCheckListOptions(eObject, constructionData);
    constructListOtherItem(eObject, constructionData);
    
    // Format text.
    constructionData.textObject = createdParagraph.appendText(constructionData.textString);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setListBoldStatus(constructionData.textObject, constructionData.boldArray);
    setListOtherItalic(constructionData.textObject, constructionData.otherRange, settingsObj.markOtherOption);
  }
  else if (eType === rendTypes.RADIO_GRID && eObject.enabledFlag >= 0 && settingsObj.radioGridMode > 0)
  {
    // Radio button grid - Full.
    
    // Initializes data and chooses radio button symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeGridPreperationObject();
    chooseSymbols(settingsObj.useSymbols, symbolObj.radioPlain, symbolObj.radioSymbol, constructionData);

    // Writes heading and prepares grid cells.
    constructGridHeading(createdParagraph, eObject);
    prepareGridHeaderRow(eObject, constructionData);
    prepareRadioGridCellsSelection(eObject, constructionData);
    
    // Format grid table.
    constructionData.tableObject = documentBody.appendTable(constructionData.cellGrid);
    standardizeCellFormatting(constructionData.tableObject, constructionData.boldSelection);
    formatGridHeaderRow(constructionData.tableObject, 1);
    formatGridHeaderColumn(constructionData.tableObject);
  }
  else if (eType === rendTypes.RADIO_GRID && eObject.enabledFlag >= 0)
  {
    // Radio button grid - Lite.
    
    // Initializes data.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeGridPreperationObject();

    // Writes heading and prepares cells.
    constructGridHeading(createdParagraph, eObject);
    prepareRadioGridCellsLite(eObject, constructionData);

    // Format table.
    constructionData.tableObject = documentBody.appendTable(constructionData.cellGrid);
    standardizeCellFormatting(constructionData.tableObject, constructionData.boldSelection);
    formatGridHeaderRow(constructionData.tableObject, 0);
    formatGridHeaderColumn(constructionData.tableObject);

  }
  else if (eType === rendTypes.CHECK_GRID && eObject.enabledFlag >= 0)
  {
    // Checkbox grid.
    
    // Initializes data and chooses checkbox symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeGridPreperationObject();
    chooseSymbols(settingsObj.useSymbols, symbolObj.checkPlain, symbolObj.checkSymbol, constructionData);

    // Writes heading and prepares cells.
    constructGridHeading(createdParagraph, eObject);
    prepareGridHeaderRow(eObject, constructionData);
    prepareCheckGridCells(eObject, constructionData);

    // Format table.
    constructionData.tableObject = documentBody.appendTable(constructionData.cellGrid);
    standardizeCellFormatting(constructionData.tableObject, constructionData.boldSelection);
    formatGridHeaderRow(constructionData.tableObject, 1);
    formatGridHeaderColumn(constructionData.tableObject);
  }
  else if (eType === rendTypes.SECTION)
  {
    // Section header object.
    handleSectionRender(documentBody, eObject, settingsObj, breakOptsObj);
  }

}