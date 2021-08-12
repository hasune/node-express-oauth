

## Need to Insert code this constants  

GOOGLE_CLIENT_ID = ''  
GOOGLE_CLIENT_SECRET = ''  
CALLBACK_URL = ''  

## How to get ?  

- Google apis credentials Page ->  User Authentication Information  
- Make Oauth client ID / Secret key / Callback URI



```javascript
const GOOGLE_CLIENT_ID = 'google client id';
const GOOGLE_CLIENT_SECRET = 'google client secret';
const CALLBACK_URL = 'http://callback-url.com:5000/google/callback';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback   : true
  },
```

---

## How to Start Application  
```
npm start
```
