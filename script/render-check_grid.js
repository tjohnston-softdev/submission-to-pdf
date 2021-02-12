function handleCheckGridRender(docBody, parsedCheckGrid, renderSettings, symbolDefs)
{
  var cellFilledText = "";
  var cellEmptyText = "";
  var boldIndividualCells = null;

  var cellGrid = null;
  var tableObject = null;
  var tableConstructed = false;

  cellFilledText = symbolDefs.checkPlain.filled;
  cellEmptyText = symbolDefs.checkPlain.empty;
  boldIndividualCells = true;

  if (renderSettings.useSymbols === true)
  {
    cellFilledText = symbolDefs.checkSymbol.filled;
    cellEmptyText = symbolDefs.checkSymbol.empty;
    boldIndividualCells = false;
  }

  if (parsedCheckGrid.enabledFlag >= 0)
  {
    constructCheckGridHeaderText(docBody, parsedCheckGrid);
    cellGrid = [];
    prepareCheckGridHeaderRow(parsedCheckGrid, cellGrid);
    prepareCheckGridCells(parsedCheckGrid, cellFilledText, cellEmptyText, cellGrid);

    tableObject = docBody.appendTable(cellGrid);
    formatCheckGridCells(tableObject);
    formatCheckGridHeaderRow(tableObject);
    formatCheckGridHeaderColumns(tableObject);

    tableConstructed = true;
  }

  if (tableConstructed === true && boldIndividualCells === true)
  {
    formatCheckGridInnerCells(tableObject);
  }
  
}


function constructCheckGridHeaderText(dBody, parsedChkGrid)
{
  var renderObject = dBody.appendParagraph("");
  var headingString = "\r" + parsedChkGrid.elementTitle + ":";
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


function prepareCheckGridHeaderRow(parsedChkGrid, gObject)
{
  var headerRow = [];

  headerRow = parsedChkGrid.columnList.slice();
  headerRow.unshift("");
  gObject.push(headerRow);
}


function prepareCheckGridCells(parsedChkGrid, filledText, emptyText, gObject)
{
  var rowIndex = 0;
  var currentHeader = "";
  var currentTableRow = [];
  var currentStatusRow = [];

  var columnIndex = 0;
  var currentStatusValue = false;
  var currentCellText = "";

  for (rowIndex = 0; rowIndex < parsedChkGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    currentHeader = parsedChkGrid.rowList[rowIndex];
    currentTableRow = [currentHeader];
    currentStatusRow = [];

    columnIndex = 0;
    currentStatusValue = false;
    currentCellText = "";

    if (rowIndex >= 0 && rowIndex < parsedChkGrid.boxStatus.length)
    {
      currentStatusRow = parsedChkGrid.boxStatus[rowIndex];
    }

    while (columnIndex >= 0 && columnIndex < parsedChkGrid.columnList.length)
    {
      currentStatusValue = false;
      currentCellText = emptyText;

      if (columnIndex >= 0 && columnIndex < currentStatusRow.length)
      {
        currentStatusValue = currentStatusRow[columnIndex];
      }

      if (currentStatusValue === true)
      {
        currentCellText = filledText;
      }

      currentTableRow.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    gObject.push(currentTableRow);
  }
}



function formatCheckGridCells(tblObj)
{
  var rowIndex = 0;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;

  var colIndex = 0;
  var colCount = -1;
  var currentCell = null;
  var currentText = null;

  for (rowIndex = 0; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);

    colIndex = 0;
    colCount = currentRow.getNumCells();
    currentCell = null;
    currentText = null;

    while (colIndex >= 0 && colIndex < colCount)
    {
      currentCell = currentRow.getCell(colIndex);
      currentText = currentCell.editAsText();

      currentText.setBold(false);
      currentText.setItalic(false);
      currentText.setFontSize(11);

      colIndex = colIndex + 1;
    }
  }
}


function formatCheckGridHeaderRow(tblObj)
{
  var headerRow = tblObj.getRow(0);

  var colIndex = 1;
  var colCount = headerRow.getNumCells();
  var currentCell = null;
  var currentText = null;

  for (colIndex = 1; colIndex < colCount; colIndex = colIndex + 1)
  {
    currentCell = headerRow.getCell(colIndex);
    currentText = currentCell.editAsText();
    currentText.setBold(true);
  }
}


function formatCheckGridHeaderColumns(tblObj)
{
  var rowIndex = 1;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;
  var currentHeaderCell = null;
  var currentHeaderText = null;

  for (rowIndex = 1; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);
    currentHeaderCell = currentRow.getCell(0);
    currentHeaderText = currentHeaderCell.editAsText();
    currentHeaderText.setBold(true);
  }
}


function formatCheckGridInnerCells(tblObj)
{
  var rowIndex = 1;
  var rowCount = tblObj.getNumRows();
  var currentRow = null;

  var colIndex = 1;
  var colCount = -1;
  var currentCell = null;
  var currentText = null;

  for (rowIndex = 1; rowIndex < rowCount; rowIndex = rowIndex + 1)
  {
    currentRow = tblObj.getRow(rowIndex);

    colIndex = 1;
    colCount = currentRow.getNumCells();
    currentCell = null;
    currentText = null;

    while (colIndex > 0 && colIndex < colCount)
    {
      currentCell = currentRow.getCell(colIndex);
      currentText = currentCell.editAsText();
      currentText.setBold(true);

      colIndex = colIndex + 1;
    }
  }
}