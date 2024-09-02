const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;

  let date;
  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
