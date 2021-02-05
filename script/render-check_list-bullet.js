function handleCheckListRenderBullet(docBody, parsedCheckList, renderSettings)
{
  var handleRes = false;
  
  if (parsedCheckList.enabledFlag >= 0)
  {
    constructCheckListHeaderTextBullet(docBody, parsedCheckList);
    constructCheckListBullets(docBody, parsedCheckList);
    constructCheckListOtherBullet(docBody, parsedCheckList, renderSettings.markOtherOption);
  }
}


function constructCheckListHeaderTextBullet(dBody, parsedCheck)
{
  var renderObject = dBody.appendParagraph("");
  var headingString = "\r" + parsedCheck.elementTitle + ":";
  var textCutoff = headingString.length - 1;
  var textObject = null;
  
  renderObject.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  renderObject.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

  textObject = renderObject.appendText(headingString);
  textObject.setBold(0, textCutoff, false);
  textObject.setItalic(0, textCutoff, false);
  textObject.setBold(1, textCutoff, true);
  textObject.setFontSize(11);
}


function constructCheckListBullets(dBody, parsedCheck)
{
  var optionIndex = 0;
  var currentOption = "";
  var currentCutoff = -1;
  var currentChosen = false;
  var currentBullet = null;
  var currentText = null;

  for (optionIndex = 0; optionIndex < parsedCheck.checkboxList.length; optionIndex = optionIndex + 1)
  {
    currentOption = parsedCheck.checkboxList[optionIndex];
    currentCutoff = currentOption.length - 1;
    currentChosen = parsedCheck.chosenItems.includes(optionIndex);
    currentBullet = null;
    currentText = null;

    if (currentChosen === true)
    {
      currentBullet = dBody.appendListItem("");
      currentBullet.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      currentBullet.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
      currentBullet.setNestingLevel(0);
      currentBullet.setGlyphType(DocumentApp.GlyphType.SQUARE_BULLET);

      currentText = currentBullet.appendText(currentOption);
      currentText.setBold(0, currentCutoff, false);
      currentText.setItalic(0, currentCutoff, false);
      currentText.setFontSize(11);
    }
  }
}


function constructCheckListOtherBullet(dBody, parsedCheck, markToggle)
{
  var otherCutoff = -1;
  var otherBullet = null;
  var otherText = null;
  var otherSet = false;

  if (parsedCheck.customEnabled === true && parsedCheck.customText.length > 0)
  {
    otherCutoff = parsedCheck.customText.length - 1;
    otherBullet = dBody.appendListItem("");
    otherBullet.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    otherBullet.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
    otherBullet.setNestingLevel(0);
    otherBullet.setGlyphType(DocumentApp.GlyphType.SQUARE_BULLET);

    otherText = otherBullet.appendText(parsedCheck.customText);
    otherText.setBold(0, otherCutoff, false);
    otherText.setItalic(0, otherCutoff, false);
    otherText.setFontSize(11);

    otherSet = true;
  }

  if (otherSet === true && markToggle === true)
  {
    otherText.setItalic(0, otherCutoff, true);
  }
}