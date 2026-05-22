import { CheckCircle2, Info, X, XCircle } from 'lucide-react'

const TOAST_STYLES = {
    success: {
        Icon: CheckCircle2,
        box: {
            backgroundColor: '#ecfdf5',
            borderColor: '#6ee7b7',
            color: '#064e3b',
        },
        iconColor: '#059669',
    },
    error: {
        Icon: XCircle,
        box: {
            backgroundColor: '#fef2f2',
            borderColor: '#fca5a5',
            color: '#7f1d1d',
        },
        iconColor: '#dc2626',
    },
    info: {
        Icon: Info,
        box: {
            backgroundColor: '#ffffff',
            borderColor: '#38bdf8',
            color: '#0c4a6e',
        },
        iconColor: '#0284c7',
    },
}

export default function Toast({ toasts, onDismiss }) {
    if (!toasts.length) {
        return null
    }

    return (
        <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex flex-col items-center gap-2 px-4"
        >
            {toasts.map((toast) => {
                const style = TOAST_STYLES[toast.type] ?? TOAST_STYLES.info
                const { Icon } = style

                return (
                    <div
                        key={toast.id}
                        role="status"
                        className="toast-enter pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border-2 px-4 py-3 shadow-xl"
                        style={style.box}
                    >
                        <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: style.iconColor }} />
                        <p className="flex-1 text-sm font-semibold leading-snug" style={{ color: style.box.color }}>
                            {toast.message}
                        </p>
                        <button
                            type="button"
                            onClick={() => onDismiss(toast.id)}
                            className="shrink-0 rounded-full p-1 opacity-70 transition hover:opacity-100"
                            style={{ color: style.box.color }}
                            aria-label="Dismiss notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
