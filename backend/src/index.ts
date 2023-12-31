import express, { application } from "express"
import cors from "cors"

import * as reccipeApi from "./recipe-api"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/recipe/search", async (req, res) => {
  res.json({ message: "Success" })
})

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`)
})
