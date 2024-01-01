import { Recipe } from "./types"

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/search")
  baseUrl.searchParams.append("searchTerm", searchTerm)
  baseUrl.searchParams.append("page", page.toString())

  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error(`HTTP error! Status code: ${response.status}`)
  }
  return await response.json()
}

export const getRecipeSummary = async (recipeId: string) => {
  const baseUrl = new URL(
    `http://localhost:5000/api/recipes/${recipeId}/summary`
  )

  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error(`HTTP error! Status code: ${response.status}`)
  }
  return await response.json()
}

export const getFavoriteRecipies = async () => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/favorites")
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error(`HTTP error! Status code: ${response.status}`)
  }
  return await response.json()
}

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/favorites")

  const body = {
    recipeId: recipe.id,
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! Status code: ${response.status}`)
  }
}

export const removeRecipeFromFavorites = async (recipe: Recipe) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/favorites")

  const body = {
    recipeId: recipe.id,
  }

  const response = await fetch(baseUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! Status code: ${response.status}`)
  }
}
