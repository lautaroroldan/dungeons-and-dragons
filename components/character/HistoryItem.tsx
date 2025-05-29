interface HistoryItemProps {
    title: string
    content?: string | null
    className?: string
}

export function HistoryItem({ title, content, className = "" }: HistoryItemProps) {
    if (!content) return null

    return (
        <div className={`space-y-2 ${className}`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="text-sm leading-relaxed text-muted-foreground">
                {content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2 last:mb-0">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    )
} 