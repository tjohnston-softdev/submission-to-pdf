// Reads the answers for 'Tick box grid' form items.


// Main function.
function handleCheckGridField(gridAnswers, gridElement, parseGlobal)
{
  var skipBlank = parseGlobal.mainSettings.skipBlankQuestions;
  
  var fieldRes =
  {
    elementType: parseGlobal.renderTypes.CHECK_GRID,
    elementTitle: "",
    rowList: [],
    columnList: [],
    boxStatus: [],
    enabledFlag: -1
  };

  fieldRes.rowList = gridElement.getRows();
  fieldRes.columnList = gridElement.getColumns();
  setCheckGridBoxStatus(gridAnswers, fieldRes)
  setCheckGridFinalAnswer(fieldRes, skipBlank);

  return fieldRes;
}


// Reads the tick status for each cell on the grid.
function setCheckGridBoxStatus(ansObj, resObj)
{
  var rowIndex = 0;
  var currentRowObject = null;
  var currentRowExists = false;
  var currentRowStatus = [];

  var columnIndex = 0;
  var currentColumnName = "";
  var currentBoxTicked = false;

  
  // Loop each grid row.
  for (rowIndex = 0; rowIndex < resObj.rowList.length; rowIndex = rowIndex + 1)
  {
    currentRowObject = null;
    currentRowExists = false;
    currentRowStatus = [];

    columnIndex = 0;
    currentColumnName = "";
    currentBoxTicked = false;

    // Checks whether the grid row has a corresponding answer row.
    if (rowIndex >= 0 && rowIndex < ansObj.length)
    {
      currentRowObject = ansObj[rowIndex];
      currentRowExists = Array.isArray(currentRowObject);
    }

    // Loop each cell in current row.
    while (columnIndex >= 0 && columnIndex < resObj.columnList.length)
    {
      // Reads cell column. Unticked by default.
      currentColumnName = resObj.columnList[columnIndex];
      currentBoxTicked = false;

      
      // If the answer row has been found, set cell tick status accordingly.
      if (currentRowExists === true)
      {
        currentBoxTicked = currentRowObject.includes(currentColumnName);
      }

      
      // Adds answer to status row object.
      currentRowStatus.push(currentBoxTicked);
      columnIndex = columnIndex + 1;
    }

    
    // Adds row object to status grid.
    resObj.boxStatus.push(currentRowStatus);
  }
}


// Verifies whether the checkbox grid has been answered.
function setCheckGridFinalAnswer(resObj, sBlank)
{
  var statusIndex = 0;
  var currentStatusRow = [];
  var currentTicksFound = false;

  var answerFound = false;


  // Loops checkbox status grid rows until a tick has been found.
  while (statusIndex >= 0 && statusIndex < resObj.boxStatus.length && answerFound !== true)
  {
    currentStatusRow = resObj.boxStatus[statusIndex];
    currentTicksFound = currentStatusRow.includes(true);

    if (currentTicksFound === true)
    {
      answerFound = true;
    }

    statusIndex = statusIndex + 1;
  }


  if (answerFound === true)
  {
    // Use answer.
    resObj.enabledFlag = 1;
  }
  else if (sBlank === true)
  {
    // Skip blank answer.
    resObj.enabledFlag = -1;
  }
  else
  {
    // Include blank answer.
    resObj.enabledFlag = 0;
  }

}