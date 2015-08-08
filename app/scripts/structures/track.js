var React = require('react'),
    Router = require('react-router'),
    SoundCloud = require('../services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("../ui/Progress"),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = Track = React.createClass({
  scPlayer: {},
  easing: this.easing,
  animDuration: 1000,
  trackAssets: {},
  $elem: {},
  getInitialState: function() {
    return {
      duration: 0,
      track_id: '',
      track_number: '00',
      track_assets: []
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
      // self.refs.progress.getDuration(result.duration, player);
    });
  },
  componentWillAppear: function(callback) {
    setTimeout(callback, 500);
  },
  componentDidAppear: function() {
    var self = this;

    setTimeout(function() {
      self.animateTrackElements();
    }, 1000);
  },
  componentWillEnter: function(callback) {
    var self = this;

    if (this.props.getDirection() > 0) {
      this.$elem.velocity({
          translateZ: 0,
          translateX: [0, '100%']
      }, {
        easing: this.easing,
        duration: this.animDuration,
        complete: function(elements) {
          callback();
          self.animateTrackElements();
        }
      });
    } else {
      this.$elem.velocity({
          translateZ: 0,
          translateX: [0, '-100%']
      }, {
        easing: this.easing,
        duration: this.animDuration,
        complete: function(elements) {
          callback();
          self.animateTrackElements();
        }
      });
    }
  },
  animateTrackElements: function() {
    var $animatedElem = this.$elem.find('.js-to-animate'),
        animatedElemLength = $animatedElem.length,
        self = this;

    $('html').scrollTop(0);
    console.log('hello');

    this.$elem.find('.track-content').packery({
      itemSelector: '.grid-item',
      gutter: 250
    });

    $animatedElem.each(function(index) {
      var $this = $(this);

      if ($this.hasClass('fade-in')) {
        $this.velocity({
          opacity: 1.0
        }, {
          easing: this.easing,
          duration: this.animDuration,
          delay: index * 1000,
          complete: function() {
            if (index === 3) {
              var is_scrollDown  = true,
                  scrollSpeed    = 1,
                  scrollDelay    = 100;

              function autoScroll(){
                if ( is_scrollDown )
                  window.scrollBy(0,scrollSpeed);
                else
                  window.scrollBy(0,-scrollSpeed);
              }
              $(window).on('mousewheel', function(event) {
                if(event.deltaY > 0)
                  is_scrollDown  = false;
                else
                  is_scrollDown  = true;
              });

              var scrollInterval = setInterval(autoScroll, scrollDelay);

              $(window).trigger('hashchange');
              window.JHJMeta.player.play();
            }
          }
        });
      }
    });
  },
  componentDidEnter: function() {

  },
  componentWillLeave: function(callback) {
    if (this.props.getDirection() > 0) {
      this.$elem.velocity({
          translateZ: 0,
          translateX: ['-100%', 0]
      }, {
        easing: this.easing,
        duration: this.animDuration,
        complete: function(elements) {
          callback();
        }
      });
    } else {
      this.$elem.velocity({
          translateZ: 0,
          translateX: ['100%', 0]
      }, {
        easing: this.easing,
        duration: this.animDuration,
        complete: function(elements) {
          callback();
        }
      });
    }
  },
  componentDidLeave: function() {
    // console.log('Did Leave');
  },
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
  },
  getTrackAssets: function() {
    var deferred = $.Deferred();

    if (window.JHJMeta.tracks[window.JHJMeta.currentTrack]) {
      $.get(window.JHJMeta.tracks[window.JHJMeta.currentTrack].folder + '/track-config.json', function(result) {
        deferred.resolve(result);
      });  
    }
    

    return deferred.promise();
  },
  render: function () {
    var track_elements;

    if (this.track_assets) {
      track_elements = this.track_assets.map(function(track_element, index) {
        return(
          <img className='grid-item js-to-animate fade-in' src={window.JHJMeta.tracks[window.JHJMeta.currentTrack].folder + '/' +  track_element.path}/>
        )
      });
    }

    return (
      <section className='track'>
        <header className='track-header'>
          <h1 className="track-name js-to-animate fade-in">{ this.state.track_id }</h1>
          <h2 className="site-name js-to-animate fade-in">JHJ</h2>
          <h3 className="track-number js-to-animate fade-in">{ this.state.track_number }</h3>
        </header>
        <section className='track-content'>
          {track_elements}
        </section>
      </section>
    );
  }
});