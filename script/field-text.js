function handleTextField(txtTitle, txtAnswer, multipleLines, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.TEXT,
    elementTitle: txtTitle,
    elementAnswer: "",
    titleBreak: multipleLines
  };

  if (txtAnswer.length > 0)
  {
    fieldRes.elementAnswer = txtAnswer;
  }
  else if (skipBlank === true)
  {
    fieldRes = null;
  }
  else
  {
    fieldRes.elementAnswer = "";
  }


  return fieldRes;
}