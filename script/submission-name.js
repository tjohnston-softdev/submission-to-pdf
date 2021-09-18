/*
  Decides the file name of the output document depending on the chosen option.
  Refer to 'config.md' for options.
*/


// Main function.
function decideSubmissionName(globalsObj, frmName, subNumber, sTimeObj, pElements)
{
  var writtenTimestamp = "";
  var modeFlag = null;
  var textAns = "";
  var nameRes = "";

  // Reads submission timestamp, and chosen name mode.
  writtenTimestamp = writeTimestampFileName(sTimeObj);
  modeFlag = globalsObj.mainSettings.documentNameMode;

  
  // IF structure decides name.
  if (modeFlag === globalsObj.nameOpts.FORM_NAME_WITH_SUBMISSION_TIMESTAMP)
  {
    nameRes = incorporateFormName(frmName, writtenTimestamp);
  }
  else if (modeFlag === globalsObj.nameOpts.FORM_NAME_WITH_SUBMISSION_NUMBER)
  {
    nameRes = incorporateFormName(frmName, subNumber);
  }
  else if (modeFlag === globalsObj.nameOpts.FORM_NAME_WITH_FIRST_TEXT)
  {
    textAns = getFirstTextAnswer(pElements.overall, subNumber, globalsObj.renderTypes);
    nameRes = incorporateFormName(frmName, textAns);
  }
  else if (modeFlag === globalsObj.nameOpts.FIRST_TEXT)
  {
    nameRes = getFirstTextAnswer(pElements.overall, subNumber, globalsObj.renderTypes);
  }
  else if (modeFlag === globalsObj.nameOpts.SUBMISSION_TIMESTAMP)
  {
    nameRes = writtenTimestamp;
  }
  else if (modeFlag >= 0)
  {
    // Submission number only (Default)
    nameRes = subNumber;
  }
  else
  {
    // Current timestamp (Debug)
    nameRes = writeCurrentTimeOfDay();
  }

  return nameRes;
}


// Reads current time of day for debug.
function writeCurrentTimeOfDay()
{
  var dateObj = new Date();
  var fullTimeString = dateObj.toTimeString();
  var extractRes = fullTimeString.substr(0, 8);
  return extractRes;
}


// Writes submission timestamp into a suitable file name.
function writeTimestampFileName(tsObject)
{
  var datePart = [tsObject.year, tsObject.month, tsObject.day].join("");
  var timePart = [tsObject.hour, tsObject.minute, tsObject.second].join("");
  var writeRes = datePart + "-" + timePart;

  return writeRes;
}



// Retrieves first 'Short answer' for document name.
function getFirstTextAnswer(eList, sNum, rTypes)
{
  var elementIndex = 0;
  var currentElement = null;

  var currentText = false;
  var currentEnabled = -1;
  var currentLength = -1;

  var currentAnswered = false;
  var currentBox = false;
  var currentBreak = false;

  var textAnswerFound = false;
  var textRes = sNum;

  
  // Loop parsed elements.
  while (elementIndex >= 0 && elementIndex < eList.length && textAnswerFound !== true)
  {
    currentElement = eList[elementIndex];

    currentText = false;
    currentEnabled = -1;
    currentLength = -1;

    currentAnswered = false;
    currentBox = false;
    currentBreak = false;

    // IF element is text.
    if (currentElement !== null && currentElement.elementType === rTypes.TEXT)
    {
      currentText = true;
      currentEnabled = currentElement.enabledFlag;
      currentLength = currentElement.elementAnswer.length;
    }

    // IF text element has been answered.
    if (currentText === true && currentEnabled > 0 && currentLength > 0)
    {
      currentAnswered = true;
      currentBox = currentElement.textbox;
      currentBreak = currentElement.titleBreak;
    }

    // IF text element corresponds to 'Short answer'.
    if (currentAnswered === true && currentBox === true && currentBreak !== true)
    {
      // Answer found.
      textAnswerFound = true;
      textRes = currentElement.elementAnswer;
    }

    elementIndex = elementIndex + 1;
  }


  return textRes;
}


// Writes document names involving the form title.
function incorporateFormName(nText, vText)
{
  var fullNameRes = "";

  if (nText.length > 0)
  {
    // Use form name.
    fullNameRes = nText + " ### " + vText;
  }
  else
  {
    // Use value only.
    fullNameRes = vText;
  }

  return fullNameRes;
}