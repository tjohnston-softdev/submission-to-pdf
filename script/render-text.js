// Writes submitted form answers that have been interpreted as text (field-text) to the output document.


// Main function.
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


// Checks whether there should be a line break before this element based on previous type.
function getTextRenderLineBreakPrefix(pType, rDefs)
{
  var prefixRes = false;

  if (pType === rDefs.RADIO_LIST || pType === rDefs.CHECK_LIST || pType === rDefs.SECTION)
  {
    prefixRes = true;
  }

  return prefixRes;
}


// Initializes construction data and decides text structure.
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
    // Paragraph text - Use line break, block answer.
    prepareRes.prefixLinebreak = true;
    prepareRes.blockFlag = 1;
  }
  else if (pObject.elementAnswer.length > 0 && usePrefix === true)
  {
    // Previous element flagged - Use line break, inline answer.
    prepareRes.prefixLinebreak = true;
    prepareRes.blockFlag = 0;
  }
  else if (pObject.elementAnswer.length > 0)
  {
    // Regular short text - No line break, inline answer.
    prepareRes.prefixLinebreak = false;
    prepareRes.blockFlag = 0;
  }
  else
  {
    // No answer given.
    prepareRes.prefixLinebreak = false;
    prepareRes.blockFlag = -1;
  }

  return prepareRes;
}


// Adds prefix line break if required.
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

// Writes question text.
function constructTextElementQuestion(txtObj, prepObj)
{
  var localCutoff = -1;
  
  prepObj.textString += txtObj.elementTitle;
  prepObj.textString += ":";

  localCutoff = prepObj.textString.length - 1;
  prepObj.boldCutoff = localCutoff;
}


// Writes answer text.
function constructTextElementAnswer(txtObj, prepObj)
{
  if (prepObj.blockFlag > 0)
  {
    // Separate line.
    prepObj.textString += "\r";
    prepObj.textString += txtObj.elementAnswer;
    prepObj.textString += "\r";
  }
  else if (prepObj.blockFlag === 0)
  {
    // Inline.
    prepObj.textString += " ";
    prepObj.textString += txtObj.elementAnswer;
  }
  else
  {
    // No answer.
    prepObj.textString += "";
  }
  
}


// Bolds question text.
function setTextParagraphBoldHeader(txtData)
{
  var bStart = txtData.boldStart;
  var bCutoff = txtData.boldCutoff;

  txtData.textObject.setBold(bStart, bCutoff, true);
}