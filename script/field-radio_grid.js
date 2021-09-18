// Reads the answers for 'Multiple-choice grid' form items.


// Main function.
function handleRadioGridField(gridAnswers, gridElement, parseGlobal)
{
  var skipBlank = parseGlobal.mainSettings.skipBlankQuestions;
  
  var fieldRes =
  {
    elementType: parseGlobal.renderTypes.RADIO_GRID,
    elementTitle: "",
    rowList: [],
    columnList: [],
    chosenItems: [],
    enabledFlag: -1
  };

  var baseAnswers = [];


  fieldRes.rowList = gridElement.getRows();
  fieldRes.columnList = gridElement.getColumns();
  baseAnswers = prepareRadioGridBaseAnswers(gridAnswers, fieldRes.rowList.length);
  setRadioGridChosenItems(baseAnswers, fieldRes);
  setRadioGridFinalAnswer(fieldRes, skipBlank);

  return fieldRes;
}


// Prepares answer list.
function prepareRadioGridBaseAnswers(gAns, rCount)
{
  var baseRes = gAns.slice();

  // Adds null answer entries for missing rows.
  while (baseRes.length < rCount)
  {
    baseRes.push(null);
  }

  return baseRes;
}




// Reads chosen items for each row.
function setRadioGridChosenItems(answerList, resObj)
{
  var rowIndex = 0;
  var currentAnswer = null;
  var currentType = "";
  var currentString = false;
  var currentColumnIndex = -1;


  // Loop grid rows for answers.
  for (rowIndex = 0; rowIndex < answerList.length; rowIndex = rowIndex + 1)
  {
    
    // Reads current row answer.
    currentAnswer = answerList[rowIndex];
    currentType = typeof currentAnswer;
    currentString = false;
    currentColumnIndex = -1;

    // Check string type.
    if (currentAnswer !== undefined && currentAnswer !== null && currentType === "string")
    {
      currentString = true;
    }

    if (currentString === true && currentAnswer.length > 0)
    {
      // Valid answer given - Check if it is a matching column.
      currentColumnIndex = resObj.columnList.indexOf(currentAnswer);
    }

    
    // Add column index to 'chosen items' array.
    resObj.chosenItems.push(currentColumnIndex);
  }
}



// Verifies whether radio button grid has been answered.
function setRadioGridFinalAnswer(resObj, sBlank)
{
  var chosenItemIndex = 0;
  var currentColumnIndex = -1;
  var currentNumber = false;

  var answerFound = false;

  
  // Loops through chosen items array until valid answer found.
  while (chosenItemIndex >= 0 && chosenItemIndex < resObj.chosenItems.length && answerFound !== true)
  {
    // Reads column index for current row answer.
    currentColumnIndex = resObj.chosenItems[chosenItemIndex];
    currentNumber = Number.isInteger(currentColumnIndex);

    // Checks whether the answer refers to a matching column.
    if (currentNumber === true && currentColumnIndex >= 0 && currentColumnIndex < resObj.columnList.length)
    {
      answerFound = true;
    }

    chosenItemIndex = chosenItemIndex + 1;
  }


  if (answerFound === true)
  {
    // At least one row has been answered.
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