<template>
  <footer class="bottom-0 w-full footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
            <span class="text-xl font-semibold tracking-tight">SITern</span>
        </div>
        <div class="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-social">
          <ul>
            <li><a href="#"><i class="fab fa-facebook"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
body {
  margin: 0; /* Remove default margin */
}

.footer {
  background-color: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo img {
  height: 50px;
}

.footer-links ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.footer-links ul li a {
  color: #333;
  text-decoration: none;
}

.footer-social ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

.footer-social ul li a {
  color: #333;
  text-decoration: none;
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
}
</style>
