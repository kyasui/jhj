var React = require('react'),
    Router = require('react-router'),
    SoundCloud = require('../services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("../ui/Progress"),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = Track = React.createClass({
  scPlayer: {},
  easing: '',
  animDuration: 1000,
  trackAssets: {},
  scrollInterval: {},
  comingSoon: '',
  $elem: {},
  $win: $(window),
  getInitialState: function() {
    return {
      duration: 0,
      track_id: '',
      track_number: '00',
      track_assets: [],
      winWidth: this.$win.outerWidth(),
      winHeight: this.$win.outerHeight(),
      comingSoon: ''
    };
  },
  getTrackInfo: function(track, player) {
    var self = this;
    $.when(this.props.getTrack()).done(function(result, player) {
      track_number = window.JHJMeta.currentTrack.toString();

      self.setState({
        duration: result.duration,
        track_id: result.title,
        track_number : track_number.length > 1 ? track_number : '0' + track_number,
        comingSoon: (window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live'] ? '' : 'Coming Soon')
      });
    });
  },
  componentWillAppear: function(callback) {
    var self = this;

    setTimeout(function() {
      self.animateTrackElements(callback);
    }, 1000);
  },
  componentDidAppear: function() {
  },
  componentWillEnter: function(callback) {
    var self = this,
        orientation = (this.props.getDirection() > 0) ? '100%' : '-100%';

    this.$elem.velocity({
        translateX: orientation
    }, {
      easing: self.easing,
      delay: 500,
      duration: self.animDuration,
      complete: function(elements) {
        self.animateTrackElements(callback);
      }
    });
  },
  animateOutTrackElements: function(direction, callback) {
    var $animatedElem = this.$elem.find('.js-to-animate-out'),
        self = this,
        orientation = (direction > 0) ? (this.state.winWidth * -1) + 'px' : this.state.winWidth + 'px';

        window.JHJMeta.player.stop();

        $animatedElem.each(function(index) {
          var $this = $(this);

          if ($this.hasClass('shift-out')) {
            $this.velocity('stop', true).velocity({
              translateZ: 0,
              translateX: orientation,
              translateY: $.Velocity.hook($this[0], 'translateY'),
              opacity: 0
            }, {
              easing: self.easing,
              duration: self.animDuration,
              delay: index * 50,
              complete: function(elem) {
                if (index === $animatedElem.length -1) {
                  setTimeout(function() {
                    callback();
                  }, 500);
                }
              }
            });

          } else if ($this.hasClass('fade-out')) {
            $this.velocity('stop', true).velocity({
              opacity: 0
            }, {
              easing: self.easing,
              duration: self.animDuration,
              complete: function(elem) {
                if (index === $animatedElem.length -1 ) {
                  setTimeout(function() {
                    callback();
                  }, 500);
                }
              }
            });
          }
        });
  },
  animateTrackElements: function(callback) {
    var $animatedElem = this.$elem.find('.js-to-animate'),
        animatedElemLength = $animatedElem.length,
        $animatedElemToFadeIn = this.$elem.find('.js-to-animate.fade-in'),
        self = this,
        is_scrollDown  = false,
        scrollSpeed    = 1,
        scrollDelay    = 34;

    if (window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live']) {
      // Set scroll pos to top.
      window.scroll(0, 0);

      function autoScroll(){
        if (is_scrollDown)
          window.scrollBy(0, scrollSpeed);
        else
          window.scrollBy(0, -scrollSpeed);
      }

      self.$win.on('mousewheel', function(event) {
        if(event.deltaY > 0)
          is_scrollDown  = false;
        else
          is_scrollDown  = true;
      });

      $('.track-progress-bar').velocity({
        opacity: 1.0
      }, {
        display: 'block',
        easing: self.easing,
        duration: self.animDuration
      });

      setTimeout(function() {
        var $scrollingElements = $('.js-scrolling-element'),
            $scrollingElementsToCount = $('.js-scrolling-element.count-load'),
            scrollElementsLength = $scrollingElementsToCount.length;

        self.$elem.css('transform', '')
        .find('.track-content')
        .imagesLoaded()
        .progress( function( instance, image ) {
          if(image.isLoaded) {
            $(image.img).addClass('loaded');

            var countLoadedImages = $('.js-scrolling-element.loaded').length,
                width = Math.ceil(100 * (countLoadedImages / scrollElementsLength)) + '%';

            $('.track-progress-number').html(width);
            $('.track-progress-bar-fill').css({
              'width': width
            });
          }
        })
        .always(function(instance) {
          $('.track-progress-bar').velocity({
              opacity: 0.0
            }, {
              display: 'none',
              easing: self.easing,
              duration: self.animDuration,
              complete: function() {
                is_scrollDown = true;

                // Set the autoscroll interval to a component object so its accessible.
                self.scrollInterval = setInterval(autoScroll, scrollDelay);
                window.JHJMeta.player.play();
                self.$win.trigger('hashchange');

                $animatedElemToFadeIn.velocity('finish').each(function(index) {
                  var $this = $(this);

                  $this.velocity({
                    opacity: 1.0
                  }, {
                    easing: self.easing,
                    duration: self.animDuration,
                    delay: 1000,
                    complete: function() {
                      $scrollingElements.each(function(index) {
                        var $this = $(this);

                        $this.velocity({
                          opacity: 1.0
                        }, {
                          easing: self.easing,
                          duration: self.animDuration,
                          delay: (index + 1) * 500
                        });
                      });
                    }
                  });
                });

                self.$elem.find('.track-content').packery({
                  itemSelector: '.grid-item',
                  gutter: 50
                });
              }
            });
        });

        callback();
      }, 1500);
    } else {
      $animatedElem.velocity('finish').each(function(index) {
        var $this = $(this);

        if ($this.hasClass('fade-in')) {
          $this.velocity({
            opacity: 1.0
          }, {
            easing: self.easing,
            duration: self.animDuration,
            delay: 1000
          });
        }
      });

      setTimeout(function() {
        self.$win.trigger('hashchange');
        self.$elem.css('transform', '');
        callback();
      }, 1000);
    }
  },
  componentDidEnter: function() {

  },
  componentWillLeave: function(callback) {
    var self = this,
        orientation = (self.props.getDirection() > 0) ? '-100%' : '100%';

    // Clear the autoscroll interval before page leaves.
    clearInterval(this.scrollInterval);

    this.animateOutTrackElements(self.props.getDirection(), callback);
  },
  componentDidLeave: function() {},
  componentDidMount: function() {
    var self = this;

    this.getTrackInfo();
    this.$elem = $(this.getDOMNode());

    window.JHJMeta.$track = this.$elem;

    $.when(this.getTrackAssets()).done(function(result) {
      if (result) {
        self.track_assets = result.assets;
      }
    });

    self.$win.resize(function() {
      self.setState({
        winHeight: self.$win.outerHeight(),
        winWidth: self.$win.outerWidth()
      });
    });
  },
  getTrackAssets: function() {
    var deferred = $.Deferred();

    if (window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]) {
      $.ajax({
        url: window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1].folder + '/track-config.json',
        cache: false,
        type: 'GET',
        success: function(result){
          deferred.resolve(result);
        }
      });
    }

    return deferred.promise();
  },
  render: function () {
    var track_elements;
    if (this.track_assets) {
      track_elements = this.track_assets.map(function(track_element, index) {
        if (track_element['asset-type'] === 'video') {
          return(
            <video style={{ 'width' : track_element['width'] + 'px' }} autoPlay='autoplay' loop className={'grid-item js-to-animate-out js-scrolling-element fade-in shift-out video-element'}>
              <source type='video/mp4' src={track_element.path}/>
            </video>
          )
        } else if (track_element['asset-type'] === 'text') {
          return (
            <div className={'grid-item js-to-animate-out js-scrolling-element fade-in shift-out text-element'}>
              <p>{ track_element.text_body }</p>
            </div>
          )
        } else {
          return(
            <img style={{ 'width' : track_element['width'] + 'px' }} className={'grid-item count-load js-to-animate-out js-scrolling-element fade-in shift-out'} src={window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1].folder + '/' +  track_element.path}/>
          )
        }
      });
    }

    return (
      <div className={ this.state.comingSoon ? 'track-container dead-track' : 'track-container' } style={{ width: this.state.winWidth + 'px' }}>
        <header className='track-header' style={{ height: this.state.winHeight + 'px' }}>
          <h1 className="track-name js-to-animate js-to-animate-out fade-in fade-out">
            { this.state.comingSoon ? this.state.comingSoon : this.state.track_id }
          </h1>
          <h2 className="site-name js-to-animate js-to-animate-out fade-in fade-out">EPISODES</h2>
          <h3 className="track-number js-to-animate js-to-animate-out fade-in fade-out">{ this.state.track_number }</h3>
          <div className="track-progress-bar">
            <div className="track-progress-bar-content">
              <h3 className="track-progress-label">Loading...</h3>
              <div className="track-progress-bar-holder">
                <div className="track-progress-bar-fill"></div>
              </div>
              <h3 className="track-progress-number">0%</h3>
            </div>
          </div>
        </header>
        <section className='track'>
          <div className='track-meta' style={{ height: this.state.winHeight * 0.4 + 'px' }}>
          </div>
          <section className='track-content'>
            {track_elements}
          </section>
        </section>
      </div>
    );
  }
});