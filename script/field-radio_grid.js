function handleRadioGridField(gridName, gridAnswers, gridElement, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.RADIO_GRID,
    elementTitle: gridName,
    rowList: [],
    columnList: [],
    chosenItems: [],
    canUse: false
  };

  var baseAnswers = [];


  fieldRes.rowList = gridElement.getRows();
  fieldRes.columnList = gridElement.getColumns();
  baseAnswers = prepareRadioGridBaseAnswers(gridAnswers, fieldRes.rowList.length);
  setRadioGridChosenItems(baseAnswers, fieldRes);
  setRadioGridFinalAnswer(fieldRes);

  return fieldRes;
}



function prepareRadioGridBaseAnswers(gAns, rCount)
{
  var baseRes = gAns.slice();

  while (baseRes.length < rCount)
  {
    baseRes.push(null);
  }

  return baseRes;
}




function setRadioGridChosenItems(answerList, resObj)
{
  var rowIndex = 0;
  var currentAnswer = null;
  var currentType = "";
  var currentString = false;
  var currentColumnIndex = -1;


  for (rowIndex = 0; rowIndex < answerList.length; rowIndex = rowIndex + 1)
  {
    currentAnswer = answerList[rowIndex];
    currentType = typeof currentAnswer;
    currentString = false;
    currentColumnIndex = -1;

    if (currentAnswer !== undefined && currentAnswer !== null && currentType === "string")
    {
      currentString = true;
    }

    if (currentString === true && currentAnswer.length > 0)
    {
      currentColumnIndex = resObj.columnList.indexOf(currentAnswer);
    }

    resObj.chosenItems.push(currentColumnIndex);
  }
}



function setRadioGridFinalAnswer(resObj)
{
  var chosenItemIndex = 0;
  var currentColumnIndex = -1;
  var currentNumber = false;

  var answerFound = false;

  while (chosenItemIndex >= 0 && chosenItemIndex < resObj.chosenItems.length && answerFound !== true)
  {
    currentColumnIndex = resObj.chosenItems[chosenItemIndex];
    currentNumber = Number.isInteger(currentColumnIndex);

    if (currentNumber === true && currentColumnIndex >= 0 && currentColumnIndex < resObj.columnList.length)
    {
      answerFound = true;
    }

    chosenItemIndex = chosenItemIndex + 1;
  }


  resObj.canUse = answerFound;
}