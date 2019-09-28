function createCalendarEvent() {
  var sheet = SpreadsheetApp.getActiveSheet();

  var numRows = sheet.getLastRow();
  var numColumns = sheet.getLastColumn();
  var startRow = 3;

  var calendarId = sheet.getRange(1, 1, 2, 2).getValues()[0][1] // 1 indexed. Static across events; hardcode postion
  if (calendarId == "") {
    return;
  }
  var data = sheet.getRange(startRow, 1, numRows-1, numColumns).getValues(); // 1 indexed
  
  var headers = sheet.getRange(startRow - 1, 1, startRow, numColumns).getValues()[0]; // 1 indexed
  var headerMap = {};
  for (var i = 0; i < headers.length; i++) {
       headerMap[headers[i]] = i;
  }  

  var calendar = CalendarApp.getCalendarById(calendarId);
  for (var i = 0; i < data.length; i++) {
    var row = data[i];

    // Event specs
    var name = row[headerMap["Name"]]
    var startTime = new Date(row[headerMap["StartTime"]] + " " + row[headerMap["TimeZone"]]); // Start Timezone = end timezone. If not add your own column :)
    var endTime = new Date(row[headerMap["EndTime"]] + " " + row[headerMap["TimeZone"]]);
    var place = row[headerMap["Location"]];

    // Usually details are split up into two things. You can alternatively use only one and use \n in the string
    var description = row[headerMap["Description"]];
    var moreDetails = row[headerMap["MoreDetails"]];

    // Completed flag to avoid duplicate runs
    var isCompleted = row[headerMap["IsScheduled"]];

    if (isCompleted == "N") {
      var currentCell = sheet.getRange(startRow + i, 8);
      try {
        var event = calendar.createEvent(name, startTime, endTime, {
          description: description + '\n\n' + moreDetails,
          location: place
        });
        
        Logger.log('Created Event ID: ' + event.getId());
        
        currentCell.setValue("Y");
      } catch(error) {
        Logger.log('Being Throttled! Pausing for a bit' + event.getId());
        Utilities.sleep(5000);
        i--;
      }
    }
  }
}
