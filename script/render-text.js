function handleTextRender(docBody, parsedText, previousParsedType, renderDefs)
{
  var breakPrefixRequired = false;
  var renderObject = null;
  var preperationObject = null;
  var fullCutoff = -1;
  var textContents = null;

  if (parsedText.enabledFlag >= 0)
  {
    breakPrefixRequired = getTextRenderLineBreakPrefix(previousParsedType, renderDefs);
    
    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    preperationObject = prepareTextElementConstruction(parsedText, breakPrefixRequired);

    constructTextElementLineBreakPrefix(preperationObject);
    constructTextElementQuestion(parsedText, preperationObject);
    constructTextElementAnswer(parsedText, preperationObject);

    fullCutoff = preperationObject.textString.length - 1;
    textContents = renderObject.appendText(preperationObject.textString);
    textContents.setBold(0, fullCutoff, false);
    textContents.setItalic(0, fullCutoff, false);
    textContents.setBold(preperationObject.boldStart, preperationObject.boldCutoff, true);
    textContents.setFontSize(11);
  }
  
}


function getTextRenderLineBreakPrefix(pType, rDefs)
{
  var prefixRes = false;

  if (pType === rDefs.RADIO_LIST || pType === rDefs.CHECK_LIST)
  {
    prefixRes = true;
  }

  return prefixRes;
}


function prepareTextElementConstruction(pObject, usePrefix)
{
  var prepareRes = {};

  prepareRes["textString"] = "";
  prepareRes["boldStart"] = -1;
  prepareRes["boldCutoff"] = -1;
  prepareRes["prefixLinebreak"] = false;
  prepareRes["blockFlag"] = -1;

  if (pObject.elementAnswer.length > 0 && pObject.titleBreak === true)
  {
    prepareRes.prefixLinebreak = true;
    prepareRes.blockFlag = 1;
  }
  else if (pObject.elementAnswer.length > 0 && usePrefix === true)
  {
    prepareRes.prefixLinebreak = true;
    prepareRes.blockFlag = 0;
  }
  else if (pObject.elementAnswer.length > 0)
  {
    prepareRes.prefixLinebreak = false;
    prepareRes.blockFlag = 0;
  }
  else
  {
    prepareRes.prefixLinebreak = false;
    prepareRes.blockFlag = -1;
  }

  return prepareRes;
}


function constructTextElementLineBreakPrefix(prepObj)
{
  if (prepObj.prefixLinebreak === true)
  {
    prepObj.textString += "\r";
    prepObj.boldStart = 1;
  }
  else
  {
    prepObj.boldStart = 0;
  }
}


function constructTextElementQuestion(txtObj, prepObj)
{
  var localCutoff = -1;
  
  prepObj.textString += txtObj.elementTitle;
  prepObj.textString += ":";

  localCutoff = prepObj.textString.length - 1;
  prepObj.boldCutoff = localCutoff;
}


function constructTextElementAnswer(txtObj, prepObj)
{
  if (prepObj.blockFlag > 0)
  {
    prepObj.textString += "\r";
    prepObj.textString += txtObj.elementAnswer;
    prepObj.textString += "\r";
  }
  else if (prepObj.blockFlag === 0)
  {
    prepObj.textString += " ";
    prepObj.textString += txtObj.elementAnswer;
  }
  else
  {
    prepObj.textString += "";
  }
}