import type { LucideIcon } from "lucide-react";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Notebook {
  id: string;
  name: string;
  icon?: LucideIcon;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[]; // tag ids
  notebookId: string;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
}

export const tags: Tag[] = [
  { id: 'tag-1', name: 'work', color: 'text-red-500' },
  { id: 'tag-2', name: 'personal', color: 'text-blue-500' },
  { id: 'tag-3', name: 'ideas', color: 'text-yellow-500' },
  { id: 'tag-4', name: 'research', color: 'text-green-500' },
  { id: 'tag-5', name: 'important', color: 'text-purple-500' },
];

export const notebooks: Notebook[] = [
  { id: 'notebook-1', name: 'Project Phoenix' },
  { id: 'notebook-2', name: 'Meeting Notes' },
  { id: 'notebook-3', name: 'Personal Journal' },
];

export const notes: Note[] = [
  {
    id: 'note-1',
    title: 'Initial Project Proposal',
    content: `# Project Phoenix: Initial Proposal

This document outlines the initial proposal for Project Phoenix.

## Goals

- Goal 1: To rebuild the core infrastructure.
- Goal 2: To improve user experience.
- Goal 3: To increase performance by 50%.

## Roadmap

*   Q1: Research and planning
*   Q2: Development phase 1
*   Q3: Development phase 2
*   Q4: Launch

> This is a high-priority project with a tight deadline.
`,
    tags: ['tag-1', 'tag-3', 'tag-5'],
    notebookId: 'notebook-1',
    starred: true,
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T12:30:00Z',
  },
  {
    id: 'note-2',
    title: 'Weekly Sync - Oct 23',
    content: `# Weekly Sync - Oct 23

## Agenda

1.  Review of last week's tasks.
2.  Planning for the upcoming week.
3.  Open discussion.

## Action Items

-   **John**: Follow up on API documentation.
-   **Jane**: Prepare the demo for the new feature.`,
    tags: ['tag-1'],
    notebookId: 'notebook-2',
    starred: false,
    createdAt: '2023-10-23T14:00:00Z',
    updatedAt: '2023-10-23T15:00:00Z',
  },
  {
    id: 'note-3',
    title: 'My trip to the mountains',
    content: `# A Weekend in the Mountains

The air was crisp and clean. A welcome escape from the city hustle.

![A scenic view of snow-capped mountains under a clear blue sky](https://placehold.co/600x400.png)
*A photo I took from the cabin.*

I feel refreshed and ready for the next challenge.
    `,
    tags: ['tag-2'],
    notebookId: 'notebook-3',
    starred: true,
    createdAt: '2023-10-20T18:00:00Z',
    updatedAt: '2023-10-22T09:00:00Z',
  },
  {
    id: 'note-4',
    title: 'Q4 Brainstorming',
    content: `# Q4 Brainstorming Session

Ideas for the next quarter.

- New marketing campaigns.
- Feature enhancements for the main product.
  - Sub-item 1
  - Sub-item 2
- Team-building activities.
`,
    tags: ['tag-1', 'tag-3'],
    notebookId: 'notebook-1',
    starred: false,
    createdAt: '2023-10-15T11:00:00Z',
    updatedAt: '2023-10-15T11:30:00Z',
  }
];
