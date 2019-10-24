//Downloader for randaris.app animelists

var message = document.querySelector('.console');
var saving = document.querySelector('.saving');
var filename = document.getElementById("filename");

function getAnimelist() {
  console.log("--- INIT ---");
  browser.runtime.onMessage.addListener(function(request, sender) {
    saving.innerHTML = request.source;
    downloadcsv(filename.value,
      exportCSV(searchThroughList())
    );
    console.log(ready);
  });

  browser.tabs.executeScript(null, {
    file: "../Scripts/getPagesSource.js"
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
  getAnimeEpisodes(onhold_table, onhold_episodes);

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

  var tabledata = [
    completed_names, completed_episodes,
    currently_names, currently_episodes,
    onhold_names, onhold_episodes,
    dropped_names, dropped_episodes,
    plan_to_watch_names, plan_to_watch_episodes
  ];
  console.log(tabledata);
  return tabledata;
}

function getAnimeNames(table, targetarray) {
  $(table).find('a').each(function() {
    targetarray.push($(this).text());
  });
}

function getAnimeEpisodes(table, targetarray){
  $(table).find('.list-watched-ep').each(function(){
    targetarray.push("'" + $(this).attr('data-progress') + $(this).text());
  });
}

function exportCSV(tabledata) {
  var csv = "Completed;;Currently Watching;;On Hold;;Dropped;;Plan to Watch\n" +
            "names;episodes;names;episodes;names;episodes;names;episodes;names;episodes\n";


  tabledata.forEach(function(rowItem, rowIndex) {
    rowItem.forEach(function(colItem, colIndex) {
      csv += colItem + ';';
    });
    csv += "\r\n";
  });

  return csv
}


function downloadcsv(file_name, text) {
  var blob = new Blob([text], {type: "text/csv;charset=utf-8"})
  var downloadURL = URL.createObjectURL(blob);

  if (file_name !== "") {
    browser.downloads.download({
      url : downloadURL,
      filename : file_name + ".csv",
    });
  }
  else {
    browser.downloads.download({
      url : downloadURL,
      filename : "Randaris-Animelist.csv",
    });
  }
  message.innerText = "Success!";
}

var btn = document.getElementById("btn")
if (btn) {
  btn.addEventListener("click", function(){
    getAnimelist();
  });
}
