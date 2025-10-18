import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  step: number;
  onBack?: () => void;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-3">{children}</main>
    </div>
  );
};

export default Layout;
