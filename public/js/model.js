const model = {
  listDatabase: 
  [
    {
      id: "876789",
      name: "hello",
      location: "Hanoi",
      phone: "8726387968732",
      email: "1676@uhu.com"
    }
  ]
}

model.saveListContacts = function(data) {
  model.listDatabase = data
}

model.addNewContact = (item) => {
  model.listDatabase.push(item)
}