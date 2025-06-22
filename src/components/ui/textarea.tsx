/**
 * @fileoverview A styled, multi-line text input component.
 *
 * This component provides a consistent style for `<textarea>` elements across
 * the application, including focus and disabled states.
 *
 * @see https://ui.shadcn.com/docs/components/textarea
 */

import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * The Textarea component. It's a `forwardRef` component to allow passing
 * a ref to the underlying `<textarea>` element.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
