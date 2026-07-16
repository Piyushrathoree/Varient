'use client';

import { useState, type ReactNode } from 'react';
import { Checkbox, SortableList } from '@varient/ui';
import { Music2 } from 'lucide-react';

interface Task {
  id: string;
  label: string;
  team: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 'task-1', label: 'Draft the release notes', team: 'Design' },
  { id: 'task-2', label: 'Tune the Carousel drag-snap spring', team: 'Engineering' },
  { id: 'task-3', label: 'Record a demo clip for socials', team: 'Marketing' },
  { id: 'task-4', label: 'Ship the dark-theme audit', team: 'Engineering' },
];

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const INITIAL_TRACKS: Track[] = [
  { id: 'track-1', title: 'Night Drive', artist: 'Cassette Youth', duration: '3:12' },
  { id: 'track-2', title: 'Low Orbit', artist: 'Field Signal', duration: '4:05' },
  { id: 'track-3', title: 'Quiet Static', artist: 'Halide', duration: '2:48' },
  { id: 'track-4', title: 'Amber Room', artist: 'Cassette Youth', duration: '3:41' },
];

interface Page {
  id: string;
  label: string;
}

const INITIAL_PAGES: Page[] = [
  { id: 'page-1', label: 'Home' },
  { id: 'page-2', label: 'Pricing' },
  { id: 'page-3', label: 'Docs' },
  { id: 'page-4', label: 'Changelog' },
  { id: 'page-5', label: 'Contact' },
];

const PREVIEW_ITEMS: Page[] = [
  { id: 'preview-1', label: 'Overview' },
  { id: 'preview-2', label: 'Getting started' },
  { id: 'preview-3', label: 'Components' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <div className="w-full max-w-sm">{children}</div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function SortableListDemo() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);

  function toggleTask(id: string, checked: boolean) {
    setDoneIds((prev) => (checked ? [...prev, id] : prev.filter((taskId) => taskId !== id)));
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      <DemoCard label="Whole-row drag, with checkboxes">
        <SortableList
          items={tasks}
          onReorder={setTasks}
          aria-label="Task list"
          renderItem={(task) => {
            const isDone = doneIds.includes(task.id);
            return (
              <div className="flex items-center gap-3">
                <Checkbox
                  isChecked={isDone}
                  onChange={(checked) => toggleTask(task.id, checked)}
                  label={task.label}
                />
                <div className="min-w-0">
                  <p
                    className={
                      isDone
                        ? 'truncate text-sm text-muted-foreground line-through'
                        : 'truncate text-sm font-medium text-foreground'
                    }
                  >
                    {task.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{task.team}</p>
                </div>
              </div>
            );
          }}
        />
      </DemoCard>

      <DemoCard label="Handle variant (grip drags, row doesn't)">
        <SortableList
          items={tracks}
          onReorder={setTracks}
          showHandle
          aria-label="Playlist"
          renderItem={(track) => (
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Music2 className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{track.title}</p>
                <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {track.duration}
              </span>
            </div>
          )}
        />
      </DemoCard>

      <DemoCard label="Compact density">
        <SortableList
          items={pages}
          onReorder={setPages}
          aria-label="Navigation pages"
          itemClassName="px-3 py-2"
          renderItem={(page) => <p className="text-sm text-foreground">{page.label}</p>}
        />
      </DemoCard>
    </div>
  );
}

export function SortableListPreviewCompact() {
  const [items, setItems] = useState<Page[]>(PREVIEW_ITEMS);

  return (
    <div className="flex w-full items-center justify-center p-2">
      <div className="w-full max-w-55">
        <SortableList
          items={items}
          onReorder={setItems}
          aria-label="Preview list"
          itemClassName="px-3 py-2"
          renderItem={(item) => <p className="text-sm text-foreground">{item.label}</p>}
        />
      </div>
    </div>
  );
}
