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
  }
}
