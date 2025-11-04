import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const privileges = {
  premium: [
    {
      name: 'HERO',
      price: '49₽',
      features: [
        'Уникальный кит - /kit hero',
        'Виртуальный верстак - /craft',
        'Узнать крафт - /recipe',
        'Узнать координаты - /getpos',
        '5 Слотов на аукционе',
        'Количество приватов: 2',
        'Префикс [HERO] в чате и табе'
      ],
      color: 'from-green-600 to-emerald-600'
    },
    {
      name: 'TITAN',
      price: '99₽',
      features: [
        'Уникальный кит - /kit titan',
        'Надеть блок - /hat',
        'Восполнить голод - /feed',
        'РТП на большое расстояние - /rtpfar',
        'Узнать ID предмета - /itemdb',
        '7 Слотов на аукционе',
        'Количество приватов: 4',
        'Префикс [TITAN] в чате и табе'
      ],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'AVENGER',
      price: '149₽',
      features: [
        'Уникальный кит - /kit avenger',
        'Открыть эндер-сундук - /enderchest',
        'Потушить себя от огня - /ext',
        'Игнорировать игрока - /ignore',
        'Очистить инвентарь - /clear',
        '9 Слотов на аукционе',
        'Количество приватов: 8',
        'Домов для /sethome: 6',
        'Префикс [AVENGER] в чате и табе'
      ],
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'OVERLORD',
      price: '249₽',
      features: [
        'Уникальный кит - /kit overlord',
        'Доступ к префиксам - /prefix',
        'Починить предмет - /repair',
        'Найти игрока - /near',
        'Установить личное время - /ptime',
        'x2 Валюты за убийства',
        '14 Слотов на аукционе',
        'Количество приватов: 16',
        'Домов для /sethome: 12',
        'Префикс [OVERLORD] в чате и табе'
      ],
      color: 'from-orange-600 to-red-600'
    },
    {
      name: 'MAGISTER',
      price: '399₽',
      features: [
        'Уникальный кит - /kit magister',
        'Доступ к префиксам - /prefix',
        'Сменить ник в игре - /nick',
        'Доступ к инвентарю - /invsee',
        'Починить предметы - /repair all',
        'Пополнить здоровье - /heal',
        'Отключить телепортации - /tptoggle',
        'x2 валюты за убийства',
        '22 слотов на аукционе',
        'Количество приватов: 48',
        'Домов для /sethome: 32',
        'Префикс [MAGISTER] в чате и табе'
      ],
      color: 'from-violet-600 to-purple-600'
    },
    {
      name: 'IMPERATOR',
      price: '499₽',
      features: [
        'Уникальный кит - /kit imperator',
        'Доступ к префиксам - /prefix',
        'Дополнительный Набор - /kit plus',
        'Возможность писать объявление - /broadcast',
        'Узнать имя игрока - /realname',
        'Ударить молнией - /lightning',
        'РТП рядом с игроками - /rtp',
        'x4 валюты за мобов и убийства',
        'Заход даже на заполненный сервер',
        '36 слотов на аукционе',
        'Количество приватов: 96',
        'Домов для /sethome: 48',
        'Префикс [IMPERATOR] в чате и табе'
      ],
      color: 'from-yellow-600 to-orange-600'
    },
    {
      name: 'DRAGON',
      price: '749₽',
      features: [
        'Уникальный кит - /kit dragon',
        'Доступ к префиксам - /prefix',
        'Дополнительный Мега-Набор - /kit pluspro',
        'Включить режим полета - /fly',
        'Возможность выдавать донат - /grant',
        'Установить ясную погоду - /sun',
        'Установить пасмурную погоду - /rain',
        'Установить ночь в мире - /night',
        'Установить день в мире - /day',
        'x6 валюты за мобов и убийства',
        'Заход даже на заполненный сервер',
        '999 слотов на аукционе',
        'Количество приватов: 999+',
        'Домов для /sethome: 999+',
        'Префикс [DRAGON] в чате и табе'
      ],
      color: 'from-red-600 to-rose-600'
    },
    {
      name: 'COBRA',
      price: '999₽',
      features: [
        'Уникальный кит - /kit cobra',
        'Включить режим полета - /fly',
        'Возможность выдавать донат - /grant',
        'x6 валюты за мобов и убийства',
        '999 слотов на аукционе',
        'Количество приватов: 999+',
        'Префикс [COBRA] в чате и табе'
      ],
      color: 'from-emerald-600 to-teal-600'
    },
    {
      name: 'GOD',
      price: '1249₽',
      features: [
        'Уникальный кит - /kit god',
        'Включить режим полета - /fly',
        'x6 валюты за мобов и убийства',
        '999 слотов на аукционе',
        'Префикс [GOD] в чате и табе'
      ],
      color: 'from-amber-600 to-yellow-600'
    },
    {
      name: 'D.HELPER',
      price: '1499₽',
      features: [
        'Наборы DRAGON PLUS PLUSPRO - /kit',
        'Неприкосновенность со стороны администрации',
        'Добавление в админ-беседу ВК',
        'Прямая связь с администрацией',
        'Вы состоите в команде проекта',
        'Высокий шанс повышения',
        'x6 валюты за мобов и убийства',
        '999 слотов на аукционе',
        'Префикс [D.HELPER] в чате и табе'
      ],
      color: 'from-pink-600 to-fuchsia-600'
    }
  ],
  standard: [
    {
      name: 'SILVER',
      price: '79₽',
      features: [
        'Открыть виртуальный верстак - /craft',
        'Узнать крафт предмета - /recipe',
        'Узнать свои координаты- /getpos',
        '5 дополнительных слотов на аукционе',
        'Приватов в обычном мире: 3',
        'Префикс [SILVER] в табе и чате'
      ],
      color: 'from-slate-500 to-gray-500'
    },
    {
      name: 'EMERALD',
      price: '129₽',
      features: [
        'Надеть блок на голову - /hat',
        'Восполнить голод - /feed',
        'Узнать ID предмета - /itemdb',
        '7 дополнительных слотов на аукционе',
        'Приватов в обычном мире: 5',
        'Префикс [EMERALD] в табе и чате'
      ],
      color: 'from-emerald-500 to-green-500'
    },
    {
      name: 'MASTER',
      price: '179₽',
      features: [
        'Открыть эндер-сундук - /enderchest',
        'Потушить себя от огня - /ext',
        'Игнорировать игрока - /ignore',
        '9 дополнительных слотов на аукционе',
        'Приватов в обычном мире: 6',
        'Префикс [MASTER] в табе и чате'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'LEGEND',
      price: '279₽',
      features: [
        'Доступ к префиксам - /prefix',
        'Починить предмет- /repair',
        'Установить личное время суток - /ptime',
        'x2 валюты за мобов и убийства',
        '14 дополнительных слотов на аукционе',
        'Префикс [LEGEND] в табе и чате'
      ],
      color: 'from-purple-500 to-violet-500'
    },
    {
      name: 'WITHER',
      price: '379₽',
      features: [
        'Доступ к префиксам - /prefix',
        'Доступ к чужому инвентарю - /invsee',
        'Починить все предметы - /repair all',
        'Пополнить здоровье - /heal',
        '22 дополнительных слотов на аукционе',
        'Префикс [WITHER] в табе и чате'
      ],
      color: 'from-gray-600 to-zinc-600'
    },
    {
      name: 'KING',
      price: '479₽',
      features: [
        'Получить набор KING - /kit king',
        'Возможность писать объявление - /broadcast',
        'Сменить ник в игре - /nick',
        'x3 валюты за мобов и убийства',
        '36 дополнительных слотов на аукционе',
        'Префикс [KING] в табе и чате'
      ],
      color: 'from-yellow-500 to-amber-500'
    },
    {
      name: 'ENIGMA',
      price: '599₽',
      features: [
        'Получить набор ENIGMA - /kit enigma',
        'Телепортация без задержки - /call [ник]',
        'Найти игрока - /near',
        'Возможность выдавать донат - /grant',
        'x4 валюты за мобов и убийства',
        '60 дополнительных слотов на аукционе',
        'Префикс [ENIGMA] в табе и чате'
      ],
      color: 'from-indigo-500 to-purple-500'
    }
  ],
  russian: [
    {
      name: 'СТРАЖ',
      price: '89₽',
      features: [
        'Уникальный кит - /kit straz',
        'Надеть блок на голову - /hat',
        'Виртуальный верстак - /workbench',
        'Узнать крафт - /recipe',
        '+ 7 Слотов на аукционе',
        'Количество приватов: 3',
        'Префикс [СТРАЖ] в чате и табе'
      ],
      color: 'from-cyan-600 to-blue-600'
    },
    {
      name: 'РЫЦАРЬ',
      price: '139₽',
      features: [
        'Уникальный кит - /kit ryzar',
        'Восполнить голод - /feed',
        'РТП на дальние расстояния - /rtp',
        'Потушить себя - /ext',
        '+ 9 Слотов на аукционе',
        'Количество приватов: 5',
        'Префикс [РЫЦАРЬ] в чате и табе'
      ],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'ДВОРЯНИН',
      price: '239₽',
      features: [
        'Уникальный кит - /kit dvoryanin',
        'Открыть эндер-сундук - /enderchest',
        'Очистить свой инвентарь - /clear',
        'Игроки вблизи - /near',
        '+ 12 Слотов на аукционе',
        'Количество приватов: 10',
        'Префикс [ДВОРЯНИН] в чате и табе'
      ],
      color: 'from-violet-600 to-purple-600'
    },
    {
      name: 'ПРИНЦ',
      price: '339₽',
      features: [
        'Уникальный кит - /kit prinz',
        'Сменить ник в игре - /nick',
        'Просмотреть чужой инвентарь - /invsee',
        'Починить предмет - /repair',
        '+ x2 Валюты за убийства',
        '+ 15 Слотов на аукционе',
        'Префикс [ПРИНЦ] в чате и табе'
      ],
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'БЕРСЕРК',
      price: '489₽',
      features: [
        'Уникальный кит - /kit berserk',
        'Дополнительный кит - /kit king',
        'Пополнить здоровье - /heal',
        'Отключить телепортации - /tptoggle',
        'Ударить молнией - /lightning',
        '+ x3 Валюты за убийства',
        '+ 20 Слотов на аукционе',
        'Префикс [БЕРСЕРК] в чате и табе'
      ],
      color: 'from-red-600 to-orange-600'
    },
    {
      name: 'ГЕРЦОГ',
      price: '699₽',
      features: [
        'Уникальный кит - /kit gerzorg',
        'Дополнительный кит - /kit monarh',
        'Включить режим полёта - /fly',
        'Выдать донат друзьям - /grant',
        'Установить ясную погоду - /sun',
        '+ x6 Валюты за убийства',
        '+ 999 Слотов на аукционе',
        'Префикс [ГЕРЦОГ] в чате и табе'
      ],
      color: 'from-amber-600 to-yellow-600'
    }
  ]
};

const cases = [
  {
    name: 'Кейс с донатом',
    price: '99₽',
    description: 'Может выпасть любая привилегия соответствующего режима',
    icon: 'Gift'
  },
  {
    name: 'Кейс с монетами',
    price: '49₽',
    description: 'Может выпасть от 1000 до 20000 игровых монет',
    icon: 'Coins'
  },
  {
    name: 'Кейс с префиксами',
    price: '79₽',
    description: 'Может выпасть уникальный префикс: ГЕОГРАФ, АНТРОПОЛОГ, ЛЕОН, ВОРОН и др.',
    icon: 'Star'
  },
  {
    name: 'Кейс с риликами/печенькими',
    price: '39₽',
    description: 'Может выпасть от 10 до 15000 риликов/печенек',
    icon: 'Cookie'
  },
  {
    name: 'Кейс с вещами',
    price: '69₽',
    description: 'Алмазное или железное снаряжение с рандомным зачарованием',
    icon: 'Sword'
  }
];

const services = [
  {
    name: 'Разбан',
    price: '149₽',
    description: 'Снятие запрета на вход на сервер',
    icon: 'UserCheck'
  },
  {
    name: 'Размут',
    price: '79₽',
    description: 'Снятие запрета на использование чата',
    icon: 'MessageCircle'
  },
  {
    name: 'Рилики/Печеньки',
    price: 'от 50₽',
    description: 'Внутриигровая валюта для покупки ресурсов',
    icon: 'Coins'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/534e90b6-a9e5-4b86-8404-717a45219dbe.jpg" 
                alt="Yuki Core" 
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  KolixWorld
                </h1>
                <p className="text-sm text-muted-foreground">Магазин донатов</p>
              </div>
            </div>
            
            <div className="hidden md:flex gap-2">
              {['Главная', 'Привилегии', 'Кейсы', 'Услуги', 'Правила', 'Контакты'].map((item) => (
                <Button
                  key={item}
                  variant={activeSection === item.toLowerCase() ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="transition-all"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <Badge className="mb-4 text-lg px-6 py-2 animate-glow">
                <Icon name="Zap" size={16} className="mr-2" />
                Официальный магазин донатов
              </Badge>
              <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-scale-in">
                KolixWorld Server
              </h2>
              <div className="flex items-center justify-center gap-2 text-2xl text-muted-foreground">
                <Icon name="Server" size={24} />
                <code className="bg-card px-6 py-3 rounded-lg border border-border font-mono">
                  g1.yukicore.org:25331
                </code>
                <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText('g1.yukicore.org:25331')}>
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Приобретайте привилегии, кейсы и услуги для комфортной игры на сервере
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="text-lg" onClick={() => setActiveSection('привилегии')}>
                  <Icon name="Crown" size={20} className="mr-2" />
                  Привилегии
                </Button>
                <Button size="lg" variant="outline" className="text-lg" onClick={() => setActiveSection('кейсы')}>
                  <Icon name="Gift" size={20} className="mr-2" />
                  Кейсы
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Shield" size={32} className="text-primary mb-2" />
                  <CardTitle>23 привилегии</CardTitle>
                  <CardDescription>От базовых до эксклюзивных возможностей</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Gift" size={32} className="text-secondary mb-2" />
                  <CardTitle>5 типов кейсов</CardTitle>
                  <CardDescription>Получите случайные призы и бонусы</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Sparkles" size={32} className="text-accent mb-2" />
                  <CardTitle>Дополнительные услуги</CardTitle>
                  <CardDescription>Разбан, размут и внутриигровая валюта</CardDescription>
                </CardHeader>
              </Card>
            </section>
          </div>
        )}

        {activeSection === 'привилегии' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Привилегии сервера</h2>
              <p className="text-muted-foreground text-lg">Выберите подходящий пакет возможностей</p>
            </div>

            <Tabs defaultValue="premium" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="russian">Русские</TabsTrigger>
              </TabsList>

              <TabsContent value="premium" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privileges.premium.map((priv) => (
                    <Card key={priv.name} className="hover:scale-105 transition-transform group relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${priv.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl">{priv.name}</CardTitle>
                          <Badge className={`bg-gradient-to-r ${priv.color} text-white border-0`}>
                            {priv.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <ul className="space-y-2">
                            {priv.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="standard" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privileges.standard.map((priv) => (
                    <Card key={priv.name} className="hover:scale-105 transition-transform group relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${priv.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl">{priv.name}</CardTitle>
                          <Badge className={`bg-gradient-to-r ${priv.color} text-white border-0`}>
                            {priv.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <ul className="space-y-2">
                            {priv.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="russian" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privileges.russian.map((priv) => (
                    <Card key={priv.name} className="hover:scale-105 transition-transform group relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${priv.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl">{priv.name}</CardTitle>
                          <Badge className={`bg-gradient-to-r ${priv.color} text-white border-0`}>
                            {priv.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <ul className="space-y-2">
                            {priv.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'кейсы' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Кейсы удачи</h2>
              <p className="text-muted-foreground text-lg">Испытайте свою удачу и получите ценные призы</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card key={caseItem.name} className="hover:scale-105 transition-transform bg-gradient-to-br from-card to-muted/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Icon name={caseItem.icon as any} size={48} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{caseItem.name}</CardTitle>
                    <Badge className="mx-auto bg-gradient-to-r from-primary to-secondary text-white border-0">
                      {caseItem.price}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">{caseItem.description}</p>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Gift" size={16} className="mr-2" />
                      Открыть кейс
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'услуги' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Дополнительные услуги</h2>
              <p className="text-muted-foreground text-lg">Решение проблем и покупка игровой валюты</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {services.map((service) => (
                <Card key={service.name} className="hover:scale-105 transition-transform">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Icon name={service.icon as any} size={40} className="text-primary" />
                    </div>
                    <CardTitle>{service.name}</CardTitle>
                    <Badge className="mx-auto bg-gradient-to-r from-primary to-secondary text-white border-0">
                      {service.price}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                    <Button className="w-full">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'правила' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Правила покупки</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Общие положения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Покупка привилегий
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Все привилегии активируются автоматически после успешной оплаты. Срок действия привилегий - навсегда.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Возврат средств
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    Возврат денежных средств не производится после активации привилегии или открытия кейса.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Техподдержка
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    При возникновении проблем с покупкой обращайтесь в раздел "Контакты".
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'контакты' && (
          <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Контакты и поддержка</h2>
              <p className="text-muted-foreground text-lg">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid gap-6">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                    Discord
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Присоединяйтесь к нашему Discord серверу</p>
                  <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Перейти в Discord
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Send" size={24} className="text-primary" />
                    Telegram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Напишите нам в Telegram</p>
                  <Button className="w-full bg-[#0088cc] hover:bg-[#006699]">
                    <Icon name="Send" size={16} className="mr-2" />
                    Написать в Telegram
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Mail" size={24} className="text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Отправьте нам письмо</p>
                  <code className="bg-muted px-4 py-2 rounded block text-center">
                    support@yukicore.org
                  </code>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/534e90b6-a9e5-4b86-8404-717a45219dbe.jpg" 
                alt="Yuki Core" 
                className="h-10 w-10 rounded-lg"
              />
              <div>
                <p className="font-semibold">KolixWorld</p>
                <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="FileText" size={16} className="mr-2" />
                Пользовательское соглашение
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Shield" size={16} className="mr-2" />
                Политика конфиденциальности
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;