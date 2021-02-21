// Used to retrieve the render type of the previously answered form element when constructing the output document.

function getPreviousElementRenderType(rendInd, parsedArr, rTypes)
{
  var currentSearchIndex = rendInd - 1;
  var currentPrev = null;
  var typeRes = null;

  // Loops through previously rendered elements until target found.
  while (currentSearchIndex >= 0 && currentSearchIndex < parsedArr.length && typeRes === null)
  {
    currentPrev = parsedArr[currentSearchIndex];

    if (currentPrev !== null && currentPrev.enabledFlag >= 0)
    {
      // Answered element.
      typeRes = currentPrev.elementType;
    }
    else if (currentPrev !== null && currentPrev.elementType === rTypes.SECTION && currentPrev.visible === true)
    {
      // Visible section.
      typeRes = rTypes.SECTION;
    }

    currentSearchIndex = currentSearchIndex - 1;
  }

  return typeRes;
}