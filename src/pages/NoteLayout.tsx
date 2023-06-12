import { useParams, useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { Note } from '../App'

type NoteLayoutProps = {
    notes: Note[]
}

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
    const { id } = useParams()
    const note = notes.find(note => note.id === id)
    const navigate = useNavigate()

    if (note == null) {
        navigate('/')
    }

    return (
        <div>
            <Outlet context={note} />
        </div>

    )
}

export const useNote = () => {
    return(
        useOutletContext<Note>()
    )
}
