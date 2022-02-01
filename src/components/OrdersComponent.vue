<template>
  <div id="orderPage">
    <button class="btn btn-secondary" v-on:click="showForm('post')">Add new order</button>

    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">Order</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Order Date</span>
          </div>
          <input type="text" v-model="orderDate" class="form-control" placeholder="DD-MM-YYYY" aria-label="Order Date" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Received</span>
          </div>
          <div class="form-control">
            <input type="radio" id="receivedTrue" name="isReceived" value="true" v-model="received" required>&nbsp;
            <label for="receivedTrue">Yes</label>
          </div>
          <div class="form-control">
            <input type="radio" id="receivedFalse" name="isReceived" value="false" v-model="received">&nbsp;
            <label for="taxFalse">No</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Payed</span>
          </div>
          <div class="form-control">
            <input type="radio" id="payedTrue" name="isPayed" value="true" v-model="payed" required>&nbsp;
            <label for="payedTrue">Yes</label>
          </div>
          <div class="form-control">
            <input type="radio" id="payedFalse" name="isPayed" value="false" v-model="payed">&nbsp;
            <label for="payedFalse">No</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Supplier ID</span>
          </div>
          <input type="text" v-model="supplierId" class="form-control" placeholder="0" aria-label="Supplier ID" aria-describedby="basic-addon1" required>
        </div>
        <div class="text-center gx-5">
        <div class="container px-4">
          <div class="row gx-1">
            <div class="col">
              <button type="submit" class="btn btn-secondary">Confirm</button>
            </div>
            <div class="col">
              <button type="reset" class="btn btn-secondary">Reset</button>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>

    <br>
    <br>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Order Date</th>
          <th scope="col">Received</th>
          <th scope="col">Payed</th>
          <th scope="col">Supplier ID</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,index) in orders" :key="index">
          <th v-text="index+1" scope="row"></th>
          <td><span v-text="order.orderDate"></span></td>
          <td><span v-text="order.received"></span></td>
          <td><span v-text="order.payed"></span></td>
          <td><span v-text="order.supplierId"></span></td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(order)">Edit</a></li>
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
      orderId: '',
      orderDate: '',
      received: '',
      payed: '',
      supplierId: '',
      orders: [],
      formAction: ''
    }
  },
  methods: {
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

      axios.post('http://localhost:8080/orders', json, { headers: header })
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
      axios.get('http://localhost:8080/orders')
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
        orderDate: this.orderDate,
        received: this.received,
        payed: this.payed,
        supplierId: this.supplierId
      }

      const updatejson = JSON.stringify(updatedOrder)

      axios.put('http://localhost:8080/orders/' + this.orderId, updatejson, { headers: header })
        .then(res => {
          const storedIndex = this.categories.map(x => x.orderDate).indexOf(updatedOrder.orderDate)
          this.orders.splice(storedIndex, 1, res.data)
          this.closeForm()
        })
        .catch(error => {
          console.log('updateOrder() failed')
          console.log(error)
        })
    }
  },

  // *Basically* on page load
  mounted () {
    this.getAllOrders()
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
