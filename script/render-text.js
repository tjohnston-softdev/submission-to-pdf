function handleTextRender(textPara, parsedText, previousParsedType, renderDefs)
{
  var breakPrefixRequired = false;
  var createdText = null;
  
  breakPrefixRequired = getTextRenderLineBreakPrefix(previousParsedType, renderDefs);
  createdText = prepareTextElementConstruction(parsedText, breakPrefixRequired);
  
  constructTextElementLineBreakPrefix(createdText);
  constructTextElementQuestion(parsedText, createdText);
  constructTextElementAnswer(parsedText, createdText);

  createdText.textObject = textPara.appendText(createdText.textString);
  
  return createdText;
}


function getTextRenderLineBreakPrefix(pType, rDefs)
{
  var prefixRes = false;

  if (pType === rDefs.RADIO_LIST || pType === rDefs.CHECK_LIST || pType === rDefs.SECTION)
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
  prepareRes["textObject"] = null;

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


function setTextParagraphBoldHeader(txtData)
{
  var bStart = txtData.boldStart;
  var bCutoff = txtData.boldCutoff;

  txtData.textObject.setBold(bStart, bCutoff, true);
}