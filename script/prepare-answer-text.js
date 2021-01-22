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