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