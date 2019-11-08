export default {
  mapStaffModelToDto (staff) {
    return {
      id: staff.pk,
      userName: staff.fields.name,
      phoneNumber: staff.fields.phone_number,
      roleId: staff.fields.role_id,
      role: staff.fields.role_name,
      storeId: staff.fields.store_id,
      userType: "staff",
    }
  }
}
