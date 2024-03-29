import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { Recipe } from "../types"

interface Props {
  recipe: Recipe
  isFavorite: boolean
  onClick: () => void
  onFavoriteIconClick: (recipe: Recipe) => void
}

const RecipeCard = ({
  recipe,
  isFavorite,
  onClick,
  onFavoriteIconClick,
}: Props) => {
  return (
    <div className='recipeCard' onClick={onClick}>
      <img src={recipe.image} alt={`Image of ${recipe.title}`} />
      <div className='recipeCardTitle'>
        <span
          onClick={(event) => {
            event.stopPropagation()
            onFavoriteIconClick(recipe)
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} color='red' />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard
