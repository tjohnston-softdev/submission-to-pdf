function handleOverallHeadingRender(docBody, parsedHeading)
{
  var renderObject = null;

  if (parsedHeading.headingText.length > 0)
  {
    renderObject = docBody.insertParagraph(0, parsedHeading.headingText);
    renderObject.setHeading(DocumentApp.ParagraphHeading.TITLE);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  }

}



function handleFormDescriptionRender(docBody, parsedDesc)
{
  var selectCutoff = -1;
  var renderObject = null;
  var textContents = null;

  if (parsedDesc.visible === true && parsedDesc.descriptionText.length > 0)
  {
    selectCutoff = parsedDesc.descriptionText.length - 1;

    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    textContents = renderObject.appendText(parsedDesc.descriptionText);
    textContents.setBold(0, selectCutoff, false);
    textContents.setItalic(0, selectCutoff, true);
    textContents.setFontSize(11);
  }

}



function handleSubmissionDataRender(docBody, parsedData)
{
  var renderObject = null;

  if (parsedData.visible === true)
  {
    renderObject = docBody.appendParagraph("");
    renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
    
    constructSubmissionDataField("Number", parsedData.submissionNumber, renderObject);
    constructSubmissionDataField("Timestamp", parsedData.submissionTimestamp, renderObject);
    constructSubmissionDataField("E-Mail Address", parsedData.submitterEmail, renderObject);
  }
}


function handleEndFormDataRender(docBody)
{
  docBody.appendHorizontalRule();
  docBody.appendParagraph('\r');
}



function constructSubmissionDataField(dataName, dataValue, rendObj)
{
  var fieldText = "";
  var boldCutoff = -1;
  var fullCutoff = -1;
  var fieldObject = null;

  if (dataValue.length > 0)
  {
    fieldText += "\r";
    fieldText += dataName;
    fieldText += ": ";
    boldCutoff = fieldText.length - 1;

    fieldText += dataValue;
    fullCutoff = fieldText.length - 1;
    
    fieldObject = rendObj.appendText(fieldText);
    fieldObject.setBold(0, fullCutoff, false);
    fieldObject.setItalic(0, fullCutoff, false);
    fieldObject.setBold(1, boldCutoff, true);
    fieldObject.setFontSize(10);
  }
}