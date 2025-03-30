import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCommentByRecipe, addComment } from '../../../../../redux/actions/commentActions';

function Comments({ recipeId }) {
    const dispatch = useDispatch();
    
    const comments = useSelector((state) => state.comment?.comments || []);
    const loading = useSelector((state) => state.comment?.loading);
    const error = useSelector((state) => state.comment?.error);

    const [commentContent, setComment] = useState("");

    useEffect(() => { 
        if (!recipeId) return;
        dispatch(fetchCommentByRecipe(recipeId));
    }, [dispatch, recipeId]);

    const submitComment = async (e) => {
        e.preventDefault();
        
        if (!commentContent.trim()) {
            alert("Le commentaire ne peut pas être vide !");
            return;
        }

        try {
            await dispatch(addComment(recipeId, commentContent));
            alert("Commentaire envoyé avec succès");
            setComment(""); // Réinitialiser le champ après envoi
        } catch (error) {
            alert("Erreur lors de l'envoi du commentaire");
        }
    };

    return (
        <div className="comments">
            <form onSubmit={submitComment} className="comment-form">
                <div className="form-group">
                   <textarea 
                        name="content" 
                        value={commentContent} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Laisser un commentaire..." 
                   /> 
                </div>
                <input type="submit" value="Envoyer" />
            </form>

            {loading && <p>Chargement des commentaires...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                        <p>{comment.author}</p>
                    </div>
                ))
            ) : (
                <p>Aucun commentaire</p>
            )}
        </div>
    );
}

export default Comments;
