<template>
    <div class="main-container">
      <div class="container mx-2 container1">
        <h1 class="text-3xl font-bold">Welcome!</h1>
      </div>
      <div class="container grid content-center container2">
        <div class="grid register-box">
          <h1 class="text-3xl font-bold">Create an account</h1>
          <p>Register to access our services</p>
          <form @submit.prevent="onSubmit">
            <input type="text" v-model="username" placeholder="Username">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['submit']);
  
  const email = ref('');
  const password = ref('');
  const username = ref('');
  // Add more fields for registration

  const resetFields = () => {
    email.value = '';
    password.value = '';
    username.value = '';
  };
  
  const onSubmit = () => {
    emit('submit', { email: email.value, password: password.value, username: username.value});
    resetFields();
  };

  
  </script>
  
  <style scoped>
  /* Your CSS styles for registration component */
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
  