export default {
    mapToppingModelToDto (toppings) {
      let result = []

      var stt = 0
      for (var index in toppings) {
        stt = stt + 1

        let status = toppings[index].fields.status
        if(status) {
          status = "Mở"
        } else {
          status = "Đóng"
        }

        let toppingTemp = {
          stt: stt
          , name: toppings[index].fields.name
          , price: toppings[index].fields.price
          , status: status
          , actions: toppings[index].pk
        }
        result.push(toppingTemp)
      }
      return result
    },
    mapToppingDetailModelToDto (topping) {
        return {
          "id": topping.pk
          , "name": topping.fields.name
          , "price": topping.fields.price
          , "status": topping.fields.status
        }
    },
    mapToppingCusModelToDto (toppings) {
      let result = []

      var stt = 0
      for (var index in toppings) {
        stt = stt + 1

        let toppingTemp = {
          stt: stt
          , name: toppings[index].fields.name
          , price: toppings[index].fields.price
          , actions: toppings[index].pk
        }
        result.push(toppingTemp)
      }
      return result
    },
  }
