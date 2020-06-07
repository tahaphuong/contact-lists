const controller = {}

controller.getContactsList = async () => {
  const xhr = new XMLHttpRequest()
  const apiRoute = "api/contact/"
  
  xhr.open("GET", apiRoute, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        let data = JSON.parse(xhr.responseText)
        view.showListItem(data)
        model.saveListContacts(data)
      } else {
        console.error("oh no")
        let data = [];
      }
    }
  }
}


controller.addNewItemToServer = async (item, onSuccess, onError) => {
  console.log(item)
  if (item.hasOwnProperty("name")) {
    onSuccess(item)
    console.table(item)
  } else {
    onError("error!")
    console.error("error")
  }
}

// controller.deleteItem = async (id) => {
//   console.log(id)
// }