<template>
  <div class="h-full main-container">
    <div class="container mx-2 container1">
      <h1 class="text-3xl font-bold">Welcome back!</h1>
    </div>
    <div class="container grid content-center container2">
      <div class="grid login-box">
        <h1 class="text-3xl font-bold">Login your account</h1>
        <p>Login to your account</p>
        <form @submit.prevent="onSubmit">
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <a href="#" class="forgot-password">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const email = ref("");
const password = ref("");

const clearForm = () => {
  email.value = "";
  password.value = "";
};

function onSubmit() {
  emit("submit", { email: email.value, password: password.value });
  clearForm();
}
</script>

<style scoped>
.main-container {
  display: flex;
}

.container {
  width: 50%;
  padding: 20px;
  border-radius: 10px;
}

.container1 {
  background-color: #fff;
  text-align: center;
  display: flex;
  height: 75vh;
  flex-direction: column;
  justify-content: center; /* Center vertically */
}

.container2 {
  background-color: #f2f2f2;
}

form {
  margin-top: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #52c497;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
  color: #ccc;
}
</style>
