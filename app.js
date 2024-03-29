import express from "express";
import iconsRouter from "./icons-router.js";
import cors from "cors";

export const port = process.env.PORT || 3000;

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "chrome-extension://mbhgbcmnlmeepkimdhilipphemnmeefo",
    ],
  }),
);

app.use("/", iconsRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
