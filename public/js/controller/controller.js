let controller = {}

const xhr = new XMLHttpRequest()
const apiRoute = "api/contact/"

controller.getAllItems = async () => {
  xhr.open("GET", apiRoute, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        model.listDatabase = JSON.parse(xhr.responseText)  
      } else {
        console.error("oh no")
      }
    }
  }
  xhr.send();
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

controller.deleteItem = async (id) => {
  console.log(id)
}