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


function handleFormDescriptionField(frmDesc, includeOption, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.FORM_DESCRIPTION,
    descriptionText: "",
    visible: false
  };

  if (frmDesc.length > 0 && includeOption === true)
  {
    fieldRes.descriptionText = frmDesc;
    fieldRes.visible = true;
  }

  return fieldRes;
}



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


function handleEndFormHeaderField(rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.END_FORM_HEADER
  };

  return fieldRes;
}



function writeFormattedTimestamp(tsObject)
{
  var datePart = [tsObject.year, tsObject.month, tsObject.day].join("-");
  var timePart = [tsObject.hour, tsObject.minute, tsObject.second].join(":");
  var writeRes = datePart + " " + timePart;

  return writeRes;
}


function setSubmissionEmail(eText, eIncluded)
{
  var valueRes = "";

  if (eText.length > 0 && eIncluded === true)
  {
    valueRes = eText;
  }

  return valueRes;
}