import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';

const upload = new Router();
upload.post('/', uploadCtrl.imageUpload);
upload.use('/:id');
export default upload;
