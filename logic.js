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
  {"Room_ID":1643, "Building_ID":"CO", "Room_Number":"100", "Res_Group":[] },
  {"Room_ID":1644, "Building_ID":"AU", "Room_Number":"102", "Res_Group":[] },
  {"Room_ID":1645, "Building_ID":"SU", "Room_Number":"103", "Res_Group":[] },
  {"Room_ID":1646, "Building_ID":"SU", "Room_Number":"105", "Res_Group":[] },
  {"Room_ID":1647, "Building_ID":"CE", "Room_Number":"421", "Res_Group":[] },
  {"Room_ID":1648, "Building_ID":"CE", "Room_Number":"321", "Res_Group":[] },
  {"Room_ID":1649, "Building_ID":"CO", "Room_Number":"244", "Res_Group":[] },
  {"Room_ID":1650, "Building_ID":"SU", "Room_Number":"276", "Res_Group":[] }
];

var reservations = [
  {"Person_ID":598412, "Person_Name":"John Doe", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-01", "Reservation_End":"2019-07-01"},
  {"Person_ID":102938, "Person_Name":"George", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-07-08", "Reservation_End":"2019-07-11"},
  {"Person_ID":109283, "Person_Name":"Frodo", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":598482, "Person_Name":"Aragorn", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-01", "Reservation_End":"2019-07-01"},
  {"Person_ID":102978, "Person_Name":"Gandalf", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-07-08", "Reservation_End":"2019-07-11"},
  {"Person_ID":109293, "Person_Name":"Sam", "Room_ID":1643, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":102983, "Person_Name":"%$#^", "Room_ID":1645, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-05-27", "Reservation_End":"2019-07-15"},
  {"Person_ID":109348, "Person_Name":"^%$#", "Room_ID":1646, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":234985, "Person_Name":"Bob Ross", "Room_ID":1647, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":482346, "Person_Name":"Bob Ross", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-05-28", "Reservation_End":"2019-06-12"},
  {"Person_ID":482421, "Person_Name":"Rob Boss", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-01"},
  {"Person_ID":216425, "Person_Name":"George Washington", "Room_ID":1647, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-12", "Reservation_End":"2019-07-02"},
  {"Person_ID":481856, "Person_Name":"Suleiman", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-08-01", "Reservation_End":"2019-08-02"},
  {"Person_ID":483751, "Person_Name":"Ghandi", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-07-02", "Reservation_End":"2019-08-01"},
  {"Person_ID":231755, "Person_Name":"Bob Ross", "Room_ID":1647, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-07-05", "Reservation_End":"2019-07-08"},
  {"Person_ID":481746, "Person_Name":"Sauron", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":484681, "Person_Name":"Saruman", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-08-01"}
];

//

$(function() {

  /**
    Creates a room container for every room listed and labels it
    Organizes each room's Res_Group into rows of reservations
  **/
  $.each(rooms, function(idx, obj) {
    var gridIndex = idx + 2;
    var nextIndex = gridIndex + 1;
    var numDiv = $('<div class="num" id="' + obj.Room_ID + '" style="grid-column: 1; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';">' + obj.Room_Number + '</div>');

    $(".grid_box").append(numDiv);
    var roomDiv = $('<div class="room card" id="room' + obj.Room_ID + '" style="grid-column: 2; grid-row: ' +
      gridIndex + ' / ' + nextIndex + ';"></div>');

    $(".grid_box").append(roomDiv);

    // Organizes each room's reservations
    // into rows using a room's Res_Group
    $.each(reservations, function(idx2, obj2) {
      if(obj.Room_ID === obj2.Room_ID) {
        var placed = false;
        var index = 0;
        while(!placed) {
          if(obj.Res_Group[index] === undefined) {
            obj.Res_Group[index] = [];
            obj.Res_Group[index].push(obj2);
            placed = true;
          } else {
            var isSpace = true;
            var oneStart = moment(obj2.Reservation_Start);
            var oneEnd = moment(obj2.Reservation_End);
            for(var i = 0; i < obj.Res_Group[index].length; i++) {
              var twoStart = moment(obj.Res_Group[index][i].Reservation_Start);
              var twoEnd = moment(obj.Res_Group[index][i].Reservation_End);
              if(!(oneEnd.isBefore(twoStart) || oneStart.isAfter(twoEnd))) {
                isSpace = false;
              }
            }
            if(!isSpace) {
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

  var smallestDate = "0"
  var greatestDate = "0";

  /**
    Calculates the youngest and oldest start/end dates
  **/
  $.each(reservations, function(idx, obj) {
    // Calculates the oldest and youngest dates of residents
    var startDate = obj.Reservation_Start;
    if(idx === 0) {
      smallestDate = startDate;
    } else if(startDate < smallestDate) {
      smallestDate = startDate;
    }
    var endDate = obj.Reservation_End;
    if(endDate > greatestDate) {
      greatestDate = endDate;
    }
  });

  // Converts the oldest/youngest dates into an Array
  // of every day in between them
  var range = moment.range(moment(smallestDate), moment(greatestDate));
  var dates = Array.from(range.by('days')).map(m => m.format("YYYY-MM-DD"));
  var days = Array.from(range.by('days')).map(m => m.format("DD"));
  $("#month").text(moment(smallestDate).format("MMMM"));
  $("#year").text(moment(smallestDate).format("YYYY"));

  /**
    Writes a label for every day that a resident is in a room
  **/
  $.each(dates, function(idx, obj) {
    var gridIndex = idx + 2;
    var day = days[idx];
    var dateDiv = dateDiv = $('<div class="date" id="' + obj + '" style="grid-column:' +
      gridIndex + '; grid-row: 1; justify-self: center;">' + day + '</div>');
    if(day === "01") {
      day = dates[idx].substring(5, 7) + "-" + day;
      dateDiv = $('<div class="date firstDays" id="' + obj + '" style="grid-column:' +
        gridIndex + '; grid-row: 1; justify-self: center;">' + day + '</div>');
    }
    $(".grid_box").append(dateDiv);
  });

  var lastColumn = dates.length + 2;
  // Ends room rows at the last reservation date
  $(".room").css("grid-column", '2 / ' + lastColumn + '');

  /*
  Creates reservation divs
  and places them in their corresponding
  row and columns
  */
  $.each(rooms, function(idx, obj) {
    for(var i = 0; i < obj.Res_Group.length; i++) {
      for(var j = 0; j < obj.Res_Group[i].length; j++) {
        var currentRes = obj.Res_Group[i][j];
        var startCol = parseInt($("#" + currentRes.Reservation_Start).css("grid-column-start")) - 1;
        var endCol =  parseInt($("#" + currentRes.Reservation_End).css("grid-column-start"));
        var row = i + 1;
        var resDiv = $('<div class="reservation card" id="res' + currentRes.Person_ID +
          '" style="grid-column: ' + startCol + ' / ' + endCol + '; grid-row: ' + row + ';">' +
            currentRes.Person_Name + '</div>');
        $("#room" + currentRes.Room_ID).append(resDiv);
      }
    }
  });

  /**
    Update Month and year after scrolling
    past a threshold
  **/
  $(window).scroll(function() {
    $(".firstDays").each(function(idx, obj) {
      var found = false;
      var currentDay = $(obj);
      var date = currentDay.attr("id");
      if($(window).scrollLeft() < $($(".firstDays").get(0)).offset().left) {
        $("#month").text(moment(dates[0]).format("MMMM"));
        $("#year").text(moment(dates[0]).format("YYYY"));
      } else if($(window).scrollLeft() > currentDay.offset().left) {
        $("#month").text(moment(date).format("MMMM"));
        $("#year").text(moment(date).format("YYYY"));
        found = true;
      }
    });
  });

  /**
    Hide certain rooms depending on which menu button
    is clicked (Hide or remove??)
  **/
  function hideRooms(dormID) {
    //location.reload();
    $.each(rooms, function(idx, obj) {
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      if(obj.Building_ID != dormID) {
        room.hide();
        roomNum.hide();
      } else {
        room.show();
        roomNum.show();
      }
    });
  };

  $("#AU").click(function() {
    hideRooms("AU");
  });
  $("#CO").click(function() {
    hideRooms("CO");
  });
  $("#CE").click(function() {
    hideRooms("CE");
  });
  $("#SU").click(function() {
    hideRooms("SU");
  });
  $("#ALL").click(function() {
    $(".room").show();
    $(".num").show();
  });

  /**
  Search for a specific person name with a search form

  **/
  function hideRoomsName(name) {
    $.each(rooms, function(idx, obj) {
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      if(obj.Res_Group.length === 0) {
        room.hide();
        roomNum.hide();
      } else if(roomNum.text().includes(name)) {
        room.show();
        roomNum.show();
      } else {
        var inRes = false;
        for(var i = 0; i < obj.Res_Group.length; i++) {
          for(var j = 0; j < obj.Res_Group[i].length; j++) {
            if(obj.Res_Group[i][j] != undefined) {
              if(obj.Res_Group[i][j].Person_Name.includes(name)) {
                inRes = true;
              }
            }
          }
        }
        if(!inRes) {
          room.hide();
          roomNum.hide();
        } else {
          room.show();
          roomNum.show();
        }
      }
    });
  };

  /**
  Hide all rooms without reservations
  **/
  function hideEmptyRooms() {
    //location.reload();
    $.each(rooms, function(idx, obj) {
      var hasRes = false;
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      if(obj.Res_Group.length === 0) {
        room.hide();
        roomNum.hide();
      } else {
        room.show();
        roomNum.show();
      }
    });
  };

  /**
  Hide all rooms with reservations
  **/
  function hideFilledRooms() {
    //location.reload();
    $.each(rooms, function(idx, obj) {
      var hasRes = false;
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      if(obj.Res_Group.length !== 0) {
        room.hide();
        roomNum.hide();
      } else {
        room.show();
        roomNum.show();
      }
    });
  };

  $("#searchButton").click(function() {
    hideRoomsName($("#searchText").val());
  });

  $("#yes").click(function() {
    $(".room").show();
    $(".num").show();
  });

  $("#no").click(function() {
    hideEmptyRooms();
  });

  $("#only").click(function() {
    hideFilledRooms();
  });

  $("#reset").click(function() {
    $(".room").show();
    $(".num").show();
  });


});
