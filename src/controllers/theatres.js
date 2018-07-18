const Theatre = require('../models/Theatre')

async function getAll (req, res, next) {
  const theatres = await Theatre.all()
  res.json({ theatres })
}

async function getOne (req, res, next) {
  const theatre = await Theatre.find(req.params.id)
  res.json({ theatre })
}

async function create (req, res, next) {
  const theatre = new Theatre(req.body)
  await theatre.save()

  res.status(201).json({ theatre })
}

async function update (req, res, next) {
  const theatre = await Theatre.find(req.params.id)
  const { name, address } = req.body

  theatre.name = name || theatre.name
  theatre.address = address || theatre.address

  await theatre.save()
  res.json({ theatre })
}

async function destroy (req, res, next) {
  const theatre = await Theatre.find(req.params.id)
  await theatre.destroy()

  res.json({ theatre })
}

module.exports = { getAll, getOne, create, update, destroy }
