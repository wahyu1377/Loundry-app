<template>
  <div class="status-page">
    <div class="header">
      <h1>Status Pesanan </h1>
      <p>Pantau perkembangan laundry</p>
    </div>

    <div class="search-box">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Cari nomor pesanan..."
      >
      <button @click="searchOrders">
        <i class="fas fa-search"></i> Cari
      </button>
    </div>

    <div class="order-list">
      <div class="order-card" v-for="order in filteredOrders" :key="order.id">
        <div class="order-header">
          <span class="order-id">#{{ order.id }}</span>
          <span :class="'status-badge ' + order.status.toLowerCase()">
            {{ order.status }}
          </span>
        </div>
        
        <div class="order-details">
          <div class="detail-item">
            <i class="fas fa-tshirt"></i>
            <span>{{ order.service }}</span>
          </div>
          
          <div class="detail-item">
            <i class="fas fa-calendar-day"></i>
            <span>{{ order.date }}</span>
          </div>
          
          <div class="detail-item">
            <i class="fas fa-weight-hanging"></i>
            <span>{{ order.weight }} kg</span>
          </div>
          
          <div class="detail-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>Rp {{ order.total.toLocaleString('id-ID') }}</span>
          </div>
        </div>
        
        <div class="order-actions">
          <button class="detail-btn" @click="viewDetails(order.id)">
            <i class="fas fa-info-circle"></i> Detail
          </button>
          <button 
            v-if="order.status === 'Pending'" 
            class="cancel-btn"
            @click="cancelOrder(order.id)"
          >
            <i class="fas fa-times"></i> Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  data() {
    return {
      searchQuery: '',
      orders: [
        {
          id: 'LAU-2023-001',
          service: 'Cuci Express',
          date: '27 Mei 2023',
          weight: 3,
          total: 45000,
          status: 'Selesai'
        },
        {
          id: 'LAU-2023-002',
          service: 'Cuci Kilat',
          date: '28 Mei 2023',
          weight: 2,
          total: 40000,
          status: 'Proses'
        },
        {
          id: 'LAU-2023-003',
          service: 'Cuci Reguler',
          date: '29 Mei 2023',
          weight: 5,
          total: 50000,
          status: 'Pending'
        }
      ]
    }
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => 
        order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.service.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    searchOrders() {
      // Pencarian sudah dihandle oleh computed property
    },
    viewDetails(orderId) {
      alert(`Menampilkan detail pesanan: ${orderId}`)
    },
    cancelOrder(orderId) {
      if(confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
        const index = this.orders.findIndex(o => o.id === orderId)
        if(index !== -1) {
          this.orders[index].status = 'Dibatalkan'
        }
      }
    }
  }
}
</script>

<style scoped>
.status-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-box button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-box button:hover {
  background-color: #3aa876;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-id {
  font-weight: bold;
  color: #2c3e50;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.status-badge.selesai {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.proses {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.pending {
  background-color: #f8d7da;
  color: #721c24;
}

.status-badge.dibatalkan {
  background-color: #d6d8d9;
  color: #1b1e21;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-item i {
  color: #42b983;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.order-actions button {
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.detail-btn {
  background-color: #3498db;
  color: white;
  border: none;
}

.detail-btn:hover {
  background-color: #2980b9;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .order-details {
    grid-template-columns: 1fr 1fr;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .order-actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>