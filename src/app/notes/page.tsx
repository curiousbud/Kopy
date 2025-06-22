/**
 * @fileoverview The main page for note-taking.
 *
 * This component renders the primary user interface for Kopy, including the
 * sidebar for navigation and the main content area for the note editor.
 * It manages the state for notes, notebooks, and the currently selected note.
 */

"use client";

// Import React hooks for state and memoization.
import { useState, useMemo, useEffect } from "react";
// Import UI components from ShadCN.
import {
  SidebarProvider,
  Sidebar,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// Import data types and mock data.
import type { Note } from "@/lib/data";
import { notes as initialNotes, notebooks, tags } from "@/lib/data";
// Import icons from lucide-react.
import { Search, PlusCircle, Star, Tag as TagIcon, Trash2, BookCopy } from "lucide-react";

/**
 * The NotesPage component is the main view for interacting with notes.
 * @returns {JSX.Element} The rendered notes page.
 */
export default function NotesPage() {
  // State for the list of notes. It's initialized as an empty array
  // and then populated from mock data in a useEffect hook.
  const [notes, setNotes] = useState<Note[]>([]);
  // State for the ID of the currently selected note.
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  /**
   * useEffect hook to initialize the notes state.
   * This runs once after the component mounts. Using useEffect to set the initial
   * state from mock data helps prevent hydration mismatches between the server and client,
   * which can occur if the initial UI depends on data that's only available client-side.
   */
  useEffect(() => {
    // In a real application, you would fetch this data from an API or a database.
    setNotes(initialNotes);
    // Select the first note by default, if one exists.
    setSelectedNoteId(initialNotes[0]?.id || null);
  }, []);

  /**
   * useMemo hook to efficiently find the selected note object.
   * This recalculates the `selectedNote` only when the `notes` array or
   * `selectedNoteId` changes, avoiding unnecessary re-renders.
   */
  const selectedNote = useMemo(() => notes.find((note) => note.id === selectedNoteId), [notes, selectedNoteId]);

  /**
   * Handles the selection of a note from the sidebar.
   * @param {string} noteId - The ID of the note to select.
   */
  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  /**
   * Handles updating a note's content.
   * This function is passed down to the NoteEditor component.
   * @param {Note} updatedNote - The note object with the updated content.
   */
  const handleUpdateNote = (updatedNote: Note) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  /**
   * Handles the creation of a new, blank note.
   */
  const handleCreateNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "# New Note\n\nStart writing your thoughts here...",
      tags: [],
      notebookId: notebooks[0].id, // Assign to the first notebook by default
      starred: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Add the new note to the top of the list and select it.
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
  };
  
  /**
   * A simple component to render the Kopy logo as an SVG.
   * @returns {JSX.Element} The Kopy logo SVG.
   */
  const KopyLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor" />
    </svg>
  );

  return (
    // SidebarProvider manages the state for the collapsible sidebar.
    <SidebarProvider>
      {/* The main sidebar container. */}
      <Sidebar>
        <SidebarContent className="p-0 pt-2">
          {/* Search input for filtering notes. */}
          <div className="p-2 pt-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notes..." className="pl-8 h-9" />
            </div>
          </div>
          {/* Main menu section in the sidebar. */}
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

          {/* Accordion for organizing notebooks and their notes. */}
          <Accordion type="multiple" defaultValue={['notebooks']} className="w-full">
            <AccordionItem value="notebooks" className="border-none">
              <AccordionTrigger className="px-2 py-1 text-sm font-medium hover:no-underline text-muted-foreground [&[data-state=open]>svg]:text-foreground">
                <SidebarGroupLabel className="p-0 h-auto">Notebooks</SidebarGroupLabel>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <SidebarMenu>
                  {/* Iterate over notebooks to create an accordion for each. */}
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
                                {/* List all notes belonging to this notebook. */}
                                {notes.filter(n => n.notebookId === notebook.id).map(note => (
                                  <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton 
                                      size="sm" 
                                      variant="ghost" 
                                      isActive={note.id === selectedNoteId} 
                                      onClick={() => handleSelectNote(note.id)} 
                                      className="w-full justify-start"
                                    >
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

          {/* Section for displaying all available tags. */}
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

        {/* Footer menu in the sidebar. */}
        <SidebarMenu className="p-2 mt-auto">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Trash2 />
              Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </Sidebar>
      {/* The main content area, which is inset from the sidebar. */}
      <SidebarInset>
        {/* Header for the main content area. */}
        <header className="flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4">
          {/* Hamburger menu trigger for mobile view. */}
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:block font-medium font-headline text-muted-foreground">
            {selectedNote?.title || 'Kopy'}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Header actions like theme toggle and user nav are now in the global MainHeader. */}
          </div>
        </header>
        {/* Container for the note editor or the welcome screen. */}
        <div className="flex-1 h-[calc(100vh-7rem)] overflow-y-auto">
          {selectedNote ? (
            // If a note is selected, render the editor.
            // The `key` prop is crucial here: it forces React to re-mount the
            // NoteEditor component when the selected note changes, ensuring
            // its internal state is reset correctly.
            <NoteEditor key={selectedNote.id} note={selectedNote} onUpdate={handleUpdateNote} />
          ) : (
            // If no note is selected, show a welcome screen.
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
