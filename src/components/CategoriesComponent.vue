<template>
  <div id="categoryPage">
    <button class="btn btn-secondary" v-on:click="showForm('post')">Add new category</button>
    <p>{{ t$('message') }}</p>
    <div class="form-popup p-4" id="popupDiv">
      <form id="addForm" @submit.prevent="confirmForm">
        <div>
          <span class="h4">Category</span>
          <button type="button" class="btn-close float-end"  v-on:click="closeForm()"></button>
        </div>
        <br>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Category Name</span>
          </div>
          <input type="text" v-model="categoryName" class="form-control" placeholder="Grocery_non_taxable" aria-label="Category Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Taxable</span>
          </div>
          <div class="form-control">
            <input type="radio" id="taxTrue" name="isTaxable" value="true" v-model="taxable" required>&nbsp;
            <label for="taxTrue">Yes</label>
          </div>
          <div class="form-control">
            <input type="radio" id="taxFalse" name="isTaxable" value="false" v-model="taxable">&nbsp;
            <label for="taxFalse">No</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Tax</span>
          </div>
          <input type="number" step="0.00001" min="0.00000" v-model="tax" class="form-control" placeholder="0.14975" aria-label="Tax amount" aria-describedby="basic-addon1" required>
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
          <th scope="col">Category Name</th>
          <th scope="col">Taxable</th>
          <th scope="col">Tax</th>
          <th scope="col">Options</th>
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
                <li><a class="dropdown-item" v-on:click="editRow(category)">Edit</a></li>
                <li><a class="dropdown-item" v-on:click="deleteCategory(category.categoryId)">Delete</a></li>
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

const header = { 'Content-Type': 'application/json' }

const post = 'post'
const update = 'update'

export default defineComponent({
  name: 'CategoryPage',
  el: categoryPage,
  data () {
    return {
      categoryId: '',
      categoryName: '',
      taxable: '',
      tax: '',
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

      axios.post('http://localhost:8080/categories', json, { headers: header })
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
      axios.get('http://localhost:8080/categories')
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

      axios.put('http://localhost:8080/categories/' + this.categoryId, updatejson, { headers: header })
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
      axios.delete('http://localhost:8080/categories/' + id)
        .then(res => {
          const storedIndex = this.categories.map(x => x.categoryId).indexOf(id)
          this.categories.splice(storedIndex, 1)
        })
        .catch(error => {
          console.log('deleteCategories() failed')
          console.log(error)
        })
    }
  },

  // *Basically* on page load
  mounted () {
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
