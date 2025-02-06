import { RecipeContext } from "../context/RecipeContext"
import { useContext } from "react"

export const useRecipeContext = () => {
  const context = useContext(RecipeContext)

  if(!context) {
    throw Error('useRecipesContext must be used inside an RecipesContextProvider')
  }

  return context
}