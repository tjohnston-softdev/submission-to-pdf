function handleRadioGridRenderFull(docBody, parsedRadioGrid, renderSettings, symbolDefs)
{
  var cellFilledText = "";
  var cellEmptyText = "";
  var boldIndividualCells = null;
  
  var cellGrid = null;
  var tableObject = null;
  var tableConstructed = false;

  cellFilledText = symbolDefs.radioPlain.filled;
  cellEmptyText = symbolDefs.radioPlain.empty;
  boldIndividualCells = true;

  if (renderSettings.useSymbols === true)
  {
    cellFilledText = symbolDefs.radioSymbol.filled;
    cellEmptyText = symbolDefs.radioSymbol.empty;
    boldIndividualCells = false;
  }

  if (parsedRadioGrid.enabledFlag >= 0)
  {
    constructRadioGridHeaderText(docBody, parsedRadioGrid);
    cellGrid = [];
    prepareRadioGridCellsHeader(parsedRadioGrid, cellGrid);
    prepareRadioGridCellsSelection(parsedRadioGrid, cellFilledText, cellEmptyText, cellGrid);
    
    tableObject = docBody.appendTable(cellGrid);
    formatRadioGridCells(tableObject);
    formatRadioGridHeaderRow(tableObject, 1);
    formatRadioGridHeaderColumn(tableObject);

    tableConstructed = true;
  }

  if (tableConstructed === true && boldIndividualCells === true)
  {
    formatRadioGridInnerCells(tableObject);
  }
  
}


function handleRadioGridRenderLite(docBody, parsedRadioGrid)
{
  var cellGrid = null;
  var tableObject = null;
  var handleRes = false;

  if (parsedRadioGrid.enabledFlag >= 0)
  {
    constructRadioGridHeaderText(docBody, parsedRadioGrid);
    cellGrid = prepareRadioGridCellsLite(parsedRadioGrid);
    tableObject = docBody.appendTable(cellGrid);
    formatRadioGridCells(tableObject);
    formatRadioGridHeaderRow(tableObject, 1);
    handleRes = true;
  }

  return handleRes;
}


function constructRadioGridHeaderText(dBody, parsedRadGrid)
{
  var renderObject = dBody.appendParagraph("");
  var headingString = "\r" + parsedRadGrid.elementTitle + ":";
  var textCutoff = headingString.length - 1;
  var textObject = null;

  renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

  textObject = renderObject.appendText(headingString);
  textObject.setBold(0, textCutoff, false);
  textObject.setItalic(0, textCutoff, false);
  textObject.setBold(1, textCutoff, true);
  textObject.setFontSize(11);
}


function prepareRadioGridCellsLite(parsedRadGrid)
{
  var rowIndex = 0;
  var currentRowQuestion = "";
  var currentAnswerIndex = -1;
  var currentAnswerText = "";
  var currentGridRow = [];

  var headerRow = ["Question", "Answer"];
  var prepRes = [headerRow];

  for (rowIndex = 0; rowIndex < parsedRadGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    currentRowQuestion = parsedRadGrid.rowList[rowIndex];
    currentAnswerIndex = -1;
    currentAnswerText = "";
    currentGridRow = [];

    if (rowIndex >= 0 && rowIndex < parsedRadGrid.chosenItems.length)
    {
      currentAnswerIndex = parsedRadGrid.chosenItems[rowIndex];
    }

    if (currentAnswerIndex >= 0 && currentAnswerIndex < parsedRadGrid.columnList.length)
    {
      currentAnswerText = parsedRadGrid.columnList[currentAnswerIndex];
    }

    currentGridRow = [currentRowQuestion, currentAnswerText];
    prepRes.push(currentGridRow);
  }

  return prepRes;
}



function prepareRadioGridCellsHeader(parsedRadGrid, gObject)
{
  var headerRow = [];

  headerRow = parsedRadGrid.columnList.slice();
  headerRow.unshift("");
  gObject.push(headerRow);
}


function prepareRadioGridCellsSelection(parsedRadGrid, filledText, emptyText, gObject)
{
  var rowIndex = 0;
  var currentRowHeader = "";
  var currentRowObject = [];
  var currentSelection = -1;

  var columnIndex = 0;
  var currentSelection = -1;
  var currentCellText = "";

  for (rowIndex = 0; rowIndex < parsedRadGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    currentRowHeader = parsedRadGrid.rowList[rowIndex];
    currentRowObject = [currentRowHeader];
    currentSelection = -1;

    columnIndex = 0;
    currentCellText = "";

    if (rowIndex >= 0 && rowIndex < parsedRadGrid.chosenItems.length)
    {
      currentSelection = parsedRadGrid.chosenItems[rowIndex];
    }

    while (columnIndex >= 0 && columnIndex < parsedRadGrid.columnList.length)
    {
      currentCellText = emptyText;

      if (columnIndex === currentSelection)
      {
        currentCellText = filledText;
      }

      currentRowObject.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    gObject.push(currentRowObject);
  }

}



function formatRadioGridCells(tblObj)
{
  var rowIndex = 0;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;

  var cellIndex = 0;
  var cellCount = -1;
  var currentCell = null;
  var currentText = null;

  for (rowIndex = 0; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);

    cellIndex = 0;
    cellCount = currentRow.getNumCells();
    currentCell = null;
    currentText = null;

    while (cellIndex >= 0 && cellIndex < cellCount)
    {
      currentCell = currentRow.getCell(cellIndex);
      currentText = currentCell.editAsText();
      currentText.setBold(false);
      currentText.setItalic(false);
      currentText.setFontSize(11);

      cellIndex = cellIndex + 1;
    }
  }
}


function formatRadioGridHeaderRow(tblObj, startCell)
{
  var headerRowObject = tblObj.getRow(0);

  var cellIndex = startCell;
  var cellCount = headerRowObject.getNumCells();
  var currentCell = null;
  var currentText = null;

  for (cellIndex = startCell; cellIndex < cellCount; cellIndex = cellIndex + 1)
  {
    currentCell = headerRowObject.getCell(cellIndex);
    currentText = currentCell.editAsText();
    currentText.setBold(true);
  }
}


function formatRadioGridHeaderColumn(tblObj)
{
  var rowIndex = 1;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;
  var currentHeaderCell = null;
  var currentText = null;

  for (rowIndex = 1; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);
    currentHeaderCell = currentRow.getCell(0);
    currentText = currentHeaderCell.editAsText();
    currentText.setBold(true);
  }
}



function formatRadioGridInnerCells(tblObj)
{
  var rowIndex = 1;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;

  var cellIndex = -1;
  var cellCount = -1;
  var currentCell = null;
  var currentText = null;

  for (rowIndex = 1; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);

    cellIndex = 1;
    cellCount = currentRow.getNumCells();
    currentCell = null;
    currentText = null;

    while (cellIndex > 0 && cellIndex < cellCount)
    {
      currentCell = currentRow.getCell(cellIndex);
      currentText = currentCell.editAsText();
      currentText.setBold(true);
      cellIndex = cellIndex + 1;
    }
  }
}