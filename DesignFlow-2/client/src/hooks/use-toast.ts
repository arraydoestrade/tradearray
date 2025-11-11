import { useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCounter = 0;
const listeners = new Set<(toasts: Toast[]) => void>();
let memoryState: Toast[] = [];

function dispatch(toasts: Toast[]) {
  memoryState = toasts;
  listeners.forEach((listener) => listener(toasts));
}

export function toast({ title, description, variant = "default" }: Omit<Toast, "id">) {
  const id = (++toastCounter).toString();
  const newToast: Toast = { id, title, description, variant };
  dispatch([...memoryState, newToast]);

  setTimeout(() => {
    dispatch(memoryState.filter((t) => t.id !== id));
  }, 5000);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(memoryState);

  useState(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  });

  return {
    toasts,
    toast,
    dismiss: (toastId: string) => {
      dispatch(memoryState.filter((t) => t.id !== toastId));
    },
  };
}
