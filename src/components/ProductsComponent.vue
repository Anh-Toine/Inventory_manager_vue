<template>
  <div id="productPage">
    <button class="btn btn-secondary" v-on:click="showForm('post')">Add new product</button>

    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm">
        <div>
          <span class="h4">Product</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Bar Code</span>
          </div>
          <input type="text" v-model="barCode" class="form-control" placeholder="########" aria-label="Bar Code" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Product Name</span>
          </div>
          <input type="text" v-model="productName" class="form-control" placeholder="Coca Cola" aria-label="Product Name" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Brand</span>
          </div>
          <input type="text" v-model="brand" class="form-control" placeholder="Nestle" aria-label="Brand" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">$</span>
          </div>
          <input type="number" step="0.01" min="0.00" v-model="price" class="form-control" placeholder="29.99" aria-label="$" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Qty</span>
          </div>
          <input type="number" v-model="quantity" class="form-control" placeholder="0" aria-label="Qty" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Qty Sold</span>
          </div>
          <input type="number" v-model="quantitySold" class="form-control" placeholder="0" aria-label="Qty Sold" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Category ID</span>
          </div>
          <input type="number" v-model="categoryId" class="form-control" placeholder="0" aria-label="Category ID" aria-describedby="basic-addon1">
        </div>
        <div class="text-center gx-5">
        <div class="container px-4">
          <div class="row gx-1">
            <div class="col">
              <button type="button" v-on:click="confirmForm()" class="btn btn-secondary">Confirm</button>
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
          <th scope="col">Bar Code</th>
          <th scope="col">Product Name</th>
          <th scope="col">Brand</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Qty Sold</th>
          <th scope="col">Category Id</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="index">
          <th v-text="index+1" scope="row"></th>
          <td><span v-text="product.barCode"></span></td>
          <td><span v-text="product.productName"></span></td>
          <td><span v-text="product.brand"></span></td>
          <td><span v-text="product.price"></span></td>
          <td><span v-text="product.quantity"></span></td>
          <td><span v-text="product.quantitySold"></span></td>
          <td><span v-text="product.categoryId"></span></td>

          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(product)">Edit</a></li>
                <li><a class="dropdown-item" v-on:click="deleteProduct(product.barCode)">Delete</a></li>
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
