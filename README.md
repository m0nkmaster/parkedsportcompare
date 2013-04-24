Parkedsport compare tool
========================

What is it?
-----------
A random little Javascript bookmarklet script to compare the URL that you're on (must be a BBC Sport webpage) with it's 'parked sport' equivalent. If you don't know what I'm talking about this script isn't for you.

Install
------

```javascript
javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='https://raw.github.com/m0nkmaster/parkedsportcompare/master/bookmarklet.js?';}})();
```

Copy the code above and create a bookmark.

Usage
-----

When you are on a BBC Sport page and click on the bookmarklet the source of the page will be compared with the source of the equivalent parkedsport url.

If the two HTML sources match you will be told. Otherwise you will be offered the option to view the parked sport page.
