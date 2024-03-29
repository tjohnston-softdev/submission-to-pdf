// Stores common functions that are used when writing the output document.


// Creates text paragraph object.
function initializeParagraphObject(docBody)
{
  var paraRes = null;

  paraRes = docBody.appendParagraph("");
  paraRes.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  paraRes.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

  return paraRes;
}

// Applies standard styling to text elements.
function standardizeParagraphFormatting(txtObj, paraCutoff, styleObject)
{
  txtObj.setBold(0, paraCutoff, false);
  txtObj.setItalic(0, paraCutoff, false);
  txtObj.setFontSize(11);
  txtObj.setFontFamily(0, paraCutoff, styleObject.font);
  txtObj.setForegroundColor(0, paraCutoff, styleObject.colour);
}


// Construction data object for radio and check lists.
function initializeListPreperationObject()
{
  var intlRes = {};

  intlRes["textString"] = "";
  intlRes["boldArray"] = [];
  intlRes["symbolArray"] = [];
  intlRes["otherRange"] = null;
  intlRes["filledItem"] = "";
  intlRes["unfilledItem"] = "";
  intlRes["boldSelection"] = null;
  intlRes["textObject"] = null;

  return intlRes;
}


// Sets symbol text for list and grid data objects.
function chooseSymbols(listConstructData, listType, renderGlobal)
{
  var listSymbols = renderGlobal.symbols[listType];

  var symbolsEnabled = renderGlobal.mainSettings.useSymbols;
  var plainSymbols = listSymbols["plain"];
  var glyphSymbols = listSymbols["glyph"];
  
  // Plain text.
  listConstructData.filledItem = plainSymbols.filled;
  listConstructData.unfilledItem = plainSymbols.empty;
  listConstructData.boldSelection = true;

  if (symbolsEnabled === true)
  {
    // Glyphs.
    listConstructData.filledItem = glyphSymbols.filled;
    listConstructData.unfilledItem = glyphSymbols.empty;
    listConstructData.boldSelection = false;
  }
}



// Writes header text for list objects.
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



// Writes 'other' option text for lists.
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
    // Writes line break.
    listConstructData.textString += "\r";
    selectStart = listConstructData.textString.length - 1;

    // Writes selected symbol.
    listConstructData.textString += otherFilledText;
    selectEnd = listConstructData.textString.length - 1;

    // Saves symbol location
    otherSelectRange = [selectStart, selectEnd];

    // Writes tab separator between symbol and answer.
    listConstructData.textString += "\t";
    optionStart = listConstructData.textString.length - 1;

    // Writes answer text. 
    listConstructData.textString += parsedListObject.customText;
    optionEnd = listConstructData.textString.length - 1;

    // Indicates answer text index range.
    listConstructData.otherRange = [optionStart, optionEnd];
    customAdded = true;
  }

  if (customAdded === true && listConstructData.boldSelection === true)
  {
    // Include symbol with custom styling at bold weight.
    listConstructData.boldArray.push(otherSelectRange);
    listConstructData.symbolArray.push(otherSelectRange);
  }
  else if (customAdded === true)
  {
    // Include symbol with custom styling at normal weight.
    listConstructData.symbolArray.push(otherSelectRange);
  }

}


// Sets colour and font for symbols.
function setListSymbolStyling(txtObj, symbolArr, styleObject)
{
  var symbolIndex = 0;
  var currentSymbol = [];
  var currentStart = -1;
  var currentEnd = -1;

  // Loops marked index ranges.
  for (symbolIndex = 0; symbolIndex < symbolArr.length; symbolIndex = symbolIndex + 1)
  {
    // Reads current symbol range.
    currentSymbol = symbolArr[symbolIndex];
    currentStart = currentSymbol[0];
    currentEnd = currentSymbol[1];

    txtObj.setFontFamily(currentStart, currentEnd, styleObject.font);
    txtObj.setForegroundColor(currentStart, currentEnd, styleObject.colour);
  }
}


