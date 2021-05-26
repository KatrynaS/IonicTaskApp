const saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', handleButtonClick);

function saveNote(title,when) {
 var existingNotes = JSON.parse(localStorage.getItem("allNotes"));
 if (existingNotes == null) {
  existingNotes = [];
 }

 var note = {
  "title": title,
  "when": when
 }

 existingNotes.push(note);
 localStorage.setItem("allNotes", JSON.stringify(existingNotes));
}

async function handleButtonClick() {
 const titleField = document.querySelector('#title');
 const whenField = document.querySelector('#when');

 var header = null;
 var message = null;
 var buttons = null;

 if(titleField.value == "" || whenField.value == "") {
  header = "NoteTaker"
  message = "Please fill in both the title and the when field"
  buttons = ['Ok']
 }
 else {
  header = "NoteTaker"
  message = "Are you sure you want to save this note?"
  buttons = [{
   text: 'Cancel',
   role: 'cancel',
  },{
   text: 'Ok',
   handler: () => {
    saveNote(titleField.value, whenField.value);
    document.querySelector("#tab-button-list").click();
    presentToast();
    loadNotes();
    titleField.value = "";
    whenField.value = "";
   }
  }];
 }

 const alert = await alertController.create({
  header: header,
  message:message,
  buttons: buttons
 });
 await alert.present();
}

const toastElement = document.createElement('ion-toast');

function presentToast() {
 console.log("Toast");
 toastElement.color = 'dark';
 toastElement.duration = 2000;
 toastElement.message = 'Your note has been saved';
 toastElement.showCloseButton = true;

 document.body.appendChild(toastElement);
 return toastElement.present();
}
