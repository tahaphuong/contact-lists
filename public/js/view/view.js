// var controller = {}
// async function getAllItems() {
// }
// controller.addNewItemToServer = async (item, onSuccess, onError) => {
//   console.log(item)
//   if (item.hasOwnProperty("name")) {
//     onSuccess(item)
//     console.table(item)
//   } else {
//     onError("error!")
//     console.error("error")
//   }
// }

// controller.deleteItem = async (id) => {
//   console.log(id)
// }
async function showListItem() {  
  const xhr = new XMLHttpRequest()
  const apiRoute = "api/contact/"
  xhr.open("GET", apiRoute, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        let data = JSON.parse(xhr.responseText)  
        console.table(data)

        let listContacts = document.getElementById("list-contacts")
        listContacts.innerHTML = ``

        for (let item of data) {
          let contactItem = `
          <div class="contact-item">
            <div class="contact-item-avatar">
              <div></div>
            </div>
            <div class="contact-item-info">
              <div class="contact-item-main-info">${item.name}</div>
              <div class="contact-item-sub-info">${item.location == null ? "N/A" : item.location}</div>
            </div>
            <div class="contact-item-phone">
              <div>${item.phone}</div>
            </div>
            <div class="contact-item-email">
              <div>${item.email == null ? "N/A" : item.email}</div>
            </div>
            <div class="contact-item-action">
              <ion-icon name="mail-outline"></ion-icon>
              <ion-icon name="build-outline"></ion-icon>
              <button deleteobjectid="${item.id}" class="delete-button"><ion-icon style="color: #e96b6b" name="trash-outline"></ion-icon></button>
            </div>
          </div>
          `
          listContacts.innerHTML += contactItem;
        }
        deleteItem()
      } else {
        console.error("oh no")
        return null
      }
    }
  }
  xhr.send();
}

async function addNewItem() {
  let errorMessage = document.getElementById("error-message")
  let form = document.getElementById("contact-form")
  let name = form.name.value
  let location = form.location.value.length == 0 ? null : form.location.value
  let phone = form.phone.value
  let email = form.email.value.length == 0 ? null : form.email.value

  let validateData = [
    global.validator("string", name),
    global.validator("string", phone),
  ]

  let objItem = {
    id: String(Date.now()),
    name: name,
    location: location,
    phone: phone,
    email: email
  }

  if (!validateData.includes(false)) {
    await controller.addNewItemToServer(objItem, () => {
      console.log("yay")
      console.table(objItem)
      // model.listDatabase.push(objItem)
    }, () => {
      console.error("oh no")
    })
    form.name.value = ""
    form.location.value = ""
    form.phone.value = ""
    form.email.value = ""
  } else {
    errorMessage.innerText = "Please fill all fields required!"
  }
}

async function deleteItem() {
  let deleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteButton of deleteButtons) {
    let itemId = deleteButton.getAttribute("deleteobjectid")
    deleteButton.onclick = deleteContact
    function deleteContact() {
      console.log(itemId)
    }
  } 
}
