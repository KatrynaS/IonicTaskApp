window.addEventListener("load", loadNotes);

function loadNotes() {
 var allNotes = JSON.parse(localStorage.getItem("allNotes"));

 document.getElementById("notes").innerHTML = "";

 if(allNotes != null && allNotes.length > 0) {
  allNotes.forEach(addNotes);

  function addNotes(note, index) {
   const ionItem = document.createElement('ion-item');

   ionItem.setAttribute("index", index);

   ionItem.innerHTML = "<ion-label><h2><b>" + note.title + "</b><h2><p> "+ note.when + "</p></ion-label>";
   ionItem.innerHTML += '<ion-icon class="deleteNoteIcon" slot="end" name="trash-outline" data="' + index + '"></ion-icon>';

   document.getElementById("notes").appendChild(ionItem);
  }
 }
 else {
  document.getElementById("notes").innerHTML = "<ion-item><ion-label>No notes yet.</ion-label></ion-item>"
 }

 var deleteNoteIconElement = document.querySelectorAll(".deleteNoteIcon");

 for(var i = 0; i < deleteNoteIconElement.length; i++) {
  deleteNoteIconElement[i].addEventListener('click', deleteNote);
 }
}

function deleteNote() {
 var noteIndexToDelete = this.getAttribute('data');

 var allNotes = JSON.parse(localStorage.getItem("allNotes"));
 allNotes.splice(noteIndexToDelete, 1);
 localStorage.setItem("allNotes",JSON.stringify(allNotes));
 loadNotes();
}

var deleteButton = document.querySelector("#deleteButton");
deleteButton.addEventListener("click", deleteAddedNotes);

function deleteAddedNotes() {
 var alert = document.createElement('ion-alert');

 alert.header = 'Delete all note?';
 alert.message = 'Are you sure you want to delete all added notes?';
 alert.buttons = [
  {
   text:'No',
   role:'cancel'
  },
  {
   text:'Yes',
   handler: () => {
    localStorage.removeItem("allNotes");

    document.getElementById("notes").innerHTML = "<ion-item><ion-label>No messages yet.</ion-label></ion-item>";
    presenClearToast();
   }
  }
 ];

 document.body.appendChild(alert);

 return alert.present()
}

function presenClearToast() {
 console.log("Toast");
 toastElement.color = 'dark';
 toastElement.duration = 2000;
 toastElement.message = 'All notes were cleared';
 toastElement.showCloseButton = true;

 document.body.appendChild(toastElement);
 return toastElement.present();
}