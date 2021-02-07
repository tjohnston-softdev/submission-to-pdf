function handleRadioListRender(docBody, parsedRadioList, renderSettings, symbolDefs)
{
  var radioEmpty = "";
  var radioFilled = "";
  var boldRadioSelectionText = null;

  var renderObject = null;
  var preperationObject = {textString: "", boldArray: [], otherRange: null}
  var textContents = null;
  var fullCutoff = -1;

  var handleRes = false;
  
  radioEmpty = symbolDefs.radioPlain.empty;
  radioFilled = symbolDefs.radioPlain.filled;
  boldRadioSelectionText = true;

  if (renderSettings.useSymbols === true)
  {
    radioEmpty = symbolDefs.radioSymbol.empty;
    radioFilled = symbolDefs.radioSymbol.filled;
    boldRadioSelectionText = false;
  }

  if (parsedRadioList.enabledFlag >= 0)
  {
    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    constructRadioListHeaderText(parsedRadioList, preperationObject);
    constructRadioListOptions(parsedRadioList, preperationObject, radioEmpty, radioFilled, boldRadioSelectionText);
    constructRadioListOther(parsedRadioList, preperationObject, radioFilled, boldRadioSelectionText);

    textContents = renderObject.appendText(preperationObject.textString);
    fullCutoff = preperationObject.textString.length - 1;

    textContents.setBold(0, fullCutoff, false);
    textContents.setItalic(0, fullCutoff, false);
    setRadioListBoldStatus(textContents, preperationObject.boldArray);
    setRadioListOtherItalic(textContents, preperationObject.otherRange, renderSettings.markOtherOption);
    textContents.setFontSize(11);

    handleRes = true;
  }

  return handleRes;
}


function constructRadioListHeaderText(parsedRadio, prepObject)
{
  var localCutoff = -1;
  var headerIndex = [];
  
  prepObject.textString += "\r";
  prepObject.textString += parsedRadio.elementTitle;
  prepObject.textString += ":";

  localCutoff = prepObject.textString.length - 1;
  headerIndex = [1, localCutoff];
  prepObject.boldArray.push(headerIndex);
}



function constructRadioListOptions(parsedRadio, prepObject, emptyText, filledText, boldSelection)
{
  var optionIndex = 0;
  var currentOption = "";
  var currentSelectStart = -1;
  var currentSelectEnd = -1;
  var currentBold = [];

  for (optionIndex = 0; optionIndex < parsedRadio.optionList.length; optionIndex = optionIndex + 1)
  {
    currentOption = parsedRadio.optionList[optionIndex];
    prepObject.textString += "\r";
    currentSelectStart = prepObject.textString.length - 1;
    currentSelectEnd = -1;
    currentBold = [];

    if (optionIndex === parsedRadio.chosenOption)
    {
      prepObject.textString += filledText;
    }
    else
    {
      prepObject.textString += emptyText;
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



function constructRadioListOther(parsedRadio, prepObject, filledText, boldSelection)
{
  var selectStart = -1;
  var selectEnd = -1;
  var optionStart = -1;
  var optionEnd = -1;
  var selectRange = [];
  var customAdded = false;

  if (parsedRadio.customEnabled === true && parsedRadio.customText.length > 0)
  {
    prepObject.textString += "\r";
    selectStart = prepObject.textString.length - 1;

    prepObject.textString += filledText;
    selectEnd = prepObject.textString.length - 1;

    prepObject.textString += "\t";
    optionStart = prepObject.textString.length - 1;

    prepObject.textString += parsedRadio.customText;
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



function setRadioListBoldStatus(txtObj, boldArr)
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


function setRadioListOtherItalic(txtObj, otherObj, markToggle)
{
  var otherDefined = Array.isArray(otherObj);
  var otherBegin = -1;
  var otherCutoff = -1;

  if (otherDefined === true && otherObj.length >= 2 && markToggle === true)
  {
    otherBegin = otherObj[0];
    otherCutoff = otherObj[1];
    txtObj.setItalic(otherBegin, otherCutoff, true);
  }
}