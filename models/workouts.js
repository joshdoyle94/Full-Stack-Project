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
		isVis: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
        feedback: [feedbackSchema]
	},
	{ timestamps: true }
)

const Workouts = model('Workouts', workoutsSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Workouts