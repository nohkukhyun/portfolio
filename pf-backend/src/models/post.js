import mongoose from 'mongoose';

const { Schema } = mongoose;

const PortfolioSchema = new Schema({
  title: String,
  description: String,
  image: String,
  skils: String,
  part: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now, //현재날짜를 기본으로
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

//model이라는 몽고의 내장함수는 기본적으로 2개의 파라미터가 필요
//첫 번째 스키마 이름, 두 번째 스키마 객체
const Post = mongoose.model('Post', PortfolioSchema);
export default Post;
