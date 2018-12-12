const Theatre = require('../models/Theatre')

function index (req, res, next) {
  Theatre.all().then(theatres => {
    res.json({ response: theatres })
  })
}

function show (req, res, next) {
  const id = req.params.id
  Theatre.find(id).then(theatre => {
    res.json({ response: theatre })
  }).catch(({ message }) => {
    next({ status: 404, message })
  })
}

function create (req, res, next) {
  const { name, address } = req.body
  const theatre = new Theatre({ name, address })
  theatre.save().then(theatre => {
    res.status(201).json({ response: theatre })
  }).catch(({ message }) => {
    next({ status: 400, message })
  })
}

function update (req, res, next) {
  const id = req.params.id
  Theatre.find(id).catch(({ message }) => {
    next({ status: 404, message })
  }).then(theatre => {
    const { name, address } = req.body
    if (name) theatre.name = name
    if (address) theatre.address = address
    
    return theatre.save().catch(({ message }) => {
      next({ status: 400, message })
    })
  })
}

function destroy (req, res, next) {
  const id = req.params.id
  Theatre.find(id).catch(({ message }) => {
    next({ status: 404, message })
  }).then(theatre => {
    return theatre.destroy()
  }).then(theatre => {
    res.json({ response: theatre })
  }).catch(({ message }) => {
    next({ status: 400, message })
  })
}

module.exports = { index, show, create, update, destroy }