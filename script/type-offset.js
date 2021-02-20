function getPreviousElementRenderType(rendInd, parsedArr, rTypes)
{
  var currentSearchIndex = rendInd - 1;
  var currentPrev = null;
  var typeRes = null;

  while (currentSearchIndex >= 0 && currentSearchIndex < parsedArr.length && typeRes === null)
  {
    currentPrev = parsedArr[currentSearchIndex];

    if (currentPrev !== null && currentPrev.enabledFlag >= 0)
    {
      typeRes = currentPrev.elementType;
    }
    else if (currentPrev !== null && currentPrev.elementType === rTypes.SECTION && currentPrev.visible === true)
    {
      typeRes = rTypes.SECTION;
    }

    currentSearchIndex = currentSearchIndex - 1;
  }

  return typeRes;
}