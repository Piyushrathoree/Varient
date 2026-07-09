'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../../foundation/card';
import { Badge } from '../../foundation/badge';
import { Avatar } from '../../foundation/avatar';
import { cn } from '../../../lib/utils';

export interface BlogPostAuthor {
  name: string;
  avatarSrc?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  date: string;
  readingTime?: string;
  author?: BlogPostAuthor;
}

export interface BlogGridProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export const defaultBlogPosts: BlogPost[] = [
  {
    title: 'Why copy-paste beats npm installs for UI kits',
    excerpt:
      'Owning the source means you ship fixes the same day, not after a maintainer merges your PR.',
    href: '#',
    category: 'Product',
    date: 'Jun 12, 2026',
    readingTime: '5 min read',
    author: { name: 'Maya Chen', avatarSrc: 'https://i.pravatar.cc/150?img=1' },
  },
  {
    title: 'Design tokens that work in light and dark',
    excerpt:
      'Semantic slots like background and muted-foreground flip automatically — no per-component overrides.',
    href: '#',
    category: 'Design',
    date: 'Jun 8, 2026',
    readingTime: '4 min read',
    author: { name: 'Elena Vasquez', avatarSrc: 'https://i.pravatar.cc/150?img=5' },
  },
  {
    title: 'Building accessible motion with prefers-reduced-motion',
    excerpt:
      'Every animated component should have a static fallback. Here is the pattern we use across Varient.',
    href: '#',
    category: 'Accessibility',
    date: 'May 29, 2026',
    readingTime: '6 min read',
    author: { name: 'James Okonkwo', avatarSrc: 'https://i.pravatar.cc/150?img=3' },
  },
  {
    title: 'Composing landing pages from section blocks',
    excerpt:
      'Hero, features, pricing, and FAQ sections stack together without duplicating foundation logic.',
    href: '#',
    category: 'Guides',
    date: 'May 21, 2026',
    readingTime: '7 min read',
    author: { name: 'Priya Nair', avatarSrc: 'https://i.pravatar.cc/150?img=9' },
  },
  {
    title: 'Radix primitives under the hood',
    excerpt:
      'Focus traps, keyboard nav, and ARIA roles ship with foundation components so you do not rebuild them.',
    href: '#',
    category: 'Engineering',
    date: 'May 14, 2026',
    readingTime: '5 min read',
    author: { name: 'Tom Bradley', avatarSrc: 'https://i.pravatar.cc/150?img=8' },
  },
];

function BlogPostCard({
  post,
  index,
  shouldReduceMotion,
}: {
  post: BlogPost;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: index * 0.06,
        },
        viewport: { once: true, amount: 0.2 } as const,
      };

  return (
    <motion.div className="h-full" {...motionProps}>
      <a
        href={post.href}
        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card isHoverable className="h-full overflow-hidden">
          <div
            aria-hidden
            className="h-32 bg-muted/60 sm:h-40"
          />
          <Card.Body className="flex flex-col gap-3 pt-4">
            {post.category && (
              <Badge variant="primary" size="sm">
                {post.category}
              </Badge>
            )}
            <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-brand">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          </Card.Body>
          <Card.Footer className="mt-auto flex-wrap gap-x-3 gap-y-1">
            {post.author && (
              <div className="flex min-w-0 items-center gap-2">
                <Avatar
                  size="sm"
                  src={post.author.avatarSrc}
                  alt={post.author.name}
                  fallback={post.author.name}
                />
                <span className="truncate text-xs text-muted-foreground">{post.author.name}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground">{post.date}</span>
            {post.readingTime && (
              <span className="text-xs text-muted-foreground">{post.readingTime}</span>
            )}
          </Card.Footer>
        </Card>
      </a>
    </motion.div>
  );
}

export const BlogGrid = forwardRef<HTMLElement, BlogGridProps>(
  (
    {
      className,
      eyebrow = 'Blog',
      title = 'Latest from the team',
      description = 'Guides and notes on copy-paste components, tokens, motion, and shipping faster.',
      posts = defaultBlogPosts,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const headerMotion = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
          viewport: { once: true, amount: 0.4 } as const,
        };

    return (
      <section
        ref={ref}
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        aria-labelledby="blog-grid-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="blog-grid-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard
              key={`${post.title}-${index}`}
              post={post}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </section>
    );
  },
);

BlogGrid.displayName = 'BlogGrid';
