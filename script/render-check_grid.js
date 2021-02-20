function prepareCheckGridCells(parsedChkGrid, dataObject)
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
      currentCellText = dataObject.unfilledItem;

      if (columnIndex >= 0 && columnIndex < currentStatusRow.length)
      {
        currentStatusValue = currentStatusRow[columnIndex];
      }

      if (currentStatusValue === true)
      {
        currentCellText = dataObject.filledItem;
      }

      currentTableRow.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    dataObject.cellGrid.push(currentTableRow);
  }
}
