import api from '@/services/api';

export async function fetchSettings() {
  const res = await api.get('/settings');
  return res.data;
}

export async function updateSettings(settings) {
  const res = await api.put('/settings', settings);
  return res.data;
}

export async function resetSettings() {
  const res = await api.post('/settings/reset');
  return res.data;
}
