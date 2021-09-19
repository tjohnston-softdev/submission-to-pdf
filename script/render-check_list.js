// Writes parsed check lists based on 'Checkboxes' form elements to the output document. (field-check_list)

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

  
  // Loops list options.
  for (optionIndex = 0; optionIndex < parsedCheck.checkboxList.length; optionIndex = optionIndex + 1)
  {
    // Reads option and whether it has been ticked.
    currentOption = parsedCheck.checkboxList[optionIndex];
    currentChosen = parsedCheck.chosenItems.includes(optionIndex);
    currentSelectStart = -1;
    currentSelectEnd = -1;
    currentSymbolLocation = [];
    dataObject.textString += "\r";

    // Begin symbol text.
    currentSelectStart = dataObject.textString.length - 1;

    if (currentChosen === true)
    {
      dataObject.textString += filledText;
    }
    else
    {
      dataObject.textString += emptyText;
    }

    // End symbol text.
    currentSelectEnd = dataObject.textString.length - 1;
    
    // Save symbol location.
    currentSymbolLocation = [currentSelectStart, currentSelectEnd];
    dataObject.symbolArray.push(currentSymbolLocation);

    // Writes answer text.
    dataObject.textString += "\t";
    dataObject.textString += currentOption;

    
    // Marks symbol text as bold if applicable.
    if (dataObject.boldSelection === true)
    {
      dataObject.boldArray.push(currentSymbolLocation);
    }

  }
}