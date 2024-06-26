import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../requests';
import PropTypes from 'prop-types';
import { useNotificationContextDispatch } from './NotificationContext';

const Anecdote = ({ anecdote, voteHandler }) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteHandler}>vote</button>
            </div>
        </>
    );
};

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        content: PropTypes.string,
        votes: PropTypes.number
    }),
    voteHandler: PropTypes.func
}

const Anecdotes = ({ anecdotes }) => {
    const queryClient = useQueryClient();
    const notificationDispatch = useNotificationContextDispatch();
    
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
                anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
            ).toSorted((a, b) => b.votes - a.votes));
            notificationDispatch({ 
                type: 'MSG', 
                payload: `voted ${updatedAnecdote.content}`
            });
        }
    });


    const handleVote = (anecdote) => () => {
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        };
        updateAnecdoteMutation.mutate(updatedAnecdote);
    };

    return (
        <>
            {anecdotes.map(anecdote => 
                <Anecdote 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    voteHandler={handleVote(anecdote)}
                />    
            )}
        </>
    );
}

Anecdotes.propTypes = {
    anecdotes: PropTypes.array,
}

export default Anecdotes;