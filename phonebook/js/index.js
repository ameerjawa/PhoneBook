"use strict";

/*************************
 * get object elements from Html and define variables
 *
 *
 * ********************* */
let editsbtn = document.getElementById("saveeditcontact");
let nameinput = document.getElementById("name");
let phoneinput = document.getElementById("telephone");
let addressinput = document.getElementById("address");
let emailinput = document.getElementById("email");
let descriptioninput = document.getElementById("description");
let selected = document.getElementById("contacts");
let saveallbutton = document.getElementById("saveAll");
let cancelButton = document.getElementById("deleteAll");
let addnewperson = document.getElementById("addnewperson");
let cancelbtn = document.getElementById("cancelbtn");
let addnewpersonbtn = document.getElementById("addnewpersonbtn");
let h = document.getElementById("headerOfForm");
let addbtn = document.getElementById("addcontact");
let saveeditbtn = document.getElementById("saveeditcontact");
let sectionofdetails = document.getElementById("showdetailsid");
let overlay = document.getElementById("overlay");
let stylechangemodebtn = document.getElementById("stylemode");
let arrayofcontacts = [];
let flagmode = true;
let flagcancelforedit = false;

/*************************
 *   functions
 *
 *
 * ***************
 */

// function that refresh the table and updates values

function refreshtable() {
  let table = "<ul id='contactstable' border='1'>";
  if (arrayofcontacts.length > 0) {
    for (let i = 0; i < arrayofcontacts.length; i++) {
      table +=
        `<li id="a"><a onclick="showdetails(${i})">` +
        arrayofcontacts[i].name +
        `</a><a id="a" onclick="showdetails(${i})">` +
        arrayofcontacts[i].phone +
        `</a><a><button onclick="editdetails(${i})"><svg height="13pt" viewBox="0 -1 401.52289 401" width="12.5pt" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg></button></a><a><button onclick="deltecontact(${i})"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button></a></li>`;
    }
  } else {
    table += `<p class="nocontacts"> No Entries Found</p>`;
  }
  table += "</ul>";

  selected.innerHTML = table;
}

// function that check if the the details are exist in the contact details
function checkifdetailexists(place) {
  let sectionfordetailsstr = "";
  sectionfordetailsstr += `<h1>${arrayofcontacts[place].name}</h1><p class="detailtitle">Phone :</p><p>${arrayofcontacts[place].phone}</p>`;
  if (arrayofcontacts[place].email != "") {
    sectionfordetailsstr += `<p class="detailtitle">email : </p><p>${arrayofcontacts[place].email}</p>`;
  }
  if (arrayofcontacts[place].address != "") {
    sectionfordetailsstr += `<p class="detailtitle">address : </p><p>${arrayofcontacts[place].address}</p>`;
  }
  if (arrayofcontacts[place].description != "") {
    sectionfordetailsstr += `<p class="detailtitle">More : </p><p>${arrayofcontacts[place].description}</p>`;
  }
  sectionofdetails.innerHTML = sectionfordetailsstr;
}

// function that check if name of peron or phone is already exists
function checkpersoninarray(personname, phonenum) {
  for (let i = 0; i < arrayofcontacts.length; i++) {
    if (
      personname == arrayofcontacts[i].name ||
      phonenum == arrayofcontacts[i].phone
    ) {
      return false;
    }
  }
  return true;
}
/********************
 *
 * sort array by name
 ***************/
