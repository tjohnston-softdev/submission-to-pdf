/*
  Contains definitions for:
    * Element rendering types.
    * Symbol characters for radio buttons and checkboxes.
*/


// Object render types.
var renderTypeDefinitions =
{
  "OVERALL_HEADING": -1,
  "FORM_DESCRIPTION": -2,
  "SUBMISSION_DATA": -3,
  "END_FORM_HEADER": -4,
  "TEXT": 1,
  "RADIO_LIST": 2,
  "CHECK_LIST": 3,
  "RADIO_GRID": 4,
  "CHECK_GRID": 5,
  "SECTION": 6
};



// GET 'renderTypeDefinitions'
function getRenderTypes()
{
  return renderTypeDefinitions;
}



// Text symbols for radio buttons and check lists.
function getSymbolDefinitions()
{
  var definitionRes = {};

  definitionRes["radio"] = {};
  definitionRes["check"] = {};

  definitionRes.radio["plain"] = {filled: "(O)", empty: "(  )"};
  definitionRes.radio["glyph"] = {filled: "\u29BF", empty: "\u29BE"};

  definitionRes.check["plain"] = {filled: "[X]", empty: "[  ]"};
  definitionRes.check["glyph"] = {filled: "\u2611", empty: "\u2610"};

  return definitionRes;
}