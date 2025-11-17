import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Mod {
  id: number;
  name: string;
  description: string;
  version: string;
  downloads: string;
  category: string;
  image: string;
}

const Index = () => {
  const [installingMod, setInstallingMod] = useState<number | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState<{name: string; email: string} | null>(null);

  const mods: Mod[] = [
    {
      id: 1,
      name: 'CyberTech Arsenal',
      description: 'Футуристичное оружие и технологии будущего для Minecraft',
      version: '2.5.0',
      downloads: '1.2M',
      category: 'Оружие',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    },
    {
      id: 2,
      name: 'Neon City Biomes',
      description: 'Неоновые города и киберпанк биомы с подсветкой',
      version: '1.8.3',
      downloads: '850K',
      category: 'Биомы',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    },
    {
      id: 3,
      name: 'Holo Interface',
      description: 'Голографические интерфейсы и HUD в стиле sci-fi',
      version: '3.1.0',
      downloads: '2.3M',
      category: 'Интерфейс',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    },
    {
      id: 4,
      name: 'Neural Implants',
      description: 'Кибернетические улучшения и имплантаты для персонажа',
      version: '1.5.2',
      downloads: '650K',
      category: 'Способности',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    },
    {
      id: 5,
      name: 'Quantum Mobs',
      description: 'Киберпанк мобы с уникальными способностями',
      version: '2.0.1',
      downloads: '920K',
      category: 'Мобы',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    },
    {
      id: 6,
      name: 'Neon Blocks Pack',
      description: 'Светящиеся блоки с неоновой подсветкой для строительства',
      version: '4.2.0',
      downloads: '1.5M',
      category: 'Блоки',
      image: 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg'
    }
  ];

  const handleInstall = (modId: number) => {
    setInstallingMod(modId);
    setTimeout(() => {
      setInstallingMod(null);
    }, 2000);
  };

  const handleRegister = async () => {
    setAuthError('');
    setIsRegistering(true);

    if (!userName.trim() || !userEmail.trim()) {
      setAuthError('Заполните все поля');
      setIsRegistering(false);
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/b0613ca0-7ef5-4581-8ef9-33b2d440ed22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCurrentUser({ name: data.user.name, email: data.user.email });
        localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: data.user.email }));
        setIsAuthDialogOpen(false);
        setUserName('');
        setUserEmail('');
      } else {
        setAuthError(data.error || 'Ошибка регистрации');
      }
    } catch (error) {
      setAuthError('Ошибка подключения к серверу');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="fixed top-4 right-4 z-50 animate-fade-in">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="cyber-border bg-card px-4 py-2 rounded-md">
              <p className="text-sm font-medium">{currentUser.name}</p>
            </div>
            <Button variant="outline" className="cyber-border" onClick={handleLogout}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        ) : (
          <Button className="neon-glow hover-glow cyber-border" onClick={() => setIsAuthDialogOpen(true)}>
            <Icon name="User" size={20} className="mr-2" />
            Аккаунт
          </Button>
        )}
      </div>

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="cyber-border bg-card">
          <DialogHeader>
            <DialogTitle className="neon-text text-2xl">Регистрация</DialogTitle>
            <DialogDescription>
              Создайте аккаунт, чтобы скачивать моды
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Имя
              </label>
              <Input
                id="name"
                placeholder="Введите ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="cyber-border"
                disabled={isRegistering}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="cyber-border"
                disabled={isRegistering}
              />
            </div>
            {authError && (
              <div className="bg-destructive/20 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
                {authError}
              </div>
            )}
            <Button
              className="w-full neon-glow hover-glow"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Регистрация...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Зарегистрироваться
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-8">
          <h1 className="text-6xl font-black mb-4 neon-text animate-fade-in">
            CYBER MODS
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Футуристичные модификации для Minecraft
          </p>
          <div className="flex gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Badge variant="outline" className="cyber-border px-4 py-2 text-sm"></Badge>
            <Badge variant="outline" className="cyber-border px-4 py-2 text-sm"></Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mods.map((mod, index) => (
            <Card 
              key={mod.id} 
              className="cyber-border bg-card hover-glow animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={mod.image} 
                    alt={mod.name}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 right-2 neon-glow">
                    {mod.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{mod.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {mod.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Download" size={16} className="text-primary" />
                    <span>{mod.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Package" size={16} className="text-secondary" />
                    <span>v{mod.version}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  className="flex-1 neon-glow hover:neon-glow"
                  onClick={() => handleInstall(mod.id)}
                  disabled={installingMod === mod.id}
                >
                  {installingMod === mod.id ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Установка...
                    </>
                  ) : (
                    <>
                      <Icon name="Download" size={16} className="mr-2" />
                      Установить
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" className="cyber-border">
                  <Icon name="Info" size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="cyber-border hover-glow">
            <Icon name="Plus" size={20} className="mr-2" />
            Загрузить больше модов
          </Button>
        </div>
      </div>

      <footer className="mt-20 border-t border-primary/30 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={16} />
            Создано с технологиями будущего
            <Icon name="Sparkles" size={16} />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;