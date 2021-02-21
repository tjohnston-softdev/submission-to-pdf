/*
  Writes parsed radio grids based on 'Multiple-choice grid' form elements
  to the output document. (field-radio_grid). These items can be displayed
  as either a full grid, or with selected answers only.
*/


// Lite.
function prepareRadioGridCellsLite(parsedRadGrid, dataObject)
{
  var rowIndex = 0;
  var currentRowQuestion = "";
  var currentAnswerIndex = -1;
  var currentAnswerText = "";
  var currentGridRow = [];
  var headerRow = [];

  
  // Adds header row.
  headerRow = ["Question", "Answer"];
  dataObject.cellGrid.push(headerRow);

  
  // For each radio grid question row.
  for (rowIndex = 0; rowIndex < parsedRadGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    currentRowQuestion = parsedRadGrid.rowList[rowIndex];
    currentAnswerIndex = -1;
    currentAnswerText = "";
    currentGridRow = [];

    if (rowIndex >= 0 && rowIndex < parsedRadGrid.chosenItems.length)
    {
      // Reads answer column index if given.
      currentAnswerIndex = parsedRadGrid.chosenItems[rowIndex];
    }

    if (currentAnswerIndex >= 0 && currentAnswerIndex < parsedRadGrid.columnList.length)
    {
      // Reads answered column.
      currentAnswerText = parsedRadGrid.columnList[currentAnswerIndex];
    }

    // Adds current answer row to grid.
    currentGridRow = [currentRowQuestion, currentAnswerText];
    dataObject.cellGrid.push(currentGridRow);
  }
}



// Full.
function prepareRadioGridCellsSelection(parsedRadGrid, dataObject)
{
  var rowIndex = 0;
  var currentRowHeader = "";
  var currentRowObject = [];
  var currentSelection = -1;

  var columnIndex = 0;
  var currentSelection = -1;
  var currentCellText = "";

  
  // Loops radio grid rows.
  for (rowIndex = 0; rowIndex < parsedRadGrid.rowList.length; rowIndex = rowIndex + 1)
  {
    // Reads current row name and initializes document table row.
    currentRowHeader = parsedRadGrid.rowList[rowIndex];
    currentRowObject = [currentRowHeader];
    currentSelection = -1;

    columnIndex = 0;
    currentCellText = "";

    
    // Reads current row answer.
    if (rowIndex >= 0 && rowIndex < parsedRadGrid.chosenItems.length)
    {
      currentSelection = parsedRadGrid.chosenItems[rowIndex];
    }

    
    // Loops row cells.
    while (columnIndex >= 0 && columnIndex < parsedRadGrid.columnList.length)
    {
      currentCellText = dataObject.unfilledItem;

      if (columnIndex === currentSelection)
      {
        // Answer found.
        currentCellText = dataObject.filledItem;
      }

      // Add cell.
      currentRowObject.push(currentCellText);
      columnIndex = columnIndex + 1;
    }

    
    // Adds prepared row to document table.
    dataObject.cellGrid.push(currentRowObject);
  }

}