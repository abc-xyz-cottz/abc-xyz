export default {
  mapCustomerModelToDto(usr) {
    return {
      id: usr.pk,
      userName: usr.fields.name,
      phoneNumber: usr.fields.phone_number,
      cityId: usr.fields.city_id,
      userType: "customer",
      role: "CUS"
    }
  },
  mapCustomerDetailToDto(usr) {
    return {
      name: usr.fields.name,
      phone: usr.fields.phone_number,
      city_id: usr.fields.city_id,
      district_id: usr.fields.district_id,
      birthday: usr.fields.birthday,
      gender: usr.fields.gender,
    }
  },

  /**
   * Mapping menu for customer model to dto
   */
  mapNotificationModelToDto(notis) {
    let result = []

    var stt = 0
    for (var index in notis) {
      var readMoreFlag = true
      if(notis[index].fields.content.length > 200) {
        readMoreFlag = false
      }

      let motiTemp = {
        title: notis[index].fields.title
        , content: notis[index].fields.content
        , created_date: notis[index].fields.created_date
        , readMoreFlag: readMoreFlag
        , stt: stt
      }

      result.push(motiTemp)
      stt = stt + 1
    }
    return result
  },
}
