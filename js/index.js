let nameInpute = document.querySelector(".name-input");
let numberInpute = document.querySelector(".number-input");
let emailInpute = document.querySelector(".email-input");
let addressInpute = document.querySelector(".address-input");
let groupInpute = document.querySelector(".group-input");
let noteInpute = document.querySelector(".note-input");

let searchInpute = document.querySelector(".search-input");

let total = document.querySelector(".total-counter span");
let allContacts = document.querySelector(".all-contacts span");
let favoriteContacts = document.querySelector(".favorite-counter span");
let emergencyCatacts = document.querySelector(".emergency-counter span");

let updateBtn = document.querySelector(".update-btn");
let saveBtn = document.querySelector(".save-btn");
let addBtn = document.querySelector(".add-btn");
saveBtn.onclick = addContact;
addBtn.onclick = openModal;
contactsList = [];
favoriteList = [];
emergencyList = [];

// check if loclaStorage empty or not
if (localStorage.getItem("contactContainer") !== null) {
    contactsList = JSON.parse(localStorage.getItem("contactContainer"));

    displayEmergency();
    displayFavorite();
    display();

}



// change title of modal
function openModal() {
    document.querySelector(".modal-title").innerHTML = "Add Contact";
    clear();
}


//  add contact 
function addContact() {
    if (validationName() && validationNumber() && validationDuplicate()) {
        let contact = {
            id: Date.now(),
            name: nameInpute.value,
            number: numberInpute.value,
            email: emailInpute.value,
            address: addressInpute.value,
            group: groupInpute.value,
            note: noteInpute.value,
            favorite: false,
            emergency: false
        };
        contactsList.push(contact);
        localStorage.setItem("contactContainer", JSON.stringify(contactsList));
        display();
        clear();
    }
    else {
        alert("enter a valid name")
    }
}



// display contact 
function display() {
    var totalCounter = 0;
    let cartona = "";
    for (var i = 0; i < contactsList.length; i++) {
        cartona += `
               <div class="col-xl-6">
                                    <div class="contact-item rounded-top-4 border">
                                        <div class="contact-head d-flex align-items-center">
                                            <div class="person-icon me-3">${contactsList[i].name.charAt(0).toUpperCase()}</div>
                                            <div class="person-info">
                                                <h4>${contactsList[i].name}</h4>
                                                <div class="person-num d-flex align-items-center">
                                                    <div class="phone-badge">
                                                        <i class="fa-solid fa-phone"></i>
                                                    </div>
                                                    <span>${contactsList[i].number}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="contact-body mt-3">
                                            <div class="contact-email ${contactsList[i].email ? "" : 'd-none'} d-flex align-items-center mb-3">
                                                <div class="email-icon b-icon">
                                                    <i class="fa-solid fa-envelope"></i>
                                                </div>
                                                <span>${contactsList[i].email}</span>
                                            </div>
                                            <div class="contact-address ${contactsList[i].address ? "" : 'd-none'} d-flex align-items-center mb-3">
                                                <div class="address-icon b-icon">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                <span>${contactsList[i].address}</span>
                                            </div>
                                            <div class="relation">
                                                <span class="group-icon ${contactsList[i].group ? "" : 'd-none'}">${contactsList[i].group}</span>
                                                <span class="emergency  d-none">
                                                    <i class="fa-solid fa-heart-pulse"></i>
                                                    Emergency
                                                </span>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div class="contact-footer rounded-bottom-4 d-flex justify-content-between">
                                        <div class="mail-phone d-flex align-items-center">
                                            <a href="tel:+${contactsList[i].number}" class="phone-to"><i class="fa-solid fa-phone"></i></a>
                                            <a href="mailto:${contactsList[i].email}" class="mail-to ${contactsList[i].email ? "" : 'd-none'}"><i class="fa-solid fa-envelope"></i></a>
                                        </div>
                                        <div class="control-btns">
                                            <button onclick="addFavorite(${i})" class="star-icon"> <i class="${contactsList[i].favorite ? 'fa-solid' : 'fa-regular'} fa-star"></i></button>
                                            
                                            <button onclick="addEmergency(${i})" class="heart-icon"> <i class="${contactsList[i].emergency ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button>
                                            
                                            <button onclick="editContact(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="pen-icon"> <i class="fa-solid fa-pen"></i></button>
                                            
                                            <button onclick="deleteContact(${i})" class="trash-icon"> <i class="fa-solid fa-trash"></i></button>
                                           
                                                                                                            
                                        </div>
                                    </div>
                                </div>
        `
        totalCounter++;
    }
    document.querySelector(".contacts-list").innerHTML = cartona;
    total.innerHTML = totalCounter;
    allContacts.innerHTML = totalCounter;



}


