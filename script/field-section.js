// Reads the section headers on the form and decides how to display them in the output document.


// Main function.
function handleSectionField(headerNum, totalCount, headerName, headerElement, parseGlobal)
{
  var headerUsageFlag = parseGlobal.mainSettings.includeSectionHeader;
  
  var fieldRes =
  {
    elementType: parseGlobal.renderTypes.SECTION,
    elementTitle: "",
    sectionDesc: "",
    orderFlag: 0,
    visible: false
  };

  fieldRes.elementTitle = "Section " + headerNum;
  fieldRes.orderFlag = setSectionOrderFlag(headerNum, totalCount);


  if (headerUsageFlag > 0)
  {
    // Use both name and description.
    fieldRes.elementTitle = headerName;
    fieldRes.sectionDesc = headerElement.getHelpText();
    fieldRes.visible = true;
  }
  else if (headerUsageFlag === 0)
  {
    // Use name only.
    fieldRes.elementTitle = headerName;
    fieldRes.sectionDesc = "";
    fieldRes.visible = true;
  }
  else
  {
    // Ignore section.
    fieldRes.visible = false;
  }


  return fieldRes;
}


// Decides how the section should be used based on its order.
function setSectionOrderFlag(hdrNum, tCount)
{
  var flagRes = 0;

  if (hdrNum > 1 && hdrNum < tCount)
  {
    // Between first and last elements - Use as normal.
    flagRes = 1;
  }
  else if (hdrNum >= tCount)
  {
    // Last element - Ignore entirely.
    flagRes = -1;
  }
  else
  {
    // First element - No separator.
    flagRes = 0;
  }

  return flagRes;
}