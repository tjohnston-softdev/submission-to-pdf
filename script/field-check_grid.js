function handleCheckGridField(gridName, gridAnswers, gridElement, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.CHECK_GRID,
    elementTitle: gridName,
    rowList: [],
    columnList: [],
    boxStatus: [],
    canUse: false
  };

  fieldRes.rowList = gridElement.getRows();
  fieldRes.columnList = gridElement.getColumns();
  setCheckGridBoxStatus(gridAnswers, fieldRes)
  setCheckGridFinalAnswer(fieldRes, skipBlank);

  return fieldRes;
}


function setCheckGridBoxStatus(ansObj, resObj)
{
  var rowIndex = 0;
  var currentRowObject = null;
  var currentRowExists = false;
  var currentRowStatus = [];

  var columnIndex = 0;
  var currentColumnName = "";
  var currentBoxTicked = false;

  for (rowIndex = 0; rowIndex < resObj.rowList.length; rowIndex = rowIndex + 1)
  {
    currentRowObject = null;
    currentRowExists = false;
    currentRowStatus = [];

    columnIndex = 0;
    currentColumnName = "";
    currentBoxTicked = false;

    if (rowIndex >= 0 && rowIndex < ansObj.length)
    {
      currentRowObject = ansObj[rowIndex];
      currentRowExists = Array.isArray(currentRowObject);
    }

    while (columnIndex >= 0 && columnIndex < resObj.columnList.length)
    {
      currentColumnName = resObj.columnList[columnIndex];
      currentBoxTicked = false;

      if (currentRowExists === true)
      {
        currentBoxTicked = currentRowObject.includes(currentColumnName);
      }

      currentRowStatus.push(currentBoxTicked);
      columnIndex = columnIndex + 1;
    }

    resObj.boxStatus.push(currentRowStatus);
  }
}



function setCheckGridFinalAnswer(resObj, sBlank)
{
  var statusIndex = 0;
  var currentStatusRow = [];
  var currentTicksFound = false;

  var answerFound = false;


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
    resObj.canUse = true;
  }
  else if (sBlank === true)
  {
    resObj.canUse = false;
  }
  else
  {
    resObj.canUse = true;
  }

}