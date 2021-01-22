function handleTextField(txtTitle, txtAnswer, multipleLines, skipBlank, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.TEXT,
    elementTitle: txtTitle,
    elementAnswer: "",
    titleBreak: multipleLines,
    answerGiven: false
  };

  if (txtAnswer.length > 0)
  {
    fieldRes.elementAnswer = txtAnswer;
    fieldRes.answerGiven = true;
  }
  else if (skipBlank === true)
  {
    fieldRes.answerGiven = false;
  }
  else
  {
    fieldRes.elementAnswer = "";
    fieldRes.answerGiven = true;
  }


  return fieldRes;
}