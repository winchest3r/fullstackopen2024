import { useDispatch, useSelector } from 'react-redux';
import { voteTo } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';

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
                    clickHandler={() => {
                        dispatch(setNotification(`you voted '${anecdote.content}'`));
                        dispatch(voteTo(anecdote));
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