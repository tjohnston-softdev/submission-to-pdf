// Prepares font and colour for text elements.

// Valid hex colour.
var colourRegex = /^#[0-9A-Fa-f]{6}$/gi;


function validateStylingInput(renderGlobal)
{
  var globalColour = setStyleColour(renderGlobal.colours, "global", "#000000");
  var globalFont = setStyleFont(renderGlobal.fonts, "global", "Arial");
  var elementProps = ["mainHeading", "formDesc", "sectionHeading", "sectionDesc", "question", "tableHeader", "meta"];

  var propIndex = 0;
  var currentProp = "";
  var currentColour = "";
  var currentFont = "";

  for (propIndex = 0; propIndex < elementProps.length; propIndex = propIndex + 1)
  {
    currentProp = elementProps[propIndex];
    currentColour = setStyleColour(renderGlobal.colours, currentProp, globalColour);
    currentFont = setStyleFont(renderGlobal.fonts, currentProp, globalFont);

    renderGlobal.colours[currentProp] = currentColour;
    renderGlobal.fonts[currentProp] = currentFont;
  }
  
}


// Main function.
function prepareTextStyling(renderGlobal, styleProp)
{
  var styleRes = {};

  styleRes["colour"] = setStyleColour(renderGlobal.colours, styleProp, renderGlobal.colours.global);
  styleRes["font"] = setStyleFont(renderGlobal.fonts, styleProp, renderGlobal.fonts.global);

  return styleRes;
}


// Set text colour.
function setStyleColour(colSettings, sProp, defaultColour)
{
  var colourString = "";
  var entryType = "";
  var hexValid = -1;

  var setRes = defaultColour;

  // Read input and check type.
  colourString = colSettings[sProp];
  entryType = typeof colourString;

  if (entryType === "string" && colourString.length > 0)
  {
    // Validate hex colour string.
    hexValid = colourString.search(colourRegex);
  }

  if (hexValid === 0)
  {
    // Successful - Use input hex.
    setRes = colourString;
  }

  return setRes;
}


// Set text font.
function setStyleFont(fontSettings, sProp, defaultFont)
{
  var fontString = fontSettings[sProp];
  var entryType = typeof fontString;
  var setRes = defaultFont;

  if (entryType === "string" && fontString.length > 0)
  {
    // Correct input type.
    setRes = fontString;
  }

  return setRes;
}