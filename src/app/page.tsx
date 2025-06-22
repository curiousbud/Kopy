"use client";

import { useState, useMemo, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NoteEditor } from "@/components/note-editor";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import type { Note } from "@/lib/data";
import { notes as initialNotes, notebooks, tags } from "@/lib/data";
import { Search, PlusCircle, Star, Tag as TagIcon, Trash2, BookCopy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    // Load notes from local storage or use initialNotes
    // This is to prevent hydration errors with initial state
    setNotes(initialNotes);
    setSelectedNoteId(initialNotes[0]?.id || null);
  }, []);

  const selectedNote = useMemo(() => notes.find((note) => note.id === selectedNoteId), [notes, selectedNoteId]);

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleCreateNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "# New Note\n\nStart writing your thoughts here...",
      tags: [],
      notebookId: notebooks[0].id,
      starred: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
  };
  
  const KopyLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor" />
    </svg>
  );

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KopyLogo />
              <h1 className="text-xl font-headline font-bold">Kopy</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notes..." className="pl-8 h-9" />
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleCreateNewNote} className="font-semibold text-accent-foreground hover:bg-accent/80 bg-accent">
                <PlusCircle />
                New Note
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Star />
                Starred
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Accordion type="multiple" defaultValue={['notebooks']} className="w-full">
            <AccordionItem value="notebooks" className="border-none">
              <AccordionTrigger className="px-2 py-1 text-sm font-medium hover:no-underline text-muted-foreground [&[data-state=open]>svg]:text-foreground">
                <SidebarGroupLabel className="p-0 h-auto">Notebooks</SidebarGroupLabel>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <SidebarMenu>
                  {notebooks.map((notebook) => (
                    <Accordion type="single" key={notebook.id} collapsible className="w-full">
                        <AccordionItem value={notebook.id} className="border-none">
                           <AccordionTrigger className="hover:no-underline p-0">
                             <SidebarMenuButton asChild className="w-full">
                                <div><BookCopy /><span>{notebook.name}</span></div>
                             </SidebarMenuButton>
                           </AccordionTrigger>
                           <AccordionContent className="pb-0 pl-7">
                               <SidebarMenu>
                                {notes.filter(n => n.notebookId === notebook.id).map(note => (
                                  <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton size="sm" variant="ghost" isActive={note.id === selectedNoteId} onClick={() => handleSelectNote(note.id)} className="w-full justify-start">
                                      {note.title}
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                               </SidebarMenu>
                           </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  ))}
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SidebarGroup className="py-0">
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <div className="flex flex-wrap gap-1.5 px-2 py-1">
              {tags.map(tag => (
                <Badge key={tag.id} variant="secondary" className="cursor-pointer hover:bg-muted-foreground/20">
                  <TagIcon className="mr-1.5 h-3 w-3" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </SidebarGroup>
        </SidebarContent>

        <SidebarMenu className="p-2 mt-auto">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Trash2 />
              Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:block font-medium font-headline text-muted-foreground">
            {selectedNote?.title || 'Kopy'}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 h-[calc(100vh-3.5rem)]">
          {selectedNote ? (
            <NoteEditor key={selectedNote.id} note={selectedNote} onUpdate={handleUpdateNote} />
          ) : (
            <div className="flex h-full items-center justify-center bg-background">
              <div className="text-center p-8">
                <KopyLogo />
                <h2 className="mt-6 text-2xl font-headline font-semibold">Welcome to Kopy</h2>
                <p className="text-muted-foreground mt-2">Select a note from the sidebar or create a new one to get started.</p>
                <Button onClick={handleCreateNewNote} className="mt-6">
                  <PlusCircle className="mr-2" />
                  Create a New Note
                </Button>
              </div>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
