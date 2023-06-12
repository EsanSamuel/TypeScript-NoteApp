import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useNote } from "./NoteLayout"
import { Link, useNavigate } from "react-router-dom"

type NoteDelete = {
    onDeleteNote: (id: string) => void
}

export const NoteDetails = ({ onDeleteNote }: NoteDelete) => {
    const note = useNote()
    const navigate = useNavigate()
    return (
        <div className="w-full sm:p-10">
            <div className='gap-3 flex justify-between'>
                <h1 className="font-bold text-[25px]">{note.title}</h1>
                <div className='gap-3 flex' >
                    <Link to='/newNote'><button className='px-5 py-2 rounded bg-[#43affc] hover:border hover:border-[#43affc] hover:bg-transparent hover:text-[#43affc] text-white'>Edit</button></Link>
                    <button onClick={() => {
                        onDeleteNote(note.id)
                        navigate('/')
                    }} className='px-5 py-2 rounded border-[red] text-[red] border hover:bg-[red] hover:text-white'>Delete</button>
                </div>
            </div>
            <ReactMarkdown className="sm:mt-10 mt-20 text-[#5f5f5f]">{note.markdown}</ReactMarkdown>
        </div>
    )
}

