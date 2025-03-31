import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCommentByRecipe, addComment, deleteUserComment } from '../../../../../redux/actions/commentActions';
import { getUser } from '../../../../../services/api/entities/user/fetchUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './comments.css';

function Comments({ recipeId }) {
    const dispatch = useDispatch();
    
    const comments = useSelector((state) => state.commentReducer?.comments || []);
    const user = useSelector((state) => state.user.user)
    const loading = useSelector((state) => state.commentReducer?.loading);
    const error = useSelector((state) => state.commentReducer?.error);

    const [commentContent, setComment] = useState({
        content: "",
    });

    const checkAuth = (e) => {
        if (!user) {
            alert("Veuillez vous connecter pour poster un commentaire.") 
            setComment({
                content: "",
            });
            return;
        } else {
            setComment({
                ...commentContent,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDeleteComment = async (e) => {
        if (!user) {
            alert("Veuillez vous connecter pour supprimer un commentaire.")
            return;
        }

        if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
            return;
        }
        const commentId = e.currentTarget.dataset.id;
        const response = await dispatch(deleteUserComment(commentId));
        if (response.error) {
            alert("Erreur lors de la suppression du commentaire, veuillez réessayer.");
            return;
        }
        alert("Commentaire supprimé avec succès");
        dispatch(fetchCommentByRecipe(recipeId));
    }



    useEffect(() => { 
        if (recipeId) {
            dispatch(fetchCommentByRecipe(recipeId));
        }   
    }, [dispatch, recipeId]);

    const submitComment = async (e) => {
        e.preventDefault();

        if (!user) return alert("Veuillez vous connecter pour poster un commentaire.")
        
        if (!commentContent.content.trim()) {
            alert("Le commentaire ne peut pas être vide !");
            return;
        }

        dispatch(addComment({ recipeId, content: commentContent }));
        if (error) {
            alert("Erreur lors de l'envoi du commentaire, veuillez réessayer.");
            return;
        }
        alert("Commentaire envoyé avec succès");
        setComment({
            content: "",
        }); // Réinitialiser le champ après envoi
        dispatch(fetchCommentByRecipe(recipeId));
    }

    return (
        <div className="comments">
            <form onSubmit={submitComment} className="comment-form">
                <div className="form-group">
                   <textarea 
                        name="content" 
                        value={commentContent.content} 
                        onChange={(e) => checkAuth(e)}
                        onClick={checkAuth}
                        placeholder="Laisser un commentaire..." 
                   /> 
                </div>
                <input type="submit" value="Envoyer" />
            </form>

            {loading && <p>Chargement des commentaires...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Commentaires :</h3>
            <ul className="comments-list">  
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <li key={comment._id} className="comment">
                        <p style={{fontStyle: "italic", verticalAlign: "middle"}}>
                            <img src={"http://localhost:5000/images/avatar/" + comment.authorAvatar} style={{display:"inline"}} alt={comment.authorName} />
                            &nbsp;
                            {comment.authorName}
                        </p>
                        <p>{comment.content}</p>
                        {
                          user && (<button className="delete-comment" data-id={comment._id} onClick={handleDeleteComment}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>)
                        }          
                    </li>
                ))
            ) : (
                <p>Aucun commentaire</p>
            )}
            </ul>
        </div>
    );

}

export default Comments;
