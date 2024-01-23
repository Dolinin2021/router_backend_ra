import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { nanoid } from 'nanoid';

const app = express();

app.use(cors());

app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

let notes = [
  { "text": "Пример", "id": nanoid(), "created": Date.now() },
  { "text": "Второй пример", "id": nanoid(), "created": Date.now() },
];

app.get("/notes", (req, res) => {
  res.send(JSON.stringify(notes));
});

app.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const index = notes.findIndex((o) => o.id === noteId);
  res.send(JSON.stringify(notes[index]));
});

app.post("/notes", (req, res) => {
  notes.push({ ...req.body, id: nanoid(), "created": Date.now() });
  res.send(JSON.stringify(notes));
  res.status(204);
  res.end();
});

app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  notes = notes.map((o) => {
    if (o.id === noteId) {
      return {
        ...req.body,
        created: o.created,
      };
    }
    return o;
  });
  res.send(JSON.stringify(notes));
  res.status(204);
  res.end();
});

app.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.send(JSON.stringify(notes));
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
