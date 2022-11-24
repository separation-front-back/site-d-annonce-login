import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt'
import User from './../model/user'

passport.use(
    'signup',
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = new User()
                user.email = email
                user.password = password
                await user.save()
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    'login',
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } })

                if (!user) {
                    return done(null, false, { message: 'User not found' })
                }

                const validate = await user.isValidPassword(password)

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' })
                }

                return done(null, user, { message: 'Logged in Successfully' })
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    )
)

// ...

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
)
