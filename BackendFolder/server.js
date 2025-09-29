import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "./diagnoses.json";

// Save diagnosis
app.post("/api/diagnosis", (req, res) => {
  const newDiagnosis = {
    id: Date.now(),
    ...req.body,
    savedAt: new Date().toISOString(),
  };

  let diagnoses = [];
  if (fs.existsSync(FILE_PATH)) {
    diagnoses = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  }
  diagnoses.push(newDiagnosis);
  fs.writeFileSync(FILE_PATH, JSON.stringify(diagnoses, null, 2));

  res.status(201).json(newDiagnosis);
});

// Fetch all diagnoses
app.get("/api/diagnosis", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    return res.json([]);
  }
  const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  res.json(data);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));