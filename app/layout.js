export const metadata = {
  title: "Volta — Développement, Automatisation & IA appliquée",
  description:
    "Votre produit digital, de l'idée à la mise en ligne. Vos process répétitifs, automatisés. Du résultat concret — sans recruter une équipe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
