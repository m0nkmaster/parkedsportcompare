Parkedsport compare tool
========================

What is it?
-----------
A Javascript bookmarklet script to compare the URL of the page that you're on (must be a BBC Sport webpage) with it's 'parked sport' equivalent. If you don't know what I'm talking about when I refer to 'parked sport' then this script isn't for you.

Install
------

```javascript
javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='https://rawgithub.com/m0nkmaster/parkedsportcompare/master/bookmarklet.js?';}})();
```

Copy the above javascript code snippet into a bookmark.

Usage
-----

When you are viewing a BBC Sport page. Click on the bookmarklet and the HTML source of the page will be compared with the source of the equivalent parkedsport url, on the same environment as the original page.

If the two HTML sources match you will be told so. Otherwise you will be offered the option to view a visual diff of the two pieces of code.

Notes
-----

There are a few acceptable differences which the script makes exceptions for:

+ URL differences caused by /parkedsport/ are ignored
+ /sport/0/... and /sport/... differences are ignored as we now have rewrites in place to handle this stuff
+ Whitespace differences are largely ignored
