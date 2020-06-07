window.onload = init

async function init() {
  // Auth here
  await controller.getContactsList()

  // add new 
  let addButton = document.getElementById("add-button")
  addButton.onclick = view.addNewItem
}

