import React, { useState } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // Import CSS for react-summernote
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/summernote-bs4.css';
import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'summernote/dist/summernote-bs4';

const EditorComponent = () => {
    const [content, setContent] = useState('');

    const handleChange = (content) => {
        setContent(content);
    };

    return (
        <div>
            <ReactSummernote
                value={content}
                options={{
                    height: 350,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']]
                    ]
                }}
                onChange={handleChange}
            />
        </div>
    );
};

export default EditorComponent;
