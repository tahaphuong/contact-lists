controller = {}

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