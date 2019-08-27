var message = document.querySelector('.console');
var saving = document.querySelector('.saving');

function getAnimelist() {
  var htmlsource;
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      saving.innerHTML = request.source;
      searchThroughList();
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

function searchThroughList(){
  var completed_table = document.querySelector('[data-id="completed"]');
  var onhold_table = document.querySelector('[data-id="on-hold"]');
  var dropped_table = document.querySelector('[data-id="dropped"]');
  var currently_table = document.querySelector('[data-id="currently-watching"]');
  var plan_to_watch_table = document.querySelector('[data-id="plan-to-watch"]');

  var completed_names = [];
  getAnimeNames(completed_table, completed_names);
  
  var onhold_names = [];
  getAnimeNames(onhold_table, onhold_names);

  var dropped_names = [];
  getAnimeNames(dropped_table, dropped_names);

  var currently_names = [];
  getAnimeNames(currently_table, currently_names);

  var plan_to_watch_names = [];
  getAnimeNames(plan_to_watch_table, plan_to_watch_names);

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

function getAnimeNames(table, targetarray) {
  $(table).find('a').each(function() {
    targetarray.push( $(this).text() );
  });
}
