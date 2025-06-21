<template>
  <nav class="admin-menu">
    <router-link to="/admin/dashboard" class="admin-menu-link" active-class="active" exact>Dashboard</router-link>
    <router-link to="/admin/users" class="admin-menu-link" active-class="active">จัดการผู้ใช้</router-link>
    <router-link to="/admin/posts" class="admin-menu-link" active-class="active">จัดการบทความ</router-link>
    <!-- เพิ่มเมนูอื่นๆ ได้ที่นี่ -->
  </nav>
</template>

<script setup>
// ไม่มี logic พิเศษ
</script>

<style scoped>
.admin-menu {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: linear-gradient(90deg, #181828 70%, #00ffff22 100%);
  padding: 2rem 1.2rem 2rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 0 16px #00fff799, 0 0 32px #ff00ff33;
  min-width: 180px;
  margin-right: 2.5rem;
}
.admin-menu-link {
  color: #00fff7;
  font-weight: bold;
  font-size: 1.08rem;
  text-decoration: none;
  letter-spacing: 1px;
  padding: 0.7rem 1rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 0 6px #00fff799;
}
.admin-menu-link:hover,
.admin-menu-link.active {
  background: #ff00ff;
  color: #fff;
  box-shadow: 0 0 14px #ff00ff99, 0 0 30px #00fff7cc;
}
</style>
