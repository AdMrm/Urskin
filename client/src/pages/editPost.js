import { useEffect, useState } from 'react';
import Editor from '../components/editor';
import 'react-quill/dist/quill.snow.css';
import { Navigate,useParams } from 'react-router-dom';
export default function EditPost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();


    useEffect(() => {
       fetch(`https://urskin.onrender.com/post/`+id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        });
    }, []);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
         data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        
    const response = await fetch('https://urskin.onrender.com/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }


    if (redirect) {
    return <Navigate to={'/post/'+id} />
  }
    return (
        <form onSubmit={updatePost}>
            <input type='title' placeholder={'title'} value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <input type='summary' placeholder={'summary'} value={summary}
                 onChange={ev => setSummary(ev.target.value)} />
            <input type='file'  onChange={ev=>setFile(ev.target.files)} />
            <Editor onChange={ setContent} value={content} theme={'snow'} />
            <button>update post</button>
        </form> 
    );
}
