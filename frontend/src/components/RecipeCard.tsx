import { Recipe } from "../types"

interface Props {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className='recipeCard'>
      <img src={recipe.image} alt={`Image of ${recipe.title}`} />
      <div className='recipeCardTitle'>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard
