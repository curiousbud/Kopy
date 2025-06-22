
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import type { Note } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Split, Eye, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NoteEditorProps {
  note: Note;
  onUpdate: (note: Note) => void;
}

// Simple markdown to HTML renderer
const renderMarkdown = (markdown: string) => {
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
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/ol>\s*<ol>/g, '');

  html = html.split('\n').map(p => {
    if (p.trim().length === 0) return "";
    if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol') || p.trim().startsWith('<block')) return p;
    return `<p>${p}</p>`;
  }).join('');
    
  return { __html: html };
};

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);
  const [view, setView] = useState<'code' | 'preview'>('code');
  const [isSplit, setIsSplit] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsSplit(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onUpdate({ ...note, title, content, updatedAt: new Date().toISOString() });
    }, 500); // Debounce update
    return () => clearTimeout(handler);
  }, [content, title, note, onUpdate]);

  const preview = useMemo(() => renderMarkdown(content), [content]);

  const handleExport = (format: 'md' | 'html') => {
    let blob: Blob;
    let filename: string;

    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if (format === 'md') {
      blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      filename = `${sanitizedTitle || 'note'}.md`;
    } else {
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'JetBrains Mono', monospace; padding: 2rem; max-width: 800px; margin: 0 auto; }
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { font-family: 'Fira Code', monospace; }
    .prose p, .prose li, .prose blockquote, .prose a { font-family: 'JetBrains Mono', monospace; }
    .prose h1 { font-size: 2.25rem; font-weight: 700; margin: 1rem 0; }
    .prose img { max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 1.5rem 0; }
    .prose a { color: #2E7D32; }
  </style>
</head>
<body>
  <article class="prose">
    ${preview.__html}
  </article>
</body>
</html>`;
      blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      filename = `${sanitizedTitle || 'note'}.html`;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Preview: ${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'JetBrains Mono', monospace; padding: 2rem; }
    .prose { max-width: 800px; margin: 0 auto; }
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { font-family: 'Fira Code', monospace; }
    .prose p, .prose li, .prose blockquote, .prose a { font-family: 'JetBrains Mono', monospace; }
    .prose h1 { font-size: 2.25rem; font-weight: 700; margin: 1rem 0; }
    .prose h2 { font-size: 1.875rem; font-weight: 700; margin: 0.75rem 0; }
    .prose h3 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; }
    .prose p { margin: 1rem 0; line-height: 1.6; }
    .prose strong { font-weight: 700; }
    .prose em { font-style: italic; }
    .prose a { color: #2E7D32; text-decoration: underline; }
    .prose ul { list-style-type: disc; margin: 1rem 0; padding-left: 2rem; }
    .prose ol { list-style-type: decimal; margin: 1rem 0; padding-left: 2rem; }
    .prose li { margin: 0.25rem 0; }
    .prose img { border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 1.5rem 0; max-width: 100%; }
    .prose blockquote { border-left: 4px solid #ccc; padding-left: 1rem; font-style: italic; color: #666; }
    .prose code { background: #eee; padding: 0.1rem 0.3rem; border-radius: 0.2rem; }
    .prose pre { background: #eee; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
    .prose pre code { background: transparent; padding: 0; }
  </style>
</head>
<body>
  <main class="prose">
    <h1>${title}</h1>
    ${preview.__html}
  </main>
</body>
</html>`;
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  const showEditor = (isSplit && !isMobile) || (!isSplit && view === 'code');
  const showPreview = (isSplit && !isMobile) || (!isSplit && view === 'preview');

  return (
    <div className="flex flex-col h-full bg-background">
        <div className="flex items-center justify-between p-2 border-b gap-2 flex-wrap">
            <Tabs value={view} onValueChange={(v) => setView(v as 'code' | 'preview')} className={cn((isSplit && !isMobile) && 'opacity-50 pointer-events-none')}>
                <TabsList>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsSplit(!isSplit)} className="hidden md:inline-flex" title={isSplit ? "Single View" : "Split View"}>
                    <Split />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleOpenInNewWindow} title="Open in new window">
                    <Eye />
                </Button>
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

      <div className={cn("grid h-full w-full flex-1", (isSplit && !isMobile) && "md:grid-cols-2")}>
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
        {showPreview && (
        <div className={cn("h-full overflow-y-auto", (isSplit && !isMobile) && "border-l bg-card")}>
            <Card className="rounded-none border-0 h-full bg-transparent">
            <CardContent className="p-4 sm:p-6">
                <h1 className="text-3xl font-bold font-headline mb-4">{title}</h1>
                <div className="prose max-w-none" dangerouslySetInnerHTML={preview} />
            </CardContent>
            </Card>
        </div>
        )}
      </div>
    </div>
  );
}
