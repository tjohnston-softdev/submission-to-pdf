/*
  Used to add separators between different form sections,
  and write the section header to the output document.
  There are options as to how this is performed.
*/


// Main function.
function handleSectionRender(docBody, parsedSection, renderGlobal, headStyle, descStyle)
{
  var secBreakFlag = renderGlobal.mainSettings.sectionBreak;
  var sectionEnabled = false;

  // IF structure decides rendering based on section order.
  if (parsedSection.orderFlag > 0)
  {
    // Between - Both break and header.
    prepareSectionBreak(docBody, secBreakFlag, renderGlobal.breakOpts);
    sectionEnabled = true;
  }
  else if (parsedSection.orderFlag === 0)
  {
    // First - Header only.
    sectionEnabled = true;
  }
  else
  {
    // Last - Ignore.
    sectionEnabled = false;
  }
  

  if (sectionEnabled === true && parsedSection.visible === true)
  {
    prepareRenderedSectionHeading(docBody, parsedSection.elementTitle, headStyle);
    prepareRenderedSectionDescription(docBody, parsedSection.sectionDesc, descStyle);
  }

}


// Adds section break.
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


// Writes section heading.
function prepareRenderedSectionHeading(dBody, titleText, styleObj)
{
  var preparedStyle = {};
  preparedStyle[DocumentApp.Attribute.FONT_FAMILY] = styleObj.font;
  preparedStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = styleObj.colour;
  
  var headingObject = dBody.appendParagraph(titleText);
  headingObject.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  headingObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
  headingObject.setAttributes(preparedStyle);
}


// Writes section description.
function prepareRenderedSectionDescription(dBody, descText, styleObj)
{
  var selectCutoff = -1;
  var renderObject = null;
  var textObject = null;

  if (descText.length > 0)
  {
    // Initializes paragraph object.
    selectCutoff = descText.length - 1;
    renderObject = dBody.appendParagraph("");

    // Sets level and alignment.
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    // Formats text.
    textObject = renderObject.appendText(descText);
    textObject.setBold(0, selectCutoff, false);
    textObject.setItalic(0, selectCutoff, true);
    textObject.setFontSize(11);
    textObject.setFontFamily(0, selectCutoff, styleObj.font);
    textObject.setForegroundColor(0, selectCutoff, styleObj.colour);
  }
}