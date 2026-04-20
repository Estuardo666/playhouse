export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream/50 via-white to-warm-cream/50">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-gold/30 border-t-gold rounded-full mx-auto mb-8 animate-spin"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gold/20 rounded-full mx-auto w-48 animate-pulse"></div>
          <div className="h-6 bg-gold/10 rounded-full mx-auto w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
