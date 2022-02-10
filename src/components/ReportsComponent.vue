<template>
  <div id="reportPage">
    <button class="btn btn-secondary" v-on:click="getValueReport()">Inventory Value</button>
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
          rpt.text(this.$t('products'), 10, 30)
          autoTable(rpt, {
            head: [['Date', 'Total Value']],
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
