import Stack from '../../components/StackHead'
import { DUMMY_STACKS } from './stackData'

export default function StackScroll() {
    return (
        <div className="h-[100vh] w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)] md:h-[100vh]">
            <div className="h-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
                {DUMMY_STACKS.map((stack) => (
                    <div
                        key={stack.id}
                        className="flex h-[100vh] py-8 snap-start snap-always items-center justify-center bg-[var(--color-bg)] md:h-[100dvh] "
                    >
                        <Stack
                            id={stack.id}
                            title={stack.title}
                            author={stack.author}
                            cover={stack.cover}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
