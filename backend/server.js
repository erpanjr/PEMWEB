const express = require('express');
const app = express();
const port = 3000;

const news = [
  { id: 1, title: "News 1", category: "Category 1", summary: "Summary 1", keywords: ["keyword1", "keyword2"] },
  { id: 2, title: "News 2", category: "Category 2", summary: "Summary 2", keywords: ["keyword3", "keyword4"] }
];

app.get('/news', (req, res) => {
  res.json(news);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
