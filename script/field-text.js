function handleTextField(txtTitle, txtAnswer, multipleLines, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.TEXT,
    elementTitle: txtTitle,
    elementAnswer: "",
    titleBreak: multipleLines,
    enabledFlag: -1
  };

  if (txtAnswer.length > 0)
  {
    fieldRes.elementAnswer = txtAnswer;
    fieldRes.enabledFlag = 1;
  }
  else if (skipBlank === true)
  {
    fieldRes.enabledFlag = -1;
  }
  else
  {
    fieldRes.elementAnswer = "";
    fieldRes.enabledFlag = 0;
  }


  return fieldRes;
}