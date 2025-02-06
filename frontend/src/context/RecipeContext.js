import { createContext, useReducer } from 'react'

export const RecipeContext = createContext()

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPE':
      return { 
        recipe: action.payload 
      }
    case 'CREATE_RECIPE':
      return { 
        recipe: [action.payload, ...state.recipe] 
      }
    case 'DELETE_RECIPE':
      return {
        recipe: state.recipe.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_RECIPE':
      return {
        recipe: state.recipe.map((w) =>
          w._id === action.payload._id ? action.payload : w
        )
      }
    default:
      return state
  }
}


export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, { 
    recipe: []  
  })
  
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecipeContext.Provider>
  )
}
