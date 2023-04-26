import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatISO9075 } from "date-fns";


// Here we import the new components for the seach ba
export default function Search () {
  const [posts, setPosts] = useState([]); 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://urskin.onrender.com/search');
      const data = await response.json();
      setPosts(data.data.posts);
    }
    fetchData();
  }, []);
  /* We are creating a new function that calls the API endpoint
     and passing the search value as a query parameter
  */
  const searchPost = async (e) => {
    const searchValue = e.target.value;
    const response = await fetch(`https://urskin.onrender.com/search?search=${searchValue}`);
     const data = await response.json();
    // The subset of posts is added to the state that will trigger a re-render of the UI
    setPosts(data.data.posts); 
  };
  
  return (
    <>
      <div className='container'>
        
        <h5 className="text-center">Welcome to the skin care blog</h5>
        {/* Let's add the search bar under the subheader */}
        <input onChange={searchPost}></input>
        <h5 className="text-center" >top searches : </h5>
     
        
          
          {
            posts.map((post) => {
              return (
                <div key={post._id}> 
                  <div className=" h5">
                    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                  </div>
                  <div> <span className="text-secondary">{formatISO9075(new Date(post.createdAt))}</span></div>
                </div>
              );
            })
          }
        
        <div className="contents" dangerouslySetInnerHTML={{__html:posts.content}} />
      </div>
    </>
  );
};

