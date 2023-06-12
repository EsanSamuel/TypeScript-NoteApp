import { Routes, Route } from 'react-router-dom'
import { Notes } from './pages/Notes'
import { NewNote } from './pages/NewNote'
import { NoteLayout } from './pages/NoteLayout'
import { useLocalStorage } from './pages/useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { NoteDetails } from './pages/NoteDetails'


export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tag: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const CreateNote = ({ tag, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const deleteNote = (id: string) => {
    setNotes(prevNote => {
      return prevNote.filter(note => note.id !== id)
    }

    )
  }

  return (
    <div className='p-5 sm:p-10'>
      <Routes>
        <Route path='/' element={<Notes notes={notes} availableTags={tags} />} />
        <Route path='/newNote' element={<NewNote onSubmit={CreateNote} onAddTag={addTag} availableTags={tags} />} />

        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteDetails onDeleteNote={deleteNote} />} />
          <Route path='edit' element={<h1>Show</h1>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App