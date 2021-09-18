// Writes the form name, form description, and submission data at the start of the output document.


// Main function - Form name heading.
function handleOverallHeadingRender(docBody, parsedHeading)
{
  var renderObject = null;
  var colourObject = {};

  if (parsedHeading.headingText.length > 0)
  {
    renderObject = docBody.insertParagraph(0, parsedHeading.headingText);
    renderObject.setHeading(DocumentApp.ParagraphHeading.TITLE);
    renderObject.setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    colourObject[DocumentApp.Attribute.FOREGROUND_COLOR] = "#eba834";
    renderObject.setAttributes(colourObject);
  }

}


// Main function - Form description.
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


// Main function - Submission data.
function handleSubmissionDataRender(subPara, parsedData)
{
  constructSubmissionDataField("Number", parsedData.submissionNumber, subPara);
  constructSubmissionDataField("Timestamp", parsedData.submissionTimestamp, subPara);
  constructSubmissionDataField("E-Mail Address", parsedData.submitterEmail, subPara);
}


// Writes submission data field.
function constructSubmissionDataField(dataName, dataValue, rendObj)
{
  var fieldText = "";
  var boldCutoff = -1;
  var fullCutoff = -1;
  var fieldObject = null;

  // Checks if value has been entered.
  if (dataValue.length > 0)
  {
    // Writes field name.
    fieldText += "\r";
    fieldText += dataName;
    fieldText += ": ";
    boldCutoff = fieldText.length - 1;

    // Writes field value.
    fieldText += dataValue;
    fullCutoff = fieldText.length - 1;
    
    // Formats field text.
    fieldObject = rendObj.appendText(fieldText);
    fieldObject.setBold(0, fullCutoff, false);
    fieldObject.setItalic(0, fullCutoff, false);
    fieldObject.setBold(1, boldCutoff, true);
    fieldObject.setFontSize(10);
  }
}