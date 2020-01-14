import AWS from 'aws-sdk';

export const imageUpload = async (ctx, next) => {
  const file = ctx.request.files.file;
  console.log(file);
  const ACCESS_KEY = 'AKIAIWN3TAASKJ2BZKNQ';
  const SECRET_ACCESS_KEY = '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';
  //아마존 S3 설정
  AWS.config.region = 'ap-northeast-2'; //Seoul
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const s3_params = {
    Bucket: 'portfolio-image-upload',
    Key: `https://s3.console.aws.amazon.com/s3/buckets/portfolio-image-upload/image/${file.name}`,
    // Key: 'http://localhost:3000/upload',
    ACL: 'public-read',
    ContentType: file.mimetype,
    Body: file.data,
  };
  var s3obj = new AWS.S3({ params: s3_params });
  s3obj
    .upload()
    .on('httpUploadProgress', function(evt) {})
    .send(function(err, data) {
      //S3 File URL
      ctx.status(200).send(data.key);
      //어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
    });
};
