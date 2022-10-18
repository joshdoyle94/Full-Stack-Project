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
        { name: "Arm Cruncher", description: "4 sets of barbell curls, 4 sets of spider curls, 4 sets of hammer curls, 4 sets of skullcrushers, 4 sets of tricep pushdown,", difficulty: 7 },
        { name: "Leg Massacre", description: "6 sets of squats, 4 sets of front squats, 5 sets of deadlifts, 4 sets of lying hamstring curl, 4 sets of seated hamstring curl", difficulty: 9.5 },
        { name: "Back Pounder", description: "5 sets of pullups, 4 sets of barbell rows, 4 sets of cable rows", difficulty: 6.5 },
        { name: "Chest Brutalizer", description: "5 sets of barbell bench, 4 sets of dumbbell bench, 3 sets of pec flies,", difficulty: 6.5 },
        { name: "Blood Pumper", description: "5 mile run", difficulty: 9 },
        { name: "Bicep and Back Burner", description: "4 sets of pullups, 4 sets of wide-grip rows, 4 sets of barbell curl, 4 sets of preacher curls", difficulty: 8 },
        { name: "Ham Juicer", description: "4 sets of lying hamstring curls, 4 sets of squats, 4 sets of deadlifts, 4 sets of seated hamstring curls", difficulty: 8.5 },
        { name: "Shoulder Masher", description: "3 sets of military press, 3 sets of lateral raises, 3 sets of dumbbell presses, 3 sets of max pushups", difficulty: 7 },
        { name: "Superhero Sprinter", description: "1 mile light jog, 10 sets of 100m sprints", difficulty: 9.5 },
        { name: "Bodyweight Blaster", description: "3 cycles of: 1 set of pullups, 1 set of dips, 1 set of max pushups", difficulty: 5 },
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