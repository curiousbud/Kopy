/**
 * @fileoverview A custom hook for displaying toast notifications.
 *
 * This hook provides a simple API (`toast()`, `dismiss()`) for creating and
 * managing toast notifications from anywhere in the application. It's inspired
 * by the `react-hot-toast` library and manages a global state of toasts.
 *
 * @see https://ui.shadcn.com/docs/components/toast
 */

"use client"

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// The maximum number of toasts to display at once.
const TOAST_LIMIT = 1
// A long delay before removing a dismissed toast from the state, allowing for animations.
const TOAST_REMOVE_DELAY = 1000000

/**
 * Defines the shape of a toast object in the global state.
 * @interface
 */
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Defines the types of actions that can be dispatched to the toast reducer.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// A simple counter to generate unique IDs for toasts.
let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Defines the shape of the actions for the reducer.
type ActionType = typeof actionTypes
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

// Defines the shape of the global toast state.
interface State {
  toasts: ToasterToast[]
}

// A map to store timeouts for removing dismissed toasts.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast to the removal queue after a delay.
 * @param {string} toastId - The ID of the toast to remove.
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
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

/**
 * The reducer function that manages the toast state.
 * @param {State} state - The current state.
 * @param {Action} action - The action to perform.
 * @returns {State} The new state.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return { ...state, toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)) }
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id))
      }
      return { ...state, toasts: state.toasts.map((t) => (t.id === toastId || toastId === undefined ? { ...t, open: false } : t)) }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

// A list of listener functions to be called when the state changes.
const listeners: Array<(state: State) => void> = []

// The global state object.
let memoryState: State = { toasts: [] }

/**
 * Dispatches an action to the reducer and notifies all listeners.
 * @param {Action} action - The action to dispatch.
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

/**
 * The main function to create a new toast.
 * @param {Toast} props - The properties of the toast to create.
 * @returns {{ id: string, dismiss: () => void, update: (props: ToasterToast) => void }} An object with methods to control the toast.
 */
function toast({ ...props }: Toast) {
  const id = genId()
  const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss() } },
  })

  return { id, dismiss, update }
}

/**
 * The `useToast` hook. Components use this to get the current toast state
 * and the `toast` and `dismiss` functions.
 */
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
  }, [state])

  return { ...state, toast, dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }) }
}

export { useToast, toast }
