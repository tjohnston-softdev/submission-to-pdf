// Prepares font and colour for text elements.

// Valid hex colour.
var colourRegex = /^#[0-9A-Fa-f]{6}$/gi;


function validateStylingInput(renderGlobal)
{
  var origColour = "#000000";
  var origFont = "Arial";
  
  var globalColour = readColourInput(renderGlobal.colours, "global", origColour);
  var globalFont = readFontInput(renderGlobal.fonts, "global", origFont);
  var elementProps = ["mainHeading", "formDesc", "sectionHeading", "sectionDesc", "question", "gridHeader", "meta"];

  var propIndex = 0;
  var currentProp = "";
  var currentColour = "";
  var currentFont = "";

  for (propIndex = 0; propIndex < elementProps.length; propIndex = propIndex + 1)
  {
    currentProp = elementProps[propIndex];
    currentColour = readColourInput(renderGlobal.colours, currentProp, globalColour);
    currentFont = readFontInput(renderGlobal.fonts, currentProp, globalFont);

    renderGlobal.colours[currentProp] = currentColour;
    renderGlobal.fonts[currentProp] = currentFont;
  }
}


// Prepare style object for current element.
function prepareTextStyling(renderGlobal, styleProp)
{
  var styleRes = {};

  styleRes["colour"] = renderGlobal.colours[styleProp];
  styleRes["font"] = renderGlobal.fonts[styleProp];

  return styleRes;
}


// Read text colour.
function readColourInput(colSettings, sProp, defaultColour)
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


// Read text font.
function readFontInput(fontSettings, sProp, defaultFont)
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