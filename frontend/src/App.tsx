import { FormEvent, useEffect, useRef, useState } from "react"
import "./App.css"
import * as api from "./api"
import { Recipe } from "./types"
import RecipeCard from "./components/RecipeCard"
import RecipeModal from "./components/RecipeModal"
import { AiOutlineSearch } from "react-icons/ai"

type Tab = "search" | "favorites"

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  )
  const [selectedTab, setSelectedTab] = useState<Tab>()
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])
  const pageNumber = useRef(1)

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipies()
        setFavoriteRecipes(favoriteRecipes.results)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFavoriteRecipes()
  }, [])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results)
      pageNumber.current = 1
    } catch (error) {
      console.error(error)
    }
  }

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage)
      setRecipes([...recipes, ...nextRecipes.results])
      pageNumber.current = nextPage
    } catch (error) {
      console.log(error)
    }
  }

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe)
      setFavoriteRecipes([...favoriteRecipes, recipe])
    } catch (error) {
      console.error(error)
    }
  }

  const removeRecipeFromFavorites = async (recipe: Recipe) => {
    try {
      await api.removeRecipeFromFavorites(recipe)

      const updatedFavorites = favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      )
      setFavoriteRecipes(updatedFavorites)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <header>
          <img src='/hero-image.jpg' alt='header image of food' />
          <div className='title'>My Recipe App</div>
        </header>
      </div>
      <div className='tabs'>
        <h1
          className={selectedTab === "search" ? "tabActive" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === "favorites" ? "tabActive" : ""}
          onClick={() => setSelectedTab("favorites")}
        >
          Favorites
        </h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(e) => handleSearchSubmit(e)}>
            <input
              type='text'
              required
              placeholder='Enter a search Term'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type='submit'>
              <AiOutlineSearch size={40} />
            </button>
          </form>
          <div className='recipeGrid'>
            {recipes.map((recipe: Recipe) => {
              const isFavorite = favoriteRecipes.some(
                (favRecipe: Recipe) => recipe.id === favRecipe.id
              )
              return (
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavoriteIconClick={
                    isFavorite ? removeRecipeFromFavorites : addFavoriteRecipe
                  }
                  isFavorite={isFavorite}
                />
              )
            })}
          </div>
          <button className='viewMoreButton' onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favorites" && (
        <div className='recipeGrid'>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteIconClick={removeRecipeFromFavorites}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  )
}

export default App
