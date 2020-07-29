var scripttext ='function onYouTubeIframeAPIReady() {  setTimeout(function() {'+
'var isvideo=$(".embed-responsive").hasClass("isvideo");'+
'if(isvideo){var id =$(".isvideo").attr("data-id"),'+
'volume =$(".isvideo").attr("data-volume"),'+
'player,player = new YT.Player(id, {events: {'+
    'onReady: function(e) {e.target.setVolume(volume);},'+
    '}});}} ,1000);}';

    var script = document.createElement("script");

    // Add script content
    
    script.innerHTML = scripttext;
    script.async = true;
    // Append
    document.body.appendChild(script);