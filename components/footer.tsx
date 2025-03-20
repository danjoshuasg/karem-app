"use client"

export function Footer() {
  return (
    <footer className="py-6 border-t border-border/30">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} La Vitrine. Todos los derechos reservados.
      </div>
    </footer>
  )
}

