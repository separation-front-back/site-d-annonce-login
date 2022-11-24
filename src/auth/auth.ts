import passport from 'passport'
import { Strategy } from 'passport-local'
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
                console.log(1)
                const user = await User.findOne({ where: { 'email': email } })
                console.log(2)
                if (!user) {
                    return done(null, false, { message: 'User not found' })
                }
                console.log(3)
                const validate = await user.isValidPassword(password)
                console.log(4)
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' })
                }
                console.log(5)
                return done(null, user, { message: 'Logged in Successfully' })
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    )
)
