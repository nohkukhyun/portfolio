import client from './client';

//이미지 업로드
export const uploadImage = imageFile => client.post('/api/upload', imageFile);
