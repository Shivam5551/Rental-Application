export function SectionCard({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
            {children}
        </section>
    );
}
