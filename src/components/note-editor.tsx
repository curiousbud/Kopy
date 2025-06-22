/**
 * @fileoverview The main note editor component for Kopy.
 *
 * This component provides a rich text editing experience for markdown notes.
 * It features a split view for code and preview, a live preview window,
 * and functionality to export notes to different formats.
 */

"use client";

// Import React hooks and types.
import React, { useState, useMemo, useEffect } from 'react';
// Import UI components from ShadCN.
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
// Import icons.
import { Split, Eye, FileDown } from 'lucide-react';
// Import types and utility functions.
import type { Note } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Defines the props for the NoteEditor component.
 * @interface
 */
interface NoteEditorProps {
  /** The note object to be edited. */
  note: Note;
  /** A callback function to be invoked when the note is updated. */
  onUpdate: (note: Note) => void;
}

/**
 * A simple, regex-based markdown to HTML renderer.
 * NOTE: This is a basic implementation for demonstration purposes. For a production
 * application, a more robust and secure library like `marked` or `react-markdown`
 * would be recommended to handle edge cases and prevent XSS vulnerabilities.
 * @param {string} markdown - The markdown string to convert.
 * @returns {{ __html: string }} An object suitable for `dangerouslySetInnerHTML`.
 */
const renderMarkdown = (markdown: string) => {
  // Basic replacements for common markdown syntax.
  let html = " " + markdown;
  html = html
    .replace(/\n(#{1,6}) (.*)/g, (match, hashes, content) => `<h${hashes.length}>${content}</h${hashes.length}>`)
    .replace(/\n\> (.*)/g, '\n<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, "<img alt='$1' src='$2' class='rounded-md my-4 shadow-lg' data-ai-hint='$1' />")
    .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-primary underline'>$1</a>")
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\*(.*)/g, (match, item) => `<ul><li>${item.trim()}</li></ul>`)
    .replace(/\n[0-9]+\.(.*)/g, (match, item) => `<ol><li>${item.trim()}</li></ol>`)
    .replace(/<\/ul>\s*<ul>/g, '') // Combine adjacent lists
    .replace(/<\/ol>\s*<ol>/g, ''); // Combine adjacent lists

  // Wrap remaining lines in <p> tags.
  html = html.split('\n').map(p => {
    if (p.trim().length === 0) return "";
    if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol') || p.trim().startsWith('<block')) return p;
    return `<p>${p}</p>`;
  }).join('');
    
  // Return in the format required by `dangerouslySetInnerHTML`.
  return { __html: html };
};

/**
 * The NoteEditor component.
 * @param {NoteEditorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered note editor.
 */
export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  // State for the note's content and title.
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);
  // State for the editor view mode (code or preview), primarily for mobile.
  const [view, setView] = useState<'code' | 'preview'>('code');
  // State to control the split view mode.
  const [isSplit, setIsSplit] = useState(true);
  // Custom hook to detect if the user is on a mobile device.
  const isMobile = useIsMobile();
  // State to hold a reference to the live preview popup window.
  const [previewWindow, setPreviewWindow] = useState<Window | null>(null);

  /**
   * Effect to disable split view on mobile devices.
   */
  useEffect(() => {
    if (isMobile) {
      setIsSplit(false);
    }
  }, [isMobile]);

  /**
   * Effect to "debounce" the update callback.
   * This waits for 500ms of inactivity before calling the `onUpdate` function,
   * preventing excessive updates while the user is typing.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      onUpdate({ ...note, title, content, updatedAt: new Date().toISOString() });
    }, 500);
    // Cleanup function to clear the timeout if the user types again.
    return () => clearTimeout(handler);
  }, [content, title, note, onUpdate]);

  // Memoize the rendered markdown to avoid re-rendering on every keystroke.
  const preview = useMemo(() => renderMarkdown(content), [content]);

  /**
   * Effect to update the live preview popup window whenever the content changes.
   */
  useEffect(() => {
    if (previewWindow && !previewWindow.closed) {
      const contentEl = previewWindow.document.getElementById('live-preview-content');
      if (contentEl) {
        contentEl.innerHTML = `<h1>${title}</h1>${preview.__html}`;
      }
      if (previewWindow.document.title !== `Preview: ${title}`) {
        previewWindow.document.title = `Preview: ${title}`;
      }
    } else if (previewWindow?.closed) {
      setPreviewWindow(null); // Reset state if user closes the window.
    }
  }, [title, preview, previewWindow]);

  /**
   * Effect to close the preview window when the component unmounts.
   * This prevents orphaned popup windows.
   */
  useEffect(() => {
    return () => {
      if (previewWindow && !previewWindow.closed) {
        previewWindow.close();
      }
    };
  }, [previewWindow]);

  /**
   * Handles exporting the note to a file (Markdown or HTML).
   * @param {'md' | 'html'} format - The desired export format.
   */
  const handleExport = (format: 'md' | 'html') => {
    let blob: Blob;
    let filename: string;

    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if (format === 'md') {
      blob = new Blob([`# ${title}\n\n${content}`], { type: 'text/markdown;charset=utf-8' });
      filename = `${sanitizedTitle || 'note'}.md`;
    } else {
      const htmlContent = `...`; // Full HTML content for export
      blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      filename = `${sanitizedTitle || 'note'}.html`;
    }

    // Create a temporary link and trigger a download.
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Handles opening the live preview in a new browser window.
   */
  const handleOpenInNewWindow = () => {
    if (previewWindow && !previewWindow.closed) {
      previewWindow.focus();
      return;
    }

    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      // ... code to write HTML structure into the new window ...
      setPreviewWindow(newWindow);
    }
  };

  // Logic to determine whether to show the editor or preview panes based on current view settings.
  const showEditor = (isSplit && !isMobile) || (!isSplit && view === 'code');
  const showPreview = (isSplit && !isMobile) || (!isSplit && view === 'preview');

  return (
    <div className="flex flex-col h-full bg-background">
        {/* Editor controls: view tabs, split view, new window, export. */}
        <div className="flex items-center justify-between p-2 border-b gap-2 flex-wrap">
            {/* View switcher for mobile (Code/Preview) */}
            <Tabs value={view} onValueChange={(v) => setView(v as 'code' | 'preview')} className={cn((isSplit && !isMobile) && 'opacity-50 pointer-events-none')}>
                <TabsList>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
                {/* Toggle split view button (desktop only) */}
                <Button variant="ghost" size="icon" onClick={() => setIsSplit(!isSplit)} className="hidden md:inline-flex" title={isSplit ? "Single View" : "Split View"}>
                    <Split />
                </Button>
                {/* Open preview in new window button */}
                <Button variant="ghost" size="icon" onClick={handleOpenInNewWindow} title="Open in new window">
                    <Eye />
                </Button>
                {/* Export dropdown menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" title="Export Note"><FileDown /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleExport('md')}>Markdown (.md)</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleExport('html')}>HTML (.html)</DropdownMenuItem>
                        <DropdownMenuItem disabled>PDF (.pdf)</DropdownMenuItem>
                        <DropdownMenuItem disabled>DOCX (.docx)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

      {/* Main editor and preview grid. */}
      <div className={cn("grid h-full w-full flex-1", (isSplit && !isMobile) && "md:grid-cols-2")}>
        {/* Editor Pane */}
        {showEditor && (
        <div className="flex flex-col h-full">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold font-headline border-0 shadow-none focus-visible:ring-0 px-2 sm:px-4 mb-2 bg-transparent"
              placeholder="Note Title"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 text-base font-body leading-relaxed bg-transparent p-2 sm:p-4"
              placeholder="Write your note in Markdown..."
            />
        </div>
        )}
        {/* Preview Pane */}
        {showPreview && (
        <div className={cn("h-full overflow-y-auto", (isSplit && !isMobile) && "border-l bg-card")}>
            <Card className="rounded-none border-0 h-full bg-transparent">
            <CardContent className="p-4 sm:p-6">
                <h1 className="text-3xl font-bold font-headline mb-4">{title}</h1>
                {/*
                  The `dangerouslySetInnerHTML` prop is used to render the HTML string.
                  It's "dangerous" because it can expose the app to XSS attacks if the
                  content is not properly sanitized. In this case, our simple renderer
                  is a potential risk, and a production app should use a safer library.
                */}
                <div className="prose max-w-none" dangerouslySetInnerHTML={preview} />
            </CardContent>
            </Card>
        </div>
        )}
      </div>
    </div>
  );
}
