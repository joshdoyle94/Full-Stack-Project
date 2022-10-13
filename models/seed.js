////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////

const mongoose = require('./connection')
const Workouts = require('./workouts')

////////////////////////////////////////
// Seed Script code
////////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startWorkouts = [
        { name: "Arm Cruncher", description: "16 sets of bicep curls", difficulty: 6, isVis: true },
        { name: "Leg Massacre", description: "20 sets of squats", difficulty: 10, isVis: true },
        { name: "Back Pounder", description: "15 sets of pullups", difficulty: 8.5, isVis: true },
        { name: "Chest Brutalizer", description: "18 sets of bench press", difficulty: 7, isVis: true },
        { name: "Blood Pumper", description: "5 miles", difficulty: 9, isVis: true },
    ]

    // delete all existing fruits
    Workouts.deleteMany({})
        .then(deletedWorkouts => {
            console.log('this is what .remove returns', deletedWorkouts)

            // create a bunch of new fruits from startFruits
            Workouts.create(startWorkouts)
                .then(data => {
                    console.log('here are the newly created fruits', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
    // replace all of them with the startFruits
})