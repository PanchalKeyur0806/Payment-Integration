import app from "./index";

const PORT = process.env.PORT as string;

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
