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
}
