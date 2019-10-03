<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Membership Management</h3>
            </b-col>
            <b-col class="col-6">
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <h6> Member Card </h6>
              <b-row>
                <b-col class="col-2">
                  <label> Card Layout </label>
                </b-col>
                <b-col class="col-3">
                  <b-form-group>
                    <b-form-radio v-model="selected" name="radios" value="B">
                      1 card
                    </b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col class="col-3">
                  <b-form-group>
                    <b-form-radio v-model="selected" name="radios" value="B">
                      Multi card
                    </b-form-radio>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-2">
                  <label> Card Number </label>
                </b-col>
                <b-col class="col-3">
                  <toggle-button @change="onChangeEventHandler" class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
                <b-col class="col-1">
                  <label> Card QR </label>
                </b-col>
                <b-col class="col-3">
                  <toggle-button class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-2">
                  <label> Avata Display </label>
                </b-col>
                <b-col class="col-3">
                  <toggle-button @change="onChangeEventHandler" class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
                <b-col class="col-1">
                  <label> Join Date </label>
                </b-col>
                <b-col class="col-3">
                  <toggle-button class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
              </b-row>
              <br>
              <h6> Loyalty Properties </h6>
              <b-row>
                <b-col class="col-2 mt-2">
                  <label> Loyalty Level </label>
                </b-col>
                <b-col class="col-3 mt-2">
                  <toggle-button @change="onChangeEventHandler" class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
                <b-col class="col-4">
                  <b-form-select v-model="selectedLevel" :options="options" class="mb-3"></b-form-select>
                </b-col>
                <b-col class="col-3">
                  <button
                    type="button"
                    class="btn btn-primary">
                    Manage Level
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary">
                    Add Level
                  </button>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col class="col-2 mt-2">
                  <label> Point Convertion </label>
                </b-col>
                <b-col class="col-3">
                  <b-input-group append="VND" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id=""></b-input>
                  </b-input-group>
                </b-col>
                <span class="mt-1"> = </span>
                <b-col class="col-3">
                  <b-input-group append="Point" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id=""></b-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col class="col-2">
                  <label> Point Usability </label>
                </b-col>
                <b-col class="col-3">
                  <b-form-group>
                    <b-form-radio v-model="selectedPoint" name="radiosPoint" value="A">
                      Endless
                    </b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col class="col-3">
                  <b-form-group>
                    <b-form-radio v-model="selectedPoint" name="radiosPoint" value="B">
                      Expiring
                    </b-form-radio>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-2 mt-2">
                  <b-form-group>
                    <b-form-radio v-model="selectedPoint" name="radiosPoint" value="A">
                      Interval
                    </b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col class="col-3">
                  <input
                    id=""
                    type="text"
                    class="form-control">
                </b-col>
                <span class="mt-1">days from earn date</span>
              </b-row>
              <b-row class="mt-2">
                <b-col class="col-2 mt-2">
                  <b-form-group>
                    <b-form-radio v-model="selectedPoint" name="radiosPoint" value="A">
                      Clear at
                    </b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col class="col-3">
                  <input
                    id=""
                    type="text"
                    class="form-control"
                    placeholder="dd/mm">
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-2 mt-2">
                  <label> Total Point </label>
                </b-col>
                <b-col class="col-3 mt-2">
                  <toggle-button class="btn-switch-toggle"/>
                  <label>Off/On</label>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>           
</template>
<script>
import { ToggleButton } from 'vue-js-toggle-button'
export default {
  name: 'Membership',
  data () {
    return {
      selected: '',
      selectedLevel: 'gold',
      selectedPoint: '',
      options: [
        {value: 'gold', text: 'Gold'},
        {value: 'diamond', text: 'Diamond'}
      ]
    }
  },
  components: {
    ToggleButton
  },
  methods: {
    onChangeEventHandler (){

    }
  }
}
</script>