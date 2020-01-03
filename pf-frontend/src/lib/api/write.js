import client from './client';

export const write = ({ title, skils, description, image, tags }) =>
  client.post('/api/posts', { title, skils, description, image, tags });
