function handleCheckListRenderFull(docBody, parsedCheckList, renderSettings, symbolDefs)
{
  var checkUnfilled = "";
  var checkFilled = "";
  var boldCheckSelectionText = null;

  var renderObject = null;
  var preperationObject = {textString: "", boldArray: [], otherRange: null};
  var textContents = null;
  var fullCutoff = -1;

  var handleRes = false;

  checkUnfilled = symbolDefs.checkPlain.unfilled;
  checkFilled = symbolDefs.checkPlain.filled;
  boldCheckSelectionText = true;

  if (renderSettings.useSymbols === true)
  {
    checkUnfilled = symbolDefs.checkSymbol.unfilled;
    checkFilled = symbolDefs.checkSymbol.filled;
    boldCheckSelectionText = false;
  }

  if (parsedCheckList.enabledFlag >= 0)
  {
    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    constructCheckListHeaderTextFull(parsedCheckList, preperationObject);
    constructCheckListOptions(parsedCheckList, preperationObject, checkFilled, checkUnfilled, boldCheckSelectionText);
    constructCheckListOtherFull(parsedCheckList, preperationObject, checkFilled, boldCheckSelectionText);

    textContents = renderObject.appendText(preperationObject.textString);
    fullCutoff = preperationObject.textString.length - 1;

    textContents.setBold(0, fullCutoff, false);
    textContents.setItalic(0, fullCutoff, false);
    setCheckListBoldStatus(textContents, preperationObject.boldArray);
    setCheckListOtherItalic(textContents, preperationObject.otherRange, renderSettings.markOtherOption);
    textContents.setFontSize(11);

    handleRes = true;
  }

  return handleRes;
}


function constructCheckListHeaderTextFull(parsedCheck, prepObject)
{
  var localCutoff = -1;
  var headerIndex = [];

  prepObject.textString += "\r";
  prepObject.textString += parsedCheck.elementTitle;
  prepObject.textString += ":";

  localCutoff = prepObject.textString.length - 1;
  headerIndex = [1, localCutoff];
  prepObject.boldArray.push(headerIndex);
}



function constructCheckListOptions(parsedCheck, prepObject, filledText, unfilledText, boldSelection)
{
  var optionIndex = 0;
  var currentOption = "";
  var currentChosen = false;
  var currentSelectStart = -1;
  var currentSelectEnd = -1;
  var currentBold = [];

  for (optionIndex = 0; optionIndex < parsedCheck.checkboxList.length; optionIndex = optionIndex + 1)
  {
    currentOption = parsedCheck.checkboxList[optionIndex];
    currentChosen = parsedCheck.chosenItems.includes(optionIndex);
    currentSelectStart = -1;
    currentSelectEnd = -1;
    currentBold = [];

    prepObject.textString += "\r";
    currentSelectStart = prepObject.textString.length - 1;

    if (currentChosen === true)
    {
      prepObject.textString += filledText;
    }
    else
    {
      prepObject.textString += unfilledText;
    }

    currentSelectEnd = prepObject.textString.length - 1;

    prepObject.textString += "\t";
    prepObject.textString += currentOption;

    if (boldSelection === true)
    {
      currentBold = [currentSelectStart, currentSelectEnd];
      prepObject.boldArray.push(currentBold);
    }

  }
}



function constructCheckListOtherFull(parsedCheck, prepObject, filledText, boldSelection)
{
  var selectStart = -1;
  var selectEnd = -1;
  var optionStart = -1;
  var optionEnd = -1;
  var selectRange = [];
  var customAdded = false;

  if (parsedCheck.customEnabled === true && parsedCheck.customText.length > 0)
  {
    prepObject.textString += "\r";
    selectStart = prepObject.textString.length - 1;

    prepObject.textString += filledText;
    selectEnd = prepObject.textString.length - 1;

    prepObject.textString += "\t";
    optionStart = prepObject.textString.length - 1;

    prepObject.textString += parsedCheck.customText;
    optionEnd = prepObject.textString.length - 1;

    prepObject.otherRange = [optionStart, optionEnd];
    customAdded = true;
  }

  if (customAdded === true && boldSelection === true)
  {
    selectRange = [selectStart, selectEnd];
    prepObject.boldArray.push(selectRange);
  }
}



function setCheckListBoldStatus(txtObj, boldArr)
{
  var boldIndex = 0;
  var currentBold = [];
  var currentStart = -1;
  var currentEnd = -1;

  for (boldIndex = 0; boldIndex < boldArr.length; boldIndex = boldIndex + 1)
  {
    currentBold = boldArr[boldIndex];
    currentStart = currentBold[0];
    currentEnd = currentBold[1];

    txtObj.setBold(currentStart, currentEnd, true);
  }
}



function setCheckListOtherItalic(txtObj, otherObj, markToggle)
{
  var otherDefined = Array.isArray(otherObj);
  var otherStart = -1;
  var otherEnd = -1;

  if (otherDefined === true && otherObj.length >= 2 && markToggle === true)
  {
    otherStart = otherObj[0];
    otherEnd = otherObj[1];
    txtObj.setItalic(otherStart, otherEnd, true);
  }
}