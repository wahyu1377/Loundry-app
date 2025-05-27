<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Login</h1>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
            placeholder="Masukkan email Anda"
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
            placeholder="Masukkan password Anda"
          >
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        
        <button type="submit" class="auth-button" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else>Memproses...</span>
        </button>
        
        <div class="auth-footer">
          <p>Belum punya akun? <router-link to="/register">Daftar disini</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      
      // Reset errors
      this.errors = { email: '', password: '' }
      
      // Email validation
      if (!this.form.email) {
        this.errors.email = 'Email harus diisi'
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        this.errors.email = 'Email tidak valid'
        isValid = false
      }
      
      // Password validation
      if (!this.form.password) {
        this.errors.password = 'Password harus diisi'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password minimal 6 karakter'
        isValid = false
      }
      
      return isValid
    },
    
    async handleLogin() {
      if (!this.validateForm()) return
      
      this.loading = true
      
      try {
        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulasi login berhasil
        // Di aplikasi nyata, ini akan diganti dengan response dari API
        const user = {
          email: this.form.email,
          role: this.form.email === 'admin@laundryku.com' ? 'admin' : 'customer'
        }
        
        // Simpan user ke localStorage (simulasi)
        localStorage.setItem('auth', JSON.stringify(user))
        
        // Redirect berdasarkan role
        if (user.role === 'admin') {
          this.$router.push('/dashboard')
        } else {
          this.$router.push('/status')
        }
        
      } catch (error) {
        console.error('Login error:', error)
        alert('Login gagal. Email atau password salah.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
}

.auth-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
}

.form-group input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
}

.auth-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.auth-button:hover {
  background-color: #3aa876;
}

.auth-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 20px;
  color: #7f8c8d;
}

.auth-footer a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 30px 20px;
  }
}
</style>