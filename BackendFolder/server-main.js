import app from './app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Main backend server running at http://localhost:${PORT}`);
});