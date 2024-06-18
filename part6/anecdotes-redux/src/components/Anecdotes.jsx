import { useDispatch, useSelector } from 'react-redux';
import { voteTo } from '../reducers/anecdoteReducer';
import { changeNotification } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';
import anecdoteService from '../services/anecdotes';

const Anecdote = ({ anecdote, clickHandler}) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={clickHandler}>vote</button>
            </div>
        </>
    );
}

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => {
        const data = state.anecdotes;
        if (state.filter !== '') {
            return data.filter(a => a.content.toLowerCase().includes(state.filter));
        }
        return data;
    });

    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    clickHandler={async () => {
                        const newAnecdote = await anecdoteService.update(anecdote.id, {
                            content: anecdote.content,
                            id: anecdote.id,
                            votes: anecdote.votes + 1
                        });
                        dispatch(changeNotification(`you voted '${newAnecdote.content}'`));
                        dispatch(voteTo(newAnecdote.id));
                    }}
                />
            )}
        </>
    );
}

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        content: PropTypes.string,
        votes: PropTypes.number
    }),
    clickHandler: PropTypes.func
}

export default Anecdotes;