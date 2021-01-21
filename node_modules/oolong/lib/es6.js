exports.getPropertyDescriptor = Object.getPropertyDescriptor ||
  function(obj, name) {
  if (!(name in obj)) return

  var desc
  do { if (desc = Object.getOwnPropertyDescriptor(obj, name)) return desc }
  while (obj = Object.getPrototypeOf(obj))
}
