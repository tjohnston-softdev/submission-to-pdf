function getPreviousElementRenderType(rendInd, parsedArr)
{
  var currentSearchIndex = rendInd - 1;
  var currentPreviousObject = null;
  var typeRes = null;

  while (currentSearchIndex >= 0 && currentSearchIndex < parsedArr.length && typeRes === null)
  {
    currentPreviousObject = parsedArr[currentSearchIndex];

    if (currentPreviousObject !== null && currentPreviousObject.enabledFlag >= 0)
    {
      typeRes = currentPreviousObject.elementType;
    }

    currentSearchIndex = currentSearchIndex - 1;
  }

  return typeRes;
}