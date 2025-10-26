import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const DB_FILE = "data.json";

// تحميل البيانات من الملف
let db = {};
if (fs.existsSync(DB_FILE)) {
  db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

// البحث عن إجابة أو تخزين سؤال جديد
app.post("/ask", async (req, res) => {
  const q = req.body.question.trim().toLowerCase();

  if (db[q]) {
    return res.json({ answer: db[q] });
  } else {
    db[q] = "جارٍ البحث عن الإجابة... (سيتم التحديث لاحقًا)";
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return res.json({ answer: db[q] });
  }
});

// صفحة التجربة
app.get("/", (req, res) => res.send("Server is running ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

