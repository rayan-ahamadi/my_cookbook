import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { addRecipeFav, removeRecipeFav, getUserData } from "../../../../../redux/actions/userActions"
import { setCurrentRecipeFavorite, removeCurrentRecipeFavorite } from "../../../../../redux/slices/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"
import "./favorites.css"

function Favorites({recipeId}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const currentRecipeFavorite = useSelector((state) => state.user.currentRecipeFavorite)
    const usersFavorites = useSelector((state) => state.user.user?.favorites)

    const handleAddRecipeToFavorites = () => {
        console.log("add")
        dispatch(addRecipeFav(recipeId)) // Met la recette et rafraichir les données de l'utilisateur
        // dispatch(getUserData(user._id)) 
    }

    const handleRemoveRecipeFromFavorites = () => {
        console.log("remove")
        dispatch(removeRecipeFav(recipeId)) // Enlève la recette et rafraichir les données de l'utilisateur
        // dispatch(getUserData(user._id)) 
    }

    useEffect(() => {
        if (usersFavorites?.includes(recipeId)) {
            dispatch(setCurrentRecipeFavorite(true))
        } else {
            dispatch(removeCurrentRecipeFavorite())
        }  
    }, [usersFavorites, recipeId, dispatch])

    return user && (
        <div className="favorites-container">
            {currentRecipeFavorite ? (
                <>
                    <label htmlFor="remove-favorite" className="remove-favorite" onClick={handleRemoveRecipeFromFavorites}>
                    <span>Enlever des favoris</span> 
                    &nbsp;
                    <FontAwesomeIcon icon={solidStar} />
                    </label>
                    {/* <input type="checkbox" id="remove-favorite" name="remove-favorite" checked={true} /> */}
                </>
            ) : (
                <>
                    <label htmlFor="add-favorite" className="add-favorite" onClick={handleAddRecipeToFavorites}>
                    <span>Ajouter au favoris</span>
                    &nbsp;
                    <FontAwesomeIcon icon={regularStar} />
                    </label>
                    {/* <input type="checkbox" id="add-favorite" name="add-favorite" checked={false} /> */}
                </>
            )}
        </div>
    )
}

export default Favorites