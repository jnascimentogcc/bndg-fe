const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/front-end/browser')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/browser', 'index.html'));
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`✅ Angular app is running on http://localhost:${port}`);
});
