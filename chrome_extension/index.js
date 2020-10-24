var messages = [];

function clickHandler(e) {
  var x = "You: " + document.getElementById('message').value;
  messages.push(x);
  refreshView();
}

function createMessageItem(message){
  return "<li class='messageItem'>" + message + "</li>";
}

function refreshView() {
  var messageList = "";
  messages.forEach(message => {
    messageList += createMessageItem(message);
  });

  document.getElementById('chatarea').innerHTML = messageList;
}

function main() {
  // Initialization work goes here.
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('send-button').addEventListener('click', clickHandler);
  main();
});
