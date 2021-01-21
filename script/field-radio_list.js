function handleRadioListField(rdoTitle, rdoAnswer, rdoElement, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.RADIO_LIST,
    elementTitle: rdoTitle,
    optionList: [],
    chosenOption: -1,
    customEnabled: false,
    customText: ""
  };

  fieldRes.customEnabled = rdoElement.hasOtherOption();
  readRadioListOptions(rdoElement, fieldRes.optionList);
  setRadioChoice(rdoAnswer, fieldRes);

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


function setRadioChoice(origAnswer, resObj)
{
  var matchIndex = resObj.optionList.indexOf(origAnswer);

  if (matchIndex >= 0 && matchIndex < resObj.optionList.length)
  {
    resObj.choiceIndex = matchIndex;
  }
  else if (origAnswer.length > 0 && resObj.customEnabled === true)
  {
    resObj.customText = origAnswer;
  }
  else
  {
    resObj.customText = "";
  }
}