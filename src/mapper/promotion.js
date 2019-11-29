export default {
    mapPromoModelToDto (promotions) {
      let result = []
  
      var stt = 0
      for (var index in promotions) {
        stt = stt + 1
  
        let promoTemp = {
          stt: stt
          , name: promotions[index].fields.name
          , price: promotions[index].fields.cost
          , expired: promotions[index].fields.expired_at
          , createDate: promotions[index].fields.created_at
          , id: promotions[index].pk
        }
        result.push(promoTemp)
      }
      return result
    },
    mapPromoDetailModelToDto (promotion) {
        return {
            "name": promotion.fields.name,
            "cost": promotion.fields.cost,
            "expired_on": promotion.fields.expired_at,
            "quantity": promotion.fields.quantity,
        }
      }
  }