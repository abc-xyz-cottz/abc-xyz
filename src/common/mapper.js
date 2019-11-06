export default {
  mapUserModelToDto (usr) {
    return {
      id: usr.pk,
      userName: usr.fields.name,
      phoneNumber: usr.fields.phone_number,
      roleId: usr.fields.role_id,
      roleName: usr.fields.role_name,
      storeId: usr.fields.store_id
    }
  },
  mapStaffModelToDto (staffs) {
    let result = []
    for(let index in staffs) {
      let item = {}

      let id = staffs[index].pk
      item.id = id
      item.user_name = staffs[index].fields.user_name

      let full_name = staffs[index].fields.full_name
      let full_name_html = "<a href='#/account-index' >" + full_name +"</a>"

      item.full_name = full_name_html
      item.role_name = staffs[index].fields.role_name
      item.stores = staffs[index].fields.stores      
      item.actions = id
      
      result.push(item)
    }
    return result
  },
  mapCusModelToDto (customer) {
    let result = []
    for(let index in customer) {
      let item = {}
      item.code = customer[index].pk,
      item.fullName = customer[index].fields.full_name,
      item.phoneNumber = customer[index].fields.phone_number,
      item.email = customer[index].fields.email,
      item.level = customer[index].fields.level,
      item.point = customer[index].fields.point,
      item.promotions = customer[index].fields.promotions
      item.actions = customer[index].pk
      result.push(item)
    }
    return result
  },
  mapCusDetailModelToDto (cusDetail) {
    return {
      code: cusDetail.pk,
      fullName: cusDetail.fields.full_name,
      level: cusDetail.fields.level,
      date: cusDetail.fields.date_of_birth,
      availablePoint: cusDetail.fields.available_point,
      totalPoint: cusDetail.fields.total_point,
      expiredPoint: cusDetail.fields.expire_point,
      expiredDate: cusDetail.fields.expire_date
    }
  },
  mapPromoOwnedModelToDto (promo) {
    let result = []
    for(let index in promo){
      let item = {}
      item.code = promo[index].fields.code,
      item.detail = promo[index].fields.detail,
      item.type = promo[index].fields.pmt_type,
      item.expiredDate = promo[index].fields.expired_date_to,
      item.name = promo[index].fields.name,
      item.img = promo[index].fields.image
      result.push(item)
    }
    return result
  },
  mapRoleModelToDto (roles) {
    let result = []
    for(let index in roles) {
      let item = {}

      item.role = roles[index].fields.code
      item.member = roles[index].fields.member_list
      item.actions = roles[index].pk
      
      result.push(item)
    }
    return result
  }
}
