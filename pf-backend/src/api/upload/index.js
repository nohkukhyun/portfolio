import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';

const upload = new Router();
upload.post('/', uploadCtrl.imageUpload);

//id가 필요한 요청
// const post = new Router();
// post.get('/:id', postsCtrl.read);

export default upload;
