<template>
  <div id="reportPage">
    <button class="btn btn-secondary" v-on:click="getValueReport()">{{ $t('inventoryValue') }}</button><br><br>
    <button class="btn btn-secondary" v-on:click="getBestSellingReport()">{{ $t('bestSelling') }}</button><br><br>
    <button class="btn btn-secondary" v-on:click="getWorstSellingReport()">{{ $t('worstSelling') }}</button>
  </div>
</template>

<script lang="js">
import * as axios from 'axios'
import { defineComponent } from 'vue'
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

const reportPage = document.getElementById('#reportPage')

export default defineComponent({
  name: 'ReportPage',
  el: reportPage,
  data () {
    return {
      yourConfig: {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          'Content-Type': 'application/json'
        }
      },
      valueReport: [],
      bestSellingReport: [],
      bestSellingProducts: [],
      worstSellingReport: [],
      worstSellingProducts: [],
      reportDate: '',
      inventoryValue: ''
    }
  },
  methods: {
    getValueReport () {
      axios.get('http://localhost:8080/report/value', this.yourConfig)
        .then(res => {
          this.valueReport = res.data
          console.log(this.valueReport.date)

          /* eslint-disable new-cap */
          const rpt = new jspdf()

          rpt.text('Dépanneur Sainte-Hélène', 10, 10)
          rpt.text(this.$t('inventoryValue'), 10, 30)
          autoTable(rpt, {
            head: [['Date', this.$t('totalValue')]],
            margin: { top: 50 },
            body: [
              [this.valueReport.date, this.valueReport.value]
            ]
          })
          rpt.save('Inventory-Value-Report-' + this.valueReport.date + '.pdf')
        })
        .catch(error => {
          console.log('getValueReport() failed')
          console.log(error)
        })
    },
    getBestSellingReport () {
      axios.get('http://localhost:8080/report/best', this.yourConfig)
        .then(res => {
          this.bestSellingReport = res.data

          console.log(this.bestSellingReport.productDTOS[0].productName)

          for (let index = 0; index < this.bestSellingReport.productDTOS.length; index++) {
            const row = [
              this.bestSellingReport.productDTOS[index].barCode,
              this.bestSellingReport.productDTOS[index].productName,
              this.bestSellingReport.productDTOS[index].brand,
              this.bestSellingReport.productDTOS[index].quantity,
              this.bestSellingReport.productDTOS[index].quantitySold
            ]
            this.bestSellingProducts.push(row)
          }
          console.log(this.bestSellingProducts)

          /* eslint-disable new-cap */
          const rpt = new jspdf()

          rpt.text('Dépanneur Sainte-Hélène', 10, 10)
          rpt.text(this.$t('bestSellingProduct') + ': ' + this.bestSellingReport.date, 10, 30)
          autoTable(rpt, {
            head: [[this.$t('barcode'), this.$t('product'), this.$t('brand'), this.$t('quantity'), this.$t('quantitySold')]],
            margin: { top: 50 },
            body: this.bestSellingProducts
          })
          rpt.save('Best-Selling-Report-' + this.bestSellingReport.date + '.pdf')
        })
        .catch(error => {
          console.log('getBestSellingReport() failed')
          console.log(error)
        })
    },
    getWorstSellingReport () {
      axios.get('http://localhost:8080/report/worst', this.yourConfig)
        .then(res => {
          this.worstSellingReport = res.data

          console.log(this.worstSellingReport.productDTOS[0].productName)

          for (let index = 0; index < this.worstSellingReport.productDTOS.length; index++) {
            const row = [
              this.worstSellingReport.productDTOS[index].barCode,
              this.worstSellingReport.productDTOS[index].productName,
              this.worstSellingReport.productDTOS[index].brand,
              this.worstSellingReport.productDTOS[index].quantity,
              this.worstSellingReport.productDTOS[index].quantitySold
            ]
            this.worstSellingProducts.push(row)
          }
          console.log(this.worstSellingProducts)

          /* eslint-disable new-cap */
          const rpt = new jspdf()

          rpt.text('Dépanneur Sainte-Hélène', 10, 10)
          rpt.text(this.$t('worstSellingProduct') + ': ' + this.worstSellingReport.date, 10, 30)
          autoTable(rpt, {
            head: [[this.$t('barcode'), this.$t('product'), this.$t('brand'), this.$t('quantity'), this.$t('quantitySold')]],
            margin: { top: 50 },
            body: this.worstSellingProducts
          })
          rpt.save('Worst-Selling-Report-' + this.worstSellingReport.date + '.pdf')
        })
        .catch(error => {
          console.log('getWorstSellingReport() failed')
          console.log(error)
        })
    }
  }
})
</script>

<style scoped lang="scss">
.form-popup {
  display: none;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid #f1f1f1;
  background-color: white;
  z-index: 9;
}

#categoryPage {
  text-align: start;
}

tbody tr:hover {
    background-color: #f5f5f5;
}
</style>
