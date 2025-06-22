/**
 * @fileoverview A custom React hook to detect if the application is being viewed on a mobile device.
 *
 * This hook uses the `window.matchMedia` API to check if the screen width is
 * below a defined mobile breakpoint. It's useful for conditionally rendering
 * different components or applying different styles for mobile and desktop views.
 */

import * as React from "react"

// The viewport width in pixels below which the application is considered "mobile".
const MOBILE_BREAKPOINT = 768

/**
 * A custom hook that returns `true` if the screen width is less than the mobile breakpoint.
 * @returns {boolean} `true` if the device is mobile, otherwise `false`.
 */
export function useIsMobile() {
  // State to store the mobile status. `undefined` is used as the initial state
  // to prevent hydration mismatches on the server, where `window` is not available.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // The `matchMedia` API creates a media query list object.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // A callback function that updates the state when the media query status changes.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add the event listener to respond to changes (e.g., resizing the browser window).
    mql.addEventListener("change", onChange)

    // Set the initial state after the component has mounted on the client.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup function to remove the event listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange)
  }, []) // The empty dependency array ensures this effect runs only once on mount.

  // Return `true` if isMobile is true, otherwise `false`.
  // The `!!` converts the `undefined` initial state to `false` on the server.
  return !!isMobile
}
