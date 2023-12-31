import { useState } from "react"
import "./App.css"
import * as api from "./api"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burger")
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes)
    } catch (error) {
      console.error(error)
    }
  }

  return <div>App</div>
}

export default App
