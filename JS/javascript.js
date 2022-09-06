function openNav(){
  document.getElementById("myNav").style.height = "60%";
}

function closeNav(){
  document.getElementById("myNav").style.height = "0%";
}

var rssContentLeft;
var rssContentRight;
function loadRSS() {
  //Use CORS API website as proxy
  let proxy = "https://cors-anywhere.herokuapp.com/";

  //Declare the URL where we fetch RSS file
  let url = "http://rss.cnn.com/rss/edition.rss";
  //NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds
  //     NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
  //CNN RSS: https://edition.cnn.com/services/rss/
  //    CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
  //BBC RSS: http://feeds.bbci.co.uk/news/rss.xml

  //Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", proxy + url, true);
  xhttp.send();

  //Process RSS file when it has been loaded successfully		
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //Load XML file as "XML" format and parse/process it by calling function parseRSS()
      let rss = this.responseXML;
      parseRSS(rss);	}
  };
}

function parseRSS(rss) {
  //Load all "items" inside the RSS document, each item is a news
  let items = rss.getElementsByTagName("item");			
  let rssContent = "";//varible "rssContent" is used to store rss content in HTML format

  //Loop through all "items" (news) and extract child node content: "title", "link", "description" and "pubdate"
  for (let i = 0; i< items.length; i++) {
    let nodes = items[i].children;
    //Extract "title", "link", "description" and "pubdate" of each "node"
    let title, pubdate, description, link;
    for (let j = 0; j < nodes.length; j++) {
      if (nodes[j].tagName == "title") {
        title = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "link") {
        link = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "description") {
        description = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "pubDate") {
        pubdate = nodes[j].childNodes[0].nodeValue;
      }
    }
    //Format the extracted information above in HTML format and append it to the "rssContent" variable
    //each item (news) is wrapped inside a <div>
    rssContent = `<div class="bg-light m-2">																
													<h3>${title}</h3>
													<p style="font-style: italic;">${pubdate}</p>
													<p>${description}</p>
													<p><a href="${link}">Read more</a></p>
											</div>`;							

    if (i % 2 == 0){
      rssContentLeft += rssContent;
    } else if (i % 2 == 1) {
      rssContentRight += rssContent;
    }
  }
  //Display the "rssContent" on the webpage
  document.getElementById("rssFeedLeft").innerHTML = rssContentLeft;
  document.getElementById("rssFeedRight").innerHTML = rssContentRight;
}


//Forms page
//HTML page


//javascript page
//Create manual and automatic slideshow for products

//Array to hold informatoin of products in slideshow
let slideProducts = [
  {id: 0, title: "HP Pentium Silver",image_url: "media/laptop1.PNG", desc: "<b>$719.20</b><br>Intel® Pentium® Silver N6000 PRocessor<br>4GB RAM<br>128GB SSD Storage<br>Intel® UHD Graphics<br>Windows 11 Home in S mode<br>39.6 cm (15.6') diagonal HD display"},
  {id: 1, title: "Lenovo IdeaPad Slim",image_url: "media/laptop2.PNG", desc: "<b>$1,099.00</b><br>Intel Core i5-1135G7 (4C / 8T, 2.4 / 4.2GHz, 8MB)<br>8GB RAM (4GB Soldered DDR4-3200 + 4GB SO-DIMM DDR4-3200)<br>256GB SSD<br>Integrated Intel Iris Xe Graphics<br>Windows 11 Home 64"},
  {id: 2, title: "Lenovo IdeaPad Slim 1 Intel Celeron", image_url: "media/laptop3.PNG", desc: "<b>$749.00</b><br>Intel Celeron N4500 Processor<br>4GB RAM<br>128GB eMMC 5.1 Storage<br>Integrated Intel UHD Graphics<br>Windows 11 Home in S mode<br>Microsoft 365 Personal"},
  {id: 3, title: "Acre Aspire 3 Intel Celeron", image_url: "media/laptop4.PNG", desc: "<b>$519.00</b><br>Intel® Celeron® N4500 Processor<br>4GB RAM<br>128GB SSD Storage<br>UMA Graphics<br>Windows 11 S mode<br>"}
]
//Increments and decrements for usage in the manual slideshow
let manualIndex = 0;

function nextItem() {
  //Increases length of the index unless it is the end of the array then it sets it to 0
  if(manualIndex < slideProducts.length - 1){
    manualIndex++;
  } else {
    manualIndex = 0;
  }
  //Reinitilises the element html or image with the array attributes
  document.getElementById("manualTitle").innerHTML = slideProducts[manualIndex].title;
  document.getElementById("manualImage").src = slideProducts[manualIndex].image_url;
  document.getElementById("manualDesc").innerHTML = slideProducts[manualIndex].desc;
}

function previousItem(){
  //Reduces length of the index unless it is 0 then sets it to the end of the array
  if (manualIndex > 0) {
    manualIndex--;
  } else {
    manualIndex = slideProducts.length - 1;
  }
  //Reinitilises the element html or image with the array attributes
  document.getElementById("manualTitle").innerHTML = slideProducts[manualIndex].title;
  document.getElementById("manualImage").src = slideProducts[manualIndex].image_url;
  document.getElementById("manualDesc").innerHTML = slideProducts[manualIndex].desc;
}


let autoIndex = 0;

