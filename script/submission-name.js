function decideSubmissionName(settingsObj, nameObj, frmName, subNumber, sTimeObj, pElements, rTypesObj)
{
  var writtenTimestamp = writeTimestampFileName(sTimeObj);
  var modeFlag = settingsObj.documentNameMode;
  var textAns = "";
  var nameRes = "";

  if (modeFlag === nameObj.FORM_NAME_WITH_SUBMISSION_TIMESTAMP)
  {
    nameRes = incorporateFormName(frmName, writtenTimestamp);
  }
  else if (modeFlag === nameObj.FORM_NAME_WITH_SUBMISSION_NUMBER)
  {
    nameRes = incorporateFormName(frmName, subNumber);
  }
  else if (modeFlag === nameObj.FORM_NAME_WITH_FIRST_TEXT)
  {
    textAns = getFirstTextAnswer(pElements.overall, subNumber, rTypesObj);
    nameRes = incorporateFormName(frmName, textAns);
  }
  else if (modeFlag === nameObj.FIRST_TEXT)
  {
    nameRes = getFirstTextAnswer(pElements.overall, subNumber, rTypesObj);
  }
  else if (modeFlag === nameObj.TIMESTAMP)
  {
    nameRes = writtenTimestamp;
  }
  else
  {
    nameRes = subNumber;
  }

  return nameRes;
}



function writeTimestampFileName(tsObject)
{
  var datePart = [tsObject.year, tsObject.month, tsObject.day].join("");
  var timePart = [tsObject.hour, tsObject.minute, tsObject.second].join("");
  var writeRes = datePart + "-" + timePart;

  return writeRes;
}



function getFirstTextAnswer(eList, sNum, rTypes)
{
  var elementIndex = 0;
  var currentElement = null;
  var currentText = false;
  var currentEnabled = -1;
  var currentLength = -1;

  var textAnswerFound = false;
  var textRes = sNum;

  while (elementIndex >= 0 && elementIndex < eList.length && textAnswerFound !== true)
  {
    currentElement = eList[elementIndex];
    currentText = false;

    if (currentElement !== null && currentElement.elementType === rTypes.TEXT)
    {
      currentText = true;
      currentEnabled = currentElement.enabledFlag;
      currentLength = currentElement.elementAnswer.length;
    }

    if (currentText === true && currentEnabled > 0 && currentLength > 0)
    {
      textAnswerFound = true;
      textRes = currentElement.elementAnswer;
    }

    elementIndex = elementIndex + 1;
  }


  return textRes;
}



function incorporateFormName(nText, vText)
{
  var fullNameRes = "";

  if (nText.length > 0)
  {
    fullNameRes = nText + " ### " + vText;
  }
  else
  {
    fullNameRes = vText;
  }

  return fullNameRes;
}