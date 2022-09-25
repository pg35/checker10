export function doAjax(args) {
  window.ajaxUrl = "https://www.goodcopy.xyz/wp-admin/admin-ajax.php";
  return window.jQuery.ajax(window.ajaxUrl, args);
}
class Enum {
  constructor(...keys) {
    keys.forEach((key, i) => {
      this[key] = i;
    });
    Object.freeze(this);
  }

  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) yield key;
  }
}

const daysEnum = new Enum(
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
);

const days = [...daysEnum]; // Array of the enum values as strings
