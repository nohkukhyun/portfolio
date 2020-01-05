import client from './client';

// export const list = () => client.get('/api/posts');

export const readPost = id => client.get(`/api/posts/${id}`);
