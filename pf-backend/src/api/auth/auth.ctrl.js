import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
  //signup
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  const rs = Joi.validate(ctx.request.body, schema);
  if (rs.error) {
    ctx.status = 400;
    ctx.body = rs.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; //Conflict
      return;
    }

    const user = new User({
      username,
    });

    await user.setPassword(password); //비밀번호 설정
    await user.save(); // db 저장

    //응답할 데이터에서 password 필드 제거
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async ctx => {
  //login
  const { username, password } = ctx.request.body;

  //username,password 없으면 에러처리
  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    //findByUsername로 아이디를 찾고 계정이 존재하지 않으면 에러처리
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }

    //checkPassowrd 패스워드를 체크하고 잘못된 비밀번호면 에러처리
    const valid = await user.checkPassowrd(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async ctx => {
  //login check
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};

export const logout = async ctx => {
  //logout
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
