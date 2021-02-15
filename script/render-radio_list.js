function constructRadioListOptions(parsedRadio, dataObject)
{
  var emptyText = dataObject.unfilledItem;
  var filledText = dataObject.filledItem;
  
  var optionIndex = 0;
  var currentOption = "";
  var currentSelectStart = -1;
  var currentSelectEnd = -1;
  var currentBold = [];

  for (optionIndex = 0; optionIndex < parsedRadio.optionList.length; optionIndex = optionIndex + 1)
  {
    currentOption = parsedRadio.optionList[optionIndex];
    dataObject.textString += "\r";
    currentSelectStart = dataObject.textString.length - 1;
    currentSelectEnd = -1;
    currentBold = [];

    if (optionIndex === parsedRadio.chosenOption)
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