import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-red/20 to-gold/10">
      <div className="text-center px-4 max-w-md mx-auto">
        <h1 className="text-8xl font-display font-black text-deep-red mb-8 drop-shadow-lg">404</h1>
        <h2 className="text-3xl font-display font-bold text-gold mb-6">Página no encontrada</h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          La página que buscas se ha perdido entre bambalinas. 
          <br />
          <span className="font-medium">¡Vuelve al escenario principal!</span>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-deep-red font-semibold text-lg rounded-full hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
