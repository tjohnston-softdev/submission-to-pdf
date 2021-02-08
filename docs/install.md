### Installing 'Submission-to-PDF'

This file contains instructions on how to install the script hosted in this project for your own use. There is no proper 'install' feature for Google Drive so manual action is required.

---

1. Open an existing Google Form or create one as you would normally.

2. Click on the 'dots' icon next to the **Send** button and choose the **script editor** option. This will open a new tab.

3. The **script editor** tab will display any script files that are attached to your chosen form. If you are doing this for the first time, you will only see a placeholder file `Code.gs`.

4. If your form has existing scripts, it is recommended that you delete them, as this script contains many files. If you absolutely need to retain existing functionality, make sure that each file and function name is unique as to prevent conflict. If any files have global variables, they should be uniquely named throughout the entire project.

5. Inside the 'script' folder within this repository, create extra files corresponding to each local script file. Copy the contents of each .js file and paste them into the corresponding .gs file in your Google Sheets script. After all files have been copied, click the **Save project** button next to the **Run** button.

6. Now that the scripts have been attached to the form, click on the **Clock** icon on the left sidebar to access the triggers. Then click on the **+ Add Trigger** button. This will allow you to set a particular function to run automatically under certain circumstances such as whenever the form is opened, or when a submission is made.

7. As for the trigger settings, choose the following options:

	* **Function:** runSubmissionToPDF
	* **Deployment:** Head
	* **Event Source:** Form
	* **Event Type:** on Form Submit

8. Once the trigger has been configured with the above options, click **Save**

9. To configure the script, open the `options.gs` file and edit the 'scriptSettings' global object. For more information on how to do so, see [Configuration](./config.md).

10. Close the script tab and refresh the form.

---

[Return to Index](../readme.md) 
