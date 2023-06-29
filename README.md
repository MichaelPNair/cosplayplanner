# CosplayPlanner

This is a website to plan cosplay projects. You can add, edit and delete multiple elements of a cosplay plan to quickly gauge your progress or adjust if the plans are too difficult or too expensive.

## Links

The website is hosted on render [here](https://cosplayplanner.onrender.com).
The website wireframes are [here](https://github.com/MichaelPNair/cosplayplanner/tree/main/wireframes).
The ERD chart is [here](https://github.com/MichaelPNair/cosplayplanner/tree/main/ERD).

## Technologies Used
- HTML
- CSS
- Javascript
- express
- Postgres

## Screenshots
### Initial Screen
![Screenshot of Initial Screen before login](/screenshots/Initial%20Page.png)

### Sign Up page
![Screenshot of Sign Up page](/screenshots/Sign%20Up%20page.png)

### Login Page
![Screenshot of Login page](/screenshots/Login%20page.png)

### Login to see your saved cosplays
![Screenshot of saved cosplays after login](/screenshots/Cosplays.png)

### Add new cosplays to your list
![Screenshot of adding new cosplay](/screenshots/Add%20Cosplay.png)

### View details of each cosplay
![Screenshot of viewing details of a cosplay](/screenshots/Cosplay%20Details.png)

### Add new tasks to a cosplay
![Screenshot of adding a task](/screenshots/Add%20Task.png)

## Edit a cosplay
![Screenshot of editing a cosplay](/screenshots/Edit%20Cosplay.png)

## Delete a cosplay
![Screenshot of deleting a cosplay](/screenshots/Delete%20Cosplay.png)

## View progress pictures
![Screenshot of saved progress pictures](/screenshots/Progress%20Pictures.png)

## Add a progress picture
![Screenshot of adding a progress picture](/screenshots/Add%20Progress%20Picture.png)

## Getting Started
This page is connected to a database to keep track of logged in users and allow logged in users to update pages.

Sign up by entering a unique username and a password. The page will stop you if your username is already taken.

Login using your username and password to view your list of cosplays. You will not be able to view this if you are not logged in. You will also not be able to view other people's lists.

When you see your list of cosplays, click the add cosplay button to add a new cosplay to the list or click a picture to view the details of that cosplay.

When adding a cosplay, you will be asked to include the name, the source material and a URL of an image.

You can also edit a cosplay and delete a cosplay. If you delete a cosplay, any tasks within the cosplay will also be deleted.

You can add tasks to a cosplay and will be asked to fill in the task type, name, cost, time, completion status and a description.

These tasks can also be edited. If you change the task type from Buy to Craft, the task will appear in the corresponding column in the cosplay details page.

If you set the status of a task to Done, it will have a grey background.

The total costs and time of the tasks will automatically be displayed with any changes to the tasks.

You can also add progress pictures to your cosplay. From the cosplay details page, you can view the progress pictures.

From the progress pictures page, you can add, edit or delete progress pictures.

## Future Improvement
- Improve styling of buttons
- Improve styling of tasks being shown
- Improve styling of pages for editing or deleting tasks or cosplays
- Allow of uploading of own image files
- Ability to reorder tasks
- Have Done tasks move below other tasks automatically
- Select favourite progress picture and have it displayed in cosplay details page


## Thanks
Designed and coded by Michael Nair.