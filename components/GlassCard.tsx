import { cn } from "@/lib/utils"

export function GlassCard({ className, children, ...props }: any) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-gold/20 rounded-xl shadow-xl overflow-hidden hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
