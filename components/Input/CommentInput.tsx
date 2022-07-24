import dynamic from 'next/dynamic';
import React, { useState } from 'react'

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function CommentInput(props: any) {
  const { onSubmit } = props;
  const [content, setContent] = useState('');

  const handleChange = (value: any) =>  {
    setContent(value);
  }

  const handleSubmit = () => {
    onSubmit(content)
    setContent('')
  }

  return (
    <div>
      <SunEditor
        lang={'en'}
        height='150px'
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['formatBlock', 'align', 'fontSize'],
            ['bold', 'italic', 'blockquote', 'link', 'list'],
            ['fullScreen', 'codeView', 'preview'],
          ]
        }}
        onChange={handleChange}
        setContents={content}
      />
      <div className="comment_toolkit clear">
        <input className="button-comment" type="button" value="Đăng bình luận" onClick={handleSubmit}/>
      </div>
    </div>
  )
}

export default CommentInput