function showSetKeys() {
  var setKeys = document.querySelector(".setKeys");
  setKeys.style.display = "inherit";
}

document.getElementById("showbtn").addEventListener("click", showSetKeys);

function closeSetKeys() {
  var setKeys = document.querySelector(".setKeys");
  setKeys.style.display = "none";
}

document.getElementById("closebtn").addEventListener("click", closeSetKeys);

var keyInfo = [];

function gatherKeyInfo() {
  var keys = document.querySelectorAll('input[type="text"]');

  keys.forEach(function(key) {
    var nameInput = key.value;
    var letter = key.id.substring(3, 4);
    var fileInput = document.getElementById('Key' + letter + 'file').value;

    if (nameInput.trim() !== '' && fileInput.trim() !== '') {
      keyInfo.push({
        Name: nameInput,
        File: fileInput,
        Key: letter
      });
    }
  });

  if (keyInfo.length > 0){
    localStorage.setItem('keyInfo', JSON.stringify(keyInfo));
    displayKeyInfo();
    setSoundboard();
  } else{
    return
  }

  document.getElementById("form").reset();
}

document.getElementById("subbtn").addEventListener("click", gatherKeyInfo);

function editKey() {
  // Add edit key functionality here
}

function removeKey(button) {
  var settedKeysDiv = document.querySelector('.settedKeys');
  var keyDiv = button.parentNode;
  settedKeysDiv.removeChild(keyDiv);
}

document.addEventListener("DOMContentLoaded", displayKeyInfo);

function displayKeyInfo() {

  setSoundboard();
  
  if (localStorage.getItem('keyInfo') !== null) {
    var settedKeysDiv = document.querySelector('.settedKeys');

    JSON.parse(localStorage.getItem('keyInfo')).forEach(function(key) {
      var keyDiv = document.createElement('div');
      keyDiv.classList.add('key' + key.Key);
      var keyContent = 
      "<p1>Key: " + key.Key + "</p1>" +
      "<br>" +
      "<p2>Name: " + key.Name + "</p2>" +
      "<br>" +
      "<p3>File: " + key.File + "</p3>" +
      "<br>" +
      "<button onclick='removeKey(this)'>Remove Key</button>" +
      "<button onclick='editKey()'>Edit Key</button>";

      keyDiv.innerHTML = keyContent;
      settedKeysDiv.appendChild(keyDiv);
    });
  }
}

function setSoundboard() {
  var soundboardDiv = document.querySelector('.soundboard');
  

  if (localStorage.getItem('keyInfo') !== null) {
    JSON.parse(localStorage.getItem('keyInfo')).forEach(function(key) {
      var audioElement = document.createElement('audio');
      audioElement.src = key.File;
      audioElement.id = key.Key;
      audioElement.controls = true;

      var audioDiv = document.createElement('div');
      audioDiv.classList.add('audio');

      audioDiv.appendChild(audioElement);
      soundboardDiv.appendChild(audioDiv);
    });
  }
}                            

while (keyInfo.length > 0) {
  console.log(keyInfo);
}