<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Promotion</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right">
                Add Promotion
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="POST"
            @submit.prevent="Add">
            <div class="form-row">
              <b-col class="col-6">
                <b-row class="form-row">
                  <div class="form-group col-6">
                  <label>{{ $t("promoManagrment.label.code") }}</label>
                  <input
                    id="code"
                    type="text"
                    class="form-control">
                  <div class="invalid-feedback">
                    This field is required.
                  </div>
                  </div>
                  <div class="form-group col-6">
                    <label>{{ $t("promoManagrment.label.name") }}</label>
                    <input
                      id="name"
                      type="text"
                      class="form-control">
                  </div>
                  <div class="form-group col-12 inline">
                    <label class="d-block">{{ $t("promoManagrment.label.expiredDate") }}</label>
                    <b-row class="text-center">
                      <b-col class="col-5">
                        <input
                        id="from"
                        type="text"
                        class="form-control">
                      </b-col>
                      <div class="col-2"> ~ </div>
                      <b-col class="col-5">
                        <input
                        id="to"
                        type="text"
                        class="form-control">
                      </b-col>
                    </b-row>
                  </div>
                  <div class="form-group col-6">
                    <label>{{ $t("promoManagrment.label.type") }}</label>
                    <b-form-select v-model="selectedPromo" :options="optionsPromo" class="mb-3"></b-form-select>
                  </div>
                  <div class="form-group col-6">
                    <label>{{ $t("promoManagrment.label.detail") }}</label>
                    <input
                      v-if="selectedPromo == 'discount'"
                      id="discount"
                      type="text"
                      class="form-control"
                      placeholder="Discount">
                    <input
                      v-if="selectedPromo == 'voucher'"
                      id="voucher"
                      type="text"
                      class="form-control"
                      placeholder="Voucher">
                    <input
                      v-if="selectedPromo == 'freePoint'"
                      id="freePoint"
                      type="text"
                      class="form-control"
                      placeholder="Free Point">
                  </div>
                  <div class="form-group col-6">
                    <label>{{ $t("promoManagrment.label.promoOn") }}</label>
                    <b-form-select v-model="selectedPromoOn" :options="optionsPromoOn" class="mb-3"></b-form-select>
                  </div>
                  <div class="form-group col-6">
                    <label>{{ $t("promoManagrment.label.limit") }}</label>
                    <input
                      v-if="selectedPromoOn == 'event'"
                      id="event"
                      type="text"
                      class="form-control"
                      placeholder="Event">
                    <input
                      v-if="selectedPromoOn == 'bill'"
                      id="bill"
                      type="text"
                      class="form-control"
                      placeholder="Bill">
                    <input
                      v-if="selectedPromoOn == 'item'"
                      id="item"
                      type="text"
                      class="form-control"
                      placeholder="Item">
                  </div>
                </b-row>
              </b-col>
              <b-col class="col-6">
                <b-row class="form-row">
                  <div class="form-group col-12">
                    <label>{{ $t("promoManagrment.label.apply") }}</label>
                    <b-form-select v-model="selected" :options="options" class="mb-3" @change="changeOption"></b-form-select>
                  </div>
                  <div class="form-group col-12">
                    <label></label>
                    <multiselect 
                      v-model="value"
                      :options="selected == 'brand' ? optionsChild.brand : optionsChild.store" 
                      :multiple="true" 
                      :close-on-select="false" 
                      :clear-on-select="false" 
                      :preserve-search="true" 
                      label="name" 
                      track-by="name" 
                      :preselect-first="true">
                      <template slot="selection" slot-scope="{ values, search, isOpen }">
                        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </multiselect>
                  </div>
                </b-row>
              </b-col>
              <b-col class="col-12">
                <b-row class="form-row">
                  <div class="col-2">
                    <b-form-group :label=" $t('promoManagrment.label.promoBy') ">
                      <b-form-radio v-model="selectedPromoBy" name="radios" value="A">
                        {{ $t("promoManagrment.label.event") }}
                      </b-form-radio>
                    </b-form-group>
                  </div>
                  <div class="col-3">
                    <label></label>
                    <input
                      id=""
                      type="text"
                      class="form-control">
                  </div>
                  <div class="col-3">
                    <label></label>
                    <input
                      id=""
                      type="text"
                      class="form-control">
                  </div>
                </b-row>
              </b-col>
              <b-col class="col-12 mt-1">
                <b-row class="form-row">
                  <div class="col-2 mt-2">
                    <b-form-group>
                      <b-form-radio v-model="selectedPromoBy" name="radios" value="B">
                        {{ $t("promoManagrment.label.tradeBy") }}
                      </b-form-radio>
                    </b-form-group>
                  </div>
                  <div class="col-3">
                    <input
                      id=""
                      type="text"
                      class="form-control">
                  </div>
                  <div class="col-3 trade-quantity">
                    <span> Quantity </span>
                    <input
                      id=""
                      type="text"
                      class="form-control pull-right">
                  </div>
                  <div class="col-3 trade-remaining">
                    <span> Remaining </span>
                    <input
                      id=""
                      type="text"
                      class="form-control pull-right">
                  </div>
                </b-row>
              </b-col>
              <div class="form-group col-12">
                <label>{{ $t("promoManagrment.label.info") }}</label>
                <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="2"
                ></b-form-textarea>
              </div>
              <div class="form-group col-12">
                <label>{{ $t("promoManagrment.label.detailAndCondition") }}</label>
                <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="3"
                ></b-form-textarea>
              </div>
              <div class="form-group col-6">
                  <label>Background Image</label>
                <b-form-file multiple :file-name-formatter="formatNames"></b-form-file>
              </div>
              <b-col class="form-group col-12">
                <b-row class="form-row">
                  <b-col class="col-6">
                    <label>Preview</label>
                    <div class="preview-box"></div>
                  </b-col>
                  <b-col class="col-6">
                    <label></label>
                    <div class="preview-box"></div>
                  </b-col>
                </b-row>
              </b-col>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
