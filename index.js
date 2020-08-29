const mongoose = require("./src/database");
let personModel = require("./src/model/person");
mongoose._connect();

// Create and Save a Record of a Model
let person = new personModel({
  name: "Mohamed",
  age: 28,
  favoriteFoods: ["pizza", "coscous"],
});

person.save((err, data) => {
  if (err) throw console.log(err);
  console.log(data);
});

// Create Many Records with model.create()
personModel.create(
  [
    { name: "Ali", age: 28, favoriteFoods: ["spaghetti", "poisson"] },
    { name: "Habib", age: 16, favoriteFoods: ["burger", "sandwich"] },
    { name: "Mohamed", age: 28, favoriteFoods: ["pizza", "coscous"] },
  ],
  (err, data) => {
    if (err) throw console.log(err);
    console.log(data);
  }
);

// Use model.find() to Search Your Database
personModel.find({ name: "Mohamed" }, (err, data) => {
  if (err) throw console.log(err);
  console.log("list of collections with model.find() :", data);
});

//   Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne({ favoriteFoods: "burger" }, (err, data) => {
  if (err) throw console.log(err);
  console.log("list of collections with model.findone() :", data);
});

//   Use model.findById() to Search Your Database By _id

personModel.findById("5f4a6051c4fd19234c5e5613", (err, data) => {
  if (err) throw console.log(err);
  console.log("list of collections with model.findbyID() :", data);
});

//   Perform Classic Updates by Running Find, Edit, then Save

personModel
  .findById("5f4a6051c4fd19234c5e5613")
  .then((data) => {
    data.favoriteFoods.push("hamburger");

    data.save((err, data) => {
      if (err) throw console.log(err);
      console.log("updated document", data);
    })
  })
  .catch((err) => console.log(err));

//   Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate({name:"Mohamed"},{age:20},{new:true})
.then(data=>console.log("updated using findone and replace",data))
.catch(err=>console.log(err))

// Delete One Document Using model.findByIdAndRemove
personModel.findByIdAndRemove("5f4a754740177c3364b9f08e")
.then(data=>console.log("removed using findone and remove",data))
.catch(err=>console.log(err))


// MongoDB and Mongoose - Delete Many Documents with model.remove()
personModel.remove({name:"Mohamed"},(err, data) => {
    if (err) throw console.log(err);
    console.log("list of deleted documents :", data);
  })


//   Chain Search Query Helpers to Narrow Search Results  
  personModel.
  find({favoriteFoods:"spaghetti"}).
  sort({name:1}).
  limit(2).
  select({name :1,favoriteFoods:1}).
  exec((err, data) => {
    if (err) throw console.log(err);
    console.log("Result of chaining :", data);
  })

