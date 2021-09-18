/*
  This is the main script file.
  To execute the script, use the function:
  'runSubmissionToPDF'
*/


function runSubmissionToPDF()
{
  // Global variables.
  var globalsObject = {};
  
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
  globalsObject["nameOpts"] = getNameOptions();
  globalsObject["breakOpts"] = getSectionBreakOptions();
  globalsObject["mainSettings"] = getScriptSettings();
  globalsObject["colours"] = getTextColours();
  globalsObject["renderTypes"] = getRenderTypes();
  globalsObject["symbols"] = getSymbolDefinitions();

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
    currentResult = parseFormElement(currentNumber, elementCount, currentElement, prevSubmission, globalsObject);
    currentParseSuccessful = false;

    // IF structure controls parsed element.
    if (currentResult !== null && currentResult.elementType === globalsObject.renderTypes.SECTION)
    {
      // Section break - Decide whether to export current section elements.
      handleParsedElementSectionBreak(currentResult, parsedElements, globalsObject.mainSettings, false);
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
  handleParsedElementSectionBreak(null, parsedElements, globalsObject.mainSettings, true);

  // Parses form and submission data into elements for output document.
  overallHeadingElement = handleOverallHeadingField(formName, globalsObject.renderTypes);
  formDescriptionElement = handleFormDescriptionField(formDesc, globalsObject);
  submissionDataElement = handleSubmissionDataField(subCount, subTime, subEmail, globalsObject);
  endFormHeaderElement = handleEndFormHeaderField(globalsObject.renderTypes);
  
  // These elements will be placed at the beginning of the document.
  parsedElements.overall.unshift(overallHeadingElement, formDescriptionElement, submissionDataElement, endFormHeaderElement);

  // Creates output document file.
  outputName = decideSubmissionName(globalsObject, formName, subCount, subTime, parsedElements);
  outputDocumentObject = DocumentApp.create(outputName);
  outputContents = outputDocumentObject.getBody();


  // Loops through parsed elements.
  for (renderIndex = 0; renderIndex < parsedElements.overall.length; renderIndex = renderIndex + 1)
  {
    // Reads current element, and previous element type.
    currentRender = parsedElements.overall[renderIndex];
    currentPrevType = getPreviousElementRenderType(renderIndex, parsedElements.overall, globalsObject.renderTypes);

    // If parsed element exists, add to output document.
    if (currentRender !== null)
    {
      constructDocumentElement(currentRender, currentPrevType, outputContents, globalsObject);
    }
  }

  
  // Converts output document file to PDF.
  outputDocumentObject.saveAndClose();
  documentFileID = outputDocumentObject.getId();
  documentFileObject = DriveApp.getFileById(documentFileID);
  documentBinary = documentFileObject.getAs("application/pdf");
  pdfFileObject = DriveApp.createFile(documentBinary);

  // Moves PDF to target folder.
  targetFolderObject = DriveApp.getFolderById(globalsObject.mainSettings.outputFolderID);
  pdfFileObject.moveTo(targetFolderObject);

  // Deletes original document.
  documentFileObject.setTrashed(true);
}



// Reads current form element.
function parseFormElement(eNumber, eCount, elementObj, submissionObj, globalsObj)
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
    parseRes = handleTextField(givenAnswer, true, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Short answer", eNumber);
  }
  else if (eType === FormApp.ItemType.PARAGRAPH_TEXT)
  {
    // Paragraph.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, true, true, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Paragraph", eNumber);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE && globalsObj.mainSettings.displayRadioList === true)
  {
    // Multiple choice - Displayed as list.
    eCast = elementObj.asMultipleChoiceItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleRadioListField(givenAnswer, eCast, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Multiple choice list", eNumber);
  }
  else if (eType === FormApp.ItemType.MULTIPLE_CHOICE)
  {
    // Multiple choice - Displayed as text.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Multiple choice", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX && globalsObj.mainSettings.displayCheckList === true)
  {
    // Checkboxes - Displayed as list.
    eCast = elementObj.asCheckboxItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckListField(givenAnswer, eCast, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Checkbox list", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX)
  {
    // Checkboxes - Displayed as text. Selected answers comma-separated.
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    preparedText = givenAnswer.join();
    parseRes = handleTextField(preparedText, false, true, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Checkbox", eNumber);
  }
  else if (eType === FormApp.ItemType.LIST)
  {
    // Drop-down.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Drop-down", eNumber);
  }
  else if (eType === FormApp.ItemType.SCALE)
  {
    // Linear scale.
    eCast = elementObj.asScaleItem();
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareScaleText(givenAnswer, eCast);
    parseRes = handleTextField(preparedText, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Linear scale", eNumber);
  }
  else if (eType === FormApp.ItemType.GRID)
  {
    // Multiple-choice grid.
    eCast = elementObj.asGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleRadioGridField(givenAnswer, eCast, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Multiple-choice grid", eNumber);
  }
  else if (eType === FormApp.ItemType.CHECKBOX_GRID)
  {
    // Tick box grid.
    eCast = elementObj.asCheckboxGridItem();
    givenAnswer = getObjectAnswer(elementObj, submissionObj);
    parseRes = handleCheckGridField(givenAnswer, eCast, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Tick box grid", eNumber);
  }
  else if (eType === FormApp.ItemType.DATE)
  {
    // Date - Base.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Date", eNumber);
  }
  else if (eType === FormApp.ItemType.TIME)
  {
    // Time - Base.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Time", eNumber);
  }
  else if (eType === FormApp.ItemType.DURATION)
  {
    // Time - Duration.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    preparedText = prepareDurationText(givenAnswer);
    parseRes = handleTextField(preparedText, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Duration", eNumber);
  }
  else if (eType === FormApp.ItemType.DATETIME)
  {
    // Date - Include time.
    givenAnswer = getStringAnswer(elementObj, submissionObj);
    parseRes = handleTextField(givenAnswer, false, false, globalsObj.mainSettings.skipBlankQuestions, globalsObj.renderTypes);
    setParsedElementTitle(parseRes, eName, "Timestamp", eNumber);
  }
  else if (eType === FormApp.ItemType.PAGE_BREAK)
  {
    // Section - Active.
    eCast = elementObj.asPageBreakItem();
    parseRes = handleSectionField(eNumber, eCount, eName, eCast, globalsObj.mainSettings.includeSectionHeader, globalsObj.renderTypes);
  }
  else if (eType === FormApp.ItemType.SECTION_HEADER)
  {
    // Section - Depreciated.
    eCast = elementObj.asSectionHeaderItem();
    parseRes = handleSectionField(eNumber, eCount, eName, eCast, globalsObj.mainSettings.includeSectionHeader, globalsObj.renderTypes);
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
function constructDocumentElement(eObject, prevType, documentBody, globalsObj)
{
  var elementStyling = null;
  var createdParagraph = null;
  var constructionData = null;
  var eType = eObject.elementType;

  
  // IF structure builds element differently based on parse type.
  if (eType === globalsObj.renderTypes.OVERALL_HEADING)
  {
    // Document heading.
    handleOverallHeadingRender(documentBody, eObject);
  }
  else if (eType === globalsObj.renderTypes.FORM_DESCRIPTION && eObject.visible === true && eObject.descriptionText.length > 0)
  {
    // Form description.
    createdParagraph = initializeParagraphObject(documentBody);
    handleFormDescriptionRender(createdParagraph, eObject);
  }
  else if (eType === globalsObj.renderTypes.SUBMISSION_DATA && eObject.visible === true)
  {
    // Submission data (Number, Timestamp, E-Mail)
    createdParagraph = initializeParagraphObject(documentBody);
    handleSubmissionDataRender(createdParagraph, eObject);
  }
  else if (eType === globalsObj.renderTypes.END_FORM_HEADER)
  {
    // Separates header and content.
    documentBody.appendHorizontalRule();
  }
  else if (eType === globalsObj.renderTypes.TEXT && eObject.enabledFlag >= 0)
  {
    // Plain text.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = handleTextRender(createdParagraph, eObject, prevType, globalsObj.renderTypes);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setTextParagraphBoldHeader(constructionData);
  }
  else if (eType === globalsObj.renderTypes.RADIO_LIST && eObject.enabledFlag >= 0)
  {
    // Radio button list.
    
    // Initializes data and chooses radio button symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeListPreperationObject();
    chooseSymbols(globalsObj.mainSettings.useSymbols, globalsObj.symbols.radioPlain, globalsObj.symbols.radioSymbol, constructionData);
    
    // Write text.
    constructListHeaderText(eObject.elementTitle, constructionData);
    constructRadioListOptions(eObject, constructionData);
    constructListOtherItem(eObject, constructionData);
    
    // Format text.
    constructionData.textObject = createdParagraph.appendText(constructionData.textString);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setListBoldStatus(constructionData.textObject, constructionData.boldArray);
    setListOtherItalic(constructionData.textObject, constructionData.otherRange, globalsObj.mainSettings.markOtherOption);
  }
  else if (eType === globalsObj.renderTypes.CHECK_LIST && eObject.enabledFlag >= 0)
  {
    // Checkbox list.
    
    // Initializes data and chooses checkbox symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeListPreperationObject();
    chooseSymbols(globalsObj.mainSettings.useSymbols, globalsObj.symbols.checkPlain, globalsObj.symbols.checkSymbol, constructionData);
    
    // Write text.
    constructListHeaderText(eObject.elementTitle, constructionData);
    constructCheckListOptions(eObject, constructionData);
    constructListOtherItem(eObject, constructionData);
    
    // Format text.
    constructionData.textObject = createdParagraph.appendText(constructionData.textString);
    standardizeParagraphFormatting(constructionData.textObject, constructionData.textString.length - 1);
    setListBoldStatus(constructionData.textObject, constructionData.boldArray);
    setListOtherItalic(constructionData.textObject, constructionData.otherRange, globalsObj.mainSettings.markOtherOption);
  }
  else if (eType === globalsObj.renderTypes.RADIO_GRID && eObject.enabledFlag >= 0 && globalsObj.mainSettings.radioGridMode > 0)
  {
    // Radio button grid - Full.
    
    // Initializes data and chooses radio button symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeGridPreperationObject();
    chooseSymbols(globalsObj.mainSettings.useSymbols, globalsObj.symbols.radioPlain, globalsObj.symbols.radioSymbol, constructionData);

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
  else if (eType === globalsObj.renderTypes.RADIO_GRID && eObject.enabledFlag >= 0)
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
  else if (eType === globalsObj.renderTypes.CHECK_GRID && eObject.enabledFlag >= 0)
  {
    // Checkbox grid.
    
    // Initializes data and chooses checkbox symbols.
    createdParagraph = initializeParagraphObject(documentBody);
    constructionData = initializeGridPreperationObject();
    chooseSymbols(globalsObj.mainSettings.useSymbols, globalsObj.symbols.checkPlain, globalsObj.symbols.checkSymbol, constructionData);

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
  else if (eType === globalsObj.renderTypes.SECTION)
  {
    // Section header object.
    handleSectionRender(documentBody, eObject, globalsObj.mainSettings, globalsObj.breakOpts);
  }

}