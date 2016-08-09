$(document).ready(function(){
  $('.parallax').parallax();

  $('.new-search').hide();
  $('.new-search').on('click', function() {
    smoothScroll.animateScroll('#userInput');
    $('.new-search').hide();
  })

  $("#location").keyup(function(event){
    if(event.keyCode == 13){
        $("#getResults").click();
    }
  });

  $('form').submit(function(event){
    $('#display').empty();
    $('#dataContainer').empty();
    smoothScroll.animateScroll('#display');
    event.preventDefault();

    var artist = $("#artist").val();
    var location = $("#location").val();
    var url = 'https://cors-anywhere.herokuapp.com/https://api.bandsintown.com/artists/' + artist + '/events/recommended?location=' + location + '&radius=150&app_id=concertgen&api_version=2.0&format=json';

    $.get(url)
      .then(function (data){
        $('.new-search').show();
        $('#quote').hide();

        if (data === undefined || data.length === 0) {
          $('#dataContainer').append($('<p>', {'class': 'flow-text', text: "Unfortunately there are no upcoming shows related to " + artist + " near " + location}));
        }

        else {
          var $displayTitle = $('<p>').text('Concerts related to ' + artist + ' near ' + location + ':');
          $('#display').append($displayTitle)

          var $row = $('<div/>', {'class': 'row'})
          $('#dataContainer').append($row);

          for (var i =0; i < data.length; i++) {
            $($row).append(
              $('<div/>', {'class': 'col s12 m6 l4'}).append(
                $('<div/>', {'class': 'card large'}).append(
                  $('<div/>', {'class': 'card-image'}).append(
                    $('<img/>', {src: data[i].artists[0].thumb_url})
                  )
                )
                .append(
                  $('<div/>', {'class': 'card-content', 'style': 'overflow-y:scroll;'}).append(
                    $('<h6/>', {text: data[i].title})
                  )
                )
                .append(
                  $('<div/>', {'class': 'card-content'}).append(
                    $('<p/>', {text: data[i].formatted_datetime})
                  )
                )
                .append(
                  $('<div/>', {'class': 'card-action'}).append(
                    $('<a/>', {href: data[i].ticket_url, text: 'Tickets', 'target': '_blank'})
                  )
                )
              )
            )

          }
        }

      $('form')[0].reset();

      })
  })
});

    // .catch(function (error) {
    //   console.log('THIS IS AN ERROR');
    //   var $locErrMsg = $('<p>');
    //   $locErrMsg = $locErrMsg.text('We\'re sorry, Bebop doesn\'t recognize that location. Please try another location (ex. Denver, CO).');
    //   $locErrMsg = $locErrMsg.attr('class', 'flow-text');
    //   $('.errMsg').append($locErrMsg)
    // })



//TO DO
//location error message
//material card styling
//message when nothing is returned
//auto scroll to correct div


//STRETCH
//material card transition (more details?)
//link to music (spotify?)
//album art per artist, not event



  //"http://cors-anywhere.herokuapp.com/http://api.bandsintown.com/artists/houndmouth/events/recommended?location=Denver,Colorado&app_id=concertgen&api_version=2.0&format=json";

//OLD
// var $newOption = $("<h3>");
// var $dateDetails = $("<p>");
// var $image = $('<img>');
// var $btn = $()
// $newOption = $newOption.text(data[i].title);
// $newOption = $newOption.attr("val", data[i].title);
// $dateDetails = $dateDetails.text(data[i].formatted_datetime);
// $dateDetails = $dateDetails.attr("val", data[i].formatted_datetime);
// $image = $image.attr('src', data[i].artists[0].thumb_url);
// $image = $image.attr('val', 'artistImage');
// $('.card-content').append($image);
// $('.card-content').append($newOption);
// $('.card-content').append($dateDetails);
// $('.card-horizontal').show();
