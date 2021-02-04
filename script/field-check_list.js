function handleCheckListField(chkTitle, chkAnswers, chkElement, skipBlank, dispFull, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.CHECK_LIST,
    elementTitle: chkTitle,
    displayFull: dispFull,
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



function readCheckListOptions(eObj, cList)
{
  var checkboxArray = eObj.getChoices();

  var checkboxIndex = 0;
  var currentCheckboxObject = null;
  var currentCheckboxText = "";
  var currentUsed = false;

  for (checkboxIndex = 0; checkboxIndex < checkboxArray.length; checkboxIndex = checkboxIndex + 1)
  {
    currentCheckboxObject = checkboxArray[checkboxIndex];
    currentCheckboxText = currentCheckboxObject.getValue();
    currentUsed = cList.includes(currentCheckboxText);

    if (currentUsed !== true)
    {
      cList.push(currentCheckboxText);
    }
  }
}


function setCheckListChosenItems(origAnswerList, resObj)
{
  var answerIndex = 0;
  var currentAnswerString = "";
  var currentMatchIndex = -1;
  var currentExists = false;
  var currentUsed = false;
  var currentAdded = false;

  for (answerIndex = 0; answerIndex < origAnswerList.length; answerIndex = answerIndex + 1)
  {
    currentAnswerString = origAnswerList[answerIndex];
    currentMatchIndex = resObj.checkboxList.indexOf(currentAnswerString);
    currentExists = false;
    currentUsed = false;
    currentAdded = false;

    if (currentMatchIndex >= 0 && currentMatchIndex < resObj.checkboxList.length)
    {
      currentExists = true;
      currentUsed = resObj.chosenItems.includes(currentMatchIndex);
    }
    
    if (currentExists === true && currentUsed !== true)
    {
      resObj.chosenItems.push(currentMatchIndex);
      currentAdded = true;
    }
    else if (resObj.customEnabled === true && resObj.customText.length <= 0)
    {
      resObj.customText = currentAnswerString;
      currentAdded = true;
    }
    else
    {
      currentAdded = false;
    }

  }

}



function setCheckListFinalAnswer(resObj, sBlank)
{
  if (resObj.chosenItems.length > 0)
  {
    resObj.enabledFlag = 1;
  }
  else if (resObj.customEnabled === true && resObj.customText.length > 0)
  {
    resObj.enabledFlag = 1;
  }
  else if (sBlank === true)
  {
    resObj.enabledFlag = -1;
  }
  else
  {
    resObj.chosenItems = [];
    resObj.enabledFlag = 0;
  }
}