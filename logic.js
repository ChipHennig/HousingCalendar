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
  {"Room_ID":1643, "Building_ID":"CO", "Room_Number":"100" },
  {"Room_ID":1644, "Building_ID":"AU", "Room_Number":"102" },
  {"Room_ID":1645, "Building_ID":"SU", "Room_Number":"103" },
  {"Room_ID":1646, "Building_ID":"SU", "Room_Number":"105" },
  {"Room_ID":1647, "Building_ID":"CE", "Room_Number":"421" },
  {"Room_ID":1648, "Building_ID":"CE", "Room_Number":"321" },
  {"Room_ID":1649, "Building_ID":"CO", "Room_Number":"244" },
  {"Room_ID":1650, "Building_ID":"SU", "Room_Number":"276" }
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
  {"Person_ID":487516, "Person_Name":"Bob Ross", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-07-12"},
  {"Person_ID":487511, "Person_Name":"Rob Boss", "Room_ID":1648, "Reservation_Color":"#ff00ff", "Reservation_Start":"2019-06-02", "Reservation_End":"2019-08-01"}
];

// 
var resGroup = {};

$(function() {
  /*
  An idea of adding a resGroup for each room??
  Prevents O(n^2) when re-spacing reservations

  $.each(rooms, function(idx, obj) {

    $.each(reservations, function(idx2, obj2) {
      if(obj2.Room_ID === obj.Room_ID) {
        reservations[idx2]
      }
    });
    obj.push(resGroup[idx]);
    console.log(obj);
  });
  */

  /**
    Creates a room container for every room listed and labels it
  **/
  $.each(rooms, function(idx, obj) {
    var gridIndex = idx + 2;
    var nextIndex = gridIndex + 1;
    var numDiv = $('<div class="num" id="' + obj.Room_ID + '" style="grid-column: 1; grid-row: ' + gridIndex + ' / ' + nextIndex + ';">' + obj.Room_Number + '</div>');
    $(".grid_box").append(numDiv);
    var roomDiv = $('<div class="room card" id="room' + obj.Room_ID + '" style="grid-column: 2; grid-row: ' + gridIndex + ' / ' + nextIndex + ';"></div>');
    $(".grid_box").append(roomDiv);
    resGroup.push([]);
    $.each(reservations, function(idx2, obj2) {
      if(obj.Room_ID === obj2.Room_ID) {
        resGroup[0].push(obj2);
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
    var dateDiv = dateDiv = $('<div class="date" id="' + obj + '" style="grid-column:' + gridIndex + '; grid-row: 1; justify-self: center;">' + day + '</div>');
    if(day === "01") {
      day = dates[idx].substring(5, 7) + "-" + day;
      dateDiv = $('<div class="date firstDays" id="' + obj + '" style="grid-column:' + gridIndex + '; grid-row: 1; justify-self: center;">' + day + '</div>');
    }
    $(".grid_box").append(dateDiv);
  });

  var lastColumn = dates.length + 2;
  // Ends room rows at the last reservation date
  $(".room").css("grid-column", '2 / ' + lastColumn + '');

  /*
  Creates reservation divs
  */
  $.each(reservations, function(idx, obj) {
    var startCol = parseInt($("#" + obj.Reservation_Start).css("grid-column-start")) - 1;
    var endCol =  parseInt($("#" + obj.Reservation_End).css("grid-column-start"));

    var resDiv = $('<div class="reservation card" id="res' + obj.Person_ID + '" style="grid-column: ' + startCol + ' / ' + endCol + '; grid-row: 1;">' + obj.Person_Name + '</div>');
    $("#room" + obj.Room_ID).append(resDiv);
  });

  /**
  Attempting to check if a reservation overlaps with
  another one

  It should move reservations to the next row if they overlap
  **/
  $.each(reservations, function(idx, obj) {
    // Shifts reservation location to its time interval location
    var startCol = parseInt($("#" + obj.Reservation_Start).css("grid-column-start")) - 1;
    var endCol =  parseInt($("#" + obj.Reservation_End).css("grid-column-start"));

    var rowNum =  parseInt($("#res" + obj.Person_ID).css("grid-row"));
    $.each(reservations, function(idx2, obj2) {
      if(idx2 !== idx) {
        var otherStart = parseInt($("#" + obj2.Reservation_Start).css("grid-column-start")) - 1;
        var otherEnd = parseInt($("#" + obj2.Reservation_End).css("grid-column-start"));
        var otherRow =  parseInt($("#res" + obj2.Person_ID).css("grid-row-start"));
        //console.log(otherStart);
        //console.log(otherEnd);
        console.log(otherRow);
        if(obj.Room_ID === obj2.Room_ID && !(endCol < otherStart || startCol > otherEnd
        || rowNum !== otherRow)) {
          console.log("Overlap!");
          rowNum++;
        }
      }
    });
    var resBar = $("#res" + obj.Person_ID);
    resBar.css("grid-row-start", rowNum);
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
  DOESN"T WORK RN
  **/
  function hideRoomsName(name) {
    //location.reload();
    $.each(rooms, function(idx, obj) {
      console.log(name);
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      var inRes = checkRes(obj, name);
      if(!inRes) {
        room.hide();
        roomNum.hide();
      } else {
        console.log("yes?");
        room.show();
        roomNum.show();
      }
    });
  };

  function checkRes(room, name) {
    $.each(reservations, function(idx, obj) {
      console.log(name);
      if(room.Room_ID === obj.Room_ID && obj.Person_Name === name) {
        console.log("yes");
        return true;
      }
    });
    return false;
  }

  /**
  Hide all rooms without reservations
  **/
  function hideEmptyRooms() {
    //location.reload();
    $.each(rooms, function(idx, obj) {
      var hasRes = false;
      var room = $("#room" + obj.Room_ID);
      var roomNum = $("#" + obj.Room_ID);
      $.each(reservations, function(idx2, obj2) {
        if(obj2.Room_ID === obj.Room_ID) {
          hasRes = true;
        }
      });
      if(!hasRes) {
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
      $.each(reservations, function(idx2, obj2) {
        if(obj2.Room_ID === obj.Room_ID) {
          hasRes = true;
        }
      });
      if(hasRes) {
        room.hide();
        roomNum.hide();
      } else {
        room.show();
        roomNum.show();
      }
    });
  };

  $("#searchForm").on("submit", function(e) {
    hideRoomsName($("#searchText").val());
  });

  $("#yes").click(function() {
    $(".room").show();
    $(".num").show();
  })

  $("#no").click(function() {
    hideEmptyRooms();
  })

  $("#only").click(function() {
    hideFilledRooms();
  })

});
