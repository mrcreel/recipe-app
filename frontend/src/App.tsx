import { FormEvent, useState } from "react"
import "./App.css"
import * as api from "./api"
import { Recipe } from "./types"
import RecipeCard from "./components/RecipeCard"

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input
          type='text'
          required
          placeholder='Enter a search Term'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  )
}

export default App
