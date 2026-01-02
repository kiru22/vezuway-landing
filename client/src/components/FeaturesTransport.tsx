import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ClipboardList, Shield, MapPin, Truck, Star, MessageSquare } from "lucide-react";

const features = [
  {
    id: 0,
    title: "Стрічка замовлень",
    mobileTitle: "Стрічка замовлень",
    description: "Живий потік реальних вантажів у твому телефоні.",
    icon: Smartphone
  },
  {
    id: 1,
    title: "Система обліку",
    mobileTitle: "Система обліку",
    description: "Скільки? Що? Де та Коли? Цифровий облік посилок та доходів.",
    icon: ClipboardList
  },
  {
    id: 2,
    title: "Профіль профі",
    mobileTitle: "Профіль профі",
    description: "Твоє цифрове портфоліо з детальним описом, тарифами та відгуками.",
    icon: Shield
  }
];

// Mockup Screen Components for Transporters
function OrdersListScreen() {
  const orders = [
    { id: 1, from: "Львів", to: "Варшава", weight: "120 кг", price: "€89", status: "Активний", description: "Будматеріали, розрахункові платежі", sender: "ТОВ Логіс" },
    { id: 2, from: "Львів", to: "Будапешт", weight: "85 кг", price: "€156", status: "Активний", description: "Автомобільні запчастини, гарантія", sender: "Петро Іванов" },
    { id: 3, from: "Львів", to: "Прага", weight: "45 кг", price: "€112", status: "Закінчений", description: "Текстиль і одяг, требує охолодження", sender: "Ольга Ковальчук" },
    { id: 4, from: "Львів", to: "Варшава", weight: "95 кг", price: "€104", status: "Активний", description: "Харчові продукти, надходження на дату", sender: "ФОП Сидоренко" },
    { id: 5, from: "Львів", to: "Берлін", weight: "110 кг", price: "€198", status: "Активний", description: "Техніка та електроніка, обережно", sender: "Максим Шевчук" },
    { id: 6, from: "Львів", to: "Мюнхен", weight: "65 кг", price: "€142", status: "Активний", description: "Фармацевтика, температурний контроль", sender: "Анна Леденко" },
    { id: 7, from: "Львів", to: "Амстердам", weight: "130 кг", price: "€167", status: "Активний", description: "Книги та паперова продукція, страхування", sender: "Юрій Коваль" }
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <div className="px-3 pt-3 pb-2 border-b border-slate-100 text-center">
        <h4 className="text-xs font-bold text-slate-900">Стрічка замовлень</h4>
        <p className="text-[10px] text-slate-500 mt-0.5">Львів</p>
      </div>
      <div className="flex-1 overflow-hidden px-2 py-2 space-y-1.5">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg p-2 shadow-sm border bg-white border-slate-100 relative">
            <div className="absolute top-2 right-2 text-[10px] font-semibold text-slate-500">
              #{String(654763 + order.id).padStart(6, '0')}
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] font-semibold text-slate-500">
              {order.sender}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-0.5">
                <h5 className="text-[10px] font-bold text-slate-900">{order.from} → {order.to}</h5>
              </div>
              <p className="text-[10px] text-slate-600 mt-0.5">{order.description}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                  {order.status}
                </div>
                <div className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                  {order.price}
                </div>
              </div>
            </div>
            <div className="mt-1 text-[10px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3 h-3 flex-shrink-0 text-slate-400" />
                <span className="truncate">{order.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-3 bg-emerald-50/50 text-center text-[10px] text-slate-600 border-t border-slate-100">
        Ще 8 замовлень
      </div>
    </div>
  );
}

