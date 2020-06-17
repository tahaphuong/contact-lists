const controller = {}
const xhr = new XMLHttpRequest()

controller.login = () => {
  
}

controller.checkTokenAuth = (token) => {
  view.showScreen('auth')
}

controller.checkLogIn = (username, password) => {
  let dataMap = {
    username: username,
    password: password
  }
  const apiRoute = "api/auth/log-in"
  xhr.open("POST", apiRoute, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(dataMap))

  xhr.onload = () => {
    let status = xhr.status
    if (status === 0 || (status >= 200 && status < 400)) {
      let response = JSON.parse(xhr.responseText)
    }
  }
}

controller.getContactsList = async () => {
  const apiRoute = "api/contact/"
  
  xhr.open("GET", apiRoute, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send()

  xhr.onload = () => {
    let status = xhr.status
    if (status === 0 || (status >= 200 && status < 400)) {
      let response = JSON.parse(xhr.responseText)

      if (response["success"] == true) {
        let data = response["data"]
        // model.saveListContacts(data)
        view.showListContacts(data)
      }
    } else {
      console.error("oh no")
      let data = [];
      view.showListContacts(data)
    }
  }
}


controller.addNewContact = async (name, location, phone, email, onSuccess, onError) => {
  let apiMap = {
    id: Date.now(),
    name: name,
    location: location,
    phone: phone,
    email: email
  }
  const apiRoute = "api/contact/"
  xhr.open("POST", apiRoute, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(apiMap))

  xhr.onload = () => {
    let status = xhr.status
    if (status === 0 || (status >= 200 && status < 400)) {
      let response = JSON.parse(xhr.responseText)
      console.log(xhr.responseText)

      if (response["success"] == true) {
        onSuccess(response["data"])
      }
    } else {
      console.error("oh no")
      onError()
    }
  }
}

controller.deleteContact = async (id, onSuccess, onError) => {
  const apiRoute = "api/contact/" + id
  
  xhr.open("DELETE", apiRoute, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send()

  xhr.onload = () => {
    let status = xhr.status
    if (status === 0 || (status >= 200 && status < 400)) {
      let data = JSON.parse(xhr.responseText)
      // model.saveListContacts(data)
      onSuccess(data)
    } else {
      console.error("oh no")
      onError()
    }
  }
}