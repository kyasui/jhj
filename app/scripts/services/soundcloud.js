'use strict';

var SoundCloud = {
  stream_url: '',
  getStream: function() {
    var deferred = $.Deferred();

    SC.get("/tracks/207293967", function(track){
      deferred.resolve(track);
    });

    return deferred.promise();
  }
};

module.exports = SoundCloud;