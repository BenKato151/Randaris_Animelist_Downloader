//Downloader for randaris.app animelists

var message = document.querySelector('.console');
var saving = document.querySelector('.saving');
var filename = document.getElementById("filename");

function getAnimelist() {
  console.log("--- INIT ---");
  browser.runtime.onMessage.addListener(function(request, sender) {
    saving.innerHTML = request.source;
    //if source code of the list is loaded into page the download will start
    downloadcsv(filename.value,
      exportCSV(searchThroughList())
    );
  });

  browser.tabs.executeScript(null, {
    file: "../Scripts/getPagesSource.js"
    //Load source code of the animelist into the index.html, so I can read all of that easily
  });
}


function searchThroughList() {

  // Saves the anime info as 2d arrays [names][episodes]
  var completed_table = document.querySelector('[data-id="completed"]');
  var onhold_table = document.querySelector('[data-id="on-hold"]');
  var dropped_table = document.querySelector('[data-id="dropped"]');
  var currently_table = document.querySelector('[data-id="currently-watching"]');
  var plan_to_watch_table = document.querySelector('[data-id="plan-to-watch"]');

  var completed_names = [];
  var completed_episodes = [];
  getAnimeNames(completed_table, completed_names);
  getAnimeEpisodes(completed_table, completed_episodes);
  var completed = [completed_names, completed_episodes];

  var onhold_names = [];
  var onhold_episodes = [];
  getAnimeNames(onhold_table, onhold_names);
  getAnimeEpisodes(onhold_table, onhold_episodes);
  var onhold = [onhold_names, onhold_episodes]

  var dropped_names = [];
  var dropped_episodes = [];
  getAnimeNames(dropped_table, dropped_names);
  getAnimeEpisodes(dropped_table, dropped_episodes);
  var dropped = [dropped_names, dropped_episodes];

  var currently_names = [];
  var currently_episodes = [];
  getAnimeNames(currently_table, currently_names);
  getAnimeEpisodes(currently_table, currently_episodes);
  var currently = [currently_names, currently_episodes];

  var plan_to_watch_names = [];
  var plan_to_watch_episodes = [];
  getAnimeNames(plan_to_watch_table, plan_to_watch_names);
  getAnimeEpisodes(plan_to_watch_table, plan_to_watch_episodes);
  var plan_to_watch = [plan_to_watch_names, plan_to_watch_episodes];

  var tabledata = [
    completed, currently,onhold, dropped, plan_to_watch
  ];

  return tabledata;
}

function getAnimeNames(table, targetarray) {
  // Anime-Names are basically links and I write the text of the links into an array
  $(table).find('a').each(function() {
    targetarray.push($(this).text());
  });
}

function getAnimeEpisodes(table, targetarray){
  // Excel etc. will take this as a date format and bc of that I need that little trick for converting
  $(table).find('.list-watched-ep').each(function(){
    targetarray.push($(this).attr('data-progress') + $(this).text() + "'");
  });
}

// Nice to have: Add functions and implement all the other infos from the Animelist

function exportCSV(tabledata) {
  // This function would blow up so I had to outsource it in a new up blowed function xD
  var csv = "Completed;;Currently Watching;;On Hold;;Dropped;;Plan to Watch\n" +
            "names;episodes;names;episodes;names;episodes;names;episodes;names;episodes\n";
  csv += CreateStringFromTable(tabledata);
  return csv;
}

