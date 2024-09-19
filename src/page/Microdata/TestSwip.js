import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TestSwip = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill value={content} onChange={handleChange} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TestSwip;
