import { useRef, useState } from 'react'
import CreatableReactSelect from 'react-select/creatable'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { NoteData } from '../App'
import { Tag } from '../App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const navigate = useNavigate()

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault()
        
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tag: selectedTags,
        })

        navigate('/')
    }
    return (
        <form className='w-full' onSubmit={handleSubmit}>
            <div className='sm:flex justify-between w-full py-10 gap-3'>
                <label className="w-full ">
                    <h1 className='py-3'>Title</h1>
                    <input className=" px-2 w-full border h-[40px] rounded border-[#5f5f5f] outline-none" ref={titleRef} required /></label>

                <label className="w-full">
                    <h1 className='py-3'>Tags</h1>
                    <CreatableReactSelect
                        onCreateOption={label => {
                            const newTag = { id: uuidV4(), label }
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }}
                        value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                            setSelectedTags
                                (
                                    tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    })
                                )
                        }}
                        isMulti
                    />
                </label>
            </div>

            <div className='w-full'>
                <textarea className=' p-2 w-full h-[400px] rounded border-[#5f5f5f] outline-none border' ref={markdownRef} required></textarea>
            </div>

            <div className='flex gap-4 py-5'>
                <Button
                    title='Save'

                />
                <Link to='..'>
                    <button className='px-5 py-2 rounded border-[#5f5f5f] border'>Cancel</button>
                </Link>
            </div>

        </form>
    )
}