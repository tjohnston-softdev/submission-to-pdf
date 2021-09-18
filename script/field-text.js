/*
  Reads the answers for any question types that can be interpreted as text.
  These are:
    * Short answer
    * Paragraph
    * Multiple choice (If 'displayRadioList' is false)
    * Checkboxes (If 'displayCheckList' is false)
    * Drop-down
    * Linear scale
    * Date
    * Time / Duration
*/


function handleTextField(txtAnswer, textboxUsed, useParaText, parseGlobal)
{
  var skipBlank = parseGlobal.mainSettings.skipBlankQuestions;
  
  var fieldRes =
  {
    elementType: parseGlobal.renderTypes.TEXT,
    elementTitle: "",
    elementAnswer: "",
    textbox: textboxUsed,
    titleBreak: useParaText,
    enabledFlag: -1
  };

  if (txtAnswer.length > 0)
  {
    // Answer given.
    fieldRes.elementAnswer = txtAnswer;
    fieldRes.enabledFlag = 1;
  }
  else if (skipBlank === true)
  {
    // Skip blank answer.
    fieldRes.enabledFlag = -1;
  }
  else
  {
    // Include blank answer.
    fieldRes.elementAnswer = "";
    fieldRes.enabledFlag = 0;
  }

  return fieldRes;
}