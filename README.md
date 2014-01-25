angular-arduino
===============

## Install

Make sure you have NodeJS [installed](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

open a terminal, and move to a directory for cloning the repo.

```
git clone https://github.com/killface-org/angular-arduino.git
cd angular-arduino
npm install
```

## Running

Build the LCD circuit from the magic eight ball project, and instead of the acceloramter add three LED's, connected to 
pins 8,9, and 10. You will then need to make some slight modifications to the source code, mainly things like setting 
ip addresses for connections, and maybe adjusting some of the PIN constants.

Then open up a couple of terminals. 

```
  cd server
  node web-server.js
  //in a seperate shell (terminal)
  node arduino-socket-server.js
```  

