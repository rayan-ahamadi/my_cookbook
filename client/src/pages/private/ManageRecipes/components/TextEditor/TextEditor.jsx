import { useEffect, useRef } from "react";
import Quill from "quill";
import "./TextEditor.css";
import "quill/dist/quill.snow.css";

const TextEditor = ({ handleInputChange, formData }) => {
    const quillRef = useRef(null);
    const quillInstance = useRef(null); // Stocke l'instance Quill sans déclencher de re-render

    useEffect(() => {
        if (!quillInstance.current && quillRef.current) { 
            console.log("Initialisation de Quill..."); // Vérifie si Quill est recréé

            quillInstance.current = new Quill(quillRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        ["image", "code-block"]
                    ]
                }
            });

            quillInstance.current.on("text-change", () => {
                handleInputChange({
                    target: { name: "instructions", value: quillInstance.current.root.innerHTML }
                });
            });
        }
    }, []); // Dépendances vides pour exécuter `useEffect` une seule fois

    return <div ref={quillRef} />;
};

export default TextEditor;
