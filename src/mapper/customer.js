export default {
  mapCustomerModelToDto(usr) {
    return {
      id: usr.pk,
      userName: usr.fields.name,
      phoneNumber: usr.fields.phone_number,
      cityId: usr.fields.city_id,
      userType: "customer",
      role: ""
    }
  },
}
