const view = {}

view.contactItemHTML = (item) =>
  ` <div class="contact-item" objectid="${item.id}">
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

view.showListItem = async (data) => {
  let listContacts = document.getElementById("list-contacts")
  listContacts.innerHTML = ``

  for (let item of data) {
    let contactItem = view.contactItemHTML(item)
    listContacts.innerHTML += contactItem;
  }
  view.deleteItem()
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

  let item = {
    id: String(Date.now()),
    name: name,
    location: location,
    phone: phone,
    email: email
  }

  if (!validateData.includes(false)) {
    await controller.addNewItemToServer(item, () => {
      console.table(item)
      model.addNewItem(item)

      let listContacts = document.getElementById("list-contacts")
      listContacts.innerHTML += view.contactItemHTML(item)
    }, () => {
      console.error("FAILED adding new data")
    })
    form.name.value = ""
    form.location.value = ""
    form.phone.value = ""
    form.email.value = ""
  } else {
    errorMessage.innerText = "Please fill all fields required!"
  }
}

view.deleteItem = async () => {
  let deleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteButton of deleteButtons) {
    let itemId = deleteButton.getAttribute("deleteobjectid")
    deleteButton.onclick = deleteContact

    function deleteContact() {
      console.log(itemId)
    }
  }
}
