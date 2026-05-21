import { PenLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DEFAULT_BOOK = {
    id: 'stack-1',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    cover:
        'https://www.bbassets.com/media/uploads/p/l/40342334_1-harperbusiness-the-almanack-of-naval-ravikant.jpg',
}

export default function Stack({
    id = DEFAULT_BOOK.id,
    title = DEFAULT_BOOK.title,
    author = DEFAULT_BOOK.author,
    cover = DEFAULT_BOOK.cover,
}) {
    const navigate = useNavigate()

    return (
        <section className="flex h-full w-full max-w-md flex-col items-center justify-center gap-8 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 shadow-[var(--shadow-lg)] md:max-w-sm md:px-10 md:py-9">
            <header className="flex w-full justify-center">
                <button
                    type="button"
                    onClick={() => navigate(`/stack/${id}`)}
                    className="rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold tracking-wide text-[var(--color-text-on-primary)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--color-primary-hover)]"
                >
                    Read
                </button>
            </header>
            <div>
                <div className="flex w-full flex-1 items-center justify-center py-6">
                    <div className="relative aspect-[2/3] w-full max-w-[230px] sm:max-w-[200px] md:max-w-[160px]">
                        <img
                            src={cover}
                            alt={`${title} book cover`}
                            className="h-full w-full object-cover shadow-[var(--shadow-md)]"
                        />
                    </div>
                </div>

                <article className="w-full text-center">
                    <h1 className="mb-2 text-lg font-bold leading-tight text-[var(--color-text-primary)] md:text-xl">
                        {title}
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
                        <PenLine className="h-4 w-4" />
                        <p className="text-base font-medium">{author}</p>
                    </div>
                </article>
            </div>
        </section>
    )
}
