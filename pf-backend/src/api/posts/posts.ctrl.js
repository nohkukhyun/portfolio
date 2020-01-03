import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

/*
  POST api/posts

  {
    title: '제목',
    description: '설명',
    image: '이미지',
    skils: '사용한 기술 및 언어',
    part: '참여율',
    tags: ['태그...'],
  }
*/

export const write = async ctx => {
  const schema = Joi.object().keys({
    //객체 여부 확인
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    skils: Joi.string(),
    part: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const rs = Joi.validate(ctx.request.body, schema);
  if (rs.error) {
    ctx.status = 400;
    ctx.body = rs.error;
    return;
  }

  const { title, description, image, skils, part, tags } = ctx.request.body;
  const post = new Post({
    title,
    description,
    image,
    skils,
    part,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/?username=&tags=&page=
  특정 사용자나, 태그가 있는 포스트만 조회
*/
export const list = async ctx => {
  //query는 문자열이기 때문에 숫자로 변환해 주어야 합니다.
  //값이 주어지지 않았다면 1을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  //tags, username값이 유효하면 객체에 넣고 아니면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    //find()메서드 이후에 exec()메서드를 호출해야 서버에 쿼리를 요청
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map(post => ({
      ...post,
      description:
        post.description.length > 200
          ? `${post.description.slice(0, 200)}...`
          : post.description,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async ctx => {
  ctx.body = ctx.state.post;
};

export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; //성공은 했지만 응답할 데이터가 없을때.
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async ctx => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    skils: Joi.string(),
    part: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const rs = Joi.validate(ctx.request.body, schema);
  if (rs.error) {
    ctx.status = 400;
    ctx.body = rs.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // true면 업데이트된 데이터를 반환 false일때는 업데이트 되기전에 값 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.stats.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  // id로 찾은 포스트가 로그인 중인 사용자가 작성한 포스트인지 확인
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
