import client from './client';

export const write = ({ title, skils, description }) =>
  client.post('/api/posts', { title, skils, description });
