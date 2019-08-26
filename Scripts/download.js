var message = document.querySelector('.console');

function getAnimelist() {
  var htmlsource;
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      //download();
      //Downloading must be implemented!
      message.innerHTML = "Success! <br> Not implemented!"
    }
  });

  chrome.tabs.executeScript(null, {
    file: "Scripts/getPagesSource.js"
  }, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

function download(){
  /*
    Search for :data-id="completed", "currently-watching","on-hold", "dropped", "plan-to-watch"
    and if exists, safe the output in a variable.
    Then search inside of it for anchors-text (names of anime).
    and (watched/full) episodes.
    After that save the data-id's name and under that the name : episodes
    Write that in a single csv.
    Download it.

    More functions recommended.
    e.g.  ExportCSV()
          SeachTable(data-id_name)
 */
}
