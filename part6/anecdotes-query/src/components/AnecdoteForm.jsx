import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationContextDispatch } from './NotificationContext';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const notificationDispatch = useNotificationContextDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
            notificationDispatch({
                type: 'MSG',
                payload: `added ${newAnecdote.content}`
            });
        },
        onError: (err) => {
            console.log(err);
            notificationDispatch({
                type: 'MSG',
                payload: err.response.data.error
            });
        }
    });


    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({content, votes: 0});
    }

    return (
        <>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;