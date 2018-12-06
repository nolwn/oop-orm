# OOP ORM

This is a project designed to get you to write your own simple ORM.

## Installation

1. Fork/clone

1. `npm install`

1. `createdb oop_orm_dev && createdb oop_orm_test`

1. `cp .env.sample .env`

1. `npm run migrate`

1. `npm run seed`

1. `npm run test`

## Description

For this exercise you will _only_ be creating the Model for a **Theatre**. Theatres have a `name` and `address` field outside of all the usual stuff. You will be writing your model so that it has the following static and instance methods.

**GET ALL**
```js
const theatres = await Theatre.all()
// [ { ... }, { ... }, { ... } ]
```

**GET ONE**
```js
const theatres = await Theatre.find(1)
// { ... }
```

**CREATE**
```js
const theatre = new Theatre({ name: 'My Theatre', address: '123 Main Street' })
await theatre.save()
// { id: xx, name: 'My Theatre', address: '123 Main Street' }
```

**UPDATE**
```js
const theatre = await Theatre.find(1)
theatre.name = 'My New Name'
await theatre.save()
// { id: 1, name: 'My New Name', ... }
```

**DESTROY**
```js
const theatre = await Theatre.find(1)
await theatre.destroy()
// { id: 1, ... }
```

## Getters and Setters

To help you out, you'll also be creating the following properties on individual instances of each theatre. These should allow you to create the above methods.

**GET & SET .id**

You should be able to retrieve the ID from a theatre but not change it after the fact.

```js
const theatre = new Theatre({ id: 99, name: 'Name', address: 'Address' })
theatre.id // 99
```

```js
const theatre = new Theatre({ id: 99, name: 'Name', address: 'Address' })
theatre.id = 100 // ERROR!
```

**GET & SET .removed**

This property will tell you whether or not the current instance has been removed (i.e. deleted). This will allow you to keep track of which instances you've deleted and which are still active in your database.

```js
const theatre = new Theatre({ id: 99, name: 'Name', address: 'Address' })
theatre.removed // false
```

```js
const theatre = new Theatre({ id: 99, name: 'Name', address: 'Address' })
theatre.removed = true // ERROR!
```

```js
const theatre = Theatre.find(99)
theatre.removed // false

theatre.destroy()
theatre.removed // true
```

**BONUS: .valid**

You may find this property helpful in other parts of your code! It is designed to both give you and the user a way to determine whether or not the instance is valid.

```js
const theatre = new Theatre({ name: 'My Theatre' })
theatre.valid // false
theatre.address = '123 Main Street'
theatre.valid // true
```