
(function () {

    GLB.TwittTranslate = {}

    GLB.TwittTranslate.translateTweet = function(text, cb) {

        var translated = "No translation found :(";
        google.language.detect(text, function(result) {
            if (!result.error && result.language) {
              
              google.language.translate(text, result.language, "es",
                                        function(result) {
                //var translated = document.getElementById("translation");
                
                if (result.translation) {
                    
                    cb(result.translation);
                    return;
                }
                
              });
            }
          });
    }
})();

