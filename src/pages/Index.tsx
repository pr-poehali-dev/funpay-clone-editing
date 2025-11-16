import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const games = [
  { id: 1, name: 'CS:GO', icon: '🎯', color: 'from-orange-500 to-red-500' },
  { id: 2, name: 'Dota 2', icon: '⚔️', color: 'from-red-500 to-purple-500' },
  { id: 3, name: 'Valorant', icon: '🔫', color: 'from-pink-500 to-red-500' },
  { id: 4, name: 'Fortnite', icon: '🏗️', color: 'from-blue-500 to-purple-500' },
  { id: 5, name: 'WoW', icon: '🐉', color: 'from-yellow-500 to-orange-500' },
  { id: 6, name: 'Minecraft', icon: '⛏️', color: 'from-green-500 to-blue-500' },
];

const services = [
  { id: 1, title: 'Буст рейтинга CS:GO', game: 'CS:GO', price: 1500, rating: 4.9, seller: 'ProGamer123' },
  { id: 2, title: 'Калибровка Dota 2', game: 'Dota 2', price: 2500, rating: 5.0, seller: 'TopMid' },
  { id: 3, title: 'Радиант Валорант', game: 'Valorant', price: 3000, rating: 4.8, seller: 'AcePlayer' },
  { id: 4, title: 'Скины CS:GO', game: 'CS:GO', price: 500, rating: 4.7, seller: 'SkinMaster' },
  { id: 5, title: 'Голд WoW', game: 'WoW', price: 800, rating: 4.9, seller: 'GoldFarm' },
  { id: 6, title: 'Сервер Minecraft', game: 'Minecraft', price: 1200, rating: 5.0, seller: 'BuilderPro' },
];

const paymentMethods = [
  { id: 1, name: 'Банковская карта', icon: 'CreditCard', available: true },
  { id: 2, name: 'Яндекс.Деньги', icon: 'Wallet', available: true },
  { id: 3, name: 'QIWI', icon: 'Smartphone', available: true },
  { id: 4, name: 'Криптовалюта', icon: 'Bitcoin', available: true },
  { id: 5, name: 'WebMoney', icon: 'Globe', available: true },
];

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const filteredServices = selectedGame
    ? services.filter(s => s.game === selectedGame)
    : services;

  const addToCart = (service: any) => {
    setCart([...cart, service]);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <header className="border-b border-border backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              GamePay
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-secondary">
                  {cart.length}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Твоя игровая площадка
          </h2>
          <p className="text-muted-foreground text-lg">
            Буст, калибровка, скины и многое другое для любимых игр
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Gamepad2" className="text-primary" />
            Выбери игру
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map(game => (
              <Card
                key={game.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 ${
                  selectedGame === game.name ? 'ring-2 ring-primary shadow-lg shadow-primary/30' : ''
                }`}
                onClick={() => setSelectedGame(selectedGame === game.name ? null : game.name)}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {game.icon}
                </div>
                <p className="text-center font-semibold">{game.name}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Store" className="text-secondary" />
              Товары и услуги
            </h3>
            {selectedGame && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedGame(null)}>
                <Icon name="X" size={16} className="mr-1" />
                Сбросить фильтр
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${games.find(g => g.name === service.game)?.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="mb-2">
                      {service.game}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Icon name="Star" size={16} fill="currentColor" />
                      <span className="text-sm font-semibold">{service.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="User" size={14} />
                    <span>{service.seller}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {service.price} ₽
                    </div>
                    <Button 
                      onClick={() => addToCart(service)}
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {cart.length > 0 && (
          <section className="fixed bottom-8 right-8 z-40">
            <Card className="p-6 w-80 shadow-2xl border-primary/50 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <Icon name="ShoppingBag" className="text-primary" />
                  Корзина
                </h4>
                <Button variant="ghost" size="sm" onClick={() => setCart([])}>
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
              
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{item.title}</span>
                    <span className="font-semibold text-primary">{item.price} ₽</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Товаров:</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">{totalAmount} ₽</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/30 transition-all"
                size="lg"
                onClick={() => setShowPayment(true)}
              >
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оплатить
              </Button>
            </Card>
          </section>
        )}

        {showPayment && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-8 relative animate-scale-in">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => setShowPayment(false)}
              >
                <Icon name="X" size={20} />
              </Button>
              
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Wallet" className="text-primary" />
                Выбери способ оплаты
              </h3>
              
              <Tabs defaultValue="card" className="mb-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="card">Карта</TabsTrigger>
                  <TabsTrigger value="wallet">Кошелек</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4">
                  {paymentMethods.filter(m => m.id === 1).map(method => (
                    <div
                      key={method.id}
                      className="p-4 border-2 border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={method.icon as any} className="text-primary" size={24} />
                        <span className="font-semibold">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="wallet" className="space-y-4">
                  {paymentMethods.filter(m => m.id !== 1).map(method => (
                    <div
                      key={method.id}
                      className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={method.icon as any} className="text-primary" size={24} />
                        <span className="font-semibold">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Сумма к оплате:</span>
                  <span className="text-2xl font-bold text-primary">{totalAmount} ₽</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all"
                size="lg"
              >
                <Icon name="Lock" size={20} className="mr-2" />
                Оплатить {totalAmount} ₽
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Защищенная оплата через безопасное соединение
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
