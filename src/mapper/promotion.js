import commonFunc from '@/common/commonFunc'
export default {
    mapPromoModelToDto (promotions, offset) {
      let result = []
  
     var stt = offset
      for (var index in promotions) {
        stt = stt + 1
  
        let promoTemp = {
          stt: stt
          , name: promotions[index].fields.name
          , price: commonFunc.currencyFormat(promotions[index].fields.cost)
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
    },
    mapPromoCustomerModelToOwnerDto (promotions) {
      let result = []

      var stt = 0
      for (var index in promotions) {
        stt = stt + 1

        let promoTemp = {
          stt: stt,
          storeName: promotions[index].fields.store_name,
          name: promotions[index].fields.name,
          expiredate: promotions[index].fields.expired_at,
          id: promotions[index].pk,
          idString: commonFunc.formatId(promotions[index].pk, 8),
          action: promotions[index].pk
        }
        result.push(promoTemp)
      }
      return result
    },
    mapPromoCustomerModelToDto (promotions) {
      let result = []
  
      var stt = 0
      for (var index in promotions) {
        stt = stt + 1
  
        let promoTemp = {
          stt: stt,
          storeName: promotions[index].fields.store_name,
          name: promotions[index].fields.name,
          expiredate: promotions[index].fields.expired_at,
          id: promotions[index].pk,
          idString: commonFunc.formatId(promotions[index].pk, 8)
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
            price: commonFunc.currencyFormat(promotions[index].fields.price),
            quantity: promotions[index].fields.quantity,
            expiredAt: promotions[index].fields.expired_at,
            id: promotions[index].pk,
            action: promotions[index].pk
          }
          result.push(promoTemp)
        }
        return result
    },
    mapPromoCusDetailModelToDto (promotion) {
        return {
          "id": promotion.pk,
          "name": promotion.fields.name,
          "expiredAt": promotion.fields.expired_at,
          "createAt": promotion.fields.created_at,
          "storeId": promotion.fields.store_id,
          "storeName": promotion.fields.store_name,
          "idString": commonFunc.formatId(promotion.pk, 8)
        }
    },
    mapPromoOptionModelToDto (promotions) {
      let result = []

      for (var index in promotions) {
        let promoTemp = {
          id: promotions[index].pk,
          name: promotions[index].fields.name,
        }
        result.push(promoTemp)
      }
      return result
    },
  }
