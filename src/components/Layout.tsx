import React from 'react';
import { Home as HomeIcon, Users, Brain, MessageSquare, User } from 'lucide-react';
import { PageId } from '../types';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Layout({ children, activePage, onPageChange }: LayoutProps) {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: '工作台' },
    { id: 'customer', icon: Users, label: '客户' },
    { id: 'chat', icon: MessageSquare, label: 'Agent', isCenter: true },
    { id: 'skills', icon: Brain, label: 'Skills' },
    { id: 'profile', icon: User, label: '我的' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-primary max-w-[390px] mx-auto relative overflow-x-hidden">
      {/* Status Bar Placeholder */}
      <div className="h-11 flex justify-between items-center px-6 text-sm font-medium">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-2.5 border border-white/30 rounded-sm relative after:content-[''] after:absolute after:right-[-3px] after:top-[3px] after:w-[2px] after:h-[4px] after:bg-white/30"></div>
          <span>📶</span>
        </div>
      </div>

      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[70px] bg-bg-dark/95 backdrop-blur-xl flex justify-around items-center pb-2.5 border-t border-white/5 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id !== 'profile' && onPageChange(item.id as PageId)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              item.isCenter ? "relative -top-3.5" : "text-text-muted",
              activePage === item.id && !item.isCenter && "text-primary"
            )}
          >
            <div className={cn(
              "flex items-center justify-center transition-all duration-200",
              item.isCenter 
                ? "w-14 h-14 bg-linear-to-br from-primary to-[#8b5cf6] rounded-[18px] text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)]"
                : "w-7 h-7",
              activePage === item.id && !item.isCenter && "bg-linear-to-br from-primary to-[#8b5cf6] rounded-lg text-white"
            )}>
              <item.icon size={item.isCenter ? 26 : 20} />
            </div>
            {!item.isCenter && <span className="text-[10px]">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
