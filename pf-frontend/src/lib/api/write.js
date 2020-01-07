import client from './client';

export const write = ({ title, skils, description, image, part }) =>
  client.post('/api/posts', { title, skils, description, image, part });

export const writeImg = ({ imageFile }) =>
  client.post('api/uploads/', imageFile);
