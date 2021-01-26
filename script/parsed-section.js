function handleParsedElementSectionBreak(secBreakObj, savedDataObj, settingsObj, endReached)
{
  var sectionFilled = checkElementSectionFilled(savedDataObj.section);
  var saveAllowed = checkElementSectionSaveAllowed(sectionFilled, settingsObj.ignoreEmptySections);
  var localSection = [];

  if (saveAllowed === true)
  {
    localSection = savedDataObj.section;
    savedDataObj.overall = savedDataObj.overall.concat(localSection);
    addSectionBreakElement(secBreakObj, savedDataObj, endReached);
    savedDataObj.section = [];
  }
  else
  {
    savedDataObj.section = [];
  }
}


function checkElementSectionFilled(secArr)
{
  var elementIndex = 0;
  var currentElement = null;
  var filledRes = false;

  while (elementIndex >= 0 && elementIndex < secArr.length && filledRes !== true)
  {
    currentElement = secArr[elementIndex];

    if (currentElement !== null && currentElement.enabledFlag > 0)
    {
      filledRes = true;
    }

    elementIndex = elementIndex + 1;
  }

  return filledRes;
}



function checkElementSectionSaveAllowed(sFilled, ignoreEmpty)
{
  var allowRes = false;

  if (sFilled === true)
  {
    allowRes = true;
  }
  else if (ignoreEmpty === true)
  {
    allowRes = false;
  }
  else
  {
    allowRes = true;
  }

  return allowRes;
}



function addSectionBreakElement(sBrk, savedData, eReached)
{
  if (eReached !== true)
  {
    savedData.overall.push(sBrk);
  }
}