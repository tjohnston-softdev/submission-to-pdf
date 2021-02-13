function handleSectionField(headerNum, totalCount, headerName, headerElement, headerFlag, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.SECTION,
    elementTitle: "",
    sectionDesc: "",
    orderFlag: 0,
    visible: false
  };

  if (headerNum > 1 && headerNum < totalCount)
  {
    fieldRes.orderFlag = 1;
  }
  else if (headerNum >= totalCount)
  {
    fieldRes.orderFlag = -1;
  }
  else
  {
    fieldRes.orderFlag = 0;
  }


  if (headerFlag > 0)
  {
    fieldRes.elementTitle = headerName;
    fieldRes.sectionDesc = headerElement.getHelpText();
    fieldRes.visible = true;
  }
  else if (headerFlag === 0)
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