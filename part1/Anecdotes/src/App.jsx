import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const MostVoted = ({anecdotes, votes}) => {
  const maxNumber = Math.max(...votes);
  const maxIndex = votes.indexOf(maxNumber);
  if (maxNumber === 0)
    return (null)
  else
  return (
    <div>
      {anecdotes[maxIndex]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes , setVotes] = useState(new Array(8).fill(0))

  const handleVote = () => {
    const newVotes = [...votes];  // Luodaan kopio nykyisestä taulukosta
    newVotes[selected] += 1;  // Lisätään ääni valitulle anekdootille
    setVotes(newVotes);  // Päivitetään state taulukolla
  };

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * 8))
  }
  console.log(votes)
  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button handleClick={handleVote} text="votes"/>
        <Button handleClick={handleNext} text="next anecdote" />
      </div>
      <Header text="Anecdote with most votes" />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App