"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import type { Note } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from './ui/input';

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

  useEffect(() => {
    const handler = setTimeout(() => {
      onUpdate({ ...note, title, content, updatedAt: new Date().toISOString() });
    }, 500); // Debounce update
    return () => clearTimeout(handler);
  }, [content, title, note, onUpdate]);

  const preview = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2 bg-background">
      <div className="flex flex-col h-full p-2 sm:p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold font-headline border-0 shadow-none focus-visible:ring-0 px-2 mb-2 bg-transparent"
          placeholder="Note Title"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 text-base font-body leading-relaxed bg-transparent p-2"
          placeholder="Write your note in Markdown..."
        />
      </div>
      <div className="h-full border-l bg-card overflow-y-auto hidden md:block">
        <Card className="rounded-none border-0 h-full bg-transparent">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-3xl font-bold font-headline mb-4">{title}</h1>
            <div className="prose max-w-none" dangerouslySetInnerHTML={preview} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
