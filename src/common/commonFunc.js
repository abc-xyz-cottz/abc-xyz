export default {

  /**
   * Phone number check
   * @param usr
   */
  phoneNumberCheck(phoneNumber) {
    var vnf_regex = /((01|02|03|04|05|06|07|08|09)+([0-9]{8})\b)/g
    return vnf_regex.test(phoneNumber)
  },

  /**
   * Interge only
   */
  intergerOnly(valueInput) {
    if (valueInput != '') {
      valueInput = valueInput.replace(/[^0-9-]+/g,'');
    }
    return valueInput
  },

  /**
   * Input number 0-9 only
   */
  isNumber (event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    } else {
      return true;
    }
  }
}
