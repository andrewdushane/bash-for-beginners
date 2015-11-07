// Terminal simulator constructor
function Terminal() {
  this.domElement = null;
  this.initialize = function() {
    this.domElement = document.createElement('textarea');
    this.domElement.id = "terminal";
    this.domElement.value = " > $ ";
  }
  this.render = function() {
    var container = document.getElementById('terminal-container');
    container.innerHTML = ''; // Delete existing textarea if there is one
    container.appendChild(this.domElement);
    this.domElement.focus(); // Append new textarea
    this.domElement.selectionStart = 5;
    this.domElement.addEventListener( 'keydown', onTerminalEnter );
  }
}


// Instructions element constructor
function TerminalAside() {
  this.domElement = null;
  this.initialize = function() {
    this.domElement = document.createElement('aside');
    this.domElement.id = 'terminal-aside';
    this.heading = document.createElement('h2');
    this.heading.innerHTML = "What's up hacker?"
    this.instructions = document.createElement('p');
    this.instructions.innerHTML = 'Let&rsquo;s get started. In the shell, aka the command line, aka the terminal (<a href="http://askubuntu.com/questions/506510/what-is-the-difference-between-terminal-console-shell-and-command-line" target="_blank">ok, technically, they&rsquo;re not exactly the same thing</a>), you interface with your computer by typing commands. So &rsquo;80s, right? It&rsquo; actually pretty easy and efficient when you get the hang of it. Let&rsquo;s enter your first command. Type <code>pwd</code> and press <code>enter</code>.';
  }
  this.render = function() {
    this.container = document.getElementById('terminal-container');
    this.container.appendChild(this.domElement);
    this.domElement.appendChild(this.heading);
    this.domElement.appendChild(this.instructions);
  }
}

//Global variables
var dirName = ''; // Will store the name of the folder created by the user
var pwdCount = 0; // Counter for pwd command
var lsCount = 0; // Counter for ls command
var mkdirCount = 0; // Counter for mkdir command
var clearCount = 0; // Counter for clear command
var button = document.getElementById('make-terminal');
button.addEventListener( 'click' , onButtonClick );

function onButtonClick(e) {
  var newTerminal = new Terminal();
  newTerminal.initialize();
  newTerminal.render();
  var newTerminalAside = new TerminalAside();
  newTerminalAside.initialize();
  newTerminalAside.render();
  e.srcElement.innerHTML = 'Reset Terminal';
}

function onTerminalEnter(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
    if( getTerminalCommand( e, 'pwd' ) ) {
      runPwd(e);
      pwdCount++;
    }
    else if( getTerminalCommand( e, 'ls' ) ) {
      runLs(e);
      lsCount++;
    }
    else if( getTerminalCommand( e, 'mkdir' )) {
      runMkDir(e);
      mkdirCount++
    }
    else if( getTerminalCommand( e, 'clear' )) {
      runClear(e);
      e.target.value += ' > $ ';
      clearCount++;
      return;
    }
    e.target.value += '\n > $ ';
  }
}

function runPwd(e) {
  e.target.value += '\n/home/user/public_html';
  if( pwdCount == 0 ) {
    var instructions = "PWD stands for Print Working Directory. When you&rsquo;re working on your local machine, or on a remote server, <code>pwd</code> will show you the absolute path to the directory in which you&rsquo;re currently working. Obviously, it&rsquo;s important to execute commands in the right directory, so use <code>pwd</code> if you&rsquo;re in doubt.<p>Now, let&rsquo;s see what&rsquo;s inside our directory. Run the command <code>ls</code>.";
    newInstructions( 'Nicely done!' , instructions );
  }
}

function runLs(e) {
  e.target.value += '\ncss\nindex.html\njs'
    if( dirName && dirName != '' ) {
      e.target.value += '\n' + dirName;
    }
    if( pwdCount >= 1 && lsCount == 0 ) {
      var instructions = "The <code>ls</code> command lists the contents of a directory - the current directory if you don&rsquo;t tell it to look somewhere else. How would you tell it where to look? When you run a command, you can pass it arguments.<p>The next command we&rsquo;ll use is <code>mkdir</code>. We&rsquo;ll pass <code>mkdir</code> one argument - a folder name of your choice. To do this, enter <code>mkdir</code>, followed by a space, followed by your folder name (make sure it doesn't contain any spaces.)<p>It should look something like this: <code>mkdir myfolder</code>";
      newInstructions( 'Excellent.' , instructions );
    }
    else if( pwdCount >= 1 && mkdirCount == 1 && lsCount == 1 ) {
      var instructions = "You&rsquo;re doing some great work. Your terminal is starting to get pretty cluttered, though. Let&rsquo;s clean it up. Run the <code>clear</code> command."
      newInstructions( 'Nice, huh?', instructions );
    }
}

function runMkDir(e) {
  dirName = e.target.value.substr( e.target.value.lastIndexOf( 'mkdir' ) + 6 );
  if( pwdCount >= 1 && lsCount >= 1 && mkdirCount == 0 ) {
    var instructions = "You just created a folder called " + dirName + ". You don&rsquo;t have to take our word for it, though. Run <code>ls</code> again, and check out the new list of directory contents."
    newInstructions( 'Now you&rsquo;re making stuff!', instructions);
  }
}

function runClear(e) {
  e.target.value = '';
  if( pwdCount >= 1 && mkdirCount >= 1 && lsCount >= 2 && clearCount == 0 ) {
    var instructions = 'Ahh, that&rsquo;s better. You&rsquo;re on your way to becoming a command line pro! To really dive in, check out the free course at <a href="https://www.codecademy.com/learn/learn-the-command-line">Codecademy</a> or start a free 30-day trial at <a href="http://teamtreehouse.com">Treehouse</a> and check out their interactive online classes for development and development tools.'
    newInstructions( 'Well done!' , instructions );
  }
}

function newInstructions( heading , instructions ) {
  var aside = document.getElementById('terminal-aside');
  aside.getElementsByTagName('h2')[0].innerHTML = heading;
  aside.getElementsByTagName('p')[0].innerHTML = instructions;
}

function getTerminalCommand( e , command ) {
  var commandLoc = e.target.value.lastIndexOf( command );
  var promptLoc = e.target.value.lastIndexOf( ' > $ ' );
  var cursor = e.target.selectionStart;
  if( commandLoc !== -1 && promptLoc !== -1) {
    if( (promptLoc < commandLoc) && (commandLoc < cursor) ) {
      return true;
    }
    else return false;
  }
  else return false;
}