export default {
    name: 'Promotion',
    data () {
        return {
          result: '',
          selected: 'brand',
          value: [],
          selectedPromoBy: '',
          selectedPromo: 'discount',
          optionsPromo: [
            {value: 'discount', text: 'Discount'},
            {value: 'voucher', text: 'Voucher'},
            {value: 'freePoint', text: 'Free Point'}
          ],
          selectedPromoOn: 'event',
          optionsPromoOn: [
            {value: 'event', text: 'Event'},
            {value: 'bill', text: 'Bill'},
            {value: 'item', text: 'Item'}
          ],
          options: [
            { value: 'brand', text: 'Brand' },
            { value: 'store', text: 'Store' },
            // { value: 'location', text: 'Location' }
          ],
          optionsChild: {
            brand: [{ name: 'Adonis', language: 'JavaScript' },
              { name: 'Rails', language: 'Ruby' },
              { name: 'Sinatra', language: 'Ruby' },
              { name: 'Laravel', language: 'PHP' },
              { name: 'Phoenix', language: 'Elixir' },
              { name: 'Adonis1', language: 'JavaScript' },
              { name: 'Rails1', language: 'Ruby' },
              { name: 'Sinatra1', language: 'Ruby' },
              { name: 'Laravel1', language: 'PHP' },
              { name: 'Phoenix1', language: 'Elixir' }],
            store: [
              { name: 's1', language: 'Store1' },
              { name: 's2', language: 'Store2' },
              { name: 's3', language: 'Store3' }
            ]
          }
        }
    },
    components: {
      Multiselect
    },
    methods: {
      formatNames (files) {
        if (files.length === 1) {
          return files[0].name
        } else {
          return '${files.length} files selected'
        }
      },
      changeOption (result) {
        if(result === 'brand'){
          return true
        }
        return false
      }
    }
}
</script>