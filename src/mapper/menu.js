export default {

  /**
   * Mapping menu model to dto
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
      "id": menu.pk,
      "name": menu.fields.name,
      "price": menu.fields.price,
      "active": menu.fields.active,
      "image": menu.fields.image
    }
  },

  /**
   * Mapping menu for customer model to dto
   */
  mapCustomerMenuModelToDto(menus) {
    let result = []

    var stt = 0
    for (var index in menus) {
      stt = stt + 1

      let menuTemp = {
        stt: stt
        , image: menus[index].fields.image
        , name: menus[index].fields.name
        , price: menus[index].fields.price
        , action: stt
      }
      result.push(menuTemp)
    }
    return result
  },
}
