function initializeParagraphObject(docBody)
{
  var paraRes = null;

  paraRes = docBody.appendParagraph("");
  paraRes.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  paraRes.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

  return paraRes;
}


function standardizeParagraphFormatting(txtObj, paraCutoff)
{
  txtObj.setBold(0, paraCutoff, false);
  txtObj.setItalic(0, paraCutoff, false);
  txtObj.setFontSize(11);
}


function initializeListPreperationObject()
{
  var intlRes = {};

  intlRes["textString"] = "";
  intlRes["boldArray"] = [];
  intlRes["otherRange"] = null;
  intlRes["filledItem"] = "";
  intlRes["unfilledItem"] = "";
  intlRes["boldSelection"] = null;
  intlRes["textObject"] = null;

  return intlRes;
}


function chooseListSymbols(symbolsEnabled, plainSymbols, unicodeSymbols, listConstructData)
{
  listConstructData.filledItem = plainSymbols.filled;
  listConstructData.unfilledItem = plainSymbols.empty;
  listConstructData.boldSelection = true;

  if (symbolsEnabled === true)
  {
    listConstructData.filledItem = unicodeSymbols.filled;
    listConstructData.unfilledItem = unicodeSymbols.empty;
    listConstructData.boldSelection = false;
  }
}



function constructListHeaderText(listName, listConstructData)
{
  var localCutoff = -1;
  var headerIndex = [];
  
  listConstructData.textString += "\r";
  listConstructData.textString += listName;
  listConstructData.textString += ":";

  localCutoff = listConstructData.textString.length - 1;
  headerIndex = [1, localCutoff];
  listConstructData.boldArray.push(headerIndex);
}



function constructListOtherItem(parsedListObject, listConstructData)
{
  var otherFilledText = listConstructData.filledItem;

  var selectStart = -1;
  var selectEnd = -1;
  var optionStart = -1;
  var optionEnd = -1;
  var customAdded = false;

  var otherSelectRange = [];

  if (parsedListObject.customEnabled === true && parsedListObject.customText.length > 0)
  {
    listConstructData.textString += "\r";
    selectStart = listConstructData.textString.length - 1;

    listConstructData.textString += otherFilledText;
    selectEnd = listConstructData.textString.length - 1;

    listConstructData.textString += "\t";
    optionStart = listConstructData.textString.length - 1;

    listConstructData.textString += parsedListObject.customText;
    optionEnd = listConstructData.textString.length - 1;

    listConstructData.otherRange = [optionStart, optionEnd];
    customAdded = true;
  }

  if (customAdded === true && listConstructData.boldSelection === true)
  {
    otherSelectRange = [selectStart, selectEnd];
    listConstructData.boldSelection.push(otherSelectRange);
  }
}



function setListBoldStatus(txtObj, boldArr)
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


function setListOtherItalic(txtObj, otherObj, markToggle)
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