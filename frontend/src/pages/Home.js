import { useEffect }from 'react'
import { useRecipeContext } from "../hooks/useRecipeContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'

const Home = () => {
  const {recipe, dispatch} = useRecipeContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      console.log("response: ", response);

      if (response.ok) {
        console.log("response ok");
        console.log("json: ", json)
        dispatch({type: 'SET_RECIPE', payload: json})
      }
    }

    if (user) {
      fetchRecipe()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="recipe">
        <p>Recipes details</p>
        {recipe && recipe.map((r) => (
          <RecipeDetails key={r._id} recipe={r} />
        ))}
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home