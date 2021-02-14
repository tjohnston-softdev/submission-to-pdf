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



function handleFormDescriptionRender(descPara, parsedDesc)
{
  var selectCutoff = -1;
  var textContents = null;

  selectCutoff = parsedDesc.descriptionText.length - 1;
  textContents = descPara.appendText(parsedDesc.descriptionText);
  textContents.setBold(0, selectCutoff, false);
  textContents.setItalic(0, selectCutoff, true);
  textContents.setFontSize(11);
}



function handleSubmissionDataRender(subPara, parsedData)
{
  constructSubmissionDataField("Number", parsedData.submissionNumber, subPara);
  constructSubmissionDataField("Timestamp", parsedData.submissionTimestamp, subPara);
  constructSubmissionDataField("E-Mail Address", parsedData.submitterEmail, subPara);
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