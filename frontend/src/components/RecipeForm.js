import { useState } from 'react'
import { useRecipeContext } from '../hooks/useRecipeContext'
import { useAuthContext } from '../hooks/useAuthContext'

const RecipeForm = () => {
  const { dispatch } = useRecipeContext()
  const { user } = useAuthContext()
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    difficulty: 'easy'
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in to add a recipe')
      return
    }

    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(ing => ing.trim())
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newRecipe),
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    } else {
      dispatch({ type: 'ADD_RECIPE', payload: json })
      setFormData({ name: '', ingredients: '', instructions: '', prepTime: '', difficulty: 'easy' })
      setError(null)
    }
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>

      <label>Recipe Name:</label>
      <input 
        type="text" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        required
      />

      <label>Ingredients (comma-separated):</label>
      <textarea 
        value={formData.ingredients} 
        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} 
        required
      />

      <label>Cooking Instructions:</label>
      <textarea 
        value={formData.instructions} 
        onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} 
        required
      />

      <label>Preparation Time (minutes):</label>
      <input 
        type="number" 
        value={formData.prepTime} 
        onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} 
        required
      />

      <label>Difficulty Level:</label>
      <select 
        value={formData.difficulty} 
        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} 
        required
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button type="submit">Add Recipe</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default RecipeForm