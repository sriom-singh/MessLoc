export function SectionLabel({ children }: React.PropsWithChildren<{}>) {
    return (
        <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-[11px]  text-orange-400 tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {children}
        </span>
    );
}