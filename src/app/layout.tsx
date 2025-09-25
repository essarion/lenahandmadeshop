import './styles/index.scss';
import { ReduxProvider } from '@/shared/store/provider';
import { ModalSection } from '@/shared/ui/Modal/ModalSection';
import { ToastContainer } from 'react-toastify';
import { fontPrimary } from '@/shared/lib/fonts';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from '@/widgets/navbar/component/Navbar';
import { Footer } from '@/widgets/footer/ui/Footer';

export const metadata = {
  metadataBase: new URL("https://red-bud.ru"),
  title: {
    default: "RedBud Candles — свечи и декор",
    template: "%s | RedBud Candles",
  },
  description: "Свечи и декор ручной работы из натуральных материалов.",
  robots: "index, follow",
  alternates: {
    canonical: "https://red-bud.ru",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={fontPrimary.variable}>
      <body>
        <div id="modal-root" />
        <ReduxProvider>
          <ModalSection>
            <div className="layout">
              <Navbar />
              <div className={'content-wrapper'}>
                {children}
              </div>
              <Footer />
            </div>
            <ToastContainer
            />
          </ModalSection>
        </ReduxProvider>
      </body>
    </html>
  );
}
