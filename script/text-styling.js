var colourRegex = /^#[0-9A-Fa-f]{6}$/gi;

function prepareTextStyling(renderGlobal, styleProp)
{
  var styleRes = {};

  styleRes["colour"] = setStyleColour(renderGlobal.colours, styleProp);
  styleRes["font"] = setStyleFont(renderGlobal.fonts, styleProp);

  return styleRes;
}


function setStyleColour(colSettings, sProp)
{
  var colourString = colSettings[sProp];
  var entryType = typeof colourString;
  var hexValid = -1;

  var setRes = colSettings.global;

  if (entryType === "string" && colourString.length > 0)
  {
    hexValid = colourString.search(colourRegex);
  }

  if (hexValid === 0)
  {
    setRes = colourString;
  }

  return setRes;
}


function setStyleFont(fontSettings, sProp, attrObject)
{
  var fontString = fontSettings[sProp];
  var entryType = typeof fontString;
  var setRes = fontSettings.global;

  if (entryType === "string" && fontString.length > 0)
  {
    setRes = fontString;
  }

  return setRes;
}