function CreateStringFromTable(tabledata) {
  // This function checks, which array have the largest length and iterate over this.
  // if one array is finished, the undefined value is set to empty string.
  // And now... Magic is happen!
  // While the iteration, the csv will join for each field. And this simply thing took me a lot of time and existential crisis xDD
  // Thanks to my rubber duck A. :)

  var csvstring = "";
  var completed = tabledata[0];
  var currently = tabledata[1];
  var onhold = tabledata[2];
  var dropped = tabledata[3];
  var ptw = tabledata[4];

  if (completed[0].length >= currently[0].length && completed[0].length >= onhold[0].length && completed[0].length >= dropped[0].length && completed[0].length >= ptw[0].length) {
    for (var i = 0; i < completed[0].length; i++) {
      if (currently[0][i] === undefined) {
        currently[0][i] = "";
        currently[1][i] = "";
      }
      if (onhold[0][i] === undefined) {
        onhold[0][i] = "";
        onhold[1][i] = "";
      }
      if (dropped[0][i] === undefined) {
        dropped[0][i] = "";
        dropped[1][i] = "";
      }
      if (ptw[0][i] === undefined) {
        ptw[0][i] = "";
        ptw[1][i] = "";
      }

      csvstring +=  completed[0][i] + ";" + completed[1][i]  + ";" +
                    currently[0][i] + ";" + currently[1][i]  + ";" +
                    onhold[0][i] + ";" + onhold[1][i]  + ";" +
                    dropped[0][i] + ";" + dropped[1][i]  + ";" +
                    ptw[0][i] + ";" + ptw[1][i]  + ";\n";
    }
  }

  else if (currently[0].length >= completed[0].length && currently[0].length >= onhold[0].length && currently[0].length >= dropped[0].length && currently[0].length >= ptw[0].length) {
    for (var i = 0; i < completed[0].length; i++) {
      if (completed[0][i] === undefined) {
        completed[0][i] = "";
        completed[1][i] = "";
      }
      if (onhold[0][i] === undefined) {
        onhold[0][i] = "";
        onhold[1][i] = "";
      }
      if (dropped[0][i] === undefined) {
        dropped[0][i] = "";
        dropped[1][i] = "";
      }
      if (ptw[0][i] === undefined) {
        ptw[0][i] = "";
        ptw[1][i] = "";
      }

      csvstring +=  completed[0][i] + ";" + completed[1][i]  + ";" +
                    currently[0][i] + ";" + currently[1][i]  + ";" +
                    onhold[0][i] + ";" + onhold[1][i]  + ";" +
                    dropped[0][i] + ";" + dropped[1][i]  + ";" +
                    ptw[0][i] + ";" + ptw[1][i]  + ";\n";
    }
  }

  else if (onhold[0].length >= completed[0].length && onhold[0].length >= currently[0].length && onhold[0].length >= dropped[0].length && onhold[0].length >= ptw[0].length) {
    for (var i = 0; i < completed[0].length; i++) {
      if (completed[0][i] === undefined) {
        completed[0][i] = "";
        completed[1][i] = "";
      }
      if (currently[0][i] === undefined) {
        currently[0][i] = "";
        currently[1][i] = "";
      }
      if (dropped[0][i] === undefined) {
        dropped[0][i] = "";
        dropped[1][i] = "";
      }
      if (ptw[0][i] === undefined) {
        ptw[0][i] = "";
        ptw[1][i] = "";
      }

      csvstring +=  completed[0][i] + ";" + completed[1][i]  + ";" +
                    currently[0][i] + ";" + currently[1][i]  + ";" +
                    onhold[0][i] + ";" + onhold[1][i]  + ";" +
                    dropped[0][i] + ";" + dropped[1][i]  + ";" +
                    ptw[0][i] + ";" + ptw[1][i]  + ";\n";
    }
  }

  else if (dropped[0].length >= completed[0].length && dropped[0].length >= currently[0].length && dropped[0].length >= onhold[0].length && dropped[0].length >= ptw[0].length) {
    for (var i = 0; i < completed[0].length; i++) {
      if (completed[0][i] === undefined) {
        completed[0][i] = "";
        completed[1][i] = "";
      }
      if (currently[0][i] === undefined) {
        currently[0][i] = "";
        currently[1][i] = "";
      }
      if (onhold[0][i] === undefined) {
        onhold[0][i] = "";
        onhold[1][i] = "";
      }
      if (ptw[0][i] === undefined) {
        ptw[0][i] = "";
        ptw[1][i] = "";
      }

      csvstring +=  completed[0][i] + ";" + completed[1][i]  + ";" +
                    currently[0][i] + ";" + currently[1][i]  + ";" +
                    onhold[0][i] + ";" + onhold[1][i]  + ";" +
                    dropped[0][i] + ";" + dropped[1][i]  + ";" +
                    ptw[0][i] + ";" + ptw[1][i]  + ";\n";
    }
  }

  else if (ptw[0].length >= completed[0].length && ptw[0].length >= currently[0] && ptw[0].length >= onhold[0].length && ptw[0].length >= dropped[0].length) {
    for (var i = 0; i < ptw[0].length; i++) {
      if (completed[0][i] === undefined) {
        completed[0][i] = "";
        completed[1][i] = "";
      }
      if (currently[0][i] === undefined) {
        currently[0][i] = "";
        currently[1][i] = "";
      }
      if (onhold[0][i] === undefined) {
        onhold[0][i] = "";
        onhold[1][i] = "";
      }
      if (dropped[0][i] === undefined) {
        dropped[0][i] = "";
        dropped[1][i] = "";
      }

      csvstring +=  completed[0][i] + ";" + completed[1][i]  + ";" +
                    currently[0][i] + ";" + currently[1][i]  + ";" +
                    onhold[0][i] + ";" + onhold[1][i]  + ";" +
                    dropped[0][i] + ";" + dropped[1][i]  + ";" +
                    ptw[0][i] + ";" + ptw[1][i]  + ";\n";
    }
  }
  else {
      return null;
  }
  return csvstring;
}

function downloadcsv(file_name, text) {
  // Finally the download will start.
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

// Because of CSP from google I had to add an listener here. No inline-scripting is allowed. sadly xD
var btn = document.getElementById("btn")
if (btn) {
  btn.addEventListener("click", function(){
    getAnimelist();
  });
}

// I am glad I finished the first version of it. Now.
// Thx for reading!
