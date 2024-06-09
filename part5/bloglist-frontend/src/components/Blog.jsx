const Blog = ({ blog }) => {
    return (
        <>
            <a href={blog.url}>{blog.title} - {blog.author}</a>
        </>
    );
};

export default Blog;