window.onload = init

function init() {
  // Auth here
  view.showListItem()

  // Delete item
  view.deleteItem()

  // add new 
  let addButton = document.getElementById("add-button")
  addButton.onclick = view.addNewItem

  //  
}

