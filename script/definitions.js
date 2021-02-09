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


function getRenderTypes()
{
  return renderTypeDefinitions;
}



function getSymbolDefinitions()
{
  var definitionRes = {};

  definitionRes["radioSymbol"] = {filled: "\u29BF", empty: "\u29BE"};
  definitionRes["checkSymbol"] = {filled: "\u2611", empty: "\u2610"};
  definitionRes["radioPlain"] = {filled: "(O)", empty: "(  )"};
  definitionRes["checkPlain"] = {filled: "[X]", empty: "[  ]"};

  return definitionRes;
}