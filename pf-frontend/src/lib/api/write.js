import client from './client';

export const write = ({ title, skils, description, part, image }) =>
  client.post('/api/posts', { title, skils, description, part, image });
