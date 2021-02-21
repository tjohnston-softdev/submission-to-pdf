/*
  When the end of a section on the form is reached, this file checks whether
  any questions have been answered for that section. If no answers have
  been given and 'ignoreEmptySections' is set to true, then the
  section elements will be ignored and will not be displayed in the
  output document.
*/


// Main function.
function handleParsedElementSectionBreak(secBreakObj, savedDataObj, settingsObj, endReached)
{
  var sectionFilled = false;
  var saveAllowed = false;
  var localSection = [];

  // Checks whether the finished section has been filled and should be saved.
  sectionFilled = checkElementSectionFilled(savedDataObj.section);
  saveAllowed = checkElementSectionSaveAllowed(sectionFilled, settingsObj.ignoreEmptySections);

  
  if (saveAllowed === true)
  {
    // Save section elements.
    localSection = savedDataObj.section;
    savedDataObj.overall = savedDataObj.overall.concat(localSection);
    addSectionBreakElement(secBreakObj, savedDataObj, endReached);
    savedDataObj.section = [];
  }
  else
  {
    // Ignore section elements.
    savedDataObj.section = [];
  }
}



// Checks whether completed section has been filled.
function checkElementSectionFilled(secArr)
{
  var elementIndex = 0;
  var currentElement = null;
  var filledRes = false;

  
  // Loops elements until non-empty answer found.
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



// Checks whether completed section should be saved.
function checkElementSectionSaveAllowed(sFilled, ignoreEmpty)
{
  var allowRes = false;

  if (sFilled === true)
  {
    // Answer found.
    allowRes = true;
  }
  else if (ignoreEmpty === true)
  {
    // Skip blank section.
    allowRes = false;
  }
  else
  {
    // Use blank section.
    allowRes = true;
  }

  return allowRes;
}



// Adds section header to full element list, unless end reached.
function addSectionBreakElement(sBrk, savedData, eReached)
{
  if (eReached !== true)
  {
    savedData.overall.push(sBrk);
  }
}