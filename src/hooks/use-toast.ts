"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000 // Reduced delay for better UX

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    // Clear existing timeout if dismissing manually before auto-remove
    clearTimeout(toastTimeouts.get(toastId));
    toastTimeouts.delete(toastId);
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Clear timeouts for existing toasts if limit is reached and a new one pushes others out
      if (state.toasts.length >= TOAST_LIMIT) {
          state.toasts.slice(TOAST_LIMIT - 1).forEach(t => {
              if (toastTimeouts.has(t.id)) {
                  clearTimeout(toastTimeouts.get(t.id));
                  toastTimeouts.delete(t.id);
              }
          })
      }
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // If updating, potentially reset the dismiss timeout
       if (action.toast.id && toastTimeouts.has(action.toast.id)) {
          clearTimeout(toastTimeouts.get(action.toast.id));
          toastTimeouts.delete(action.toast.id);
          // Optionally re-add to queue if it should stay visible longer after update
          // addToRemoveQueue(action.toast.id);
       }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // If dismissing a specific toast, ensure its timeout is cleared and start removal timer
      if (toastId) {
        if (toastTimeouts.has(toastId)) {
           clearTimeout(toastTimeouts.get(toastId));
           toastTimeouts.delete(toastId);
        }
        // Add to remove queue only if not already removed (e.g., manual dismiss)
        // This line might be redundant if DISMISS always leads to eventual REMOVE
         addToRemoveQueue(toastId);
      } else {
        // Dismiss all: clear all timeouts and queue all for removal
        state.toasts.forEach((toast) => {
          if (toastTimeouts.has(toast.id)) {
             clearTimeout(toastTimeouts.get(toast.id));
             toastTimeouts.delete(toast.id);
          }
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Trigger the close animation
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
       // Ensure timeout is cleared if it exists (belt-and-suspenders)
       if (action.toastId && toastTimeouts.has(action.toastId)) {
           clearTimeout(toastTimeouts.get(action.toastId));
           toastTimeouts.delete(action.toastId);
       }

      if (action.toastId === undefined) {
         // Removing all toasts, clear all timeouts
         toastTimeouts.forEach(timeout => clearTimeout(timeout));
         toastTimeouts.clear();
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
            // User closed the toast manually
            dismiss();
        } else {
            // Toast opened, start the timer for auto-dismissal
             addToRemoveQueue(id);
        }
      },
    },
  })
    // Also start the timer immediately upon adding
    addToRemoveQueue(id);


  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state]) // Dependency array includes state to ensure latest listener management

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
