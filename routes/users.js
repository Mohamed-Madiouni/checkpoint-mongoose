const express = require("express");
const router = express.Router();
const User = require("../src/model/User");

// ROUTES
// Create and Save a Record of a Model
router.post("/one", (req, res) => {
  const information = req.body;
  const newUser = new User(information);
  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});
// Create Many Records with model.create()
router.post("/many", (req, res) => {
  const information = req.body;

  User.create(information)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});




// Use model.find() to Search Your Database
router.get("/user/:name", (req, res) => {
  User.find({ name: req.params.name })
    .then((users) => {
      if (users.length) {
        res.status(200).send(users);
      } else {
        res.status(200).send({ msg: "No user found with this address!" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

//   Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/user/favoriteFoods/:favoriteFoods", (req, res) => {
  User.findOne({ favoriteFoods: req.params.favoriteFoods })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(200).send({ msg: "No user found with this name!" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

//   Use model.findById() to Search Your Database By _id
router.get("/userid/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    } else if (user) {
      res.status(200).send(user);
    } else {
      res.json({ msg: "User not found" });
    }
  });
});
//   Perform Classic Updates by Running Find, Edit, then Save
router.put("/:id", (req, res) => {
  const information = req.body.favoriteFoods;
  User.findById(req.params.id,(err, user) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }
      user.favoriteFoods.push(information);

    user.save((err, data) => {
      if (err) 
      res.status(500).send("Server Error");
      res.send(user);
    })
    }
  );
});
//   Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/oneUser/:id", (req, res) => {
  const information = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { $set: information },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }
      res.send(user);
    }
  );
});
// Delete One Document Using model.findByIdAndRemove
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.send({ msg: "User Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/name/:name", (req, res) => {
  User.remove({ name: req.params.name })
    .then((users) =>
      res.send({ msg: "User Deleted!", count: users.deletedCount })
    )
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});




//   Chain Search Query Helpers to Narrow Search Results  
router.get("/:name",(req, res) => {
  User.find({ name: req.params.name }).
    sort({name:1}).
    limit(2).
    select({name :1,favoriteFoods:1}).
    exec()
    .then((users) => res.status(200).send(users))
     .catch((err) => {
        console.log(err.message);
        res.status(500).send("Server Error");
      });
})


module.exports = router;