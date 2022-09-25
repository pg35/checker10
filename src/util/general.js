export function makeEnum(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = val; //Symbol(val);
    console.log(val, obj[val]);
  }
  console.log("enum", obj, obj.AJAX_STATUS);
  return Object.freeze(obj);
}
