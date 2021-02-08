# Submission to PDF
by Tyrone Johnston

---

### Introduction
This is a Google Forms script I wrote that converts form submissions into Portable Document Files. It is attached to the chosen form so that whenever a submission is made, it is immediately converted. The output document is written by reading form elements one-by-one, retrieving the corresponding answer, and transferring it to a Google Docs file, which is then saved as a PDF.

---

### Inspiration
My first major project while working at Response Services Incorporated was to write a script that creates PDFs from an important Google Form in our G Suite system. I wrote an initial draft of the script at the start of December 2016 as a training exercise. It was rolled out for public use towards the end of January 2017.

A few months later, I was asked to revise the script into a generic template that can be used for many different forms throughout the system. I do not remember how often we used that version of the script but when I wrote the original, I had to tailor it to that particular form. For example, I had to include or exclude certain items based on previous answers.

Fast forward to 2021, I decided to write a new version of the script from scratch. It is a generic solution that should be tailored for individual forms as needed. I have implemented a number of customization options, but it is not 'one-size-fits-all'. You will have to modify the script for your own intents and purposes.

---

### Documentation
* [Installing](./docs/install.md)
* [Configuration](./docs/config.md)
* [Files](./docs/files.md)

---

### Disclaimer
This project is licensed under the MIT license. You are free to use this G Suite script for both personal and commercial purposes as long as proper credit is retained and the license file remains intact. This script is only meant to be a template and may not be suitable for your specific use case as-is. You are encouraged to modify the script according to your needs, but doing so is entirely your responsibility.
