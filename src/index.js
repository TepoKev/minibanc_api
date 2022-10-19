import * as dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: '.env.dev' });

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`minibanc api listening on port ${port}`);
});
