import { NoteForm } from './NoteForm'
import { NoteData, Tag } from '../App'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
    return (
        <div>
            <h1 className='text-[25px] font-bold'>New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </div>
    )
}