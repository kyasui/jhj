(function ($, window, document, undefined) {
  var jhj = {
    init: function() {
      var BV = new $.BigVideo(),
          $video,
          touch = Modernizr.touch;

      BV.init();
      $video = $('#big-video-wrap');

      if (touch) {
        BV.show('images/landing-bg.jpg');
        $video.addClass('asset-loaded');
        jhj.animateIn();
      } else {
        BV.show([
          {
            type: 'video/mp4',
            src: 'videos/jhj_landing.mp4'
          },
          {
            type: 'video/webm',
            src: 'videos/jhj_landing.webmhd.webm'
          },
          {
            type: 'video/ogg',
            src: 'videos/jhj_landing.oggtheora.ogv'
          }
        ], {
          ambient: true,
          forceAutoplay: true,
          controls: false,
          doLoop: true
        });

        BV.getPlayer().on('loadeddata', function() {
          $video.addClass('asset-loaded');
          jhj.animateIn();
        });
      }
    },
    animateIn: function() {
      var $animated_elements = $('.fade-in');

      $animated_elements.each(function(index) {
        var $this = $(this);
        setTimeout(function() {
          $this.addClass('act');
        }, (index + 1) * 1000);
      });
    }
  };

  $(function() {
    jhj.init();
  });
})(jQuery, window, document);