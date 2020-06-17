const view = {}

view.showScreen = (screen) => {
  let app = document.getElementById("app")
  switch(screen) {
    case 'auth':
      app.innerHTML = view.logInScreen

      let loginForm = document.getElementById("log-in-form")
      loginForm.onsubmit = view.login
    break;
    case 'main':
      app.innerHTML = view.mainScreen

      let addButton = document.getElementById("add-button")
      addButton.onclick = view.addNewContact
    break;
    case 'loading':
    break;
  }
}

view.login = async () => {
  let errorMessage = document.getElementById("auth-error-message")
  let loginForm = document.getElementById("log-in-form")
  let email = loginForm.email.value.trim()
  let password = loginForm.password.value.trim()

  try {
    let validateData = [
      myGlobal.validator("string", email),
      myGlobal.validator("string", password), 
    ]

    if (validateData.includes(false)) 
      throw new Error("Please fill all fields required!")
    
    await controller.login(item, (data) => {
      view.showScreen('main')
    }, () => {
      console.error("view.js: FAILED login")
      throw new Error("Failed loging in! Please try again 😢")
    })
    
    form.name.value = ""
    form.location.value = ""
    form.phone.value = ""
    form.email.value = ""
    
  } catch(err) {
    errorMessage.innerText = err.message
  }
}

view.showListContacts = async (data) => {
  let listContacts = document.getElementById("list-contacts")
  listContacts.innerHTML = ``

  for (let item of data) {
    let contactItem = view.contactItemHTML(item)
    listContacts.innerHTML += contactItem;
  }
}

view.deleteContact = (deleteButton) => {
  let itemId = deleteButton.getAttribute("deleteobjectid")
  deleteButton.onclick = () => {
    controller.deleteContact(itemId, (data) => {
      view.showListContacts(data)
    }, () => {
      console.error("view.js: Error deleting item")
    })
  }
}

view.addNewContact = async () => {
  let errorMessage = document.getElementById("add-contact-error-message")

  try {
    let form = document.getElementById("contact-form")
    let name = form.name.value.trim()
    let location = form.location.value.trim().length == 0 ? null : form.location.value.trim()
    let phone = form.phone.value.trim()
    let email = form.email.value.trim().length == 0 ? null : form.email.value.trim()

    let validateData = [
      myGlobal.validator("string", name),
      myGlobal.validator("string", phone),
    ]

    if (validateData.includes(false)) 
      throw new Error("Please fill all fields required!")

    await controller.addNewContact(name, location, phone, email, (data) => {
      view.showListContacts(data)
    }, () => {
      console.error("view.js: FAILED adding new data")
      throw new Error("Failed uploading data! Please try again 😢")
    })
    form.name.value = ""
    form.location.value = ""
    form.phone.value = ""
    form.email.value = ""
  } catch(err) {
    errorMessage.innerText = err.message

  }
}

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
              <button deleteobjectid="${item.id}" onclick="view.deleteContact(this)" class="delete-button"><ion-icon style="color: #e96b6b" name="trash-outline"></ion-icon></button>
            </div>
          </div>
  `

  view.logInScreen = 
  `
  <div id="login-screen">
      <div class="auth-header">Log in to your <span class="auth-header-highlight">contacts list!</span></div>
      <form id="log-in-form">
        <div class="auth-field">
          <div class="auth-field-title"><ion-icon name="mail-outline"></ion-icon></div>
          <input class="auth-field-input" name="email" maxlength="100"/>
        </div>
        <div class="auth-field">
          <div class="auth-field-title"><ion-icon name="key-outline"></ion-icon></div>
          <input class="auth-field-input" name="password" maxlength="100"/>
        </div>
        <div class="error-message" id="auth-error-message"></div>
        <div class="auth-footer">
          <button class="main-button" id="log-in-button">Log in</button>
          <div>
            <span id="to-register-link">Register?</span>
          </div>
        </div>
      </form>
      <a href="https://www.facebook.com" target="_black" id="credit">Github 🤖</a>
    </div>
  `

  view.mainScreen = 
`<div id="user-screen">
  <div id="header">
    <div id="header-title">Connect <ion-icon name="people-outline" style="position: relative; top: 0.15em"></ion-icon></div>
  </div>

  <div id="body">
    <div id="action">
      <div class="body-title">New contact <ion-icon name="arrow-down-outline" style="position: relative; top: 0.15em"></ion-icon></div>

        <form id="contact-form">
          <div class="add-field">
            <div class="add-field-title"><ion-icon name="person-outline" style="position: relative; top: 0.15em"></ion-icon> name</div>
            <input class="add-field-input" maxlength="100" name="name"/>
          </div>
          <div class="add-field">
            <div class="add-field-title"><ion-icon name="location-outline" style="position: relative; top: 0.15em"></ion-icon>location</div>
            <input class="add-field-input" maxlength="70" name="location"/>
          </div>
          <div class="add-field">
            <div class="add-field-title"><ion-icon name="call-outline" style="position: relative; top: 0.15em"></ion-icon> phone</div>
            <input class="add-field-input" maxlength="15" name="phone"/>
          </div>
          <div class="add-field">
            <div class="add-field-title"><ion-icon name="mail-outline" style="position: relative; top: 0.15em"></ion-icon> email</div>
            <input class="add-field-input" maxlength="70" name="email"/>
          </div>
          <button class="main-button" id="add-button" type="button">Add to list +</ion-icon></button>
          <div class="error-message" id="add-contact-error-message"></div>
        </form>
    </div>
    <div id="list">
      <div id="list-header">
        <div class="body-title">Contacts list</div>
        <div id="list-search-bar">
          <input id="list-search-bar-input" maxlength="50"/>
          <button id="list-search-bar-button"><ion-icon name="search-outline"></ion-icon></button>
        </div>
      </div>
      <div id="list-contacts"></div>
    </div>
  </div> 
</div>
`


