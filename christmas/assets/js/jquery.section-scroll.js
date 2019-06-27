/*
 *  jQuery Section Scroll v1.0.0
 *
 *  Copyright (c) 2016 Danish Iqbal
 *  http://plugins.imdanishiqbal.com/section-scroll
 *
 *  Licensed under MIT
 *
 */
(function ($) {
    $.fn.sectionScroll = function (options) {
      var $parent_elem,
        $window,
        $section_elem,
        $bullets_class,
        settings = $.extend({
            bulletsClass: 'sections',
            sectionsClass: 'scrollable-section',
            scrollDuration: 1000,
            titles: true,
            topOffset: 0,
            easing: ''
        }, options);
      $parent_elem = this;
      $window = $(window);
      $section_elem = settings.sectionsClass;
      $bullets_class = settings.bulletsClass;

      if (!(settings.titles)) {
          $('.' + $bullets_class).find('span').remove();
      }

      var lastId,
          $bulletsMenuHeight = $('.' + $bullets_class).outerHeight() + 15,
          menuItems = $('.' + $bullets_class).find("li"),
          scrollItems = $(menuItems).map(function () {
              var item = $($(this).find('a').attr("href"));
              if ($(item).length) {
                  return item;
              }
          });


      menuItems.click(function (e) {

          var href = $(this).find('a').attr("href"),
              offsetTop = href === "#" ? 0 : $(href).offset().top-50;

          $('html, body').stop().animate({

              scrollTop: offsetTop - settings.topOffset
          }, settings.scrollDuration, settings.easing, function(){
              $parent_elem.trigger('scrolled-to-section').stop();
          });
          e.preventDefault();
      });

      $(document).ready(function () {
          $('html, body').stop().animate({
              scrollTop: 1
          }, 0);

          var fromTop = $(this).scrollTop();
          var cur = scrollItems.map(function () {
              if ($(this).offset().top < fromTop) return this;
          });
          cur = cur[cur.length - 1];
          var id = cur && cur.length ? cur[0].id : "";
          $.fn.sectionScroll.activeSection = cur;

          if (lastId !== id) {
              $('.' + $section_elem).removeClass('active-section');
              lastId = id;
              $parent_elem.trigger('section-reached');
              setTimeout(function () {

                  $(cur).addClass('active-section');
                  menuItems
                      .removeClass("active")
                      .end()
                      .find('a').filter("[href=#" + id + "]")
                      .parent()
                      .addClass("active");
              });
          }
      })
      $(window).scroll(function () {
          var fromTop = $(this).scrollTop() + ($window.height() / 2.5);

          var cur = scrollItems.map(function () {

              if ($(this).offset().top < fromTop) {

                  return this;
              }

          });
          cur = cur[cur.length - 1];
          var id = cur && cur.length ? cur[0].id : "";
          $.fn.sectionScroll.activeSection = cur;
          $activeSection = cur;
          if (lastId !== id) {
              $('.' + $section_elem).removeClass('active-section');
              lastId = id;
              $parent_elem.trigger('section-reached');
              setTimeout(function () {
                  $(cur).addClass('active-section');
                  menuItems
                      .removeClass("active")
                      .end()
                      .find('a').filter("[href=#" + id + "]")
                      .parent()
                      .addClass("active");
              });
          }
      });
      return $parent_elem;
    };



}(jQuery));
