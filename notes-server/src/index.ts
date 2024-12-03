import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
    try {
        const notes = await prisma.note.findMany();
        res.json(notes);
    } catch (error) {
        res.status(500).send("Oops somhing went wrong!")
    }
});
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).send("title and contents are require");
    }
    try {
        const note = await prisma.note.create({
            data: { title, content }
        });
        res.json(note);
    } catch (error) {
        res.status(500).send("Oops somhing went wrong!")
    }
});
app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);

    if (!title || !content) {
        res.status(400).send("title and contents are require");
    }

    if (!id || isNaN(id)) {
        res.status(400).send("ID must be a valid number");
    }
    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content }
        })
        res.json(updatedNote);
    } catch (error) {
        res.status(500).send("Oops somhing went wrong");
    }
})
app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).send("ID must be a number");
    }
    try {
        await prisma.note.delete({
            where: { id }
        })
        res.status(204).send("");
    } catch (error) {
        res.status(500).send("Oops somhing went wrong");
    }
})

app.listen(5000, () => {
    console.log("Server running on port:5000");
})