// delete contact
function deleteContact(index) {


    contactsList.splice(index, 1);
    localStorage.setItem("contactContainer", JSON.stringify(contactsList));

    displayEmergency();
    displayFavorite();
    display();
}



// clear modal
function clear() {
    nameInpute.value = null;
    numberInpute.value = null;
    emailInpute.value = null;
    addressInpute.value = null;
    groupInpute.value = null;
    noteInpute.value = null;

}

//  add favorite contact
function addFavorite(index) {
    contactsList[index].favorite = !contactsList[index].favorite;

    localStorage.setItem("contactContainer", JSON.stringify(contactsList));
    displayFavorite();
    display();

}





// display favorite contacts
function displayFavorite() {
    var favoriteCounter = 0;

    let cartona = "";
    for (var i = 0; i < contactsList.length; i++) {
        if (contactsList[i].favorite === true) {
            cartona += `
    
    
         <div class="fav-contact d-flex justify-content-between align-items-center">
                                                <div class="contact-info d-flex align-items-center">
                                                    <div class="contact-icon">
                                                        ${contactsList[i].name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div class="contact-text">
                                                        <h5>${contactsList[i].name}</h5>
                                                        <span>${contactsList[i].number}</span>
                                                    </div>
                                                </div>
                                                <div class="phone-icon">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                            </div>
                                            
    `
            favoriteCounter++;
        }
    }

    document.querySelector(".fav-contacts-list").innerHTML = cartona;
    favoriteContacts.innerHTML = favoriteCounter;
}



// add emergency contact
function addEmergency(index) {
    contactsList[index].emergency = !contactsList[index].emergency;


    localStorage.setItem("contactContainer", JSON.stringify(contactsList));
    displayEmergency();
    display();

}










// display emergency contacts
function displayEmergency() {
    var emergencyCounter = 0;

    let cartona = "";
    for (var i = 0; i < contactsList.length; i++) {

        if (contactsList[i].emergency === true) {
            cartona += `
             <div class="emerg-contact d-flex justify-content-between align-items-center">
                                            <div class="contact-info d-flex align-items-center">
                                                <div class="contact-icon">
                                                    ${contactsList[i].name.charAt(0).toUpperCase()}
                                                </div>
                                                <div class="contact-text">
                                                    <h5>${contactsList[i].name}</h5>
                                                    <span>${contactsList[i].number}</span>
                                                </div>
                                            </div>
                                            <div class="phone-icon emerg-phone">
                                                <i class="fa-solid fa-phone"></i>
                                            </div>
                                        </div>
        `
            emergencyCounter++;
        }
    }
    document.querySelector(".emerg-contacts-list").innerHTML = cartona;
    emergencyCatacts.innerHTML = emergencyCounter;
}


let currentEditIndex = 0;

// edite contact 
function editContact(index) {

    currentEditIndex = index;

    nameInpute.value = contactsList[index].name;
    numberInpute.value = contactsList[index].number;
    emailInpute.value = contactsList[index].email;
    addressInpute.value = contactsList[index].address;
    groupInpute.value = contactsList[index].group;
    noteInpute.value = contactsList[index].note;

    saveBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    document.querySelector(".modal-title").innerHTML = "Edite Contact";
}



// update contact 
function updateContact() {
    contactsList[currentEditIndex].name = nameInpute.value;
    contactsList[currentEditIndex].number = numberInpute.value;
    contactsList[currentEditIndex].email = emailInpute.value;
    contactsList[currentEditIndex].address = addressInpute.value;
    contactsList[currentEditIndex].group = groupInpute.value;
    contactsList[currentEditIndex].note = noteInpute.value;

    localStorage.setItem("contactContainer", JSON.stringify(contactsList));

    display();
    displayEmergency();
    displayFavorite();
    openModal();
    updateBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");
}



