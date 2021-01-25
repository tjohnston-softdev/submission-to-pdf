function handleRadioListField(rdoTitle, rdoAnswer, rdoElement, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.RADIO_LIST,
    elementTitle: rdoTitle,
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


function readRadioListOptions(eObj, oList)
{
  var choiceArray = eObj.getChoices();

  var choiceIndex = 0;
  var currentChoiceObject = null;
  var currentChoiceText = "";
  var currentUsed = false;

  for (choiceIndex = 0; choiceIndex < choiceArray.length; choiceIndex = choiceIndex + 1)
  {
    currentChoiceObject = choiceArray[choiceIndex];
    currentChoiceText = currentChoiceObject.getValue();
    currentUsed = oList.includes(currentChoiceText);

    if (currentUsed !== true)
    {
      oList.push(currentChoiceText);
    }

  }

}


function setRadioChoice(origAnswer, sBlank, resObj)
{
  var matchIndex = resObj.optionList.indexOf(origAnswer);

  if (matchIndex >= 0 && matchIndex < resObj.optionList.length)
  {
    resObj.chosenOption = matchIndex;
    resObj.enabledFlag = 1;
  }
  else if (origAnswer.length > 0 && resObj.customEnabled === true)
  {
    resObj.customText = origAnswer;
    resObj.enabledFlag = 1;
  }
  else if (sBlank === true)
  {
    resObj.customText = "";
    resObj.enabledFlag = -1;
  }
  else
  {
    resObj.chosenOption = -1;
    resObj.enabledFlag = 0;
  }
}