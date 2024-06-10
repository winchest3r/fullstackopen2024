import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    
    const addBlog = (event) => {
        event.preventDefault();
        createBlog({ title, author, url });
        
        setTitle('');
        setAuthor('');
        setUrl('');
    }
    
    return (
        <>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input 
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    author
                    <input 
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url
                    <input 
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </>
    );
};

export default BlogForm;