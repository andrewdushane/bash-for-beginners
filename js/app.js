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
    container.appendChild(this.domElement); // Append new textarea
  }
}
var button = document.getElementById('make-terminal');
button.addEventListener( 'click' , onButtonClick );

function onButtonClick(e) {
  var newTerminal = new Terminal();
  newTerminal.initialize();
  newTerminal.render();
  e.srcElement.innerHTML = 'Reset Terminal';
}
