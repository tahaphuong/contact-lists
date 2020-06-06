let view = {}

view.showListItem = async () => {  
  let listContacts = document.getElementById("list-contacts")
  listContacts.innerHTML = ``

  console.log("hello")
  console.table(model.listDatabase)

  for (let item of model.listDatabase) {
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
        <button deleteObjectId="${item.id}" class="delete-button"><ion-icon style="color: #e96b6b" name="trash-outline"></ion-icon></button>
      </div>
    </div>
    `
    listContacts.innerHTML += contactItem;
  }
}

view.addNewItem = async () => {
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
      model.listDatabase.push(objItem)
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

view.deleteItem = () => {
  let deleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteButton of deleteButtons) {
    let itemId = deleteButton.getAttribute("deleteObjectId")
    deleteButton.onclick = deleteItem

    function deleteItem() {
      controller.deleteItem(itemId)
    }
  } 
}

view.findItem = () => {
  
}