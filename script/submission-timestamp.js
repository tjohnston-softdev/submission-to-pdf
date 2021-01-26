function readSubmissionTimestamp(submissionObj)
{
  var retrievedTimestamp = submissionObj.getTimestamp();

  var yearNumber = retrievedTimestamp.getFullYear();
  var monthNumber = retrievedTimestamp.getMonth() + 1;
  var dayNumber = retrievedTimestamp.getDate();

  var hourNumber = retrievedTimestamp.getHours();
  var minuteNumber = retrievedTimestamp.getMinutes();
  var secondNumber = retrievedTimestamp.getSeconds();

  var timestampRes = {};

  timestampRes["year"] = String(yearNumber);
  timestampRes["month"] = stringifyTimestampNumber(monthNumber);
  timestampRes["day"] = stringifyTimestampNumber(dayNumber);

  timestampRes["hour"] = stringifyTimestampNumber(hourNumber);
  timestampRes["minute"] = stringifyTimestampNumber(minuteNumber);
  timestampRes["second"] = stringifyTimestampNumber(secondNumber);

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