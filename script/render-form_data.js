function handleOverallHeadingRender(docBody, parsedHeading)
{
  var renderObject = null;
  var handleRes = false;

  if (parsedHeading.headingText.length > 0)
  {
    renderObject = docBody.insertParagraph(0, parsedHeading.headingText);
    renderObject.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    handleRes = true;
  }

  return handleRes;
}



function handleFormDescriptionRender(docBody, parsedDesc)
{
  var selectCutoff = -1;
  var renderObject = null;
  var textContents = null;
  var handleRes = false;

  if (parsedDesc.visible === true && parsedDesc.descriptionText.length > 0)
  {
    selectCutoff = parsedDesc.descriptionText.length - 1;

    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    textContents = renderObject.appendText(parsedDesc.descriptionText);
    textContents.setBold(0, selectCutoff, false);
    textContents.setItalic(0, selectCutoff, true);

    handleRes = true;
  }

  return handleRes;
}