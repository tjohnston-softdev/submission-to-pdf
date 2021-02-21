/*
  This file is used to:
    * Retrieve submitted answers for a corresponding form element.
    * Format 'Linear scale' and 'Time / Duration' answers into readable text.
    * Prepare form element names.
*/


// Retrieves answer as string from most form elements.
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


// Retrieves answer as object from grid elements.
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



// Writes 'Linear scale' answer text.
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


// Writes 'Time / Duration' answer text.
function prepareDurationText(durationAnswer)
{
  var prepRes = "";

  if (durationAnswer.length > 0)
  {
    prepRes = durationAnswer;

    prepRes = prepRes.replace(":", "h ");
    prepRes = prepRes.replace(":", "m ");
    prepRes = prepRes + "s";
  }

  return prepRes;
}




// Adds title to parsed element object.
function setParsedElementTitle(parseObj, origTitle, typeDesc, orderNumber)
{
  if (origTitle.length > 0)
  {
    // Use given title.
    parseObj.elementTitle = origTitle;
  }
  else
  {
    // Use default title.
    parseObj.elementTitle = typeDesc + " " + orderNumber
  }
}