//Forever loop automatically looping through images in the javascript slideshow page
function autoSlide(){
  if(autoIndex < slideProducts.length - 1){
    autoIndex++;
  } else {
    autoIndex = 0;
  }
  //Reinitilises the element html or image with the array attributes
  document.getElementById("autoTitle").innerHTML = slideProducts[autoIndex].title;
  document.getElementById("autoImage").src = slideProducts[autoIndex].image_url;
  document.getElementById("autoDesc").innerHTML = slideProducts[autoIndex].desc;

  //Loops the function by calling itself every 2 seconds
  setTimeout(autoSlide, 2000);
}
//Forces this function to run as soon as it is compiled
autoSlide(); 

//Customisation menu, change background color, change base font size

//Array of colors used for changing the background in the changeBackground()
let colors = [{id: 0, color: "white"},{id: 1, color: "red"},{id: 2, color: "orange"},
              {id:3, color: "yellow"},{id:4, color: "green"},{id:5, color: "blue"},
              {id: 6, color: "indigo"},{id: 7, color: "violet"}];

//Array of font sizes used for changing the font size in the changeFontSize()
let fontSizes = [{id: 0, size: "0.2em"},{id: 1, size: "0.5em"}, {id: 2, size: "0.8em"}, 
                 {id: 3, size: "1em"}, {id:4, size: "1.5em"}, {id: 5, size: "2em"}];

//This function loads the colors and fontsizes in the indiviual select elements ready for the user to modify
function loadItems() {
  //Creates variables with copies of the elements
  let colorSelect = document.getElementById("backgroundSelect");
  let sizeSelect = document.getElementById("fontSelect");

  //Two for loops are required as each array is different sizes
  for(var i=0; i < colors.length; i++) {
    //Creates a node to hold an id and value (key value pair)
    let node = document.createElement("option");
    node.value = colors[i].id.toString();
    node.textContent = colors[i].color.toString();
    //Appends to select element
    colorSelect.appendChild(node);
  }

  //Same as previous for loop
  for(var i=0;i< fontSizes.length; i++){
    let node = document.createElement("option");
    node.value = fontSizes[i].id.toString();
    node.textContent = fontSizes[i].size.toString();
    sizeSelect.appendChild(node);
  }

  //Changes the select element index to the first
  colorSelect.selectIndex = colors[0];
  sizeSelect.selectIndex = fontSizes[0];
}
//Forces this function to run as soon as it is compiled
loadItems();

//Called to change the background color through the previously appended select element when it's value is changed
function changeBackground(){
  //Create a variable with the backgroundSelect element as it's value
  let idx = document.getElementById("backgroundSelect").value;
  //The main element is retrieved with the first element as it is a tag instead of an id or class
  //Element style can be changed directly through JS
  document.getElementsByTagName("main")[0].style.backgroundColor = colors[idx].color;
}

//Called to change the font size through the previously appended select eleent when it's value is changed
function changeFontSize(){
  //Create a variable with the fontSelect element as it's value
  let idx = document.getElementById("fontSelect").value;
  //The body element can be accessed directly as it is a part of HTML
  //Base font sizes are modified
  document.body.style.fontSize = fontSizes[idx].size;
}


//Authentication, login, sign up section
//This array holds initial mock accounts and future created accounts through signUp()
var users = [{username: "Testing User", password: "Testing"},
             {username: "newuser", password: "newpassword"}];

//Called through the authenication, this takes values from the username and password and appends them under one node in the users[] array
function signUp(){
  let name = document.getElementById("usernameSignUp").value;
  let pass = document.getElementById("passwordSignUp").value;
  //users gets a new key-value pair appended
  users[length] = {username: name, password: pass};
  //Alerts the user through a Google popup when sign up is successful
  alert("Signed Up!")
}

function login(){
  //Creates two variables with the username and password as their value
  let name = document.getElementById("usernameLogin").value;
  let pass = document.getElementById("passwordLogin").value;

  //For loop loopign through the users array checking user.username values to check for a match
  for (var i = 0; i < users.length; i++){
    if (users[i].username == name) {
      //If a match is found an if statement is ran to check the passwords match
      if (users[i].password == pass){
        //If true; notify the user, break loop
        alert("Logged In! Welcome to... Nothing!");
        /*do what ever you want here*/
        break;
      } else {
        //If false; notify the user, break loop
        alert("Invalid password");
        /*do what ever you want here*/
        break;
      }
    }
    //If no user is found; notify the user
    if (i == users.length - 1){ 
      alert("User does not exist");
    }
  }
}

//Like & Disliking a product and displaying current ratio

//Mock like and dislike values
var likes = 25;
var dislikes = 4;

//Bools to check if the user has either liked or disliked
var liked = false;
var disliked = false;

//Forces this function to run upon compilation
updateCounter();

//Called through the like button
function likeProduct(){
  //If else statements to check like / dislike states
  if(!liked && !disliked){ // if the user has not voted
    liked = true;
    likes++;
    //adds a like
  } else if (!liked && disliked){ //if the user has disliked
    likes++;
    dislikes --;
    disliked = false;
    liked = true;
    //adds a like, removes a dislike
  } else if (liked) { //if the user has liked
    likes--;
    liked = false;
    //removes the like
  }
  //Updates counter to new value
  updateCounter();
}

//This function is the same as the previous likeProduct() function but with focusing on dislikes instead of likes
function dislikeProduct(){
  if(!disliked && !liked){
    disliked = true;
    dislikes++;
  } else if (!disliked && liked) {
    disliked = true;
    liked = false;
    dislikes++;
    likes--;
  } else if (disliked){
    disliked = false;
    dislikes--;
  }
  updateCounter();
}

//Changes the current like and dislike counter to the new values
function updateCounter(){
  document.getElementById("likeCount").innerHTML = likes;
  document.getElementById("dislikeCount").innerHTML = dislikes;
}