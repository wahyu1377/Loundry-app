<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat-card" v-if="isAdmin">
        <h3>Total Pelanggan</h3>
        <p>50</p>
      </div>
      <div class="stat-card" v-if="isAdmin">
        <h3>Total Pesanan</h3>
        <p>120</p>
      </div>
      <div class="stat-card" v-if="!isAdmin">
        <h3>Pesanan Aktif</h3>
        <p>2</p>
      </div>
      <div class="stat-card" v-if="!isAdmin">
        <h3>Pesanan Selesai</h3>
        <p>15</p>
      </div>
    </div>
    <div class="recent-orders" v-if="!isAdmin">
      <h2>Pesanan Terakhir</h2>
      <table>
        <thead>
          <tr>
            <th>ID Pesanan</th>
            <th>Layanan</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.service }}</td>
            <td>{{ order.date }}</td>
            <td :class="order.status">{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isAdmin: false, // Ganti dengan true untuk tampilan admin
      recentOrders: [
        { id: 'ORD-001', service: 'Cuci Express', date: '2023-05-15', status: 'Selesai' },
        { id: 'ORD-002', service: 'Cuci Kilat', date: '2023-05-18', status: 'Proses' },
        { id: 'ORD-003', service: 'Cuci Reguler', date: '2023-05-20', status: 'Pending' }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.stat-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #666;
}

.stat-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0 0;
}

.recent-orders {
  margin-top: 2rem;
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
  color: #42b983;
}

.Proses {
  color: #f0ad4e;
}

.Pending {
  color: #d9534f;
}
</style>