import client from './client';

export const write = ({ title, skils, description, image, part }) =>
  client.post('/api/posts', { title, skils, description, image, part });

//이미지 업로드
export const writeImg = ({ imageFile }) =>
  client.post('/s3/uploads/', imageFile);
