/*
  Reads the answers for a 'Checkboxes' form item when they are set
  to be displayed as a full list with the selected options ticked.
  If 'displayCheckList' is not enabled, the ticked options will be
  read as a 'Paragraph' (field-text)
*/


// Main function.
function handleCheckListField(chkAnswers, chkElement, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.CHECK_LIST,
    elementTitle: "",
    checkboxList: [],
    chosenItems: [],
    customEnabled: false,
    customText: "",
    enabledFlag: -1
  };

  fieldRes.customEnabled = chkElement.hasOtherOption();
  readCheckListOptions(chkElement, fieldRes.checkboxList);
  setCheckListChosenItems(chkAnswers, fieldRes);
  setCheckListFinalAnswer(fieldRes, skipBlank);

  return fieldRes;
}


// Reads checklist options into an array.
function readCheckListOptions(eObj, cList)
{
  var checkboxArray = eObj.getChoices();

  var checkboxIndex = 0;
  var currentCheckboxObject = null;
  var currentCheckboxText = "";
  var currentUsed = false;

  // Loops choice objects.
  for (checkboxIndex = 0; checkboxIndex < checkboxArray.length; checkboxIndex = checkboxIndex + 1)
  {
    // Reads text from choice object.
    currentCheckboxObject = checkboxArray[checkboxIndex];
    currentCheckboxText = currentCheckboxObject.getValue();
    currentUsed = cList.includes(currentCheckboxText);

    // Adds choice text to list.
    if (currentUsed !== true)
    {
      cList.push(currentCheckboxText);
    }
  }
}


// Reads selected checklist options.
function setCheckListChosenItems(origAnswerList, resObj)
{
  var answerIndex = 0;
  var currentAnswerString = "";
  var currentMatchIndex = -1;
  var currentExists = false;
  var currentUsed = false;
  var currentAdded = false;

  // Loop string list of selected checkboxes.
  for (answerIndex = 0; answerIndex < origAnswerList.length; answerIndex = answerIndex + 1)
  {
    // Reads current text answer and checks whether it is a known list choice.
    currentAnswerString = origAnswerList[answerIndex];
    currentMatchIndex = resObj.checkboxList.indexOf(currentAnswerString);
    currentExists = false;
    currentUsed = false;
    currentAdded = false;

    if (currentMatchIndex >= 0 && currentMatchIndex < resObj.checkboxList.length)
    {
      // Choice found - Check if already selected.
      currentExists = true;
      currentUsed = resObj.chosenItems.includes(currentMatchIndex);
    }
    
    
    if (currentExists === true && currentUsed !== true)
    {
      // Predefined option selected.
      resObj.chosenItems.push(currentMatchIndex);
      currentAdded = true;
    }
    else if (resObj.customEnabled === true && resObj.customText.length <= 0)
    {
      // Other option selected - Save custom text.
      resObj.customText = currentAnswerString;
      currentAdded = true;
    }
    else
    {
      // Option not selected.
      currentAdded = false;
    }

  }

}


// Verifies whether the checklist has been answered.
function setCheckListFinalAnswer(resObj, sBlank)
{
  if (resObj.chosenItems.length > 0)
  {
    // Predefined options selected.
    resObj.enabledFlag = 1;
  }
  else if (resObj.customEnabled === true && resObj.customText.length > 0)
  {
    // Other option selected, not predefined.
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
    resObj.chosenItems = [];
    resObj.enabledFlag = 0;
  }
}