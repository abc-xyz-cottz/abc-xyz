import commonFunc from '@/common/commonFunc'
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
          , expired: commonFunc.formatDate(promotions[index].fields.expired_at)
          , createDate: commonFunc.formatDate(promotions[index].fields.created_at)
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
    },
    mapPromoCustomerModelToDto (promotions) {
      let result = []
  
      var stt = 0
      for (var index in promotions) {
        stt = stt + 1
  
        let promoTemp = {
          stt: stt,
          name: promotions[index].fields.name,
          expiredate: commonFunc.formatDate(promotions[index].fields.expired_at),
          id: promotions[index].pk
        }
        result.push(promoTemp)
      }
      return result
    }
  }