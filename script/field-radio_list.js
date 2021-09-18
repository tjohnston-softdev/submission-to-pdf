/*
  Reads the answers for 'Multiple choice' questions when they are set
  to be displayed as a full list with the selected option marked.
  If 'displayRadioList' is not enabled, the selected option will be
  read as a 'Short answer' (field-text)
*/


// Main function.
function handleRadioListField(rdoAnswer, rdoElement, parseGlobal)
{
  var skipBlank = parseGlobal.mainSettings.skipBlankQuestions;
  
  var fieldRes =
  {
    elementType: parseGlobal.renderTypes.RADIO_LIST,
    elementTitle: "",
    optionList: [],
    chosenOption: -1,
    customEnabled: false,
    customText: "",
    enabledFlag: -1
  };

  fieldRes.customEnabled = rdoElement.hasOtherOption();
  readRadioListOptions(rdoElement, fieldRes.optionList);
  setRadioChoice(rdoAnswer, skipBlank, fieldRes);

  return fieldRes;
}


// Reads radio list options into an array.
function readRadioListOptions(eObj, oList)
{
  var choiceArray = eObj.getChoices();

  var choiceIndex = 0;
  var currentChoiceObject = null;
  var currentChoiceText = "";
  var currentUsed = false;

  // Loops choice objects.
  for (choiceIndex = 0; choiceIndex < choiceArray.length; choiceIndex = choiceIndex + 1)
  {
    // Reads text from choice object.
    currentChoiceObject = choiceArray[choiceIndex];
    currentChoiceText = currentChoiceObject.getValue();
    currentUsed = oList.includes(currentChoiceText);

    // Adds choice text to list.
    if (currentUsed !== true)
    {
      oList.push(currentChoiceText);
    }

  }

}


// Reads selected radio list option.
function setRadioChoice(origAnswer, sBlank, resObj)
{
  // Finds index number of chosen option.
  var matchIndex = resObj.optionList.indexOf(origAnswer);

  if (matchIndex >= 0 && matchIndex < resObj.optionList.length)
  {
    // Known option chosen.
    resObj.chosenOption = matchIndex;
    resObj.enabledFlag = 1;
  }
  else if (origAnswer.length > 0 && resObj.customEnabled === true)
  {
    // Other option entered.
    resObj.customText = origAnswer;
    resObj.enabledFlag = 1;
  }
  else if (sBlank === true)
  {
    // Skip blank answer.
    resObj.customText = "";
    resObj.enabledFlag = -1;
  }
  else
  {
    // Include blank answer.
    resObj.chosenOption = -1;
    resObj.enabledFlag = 0;
  }
}