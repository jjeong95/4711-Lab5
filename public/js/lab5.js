var artistList = [];

function sendData(){
  fetch('/addArtist',{
    method: 'POST',
    body: JSON.stringify(artistList),
    header: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
  })
}

function getData(){
  fetch('/getArtist')
  .then((res)=>{res.json()
    .then(function (data){
      if (data.length > 0){
      
        artistList = data;
        console.log(artistList.length + " after reading the file");
        load();
      }
    })
  })
}
  

function displayAdd() {
    var x = document.getElementById("addArtist");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function createArtist(){

    
    //*Grabs value from input box
    var artistName = document.getElementById("name").value;
    var artistAbout = document.getElementById("about").value;
    var artistUrl = document.getElementById("url").value;
    
    //
    const artist = {
      name: artistName,
      about: artistAbout,
      url: artistUrl
    };

    artistList.push(artist);
    console.log(artistList.length + "when adding artist");
    

    sendData();

    getData();
    artistName.text =  " ";
    artistAbout.text = " ";
    artistUrl.text = " ";
    
    // localStorage.setItem(artistName, JSON.stringify(artist));

    // load();
    
}

function load(){
      
      var parentDiv = document.getElementById("profileList").childElementCount;
      var profList = document.getElementById("profileList");
      console.log(parentDiv);
      for(i = 0; i < parentDiv; i++){

        profList.children[i].style.display = "none";

      }
      for(i = 0; i < artistList.length; i++){
      
      var profileList = document.getElementById("profileList");

      var profile = document.createElement("div");
      var profileText = document.createElement("div");
      var nameDiv = document.createElement("b");
      var aboutDiv = document.createElement("p");
      var urlDiv = document.createElement("img");

      var deleteDiv = document.createElement("div");
      var deleteButton = document.createElement("button");

      deleteDiv.append(deleteButton);
      
      // var currentName = localStorage.key(i);
      
      //Grabs values in name, about, url from localstorage objects.
      // var splitName = localStorage.getItem(currentName).split("!");
      // var getName = splitName[1];
      // var splitAbout = localStorage.getItem(currentName).split("~");
      // var getAbout = splitAbout[1];
      // var splitUrl = localStorage.getItem(currentName).split("#");
      // var getUrl = splitUrl[1];
      
      var currentArtist = artistList[i];

      var getName = currentArtist.name;
      var getAbout = currentArtist.about;
      var getUrl = currentArtist.url;

      
      //Assign attribute to elements
      profileText.setAttribute("class","profileText");
      profile.setAttribute("class","profile");
      profile.setAttribute("id",getName);
      urlDiv.setAttribute("src",getUrl);
      deleteButton.setAttribute("class", "deleteButton");
      deleteDiv.setAttribute("onclick", "deleteDiv(this)");
      deleteDiv.setAttribute("class", "deleteDiv");

      //*Assign text values
      nameDiv.textContent = getName;
      aboutDiv.textContent = getAbout;
      deleteButton.textContent = "delete";

      profileText.append(nameDiv);
      profileText.append(aboutDiv);

      profile.append(urlDiv);
      profile.append(profileText);
      profile.append(deleteDiv);


      profileList.append(profile);

      
      }
    // //Assign attribute to elements
    // profileText.setAttribute("class","profileText");
    // profile.setAttribute("class","profile");
    // profile.setAttribute("id",getName);
    // // urlDiv.setAttribute("src",artistUrl);
    // deleteButton.setAttribute("class", "deleteButton");
    // deleteDiv.setAttribute("onclick", "deleteDiv(this)");
    // deleteDiv.setAttribute("class", "deleteDiv");

    // //*Assign text values
    // nameDiv.textContent = artistName;
    // aboutDiv.textContent = artistAbout;
    // deleteButton.textContent = "delete";

    // profileText.append(nameDiv);
    // profileText.append(aboutDiv);

    // profile.append(urlDiv);
    // profile.append(profileText);
    // profile.append(deleteDiv);


    // profileList.append(profile);

}

function deleteDiv(e){
    e.parentNode.remove();
    console.log(e.parentNode.id);
    artistList.splice(e.parentNode.id, 1);

    console.log(artistList);
    
    sendData();
}

function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("profileList");
  li = ul.getElementsByClassName("profileText");
  
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("b")[0];
      txtValue = a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].parentNode.style.display = "";
      } else {
          li[i].parentNode.style.display = "none";
      }
  }
}