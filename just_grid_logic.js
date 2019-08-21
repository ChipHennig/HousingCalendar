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
  createRooms Func

  Creates a room container for every room listed and labels it
  Organizes each room's Res_Group into rows of reservations
  @param {Room[]} rooms - Array of room objects with room attributes
  @param {Reservation[]} reservations - Array of res objects with res attributes
  @param {$(string)} grid - jQuery element to place the rooms in
**/
function createRooms(rooms, reservations, grid) {
  $.each(rooms, function (idx, room) {
    var gridIndex = idx + 2;
    var nextIndex = gridIndex + 1;
    var numDiv = $('<div class="roomNum container card border-secondary" id="' + room.Room_ID + '" style="grid-column: 1; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"><div class="numText">' + room.Room_Number + '</div></div>');
    grid.append(numDiv);
    var roomDiv = $('<div class="room card border-success" id="room' + room.Room_ID + '" style="grid-column: 2; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"></div>');
    grid.append(roomDiv);

    sortReservations(idx, room);
  });
};

/**
  sortReservations Func

  Organizes each room's reservations
  into rows using the room's Res_Group
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
          var isSpace = true;
          var oneStart = moment(res.Reservation_Start);
          var oneEnd = moment(res.Reservation_End);
          for (var i = 0; i < room.Res_Group[index].length; i++) {
            var twoStart = moment(room.Res_Group[index][i].Reservation_Start);
            var twoEnd = moment(room.Res_Group[index][i].Reservation_End);
            if (!(oneEnd.isBefore(twoStart) || oneStart.isAfter(twoEnd))) {
              isSpace = false;
            }
          }
          if (!isSpace) {
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

  Calculates the youngest and oldest start/end dates
  @param {Reservation[]} reservations - Array of res objects with res attributes
  @return {string[]} - The smallest and greatest date values
**/
function calculateEnds(reservations) {
  var smallestDate;
  var greatestDate;
  $.each(reservations, function (idx, res) {
    // Calculates the oldest and youngest dates of residents
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
  createRes Func

  Creates reservation divs
  and places them in their corresponding
  row and columns
  @param {Room[]} rooms - Array of room objects with room attributes
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
        var resDiv = $('<div class="reservation card badge-primary" id="res' + currentRes.Person_ID +
          '" data-toggle="tooltip" data-placement="auto" title="' + currentRes.Person_Name +
          '" style="grid-column: ' + startCol + ' / ' + endCol + '; grid-row: ' +
          row + '; height: ' + (triangleWidth * 2) + 'px;">' + currentRes.Person_Name + '</div>');
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

  Append triangles to the reservation if the start
  or end date is beyond the time constraint
  @param {Reservation} currentRes - Reservation object
  @param {number} triangleWidth - Triangle width
  @param {number} startCol - First grid column
  @param {number} endCol - Last grid column
  @param {number} row - Current row
**/
function createTriangles(currentRes, triangleWidth, startCol, endCol, row) {
  if (currentRes.isBefore) {
    var triEnd = startCol + 1;
    var leftTriangle = $('<div class="arrow-left" data-toggle="tooltip" data-placement="auto"' +
    'title="Starts before" style="grid-column: ' + startCol + ' / ' +
      triEnd + '; grid-row: ' + row + ';"></div>');
    $("#room" + currentRes.Room_ID).append(leftTriangle);
    $("#res" + currentRes.Person_ID).css("left", triangleWidth);
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  } else if (currentRes.isAfter) {
    var triStart = endCol - 1;
    var rightTriangle = $('<div class="arrow-right" data-toggle="tooltip" data-placement="auto"' +
    'title="Ends after" style="grid-column: ' + triStart + ' / ' +
      endCol + '; grid-row: ' + row + ';"></div>');
    $("#room" + currentRes.Room_ID).append(rightTriangle);
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  } else if ((endCol + 1) === lastColumn) {
    $("#res" + currentRes.Person_ID).css("width", "-=" + triangleWidth);
  }
}

/**
  triangleBorders Func

  Edits the dimensions of the arrow classes
  to make the triangle divs proportional
  @param {number} triangleWidth - Triangle width
**/
function triangleBorders(triangleWidth) {
  var borders = ["border-right", "border-left", "border-top", "border-bottom"];
  $.each(borders, function(idx, border) {
    if(idx === 0) {
      $(".arrow-left").css(border, triangleWidth + "px solid blue");
    } else if(idx != 1) {
      $(".arrow-left").css(border, triangleWidth + "px solid transparent");
    }
    if(idx === 1) {
      $(".arrow-right").css(border, triangleWidth + "px solid blue");
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
  @param {$(string)} grid - jQuery element in which to place the rooms in
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
  var grid = $(".grid_box");
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
