# Summary

**Version:** 1.5

**Date:** 2021-02-12

**Title:** Fixed first section break glitch.

**Description:**

* If the first form element is a section, it may include an unnecessary break between the form data and the first section in the output document.
* If the section is the first or last element, the break will not be inserted.
* Although a 'last element' section does not insert a break, it will still include the (empty) header.