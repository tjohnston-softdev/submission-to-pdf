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


function getObjectAnswer(eObj, subObj)
{
  var answerObject = subObj.getResponseForItem(eObj);
  var readRes = [];

  if (answerObject !== null)
  {
    readRes = answerObject.getResponse();
  }

  return readRes;
}




function prepareScaleText(scaleAnswer, scaleElement)
{
  var upperLimit = -1;
  var prepRes = "";

  if (scaleAnswer.length > 0)
  {
    upperLimit = scaleElement.getUpperBound();
    prepRes = scaleAnswer + " / " + upperLimit;
  }

  return prepRes;
}



function prepareDurationText(durationAnswer, fullFormat)
{
  var prepRes = "";

  if (durationAnswer.length > 0 && fullFormat === true)
  {
    prepRes = writeFullDurationFormat(durationAnswer);
  }
  else if (durationAnswer.length > 0)
  {
    prepRes = durationAnswer;
  }
  else
  {
    prepRes = "";
  }

  return prepRes;
}



function writeFullDurationFormat(origAns)
{
  var sanitizedText = origAns.replace(/:/g, "");

  var hourPart = sanitizedText.substr(0, 2);
  var minutePart = sanitizedText.substr(2, 2);
  var secondPart = sanitizedText.substr(4, 2);

  var hourNumber = Number(hourPart);
  var minuteNumber = Number(minutePart);
  var secondNumber = Number(secondPart);

  var writeRes = "";

  writeRes += hourNumber;
  writeRes += " Hours, ";

  writeRes += minutePart;
  writeRes += " Minutes, ";

  writeRes += secondPart;
  writeRes += " Seconds";

  return writeRes;
}




function setParsedElementTitle(parseObj, origTitle, typeDesc, orderNumber)
{
  if (origTitle.length > 0)
  {
    parseObj.elementTitle = origTitle;
  }
  else
  {
    parseObj.elementTitle = typeDesc + " " + orderNumber
  }
}