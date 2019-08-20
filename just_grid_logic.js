/*
We need:
-list of rooms
-date range***
-list of reservations
  -person
  -start and end date
  -room
  -color

  Start and end date - Put div in a location so it is lined up with start and
  end date

  Layout - F
*/

window['moment-range'].extendMoment(moment);

var rooms = [
  { "Room_ID": 1643, "Building_ID": "CD", "Room_Number": "100", "Res_Group": [] },
  { "Room_ID": 1644, "Building_ID": "AU", "Room_Number": "102", "Res_Group": [] },
  { "Room_ID": 1645, "Building_ID": "SU", "Room_Number": "103", "Res_Group": [] },
  { "Room_ID": 1646, "Building_ID": "SU", "Room_Number": "105", "Res_Group": [] },
  { "Room_ID": 1647, "Building_ID": "CE", "Room_Number": "421", "Res_Group": [] },
  { "Room_ID": 1648, "Building_ID": "CE", "Room_Number": "321", "Res_Group": [] },
  { "Room_ID": 1649, "Building_ID": "CD", "Room_Number": "244", "Res_Group": [] },
  { "Room_ID": 1650, "Building_ID": "SU", "Room_Number": "276", "Res_Group": [] }
];

// the isBefore boolean is true if a reservation's start occurs before the time constraint start
// the isAfter boolean is true if a reservation's start occurs after the time constraint end

