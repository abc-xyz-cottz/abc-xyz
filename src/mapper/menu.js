export default {

  /**
   * Mapping menu model to dto
   * @param menus
   * @returns {Array}
   */
  mapMenuModelToDto(menus, offset) {
    let result = []

    var stt = offset
    for (var index in menus) {
      stt = stt + 1
      var active = "Mở"
      if(!menus[index].fields.active) {
        active = "Đóng"
      }

      let menuTemp = {
        stt: stt
        , image: menus[index].fields.image
        , name: menus[index].fields.name
        , price: menus[index].fields.price
        , status: active
        , action: menus[index].pk
      }
      result.push(menuTemp)
    }
    return result
  },

  /**
   * Mapping menu detail to dto
   */
  mapMenuDetailModelToDto(menu) {
    return {
      "name": menu.fields.name,
      "price": menu.fields.price,
      "status": menu.fields.active,
      "image": menu.fields.image
    }
  }
}
