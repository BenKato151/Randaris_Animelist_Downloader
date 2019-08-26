var message = document.querySelector('.console');
var saving = document.querySelector('.saving');

function getAnimelist() {
  var htmlsource;
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      saving.innerHTML = request.source;
      download();
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
  var completed = document.querySelector('[data-id="completed"]');
  var onhold = document.querySelector('[data-id="on-hold"]');
  var dropped = document.querySelector('[data-id="dropped"]');
  var currently = document.querySelector('[data-id="currently-watching"]');
  var plan_to_watch = document.querySelector('[data-id="plan-to-watch"]');

  Check("Completed: \n", completed);
  Check("On Hold: \n", onhold);
  Check("Dropped: \n", dropped);
  Check("Currently Watching: \n", currently);
  Check("Plan to watch: \n", plan_to_watch);
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
          //SeachTable(data-id_name)
 */

}

function Check(tablename, table) {
  if(table != null) {
    console.log(tablename + table.innerHTML);
  }
  else {
    console.log(tablename + " isnt there!");
  }
}
