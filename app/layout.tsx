export const metadata = {
  title: 'Asian American Cinematographers · A-Cam',
  description: 'A living directory of Asian American cinematographers, from James Wong Howe to Autumn Durald Arkapaw.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f4f1ea' }}>{children}</body>
    </html>
  );
}
