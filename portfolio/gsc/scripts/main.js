$(document.documentElement).addClass("js");

$(function(){

  // Projects elements

  var projectSection = $("#projects"),
      projects = projectSection.children(),
      previewLinks = $(".previews a"),

  // Common variables

      activeClass = "active",
      local = ".",

  // Supersizes

      footer = $("footer"),
      footerTooltips = footer.find("span:first-child"),
      hideClass = "hide",
      closeSupersizeLink = $(document.createElement("a"))
        .insertAfter(footer)
        .attr({
          href: local,
          id: "close"
        });

  previewLinks
    .click(function(){
      var $this = $(this),
          zoomIcon = $this.children(".button").children(),
          zoomIconName = /(\w+)\.\w+$/.exec(zoomIcon.attr("src"))[1],
          loaderIconName = "spinner",
          activeArrows = sliderArrows.filter("." + enabledClass);
      disableSliderArrow(activeArrows);
      zoomIcon.attr(
        "src", zoomIcon.attr("src").replace(zoomIconName, loaderIconName)
      );
      $(document.createElement("img"))
        .load(function(){
          closeSupersizeLink
            .append($(this))
            .addClass(activeClass);
          zoomIcon.attr(
            "src", zoomIcon.attr("src").replace(loaderIconName, zoomIconName)
          );
          footerTooltips.addClass(hideClass);
        })
        .attr({
          alt: "Close",
          src: $this.attr("href")
        });
      closeSupersizeLink.click(function(){
        enableSliderArrow(activeArrows);
        $(this).removeClass();
        window.setTimeout(
          function(){
            closeSupersizeLink.children().remove();
          }, 200
        );
        footerTooltips.removeClass(hideClass);
        return false;
      });
      return false;
    })
    .children("img")
    .each(function(){
      var $this = $(this);
      $this.after(
        $(document.createElement("span"))
          .addClass("blur overlay")
          .append(
            $(document.createElement("img")).attr({
              alt:"",
              src: $this.attr("src").replace("default","blurs")
            })
          )
      );
    });

  // Nav

  var nav = $("nav"),
      navLinks = nav.find("a"),
      totalProjects = projects.length,
      projectWidth = projects.width();

  nav.append($(document.createElement("span")).addClass("active_arrow"));

  var activeArrow = nav.children("span"),
      activeArrowCenter = parseInt(
        navLinks.eq(0).parent().width() / 2 - activeArrow.width() / 2
      ),
      hoveredClass = "hovered",
      bwClass = "bw",
      enableSliderArrow = function(elt){
        elt.addClass(enabledClass).attr("href",local);
      },
      disableSliderArrow = function(elt){
        elt.removeClass(enabledClass).removeAttr("href");
      };

  navLinks
    .eq(0)
      .addClass(activeClass)
    .end()
    .each(function(){
      var $this = $(this);
      $this
        .prepend(
          $(document.createElement("img")).attr({
            alt: "",
            src: $this.children("img").attr("src").replace("default",bwClass)
          })
        )
        .prepend($(document.createElement("span")).addClass("halo"))
        .prepend($(document.createElement("span")).addClass("active_bg"))
        .click(function(){
          if(!$this.is("." + activeClass)) {
            var clickedLinkIndex = navLinks.index(this);
            projectSection
              .css("margin-left", "-" + clickedLinkIndex * projectWidth + "px");
            navLinks
              .filter("." + activeClass)
              .removeClass(activeClass);
            $this
              .removeClass(hoveredClass)
              .addClass(activeClass);
            activeArrow
              .css("left", $this.position().left + activeArrowCenter);
            if(clickedLinkIndex != 0)
              enableSliderArrow(leftSliderArrow);
            if(clickedLinkIndex == 0)
              disableSliderArrow(leftSliderArrow);
            if(clickedLinkIndex+1 != totalProjects)
              enableSliderArrow(rightSliderArrow);
            if(clickedLinkIndex+1 == totalProjects)
              disableSliderArrow(rightSliderArrow);
          }
          return false;
        })
        .hover(
          function(){
            if(!$this.is("." + activeClass)) {
              navLinks.not($this).addClass(bwClass);
              $this.addClass(hoveredClass);
            }
          },
          function(){
            navLinks.removeClass(hoveredClass).removeClass(bwClass);
          }
        );
    });

  projectSection
    .width(totalProjects * projectWidth)
    .wrap($(document.createElement("div")).attr("id","projectsWrap"));

  for(var i=0; i < 2; i++) {
    $(document.createElement("span"))
      .addClass("borderMask")
      .insertAfter(projectSection);
  }

  // Slider

  var sliderArrowClass = "slider_arrow",
      leftClass = "left",
      rightClass = "right",
      enabledClass = "enabled";

  for(var i=0; i < 2; i++) {
    if(i==1) var leftLink = true;
    $(document.createElement("a"))
      .insertAfter(projectSection)
      .attr({
        href: local,
        className: "slider_arrow "
                   + (leftLink ? leftClass : rightClass + " " + enabledClass)
      })
      .click(function(){
        var activeLinkIndex = navLinks.index($("." + activeClass));
        navLinks
          .eq(
            $(this).is("." + leftClass) ? activeLinkIndex-1 : activeLinkIndex+1
          )
          .click();
        return false;
      })
      .append($(document.createElement("span")).addClass("circle"))
      .append($(document.createElement("span")).addClass("activeArrow"));
  }

  var sliderArrows = $("." + sliderArrowClass),
      leftSliderArrow = sliderArrows.filter("." + leftClass),
      rightSliderArrow = sliderArrows.filter("." + rightClass);

  // Thumbs

  projectSection.find("hgroup").each(function(){
    var $this = $(this);
    $this.after((function(){
      
      for(var i=1; i <= totalThumbs; i++) {
        $(document.createElement("li"))
          .append(
            $(document.createElement("a"))
              .attr({
                href: local,
                className: function(){
                  if(i==1) return activeClass;
                }
              })
              
              .click(function(){
                var $this = $(this),
                    imgNumber = /\d/.exec($this.children().attr("src"))[0],
                    activeSection = $this.closest("[id]");
                activeSection
                  .find(previewLinks.selector)
                  .removeClass()
                  .eq(imgNumber-1)
                  .addClass(activeClass);
                activeSection
                  .children("." + thumbListClass)
                  .find("." + activeClass)
                  .removeClass();
                $this.addClass(activeClass);
                return false;
              })
          )
          .appendTo(thumbList);
      }
      return thumbList;
    })());
  });

  previewLinks.each(function(){
    var $this = $(this);
    if($this.parent().is(":first-child"))
      $this.addClass(activeClass);
  });

});