## Preliminaries
1. Install [git](http://git-scm.com) as it is a bower dependency
2. Install [nodeJS](http://nodejs.org) incl. node package manager (npm)
3. Install [Grunt](http://gruntjs.com) Command Line Interface (grunt cli) globally
    - __*$ sudo npm install -g grunt-cli*__
4. Install [bower](http://bower.io) globally
    - __*$ sudo npm install -g bower*__
5. Install bower dependencies
    - __*$ bower install*__
    - If bower gives you GIT issues reconfigure git [(details)](http://stackoverflow.com/questions/21789683/howto-fix-bower-ecmderr#answer-21790275):  
    - $ git config --global url."https://".insteadOf git://
6. Install node modules within the project location
    - __*$ sudo npm install*__
7. bower install within the project location
8. For Windows, Download and install Ruby from rubyinstaller.org, Setup the Ruby, run the following commands in CMD from the project root dir: gem update --system, gem install compass
9. Run grunt server within the project location.
