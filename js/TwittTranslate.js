
(function () {

    GLB.TwittTranslate = {}

    
    GLB.TwittTranslate.translateTweet = function(text) {
        var translated = "No translation found :(";
        google.language.detect(text, function(result) {
            if (!result.error && result.language) {
              
              google.language.translate(text, result.language, "es",
                                        function(result) {
                //var translated = document.getElementById("translation");
                
                if (result.translation) {
                  translated = result.translation;

                    var language = 'unknown';
                    for (l in google.language.Languages) {
                      if (google.language.Languages[l] == result.language) {
                        language = l;
                        break;
                      }
                    }
                    //document.getElementById("detection").innerHTML = language;
                    console.log(result.language);
                
                }

              });
            }

          });
        console.log("trans: " + translated);
        return translated;   
    }

})();





function initialize() {
      var text = document.getElementById("text").innerHTML;
      google.language.detect(text, function(result) {
        if (!result.error && result.language) {

          google.language.translate(text, result.language, "es",
                                    function(result) {
            var translated = document.getElementById("translation");
            if (result.translation) {
              translated.innerHTML = result.translation;

                var language = 'unknown';
                for (l in google.language.Languages) {
                  if (google.language.Languages[l] == result.language) {
                    language = l;
                    break;
                  }
                }
                document.getElementById("detection").innerHTML = language;
                console.log(result.language);

            }
          });
        }

      });
    }
    google.setOnLoadCallback(initialize);
