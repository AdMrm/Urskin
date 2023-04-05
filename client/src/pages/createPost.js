import Editor from '../components/editor';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';



  
export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
  async  function createnewpost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
      if (response.ok) {
          setRedirect(true);
      }
        
    } if (redirect) {
       return <Navigate to={'/'}/>
   }
    return (
        <form onSubmit={createnewpost}>
            <input type='title' placeholder={'title'} value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <input type='summary' placeholder={'summary'} value={summary}
                 onChange={ev => setSummary(ev.target.value)} />
            <input type='file'  onChange={ev=>setFile(ev.target.files)} />
            <Editor onChange={ setContent} value={content} theme={'snow'} />
            <button>create post</button>
        </form> 
    );
}