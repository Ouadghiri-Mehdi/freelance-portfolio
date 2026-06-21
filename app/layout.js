export const metadata = {
  title: "Praxis — Execution Intelligence",
  description:
    "Praxis construit des systèmes intelligents capables d'exécuter en quelques minutes ce qui demande aujourd'hui des heures ou des jours de travail aux équipes.",
  openGraph: {
    title: "Praxis — Execution Intelligence",
    description: "Des systèmes qui absorbent ce qui consomme le temps de vos équipes. Intelligence opérationnelle pour les organisations.",
    type: "website",
  },
  keywords: [
    "execution intelligence", "systèmes d'exécution intelligents", "automatisation opérationnelle",
    "intelligence artificielle", "Mauritanie", "industrie", "logistique", "énergie",
    "orchestration des processus", "systèmes IA", "productivité organisation",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
