import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'You are not logged in' })
})

router.get('/failed', (req, res) => {
    res.send('Failed')
})
router.get('/success', (req, res) => {
    res.send(`Welcome yo`)
})

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')
    }
)

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.json({
            message: 'Signup successful',
            user: req.user,
        })
    }
)

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.')

                return next(error)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)

                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, secret || 'secret')

                return res.json({ token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
})

export default router
