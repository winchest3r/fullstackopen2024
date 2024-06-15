import { useDispatch, useSelector } from 'react-redux';
import { voteTo } from '../reducers/anecdoteReducer';
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
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    clickHandler={() => dispatch(voteTo(anecdote.id))}
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