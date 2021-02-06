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
    formatRadioGridHeaderLite(tableObject);
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


function formatRadioGridHeaderLite(tblObj)
{
  var headerRowObject = tblObj.getRow(0);

  var cellIndex = 0;
  var cellCount = headerRowObject.getNumCells();
  var currentCell = null;
  var currentText = null;

  for (cellIndex = 0; cellIndex < cellCount; cellIndex = cellIndex + 1)
  {
    currentCell = headerRowObject.getCell(cellIndex);
    currentText = currentCell.editAsText();
    currentText.setBold(true);
  }
}