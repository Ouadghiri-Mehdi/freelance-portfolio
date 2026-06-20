export const metadata = {
  title: "Volta — Développement, Automatisation & IA appliquée",
  description:
    "Votre produit digital, de l'idée à la mise en ligne. Vos process répétitifs, automatisés. Du résultat concret — sans recruter une équipe.",
  openGraph: {
    title: "Volta — Développement, Automatisation & IA appliquée",
    description: "MVP en quelques semaines. Workflows automatisés. IA branchée sur vos données réelles.",
    type: "website",
  },
  keywords: [
    "développeur freelance", "automatisation", "IA appliquée", "Next.js",
    "développeur Mauritanie", "studio digital", "MVP", "n8n", "Make", "RAG",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
