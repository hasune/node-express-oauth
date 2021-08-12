// 패스포트 사용을 위해 이부분을 추가
const passport = require('passport');

// var를 const로 바꿔주자.
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// 따로 이렇게 빼줬다.
const GOOGLE_CLIENT_ID = 'google client id';
const GOOGLE_CLIENT_SECRET = 'google client secret';
const CALLBACK_URL = 'http://callback-url.com:5000/google/callback';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback   : true
  },
  // DB를 쓰고있을때의 코드이다.
  // function(request, accessToken, refreshToken, profile, done) {
  //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return done(err, user);
  //   });
  // }
  // 현재는 DB를 안쓰고 구현하기 위해 이렇게 수정하자
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }

));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
