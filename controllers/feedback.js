////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Workouts = require("../models/workouts")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:workoutId", (req, res) => {
    const workoutId = req.params.workoutId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific fruit
    Workouts.findById(workoutId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the fruit?
        .then(workout => {
            // push the comment into the fruit.comments array
            workout.feedback.push(req.body)
            // we need to save the workout
            return workout.save()
        })
        .then(workout => {
            // res.status(200).json({ fruit: fruit })
            res.redirect(`/workouts/${workout.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:workoutId/:feedbackId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const workoutId = req.params.workoutId 
    const feedbackId = req.params.feedbackId
    // get the fruit
    Workouts.findById(workoutId)
        .then(workout => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theFeedback = workout.feedback.id(feedbackId)
            console.log('this is the feedback that was found', theFeedback)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theFeedback.author == req.session.userId) {
                    // find some way to remove the comment
                    // here's another built in method
                    theFeedback.remove()
                    workout.save()
                    res.redirect(`/workouts/${workout.id}`)
                    // return the saved fruit
                    // return fruit.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))
    })

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router