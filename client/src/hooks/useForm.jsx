import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState); // état du formulaire

  const handleInputChange = (e) => {

      if (e.target.type === 'file') {
        if (e.target.files[0] && e.target.files[0].type === "image/webp") {
          alert("Les fichiers au format WEBP ne sont pas autorisés.");
          e.target.value = null;
          return;
        }
        // Si le champ est de type fichier, on utilise e.target.files[0] pour récupérer le fichier
        setFormData({ ...formData, [e.target.name]: e.target.files[0] }) // Change la valeur d'une propriété dans FormData à partir de son nom dans le formulaire
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value }) // Change la valeur d'une propriété dans FormData à partir de son nom dans le formulaire
      }
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();

      // Remplir le FormData avec les valeurs du state
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });


      onSubmit?.(formDataToSend); // Appelle la fonction onSubmit si elle est définie
      setFormData(initialState); // Réinitialise le formulaire
  }

  return { formData, handleInputChange, handleSubmit };
}

export default useForm;