// search for a contact
function searchContact() {
    let term = searchInpute.value;

    let cartona = "";
    for (var i = 0; i < contactsList.length; i++) {
        if (contactsList[i].name.toUpperCase().includes(term.toUpperCase())) {
            cartona += `
               <div class="col-xl-6">
                                    <div class="contact-item rounded-top-4 border">
                                        <div class="contact-head d-flex align-items-center">
                                            <div class="person-icon me-3">${contactsList[i].name.charAt(0).toUpperCase()}</div>
                                            <div class="person-info">
                                                <h4>${contactsList[i].name}</h4>
                                                <div class="person-num d-flex align-items-center">
                                                    <div class="phone-badge">
                                                        <i class="fa-solid fa-phone"></i>
                                                    </div>
                                                    <span>${contactsList[i].number}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="contact-body mt-3">
                                            <div class="contact-email ${contactsList[i].email ? "" : 'd-none'} d-flex align-items-center mb-3">
                                                <div class="email-icon b-icon">
                                                    <i class="fa-solid fa-envelope"></i>
                                                </div>
                                                <span>${contactsList[i].email}</span>
                                            </div>
                                            <div class="contact-address ${contactsList[i].address ? "" : 'd-none'} d-flex align-items-center mb-3">
                                                <div class="address-icon b-icon">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                <span>${contactsList[i].address}</span>
                                            </div>
                                            <div class="relation">
                                                <span class="group-icon ${contactsList[i].group ? "" : 'd-none'}">${contactsList[i].group}</span>
                                                <span class="emergency  d-none">
                                                    <i class="fa-solid fa-heart-pulse"></i>
                                                    Emergency
                                                </span>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div class="contact-footer rounded-bottom-4 d-flex justify-content-between">
                                        <div class="mail-phone d-flex align-items-center">
                                            <a href="tel:+${contactsList[i].number}" class="phone-to"><i class="fa-solid fa-phone"></i></a>
                                            <a href="mailto:${contactsList[i].email}" class="mail-to ${contactsList[i].email ? "" : 'd-none'}"><i class="fa-solid fa-envelope"></i></a>
                                        </div>
                                        <div class="control-btns">
                                            <button onclick="addFavorite(${i})" class="star-icon"> <i class="${contactsList[i].favorite ? 'fa-solid' : 'fa-regular'} fa-star"></i></button>
                                            
                                            <button onclick="addEmergency(${i})" class="heart-icon"> <i class="${contactsList[i].emergency ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button>
                                            
                                            <button onclick="editContact(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="pen-icon"> <i class="fa-solid fa-pen"></i></button>
                                            
                                            <button onclick="deleteContact(${i})" class="trash-icon"> <i class="fa-solid fa-trash"></i></button>
                                           
                                                                                                            
                                        </div>
                                    </div>
                                </div>
        `
            document.querySelector(".contacts-list").innerHTML = cartona;
        }

    }
}




//validation Name 
function validationName() {
    var regex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    var text = nameInpute.value;

    let msgName = document.querySelector(".msg-name");

    if (regex.test(text)) {
        msgName.classList.add("d-none");
        nameInpute.classList.remove("border-danger");
        return true;
    }
    else {
        msgName.classList.remove("d-none");
        nameInpute.classList.add("border-danger");
        return false;
    }

}




//validation Number
function validationNumber() {
    var regex = /^01[0125][0-9]{8}$/;
    var text = numberInpute.value;

    let msgNumber = document.querySelector(".msg-number");

    if (regex.test(text)) {
        msgNumber.classList.add("d-none");
        numberInpute.classList.remove("border-danger");
        return true;
    }
    else {
        msgNumber.classList.remove("d-none");
        numberInpute.classList.add("border-danger");
        return false;
    }


}

function validationDuplicate() {
    var text = numberInpute.value;

    for (var i = 0; i < contactsList.length; i++) {
        if (contactsList[i].number === text) {

            alert("dublicate number");
            return false;
        }
    }
    return true;
}

function validationEmail() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var text = emailInpute.value;

    let msgEmail = document.querySelector(".msg-email");

    if (regex.test(text)) {
        msgEmail.classList.add("d-none");
        emailInputeInpute.classList.remove("border-danger");
        return true;
    }
    else {
        msgEmail.classList.remove("d-none");
        emailInputeInpute.classList.add("border-danger");
        return false;
    }
}

