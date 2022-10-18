// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

const feedbackSchema = require('./feedback')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const workoutsSchema = new Schema({
		name: { type: String, required: true },
		description: { type: String, required: true },
        difficulty: { type: Number, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
        feedback: [feedbackSchema]
	},
	{ timestamps: true }
)

// The name of this model should be a single version of the word you are using. So here it should be Workout. Remember that Mongoose transforms the string we pass in to a lowercase plural version of the word for the collection name. Change to Workout across all the app
const Workouts = model('Workouts', workoutsSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Workouts