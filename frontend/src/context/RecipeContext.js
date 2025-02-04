// Centralized way to manage the state of the workouts

// CreateContext: Create a context object.
// useReducer: An alternative to useState. 
// Accepts a reducer of type (state, action) => newState, 
// and returns the current state paired with a dispatch method.
import { createContext, useReducer } from 'react'

// Context used to share the workout state and DISPATCH
// function across the component tree.
export const RecipeContext = createContext()

// Reducer function to handle the state changes
export const recipeReducer = (state, action) => {
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
        recipe: state.recipe.filter(r => r._id !== action.payload._id) 
      }
    default:
      return state
  }
}

// Context provider
export const RecipeContextProvider = ({ children }) => {
  // useReducer returns the current state and a dispatch method
  const [state, dispatch] = useReducer(recipeReducer, { 
    recipe: null
  })
  
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecipeContext.Provider>
  )
}