function PackageTrackingScreen() {
  const [action, setAction] = useState(0);

  const stats = [
    { label: "Виїзд →", income: "€1720", quantity: "72" },
    { label: "← Повернення", income: "€1720", quantity: "88" }
  ];

  const recipients = [
    { id: 1, name: "Марія Коваль", phone: "+38 095 111 22 33", weight: "28 кг", price: "€70", quantity: "3 шт", city: "Київ" },
    { id: 2, name: "Іван Петренко", phone: "+38 097 444 55 66", weight: "25 кг", price: "€63", quantity: "1 шт", city: "Львів" },
    { id: 3, name: "Ольга Смик", phone: "+38 099 777 88 99", weight: "32 кг", price: "€80", quantity: "2 шт", city: "Одеса" },
    { id: 4, name: "Петро Лисак", phone: "+38 093 222 33 44", weight: "35 кг", price: "€88", quantity: "1 шт", city: "Харків" },
    { id: 5, name: "Наталія Коженко", phone: "+38 096 333 44 55", weight: "40 кг", price: "€100", quantity: "2 шт", city: "Вроцлав" },
    { id: 6, name: "Максим Бонда", phone: "+38 098 666 77 88", weight: "45 кг", price: "€113", quantity: "4 шт", city: "Варшава" },
    { id: 7, name: "Ґелена Лисак", phone: "+38 094 999 00 11", weight: "50 кг", price: "€125", quantity: "1 шт", city: "Прага" }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-hidden">
      <div className="px-3 pt-3 pb-2 border-b border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 text-center mb-2">Система обліку</h4>
        <p className="text-[10px] text-slate-500 text-center mb-2">Рейс: "27.11" - "29.11"</p>
        <div className="flex gap-2 w-full">
          {stats.map((stat, idx) => (
            <button
              key={idx}
              onClick={() => setAction(idx)}
              className={`flex-1 h-20 rounded-lg transition-all flex flex-col items-center justify-center ${
                action === idx
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg'
                  : 'bg-white text-slate-900 border-2 border-slate-100 hover:border-emerald-300'
              }`}
              data-testid={idx === 0 ? "button-delivery" : "button-sending"}
            >
              <div className="text-[10px] font-semibold opacity-75">{stat.label}</div>
              <div className="text-base font-bold mt-1">{stat.income}</div>
              <div className="text-[10px] opacity-75">{stat.quantity} шт</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-2 py-2 space-y-1.5">
        {recipients.map((recipient) => (
          <div key={recipient.id} className="rounded-lg p-2 shadow-sm border bg-white border-slate-100 relative">
            <div className="absolute top-2 right-2 text-[10px] font-semibold text-slate-500">
              #{String(654763 + recipient.id).padStart(6, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[10px] font-bold text-slate-900">{recipient.name}</h5>
              <p className="text-[10px] text-slate-600">{recipient.phone}</p>
              <div className="flex flex-wrap gap-1 mt-0.5">
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
                  {recipient.weight}
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                  {recipient.price}
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                  {recipient.quantity}
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">
                  {recipient.city}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-emerald-50/50 text-center text-[10px] text-slate-600 border-t border-slate-100">
        {action === 0 ? "Ще 72 записів" : "Ще 8 записів"}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  
  const routes = [
    {
      name: "Львів - Прага",
      cities: ["Львів", "Люблін", "Варшава", "Познань", "Одер", "Вроцлав", "Прага"]
    },
    {
      name: "Львів - Берлін",
      cities: ["Львів", "Люблін", "Варшава", "Познань", "Франкфурт", "Одер", "Вроцлав", "Дрезден", "Берлін"]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-green-50 via-white to-emerald-50 overflow-hidden">
      <div className="px-3 pt-3 pb-2 border-b border-slate-100 text-center">
        <h4 className="text-xs font-bold text-slate-900">Твій профіль</h4>
      </div>
      <div className="flex-1 overflow-hidden px-3 py-2 space-y-2">
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              АП
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-slate-900">Андрій Петренко</p>
              <p className="text-[10px] text-slate-600">Львів - Прага маршрут</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 border border-slate-100">
          <p className="text-[10px] text-slate-500 font-semibold mb-2">ДОСТУПНІ ПОСЛУГИ</p>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {["Техніка", "Одяг", "Продукти", "Книги", "Меблі", "Адресна доставка", "Зберігання"].map((service) => (
                <span key={service} className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                  {service}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {["Алкоголь", "Сигарки", "Тварини", "Зброя"].map((service) => (
                <span key={service} className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-600 flex items-center gap-1">
                  <span className="text-slate-400 font-bold text-[8px] mr-0.5">✕</span>
                  <span>{service}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 border border-slate-100">
          <p className="text-[10px] text-slate-500 font-semibold mb-2">МАРШРУТИ</p>
          <div className="space-y-1.5">
            <div className="flex gap-1.5 mb-2">
              {routes.map((route, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRoute(idx)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                    selectedRoute === idx
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white'
                      : 'bg-emerald-50 text-slate-900 hover:bg-emerald-100'
                  }`}
                >
                  {route.name}
                </button>
              ))}
            </div>
            <div className="bg-emerald-50 rounded-lg p-1.5">
              <div className="flex flex-wrap gap-1">
                {routes[selectedRoute].cities.map((city, i) => (
                  <div key={i} className="inline-block">
                    <span className="text-[10px] text-slate-600">{city}</span>
                    {i < routes[selectedRoute].cities.length - 1 && <span className="text-[10px] text-slate-400 ml-1">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 font-semibold">ВІДГУКИ</p>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < 5 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-900">4.9 (243)</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Марія К.", rating: 5, text: "Чудовий водій, вчасна доставка!" },
              { name: "Іван П.", rating: 5, text: "Професійно та швидко, рекомендую!" },
              { name: "Ольга С.", rating: 4, text: "Дуже добре, але запізнився на 5 хв" }
            ].map((review, idx) => (
              <div key={idx} className="flex gap-1.5 justify-between items-start bg-slate-50 p-1.5 rounded-lg">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-900">{review.name}</p>
                  <p className="text-[10px] text-slate-600">{review.text}</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-2 h-2 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 py-3 border-t border-slate-100 bg-white/50 flex justify-center">
        <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[10px] font-semibold hover:from-emerald-700 hover:to-teal-800 transition-colors max-w-xs">
          <MessageSquare className="w-4 h-4" />
          <span>Написати</span>
        </button>
      </div>
    </div>
  );
}

export function FeaturesTransport() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSlideDirection('right');
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 8000);
  }, []);

  const handleFeatureClick = useCallback((featureId: number) => {
    setActiveFeature(featureId);
    startAutoRotation();
  }, [startAutoRotation]);

  const handlePrevFeature = () => {
    setSlideDirection('left');
    setActiveFeature((activeFeature - 1 + features.length) % features.length);
    startAutoRotation();
  };

  const handleNextFeature = () => {
    setSlideDirection('right');
    setActiveFeature((activeFeature + 1) % features.length);
    startAutoRotation();
  };

  useEffect(() => {
    startAutoRotation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoRotation]);

  return (
    <section className="py-20 lg:py-32 bg-slate-50/50 relative border-y border-slate-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-emerald-100/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-6 text-center md:text-left">
          <div className="max-w-3xl mx-auto md:mx-0">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 font-bold tracking-wider text-xs uppercase mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[1px] bg-gradient-to-r from-emerald-600 to-teal-700"></span>
              Початкова Версія
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Доступно <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">на старті</span>
            </h2>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Phone Mockup - Shows First on Mobile */}
          <div className="relative flex justify-center items-center order-1 mb-[-20px] lg:mb-0 w-full lg:w-auto">
            {/* Phone Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-transparent rounded-[3rem] blur-2xl" />
              
              {/* Phone Container */}
              <div className="relative w-[300px] aspect-[9/16] rounded-[2rem] shadow-2xl shadow-slate-400/20 overflow-hidden">
                {/* Screen */}
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {activeFeature === 0 && <OrdersListScreen />}
                      {activeFeature === 1 && <PackageTrackingScreen />}
                      {activeFeature === 2 && <ProfileScreen />}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Mobile Navigation Bar - Inside Phone (Mobile Only) */}
                  <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-t border-slate-200 px-4 py-3">
                    <div className="flex justify-around items-center">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => {
                            setActiveFeature(feature.id);
                            startAutoRotation();
                          }}
                          data-testid={`transport-feature-icon-${feature.id}`}
                          className={`
                            flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                            ${activeFeature === feature.id 
                              ? 'bg-emerald-500/10' 
                              : 'hover:bg-slate-100'
                            }
                          `}
                        >
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${activeFeature === feature.id 
                              ? 'bg-gradient-to-br from-emerald-600 to-teal-700 shadow-lg shadow-emerald-500/30' 
                              : 'bg-slate-100'
                            }
                          `}>
                            <feature.icon className={`w-5 h-5 transition-colors duration-300 ${activeFeature === feature.id ? 'text-white' : 'text-slate-500'}`} />
                          </div>
                          {activeFeature === feature.id && (
                            <motion.div 
                              layoutId="mobileActiveIndicatorTransport"
                              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left Side - Feature Info & Blocks */}
          <div className="space-y-4 lg:space-y-6 order-2">
            {/* Mobile View - Show Active Feature Only */}
            <div className="lg:hidden text-center">
              {features[activeFeature] && (() => {
                const Icon = features[activeFeature].icon;
                return (
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Description Slider */}
                    <div className="overflow-hidden">
                      <motion.p
                        key={activeFeature}
                        initial={{ 
                          opacity: 0, 
                          x: slideDirection === 'right' ? 40 : -40 
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: 0 
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: slideDirection === 'right' ? -40 : 40 
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-slate-600 leading-relaxed text-base"
                      >
                        {features[activeFeature].description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Desktop View - Show Feature Blocks */}
            <div className="hidden lg:flex lg:flex-col space-y-6">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  onClick={() => handleFeatureClick(feature.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFeatureClick(feature.id);
                    }
                  }}
                  aria-pressed={activeFeature === feature.id}
                  data-testid={`feature-block-${feature.id}`}
                  className={`
                    relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl cursor-pointer transition-all duration-500 w-full text-left
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
                    ${activeFeature === feature.id 
                      ? 'bg-white shadow-xl border-2 border-emerald-500 scale-[1.02]' 
                      : 'bg-white/60 border border-slate-200 hover:bg-white hover:shadow-lg hover:border-emerald-200'
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {activeFeature === feature.id && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="flex items-start gap-4 lg:gap-6">
                    {/* Icon */}
                    <div className={`
                      w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${activeFeature === feature.id 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 shadow-lg shadow-emerald-500/30' 
                        : 'bg-emerald-50'
                      }
                    `}>
                      <feature.icon className={`w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-300 ${activeFeature === feature.id ? 'text-white' : 'text-emerald-600'}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-colors duration-300 ${activeFeature === feature.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700' : 'text-slate-900'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-base lg:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
