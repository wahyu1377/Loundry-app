<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Daftar Akun Baru</h1>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required
            placeholder="Masukkan nama lengkap Anda"
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
        
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
            placeholder="Buat password Anda"
          >
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Konfirmasi Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            required
            placeholder="Ulangi password Anda"
          >
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
        
        <div class="form-group">
          <label for="phone">Nomor Telepon</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="form.phone" 
            required
            placeholder="Masukkan nomor telepon"
          >
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        
        <button type="submit" class="auth-button" :disabled="loading">
          <span v-if="!loading">Daftar</span>
          <span v-else>Memproses...</span>
        </button>
        
        <div class="auth-footer">
          <p>Sudah punya akun? <router-link to="/login">Login disini</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      
      // Reset errors
      this.errors = { 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        phone: '' 
      }
      
      // Name validation
      if (!this.form.name) {
        this.errors.name = 'Nama harus diisi'
        isValid = false
      }
      
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
      
      // Confirm password validation
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Konfirmasi password harus diisi'
        isValid = false
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Password tidak cocok'
        isValid = false
      }
      
      // Phone validation
      if (!this.form.phone) {
        this.errors.phone = 'Nomor telepon harus diisi'
        isValid = false
      } else if (!/^[0-9]{10,13}$/.test(this.form.phone)) {
        this.errors.phone = 'Nomor telepon tidak valid'
        isValid = false
      }
      
      return isValid
    },
    
    async handleRegister() {
      if (!this.validateForm()) return
      
      this.loading = true
      
      try {
        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simpan data user (simulasi)
        const user = {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          role: 'customer' // Default role untuk pendaftaran baru
        }
        
        localStorage.setItem('auth', JSON.stringify(user))
        
        // Redirect ke halaman status
        this.$router.push('/status')
        
      } catch (error) {
        console.error('Registration error:', error)
        alert('Pendaftaran gagal. Silakan coba lagi.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Gunakan style yang sama dengan Login */
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