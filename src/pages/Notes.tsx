import { useState, useMemo } from 'react'
import ReactSelect from 'react-select'
import { Tag, Note } from '../App'
import { Link } from 'react-router-dom'

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

export const Notes = ({ availableTags, notes }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')

    const filterNote = useMemo(() => {
        return notes?.filter(note => {
            return (
                (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every(tag =>
                        note.tag.some(noteTag => noteTag.id === tag.id)))
            )
        })

    }, [title, selectedTags, notes])

    return (
        <div className='w-full'>
            <div className="flex justify-between">
                <h1 className='text-[25px] font-bold'>Note</h1>
                <div className='gap-3 flex'>
                    <Link to='/newNote'><button className='px-5 py-2 rounded bg-[#43affc] text-white  hover:border hover:border-[#43affc] hover:bg-transparent hover:text-[#43affc]'>New</button></Link>
                    <button className='px-5 py-2 rounded border-[#5f5f5f] border'>Save</button>
                </div>
            </div>

            <div className='sm:flex justify-between w-full py-10 gap-5'>
                <label className="w-full ">
                    <h1 className='py-3'>Title</h1>
                    <input className="px-3 w-full border h-[40px] rounded border-[#5f5f5f] outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required /></label>

                <label className="w-full">
                    <h1 className='py-3'>Tags</h1>
                    <ReactSelect isMulti
                    />
                </label>
            </div>

            <h1 className='text-[20px]'>Notes</h1>
            <div className='grid grid-cols-1 sm:grid-cols-3 xs:grid-cols-2 gap-3 mt-10'>
                {filterNote?.length > 0 ? (
                    <div>
                        {filterNote.reverse().map(note => (
                            <div key={note.id} >
                                <NoteCard id={note.id} title={note.title} tags={note.tag} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center'>
                        <h1> No Notes Founded!</h1>
                    </div>
                )}

            </div>
        </div>
    )
}

export const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    return (
        <div className=' w-full '>
            <Link to={`/${id}`}> <div className='border  h-[150px] rounded text-center items-center mt-5  text-[#43affc] border-[#43affc]'>
                <h1 className='mt-10 font-bold text-[20px]'>{title}</h1>
                <div>
                    {tags?.length > 0 && (
                        <div>
                            {
                                tags.map(tag => (
                                    <div className='' key={tag.id}>{tag.label}</div>
                                ))
                            }
                        </div>
                    )}

                </div>
            </div></Link>
        </div>
    )
}