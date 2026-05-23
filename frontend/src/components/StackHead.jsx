import { BookOpenText, ChevronRight, PenLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DEFAULT_BOOK = {
    id: 'stack-1',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    cover:
        'https://www.bbassets.com/media/uploads/p/l/40342334_1-harperbusiness-the-almanack-of-naval-ravikant.jpg',
}

function BookCover({ title, author, cover, onOpen }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group relative mx-auto block h-[19rem] w-[13.5rem] overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-card)] text-left shadow-[var(--shadow-lg)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-ring)]"
            aria-label={`Open ${title}`}
        >
            <div className="absolute inset-y-0 left-0 z-10 w-3 bg-[var(--color-text-primary)]/75" />
            <img
                src={cover}
                alt={`${title} cover`}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-4 pt-12 text-white">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                    by {author}
                </p>
                <h2 className="mt-1 line-clamp-2 text-lg font-bold leading-tight">{title}</h2>
            </div> */}
        </button>
    )
}

export default function Stack({
    id = DEFAULT_BOOK.id,
    title = DEFAULT_BOOK.title,
    author = DEFAULT_BOOK.author,
    cover = DEFAULT_BOOK.cover,
}) {
    const navigate = useNavigate()

    const openStack = () => navigate(`/stack/${id}`)

    return (
        <section className="flex w-full max-w-sm flex-col items-center gap-6 px-4 mt-6 sm:max-w-md">
            <BookCover title={title} author={author} cover={cover} onOpen={openStack} />

            <div className="w-full space-y-3 text-center">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
                    {title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <PenLine className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="font-medium">{author}</span>
                </div>
            </div>

            <button
                type="button"
                onClick={openStack}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] shadow-[var(--shadow-primary)] transition hover:bg-[var(--color-primary-hover)]"
            >
                <BookOpenText className="h-4 w-4" aria-hidden />
                <span>Read stack</span>
                <ChevronRight className="h-4 w-4 opacity-80" aria-hidden />
            </button>
        </section>
    )
}
