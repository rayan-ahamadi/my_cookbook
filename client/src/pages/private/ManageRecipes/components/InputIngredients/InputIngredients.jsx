import {useRef, useState} from "react";
import PropTypes from 'prop-types';
import "./InputIngredients.css";

function InputIngredients({handleInputChange, ingredientState}) {
    const modalRef = useRef(0);
    const [ingredient,setIngredient] = useState({
        name: "",
        quantity : 0,
        unit: "",
        notes: ""
    })

    const handleModalOpen = () => {
        modalRef.current.classList.add("open")
    }

    const handleModalClose = (e) => {
        const clickedElement = e.target; 

        if (clickedElement === modalRef.current) {
            modalRef.current.classList.remove("open")
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setIngredient({...ingredient, quantity : Number(ingredient.quantity)})
        handleInputChange([...ingredientState , ingredient]);
        modalRef.current.classList.remove("open")
        setIngredient({
            name: "",
            quantity : 0,
            unit: "",
            notes: ""
        })
    }


    return <div>
        <input type="button" name="ingredients" id="ingredients" value="Ajouter" onClick={handleModalOpen}/>
        <p style={{ display: 'inline' }}>{ingredientState?.length > 0 ? ` Nombre d'ingrédients: ${ingredientState.length}` : " Aucun ingrédient pour le moment"} </p>
        <div className="ingredient-container">
            <ul>
                {ingredientState?.length > 0 && ingredientState.map((ingredient, index) => (
                    <li key={index}>
                        <span>"{ingredient.name}"<>&nbsp;</></span>
                        <span>{ingredient.quantity}<>&nbsp;</></span>
                        <span>{ingredient.unit}<>&nbsp;</></span>
                        <span style={{fontStyle: "italic"}}>`{ingredient.notes}`<>&nbsp;</></span>
                    </li>
                ))}
            </ul>      
        </div>
        
        <div className="modal" ref={modalRef} onClick={handleModalClose}>
            <div className="close">x</div>
            <div className="modal-title">
                <h2>Ajouter un ingrédient</h2>
            </div>
            <div className="modal-content">
                <div>
                    <div className="form-group">
                        <label htmlFor="ingredientName">Nom</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="ingredientName"
                        value={ingredient.name}
                        onChange={(e) => setIngredient({...ingredient, name: e.target.value})}
                         />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredientQuantity">Quantité</label>
                        <input 
                        type="number" 
                        name="quantity" 
                        id="ingredientQuantity" 
                        value={ingredient.quantity}
                        onChange={(e) => setIngredient({...ingredient, quantity: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Unité</label>
                        <select name="unit" id="unit" value={ingredient.unit} onChange={(e) => setIngredient({...ingredient, unit: e.target.value})}>
                            <option value="">Sélectionner une unité</option>
                            <option value="g">g (gramme)</option>
                            <option value="kg">kg (kilogramme)</option>
                            <option value="ml">ml (millilitre)</option>
                            <option value="l">l (litre)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredientNotes">Notes</label>
                        <input 
                        type="text" 
                        name="notes" 
                        id="ingredientNotes"
                        value={ingredient.notes} 
                        onChange={(e) => setIngredient({...ingredient, notes: e.target.value})}/>
                    </div>
                    <input type="submit" className="submit" value="Ajouter" onClick={handleClick}/>
                </div>
            </div>
        </div>
    </div>
}
InputIngredients.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    ingredientState: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        notes: PropTypes.string
    })).isRequired
};

export default InputIngredients;
