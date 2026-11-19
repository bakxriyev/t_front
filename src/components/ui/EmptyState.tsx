import { Inbox } from "lucide-react";

export function EmptyState({ text }: { text: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 px-6 py-14 text-center text-ink-muted">
      <Inbox className="mb-3 h-8 w-8 opacity-60" strokeWidth={1.5} />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
