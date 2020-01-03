import client from './client';

export const write = ({ title, skils, description }) =>
  client.post('/api/write', { title, skils, description });
