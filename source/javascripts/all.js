//= require "jquery"
//= require "jquery.flot"
//= require "jquery.flot.time"
//= require "jquery.isotope"
//= require_self

$(function() {
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

  $(".filters a").click(function(e) {
    e.preventDefault();

    $(".filters li").removeClass("active");
    $(this).closest("li").addClass("active");
    $(".projects").isotope({filter: $(this).data("filter")});
  })
});
