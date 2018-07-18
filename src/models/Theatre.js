const db = require('../db')
class Theatre {
  constructor({ id, name, address }={}) {
    this._id = id
    this.name = name
    this.address = address
    this._removed = false
  }

  get id () {
    return this._id
  }

  set id (val) {
    throw new Error(`Cannot set ID of Theatre`)
  }

  get removed () {
    return this._removed
  }

  set removed (val) {
    throw new Error(`Cannot set removed attribute of Theatre`)
  }

  static all () {
    return db('theatres').map(theatre => new Theatre(theatre))
  }

  static find (id=0) {
    return db('theatres').where({ id }).first().then(theatre => {
      if (!theatre) throw new Error(`Theatre ${id} could not be found`)
      return new Theatre(theatre)
    })
  }

  save () {
    if (!this.name || !this.address) {
      return Promise.reject(new Error(`Name and Address are required`))
    }

    if (this.id) {
      return db('theatres')
        .update({ name: this.name, address: this.address })
        .where({ id: this.id })
        .returning('*')
        .then(([ theatre ]) => {
          this.name = theatre.name
          this.address = theatre.address
          return this
        })
    } else {
      return db('theatres')
        .insert({ name: this.name, address: this.address })
        .returning('*')
        .then(([ theatre ]) => {
          this._id = theatre.id
          return this
        })
    }
  }

  destroy () {
    return db('theatres').where({ id: this.id }).del()
      .returning('*')
      .then(([ theatre ]) => {
        if (!theatre) throw new Error(`Theatre ${id} could not be found`)
        this._removed = true
        return this
      })
  }
}

module.exports = Theatre
