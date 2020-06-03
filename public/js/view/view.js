view = {}

view.addNewItem = async () => {
  let errorMessage = document.getElementById("error-message")
  let form = document.getElementById("contact-form")
  let name = form.name.value
  let location = form.location.value
  let phone = form.phone.value
  let email = form.email.value

  let validateData = [
    global.validator("string", name),
    global.validator("string", location),
    global.validator("string", phone),
    global.validator("string", email)
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
        <ion-icon style="color: #e96b6b" name="trash-outline"></ion-icon>
      </div>
    </div>
    `

    let objItem = {
      name: name,
      location: location,
      phone: phone,
      email: email
    }
    await controller.addNewItemToServer(objItem, () => {
      console.log("yay")
    }, () => {
      console.error("oh no")
    })

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
