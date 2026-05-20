import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

function UserLogin() {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        try {

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/login`, {
                email,
                password
            }, {
                withCredentials: true
            })

            console.log(response.data)
            localStorage.setItem('scs_auth', 'true')
            localStorage.setItem('scs_role', 'user')
            navigate("/user/profile")

        } catch (error) {
            console.log("error in UserLogin in sending data", error)
        }
    }

    return (
        <div className="min-h-dvh bg-[var(--color-bg)] px-5 py-10 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[var(--shadow-lg)]">
                    <div className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
                        User Login
                    </div>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Sign in to your account to continue.
                    </p>

                    <form className="mt-7 space-y-4" noValidate onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="h-12 w-full rounded-xl border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="h-12 w-full rounded-xl border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-input-focus)] focus:ring-2 focus:ring-[var(--color-focus-ring)]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 h-12 w-full rounded-xl bg-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
                        Don&apos;t have an account?{" "}
                        <Link to="/user/register" className="font-semibold text-[var(--color-info)] hover:underline">
                            Create one
                        </Link>
                    </p>

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px flex-1 bg-[var(--color-border)]" />
                        <span className="text-xs text-[var(--color-text-muted)]">or</span>
                        <span className="h-px flex-1 bg-[var(--color-border)]" />
                    </div>

                    <p className="text-center text-xs text-[var(--color-text-muted)]">
                        Are you a creator?{" "}
                        <Link to="/creator/login" className="font-semibold text-[var(--color-info)] hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
