export default {
    mapSysCfgModelToDto (setting) {
        return {
            "id": setting.pk.toString(),
            "code": setting.fields.code,
            "value": setting.fields.value,
        }
      }
  }