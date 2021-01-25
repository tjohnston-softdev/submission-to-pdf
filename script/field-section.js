function handleSectionField(headerName, headerElement, headerFlag, rTypes)
{
  var fieldRes =
  {
    elementType: rTypes.SECTION,
    elementTitle: "",
    sectionDesc: "",
    visible: false
  };


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