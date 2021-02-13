function handleSectionRender(docBody, parsedSection, renderSettings, breakModes)
{
  var sectionEnabled = false;

  if (parsedSection.orderFlag > 0)
  {
    prepareSectionBreak(docBody, renderSettings.sectionBreak, breakModes);
    sectionEnabled = true;
  }
  else if (parsedSection.orderFlag === 0)
  {
    sectionEnabled = true;
  }
  else
  {
    sectionEnabled = false;
  }
  

  if (sectionEnabled === true && parsedSection.visible === true)
  {
    prepareRenderedSectionHeading(docBody, parsedSection.elementTitle);
    prepareRenderedSectionDescription(docBody, parsedSection.sectionDesc);
  }

}



function prepareSectionBreak(dBody, chosenFlag, modeObject)
{
  var constructRes = true;
  
  if (chosenFlag === modeObject.PAGE)
  {
    dBody.appendPageBreak();
  }
  else if (chosenFlag === modeObject.RULE)
  {
    dBody.appendHorizontalRule();
  }
  else if (chosenFlag === modeObject.WHITESPACE)
  {
    dBody.appendParagraph("\r\r");
  }
  else
  {
    constructRes = false;
  }
}



function prepareRenderedSectionHeading(dBody, titleText)
{
  var headingObject = dBody.appendParagraph(titleText);
  headingObject.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  headingObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
}


function prepareRenderedSectionDescription(dBody, descText)
{
  var selectCutoff = -1;
  var renderObject = null;
  var textObject = null;

  if (descText.length > 0)
  {
    selectCutoff = descText.length - 1;
    renderObject = dBody.appendParagraph("");

    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    textObject = renderObject.appendText(descText);
    textObject.setBold(0, selectCutoff, false);
    textObject.setItalic(0, selectCutoff, true);
    textObject.setFontSize(11);
  }
}