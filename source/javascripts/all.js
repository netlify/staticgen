//= require "jquery"
//= require "jquery.flot"
//= require "jquery.flot.time"
//= require "jquery.isotope"
//= require "jquery.pin"
//= require "jquery.matchHeight"
//= require "share"
//= require_self

$(function() {
  var share = new Share("#share-button-top", {
    networks: {
      facebook: {
        app_id: "1604147083144211",
      }
    }
  });

  // This is a band-aid for the broken menu bar problem
  $(window).on('resize', function(){
    $('.navbar').attr('style', '').removeData('pin');
    $('.navbar').pin();
  });
  
  var sortAscending = {title: true};

  $(".projects").isotope({
    layoutMode: "fitRows",
    getSortData: {
      stars: "[data-stars] parseInt",
      forks: "[data-forks] parseInt",
      issues: "[data-issues] parseInt",
      language: "[data-language]",
      title: "[data-title]"
    }
  });

  $('.landing .card').matchHeight();

  $("select[name='filter']").change(function(e) {
    console.log("Filter by: %o", $(this).val());
    $(".projects").isotope({filter: $(this).val().replace(/^\.lang-\./, '.lang-')});
  });

  $("select[name='sort']").change(function(e) {
    var val = $(this).val();
    $(".projects").isotope({sortBy: val, sortAscending: sortAscending[val] || false});
  });
});
