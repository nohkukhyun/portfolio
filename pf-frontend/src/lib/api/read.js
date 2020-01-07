import client from './client';

export const readPost = id => client.get(`/api/posts/${id}`);
