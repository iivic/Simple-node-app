let app = require('express')(),
    bodyParser = require('body-parser'),
    dbConfig = require('./knexfile.js')[process.env.NODE_ENV],
    path = require('path'),
    port = dbConfig.port,
    APIRoutes = require('./bear_app/routes/api_urls'),
    TemplateRoutes = require('./bear_app/routes/urls'),
    db = require('./bear_app/models/db'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// passport config
// getting attributes from models is done with .get in this case
// we just send the attributes so the template can get the value
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        db.User.where({username})
        .fetch()
        .then(user => {
            if (!user) return done(null, false);
            user.authenticate(password)
            .then(user => done(null, user.attributes))
            .catch(err => done(null, false));
        })
        .catch(err => done(err));
    }
));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    db.User.where({id})
    .fetch()
    .then(user => done(null, user.attributes))
    .catch(err => done(err));
});

app.set("view engine", "pug")
   .set("views", path.join(__dirname, "bear_app/views"))
   .use(require('morgan')('dev'))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: true}))
   .use(require('express-session')({
        secret: 'some-secret',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.locals.user = req.user;
        next();
    })
    .use('/', TemplateRoutes)
    .use('/api', APIRoutes)
    .listen(port, err => {
        if (err) console.error('Error: Starting server failed,', err.message);
        console.log('Listening on port ' + port);
    });
