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
  },

  /**
   * Reindex list item
   */
  updateIndex(index, listIdDeleted) {
    let result = index
    for(var i in listIdDeleted) {
      if(index > listIdDeleted[i]) {
        result -= 1
      }
    }
    return result
  },

  /**
   * Calculate date
   */
  calculateDate(date) {
    let result = date.substring(0, 10)
    result = new Date(result)
    let now = new Date()
    let day = new Date(result.getTime() - now.getTime())
    return Math.floor(day / (1000 * 60 * 60 * 24))
  },

  /**
   * Format date
   */
  formatDate(date) {
    let result = date.substring(0, 10)
    return result
  },

  /**
   * Calculate month
   */
  calculateMonth(date) {
    let result = date.substring(0, 10)
    result = new Date(result)
    let now = new Date()
    let day = new Date(result.getTime() - now.getTime())
    return Math.floor(day / (1000 * 60 * 60 * 24 * 30))
  },

  /**
   * Make toast with title
   */
  makeToast(variant = null, title="Success!!!", content="Thao tác thành công!!!") {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },
}
