<template>
  <div id="productPage">
    <div class="container"><div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="form">
              <label for="Search" class="center-block">{{ $t('SearchProduct') }}</label>
              <input type="text" class="form-control form-input" id="Search" v-on:keyup="myFunction()" placeholder="###">
           </div>
        </div>
    </div>
    </div>
    <button class="btn btn-secondary" v-on:click="showForm('post')">{{ $t('addProduct') }}</button>
    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">{{ $t('product') }}</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('barcode') }}</span>
          </div>
          <input type="text" v-model.lazy="barCode" class="form-control" placeholder="########" aria-label="Bar Code" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('productName') }}</span>
          </div>
          <input type="text" v-model.lazy="productName" class="form-control" placeholder="Coca Cola" aria-label="Product Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('brand') }}</span>
          </div>
          <input type="text" v-model.lazy="brand" class="form-control" placeholder="Nestle" aria-label="Brand" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('price') }}</span>
          </div>
          <input type="number" step="0.01" min="0.00" v-model.lazy="price" class="form-control" placeholder="29.99" aria-label="$" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('quantity') }}</span>
          </div>
          <input type="number" v-model.lazy="quantity" class="form-control" placeholder="0" aria-label="Qty" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('quantitySold') }}</span>
          </div>
          <input type="number" v-model.lazy="quantitySold" class="form-control" placeholder="0" aria-label="Qty Sold" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('category') }}</span>
          </div>
          <select v-model.lazy="categoryId">
            <option v-for="(category,index) in categories" :key="index" v-bind:value="category.categoryId">
              <span>{{ category.categoryName }}</span>
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
          <th scope="col">{{ $t('barcode') }}</th>
          <th v-on:click="sortTable(1)" scope="col">{{ $t('product') }}</th>
          <th v-on:click="sortTable(2)" scope="col">{{ $t('brand') }}</th>
          <th scope="col">{{ $t('price') }}</th>
          <th v-on:click="sortTable(4)" scope="col">{{ $t('quantity') }}</th>
          <th scope="col">{{ $t('quantitySold') }}</th>
          <th scope="col">{{ $t('category') }}</th>
          <th scope="col">{{ $t('options') }}</th>
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
          <td><span v-text="getCategoryName(product.categoryId)"></span></td>

          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(product)">{{ $t('edit') }}</a></li>
                <li><a class="dropdown-item" v-on:click="deleteProduct(product.barCode)">{{ $t('delete') }}</a></li>
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

const post = 'post'
const update = 'update'

export default defineComponent({
  name: 'ProductPage',
  el: productPage,
  data () {
    return {
      yourConfig: {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          'Content-Type': 'application/json'
        }
      },
      barCode: '',
      productName: '',
      brand: '',
      price: '',
      quantity: '',
      quantitySold: '',
      categoryId: '',
      catgegoryName: '',
      products: [],
      categories: [],
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

      axios.post('http://localhost:8080/products', json, this.yourConfig)
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
      axios.get('http://localhost:8080/products', this.yourConfig)
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

      axios.put('http://localhost:8080/products/' + this.barCode, updatejson, this.yourConfig)
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
      axios.delete('http://localhost:8080/products/' + code, this.yourConfig)
        .then(res => {
          const storedIndex = this.products.map(x => x.barCode).indexOf(code)
          this.products.splice(storedIndex, 1)
        })
        .catch(error => {
          console.log('deleteProduct() failed')
          console.log(error)
        })
    },

    getAllCategories () {
      axios.get('http://localhost:8080/categories', this.yourConfig)
        .then(res => {
          this.categories = res.data
        })
        .catch(error => {
          console.log('getAllCategories() failed')
          console.log(error)
        })
    },
    getCategoryName (id) {
      for (let index = 0; index < this.categories.length; index++) {
        const category = this.categories[index]
        if (category.categoryId === id) {
          return category.categoryName
        }
      }
    },
    myFunction () {
      var input, filter, table, tr, td, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      table = document.getElementById('myTable')
      tr = table.getElementsByTagName('tr')
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]
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
    sortTable (n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir
      var switchcount = 0
      table = document.getElementById('myTable')
      switching = true
      dir = 'asc'
      while (switching) {
        switching = false
        rows = table.rows
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false
          x = rows[i].getElementsByTagName('TD')[n]
          y = rows[i + 1].getElementsByTagName('TD')[n]
          if (dir === 'asc') {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true
              break
            }
          } else if (dir === 'desc') {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true
              break
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
          switching = true
          switchcount++
        } else {
          if (switchcount === 0 && dir === 'asc') {
            dir = 'desc'
            switching = true
          }
        }
      }
    }
  },

  // *Basically* on page load
  mounted () {
    axios.get('http://localhost:8080/products', this.yourConfig).then((resp) => {
      this.info = resp.data
      console.log(this.featureId)
    }).catch((error) => {
      if (error.response.status === 401) {
        console.log('token expired')
        this.$router.push('/login')
      }
      console.log(error)
    })
    this.getAllCategories()
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

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
