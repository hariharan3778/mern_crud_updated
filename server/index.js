const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

const Person = mongoose.model(
  "Person",
  { name: String, age: Number },
  "person"
);

// READ
app.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post("/", async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//update people
app.put("/:id",async(req,res) => {
  const updated = await Person.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );
  res.json(updated);
});

app.delete("/:id",async(req,res)=>{
  console.log("DELETE HIT:", req.params.id); 
  await Person.findByIdAndDelete(req.params.id);
  res.json({message:"Person Deleted"});
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
