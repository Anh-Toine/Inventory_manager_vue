<template>
  <div id="orderPage">
     <div class="container"><div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="form">
              <label for="Search" class="center-block">{{ $t('searchProduct') }}</label>
              <input type="text" class="form-control form-input" id="myInput" v-on:keyup="myFunction()" placeholder="###">
           </div>
        </div>
    </div>
    </div>
    <button class="btn btn-secondary" v-on:click="showForm('post')">{{ $t('addOrder') }}</button>
    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">{{ $t('order') }}</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('orderDate') }}</span>
          </div>
          <input type="text" v-model="orderDate" class="form-control" placeholder="DD-MM-YYYY" aria-label="Order Date" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('received') }}</span>
          </div>
          <div class="form-control">
            <input type="radio" id="receivedTrue" name="isReceived" value="true" v-model="received" required>&nbsp;
            <label for="receivedTrue">{{ $t('yes') }}</label>
          </div>
          <div class="form-control">
            <input type="radio" id="receivedFalse" name="isReceived" value="false" v-model="received">&nbsp;
            <label for="taxFalse">{{ $t('no') }}</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('payed') }}</span>
          </div>
          <div class="form-control">
            <input type="radio" id="payedTrue" name="isPayed" value="true" v-model="payed" required>&nbsp;
            <label for="payedTrue">{{ $t('yes') }}</label>
          </div>
          <div class="form-control">
            <input type="radio" id="payedFalse" name="isPayed" value="false" v-model="payed">&nbsp;
            <label for="payedFalse">{{ $t('no') }}</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('supplier') }}</span>
          </div>
          <select v-model="supplierId">
            <option v-for="(supplier,index) in suppliers" :key="index" v-bind:value="supplier.supplierId">
              <span>{{ supplier.supplierName }}</span>
            </option>
          </select>
        </div>
        <div class="text-center gx-5">
        <div class="container px-4">
          <div class="row gx-1">
            <div class="col">
              <button type="submit" class="btn btn-secondary">{{ $t('confirm') }}</button>
            </div>
            <div class="col">
              <button type="reset" class="btn btn-secondary">{{ $t('reset') }}</button>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>

    <br>
    <br>

    <table class="table table-striped" id="myTable">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ $t('orderDate') }}</th>
          <th scope="col">{{ $t('received') }}</th>
          <th scope="col">{{ $t('payed') }}</th>
          <th scope="col">{{ $t('supplier') }}</th>
          <th scope="col">{{ $t('options') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,index) in orders" :key="index">
          <th v-text="index+1" scope="row"></th>
          <td><span v-text="order.orderDate"></span></td>
          <td><span v-text="order.received"></span></td>
          <td><span v-text="order.payed"></span></td>
          <td><span v-text="getSupplierName(order.supplierId)"></span></td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(order)">{{ $t('edit') }}</a></li>
              </ul>
          </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="js">
import * as axios from 'axios'
import { defineComponent } from 'vue'

const orderPage = document.getElementById('#orderPage')

const header = { 'Content-Type': 'application/json' }

const post = 'post'
const update = 'update'

export default defineComponent({
  name: 'OrderPage',
  el: orderPage,
  data () {
    return {
      yourConfig: {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          'Content-Type': 'application/json'
        }
      },
      orderId: '',
      orderDate: '',
      received: '',
      payed: '',
      supplierId: '',
      supplierName: '',
      orders: [],
      suppliers: [],
      formAction: ''
    }
  },
  methods: {
    myFunction () {
      var input, filter, table, tr, td, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      table = document.getElementById('myTable')
      tr = table.getElementsByTagName('tr')
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0]
        if (td) {
          txtValue = td.textContent || td.innerText
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
          } else {
            tr[i].style.display = 'none'
          }
        }
      }
    },
    showForm (action) {
      this.formAction = action
      document.getElementById('popupDiv').style.display = 'block'
    },
    closeForm () {
      document.getElementById('popupDiv').style.display = 'none'
      document.getElementById('addForm').reset()
      this.orderDate = ''
      this.received = ''
      this.payed = ''
      this.supplierId = ''
    },

    confirmForm () {
      if (this.formAction === post) {
        this.addOrder()
      } else {
        this.updateOrder()
      }
    },

    editRow (order) {
      this.orderId = order.orderId
      this.orderDate = order.orderDate
      this.received = order.received
      this.payed = order.payed
      this.supplierId = order.supplierId
      this.showForm(update)
    },

    addOrder () {
      const newOrder = {
        orderDate: this.orderDate,
        received: this.received,
        payed: this.payed,
        supplierId: this.supplierId
      }

      const json = JSON.stringify(newOrder)

      axios.post('http://localhost:8080/orders', json, this.yourConfig)
        .then(res => {
          this.orders.push(res.data)
          this.closeForm()
        }).catch(error => {
          console.log('addOrder() failed')
          console.log(error)
          alert('Order was not able to be added. ' + error.response.data.message)
        })
    },

    getAllOrders () {
      axios.get('http://localhost:8080/orders', this.yourConfig)
        .then(res => {
          this.orders = res.data
        })
        .catch(error => {
          console.log('getAllOrders() failed')
          console.log(error)
        })
    },

    updateOrder () {
      const updatedOrder = {
        orderId: this.orderId,
        orderDate: this.orderDate,
        received: this.received,
        payed: this.payed,
        supplierId: this.supplierId
      }

      const updatejson = JSON.stringify(updatedOrder)

      axios.put('http://localhost:8080/orders/' + this.orderId, updatejson, this.yourConfig)
        .then(res => {
          const storedIndex = this.orders.map(x => x.orderId).indexOf(updatedOrder.orderId)
          this.orders.splice(storedIndex, 1, res.data)
          this.closeForm()
        })
        .catch(error => {
          console.log('updateOrder() failed')
          console.log(error)
        })
    },

    getAllSuppliers () {
      axios.get('http://localhost:8080/suppliers', this.yourConfig)
        .then(res => {
          this.suppliers = res.data
        })
        .catch(error => {
          alert('getAllSuppliers() failed. Reason being: ' + error)
          console.log(error)
        })
    },

    getSupplierName (id) {
      for (let i = 0; i < this.suppliers.length; i++) {
        const supplier = this.suppliers[i]
        if (supplier.supplierId === id) {
          return supplier.supplierName
        } else {
          console.log('Supplier not found')
        }
      }
    }
  },

  // *Basically* on page load
  mounted () {
    axios.get('http://localhost:8080/orders', this.yourConfig).then((resp) => {
      this.info = resp.data
      console.log(this.featureId)
    }).catch((error) => {
      if (error.response.status === 401) {
        console.log('token expired')
        this.$router.push('/login')
      }
      console.log(error)
    })
    this.getAllOrders()
    this.getAllSuppliers()
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

#orderPage {
  text-align: start;
}

tbody tr:hover {
    background-color: #f5f5f5;
}
</style>
