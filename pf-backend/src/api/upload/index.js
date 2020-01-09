import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const upload = new Router();
upload.put('/', postsCtrl.imageUpload);

//id가 필요한 요청
// const post = new Router();
// post.get('/:id', postsCtrl.read);

export default upload;
