var flag;
var repositories;
var tag = [];
var repository;
var favourites = [];
$(document).ready(function() {
  $("#search").click(function() {
    if (flag) {
      $(".searchRow").remove();
      $(".favRow").remove();
      favourites = [];
    }
    var username = document.getElementById("githubsearch").value;
    var request = new XMLHttpRequest();
    // Initialize a request
    request.onload = printRepoCount;
    request.open(
      "get",
      "https://api.github.com/users/" + username + "/repos",
      true
    );
    request.send();
  });
});

function printRepoCount() {
  if (this.status == 200 && this.readyState == XMLHttpRequest.DONE) {
    repositories = JSON.parse(this.responseText);
    getTag(repositories);
  } else {
    alert("Failed to access the data, Please try again!");
  }
}

function getTag(repositories) {
  //console.log(repositories[name].full_name);
  for (repo in repositories) {
    var request = new XMLHttpRequest();
    request.onload = tagName;
    request.open(
      "get",
      "https://api.github.com/repos/" +
        repositories[repo].full_name +
        "/releases/latest"
    );

    //var responseObj = JSON.parse(request.responseText);
    request.send();
  }
  console.log(tag);
  renderItems(repositories);
}

function tagName() {
  var responseObj = JSON.parse(this.responseText);
  tag.push(responseObj.tag_name);
}
/*
* Renders the DOM from repositories provided
*
*/
function renderItems(repositories) {
  flag = true;
  for (repo in repositories) {
    if (repositories[repo].language == null) {
      repositories[repo].language = "-";
    }
    tempItem = ITEMTEMPLATE;
    tempItem = tempItem.replace("REPONAME", repositories[repo].full_name);
    tempItem = tempItem.replace("REPOLANGUAGE", repositories[repo].language);
    tempItem = tempItem.replace("ADD", repo);
    tempItem = tempItem.replace("REPOTAG", tag[repo]);
    $("#searchTable").append(tempItem);
  }
}
function addToFavourites(repo) {
  var index = favourites.indexOf(repo);
  if (index > -1) {
    alert("The item already exists in your favourites");
  } else {
    favourites.push(repo);
    console.log(favourites);
    tempItem = FAVTEMPLATE;
    tempItem = tempItem.replace("TAGREPONAME", repositories[repo].full_name);
    tempItem = tempItem.replace("TAGREPOLANGUAGE", repositories[repo].language);
    tempItem = tempItem.replace("REPOTAGID", tag[repo]);
    tempItem = tempItem.replace("REPO", repo);
    tempItem = tempItem.replace("REMOVE", repo);
    $("#favTable").append(tempItem);
  }
}

function removeFromFavourites(repo) {
  var index = favourites.indexOf(repo);
  if (index > -1) {
    favourites.splice(index, 1);
    var itemNode = document.getElementById(repo);
    itemNode.parentNode.removeChild(itemNode);
  } else {
    alert("not in favourites");
  }
}
