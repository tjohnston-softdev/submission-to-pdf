/*
  Reads the form name and description so that they can be displayed in the output document.
  This file also saves the number, timestamp, and E-Mail address of the submission being converted.
*/


// Main function - Form name heading.
function handleOverallHeadingField(frmName, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.OVERALL_HEADING,
    headingText: "Submission to PDF - Output Document"
  };

  if (frmName.length > 0)
  {
    fieldRes.headingText = frmName;
  }

  return fieldRes;
}


// Main function - Form description.
function handleFormDescriptionField(frmDesc, includeOption, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.FORM_DESCRIPTION,
    descriptionText: "",
    visible: false
  };

  // Add description text if applicable.
  if (frmDesc.length > 0 && includeOption === true)
  {
    fieldRes.descriptionText = frmDesc;
    fieldRes.visible = true;
  }

  return fieldRes;
}


// Main function - Submission data.
function handleSubmissionDataField(subNumber, sTimeObj, givenEmailAddress, settingsObj, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.SUBMISSION_DATA,
    submissionNumber: "",
    submissionTimestamp: "",
    submitterEmail: "",
    visible: false
  };

  if (settingsObj.includeSubmissionData === true)
  {
    fieldRes.submissionNumber = String(subNumber);
    fieldRes.submissionTimestamp = writeFormattedTimestamp(sTimeObj);
    fieldRes.submitterEmail = setSubmissionEmail(givenEmailAddress, settingsObj.includeEmailAddress);
    fieldRes.visible = true;
  }

  return fieldRes;
}


// Main function - End form header.
function handleEndFormHeaderField(rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.END_FORM_HEADER
  };

  return fieldRes;
}



// Writes submission timestamp for data field.
function writeFormattedTimestamp(tsObject)
{
  var datePart = [tsObject.year, tsObject.month, tsObject.day].join("-");
  var timePart = [tsObject.hour, tsObject.minute, tsObject.second].join(":");
  var writeRes = datePart + " " + timePart;

  return writeRes;
}


// Writes submitter E-Mail for data field.
function setSubmissionEmail(eText, eIncluded)
{
  var valueRes = "";

  if (eText.length > 0 && eIncluded === true)
  {
    valueRes = eText;
  }

  return valueRes;
}