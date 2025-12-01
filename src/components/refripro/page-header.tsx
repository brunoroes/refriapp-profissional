"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, Snowflake } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBackButton = true,
  rightContent 
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-sm text-slate-300">{subtitle}</p>
            </div>
          </div>
          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    </header>
  );
}

export function AppLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl ${sizes[size]}`}>
      <Snowflake className={`text-white ${iconSizes[size]}`} />
    </div>
  );
}
