function handleSectionField(headerIndex, headerLast, headerName, headerElement, headerFlag, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.SECTION,
    elementTitle: "",
    sectionDesc: "",
    allowBreak: false,
    visible: false
  };

  if (headerIndex > 0 && headerIndex < headerLast)
  {
    fieldRes.allowBreak = true;
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