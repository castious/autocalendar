Steps:

0. Create a celendar if not done so
1. Create a gsheet with the csv
2. Insert your calendar ID from calendar settings

<p align="center">
  <img src="./img/FromCalendarPage.png" alt="Getting to calendar settings" width="250">
</p>

<p align="center">
  <img src="./img/CalendarId.png" alt="Getting calendar ID" width="650">
</p>

3. Massage your data with a text editor to fit the gsheet example. Make sure you follow [date standards.](https://developers.google.com/chart/interactive/docs/datesandtimes#datetimes-using-the-date-constructor). Alternitevely you can use the web scrapers provided which will have the correct output format.
3b. Make sure you want to add ALL the rows to the calendar ID you placed. Removing them is a manual process through google calendar.
4. In gsheet go to tools->script editor. Paste gs code and run
