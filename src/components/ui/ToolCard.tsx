import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Star } from 'lucide-react'
import type { ToolMeta } from '@toolbox/types/tool'
import { useAppStore } from '@/store/app'
import { getIconComponent } from '@/utils/icons'
import { usePreloadTool } from '@/hooks/usePreloadTool'

interface ToolCardProps {
  tool: ToolMeta
}

export function ToolCard({ tool }: ToolCardProps) {
  const { t } = useTranslation()
  const { isFavorited, toggleFavorite } = useAppStore()
  const favorited = isFavorited(tool.id)
  const IconComp = getIconComponent(tool.icon)
  const { preload } = usePreloadTool(tool.id)

  return (
    <Link
      to="/tool/$id"
      params={{ id: tool.id }}
      className="card p-4 group flex flex-col gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      onMouseEnter={preload}
      onTouchStart={preload}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center group-hover:bg-accent/15 group-hover:shadow-glow-accent-sm transition-all duration-300">
          {IconComp && <IconComp className="w-4 h-4 text-accent" />}
        </div>
        <div className="flex items-center gap-1.5">
          {tool.isNew && <span className="badge text-xs">{t('toolCard.new')}</span>}
          <button
            onClick={e => { e.preventDefault(); toggleFavorite(tool.id) }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1 rounded hover:bg-bg-overlay"
          >
            <Star className={`w-3.5 h-3.5 ${favorited ? 'fill-accent text-accent' : 'text-text-muted'}`} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-150">
          {tool.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>
      
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
    </Link>
  )
}
