
const express = require('express');
// express session사용을 위해 추가
const session = require('express-session');

// 로그인 링크를 눌렀을때 oath가 동작하도록 passport를 사용할 것이므로 이부분을 추가
const passport = require('passport');

//////////////////////////////////
// auth.js를 사용하도록 하자
// 보통은 이런식으로 하는데. 
// const auth = require('./auth');
// 지금은 auth라는 참조변수를 이용할 것이 아니므로 
// 참조변수를 생략하고 이렇게 써주자
require('./auth');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
// express session사용을 위해 추가
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Google Oauth2 Login</a>');
});

// 루트 url을 치면 위의 url링크가 나오고 그곳을 누르면 oauth가 작동하도록 한다.
// email과 프로파일을 보이도록 scope설정을 해준다. 
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

// 구글 apis에서 리디렉션 uri로 설정한부분에 대해서 기술한다.
// 인증 성공시의 리디렉션 / 인증 실패시의 리디렉션을 적어준다.
app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
)

// 로그인 인증 실패시 열리는 페이지를 작성한다.  
app.get('/auth/failure', (req, res) => {
  req.send('Login Failed.');
});

// 이 부분을 추가로 작성한다.
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName} <br> <a href="/logout">Logout</a> `);
});

// 로그아웃 할시에 페이지
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('See you next time');
});

app.listen(5000, () => console.log('Nodejs Server is Running PORT 5000'));
