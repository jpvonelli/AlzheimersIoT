var data;

$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
    
    var req = new XMLHttpRequest();

    req.open('GET', 'http://8887eddd.ngrok.io/api/gps', true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            console.log(req.responseText);
        }
    };
    req.setRequestHeader('Accept', 'application/json');
    req.send();

// Request info from API
    
// GPS
$.ajax({
        url: "http://8887eddd.ngrok.io/api/gps",
        dataType: 'json',
        data: data
    })
    .done(function(data) {
        console.log("Acquired GPS");
        console.log(data[0]);
        var numEntries = data.length;
        var lati = data[0].lat;
        var long = data[0].lon;
        var timeD = data[0].time;
        $(".gpsLat").html(lati);
        $(".gpsLon").html(long);
        $(".gpsTime").html(timeD);
        $(".gpsEntries").html(numEntries);
    })
    .fail(function(data) {
        console.log("Failed GPS Retrieval");
    });
    
// MMSE
$.ajax({
        url: "http://8887eddd.ngrok.io/api/memoryGame",
        dataType: 'json',
        data: data
    })
    .done(function(data) {
        console.log("Acquired MMSE");
        console.log(data[0]);
        latestMG = data[0];
        
    })
    .fail(function(data) {
        console.log("Failed MMSE Retrieval");
    });
    
// Journal
$.ajax({
        url: "http://8887eddd.ngrok.io/api/journal",
        dataType: 'json',
        data: data
    })
    .done(function(data) {
        console.log("Acquired Journal");
        console.log(data[0]);
        latestMG = data[0];
        
    })
    .fail(function(data) {
        console.log("Failed Journal Retrieval");
    });

});