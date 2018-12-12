const db = require("../db");

class Theatre {
  constructor({ id, name, address } = {}) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._removed = false;
    this._valid = !!name && !!address;
  }

  // GETTERS AND SETTERS
  get id() {
    return this._id;
  }

  set id(id) {
    throw "I am NOT a piece of meat!";
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
  }

  get removed() {
    return this._removed;
  }

  set removed(removed) {
    throw "You're not my supervisoer!";
  }

  get valid() {
    return this._valid;
  }

  set valid(valid) {
    throw "You're trying to cheat. Cheater.";
  }

  static all() {
    return db("theatres")
      .then(data => {
        return data.map(el => new Theatre(el));
      });
  }

  static find(id) {
    return db("theatres")
      .where({ id })
      .then(([ data ]) => {
        return new Theatre(data);
      });
  }

  save() {
    const thisRecord = { name: this._name, address: this._address }
    if (!thisRecord.name || !thisRecord.address) {
      return Promise.reject( new Error("Tell me more or got to Hell!"));
    }

    if (!this._id) {
      return db("theatres")
        .insert(thisRecord)
        .then(() => this);
    } else {
      return db("theatres")
        .where({ id: this._id })
        .update(thisRecord)
        .then(() => this);
    }
  }

  destroy() {
    if (this._removed) {
      return Promise.reject(new Error("You're kicking a dead horse."))
    }

    return db("theatres")
      .del()
      .where({ id: this._id })
      .then(() => {
        this._removed = true;
        return this;
      })
  }
}
module.exports = Theatre
