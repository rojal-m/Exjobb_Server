const express = require('express')
const router = express.Router()
const Form = require('../models/form')


// Getting one forms
router.get('/getOne/:id', getFormById, (req, res) => {
  res.json(res.form)
}) 

// Getting all forms
router.get('/getAll/:userId', getForms, (req, res) => {
    res.json(res.froms)
}) 

// Creating one form
router.post('/post', async (req, res) => {
  const form = new Form({
    title: req.body.title,
    class: req.body.class,
    userId: req.body.userId,
    isComplete: req.body.isComplete,
    properties: req.body.properties
  })
  try {
    const newForm = await form.save()
    res.status(201).json(newForm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



// Updating One form
router.patch('/patch/:id', getFormById, async (req, res) => {
  if (req.body.title != null) {
    res.form.title = req.body.title
  }
  if (req.body.class != null) {
    res.form.class = req.body.class
  }
  if (req.body.userId != null) {
    res.form.email = req.body.userId
  }
  if (req.body.isComplete != null) {
    res.form.isComplete = req.body.isComplete
  }
  if (req.body.properties != null) {
    res.form.properties = req.body.properties
  }
  try {
    const updatedForm = await res.form.save()
    res.json(updatedForm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
  
  // Deleting One form
  router.delete('/delete/:id', getFormById, async (req, res) => {
    try {
      await res.form.remove()
      res.json({ message: 'Deleted Form' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }) 

async function getForms(req, res, next) {
  let froms
  try {
      froms = await Form.find({'userId':req.params.userId}, 'title class userId isComplete createdDate')
    if (froms == null) {
      return res.status(404).json({ message: 'Cannot find Forms' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message})
  }

  res.froms = froms
  next()
}

async function getFormById(req, res, next) {
  let form
  try {
    form = await Form.findById(req.params.id)
    if (form == null) {
      return res.status(404).json({ message: 'Cannot find Forms' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message})
  }

  res.form = form
  next()
}
module.exports = router