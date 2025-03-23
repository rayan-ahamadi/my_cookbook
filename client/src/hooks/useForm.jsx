import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState); // état du formulaire

  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value }) // Change la valeur d'une propriété dans FormData à partir de son nom dans le formulaire
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit?.(formData); // Appelle la fonction onSubmit si elle est définie
      setFormData(initialState); // Réinitialise le formulaire
  }

  return { formData, handleInputChange, handleSubmit };
}

export default useForm;