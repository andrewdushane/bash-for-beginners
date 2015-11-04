window.onload = function() {

  var container = document.getElementById('container');

  function addStuff() {
    var stuff = ['This stuff', 'That stuff', 'Other stuff'];
    for( var someStuff in stuff ) {
      var li = document.createElement('li');
      console.log(li);
      li.innerHTML = stuff[someStuff];
      container.appendChild(li);
    } // End of addStuff
  }

  function addImage() {
    var kittenImage = document.createElement('img');
    kittenImage.alt = 'A cute random kitten.';
    kittenImage.id = 'kitten';
    kittenImage.src = 'http://xyer.co/wallpaper/2/3/cute-kitten-background.jpg';
    container.appendChild(kittenImage);
    var kitten = document.querySelector('#kitten');
    kitten.src = 'https://www.socwall.com/images/wallpapers/69818-1200x750.jpg';
  }
  //addImage();

  function getListItems() {
    var listItemsArray = document.getElementsByTagName('li');
    for( var li in listItemsArray ) {
      listItemsArray[li].innerHTML = 'We are the champions (my friend).';
    }
  }
  //getListItems();

  function someEvents() {
    var status = document.getElementById('status-message');
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('click' , function() {
      console.log('Clicked');
    });
    body.addEventListener('touchstart', function(event) {
      console.log('Touched');
    })
    // Touch events:
    // touchstart
    // touchmove
    // touchend
    body.addEventListener('keyup', function(event) {
      // look for specific keys to be pressed
      if(event.keyCode == 13) {
        console.log('Enter pressed');
      }
    });
  } // someEvents();

} // End of window.onload

var user = {
  name: null,
  score: 0,
  domElement: null,
  initialiaze: function(elementToAppendTo) {
    if( this.name == null ) {
      this.name = prompt('What is your name?');
    }
    this.domElement = document.createElement('div');
    this.domElement.innerHTML = 'Welcome, ' + this.name;
    elementToAppendTo.appendChild(this.domElement);
    console.log('initialize: complete');
  },
  render: function(innerHTML) {
    if(typeof(innerHTML == 'string')) {
      this.domElement.innerHTML = innerHTML;
    }
  },
  buildPlayerStatusString: function() {
    return this.name + ': ' + this.score;
  },
  getName: function() {
    return this.name;
  },
  saveName: function(newName) {
    if(typeof(newName) == 'string' && newName.length > 0 ) {
      this.name = newName;
    } else {
      alert('Please enter a valid name.');
    }
  },
  getScore: function() {
    return this.score;
  },
  updateScoreByOnePoint: function() {
    this.score++;
    var status = this.buildPlayerStatusString();
    this.render(status);
    return this.score;
  }
};

var status = document.getElementsByTagName('status-message');
var btn = document.getElementById('addPoint');
console.log(status);
user.initialiaze(status);
btn.addEventListener('click', function() {
  user.updateScoreByOnePoint();
});
