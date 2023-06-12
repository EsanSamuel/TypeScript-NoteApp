interface Props {
    title: string
}

export const Button = ({ title }: Props) => {
    return (
        <button className='px-5 py-2 rounded bg-[#43affc] text-white'>{title}</button>

    )
}