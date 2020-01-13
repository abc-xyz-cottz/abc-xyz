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

        let type = toppings[index].fields.type
        let typeName = type
        if(type == "sugar") {
          typeName = "Đường"
        }
        if(type == "ice") {
          typeName = "Đá"
        }
        if(type == "food") {
          typeName = "Đồ ăn"
        }
        if(type == "size") {
          typeName = "Kích thước"
        }

        let toppingTemp = {
          stt: stt
          , name: toppings[index].fields.name
          , type: typeName
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
          , "type": topping.fields.type
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
          , type: toppings[index].fields.type
          , price: toppings[index].fields.price
          , actions: toppings[index].pk
        }
        result.push(toppingTemp)
      }
      return result
    },
  }
