var message = document.querySelector('.console');
var saving = document.querySelector('.saving');
var filename = document.getElementById('filename').value;

function getAnimelist() {
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      saving.innerHTML = request.source;
      searchThroughList();
      //Downloading must be implemented!
      message.innerText = "Success!"
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

function searchThroughList() {
  var completed_table = document.querySelector('[data-id="completed"]');
  var onhold_table = document.querySelector('[data-id="on-hold"]');
  var dropped_table = document.querySelector('[data-id="dropped"]');
  var currently_table = document.querySelector('[data-id="currently-watching"]');
  var plan_to_watch_table = document.querySelector('[data-id="plan-to-watch"]');

  var completed_names = [];
  var completed_episodes = [];
  getAnimeNames(completed_table, completed_names);
  getAnimeEpisodes(completed_table, completed_episodes);

  var onhold_names = [];
  var onhold_episodes = [];
  getAnimeNames(onhold_table, onhold_names);
  getAnimeEpisodes(onhold_table);

  var dropped_names = [];
  var dropped_episodes = [];
  getAnimeNames(dropped_table, dropped_names);
  getAnimeEpisodes(dropped_table, dropped_episodes);

  var currently_names = [];
  var currently_episodes = [];
  getAnimeNames(currently_table, currently_names);
  getAnimeEpisodes(currently_table, currently_episodes);

  var plan_to_watch_names = [];
  var plan_to_watch_episodes = [];
  getAnimeNames(plan_to_watch_table, plan_to_watch_names);
  getAnimeEpisodes(plan_to_watch_table, plan_to_watch_episodes);

  var column_headers = ["Completed", "Currently Watching", "On Hold", "Dropped", "Plan to Watch"];

  var tabledata = [
    column_headers,
    completed_names,
    currently_names,
    onhold_names,
    dropped_names,
    plan_to_watch_names
  ];

  console.log(completed_episodes);
}

function getAnimeNames(table, targetarray) {
  $(table).find('a').each(function() {
    targetarray.push($(this).text());
  });
}

function getAnimeEpisodes(table, targetarray){
  //Get: episodes watched / full
}

function exportCSV(tabledata) {
  /*
    Write the tabledata above in a single -filename-.csv

    schema:

      | table_headers |
      | anime_name | episodes_watched |

    Download it within the same button.


  */
}
