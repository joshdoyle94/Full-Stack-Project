// Import Dependencies
const express = require('express')
const Workouts = require('../models/workouts')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Workouts.find({})
		.then(workouts => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('workouts/index', { workouts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
	})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Workouts.find({ owner: userId })
		.then(workouts => {
			res.render('workouts/index', { workouts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	// Nit: remove unused `userId`
	const { username, userId, loggedIn } = req.session
	res.render('workouts/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Workouts.create(req.body)
		.then(workout => {
			// Nit: remove console.log
			console.log('this was returned from create', workout)
			res.redirect('/workouts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const workoutId = req.params.id
	Workouts.findById(workoutId)
		.then(workout => {
			res.render('workouts/edit', { workout })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
// router.put('/:id', (req, res) => {
// 	const workoutId = req.params.id
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	Workouts.findByIdAndUpdate(workoutId, req.body, { new: true })
// 		.then(workout => {
// 			console.log('the workout from the update woo hoo!', workout)
// 			res.redirect(`/workouts/${workout.id}`)
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Nit: choose either single or double quotes
router.put("/:id", (req, res) => {
	// Nit: remove console.log
    console.log("req.body initially", req.body)
    const id = req.params.id

	// Nit: remove console.log
    console.log('req.body after changing checkbox value', req.body)
    Workouts.findById(id)
        .then(workout => {
            if (workout.owner == req.session.userId) {
                // must return the results of this query
                return workout.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/workouts/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// show route
router.get('/:id', (req, res) => {
	const workoutId = req.params.id
	Workouts.findById(workoutId)
	// Nit: choose either double or single quotes
	.populate("feedback.author", "username")
	.then(workout => {
            // const {username, loggedIn, userId} = req.session
			const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
			res.render('workouts/show', { workout, username, loggedIn, userId })
	})
	.catch((error) => {
			res.redirect(`/error?error=${error}`)
	})
})

// delete route
router.delete('/:id', (req, res) => {
	const workoutId = req.params.id
	Workouts.findByIdAndRemove(workoutId)
	// Nit: remove unused `workout`
		.then(workout => {
			res.redirect('/workouts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
