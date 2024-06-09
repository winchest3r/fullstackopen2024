const Blog = ({ blog }) => {
    return (
        <>
            <a href={blog.url}>{blog.title} - {blog.author} [likes: {blog.likes}]</a> 
        </>
    );
};

export default Blog;