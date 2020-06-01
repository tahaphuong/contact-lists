window.onload = init

function init() {
  let addButton = document.getElementById("add-button")
  addButton.onclick = addNewItem

}

function addNewItem() {
  let errorMessage = document.getElementById("error-message")
  let form = document.getElementById("contact-form")
  let name = form.name.value
  let location = form.location.value
  let phone = form.phone.value
  let email = form.email.value

  let validateData = [
    validate(name),
    validate(location),
    validate(phone),
    validate(email)
  ]

  if (!validateData.includes(false)) {
  let contactItem = `
  <div class="contact-item">
            <div class="contact-item-avatar">
              <div></div>
            </div>
            <div class="contact-item-info">
              <div class="contact-item-main-info">${name}</div>
              <div class="contact-item-sub-info">${location}</div>
            </div>
            <div class="contact-item-phone">
              <div>${phone}</div>
            </div>
            <div class="contact-item-email">
              <div>${email}</div>
            </div>
            <div class="contact-item-action">
              <ion-icon name="mail-outline"></ion-icon>
              <ion-icon name="build-outline"></ion-icon>
            </div>
          </div>
  `

    let list = document.getElementById("list-contacts")
    list.innerHTML += contactItem;

    form.name.value = ""
    form.location.value = ""
    form.phone.value = ""
    form.email.value = ""
  } else {
    errorMessage.innerText = "Please fill all fields !"
  }
}

function validate(string) {
  return string.length != 0 && string != null
}

// function hoverAction(father, icon) {
//   father.innerHTML = icon == 'mail' 
//     ? `<ion-icon name="mail"></ion-icon>`
//     : `<ion-icon name="build"></ion-icon>`
// }

// function outHoverAction(father, icon) {
//   father.innerHTML = icon == 'mail' 
//     ? `<ion-icon name="mail-outline"></ion-icon>`
//     : `<ion-icon name="build-outline"></ion-icon>`
// }