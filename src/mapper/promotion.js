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
    },
    mapPromoSearchModelToDto (promotions, offset) {
        let result = []

        var stt = offset
        for (var index in promotions) {
          stt = stt + 1

          let promoTemp = {
            stt: stt,
            name: promotions[index].fields.name,
            storeName: promotions[index].fields.store_name,
            cityName: promotions[index].fields.city_name,
            districtName: promotions[index].fields.district_name,
            price: promotions[index].fields.price,
            quantity: promotions[index].fields.quantity,
            expiredAt: commonFunc.formatDate(promotions[index].fields.expired_at),
            id: promotions[index].pk,
            action: promotions[index].pk
          }
          result.push(promoTemp)
        }
        return result
    }
  }
