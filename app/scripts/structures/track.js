var React = require('react'),
    Router = require('react-router'),
    SoundCloud = require('../services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("../ui/Progress"),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = Track = React.createClass({
  scPlayer: {},
  easing: 'easeInOutCubic',
  animDuration: 1000,
  trackAssets: {},
  scrollInterval: {},
  $elem: {},
  $win: $(window),
  getInitialState: function() {
    return {
      duration: 0,
      track_id: '',
      track_number: '00',
      track_assets: [],
      winWidth: this.$win.outerWidth(),
      winHeight: this.$win.outerHeight()
    };
  },
  getTrackInfo: function(track, player) {
    var self = this;
    $.when(this.props.getTrack()).done(function(result, player) {
      track_number = window.JHJMeta.currentTrack.toString();

      self.setState({
        duration: result.duration,
        track_id: result.title,
        track_number : track_number.length > 1 ? track_number : '0' + track_number
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
        shiftIndex = 0;

        window.JHJMeta.player.stop();

        $animatedElem.velocity('finish').each(function(index) {
          var $this = $(this);


          if ($this.hasClass('shift-out')) {
            $this.velocity({
              translateZ: 0,
              translateX: orientation,
              translateY: $.Velocity.hook($this[0], 'translateY'),
              opacity: 0
            }, {
              easing: self.easing,
              delay: index * 50,
              duration: self.animDuration,
              complete: function(elem) {
                if (index === $animatedElem.length -1) {
                  setTimeout(function() {
                    callback();
                  }, 500);
                }
              }
            });

            shiftIndex++;
          } else if ($this.hasClass('fade-out')) {
            $this.velocity({
              opacity: 0
            }, {
              easing: self.easing,
              delay: index * 50,
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
        self = this,
        is_scrollDown  = false,
        scrollSpeed    = 1,
        scrollDelay    = 100;

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

    // Set the autoscroll interval to a component object so its accessible.
    self.scrollInterval = setInterval(autoScroll, scrollDelay);

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
      is_scrollDown = true;
      window.JHJMeta.player.play();
      self.$win.trigger('hashchange');

      self.$elem.css('transform', '')
      .find('.track-content')
      .imagesLoaded()
      .progress(function(instance, image) {
        console.log(image)
      }).always(function(instance) {
        $('.js-scrolling-element').each(function(index) {
          var $this = $(this);

          $this.velocity({
            opacity: 1.0
          }, {
            easing: self.easing,
            duration: self.animDuration,
            delay: (index + 1) * 500
          });
        });
      }).packery({
        itemSelector: '.grid-item',
        gutter: 50
      });

      callback();
    }, 1500);
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
        url: window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1].folder + '/track-config.json?=asdf',
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
        return(
          <img className={'grid-item js-to-animate-out js-scrolling-element fade-in shift-out' + (index % 3 ? ' skew' : '')} src={window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1].folder + '/' +  track_element.path}/>
        )
      });
    }

    return (
      <div className='track-container' style={{ width: this.state.winWidth + 'px' }}>
        <header className='track-header' style={{ height: this.state.winHeight + 'px' }}>
          <h1 className="track-name js-to-animate js-to-animate-out fade-in fade-out no-stagger">{ this.state.track_id }</h1>
          <h2 className="site-name js-to-animate js-to-animate-out fade-in shift-out no-stagger">EPISODES</h2>
          <h3 className="track-number js-to-animate js-to-animate-out fade-in shift-out no-stagger">{ this.state.track_number }</h3>
        </header>
        <section className='track'>
          <div className='track-meta' style={{ height: this.state.winHeight / 2 + 'px' }}>
          </div>
          <section className='track-content'>
            {track_elements}
          </section>
        </section>
      </div>
    );
  }
});