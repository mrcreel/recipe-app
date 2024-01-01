import express, { application } from "express"
import cors from "cors"

import * as recipeApi from "./recipe-api"
import { PrismaClient } from "@prisma/client"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string
  const page = parseInt(req.query.page as string)
  const results = await recipeApi.searchRecipes(searchTerm, page)

  return res.json(results)
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId
  const results = await recipeApi.getRecipeSummary(recipeId)
  return res.json(results)
})

const prismaClient = new PrismaClient()

app.post("/api/recipes/favorites", async (req, res) => {
  const recipeId = req.body.recipeId

  try {
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
      data: {
        recipeId,
      },
    })
    return res.status(201).json(favoriteRecipe)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `Error adding recipe to favurites` })
  }
})

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`)
})
