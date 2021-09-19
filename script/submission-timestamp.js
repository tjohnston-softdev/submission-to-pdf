// Used to convert the form submission timestamp into a readable string.


function validateUtcOffset(globalObj)
{
  var inpMinutes = globalObj.mainSettings.utcOffset;
  var correctType = Number.isInteger(inpMinutes);
  var safeRange = false;

  if (correctType === true && inpMinutes >= -1200 && inpMinutes <= 1200)
  {
    safeRange = true;
  }
  else
  {
    globalObj.mainSettings.utcOffset = 0;
  }
}


function readSubmissionTimestamp(submissionObj, globalObj)
{
  var retrievedTimestamp = submissionObj.getTimestamp();
  var utcMs = retrievedTimestamp.getTime();
  var convertedMs = utcMs + globalObj.mainSettings.utcOffset;
  var convertedTimestamp = new Date(convertedMs);

  var yearNumber = convertedTimestamp.getFullYear();
  var monthNumber = convertedTimestamp.getMonth() + 1;
  var dayNumber = convertedTimestamp.getDate();

  var hourNumber = convertedTimestamp.getHours();
  var minuteNumber = convertedTimestamp.getMinutes();
  var secondNumber = convertedTimestamp.getSeconds();

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
    // Ensures double-digit numbers.
    stringRes = "0" + origNum;
  }
  else
  {
    // Already double.
    stringRes = String(origNum);
  }

  return stringRes;
}