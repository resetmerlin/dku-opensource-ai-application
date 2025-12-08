const Loader = () => {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
          <p className="text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
