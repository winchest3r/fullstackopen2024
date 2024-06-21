import { useField } from '../hooks/index';

const CreateNew = (props) => {
    const content = useField('content');
    const author = useField('author');
    const info = useField('info');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
    };

    const handleReset = () => {
        const dummyEvent = {
            target: {
                value: '',
            },
        };

        content.onChange(dummyEvent);
        author.onChange(dummyEvent);
        info.onChange(dummyEvent);
    }
  
    return (
        <>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    <div>
                        content<input {...content} />
                    </div>
                    <div>
                        author<input {...author} />
                    </div>
                    <div>
                        url for more info<input {...info} />
                    </div>
                    <button type="submit">create</button>
                    <button type="reset">reset</button>
                </div>
            </form>
        </>
    );
};

export default CreateNew;