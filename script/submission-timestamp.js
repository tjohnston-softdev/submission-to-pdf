function readSubmissionTimestamp(submissionObj)
{
  var retrievedTimestamp = submissionObj.getTimestamp();

  var yearNumber = retrievedTimestamp.getFullYear();
  var monthNumber = retrievedTimestamp.getMonth() + 1;
  var dayNumber = retrievedTimestamp.getDate();

  var hourNumber = retrievedTimestamp.getHours();
  var minuteNumber = retrievedTimestamp.getMinutes();
  var secondNumber = retrievedTimestamp.getSeconds();

  var yearText = String(yearNumber);
  var monthText = stringifyTimestampNumber(monthNumber);
  var dayText = stringifyTimestampNumber(dayNumber);

  var hourText = stringifyTimestampNumber(hourNumber);
  var minuteText = stringifyTimestampNumber(minuteNumber);
  var secondText = stringifyTimestampNumber(secondNumber);

  var datePart = [yearText, monthText, dayText].join("");
  var timePart = [hourText, minuteText, secondText].join("");

  var timestampRes = datePart + "-" + timePart;
  return timestampRes;
}


function stringifyTimestampNumber(origNum)
{
  var stringRes = "";

  if (origNum < 10)
  {
    stringRes = "0" + origNum;
  }
  else
  {
    stringRes = String(origNum);
  }

  return stringRes;
}