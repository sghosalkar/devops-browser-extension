var serverBaseUrl = "http://127.0.0.1:5000"

var messages = [];

function clickHandler(e) {
  var x = document.getElementById('message').value;
  messages.push("You: " + x);

  var args = x.split(" ");
  if (args[0].toUpperCase() == "PROJECT"){
    var projectId = args[1]
    if (args[2].toUpperCase() == "BUILD") {
      var response = fetchBuilds(projectId)
    } else if (args[2].toUpperCase() == "PIPELINE") {
      var pipelineId = args[3]
      var response = fetchPipeline(projectId, pipelineId)
    }
  }

  refreshView();
}

function fetchBuilds(projectId){
  var url = serverBaseUrl + "/project/" + projectId + "/build"
  return doHttpGetCall(url)
}

function fetchPipeline(projectId, pipelineId){
  var url = serverBaseUrl + "/project/" + projectId + "/pipeline/" + pipelineId
  return doHttpGetCall(url)
}

function doHttpGetCall(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var response = xhr.responseText;
      messages.push("Bot: " + response);
      refreshView();
    }
  }
  xhr.send();
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
