<template>
  <div class="laporan">
    <h1>Laporan Transaksi</h1>
    <div class="filters">
      <div class="filter-group">
        <label for="start-date">Dari Tanggal</label>
        <input type="date" id="start-date" v-model="startDate">
      </div>
      <div class="filter-group">
        <label for="end-date">Sampai Tanggal</label>
        <input type="date" id="end-date" v-model="endDate">
      </div>
      <div class="filter-group">
        <label for="status">Status</label>
        <select id="status" v-model="selectedStatus">
          <option value="">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Proses">Proses</option>
          <option value="Pending">Pending</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>
      <button @click="applyFilters">Terapkan</button>
      <button @click="exportToExcel">Export ke Excel</button>
    </div>
    
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in filteredTransactions" :key="transaction.id">
          <td>{{ transaction.id }}</td>
          <td>{{ transaction.customer }}</td>
          <td>{{ transaction.service }}</td>
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.weight }}</td>
          <td>Rp {{ transaction.total.toLocaleString() }}</td>
          <td :class="transaction.status">{{ transaction.status }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5"><strong>Total Pendapatan</strong></td>
          <td colspan="2"><strong>Rp {{ totalRevenue.toLocaleString() }}</strong></td>
        </tr>
      </tfoot>
    </table>
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
      transactions: [
        { id: 'ORD-001', customer: 'John Doe', service: 'Cuci Express', date: '2023-05-01', weight: 3, total: 45000, status: 'Selesai' },
        { id: 'ORD-002', customer: 'Jane Smith', service: 'Cuci Kilat', date: '2023-05-05', weight: 2, total: 40000, status: 'Selesai' },
        { id: 'ORD-003', customer: 'Bob Johnson', service: 'Cuci Reguler', date: '2023-05-10', weight: 5, total: 50000, status: 'Selesai' },
        { id: 'ORD-004', customer: 'Alice Brown', service: 'Cuci Express', date: '2023-05-15', weight: 4, total: 60000, status: 'Proses' },
        { id: 'ORD-005', customer: 'Charlie Wilson', service: 'Cuci Kilat', date: '2023-05-20', weight: 1, total: 20000, status: 'Pending' }
      ]
    }
  },
  computed: {
    filteredTransactions() {
      let filtered = this.transactions
      
      if (this.startDate) {
        filtered = filtered.filter(t => t.date >= this.startDate)
      }
      
      if (this.endDate) {
        filtered = filtered.filter(t => t.date <= this.endDate)
      }
      
      if (this.selectedStatus) {
        filtered = filtered.filter(t => t.status === this.selectedStatus)
      }
      
      return filtered
    },
    totalRevenue() {
      return this.filteredTransactions
        .filter(t => t.status === 'Selesai')
        .reduce((sum, t) => sum + t.total, 0)
    }
  },
  methods: {
    applyFilters() {
      // Filtering sudah dihandle oleh computed property
    },
    exportToExcel() {
      alert('Export ke Excel berhasil!')
    }
  }
}
</script>

<style scoped>
.laporan {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filters button {
  background-color: #474b4a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  height: fit-content;
}

.filters button:hover {
  background-color: #545755;
}

.filters button:last-child {
  background-color: #5bc0de;
}

.filters button:last-child:hover {
  background-color: #46b8da;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

tr:hover {
  background-color: #f9f9f9;
}

.Selesai {
  color: #155724;
  background-color: #d4edda;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.Proses {
  color: #856404;
  background-color: #fff3cd;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.Pending {
  color: #721c24;
  background-color: #f8d7da;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.Dibatalkan {
  color: #1b1e21;
  background-color: #d6d8d9;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

tfoot {
  font-weight: bold;
  background-color: #f5f5f5;
}
</style>