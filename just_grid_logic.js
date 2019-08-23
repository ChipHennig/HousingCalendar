/*
just_grid_logic

Displays a calendar based on rooms and their reservations
in a dormitory/other residence building.

This script takes two data structures:
  Rooms, with attributes
  - string, Room_ID
  - string, Building_ID
  - string, Room_Number
  - reservation[][], Res_Group (starts empty)
   **First index of Res_Group corresponds to rows
   **Second index is each reservation in that row

  Reservations, with attributes
  - string, Person_ID
  - string, Person_Name
  - string, Room_ID
  - string (#ffffff), Reservation_Color -> (not yet implemented)
  - string (YYYY-MM-DD), Reservation_Start
  - string (YYYY-MM-DD), Reservation_End
  - boolean, isBefore -> (Reservation_Start is before a desired time constraint)
  - boolean, isAfter -> (Reservation_End is after a desired time constraint)

These are used to build a calendar with rectangle room elements that contain
rectangle reservation elements for every resident staying in the room.

The reservations elements' length and location on the calendar
correspond with the time period of the reservation.

*/

// Imports moment-range to be used for the calendar dateDivs
window['moment-range'].extendMoment(moment);

// Test data
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

// Test data
var reservations = [
  { "Person_ID": 598412, "Person_Name": "John Doe", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102938, "Person_Name": "George", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109283, "Person_Name": "Frodo", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 598482, "Person_Name": "Aragorn", "Room_ID": 1643, "Reservation_Color": "#f57900", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102978, "Person_Name": "Gandalf", "Room_ID": 1643, "Reservation_Color": "#73d216", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109293, "Person_Name": "Sam", "Room_ID": 1643, "Reservation_Color": "#cc0000", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 102983, "Person_Name": "%$#^", "Room_ID": 1645, "Reservation_Color": "#75507b", "Reservation_Start": "2019-05-27", "Reservation_End": "2019-07-15", "isBefore": true, "isAfter": false },
  { "Person_ID": 109348, "Person_Name": "^%$#", "Room_ID": 1646, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-15", "isBefore": false, "isAfter": false },
  { "Person_ID": 234985, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#75507b", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482346, "Person_Name": "Bob Ross", "Room_ID": 1648, "Reservation_Color": "#f57900", "Reservation_Start": "2019-05-28", "Reservation_End": "2019-06-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482421, "Person_Name": "Rob Boss", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 216425, "Person_Name": "George Washington", "Room_ID": 1647, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-12", "Reservation_End": "2019-06-13", "isBefore": false, "isAfter": false },
  { "Person_ID": 481856, "Person_Name": "Suleiman", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-08-01", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": true },
  { "Person_ID": 483751, "Person_Name": "Ghandi", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-07-02", "Reservation_End": "2019-08-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 231755, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#f57900", "Reservation_Start": "2019-07-05", "Reservation_End": "2019-07-08", "isBefore": false, "isAfter": false },
  { "Person_ID": 481746, "Person_Name": "Sauron", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 484681, "Person_Name": "Saruman", "Room_ID": 1648, "Reservation_Color": "#cc0000", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": false },
  { "Person_ID": 598161, "Person_Name": "John Doe", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 102342, "Person_Name": "George", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 109111, "Person_Name": "Frodo", "Room_ID": 1643, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 596234, "Person_Name": "Aragorn", "Room_ID": 1643, "Reservation_Color": "#73d216", "Reservation_Start": "2019-06-01", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 104151, "Person_Name": "Gandalf", "Room_ID": 1643, "Reservation_Color": "#f57900", "Reservation_Start": "2019-07-08", "Reservation_End": "2019-07-11", "isBefore": false, "isAfter": false },
  { "Person_ID": 101341, "Person_Name": "Sam", "Room_ID": 1643, "Reservation_Color": "#73d216", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 101754, "Person_Name": "%$#^", "Room_ID": 1645, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-05-27", "Reservation_End": "2019-07-15", "isBefore": true, "isAfter": false },
  { "Person_ID": 109175, "Person_Name": "^%$#", "Room_ID": 1646, "Reservation_Color": "#cc0000", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-15", "isBefore": false, "isAfter": false },
  { "Person_ID": 234357, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#73d216", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482603, "Person_Name": "Bob Ross", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-05-28", "Reservation_End": "2019-06-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 482670, "Person_Name": "Rob Boss", "Room_ID": 1648, "Reservation_Color": "#cc0000", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 216769, "Person_Name": "George Washingtonestburgermeister-meisterburger", "Room_ID": 1647, "Reservation_Color": "#75507b", "Reservation_Start": "2019-06-12", "Reservation_End": "2019-06-13", "isBefore": false, "isAfter": false },
  { "Person_ID": 481167, "Person_Name": "Suleiman", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-08-01", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": true },
  { "Person_ID": 483275, "Person_Name": "Ghandi", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-07-02", "Reservation_End": "2019-08-01", "isBefore": false, "isAfter": false },
  { "Person_ID": 231197, "Person_Name": "Bob Ross", "Room_ID": 1647, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-07-05", "Reservation_End": "2019-07-08", "isBefore": false, "isAfter": false },
  { "Person_ID": 481170, "Person_Name": "Sauron", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-07-12", "isBefore": false, "isAfter": false },
  { "Person_ID": 484176, "Person_Name": "Saruman", "Room_ID": 1648, "Reservation_Color": "#3465a4", "Reservation_Start": "2019-06-02", "Reservation_End": "2019-08-02", "isBefore": false, "isAfter": false }
];

/**
  createRooms Func

  Creates a room and a room number element
  for every room object
  @param {Room[]} rooms - Array of room objects
  @param {Reservation[]} reservations - Array of reservation objects
  @param {$(string)} grid - parent jQuery grid element
**/
function createRooms(rooms, reservations, grid) {
  $.each(rooms, function (idx, room) {
    var gridIndex = idx + 2;
    var nextIndex = gridIndex + 1;
    var numDiv = $('<div class="roomNum container card border-secondary" id="' + room.Room_ID + '" style="grid-column: 1; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"><div class="numText">' + room.Room_Number + '</div></div>');
    grid.append(numDiv);
    var roomDiv = $('<div class="room card border-secondary" id="room' + room.Room_ID + '" style="grid-column: 2; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"></div>');
    grid.append(roomDiv);

    sortReservations(idx, room);
  });
};

/**
  sortReservations Func

  Places each room's reservation objects
  into the room's Res_Group[][] attribute.
  Organizes the rooms to minimize white space.
  @param {number} idx - Index of room
  @param {Room} room - Room object
**/
function sortReservations(idx, room) {
  $.each(reservations, function (idx2, res) {
    if (room.Room_ID === res.Room_ID) {
      var placed = false;
      var index = 0;
      while (!placed) {
        if (room.Res_Group[index] === undefined) {
          room.Res_Group[index] = [];
          room.Res_Group[index].push(res);
          placed = true;
        } else {
          var spaceAvailable = true;
          var oneStart = moment(res.Reservation_Start);
          var oneEnd = moment(res.Reservation_End);
          for (var i = 0; i < room.Res_Group[index].length; i++) {
            var twoStart = moment(room.Res_Group[index][i].Reservation_Start);
            var twoEnd = moment(room.Res_Group[index][i].Reservation_End);
            if (!(oneEnd.isBefore(twoStart) || oneStart.isAfter(twoEnd))) {
              spaceAvailable = false;
            }
          }
          if (!spaceAvailable) {
            index++;
          } else {
            room.Res_Group[index].push(res);
            placed = true;
          }
        }
      }
    }
  });
}

/**
  calculateEnds Func

  Calculates the youngest and oldest
  reservation start/end dates
  @param {Reservation[]} reservations - Array of reservation objects
  @return {string[]} - The smallest and greatest date values
**/
function calculateEnds(reservations) {
  var smallestDate;
  var greatestDate;
  $.each(reservations, function (idx, res) {
    var startDate = res.Reservation_Start;
    if (idx === 0) {
      smallestDate = startDate;
    } else if (startDate < smallestDate) {
      smallestDate = startDate;
    }
    var endDate = res.Reservation_End;
    if (idx === 0) {
      greatestDate = endDate
    } else if (endDate > greatestDate) {
      greatestDate = endDate;
    }
  });

  return [smallestDate, greatestDate];
};

/**
  createDates Func

  Creates a dateDiv element for
  every day that a resident is in a room
  @param {string} smallestDate - Smallest date
  @param {string} greatestDate - Greatest date
  @param {$(string)} grid - parent jQuery grid element
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
  createRes Func

  Creates reservation elements as
  children of their room elements
  @param {Room[]} rooms - Array of room objects
  @param {number} lastColumn - The last column a dateDiv is in
  @param {number} triangleWidth - Triangle width
**/
function createRes(rooms, lastColumn, triangleWidth) {
  $.each(rooms, function (idx, room) {
    for (var i = 0; i < room.Res_Group.length; i++) {
      for (var j = 0; j < room.Res_Group[i].length; j++) {
        var currentRes = room.Res_Group[i][j];
        var startCol = parseInt($("#" + currentRes.Reservation_Start).css("grid-column-start")) - 1;
        var endCol = parseInt($("#" + currentRes.Reservation_End).css("grid-column-start"));
        var row = i + 1;
        var resDiv = $('<div class="reservation card text-light" id="res' + currentRes.Person_ID +
          '" data-toggle="tooltip" data-placement="auto" title="' + currentRes.Person_Name +
          '" style="grid-column: ' + startCol + ' / ' + endCol + '; grid-row: ' +
          row + '; height: ' + (triangleWidth * 2) + 'px; background-color: ' + currentRes.Reservation_Color +
          '">' + currentRes.Person_Name + '</div>');
        $("#room" + currentRes.Room_ID).append(resDiv);
        if(currentRes.isBefore || currentRes.isAfter) {
          createTriangles(currentRes, triangleWidth, startCol, endCol, row);
        }
      }
    }
  });

  triangleBorders(triangleWidth);
};

/**
  createTriangles Func

  Appends triangles to a reservation if its start
  or end date is beyond the time constraint
  @param {Reservation} currentRes - Reservation object
  @param {number} triangleWidth - Triangle width
  @param {number} startCol - First grid column
  @param {number} endCol - Last grid column
  @param {number} row - Current row
**/
function createTriangles(currentRes, triangleWidth, startCol, endCol, row) {
  var triangle = 0;
  if (currentRes.isBefore) {
    var triEnd = startCol + 1;
    triangle = $('<div class="arrow-left" data-toggle="tooltip" data-placement="auto"' +
    'title="Starts before" style="grid-column: ' + startCol + ' / ' +
      triEnd + '; grid-row: ' + row + ';"></div>');
    $("#res" + currentRes.Person_ID).css("left", triangleWidth);
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  } else if (currentRes.isAfter) {
    var triStart = endCol - 1;
    triangle = $('<div class="arrow-right" data-toggle="tooltip" data-placement="auto"' +
    'title="Ends after" style="grid-column: ' + triStart + ' / ' +
      endCol + '; grid-row: ' + row + ';"></div>');
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  } else if ((endCol + 1) === lastColumn) {
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  }
  // Uncomment for matching triangle colors instead of black
  // triangle.css("color", currentRes.Reservation_Color);
  $("#room" + currentRes.Room_ID).append(triangle);
}

/**
  triangleBorders Func

  Edits the dimensions of the arrow classes
  to make the triangle elements proportional
  @param {number} triangleWidth - Triangle width
**/
function triangleBorders(triangleWidth) {
  var borders = ["border-right", "border-left", "border-top", "border-bottom"];
  $.each(borders, function(idx, border) {
    if(idx === 0) {
      $(".arrow-left").css(border, triangleWidth + "px solid ");
    } else if(idx != 1) {
      $(".arrow-left").css(border, triangleWidth + "px solid transparent");
    }
    if(idx === 1) {
      $(".arrow-right").css(border, triangleWidth + "px solid ");
    } else if(idx != 0) {
      $(".arrow-right").css(border, triangleWidth + "px solid transparent");
    }
  });
}

/**
  setSizes Func

  Sets the size styles of elements
  based on the editor's preference
  @param {$(string)} windowObj - The element that will contain the calendar
  @param {number} columns - The number of column to include in the window
  @param {$(string)} grid - parent jQuery grid element
  @return {number} - Triangle width
**/
function setSizes(windowObj, columns, grid) {
  var columnWidth = windowObj.width() / columns;
  var reservationHeight = columnWidth * (3 / 8);
  var triangleWidth = reservationHeight / 2;
  grid.css("grid-auto-columns", columnWidth);
  $(".room").css("grid-auto-columns", columnWidth);
  $(".dateDiv").css("width", columnWidth);

  return triangleWidth;
}

/**
  Build Calendar

  Calls all necessary functions to
  build the HTML Housing Calendar
**/
$(function () {
  // HTML parent element with display: grid
  // This element is from "just_grid.html"
  var grid = $(".grid_box");
  // Parent object the grid_box element will be built in
  var windowObj = $(window);

  createRooms(rooms, reservations, grid);
  var dateEnds = calculateEnds(reservations);
  var lastColumn = createDates(dateEnds[0], dateEnds[1], grid);
  var triangleWidth = setSizes(windowObj, 20, grid);
  createRes(rooms, lastColumn, triangleWidth);

  windowObj.scroll(function(event) {
    var leftPx = windowObj.scrollLeft();
    $(".roomNum").css("left", leftPx);
    var topPx = windowObj.scrollTop();
    $(".dateDiv").css("top", topPx);

    // Implement scrolling of names on reservation elements?
    // Below method does not function with CSS grid well
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
