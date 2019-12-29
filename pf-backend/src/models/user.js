import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  password: String,
});

//password 설정
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

//password 체크 확인
UserSchema.methods.checkPassowrd = async function(password) {
  const rs = await bcrypt.compare(password, this.password);
  return rs; // true / false
};

//username으로 찾기
UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

//pw reset
UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.password;
  return data;
};

//make jet token
UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      //첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_TOKEN, //두 번째 파라미터에는 JWT 암호를 넣는다.
    {
      expiresIn: '7d', //30일 동안 유효함
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