function sortcontacts(arrayofcontacts) {
  arrayofcontacts.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

// function that update input values to Empty
function updateallinputsvalues() {
  nameinput.setAttribute("value", "");
  phoneinput.setAttribute("value", "");
  addressinput.setAttribute("value", "");
  emailinput.setAttribute("value", "");
  descriptioninput.setAttribute("value", "");
}

// addeventsListener function that show addnewperson window
addbtn.addEventListener("click", () => {
  document.getElementById("addnewpersonbtn").style.height = "25px";
  document.getElementById("saveeditcontact").style.height = "0";

  h.innerText = "add new person";
  addnewperson.className = "enablemode";
  addnewpersonbtn.style.visibility = "visible";
  saveeditbtn.style.visibility = "hidden";
  overlay.style.pointerEvents = "all";
  overlay.style.opacity = "1";

  updateallinputsvalues();
});

// function exit the window of addnewperson or Edit
cancelbtn.addEventListener("click", () => {
  addnewperson.className = "disablemode";
  addnewpersonbtn.style.visibility = "hidden";
  saveeditbtn.style.visibility = "hidden";
  overlayflag = true;
  overlay.style.pointerEvents = "none";
  overlay.style.opacity = "0";
  if (flagcancelforedit) {
    document.getElementById("addnewperson").reset();
    flagcancelforedit = false;
  }
});

/*****************
 * insert a new contact
 ***************/
// function that check the values of the input and if its correct thin we add to array
addnewpersonbtn.addEventListener("click", (e) => {
  if (
    nameinput.value != "" &&
    phoneinput.value.length == 10 &&
    checkpersoninarray(nameinput.value, phoneinput.value)
  ) {
    overlay.style.pointerEvents = "none";
    overlay.style.opacity = "0";
    overlayflag = true;
    arrayofcontacts.push({
      name: nameinput.value,
      phone: phoneinput.value,
      address: addressinput.value,
      email: emailinput.value,
      description: descriptioninput.value,
    });
    addnewperson.className = "disablemode";
    addnewpersonbtn.style.visibility = "hidden";
    document.getElementById("addnewperson").reset();
    e.preventDefault();
    sortcontacts(arrayofcontacts);
    refreshtable();
  } else if (!checkpersoninarray(nameinput.value, phoneinput.value)) {
    alert("this person name or phone is already added!");
  } else {
    alert("enter a name and right phone");
  }
  document.getElementById("addnewperson").reset();
});

/*****************
 * delte all function
 *
 ***************/
// addeventlistener function that delete all the contacts
cancelButton.addEventListener("click", () => {
  arrayofcontacts = [];
  refreshtable();
});

/*****************
 * save in local storage
 ***************/
// check if local storage is empty

if (localStorage.getItem("array")) {
  arrayofcontacts = JSON.parse(localStorage.getItem("array"));
  refreshtable();
}

// addeventlistener  call the function of saving
saveallbutton.addEventListener("click", () => {
  saveInStorage(arrayofcontacts);
});
// function that saves the contacts in local storage
function saveInStorage(arrayofcontacts) {
  localStorage.setItem("array", JSON.stringify(arrayofcontacts));
}

/***************
 *
 *  delete contact
 *
 *
 ****************/
function deltecontact(place) {
  arrayofcontacts.splice(place, 1);
  refreshtable();
}
/*********************************
 *
 *  search bar
 ******************************/
function searchfunction() {
  var input, filter, ul, li, a, txtValue;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("contactstable");
  li = ul.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
/**
 *
 * edit button
 *
 ***************************/

// function  that display the edit window
function displayeditwindow() {
  document.getElementById("saveeditcontact").style.height = "25px";
  document.getElementById("addnewpersonbtn").style.height = "0";
  flagcancelforedit = true;
  overlayflag = false;
  addnewperson.className = "enablemode";
  overlay.style.pointerEvents = "all";
  overlay.style.opacity = "1";
  saveeditbtn.style.visibility = "visible";
  addnewpersonbtn.style.visibility = "hidden";
  h.innerText = `edit person`;
}

function checkeditperson(area, name, phone) {
  for (let i = 0; i < arrayofcontacts.length; i++) {
   
    if (i!=area && (arrayofcontacts[i].name == name || arrayofcontacts[i].phone == phone )) {
      return false;
    }
  }
  return true;
}
// function that work when editbtn is pressed
function editdetails(area) {
  displayeditwindow();

  nameinput.setAttribute("value", arrayofcontacts[area].name);
  phoneinput.setAttribute("value", arrayofcontacts[area].phone);
  addressinput.setAttribute("value", arrayofcontacts[area].address);
  emailinput.setAttribute("value", arrayofcontacts[area].email);
  descriptioninput.setAttribute("value", arrayofcontacts[area].description);

  // function that work when savebtn is pressed
  editsbtn.onclick = (e) => {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("telephone").value;
    if (
      nameinput.value != "" &&
      phoneinput.value.length == 10 &&
      checkeditperson(area, name, phone)
    ) {
      overlayflag = true;
      overlay.style.pointerEvents = "none";
      overlay.style.opacity = "0";

      e.preventDefault();

      //delete the exists and insert the updated

      arrayofcontacts.splice(area, 1);
      arrayofcontacts.push({
        name: document.getElementById("name").value,
        phone: document.getElementById("telephone").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        description: document.getElementById("description").value,
      });
      sortcontacts(arrayofcontacts);
      document.getElementById("addnewperson").reset();
      updateallinputsvalues();
      e.preventDefault();
      refreshtable();

      addnewperson.className = "disablemode";
      saveeditbtn.style.visibility = "hidden";
    } else if (!checkeditperson(area, name, phone)) {
      alert("this person name or phone is already exist!");
    } else {
      alert("enter a name and right phone");
    }
    document.getElementById("addnewperson").reset();
  };
}

/******************************
 *
 * show details window
 *
 *
 ******************************/

function showdetails(place) {
  overlayflag = true;
  sectionofdetails.className = "enablemode";
  overlay.style.pointerEvents = "all";
  overlay.style.opacity = "1";
  overlay.setAttribute("class", "active");
  checkifdetailexists(place);
}
let overlayflag;
overlay.addEventListener("click", () => {
  if (overlayflag == true) {
    sectionofdetails.className = "disablemode";
    overlay.setAttribute("class", "");
    overlay.style.pointerEvents = "none";
    overlay.style.opacity = "0";
  }
});
/*****************
 *
 * Style Modes
 *
 *
 ******************/

stylechangemodebtn.addEventListener("click", () => {
  if (flagmode) {
    document.body.style.backgroundImage = `url("images/lightmode.jpg")`;
    document.body.style.color = "black";
    document.getElementById("stylemode").style.color = "black";
    document.getElementById("searchbar").style.background = "white";
    document.getElementById("searchbar").style.color = "black";
    document.getElementById("showdetailsid").style.backgroundColor =
      "rgba(255, 255, 255)";
    document.getElementById("addnewperson").style.background =
      "rgba(255, 255, 255)";
    flagmode = false;
  } else {
    document.body.style.backgroundImage = `url("images/darkmode.jpg")`;
    document.getElementById("stylemode").style.color = "wheat";
    document.body.style.color = "wheat";
    document.getElementById("searchbar").style.background = "black";
    document.getElementById("searchbar").style.color = "wheat";
    document.getElementById("a").style.color = "wheat";
    document.getElementById("addnewperson").style.background =
      "rgba(0, 0, 0, 0.808)";
    document.getElementById("showdetailsid").style.backgroundColor =
      "rgba(0, 0, 0, 0.842)";
    flagmode = true;
  }
});

/*****************
  * 
  * 


     set a default data to array




 ******************* */
defaultContact();
function defaultContact() {

  if (arrayofcontacts.length == 0) {

    arrayofcontacts.push({
      name: "Ameer",
      phone: "0535487594",
      address: "New York",
      email: "ameer@gmail.com",
      description: "i am nice",
    });

    arrayofcontacts.push({
      name: "Ziki",
      phone: "0525148755",
      address: "Las Vegas",
      email: "ziki@gmail.com",
      description: "i am here",
    });
    refreshtable();
  }
}
