const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Together = require("together-ai");
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const together = new Together();

app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Erreur Together:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log("http://localhost3000");
});