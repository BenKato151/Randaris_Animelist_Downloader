//Downloader for randaris.app animelists

var message = document.querySelector('.console');
var saving = document.querySelector('.saving');
var filename = document.getElementById("filename");

function getAnimelist() {
  console.log("--- INIT ---");
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      saving.innerHTML = request.source;
      downloadcsv(filename.value,
        exportCSV(searchThroughList())
      );
    }
  });

  chrome.tabs.executeScript(null, {
    file: "Scripts/getPagesSource.js"
  }, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'Something went wrong!';
      console.log('Error:\n' + chrome.runtime.lastError.message);
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
  //Get the fucking right order. Maybe dictionarys or a tabledata.sort() will help? I guess. Lol..

  csv += CreateStringFromTable(tabledata);

  return csv;
}

function CreateStringFromTable(tabledata) {
  var csvstring = "";
  var tableclass = document.querySelector(".savingTable");
  var table = "<table border='1px'>";
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

      table += "<tr><td>" + completed[0][i] + "</td><td>" + completed[1][i]  + "</td>" +
                "<td>" + currently[0][i] + "</td><td>" + currently[1][i]  + "</td>" +
                "<td>" + onhold[0][i] + "</td><td>" + onhold[1][i]  + "</td>" +
                "<td>" + ptw[0][i] + "</td><td>" + ptw[1][i]  + "</td></tr>";
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

      table += "<tr><td>" + completed[0][i] + "</td><td>" + completed[1][i]  + "</td>" +
                "<td>" + currrently[0][i] + "</td><td>" + currently[1][i]  + "</td>" +
                "<td>" + onhold[0][i] + "</td><td>" + onhold[1][i]  + "</td>" +
                "<td>" + ptw[0][i] + "</td><td>" + ptw[1][i]  + "</td></tr>";
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

      table += "<tr><td>" + completed[0][i] + "</td><td>" + completed[1][i]  + "</td>" +
                "<td>" + currrently[0][i] + "</td><td>" + currently[1][i]  + "</td>" +
                "<td>" + onhold[0][i] + "</td><td>" + onhold[1][i]  + "</td>" +
                "<td>" + ptw[0][i] + "</td><td>" + ptw[1][i]  + "</td></tr>";
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

      table += "<tr><td>" + completed[0][i] + "</td><td>" + completed[1][i]  + "</td>" +
                "<td>" + currrently[0][i] + "</td><td>" + currently[1][i]  + "</td>" +
                "<td>" + onhold[0][i] + "</td><td>" + onhold[1][i]  + "</td>" +
                "<td>" + ptw[0][i] + "</td><td>" + ptw[1][i]  + "</td></tr>";
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

      table += "<tr><td>" + completed[0][i] + "</td><td>" + completed[1][i]  + "</td>" +
                "<td>" + currrently[0][i] + "</td><td>" + currently[1][i]  + "</td>" +
                "<td>" + onhold[0][i] + "</td><td>" + onhold[1][i]  + "</td>" +
                "<td>" + ptw[0][i] + "</td><td>" + ptw[1][i]  + "</td></tr>";
    }
  }

  //Create Table inside of hidden html-container
  $(tableclass).append(table);

  //write with jquery the table into csvstring

  return csvstring;
}

function downloadcsv(file_name, text) {

  if (file_name !== "") {
    chrome.downloads.download({
      url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(text),
      filename: file_name + ".csv",
    });
  }
  else {
    chrome.downloads.download({
      url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(text),
      filename: "Randaris-Animelist.csv",
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
