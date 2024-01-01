import { useEffect, useState } from "react"
import { RecipeSummary } from "../types"
import * as RecipeApi from "../api"

interface Props {
  recipeId: string
  onClose: () => void
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>()

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const recipeSummary = await RecipeApi.getRecipeSummary(recipeId)
        setRecipeSummary(recipeSummary)
      } catch (error) {
        console.error(error)
      }
    }
    fetchRecipeSummary()
  }, [recipeId])

  if (!recipeSummary) {
    return <></>
  }

  return (
    <>
      <div className='overlay'></div>
      <div className='modal'>
        <div className='modalContent'>
          <div className='modalHeader'>
            <h2>{recipeSummary.title}</h2>
            <span className='closeBtn' onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  )
}

export default RecipeModal
