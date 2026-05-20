import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserRegister() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/register`, {
                name,
                username,
                email,
                password
            },{
                withCredentials: true
            })

            console.log(response.data);
            localStorage.setItem('scs_auth', 'true')
            localStorage.setItem('scs_role', 'user')
            navigate("/user/profile")

        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message)
        }


    }

    return (
        <div className="min-h-dvh flex flex-col items-center justify-between px-5 py-10 bg-[var(--color-bg)] text-[var(--color-text-primary)]">
            <div className="w-full max-w-[448px]">
                <div className="text-sm mb-2 font-semibold tracking-[0.02em] text-[var(--color-text-secondary)]">Meta</div>
                <h1 className="text-[2.05rem] leading-[1.15] font-bold mb-2">Get started on SCS Food</h1>
                <p className="mb-5 text-[1.06rem] text-[var(--color-text-secondary)]">Sign up to discover food reels from local food partners.</p>

                <form className="flex flex-col gap-3" noValidate onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-[1.02rem] font-semibold">Mobile number or email</label>
                        <input id="email" type="email" name='email' placeholder="Mobile number or email" className="w-full h-[50px] rounded-[13px] px-3.5 text-[1.02rem] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] outline-none focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]" autoComplete="email" required />
                    </div>

                    <p className="text-[0.92rem] leading-[1.35] text-[var(--color-text-muted)]">
                        You may receive notifications from us. <a href="#" className="text-[var(--color-info)] font-semibold no-underline hover:underline">Learn why we ask for your contact information</a>
                    </p>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-[1.02rem] font-semibold">Password</label>
                        <input id="password" name='password' type="password" placeholder="Password" className="w-full h-[50px] rounded-[13px] px-3.5 text-[1.02rem] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] outline-none focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]" autoComplete="new-password" required />
                    </div>

                    <div>
                        <label htmlFor="full-name" className="block mb-2 text-[1.02rem] font-semibold">Name</label>
                        <input id="name" name='name' type="text" placeholder="Full name" className="w-full h-[50px] rounded-[13px] px-3.5 text-[1.02rem] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] outline-none focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]" autoComplete="name" required />
                    </div>

                    <div>
                        <label htmlFor="username" className="block mb-2 text-[1.02rem] font-semibold">Username</label>
                        <input id="username" name='username' type="text" placeholder="Username" className="w-full h-[50px] rounded-[13px] px-3.5 text-[1.02rem] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] outline-none focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]" autoComplete="username" required />
                    </div>

                    <p className="text-[0.92rem] leading-[1.35] text-[var(--color-text-muted)]">
                        By tapping Submit, you agree to create an account and to SCS Food&apos;s <a href="#" className="text-[var(--color-info)] font-semibold no-underline hover:underline">Terms</a>, <a href="#" className="text-[var(--color-info)] font-semibold no-underline hover:underline">Privacy Policy</a>, and <a href="#" className="text-[var(--color-info)] font-semibold no-underline hover:underline">Cookies Policy</a>.
                    </p>

                    <button type="submit" className="mt-1 w-full h-[46px] rounded-full text-base font-semibold text-[var(--color-text-on-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors">Submit</button>
                </form>

                <Link to="/user/login" className="inline-flex mt-3 w-full h-[46px] rounded-full border border-[var(--color-input-border)] items-center justify-center font-semibold no-underline text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] transition-colors">
                    I already have an account
                </Link>

                <p className="mt-4 text-[0.88rem] text-[var(--color-text-muted)]">
                    Are you a restaurant? <Link to="/creator/register" className="text-[var(--color-info)] font-semibold no-underline hover:underline">Register as Creator</Link>
                </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5 text-[0.83rem] text-[var(--color-text-muted)]">
                <span>Meta</span>
                <span>About</span>
                <span>Blog</span>
                <span>Jobs</span>
                <span>Help</span>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Locations</span>
                <span>Language</span>
            </div>
        </div>
    )
}

export default UserRegister
