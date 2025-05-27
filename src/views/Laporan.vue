<template>
  <div class="report-page">
    <div class="header">
      <h1>Laporan Transaksi</h1>
      <p>Ringkasan seluruh transaksi laundry</p>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Periode:</label>
        <input type="date" v-model="startDate">
        <span>s/d</span>
        <input type="date" v-model="endDate">
      </div>
      
      <div class="filter-group">
        <label>Status:</label>
        <select v-model="selectedStatus">
          <option value="">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Proses">Proses</option>
          <option value="Pending">Pending</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>
      
      <button class="apply-btn" @click="applyFilters">
        <i class="fas fa-filter"></i> Terapkan
      </button>
      
      <button class="export-btn" @click="exportReport">
        <i class="fas fa-file-export"></i> Export
      </button>
    </div>

    <div class="summary-cards">
      <div class="summary-card">
        <div class="card-icon total">
          <i class="fas fa-list"></i>
        </div>
        <div class="card-content">
          <h3>Total Transaksi</h3>
          <p>{{ summary.totalTransactions }}</p>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="card-icon completed">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="card-content">
          <h3>Selesai</h3>
          <p>{{ summary.completedTransactions }}</p>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="card-icon revenue">
          <i class="fas fa-money-bill-wave"></i>
        </div>
        <div class="card-content">
          <h3>Total Pendapatan</h3>
          <p>Rp {{ summary.totalRevenue.toLocaleString('id-ID') }}</p>
        </div>
      </div>
    </div>

    <div class="report-table">
      <table>
        <thead>
          <tr>
            <th>ID Pesanan</th>
            <th>Pelanggan</th>
            <th>Layanan</th>
            <th>Tanggal</th>
            <th>Berat (kg)</th>
            <th>Total</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredTransactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.customer }}</td>
            <td>{{ transaction.service }}</td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.weight }}</td>
            <td>Rp {{ transaction.total.toLocaleString('id-ID') }}</td>
            <td>
              <span :class="'status-label ' + transaction.status.toLowerCase()">
                {{ transaction.status }}
              </span>
            </td>
            <td>
              <button class="action-btn view" @click="viewDetail(transaction.id)">
                <i class="fas fa-eye"></i>
              </button>
              <button 
                v-if="transaction.status === 'Pending'" 
                class="action-btn cancel"
                @click="cancelTransaction(transaction.id)"
              >
                <i class="fas fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">
        <i class="fas fa-chevron-left"></i>
      </button>
      <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Laporan',
  data() {
    return {
      startDate: '',
      endDate: '',
      selectedStatus: '',
      currentPage: 1,
      itemsPerPage: 10,
      transactions: [
        {
          id: 'LAU-2023-001',
          customer: 'Budi Santoso',
          service: 'Cuci Express',
          date: '2023-05-01',
          weight: 3,
          total: 45000,
          status: 'Selesai'
        },
        {
          id: 'LAU-2023-002',
          customer: 'Ani Wijaya',
          service: 'Cuci Kilat',
          date: '2023-05-02',
          weight: 2,
          total: 40000,
          status: 'Selesai'
        },
        {
          id: 'LAU-2023-003',
          customer: 'Citra Dewi',
          service: 'Cuci Reguler',
          date: '2023-05-03',
          weight: 5,
          total: 50000,
          status: 'Selesai'
        },
        {
          id: 'LAU-2023-004',
          customer: 'Dodi Pratama',
          service: 'Cuci Express',
          date: '2023-05-04',
          weight: 4,
          total: 60000,
          status: 'Proses'
        },
        {
          id: 'LAU-2023-005',
          customer: 'Eva Nurmalasari',
          service: 'Cuci Kilat',
          date: '2023-05-05',
          weight: 1,
          total: 20000,
          status: 'Pending'
        }
      ]
    }
  },
  computed: {
    filteredTransactions() {
      let filtered = this.transactions
      
      // Filter by date
      if (this.startDate) {
        filtered = filtered.filter(t => t.date >= this.startDate)
      }
      
      if (this.endDate) {
        filtered = filtered.filter(t => t.date <= this.endDate)
      }
      
      // Filter by status
      if (this.selectedStatus) {
        filtered = filtered.filter(t => t.status === this.selectedStatus)
      }
      
      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage
      return filtered.slice(start, start + this.itemsPerPage)
    },
    
    totalPages() {
      return Math.ceil(this.transactions.length / this.itemsPerPage)
    },
    
    summary() {
      const completed = this.transactions.filter(t => t.status === 'Selesai').length
      const totalRevenue = this.transactions
        .filter(t => t.status === 'Selesai')
        .reduce((sum, t) => sum + t.total, 0)
      
      return {
        totalTransactions: this.transactions.length,
        completedTransactions: completed,
        totalRevenue: totalRevenue
      }
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1 // Reset to first page when filters change
    },
    
    exportReport() {
      alert('Fitur export akan membuka dialog download')
    },
    
    viewDetail(id) {
      alert(`Menampilkan detail transaksi: ${id}`)
    },
    
    cancelTransaction(id) {
      if(confirm('Apakah Anda yakin ingin membatalkan transaksi ini?')) {
        const index = this.transactions.findIndex(t => t.id === id)
        if(index !== -1) {
          this.transactions[index].status = 'Dibatalkan'
        }
      }
    },
    
    prevPage() {
      if(this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    nextPage() {
      if(this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
.report-page {
  max-width: 1200px;
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

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: bold;
}

.filter-group input, 
.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.apply-btn, .export-btn {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.apply-btn {
  background-color: #42b983;
  color: white;
  border: none;
}

.apply-btn:hover {
  background-color: #3aa876;
}

.export-btn {
  background-color: #3498db;
  color: white;
  border: none;
}

.export-btn:hover {
  background-color: #2980b9;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.card-icon.total {
  background-color: #3498db;
}

.card-icon.completed {
  background-color: #42b983;
}

.card-icon.revenue {
  background-color: #9b59b6;
}

.card-content h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.card-content p {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.report-table {
  overflow-x: auto;
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

tr:hover {
  background-color: #f8f9fa;
}

.status-label {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.status-label.selesai {
  background-color: #d4edda;
  color: #155724;
}

.status-label.proses {
  background-color: #fff3cd;
  color: #856404;
}

.status-label.pending {
  background-color: #f8d7da;
  color: #721c24;
}

.status-label.dibatalkan {
  background-color: #d6d8d9;
  color: #1b1e21;
}

.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin: 0 3px;
  transition: all 0.3s;
}

.action-btn.view {
  background-color: #3498db;
  color: white;
}

.action-btn.view:hover {
  background-color: #2980b9;
}

.action-btn.cancel {
  background-color: #e74c3c;
  color: white;
}

.action-btn.cancel:hover {
  background-color: #c0392b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.pagination button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
}
</style>