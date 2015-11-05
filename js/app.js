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

function TerminalAside() {
  this.domElement = null;
  this.initialize = function() {
    this.domElement = document.createElement('aside');
    this.domElement.id = 'terminal-aside';
    this.heading = document.createElement('h2');
    this.heading.innerHTML = "What's up hacker?"
    this.instructions = document.createElement('p');
    this.instructions.innerHTML = 'Let&rsquo;s get started. In the shell, aka the command line, aka the terminal (<a href="http://askubuntu.com/questions/506510/what-is-the-difference-between-terminal-console-shell-and-command-line" target="_blank">ok, no nerdy nerds, they&rsquo;re not exactly the same thing</a>), you interface with your computer by typing commands. So &rsquo;80s, right? It&rsquo; actually pretty easy and efficient when you get the hang of it. Let&rsquo;s enter your first command. Type <code>pwd</code> and press <code>enter</code>.';
  }
  this.render = function() {
    this.container = document.getElementById('terminal-container');
    this.container.appendChild(this.domElement);
    this.domElement.appendChild(this.heading);
    this.domElement.appendChild(this.instructions);
    // this.container.childNodes[0].appendChild(this.heading);
    // this.container.childNodes[0].appendChild(this.instructions);
  }
}

var dirName = ''; // Will store the name of the folder created by the user

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
    }
    else if( getTerminalCommand ( e, 'ls' ) ) {
      runLs(e);
    }
    e.target.value += '\n > $ ';
  }
}

function runPwd(e) {
  e.target.value += '\n/home/user/public_html';
  var aside = document.getElementById('terminal-aside');
  aside.getElementsByTagName('h2')[0].innerHTML = 'Nicely done!';
  aside.getElementsByTagName('p')[0].innerHTML = "PWD stands for Print Working Directory. When you&rsquo;re working on your local machine, or on a remote server, PWD will show you the absolute path to the directory in which you&rsquo;re currently working. Obviously, it&rsquo;s important to execute commands in the right directory, so use <code>pwd</code> if you&rsquo;re in doubt.<p>Now, let&rsquo;s see what&rsquo;s inside our directory. Run the command <code>ls</code>.";
}

function runLs(e) {
  e.target.value += '\ncss\nindex.html\njs'
    if( dirName && dirName != '' ) {
      e.target.value =+ '\n' + dirName;
    }
    var aside = document.getElementById('terminal-aside');
    aside.getElementsByTagName('h2')[0].innerHTML = 'Excellent.';
    aside.getElementsByTagName('p')[0].innerHTML = "The <code>ls</code> command lists the contents of a directory - the current directory if you don&rsquo;t tell it to look somewhere else. How would you tell it where to look? When you run a command, you can pass it arguments.<p>The next command we&rsquo;ll use is <code>mkdir</code>. We&rsquo;ll pass <code>mkdir</code> one argument - a folder name of your choice. To do this, enter <code>mkdir</code>, followed by a space, followed by your folder name (make sure it doesn't contain any spaces.)";
}

function getTerminalCommand( e , command ) {
  return (e.target.selectionStart - e.target.value.search( command ) < 4 );
}
