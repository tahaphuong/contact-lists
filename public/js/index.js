window.onload = init

var model = {}

model.listDatabase = []

async function init() {
  // Auth here
  await controller.getAllItems()
  view.showListItem()

  // Delete item
  view.deleteItem()

  // add new 
  let addButton = document.getElementById("add-button")
  addButton.onclick = view.addNewItem

  //  
}

