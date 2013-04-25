(function(){

    // the minimum version of jQuery we want
    var v = "1.9.1";

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
            url = url.replace(/callback=[\w-_]*/, 'callback=toString');
            var domain = domain = url.match(/http:\/\/[\w-.]*\//)[0].replace('http://', '').replace('/', '');
            var parkedUrl = url.replace('/sport', '/parkedsport');
            var sportContent;
            var parkedSportContent;

            var makeContentComparable = function(body) {

                // Acceptable differences
                body = body.replace(/parkedsport/g, 'sport')
                body = body.replace(/http:\/\/[\w\.]*.bbc.co.uk/g, '')
                body = body.replace(/sport\/0\//g, 'sport/');

                // Formatting cleanup to aid diff
                body = body.replace(/>\s*/g, '>').replace(/\s+/g, ' ');
                
                // Add new lines after each closing tag
                body = body.replace(/(<\/[\w-]*>)/g, "$1\n");

                return body;
            }

            var performDiff = function() {
                if (compareHtml(parkedSportContent, sportContent)) {
                    alert("/sport and /parkedsport match; yay!\n\n" + url);
                } else {
                    var checkIt = confirm("The code does not match.\n\nWould you like to view a full diff report?");
                    if (checkIt == true) {
                       visitDiffChecker(parkedSportContent, sportContent);
                    }
                }
            }

            var compareHtml = function(a, b) {
                return a == b;
            }
            
            var invalidUrl = function(url) {
                if (url.search(/http:\/\/[\w\.]+.bbc.co.uk\/sport/) != 0) {
                    return true;
                }
                
                return false;
            }
            
            var visitDiffChecker = function(file1, file2) {
                jQuery('<form id="visitDiffChecker" method="POST" action="http://www.diffchecker.com/diff" target="_blank">' +
                '<textarea name="file1">' + file1 + '</textarea>' +
                '<textarea name="file2">' + file2 + '</textarea>' +
                '<input type="hidden" value="month" name="storage-options" />' +
                '</form>').appendTo('body').submit();
                
                $('form#visitDiffChecker').remove();
            }
            
            if (invalidUrl(url)) {
                alert("This script only works with *.bbc.co.uk/sport urls.\n\nYou're not running this on a /parkedsport url are you?");
                return false;
            }

            //Get the body again.
            var jqxhr = jQuery.ajax({
              url: url,
              callback: function() {alert('callback');},
              jsonpCallback: function() {alert('JSONP call succeeded!');},
              async: false,
              crossDomain: false
            });
            
            jqxhr.always(function(data) {
                sportContent = data;
                //Get parkedsport body
                jQuery.ajax(parkedUrl, function(data) {
                }).always(function() {
                    
                  alert(sportContent);
                  alert(data);
                  //make html comparable
                  sportContent = makeContentComparable(sportContent);
                  parkedSportContent = makeContentComparable(data);
                  
                  performDiff();   
                })
                .fail(function() {
                  alert('No parkedsport equivalent was found for this page, on ' + domain);
                });
            });
            
            //jqxhr.fail(function(jqXHR, textStatus, errorThrown) {
            //    alert('This page is returning a 404 or 500. You can\'t compare an erroring page.');
            //    console.log(textStatus + ': ' + errorThrown);
            //    console.log(jqXHR);
            //});
            
        })();
    }
})();
