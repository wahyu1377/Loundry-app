<template>
  <div class="home">
    <div class="hero">
      <h1>Laundry Kita</h1>
      <p class="subtitle">Layanan laundry profesional dengan hasil maksimal</p>
    </div>

    <div class="welcome-section">
      <h2>Selamat Datang di Laundry Kita</h2>
      <p class="welcome-text">Kami memberikan layanan terbaik dengan harga terjangkau dan hasil yang memuaskan</p>
    </div>

    <div class="services">
      <div class="service-card" v-for="service in services" :key="service.id">
        <div class="service-icon">
          <i :class="service.icon"></i>
        </div>
        <h3>{{ service.name }}</h3>
        <p class="service-desc">{{ service.description }}</p>
        <p class="service-price">Rp {{ service.price.toLocaleString('id-ID') }}</p>
        <button class="service-button">Pesan Sekarang</button>
      </div>
    </div>

    <div class="features">
      <div class="feature">
        <i class="fas fa-clock"></i>
        <h4>Tepat Waktu</h4>
        <p>Garansi pengembalian sesuai jadwal</p>
      </div>
      <div class="feature">
        <i class="fas fa-medal"></i>
        <h4>Berkualitas</h4>
        <p>Menggunakan detergen premium</p>
      </div>
      <div class="feature">
        <i class="fas fa-truck"></i>
        <h4>Gratis Antar Jemput</h4>
        <p>Untuk minimal 5kg dalam area tertentu</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      services: [
        { 
          id: 1, 
          name: 'Cuci Reguler', 
          description: 'Cuci dan setrika dalam 3 hari', 
          price: 10000,
          icon: 'fas fa-tshirt'
        },
        { 
          id: 2, 
          name: 'Cuci Express', 
          description: 'Cuci dan setrika dalam 1 hari', 
          price: 15000,
          icon: 'fas fa-bolt'
        },
        { 
          id: 3, 
          name: 'Cuci Kilat', 
          description: 'Cuci dan setrika dalam 6 jam', 
          price: 20000,
          icon: 'fas fa-fire'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  font-family: 'Poppins', sans-serif;
  color: #9d0c0c;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(135deg, #1d4406 0%, #35495e 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.welcome-section {
  text-align: center;
  margin-bottom: 50px;
}

.welcome-section h2 {
  font-size: 2rem;
  color: #484848;
  margin-bottom: 15px;
}

.welcome-text {
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

.services {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 60px;
}

.service-card {
  flex: 1;
  min-width: 280px;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.service-icon {
  font-size: 2.5rem;
  color: #42b983;
  margin-bottom: 20px;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #4a4b4b;
}

.service-desc {
  color: #666;
  margin-bottom: 20px;
  min-height: 60px;
}

.service-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #464845;
  margin: 20px 0;
}

.service-button {
  background-color: #97b942;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.service-button:hover {
  background-color: #616161;
}

.features {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  background: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
}

.feature {
  flex: 1;
  min-width: 200px;
  text-align: center;
  padding: 20px;
}

.feature i {
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 15px;
}

.feature h4 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #4c4d4f;
}

.feature p {
  color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .services {
    flex-direction: column;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .service-card {
    min-width: 100%;
  }
}
</style>