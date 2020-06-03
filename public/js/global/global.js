global = {}

global.validator = (type, obj) => {
  switch(type) {
    case "string":
      return obj != null && obj.length != 0
    case "password":
      return obj != null && obj.length >= 0
  }
}