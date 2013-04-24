(function(){

    // the minimum version of jQuery we want
    var v = "1.3.2";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }
    
    function initMyBookmarklet() {
        (window.myBookmarklet = function() {

            var url = location.href;
            var parkedUrl = url.replace('/sport', '/parkedsport');
            var sportContent;
            var parkedSportContent;

            var makeContentComparable = function(body) {

                //# Acceptable differences
                body = body.replace(/parkedsport/g, 'sport')
                body = body.replace(/http:\/\/pal.sandbox.dev.bbc.co.uk/g, '')
                body = body.replace(/sport\/0\//g, 'sport/');

                // # Formatting cleanup to aid diff
                body = body.replace(/>\s*/g, '>').replace(/\s+/g, ' ');

                return body;
            }

            var performDiff = function() {
                if (compareHtml(parkedSportContent, sportContent)) {
                    alert('Sport and Parkedsport match for ' + url + ' yay!');
                } else {
                    var checkIt = confirm("They don't match. Do you want to visit " + parkedUrl);
                    if (checkIt == true) {
                       window.open(parkedUrl ,'_newtab');
                    }
                }
            }

            var compareHtml = function(a, b) {
                var div = jQuery(document.createElement('div'));
                div.html(a);
                var aNormalized = div.html();
                div.html(b);
                var bNormalized = div.html();

                return aNormalized == bNormalized;
            }

            //Get the body
            jQuery.get(url, function(data) {
                sportContent = data;
                jQuery.get(parkedUrl, function(data) {
                  sportContent = makeContentComparable(sportContent);
                  parkedSportContent = makeContentComparable(data);
                  performDiff();
              });
            });
        })();
    }
})();
