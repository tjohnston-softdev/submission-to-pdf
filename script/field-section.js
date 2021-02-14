function handleSectionField(headerNum, totalCount, headerName, headerElement, headerUsageFlag, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.SECTION,
    elementTitle: "",
    sectionDesc: "",
    orderFlag: 0,
    visible: false
  };

  fieldRes.elementTitle = "Section " + headerNum;
  fieldRes.orderFlag = setSectionOrderFlag(headerNum, totalCount);


  if (headerUsageFlag > 0)
  {
    fieldRes.elementTitle = headerName;
    fieldRes.sectionDesc = headerElement.getHelpText();
    fieldRes.visible = true;
  }
  else if (headerUsageFlag === 0)
  {
    fieldRes.elementTitle = headerName;
    fieldRes.sectionDesc = "";
    fieldRes.visible = true;
  }
  else
  {
    fieldRes.visible = false;
  }


  return fieldRes;
}



function setSectionOrderFlag(hdrNum, tCount)
{
  var flagRes = 0;

  if (hdrNum > 1 && hdrNum < tCount)
  {
    flagRes = 1;
  }
  else if (hdrNum >= tCount)
  {
    flagRes = -1;
  }
  else
  {
    flagRes = 0;
  }

  return flagRes;
}