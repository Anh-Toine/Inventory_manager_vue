<template>
  <div id="supplierPage">
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
                <li><a class="dropdown-item" v-on:click="deleteSupplier(supplier.supplierName)">Delete</a></li>
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

const supplierPage = document.getElementById('#supplierPage')

const post = 'post'

const update = 'update'

export default defineComponent({
  name: 'SupplierPage',
  el: supplierPage,
  data () {
    return {
      yourConfig: {
        headers: {
          Authorization: localStorage.getItem('user-token'),
          'Content-Type': 'application/json'
        }
      },
      supplierName: '',
      representativeName: '',
      email: '',
      phoneNumber: '',
      suppliers: [],
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
      this.supplierName = ''
      this.representativeName = ''
      this.email = ''
      this.telephone = ''
    },

    confirmForm () {
      if (this.formAction === post) {
        this.addSupplier()
      } else {
        this.updateSupplier()
      }
    },

    editRow (supplier) {
      this.supplierName = supplier.supplierName
      this.representativeName = supplier.representativeName
      this.email = supplier.email
      this.phoneNumber = supplier.phoneNumber
      this.showForm(update)
    },

    addSupplier () {
      const newSupplier = {
			 supplierName: this.supplierName,
			 representativeName: this.representativeName,
			 email: this.email,
			 phoneNumber: this.phoneNumber
      }

      const json = JSON.stringify(newSupplier)

      axios.post('http://localhost:8080/suppliers', json, this.yourConfig)
        .then(res => {
          this.suppliers.push(res.data)
          this.closeForm()
        }).catch(error => {
          console.log('addSupplier() failed')
          console.log(error)
          alert('Supplier cannot be added. Reason being: ' + error.response.data.message)
        })
    },
    updateSupplier () {
      const updatedSupplier = {
        supplierName: this.supplierName,
        representativeName: this.representativeName,
        email: this.email,
        phoneNumber: this.phoneNumber
      }

      const updatejson = JSON.stringify(updatedSupplier)

      axios.put('http://localhost:8080/suppliers/' + this.supplierName, updatejson, this.yourConfig)
        .then(res => {
          const storedIndex = this.suppliers.map(s => s.supplierName).indexOf(updatedSupplier.supplierName)
          this.suppliers.splice(storedIndex, 1, res.data)
          this.closeForm()
        })
        .catch(error => {
          console.log('updateSupplier() failed')
          console.log(error)
          alert('Supplier cannot be updated. Reason being: ' + error.response.data.message)
        })
    },

    deleteSupplier (name) {
      axios.delete('http://localhost:8080/suppliers/' + name, this.yourConfig)
        .then(res => {
          const storedIndex = this.suppliers.map(s => s.supplierName).indexOf(name)
          this.suppliers.splice(storedIndex, 1)
        })
        .catch(error => {
          console.log('deleteSupplier() failed')
          console.log(error)
        })
    },

    getAllSuppliers () {
      axios.get('http://localhost:8080/suppliers', this.yourConfig)
        .then(res => {
          this.suppliers = res.data
        }).catch(error => {
          console.log('getAllSuppliers() failed')
          console.log(error)
        })
    }
  },
  mounted () {
    axios.get('http://localhost:8080/suppliers', this.yourConfig).then((resp) => {
      this.info = resp.data
      console.log(this.featureId)
    }).catch((error) => {
      if (error.response.status === 401) {
        console.log('token expired')
        this.$router.push('/login')
      }
      console.log(error)
    })
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

#supplierPage {
  text-align: start;
}

tbody tr:hover {
  background-color: #f5f5f5;
}
</style>
