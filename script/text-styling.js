// Prepares font and colour for text elements.

// Valid hex colour.
var colourRegex = /^#[0-9A-Fa-f]{6}$/gi;


// Validates input for custom element styling.
function validateStylingInput(renderGlobal)
{
  var globalColour = "";
  var globalFont = "";
  var elementProps = [];

  var propIndex = 0;
  var currentProp = "";
  var currentColour = "";
  var currentFont = "";

  // Set hard-coded default values.
  globalColour = readColourInput(renderGlobal.colours, "global", "#000000");
  globalFont = readFontInput(renderGlobal.fonts, "global", "Arial");

  // Customizable elements.
  elementProps.push("mainHeading", "formDesc", "sectionHeading", "sectionDesc");
  elementProps.push("question", "gridHeader", "meta", "listSymbol", "gridSymbol");

  // Loop properties and validate contents for colour and font.
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


// Read input text colour for given element.
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


// Read input text font for given element.
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