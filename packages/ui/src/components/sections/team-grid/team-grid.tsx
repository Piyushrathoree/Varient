'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Avatar } from '../../foundation/avatar';
import { cn } from '../../../lib/utils';

export interface TeamMemberSocials {
  github?: string;
  x?: string;
  linkedin?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarSrc?: string;
  socials?: TeamMemberSocials;
}

export interface TeamGridProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  members?: TeamMember[];
}

function IconGithub({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

export const defaultTeamMembers: TeamMember[] = [
  {
    name: 'Piyush Sharma',
    role: 'Founder & design',
    avatarSrc: 'https://i.pravatar.cc/150?img=12',
    socials: { github: 'https://github.com', x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Maya Chen',
    role: 'Engineering lead',
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'James Okonkwo',
    role: 'Frontend',
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
    socials: { github: 'https://github.com', x: 'https://x.com' },
  },
  {
    name: 'Elena Vasquez',
    role: 'Design systems',
    avatarSrc: 'https://i.pravatar.cc/150?img=5',
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Tom Bradley',
    role: 'Product',
    avatarSrc: 'https://i.pravatar.cc/150?img=8',
    socials: { x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Priya Nair',
    role: 'Developer relations',
    avatarSrc: 'https://i.pravatar.cc/150?img=9',
    socials: { github: 'https://github.com', x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
];

function SocialLinks({ socials }: { socials?: TeamMemberSocials }) {
  if (!socials) return null;

  const links: { href: string; label: string; icon: typeof IconGithub }[] = [];
  if (socials.github) links.push({ href: socials.github, label: 'GitHub', icon: IconGithub });
  if (socials.x) links.push({ href: socials.x, label: 'X', icon: IconX });
  if (socials.linkedin) links.push({ href: socials.linkedin, label: 'LinkedIn', icon: IconLinkedin });

  if (links.length === 0) return null;

  return (
    <div className="mt-3 flex items-center gap-3">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} profile`}
          className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

function MemberCard({
  member,
  index,
  shouldReduceMotion,
}: {
  member: TeamMember;
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
    <motion.article className="flex h-full flex-col items-center text-center" {...motionProps}>
      <Avatar
        size="xl"
        src={member.avatarSrc}
        alt={member.name}
        fallback={member.name}
      />
      <h3 className="mt-4 text-sm font-semibold text-foreground">{member.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
      <SocialLinks socials={member.socials} />
    </motion.article>
  );
}

export const TeamGrid = forwardRef<HTMLElement, TeamGridProps>(
  (
    {
      className,
      eyebrow = 'Team',
      title = 'The people behind Varient',
      description = 'A small team building copy-paste components so you can ship polished UI without the scaffolding tax.',
      members = defaultTeamMembers,
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
        aria-labelledby="team-grid-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="team-grid-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-10 grid grid-cols-2 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <MemberCard
              key={`${member.name}-${index}`}
              member={member}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </section>
    );
  },
);

TeamGrid.displayName = 'TeamGrid';
