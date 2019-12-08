import commonFunc from '@/common/commonFunc'
export default {
  mapStoreModelSearchToDto (stores, offset) {
    let result = []

    var stt = offset
    for (var index in stores) {
      stt = stt + 1

      let storeTemp = {
        stt: stt
        , name: stores[index].fields.name
        , citi: stores[index].fields.city_name
        , district: stores[index].fields.district_name
        , address: stores[index].fields.address
        , expiredDate: commonFunc.formatDate(stores[index].fields.expired_at)
        , createDate: commonFunc.formatDate(stores[index].fields.created_at)
        , id: stores[index].pk
      }
      result.push(storeTemp)
    }
    return result
  },
  /**
  * Mapping store detail to dto
  */
  mapStoreDetailModelToDto(store) {
    return {
      "name": store.fields.name,
      "address": store.fields.address,
      "city_id": store.fields.city_id,
      "district_id": store.fields.district_id,
      "expired_at": commonFunc.formatDate(store.fields.expired_at)
    }
  },

  /**
  * Mapping store detail to dto
  */
  mapStoreModelListToDto(stores) {
    let result = []
    for (var index in stores) {

      let storeTemp = {
        value: stores[index].pk,
        text: stores[index].fields.name
      }
      result.push(storeTemp)
    }
    return result
  },
}
