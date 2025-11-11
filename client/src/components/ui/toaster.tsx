import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] rounded-lg border p-4 shadow-lg
            backdrop-blur-sm animate-in slide-in-from-bottom-full
            ${
              toast.variant === "destructive"
                ? "bg-red-500/90 border-red-600 text-white"
                : "bg-black/90 border-white/20 text-white"
            }
          `}
          data-testid={`toast-${toast.id}`}
        >
          {toast.title && (
            <div className="font-semibold mb-1">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute top-2 right-2 opacity-70 hover:opacity-100"
            data-testid={`toast-dismiss-${toast.id}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
