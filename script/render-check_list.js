function constructCheckListOptions(parsedCheck, dataObject)
{
  var filledText = dataObject.filledItem;
  var emptyText = dataObject.unfilledItem;
  
  var optionIndex = 0;
  var currentOption = "";
  var currentChosen = false;
  var currentSelectStart = -1;
  var currentSelectEnd = -1;
  var currentBold = [];

  for (optionIndex = 0; optionIndex < parsedCheck.checkboxList.length; optionIndex = optionIndex + 1)
  {
    currentOption = parsedCheck.checkboxList[optionIndex];
    currentChosen = parsedCheck.chosenItems.includes(optionIndex);
    currentSelectStart = -1;
    currentSelectEnd = -1;
    currentBold = [];

    dataObject.textString += "\r";
    currentSelectStart = dataObject.textString.length - 1;

    if (currentChosen === true)
    {
      dataObject.textString += filledText;
    }
    else
    {
      dataObject.textString += emptyText;
    }

    currentSelectEnd = dataObject.textString.length - 1;

    dataObject.textString += "\t";
    dataObject.textString += currentOption;

    if (dataObject.boldSelection === true)
    {
      currentBold = [currentSelectStart, currentSelectEnd];
      dataObject.boldArray.push(currentBold);
    }

  }
}