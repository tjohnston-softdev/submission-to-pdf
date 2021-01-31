function handleTextRender(docBody, parsedText)
{
  var renderObject = null;
  var preperationObject = null;
  var textContents = null;

  var handleRes = false;

  if (parsedText.enabledFlag >= 0)
  {
    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    preperationObject = prepareTextElementConstruction(parsedText);
    textContents = renderObject.appendText(preperationObject.textString);
    textContents.setBold(0, preperationObject.fullCutoff, false);
    textContents.setItalic(0, preperationObject.fullCutoff, false);
    textContents.setBold(preperationObject.boldStart, preperationObject.boldCutoff, true);
    textContents.setFontSize(11);

    handleRes = true;
  }


  return handleRes;
}


function prepareTextElementConstruction(pObject)
{
  var prepareRes = {};

  prepareRes["textString"] = "";
  prepareRes["boldStart"] = -1;
  prepareRes["boldCutoff"] = -1;
  prepareRes["fullCutoff"] = -1;

  if (pObject.elementAnswer.length > 0 && pObject.titleBreak === true)
  {
    prepareRes.textString += "\r";
    prepareRes.boldStart = 1;

    prepareRes.textString += pObject.elementTitle;
    prepareRes.textString += ":";
    prepareRes.boldCutoff = prepareRes.textString.length - 1;

    prepareRes.textString += "\r";
    prepareRes.textString += pObject.elementAnswer;
    prepareRes.textString += "\r";
    prepareRes.fullCutoff = prepareRes.textString.length - 1;
  }
  else if (pObject.elementAnswer.length > 0)
  {
    prepareRes.boldStart = 0;
    prepareRes.textString += pObject.elementTitle;
    prepareRes.textString += ":";
    prepareRes.boldCutoff = prepareRes.textString.length - 1;

    prepareRes.textString += " ";
    prepareRes.textString += pObject.elementAnswer;
    prepareRes.fullCutoff = prepareRes.textString.length - 1;
  }
  else
  {
    prepareRes.boldStart = 0;
    prepareRes.textString += pObject.elementTitle;
    prepareRes.textString += ":";
    prepareRes.boldCutoff = prepareRes.textString.length - 1;
    prepareRes.fullCutoff = prepareRes.textString.length - 1;
  }

  return prepareRes;
}