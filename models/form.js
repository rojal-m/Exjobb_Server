const mongoose = require('mongoose')


// Schema for the Form
const formSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  class: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  properties: [{
    name: String,
    value: {
      type: mongoose.Schema.Types.Mixed, // Can store string or an array of strings
    }}], // Array of Form Properties
});

const Form =  mongoose.model('Form', formSchema)

module.exports = Form;