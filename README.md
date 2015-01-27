# jFont Checker
This simple tool checks for the existence of a specified font. It ultilizes the font fallback mechanism in CSS for font checking.

##Usage
Simply call `checkfont`, and it will return the font status in boolean:

    var isTimesExist = checkfont("Times"),           //true (if exists)
        someWeirdFont = checkfont("CookieMonster");  //false
