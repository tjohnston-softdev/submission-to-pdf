function handleTextField(txtTitle, txtAnswer, multipleLines, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.TEXT,
    elementTitle: txtTitle,
    elementAnswer: "",
    titleBreak: multipleLines,
    canUse: false
  };

  if (txtAnswer.length > 0)
  {
    fieldRes.elementAnswer = txtAnswer;
    fieldRes.canUse = true;
  }
  else if (skipBlank === true)
  {
    fieldRes.canUse = false;
  }
  else
  {
    fieldRes.elementAnswer = "";
    fieldRes.canUse = true;
  }


  return fieldRes;
}