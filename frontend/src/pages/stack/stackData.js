export const DUMMY_STACKS = [
    {
        id: 'stack-1',
        title: 'The Almanack of Naval Ravikant',
        author: 'Eric Jorgenson',
        cover:
            'https://www.bbassets.com/media/uploads/p/l/40342334_1-harperbusiness-the-almanack-of-naval-ravikant.jpg',
        insightTitle: 'Specific Knowledge',
        insight: [
            'Specific knowledge cannot be taught, but it can be learned. It comes from following your natural curiosity, your lived experience, and the things you do better than almost anyone else.',
            'It is usually found where genuine interest meets repetition. The work that feels light to you but valuable to others is often where your edge lives.',
            'Most of life is a search for who and what needs you the most.',
        ],
        views: '17K',
        saves: '2.8K',
    },
    {
        id: 'stack-2',
        title: 'Atomic Habits',
        author: 'James Clear',
        cover:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Identity Drives Behavior',
        insight: [
            'Lasting change gets easier when habits become evidence for the kind of person you believe you are.',
            'The question shifts from What do I want to achieve to Who do I want to become. Small repeated actions then reinforce that identity.',
            'You do not rise to the level of your goals. You fall to the level of your systems.',
        ],
        views: '9.4K',
        saves: '1.7K',
    },
    {
        id: 'stack-3',
        title: 'Deep Work',
        author: 'Cal Newport',
        cover:
            'https://www.pngall.com/wp-content/uploads/19/Deep-Work-Book-Professional-Growth-Technique-PNG.png',
        insightTitle: 'Attention Is an Asset',
        insight: [
            'Deep work is the ability to focus without distraction on cognitively demanding tasks.',
            'In a noisy environment, sustained concentration becomes rare and therefore more valuable. Protecting it is a career advantage, not just a productivity trick.',
            'If you do not schedule focus, distraction will schedule itself for you.',
        ],
        views: '12.1K',
        saves: '3.1K',
    },
    {
        id: 'stack-4',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        cover:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Wealth Is Behavior',
        insight: [
            'Doing well with money has less to do with intelligence and more to do with behavior that stays steady over long periods.',
            'People can know the math and still make poor decisions under pressure. Good financial judgment often looks like patience, humility, and emotional control.',
            'The hardest financial skill is getting the goalpost to stop moving.',
        ],
        views: '15.8K',
        saves: '4.2K',
    },
    {
        id: 'stack-5',
        title: 'The 48 Laws of Power',
        author: 'Robert Greene',
        cover:
            'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Power Follows Perception',
        insight: [
            'Influence is shaped not only by what you do, but by how others interpret your intent, confidence, and timing.',
            'People respond to signals constantly. In many environments, restraint and positioning can be more effective than force.',
            'Reputation is the cornerstone of power.',
        ],
        views: '21.3K',
        saves: '5.6K',
    },
    {
        id: 'stack-6',
        title: 'Zero to One',
        author: 'Peter Thiel',
        cover:
            'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Build What Is New',
        insight: [
            'Progress comes in two forms: copying what works and creating what does not yet exist. The second is where outsized value often lives.',
            'Competition can push companies into sameness. Real leverage appears when a business solves a meaningful problem in a way others have not.',
            'Brilliant thinking is rare, but courage is in even shorter supply than genius.',
        ],
        views: '11.6K',
        saves: '2.3K',
    },
    {
        id: 'stack-7',
        title: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        cover:
            'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Assets Create Freedom',
        insight: [
            'Financial growth starts when you learn the difference between things that drain your resources and things that produce them.',
            'Many people work harder for money without building systems that make money work for them. Ownership changes that equation.',
            'It is not how much money you make. It is how much money you keep.',
        ],
        views: '18.7K',
        saves: '4.9K',
    },
    {
        id: 'stack-8',
        title: 'Can’t Hurt Me',
        author: 'David Goggins',
        cover:
            'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
        insightTitle: 'Limits Are Negotiable',
        insight: [
            'Most people stop far earlier than they need to because discomfort feels like a stop sign instead of a training signal.',
            'Resilience grows when you repeatedly keep promises to yourself under stress. Confidence then comes from evidence, not motivation.',
            'You are in danger of living a life so comfortable and soft that you will die without ever realizing your true potential.',
        ],
        views: '24.5K',
        saves: '6.4K',
    },
]

export function getStackById(stackId) {
    return DUMMY_STACKS.find((stack) => stack.id === stackId) ?? null
}
