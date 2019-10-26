export default {
  mapStaffModelToDto (staff) {
    return {
      id: staff.pk,
      name: staff.fields.name,
      phoneNumber: staff.fields.phone_number,
      roleId: staff.fields.role_id,
      roleName: staff.fields.role_name,
      storeId: staff.fields.store_id
    }
  }
}
