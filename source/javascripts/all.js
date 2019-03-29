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
        app_id: "1604147083144211"
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
      title: "[data-title]"
    }
  });

  $("select[name='sort']").change(function(e) {
    var val = $(this).val();

    $(".projects").isotope({
      sortBy: val,
      itemSelector: '.project',
      sortAscending: sortAscending[val] || false
    });
  });
});
