import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

function App(props) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Requesting data from db
  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then((response) => {
        setNotes(response.data)
      })
  }, [])

  // Filtering notes
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }


    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      })
  }

  return (
    <>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input placeholder="Add a new note" value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type='submit'>Save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    </>
  );
}

export default App;
