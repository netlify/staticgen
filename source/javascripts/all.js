//= require "jquery"
//= require "jquery.flot"
//= require "jquery.flot.time"
//= require "jquery.isotope"
//= require "share"
//= require_self

$(function() {
  var share = new Share("#share-button-top", {
    networks: {
      facebook: {
        app_id: "200661259956061",
      }
    }
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

  $("select[name='filter']").change(function(e) {
    $(".projects").isotope({filter: $(this).val()});
  });

  $("select[name='sort']").change(function(e) {
    var val = $(this).val();
    $(".projects").isotope({sortBy: val, sortAscending: sortAscending[val] || false});
  });
});
