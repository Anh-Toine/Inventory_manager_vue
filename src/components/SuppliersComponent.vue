<template>
  <div id="productPage">
    <button class="btn btn-secondary" v-on:click="showForm('post')">Add new supplier</button>

    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">Supplier</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Supplier Name</span>
          </div>
          <input type="text" v-model="supplierName" class="form-control" placeholder="Pepsico" aria-label="Supplier Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Representative Name</span>
          </div>
          <input type="text" v-model="representativeName" class="form-control" placeholder="Eric Doe" aria-label="Representative Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Email</span>
          </div>
          <input type="text" v-model="email" class="form-control" placeholder="erik928331@emailaddr.com" aria-label="Email" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Phone Number</span>
          </div>
          <input type="text" v-model="phoneNumber" class="form-control" placeholder="000-000-0000" aria-label="Phone Number" aria-describedby="basic-addon1" required>
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
          <th scope="col">Supplier Name</th>
          <th scope="col">Representative Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supplier,index) in suppliers" :key="index">
          <th v-text="index+1" scope="row"></th>
          <td><span v-text="supplier.supplierName"></span></td>
          <td><span v-text="supplier.representativeName"></span></td>
          <td><span v-text="supplier.email"></span></td>
          <td><span v-text="supplier.phoneNumber"></span></td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(supplier)">Edit</a></li>
                <li><a class="dropdown-item" v-on:click="deleteProduct(supplier.supplierName)">Delete</a></li>
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

const productPage = document.getElementById('#productPage')

const header = { 'Content-Type': 'application/json' }

const post = 'post'
const update = 'update'

export default defineComponent({
  name: 'ProductPage',
  el: productPage,
  data () {
    return {
      barCode: '',
      productName: '',
      brand: '',
      price: '',
      quantity: '',
      quantitySold: '',
      categoryId: '',
      products: [],
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
      this.barCode = ''
      this.productName = ''
      this.brand = ''
      this.price = ''
      this.quantity = ''
      this.quantitySold = ''
      this.categoryId = ''
    },

    confirmForm () {
      if (this.formAction === post) {
        this.addProduct()
      } else {
        this.updateProduct()
      }
    },

    editRow (product) {
      this.barCode = product.barCode
      this.productName = product.productName
      this.brand = product.brand
      this.price = product.price
      this.quantity = product.quantity
      this.quantitySold = product.quantitySold
      this.categoryId = product.categoryId
      this.showForm(update)
    },

    addProduct () {
      const newProduct = {
        barCode: this.barCode,
        productName: this.productName,
        brand: this.brand,
        price: this.price,
        quantity: this.quantity,
        quantitySold: this.quantitySold,
        categoryId: this.categoryId
      }

      const json = JSON.stringify(newProduct)

      axios.post('http://localhost:8080/products', json, { headers: header })
        .then(res => {
          this.products.push(res.data)
          this.closeForm()
        }).catch(error => {
          console.log('addProduct() failed')
          console.log(error)
          alert('Product was not able to be added. ' + error.response.data.message)
        })
    },

    getAllProducts () {
      axios.get('http://localhost:8080/products')
        .then(res => {
          this.products = res.data
        })
        .catch(error => {
          console.log('getAllProducts() failed')
          console.log(error)
        })
    },

    updateProduct () {
      const updatedProduct = {
        barCode: this.barCode,
        productName: this.productName,
        brand: this.brand,
        price: this.price,
        quantity: this.quantity,
        quantitySold: this.quantitySold,
        categoryId: this.categoryId
      }

      const updatejson = JSON.stringify(updatedProduct)

      axios.put('http://localhost:8080/products/' + this.barCode, updatejson, { headers: header })
        .then(res => {
          const storedIndex = this.products.map(x => x.barCode).indexOf(updatedProduct.barCode)
          this.products.splice(storedIndex, 1, res.data)
          this.closeForm()
        })
        .catch(error => {
          console.log('updateProduct() failed')
          console.log(error)
        })
    },

    deleteProduct (code) {
      axios.delete('http://localhost:8080/products/' + code)
        .then(res => {
          const storedIndex = this.products.map(x => x.barCode).indexOf(code)
          this.products.splice(storedIndex)
        })
        .catch(error => {
          console.log('deleteProduct() failed')
          console.log(error)
        })
    }
  },

  // *Basically* on page load
  mounted () {
    this.getAllProducts()
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

#productPage {
  text-align: start;
}

tbody tr:hover {
    background-color: #f5f5f5;
}
</style>