// Bolds list object text for header and selection.
function setListBoldStatus(txtObj, boldArr)
{
  var boldIndex = 0;
  var currentBold = [];
  var currentStart = -1;
  var currentEnd = -1;

  // Loops marked index ranges.
  for (boldIndex = 0; boldIndex < boldArr.length; boldIndex = boldIndex + 1)
  {
    // Reads current bold range.
    currentBold = boldArr[boldIndex];
    currentStart = currentBold[0];
    currentEnd = currentBold[1];

    txtObj.setBold(currentStart, currentEnd, true);
  }
}


// Sets other text to italics if applicable.
function setListOtherItalic(txtObj, otherObj, renderGlobal)
{
  var markToggle = renderGlobal.mainSettings.markOtherOption;
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


// Construction data object for grids.
function initializeGridPreperationObject()
{
  var intlRes = {};

  intlRes["filledItem"] = "";
  intlRes["unfilledItem"] = "";
  intlRes["boldSelection"] = null;
  intlRes["cellGrid"] = [];
  intlRes["tableObject"] = null;

  return intlRes;
}


// Writes header text for grid objects.
function constructGridHeading(headPara, parsedGridObject, styleObject)
{
  var headingString = "\r" + parsedGridObject.elementTitle + ":";
  var textCutoff = headingString.length - 1;
  var textObject = headPara.appendText(headingString);

  // Remove pre-existing bold and italic.
  textObject.setBold(0, textCutoff, false);
  textObject.setItalic(0, textCutoff, false);
  
  // Set font type and size.
  textObject.setFontSize(11);
  textObject.setFontFamily(0, textCutoff, styleObject.font);

  // Set colour and bold.
  textObject.setForegroundColor(0, textCutoff, styleObject.colour);
  textObject.setBold(1, textCutoff, true);
}


// Writes header row for grid cells.
function prepareGridHeaderRow(parsedGridObject, gridConstructionData)
{
  var headerRow = [];

  headerRow = parsedGridObject.columnList.slice();
  headerRow.unshift("");
  gridConstructionData.cellGrid.push(headerRow);
}


// Applies standard styling to grid cells.
function standardizeCellFormatting(tblObj, boldInner, styleObject)
{
  var rowIndex = 0;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;

  var colIndex = 0;
  var colCount = -1;
  var currentCell = null;
  var currentText = null;
  var currentBold = false;

  
  // Loops grid rows.
  for (rowIndex = 0; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);

    colIndex = 0;
    colCount = currentRow.getNumCells();
    currentCell = null;
    currentText = null;
    currentBold = false;

    // Loops row cells.
    while (colIndex >= 0 && colIndex < colCount)
    {
      // Reads current cell.
      currentCell = currentRow.getCell(colIndex);
      currentText = currentCell.editAsText();
      currentBold = false;

      // Checks whether inner cell should be bolded.
      if (rowIndex > 0 && colIndex > 0 && boldInner === true)
      {
        currentBold = true;
      }

      // Formats current cell.
      currentText.setFontFamily(styleObject.font);
      currentText.setForegroundColor(styleObject.colour);
      currentText.setBold(currentBold);
      currentText.setItalic(false);
      currentText.setFontSize(11);

      colIndex = colIndex + 1;
    }
  }
}



// Bolds grid header row cells.
function formatGridHeaderRow(tblObj, startCell, styleObject)
{
  var headerRow = tblObj.getRow(0);

  var cellIndex = startCell;
  var cellCount = headerRow.getNumCells();
  var currentCell = null;
  var currentText = null;

  // Loops header row cells from start point.
  for (cellIndex = startCell; cellIndex < cellCount; cellIndex = cellIndex + 1)
  {
    currentCell = headerRow.getCell(cellIndex);
    currentText = currentCell.editAsText();
    currentText.setFontFamily(styleObject.font);
    currentText.setForegroundColor(styleObject.colour);
    currentText.setBold(true);
  }
}

// Bolds grid header column cells.
function formatGridHeaderColumn(tblObj, styleObject)
{
  var rowIndex = 1;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;
  var currentCell = null;
  var currentText = null;

  // Loops from second row onwards.
  for (rowIndex = 1; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    // Reads and bolds current header column.
    currentRow = tblObj.getRow(rowIndex);
    currentCell = currentRow.getCell(0);
    currentText = currentCell.editAsText();
    currentText.setFontFamily(styleObject.font);
    currentText.setForegroundColor(styleObject.colour);
    currentText.setBold(true);
  }
}