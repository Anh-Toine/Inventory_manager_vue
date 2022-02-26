<template>
  <div id="categoryPage">
    <div class="container"><div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="form">
              <label for="Search" class="center-block">{{ $t('searchProduct') }}</label>
              <input type="text" class="form-control form-input" id="myInput" v-on:keyup="myFunction()" placeholder="###">
           </div>
        </div>
    </div>
    </div>
    <button class="btn btn-secondary" v-on:click="showForm('post')">{{ $t('addCategory') }}</button>
    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">{{ $t('category') }}</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('categoryName') }}</span>
          </div>
          <input type="text" v-model="categoryName" class="form-control" placeholder="Grocery_non_taxable" aria-label="Category Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('taxable') }}</span>
          </div>
          <div class="form-control">
            <input type="radio" id="taxTrue" name="isTaxable" value="true" v-model="taxable" required>&nbsp;
            <label for="taxTrue">{{ $t('yes') }}</label>
          </div>
          <div class="form-control">
            <input type="radio" id="taxFalse" name="isTaxable" value="false" v-model="taxable">&nbsp;
            <label for="taxFalse">{{ $t('no') }}</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ $t('tax') }}</span>
          </div>
          <input type="number" step="0.00001" min="0.00000" v-model="tax" class="form-control" placeholder="0.14975" aria-label="Tax amount" aria-describedby="basic-addon1" required>
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
          <th v-on:click="sortTable(1)" scope="col">{{ $t('categoryName') }}</th>
          <th scope="col">{{ $t('taxable') }}</th>
          <th scope="col">{{ $t('tax') }}</th>
          <th scope="col">{{ $t('options') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category,index) in categories" :key="index">
          <th v-text="index+1" scope="row"></th>
          <td><span v-text="category.categoryName"></span></td>
          <td><span v-text="category.taxable"></span></td>
          <td><span v-text="category.tax"></span></td>

          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" v-on:click="editRow(category)">{{ $t('edit') }}</a></li>
                <li><a class="dropdown-item" v-on:click="deleteCategory(category.categoryId)">{{ $t('delete') }}</a></li>
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

const categoryPage = document.getElementById('#categoryPage')

const post = 'post'
const update = 'update'

export default defineComponent({
  name: 'CategoryPage',
  el: categoryPage,
  data () {
    return {
      yourConfig: {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          'Content-Type': 'application/json'
        }
      },
      categoryId: '',
      categoryName: '',
      taxable: '',
      tax: '',
      categories: [],
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
      this.categoryName = ''
      this.taxable = ''
      this.tax = ''
    },

    confirmForm () {
      if (this.formAction === post) {
        this.addCategory()
      } else {
        this.updateCategory()
      }
    },

    editRow (category) {
      this.categoryId = category.categoryId
      this.categoryName = category.categoryName
      this.taxable = category.taxable
      this.tax = category.tax
      this.showForm(update)
    },

    addCategory () {
      const newCategory = {
        categoryName: this.categoryName,
        taxable: this.taxable,
        tax: this.tax
      }

      const json = JSON.stringify(newCategory)

      axios.post('http://localhost:8080/categories', json, this.yourConfig)
        .then(res => {
          this.categories.push(res.data)
          this.closeForm()
        }).catch(error => {
          console.log('addCategory() failed')
          console.log(error)
          alert('Category was not able to be added. ' + error.response.data.message)
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

    updateCategory () {
      const updatedCategory = {
        categoryId: this.categoryId,
        categoryName: this.categoryName,
        taxable: this.taxable,
        tax: this.tax
      }

      const updatejson = JSON.stringify(updatedCategory)

      axios.put('http://localhost:8080/categories/' + this.categoryId, updatejson, this.yourConfig)
        .then(res => {
          const storedIndex = this.categories.map(x => x.categoryId).indexOf(updatedCategory.categoryId)
          this.categories.splice(storedIndex, 1, res.data)
          this.closeForm()
        })
        .catch(error => {
          console.log('updateCategory() failed')
          console.log(error)
        })
    },

    deleteCategory (id) {
      axios.delete('http://localhost:8080/categories/' + id, this.yourConfig)
        .then(res => {
          const storedIndex = this.categories.map(x => x.categoryId).indexOf(id)
          this.categories.splice(storedIndex, 1)
        })
        .catch(error => {
          console.log('deleteCategories() failed')
          console.log(error)
        })
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
              console.log('change')
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

  mounted () {
    axios.get('http://localhost:8080/categories', this.yourConfig).then((resp) => {
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
