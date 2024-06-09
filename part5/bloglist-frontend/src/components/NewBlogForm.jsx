const NewBlogForm = ({addBlog, title, author, url, setTitle, setAuthor, setUrl}) => {
    return (
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
    );
};

export default NewBlogForm;