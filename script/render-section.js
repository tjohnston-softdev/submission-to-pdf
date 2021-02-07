function handleSectionRender(docBody, parsedSection, renderSettings, breakModes)
{ 
  var breakConstructed = constructSectionBreak(docBody, renderSettings.sectionBreak, breakModes)
  var headerConstructed = constructSectionHeader(docBody, parsedSection.visible, parsedSection.elementTitle, parsedSection.sectionDesc);
  var handleRes = false;

  if (breakConstructed === true || headerConstructed === true)
  {
    handleRes = true;
  }

  return handleRes;
}



function constructSectionBreak(dBody, chosenFlag, modeObject)
{
  var constructRes = true;
  
  if (chosenFlag === modeObject.PAGE)
  {
    dBody.appendPageBreak();
  }
  else if (chosenFlag === modeObject.RULE)
  {
    dBody.appendHorizontalRule();
    dBody.appendParagraph("");
  }
  else if (chosenFlag === modeObject.WHITESPACE)
  {
    dBody.appendParagraph("\r\r");
  }
  else
  {
    constructRes = false;
  }

  return constructRes;
}


function constructSectionHeader(dBody, sVisible, sTitle, sDescription)
{
  var constructRes = false;

  if (sVisible === true)
  {
    prepareRenderedSectionHeading(dBody, sTitle);
    prepareRenderedSectionDescription(dBody, sDescription);
    constructRes = true;
  }

  return constructRes;
}



function prepareRenderedSectionHeading(bObject, titleText)
{
  var headingObject = bObject.appendParagraph(titleText);
  headingObject.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  headingObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
}


function prepareRenderedSectionDescription(bObject, descText)
{
  var selectCutoff = -1;
  var renderObject = null;
  var textObject = null;

  if (descText.length > 0)
  {
    selectCutoff = descText.length - 1;
    renderObject = bObject.appendParagraph("");

    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    textObject = renderObject.appendText(descText);
    textObject.setBold(0, selectCutoff, false);
    textObject.setItalic(0, selectCutoff, true);
    textObject.setFontSize(11);
  }
}