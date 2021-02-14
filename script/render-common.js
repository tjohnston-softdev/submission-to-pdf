function initializeParagraphObject(docBody)
{
  var paraRes = null;

  paraRes = docBody.appendParagraph("");
  paraRes.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  paraRes.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

  return paraRes;
}


function standardizeParagraphFormatting(txtObj, paraCutoff)
{
  txtObj.setBold(0, paraCutoff, false);
  txtObj.setItalic(0, paraCutoff, false);
  txtObj.setFontSize(11);
}