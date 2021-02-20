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


function prepareRadioGridCellsSelection(parsedRadGrid, dataObject)
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
      currentCellText = dataObject.unfilledItem;

      if (columnIndex === currentSelection)
      {
        currentCellText = dataObject.filledItem;
      }

      currentRowObject.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    dataObject.cellGrid.push(currentRowObject);
  }

}