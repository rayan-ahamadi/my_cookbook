// Importing core components
import QuillEditor from "react-quill";
import PropTypes from 'prop-types';

// Importing styles
import "react-quill/dist/quill.snow.css";

const TextEditor = ({handleInputChange, textState}) => {

  return (
    <div>
      <QuillEditor
        theme="snow"
        value={textState}
        onChange={handleInputChange}
      />
    </div>
  );
};
TextEditor.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  textState: PropTypes.string.isRequired,
};

export default TextEditor;
