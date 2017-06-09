# Recipe API

[![N|Solid](https://www.bba.org.uk/wp-content/uploads/2016/07/ICX4-logo.jpg)](http://icx4.com/)


### Scenario
A client has asked you to integrate into their existing Recipe Api
You will create a UI that will statisfy the user requirements

### User Stories

|       | As a User I want... | So that I can... |
|-------| --------------------| ---------------- |
|Story 1| to have the ability to create, read, update and delete my recipes | have control over my recipes |
|Story 2| to have the ability to create, read, update and delete my recipe's ingredients | have control over my recipe's ingredients |

---

### Packages Chosen
|Package|Why I chose it...|Knew prior?|
|-|-|-|
|[jQuery](http://api.jquery.com/)|to streamline general JS and ajax requests|\* yes/no|
|[normalize](https://necolas.github.io/normalize.css/)|to reset/normalise some quirks of all browsers|yes|
|[bootstrap](http://getbootstrap.com/)|to use grid system and alert UI elements|yes|
|[bootbox](http://bootboxjs.com/)|to expand upon bootstrap's alerts with a few nice adjustments|no|
|[fontawesome](http://fontawesome.io/icons/)|my go to icon library, larger variation & bit more welcoming than bootstrap's glyphicons|yes|

\* learned AJAX for this task, both vanilla JS and jQuery, otherwise am familiar with jQuery


### Challenges Overcome
|Challenge|Solution|
|-|-|
|Didn't know AJAX|completed most of [Treehouse course](https://teamtreehouse.com/library/ajax-basics) and browsed [jQuery's documentation](http://api.jquery.com/jquery.ajax/)|
|Allow user to decide upon actions|using alerts/confirms/prompts to allow user feedback to designate what code does next. Eg. when deleting ingredient or recipe, user should be prompted with buffer message to confirm before the actual delete occurs|
|Wanted nicer alerts|quick search on google found [bootbox.js](http://bootboxjs.com/), simple and easy to integrate|
|Organising JS code|at first i had everything in main.js, then extrapolated out to concerns (recipe, ingredient), but then found it would be better for each page to have it's own JS file - this in turn aided debugging|
|Organising CSS code|with no proper training or usage of SASS/LESS/PostCSS - i didn't want to extend time learning them for what should be a short project, so I used basic CSS and split out into main (for shared classes) and a separate stylesheet for each page |
|Adding a new recipe|i needed an intermediary page that allowed users to enter in basic info for the recipe, then be relocated to the newly created receipe (with id in query string), allowing them to add ingredients - i felt this to be more seamless|


### Things I'd want to improve upon/change
|Improvement/Change|Why?|How?|Potential Problems?|
|-|-|-|-|
|Make an SPA|better UX, potential to be quicker|learn and implement React or Angular|bookmarking recipes in browser|
|Add some tooltips|some icons may not be clear enough|add bootstrap's tooltips or make my own|could clutter UI, may not be necessary everywhere|
|Colour scheme/theme|i don't think it's awful, but I do think i'd like time to research other UI's that achieve similar goals|research other UI's online|subjectivity, client may have already ideas in mind to pay homage to first|
|Generally be more learned in CSS/JS|essential for any front end developer to keep up with current tech|research, learn and discuss|becoming a UX/UI genius and using it for evil...|
