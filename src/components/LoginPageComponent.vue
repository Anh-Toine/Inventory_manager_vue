<template>
    <main class="form-signin">
  <form>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button id="loginButton">
        <router-link to="/product" class="text-white text-decoration-none nav-link">Login</router-link>
    </button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>
</template>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

<!-- <script>
import axios from "axios";
let user = {}
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      isVisible: false
    }
  },
  mounted() {
    localStorage.removeItem('user-token')
    localStorage.removeItem('userInfo')
  },

  computed: {

    passwordIsValid() {
      return !!this.form.password
    },

    usernameIsValid() {
      return !!this.form.username
    },

    formIsValid() {
      return this.passwordIsValid && this.usernameIsValid
    }//may also use vuelidate in the future to perform input validation
  },
  methods: {
    submitForm() {
      if (this.formIsValid) {
        console.log("form is valid")
        axios.post('http://localhost:8080/api/auth/signin', this.form)
            .then((resp) => {
              this.form = resp.data;
              const token = resp.data.accessToken
              localStorage.setItem('user-token', "Bearer " + token)
              user = resp.data
              localStorage.setItem('userInfo', JSON.stringify(user))
              this.$router.push('/')
              console.log(this.form);
              console.log(user);
            })
            .catch((error) => {
              localStorage.removeItem('user-token')
              if (error.response.status === 401) {
                document.getElementById("error").innerHTML = "Wrong Credentials"
                document.getElementById("username").innerHTML = ""
                document.getElementById("password").innerHTML = ""
              }
              console.log(error)
            }).finally(() => {
        });
      } else {
        if(!this.usernameIsValid){
          document.getElementById("username").innerHTML = "Username Required"
        }if(this.usernameIsValid){
          document.getElementById("username").innerHTML = ""
        }

        if(!this.passwordIsValid){
          document.getElementById("password").innerHTML = "Password Required"
        }if(this.passwordIsValid){
          document.getElementById("password").innerHTML = ""
        }

        console.log("form is invalid")
      }
    }
  }
}

</script> -->
