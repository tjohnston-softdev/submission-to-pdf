/*
  Writes parsed check grids based on 'Tickbox grid' form elements
  to the output document (field-check_grid). Unlike their radio
  button counterparts, they are always displayed as the complete
  grid with no "LITE" option.
*/


function prepareCheckGridCells(parsedChkGrid, dataObject)
{
  var rowIndex = 0;
  var currentHeader = "";
  var currentTableRow = [];
  var currentStatusRow = [];

  var columnIndex = 0;
  var currentStatusValue = false;
  var currentCellText = "";

  // Loops checkbox grid object rows.
  for (rowIndex = 0; rowIndex < parsedChkGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    // Reads current row name and initializes grid row.
    currentHeader = parsedChkGrid.rowList[rowIndex];
    currentTableRow = [currentHeader];
    currentStatusRow = [];

    columnIndex = 0;
    currentStatusValue = false;
    currentCellText = "";

    // Reads current tick status row.
    if (rowIndex >= 0 && rowIndex < parsedChkGrid.boxStatus.length)
    {
      currentStatusRow = parsedChkGrid.boxStatus[rowIndex];
    }

    // Loops status cells.
    while (columnIndex >= 0 && columnIndex < parsedChkGrid.columnList.length)
    {
      currentStatusValue = false;
      currentCellText = dataObject.unfilledItem;

      // If grid column exists, read corresponding tick status for cell.
      if (columnIndex >= 0 && columnIndex < currentStatusRow.length)
      {
        currentStatusValue = currentStatusRow[columnIndex];
      }

      if (currentStatusValue === true)
      {
        // Box ticked.
        currentCellText = dataObject.filledItem;
      }

      // Add cell.
      currentTableRow.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    // Adds prepared row to document table.
    dataObject.cellGrid.push(currentTableRow);
  }
}
