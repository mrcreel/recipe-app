import express, { application } from "express"
import cors from "cors"

import * as recipeApi from "./recipe-api"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string
  const page = parseInt(req.query.page as string)
  const results = await recipeApi.searchRecipes(searchTerm, page)

  return res.json(results)
})

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`)
})
