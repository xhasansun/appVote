import "./globals.css";
import StyledJsxRegistry from '../lib/registry'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { ApolloWrapper } from "./ApolloWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <StyledJsxRegistry>
            {children}
          </StyledJsxRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
