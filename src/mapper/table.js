export default {
    mapTableModelToDto (tables) {
      let result = []
  
      var stt = 0
      for (var index in tables) {
        stt = stt + 1
  
        let tableTemp = {
          stt: stt
          , name: tables[index].fields.name
          , id: tables[index].pk
        }
        result.push(tableTemp)
      }
      return result
    },
    mapTableDetailModelToDto (table) {
        return {
            "name": table.fields.name
        }
      }
  }