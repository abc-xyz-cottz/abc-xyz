export default {

  /**
   * Phone number check
   * @param usr
   */
  checkPhoneNumber(phoneNumber) {
    var vnf_regex = /((0|84)+([0-9]{8})\b)/g;
    return vnf_regex.test(phoneNumber)
  }
}
