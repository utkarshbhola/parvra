import app from "./app.js";
import dotenv from "dotenv";
import protectedRoutes from "./routes/protected.js";

dotenv.config();

app.use("/protected", protectedRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
