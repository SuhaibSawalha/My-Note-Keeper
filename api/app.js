const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/notes", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/notes/search", (req, res) => {
  const query = req.query;
  res.send(query);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  res.send({ id });
});

const schema = {
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  creationDate: Joi.date().required(),
};
function validateNote(note) {
  return Joi.validate(note, schema);
}

app.post("/api/notes", (req, res) => {
  const body = req.body;
  const { error } = validateNote(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.send(body);
});

app.put("api/notes/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  // check if exist error404
  //   check validation error400
  //   res.send(note)
});

app.delete("api/notes/:id", (req, res) => {
  const id = req.params.id;
  // check if exist error404
  //   res.send(note)
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// title, content, creationDate
