import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Trophy, Star, Flame, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';

const Navigation = () => {
  const location = useLocation();
  const stats = useAppSelector(state => state.progress.stats);
  const favorites = useAppSelector(state => 
    Object.values(state.progress.wordProgress).filter(w => w.isFavorite).length
  );

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/progress', icon: Trophy, label: 'Прогресс' },
    { path: '/favorites', icon: Star, label: 'Избранное', badge: favorites > 0 ? favorites : undefined },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto">
      <div className="glass-card border-t md:border-t-0 md:border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - только на desktop */}
            <Link to="/" className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-kpop-gradient flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">K-Pop Korean</h1>
                <p className="text-xs text-muted-foreground">TOPIK 1 Master</p>
              </div>
            </Link>

            {/* Streak indicator - с иконкой Flame */}
            {stats.currentStreak > 0 && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20">
                <Flame className="w-4 h-4 text-warning" />
                <span className="font-bold text-warning">{stats.currentStreak}</span>
                <span className="text-xs text-muted-foreground">дней</span>
              </div>
            )}

            {/* Navigation items */}
            <div className="flex items-center justify-around w-full md:w-auto md:gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-xl transition-colors',
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs md:text-sm font-medium">{item.label}</span>
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary md:hidden"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;