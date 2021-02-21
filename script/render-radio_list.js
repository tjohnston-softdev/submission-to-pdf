// Writes parsed radio lists based on 'Multiple choice' form elements to the output document. (field-radio_list)


function constructRadioListOptions(parsedRadio, dataObject)
{
  var emptyText = dataObject.unfilledItem;
  var filledText = dataObject.filledItem;
  
  var optionIndex = 0;
  var currentOption = "";
  var currentSelectStart = -1;
  var currentSelectEnd = -1;
  var currentBold = [];

  // Loops list options.
  for (optionIndex = 0; optionIndex < parsedRadio.optionList.length; optionIndex = optionIndex + 1)
  {
    // Reads option text.
    currentOption = parsedRadio.optionList[optionIndex];
    dataObject.textString += "\r";

    // Begin symbol text.
    currentSelectStart = dataObject.textString.length - 1;
    currentSelectEnd = -1;
    currentBold = [];

    if (optionIndex === parsedRadio.chosenOption)
    {
      // Option selected.
      dataObject.textString += filledText;
    }
    else
    {
      // Option not selected.
      dataObject.textString += emptyText;
    }

    // End symbol text.
    currentSelectEnd = dataObject.textString.length - 1;

    // Writes answer text.
    dataObject.textString += "\t";
    dataObject.textString += currentOption;

    
    // Marks symbol text as bold if applicable.
    if (dataObject.boldSelection === true)
    {
      currentBold = [currentSelectStart, currentSelectEnd];
      dataObject.boldArray.push(currentBold);
    }

  }
}