var reservations = [
  { "Person_ID": 598412, "Person_Name": "John Doe", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102938, "Person_Name": "George", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109283, "Person_Name": "Frodo", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 598482, "Person_Name": "Aragorn", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102978, "Person_Name": "Gandalf", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109293, "Person_Name": "Sam", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 102983, "Person_Name": "%$#^", "Room_ID": 1645, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-05-27", "Reservation_End": "2019-07-15", "isBefore": true, "isAfter": false },
  { "Person_ID": 109348, "Person_Name": "^%$#", "Room_ID": 1646, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-15", "isBefore": false, "isAfter": false },
  { "Person_ID": 234985, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482346, "Person_Name": "Bob Ross", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-05-28", "Reservation_End": "2019-06-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482421, "Person_Name": "Rob Boss", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 216425, "Person_Name": "George Washington", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-12", "Reservation_End": "2019-06-13", "isBefore": false, "isAfter": false },
  { "Person_ID": 481856, "Person_Name": "Suleiman", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-08-01", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": true },
  { "Person_ID": 483751, "Person_Name": "Ghandi", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-02", "Reservation_End": "2019-08-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 231755, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-05", "Reservation_End": "2019-07-08", "isBefore": false, "isAfter": false },
  { "Person_ID": 481746, "Person_Name": "Sauron", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 484681, "Person_Name": "Saruman", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": false },
  { "Person_ID": 598161, "Person_Name": "John Doe", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102342, "Person_Name": "George", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109111, "Person_Name": "Frodo", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 596234, "Person_Name": "Aragorn", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 104151, "Person_Name": "Gandalf", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 101341, "Person_Name": "Sam", "Room_ID": 1643, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 101754, "Person_Name": "%$#^", "Room_ID": 1645, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-05-27", "Reservation_End": "2019-07-15", "isBefore": true, "isAfter": false },
  { "Person_ID": 109175, "Person_Name": "^%$#", "Room_ID": 1646, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-15", "isBefore": false, "isAfter": false },
  { "Person_ID": 234357, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482603, "Person_Name": "Bob Ross", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-05-28", "Reservation_End": "2019-06-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482670, "Person_Name": "Rob Boss", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 216769, "Person_Name": "George Washingtonestburgermeister-meisterburger", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-12", "Reservation_End": "2019-06-13", "isBefore": false, "isAfter": false },
  { "Person_ID": 481167, "Person_Name": "Suleiman", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-08-01", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": true },
  { "Person_ID": 483275, "Person_Name": "Ghandi", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-02", "Reservation_End": "2019-08-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 231197, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-07-05", "Reservation_End": "2019-07-08", "isBefore": false, "isAfter": false },
  { "Person_ID": 481170, "Person_Name": "Sauron", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 484176, "Person_Name": "Saruman", "Room_ID": 1648, "Reservation_Color": "#ff00ff", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": false }
];

/**
  Creates a room container for every room listed and labels it
  Organizes each room's Res_Group into rows of reservations
  @param {Room[]} rooms - Array of room objects with room attributes
  @param {$(string)} grid - jQuery element in which to place the rooms in
**/
function createRooms(rooms, grid) {
  $.each(rooms, function (idx, obj) {
    var gridIndex = idx + 2;
    var nextIndex = gridIndex + 1;

    var numDiv = $('<div class="roomNum container card border-secondary" id="' + obj.Room_ID + '" style="grid-column: 1; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"><div class="numText fixed-left">' + obj.Room_Number + '</div></div>');
    grid.append(numDiv);

    var roomDiv = $('<div class="room card border-success" id="room' + obj.Room_ID + '" style="grid-column: 2; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"></div>');
    grid.append(roomDiv);

    // Organizes each room's reservations
    // into rows using a room's Res_Group
    $.each(reservations, function (idx2, obj2) {
      if (obj.Room_ID === obj2.Room_ID) {
        var placed = false;
        var index = 0;
        while (!placed) {
          if (obj.Res_Group[index] === undefined) {
            obj.Res_Group[index] = [];
            obj.Res_Group[index].push(obj2);
            placed = true;
          } else {
            var isSpace = true;
            var oneStart = moment(obj2.Reservation_Start);
            var oneEnd = moment(obj2.Reservation_End);
            for (var i = 0; i < obj.Res_Group[index].length; i++) {
              var twoStart = moment(obj.Res_Group[index][i].Reservation_Start);
              var twoEnd = moment(obj.Res_Group[index][i].Reservation_End);
              if (!(oneEnd.isBefore(twoStart) || oneStart.isAfter(twoEnd))) {
                isSpace = false;
              }
            }
            if (!isSpace) {
              index++;
            } else {
              obj.Res_Group[index].push(obj2);
              placed = true;
            }
          }
        }
      }
    });
  });
};

/**
  Calculates the youngest and oldest start/end dates
  @param {Reservation[]} reservations - Array of res objects with res attributes
  @return {string[]} - The smallest and greatest date values
**/
function calculateEnds(reservations) {
  var smallestDate;
  var greatestDate;

  $.each(reservations, function (idx, obj) {
    // Calculates the oldest and youngest dates of residents
    var startDate = obj.Reservation_Start;
    if (idx === 0) {
      smallestDate = startDate;
    } else if (startDate < smallestDate) {
      smallestDate = startDate;
    }
    var endDate = obj.Reservation_End;
    if (idx === 0) {
      greatestDate = endDate
    } else if (endDate > greatestDate) {
      greatestDate = endDate;
    }
  });

  return [smallestDate, greatestDate];
};

/**
  Writes a label for every day that a resident is in a room
  @param {string} smallestDate - The smallest date value to display
  @param {string} greatestDate - The greatest date value to display
  @param {$(string)} grid - jQuery element in which to place the rooms in
  @return {number} - The last column a dateDiv is in
**/
function createDates(smallestDate, greatestDate, grid) {
  var smallestDate = moment(smallestDate);
  var greatestDate = moment(greatestDate);

  // Converts the oldest/youngest dates into an Array
  // of every day in between them
  range = moment.range(smallestDate, greatestDate);
  dates = Array.from(range.by('days')).map(m => m.format("YYYY-MM-DD"));
  days = Array.from(range.by('days')).map(m => m.format("DD"));

  $.each(dates, function (idx, obj) {
    var gridIndex = idx + 2;
    var day = days[idx];
    var dateDiv = dateDiv = $('<div class="dateDiv card border-secondary" id="' + obj + '" style="grid-column:' +
      gridIndex + '; grid-row: 1;">' + day + '</div>');
    if (day === "01") {
      day = dates[idx].substring(5, 7) + "-" + day;
      dateDiv = $('<div class="dateDiv firstDays card border-secondary" id="' + obj + '" style="grid-column:' +
        gridIndex + '; grid-row: 1;">' + day + '</div>');
    }
    grid.append(dateDiv);
  });

  // Ends room rows at the last reservation date
  var lastColumn = dates.length + 2;
  $(".room").css("grid-column", '2 / ' + lastColumn + '');
  return lastColumn;
};

/**
  Creates reservation divs
  and places them in their corresponding
  row and columns
  @param {Room[]} rooms - Array of room objects with room attributes
  @param {number} lastColumn - The last column a dateDiv is in
**/
function createRes(rooms, lastColumn) {
  $.each(rooms, function (idx, obj) {
    for (var i = 0; i < obj.Res_Group.length; i++) {
      for (var j = 0; j < obj.Res_Group[i].length; j++) {
        var currentRes = obj.Res_Group[i][j];
        var startCol = parseInt($("#" + currentRes.Reservation_Start).css("grid-column-start")) - 1;
        var endCol = parseInt($("#" + currentRes.Reservation_End).css("grid-column-start"));
        var row = i + 1;
        var resDiv = $('<div class="reservation card badge-primary" id="res' + currentRes.Person_ID +
          '" data-toggle="tooltip" data-placement="auto" title="' + currentRes.Person_Name +
          '" style="grid-column: ' + startCol + ' / ' + endCol + '; grid-row: ' + row + ';">' +
          currentRes.Person_Name + '</div>');

        $("#room" + currentRes.Room_ID).append(resDiv);

        // Append triangles to the reservation if the start
        // or end date is beyond the time constraint
        if (currentRes.isBefore) {
          var triEnd = startCol + 1;
          var leftTriangle = $('<div class="arrow-left" data-toggle="tooltip" data-placement="auto"' +
          'title="Starts before" style="grid-column: ' + startCol + ' / ' +
            triEnd + '; grid-row: ' + row + ';"></div>');
          $("#room" + currentRes.Room_ID).append(leftTriangle);
          $("#res" + currentRes.Person_ID).css("left", "15px");
          $("#res" + currentRes.Person_ID).css("width", "-=15");
        } else if (currentRes.isAfter) {
          var triStart = endCol - 1;
          var rightTriangle = $('<div class="arrow-right" data-toggle="tooltip" data-placement="auto"' +
          'title="Ends after" style="grid-column: ' + triStart + ' / ' +
            endCol + '; grid-row: ' + row + ';"></div>');
          $("#room" + currentRes.Room_ID).append(rightTriangle);
          $("#res" + currentRes.Person_ID).css("width", "-=15");
        } else if ((endCol + 1) === lastColumn) {
          $("#res" + currentRes.Person_ID).css("width", "-=15");
        }
      }
    }
  });
};

/**
  Build Calendar
**/
$(function () {
  createRooms(rooms, $(".grid_box"));
  var dateEnds = calculateEnds(reservations);
  var lastColumn = createDates(dateEnds[0], dateEnds[1], $(".grid_box"));
  createRes(rooms, lastColumn);

  $(window).scroll(function(event) {
    var leftPx = $(window).scrollLeft();
    console.log(leftPx);
    $(".roomNum").css("left", leftPx);

    var topPx = $(window).scrollTop();
    $(".dateDiv").css("top", topPx);

    /*
    $.each(reservations, function(idx, obj) {
      var res = $("#res" + obj.Person_ID);
      if(res.position().left <= leftPx) {
        res.css("left", leftPx);
      }
    });
    */


  });
});
