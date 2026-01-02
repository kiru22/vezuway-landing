import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Bell, MessageCircle, MapPin, Truck, Star, Package, Smartphone, Plus, CheckCircle, Clock, Upload, MessageCircle as MessageIcon, ArrowLeft } from "lucide-react";

const drivers = [
  {
    id: 1,
    name: "Ігор П.",
    initials: "ІП",
    rating: 4.9,
    reviews: 127,
    route: "Львів - Малага",
    car: "Mercedes Sprinter",
    price: "від 2€",
    status: "Довірений",
    statusBg: "bg-gradient-to-r from-amber-50 to-orange-50",
    statusBadge: "bg-amber-100 text-amber-700",
    isPremium: true
  },
  {
    id: 2,
    name: "Максим К.",
    initials: "МК",
    rating: 4.8,
    reviews: 94,
    route: "Львів - Амстердам",
    car: "Volvo FH16",
    price: "від 3€",
    status: "Довірений",
    statusBg: "bg-gradient-to-r from-amber-50 to-orange-50",
    statusBadge: "bg-amber-100 text-amber-700",
    isPremium: true
  },
  {
    id: 3,
    name: "Павло Л.",
    initials: "ПЛ",
    rating: 4.7,
    reviews: 156,
    route: "Львів - Варшава",
    car: "DAF XF",
    price: "від 2,5€",
    status: "Перевірений",
    statusBg: "bg-white",
    statusBadge: "bg-green-100 text-green-700",
    isPremium: false
  },
  {
    id: 4,
    name: "Дмитро Р.",
    initials: "ДР",
    rating: 4.6,
    reviews: 89,
    route: "Львів - Барселона",
    car: "Scania R440",
    price: "від 1,8€",
    status: "Перевірений",
    statusBg: "bg-white",
    statusBadge: "bg-green-100 text-green-700",
    isPremium: false
  },
  {
    id: 5,
    name: "Сергій Б.",
    initials: "СБ",
    rating: 4.5,
    reviews: 142,
    route: "Львів - Париж",
    car: "MAN TGX",
    price: "від 2,2€",
    status: "Новий",
    statusBg: "bg-white",
    statusBadge: "bg-slate-100 text-slate-600",
    isPremium: false
  }
];

const features = [
  {
    id: 0,
    title: "Прозорий рейтинг водіїв",
    mobileTitle: "Прозорий рейтинг",
    description: "Виберіть перевізника не навмання, а за відгуками та репутацією.",
    icon: Users
  },
  {
    id: 1,
    title: "Не шукайте — обирайте",
    mobileTitle: "Не шукайте — обирайте",
    description: "Просто опишіть вантаж, і зацікавлені водії самі відгукнуться на вашу пропозицію.",
    icon: MessageCircle
  },
  {
    id: 2,
    title: "Вантаж під наглядом",
    mobileTitle: "Вантаж під наглядом",
    description: "Сповіщення про кожен етап дороги прямо у вашому телефоні.",
    icon: Bell
  }
];

// Screen Components
function DriverListScreen() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-100 text-center">
        <h4 className="text-sm font-bold text-slate-900">Перевізники твого міста</h4>
        <p className="text-xs text-slate-500 mt-0.5">Львів</p>
      </div>
      {/* Driver Cards */}
      <div className="flex-1 overflow-hidden px-2 py-2 space-y-1.5">
        {drivers.map((driver) => (
          <div key={driver.id} className={`rounded-lg p-2 shadow-sm border transition-all ${
            driver.isPremium 
              ? `${driver.statusBg} border-amber-200 shadow-md` 
              : "bg-white border-slate-100 hover:shadow-md"
          }`}>
            {/* Driver Info Row */}
            <div className="flex gap-2 mb-1.5">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                driver.isPremium 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                  : 'bg-gradient-to-br from-blue-400 to-cyan-500'
              }`}>
                {driver.initials}
              </div>

              {/* Name & Rating */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5">
                  <h5 className={`text-xs font-bold ${driver.isPremium ? 'text-amber-900' : 'text-slate-900'}`}>{driver.name}</h5>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className={`text-xs font-semibold ${driver.isPremium ? 'text-amber-900' : 'text-slate-900'}`}>{driver.rating}</span>
                    <span className={`text-xs ${driver.isPremium ? 'text-amber-700' : 'text-slate-500'}`}>({driver.reviews})</span>
                  </div>
                </div>

                {/* Status & Price Row */}
                <div className="flex items-center gap-1 mt-0.5">
                  <div className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-semibold ${driver.statusBadge}`}>
                    {driver.status}
                  </div>
                  <div className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                    driver.isPremium 
                      ? 'bg-amber-200 text-amber-800' 
                      : 'bg-blue-100 text-vezu-blue'
                  }`}>
                    {driver.price}
                  </div>
                </div>
              </div>

            </div>

            {/* Route */}
            <div className={`text-xs ${driver.isPremium ? 'text-amber-800' : 'text-slate-600'}`}>
              <div className="flex items-center gap-1.5">
                <MapPin className={`w-3 h-3 flex-shrink-0 ${driver.isPremium ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className="truncate">{driver.route}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Info */}
      <div className="px-3 py-3 bg-blue-50/50 text-center text-xs text-slate-600 border-t border-slate-100">
        Ще 7 водіїв поблизу
      </div>
    </div>
  );
}

function PublishOfferScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 via-white to-cyan-50 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
        <Package className="w-7 h-7 text-white" />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Розмістіть вантаж</h4>
      <p className="text-sm text-slate-600 leading-relaxed">
        Опишіть вантаж, маршрут і вартість — водії готові допомогти
      </p>
    </div>
  );
}

function TrackingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 via-white to-cyan-50 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
        <Smartphone className="w-7 h-7 text-white" />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Слідкуйте за доставкою</h4>
      <p className="text-sm text-slate-600 leading-relaxed">
        Реальний час гео-позиції та повідомлення на кожному етапі
      </p>
    </div>
  );
}

const shipments = [
  {
    id: 1,
    from: "Львів",
    to: "Варшава",
    status: "Доставлено",
    statusColor: "bg-green-100 text-green-700",
    statusIcon: CheckCircle,
    date: "23 листопада",
    description: "Меблі та домашній текстиль",
    dimensions: "120x80x40 см",
    weight: "45 кг",
    price: "€89",
    payment: "Оплачено",
    estimatedArrival: "23 листопада, 18:00",
    sender: { name: "Іван Петренко", phone: "+380 67 123 4567" },
    recipient: { name: "Мар'ян Стецько", phone: "+36 20 456 7890" },
    currentStage: 3
  },
  {
    id: 2,
    from: "Львів",
    to: "Будапешт",
    status: "В дорозі",
    statusColor: "bg-blue-100 text-blue-700",
    statusIcon: Clock,
    date: "25 листопада",
    description: "Електроніка та комп'ютерне обладнання",
    estimatedArrival: "28 листопада, 14:30",
    dimensions: "60x40x30 см",
    weight: "22 кг",
    price: "€156",
    payment: "Оплачено",
    sender: { name: "Олеся Коваль", phone: "+380 96 789 0123" },
    recipient: { name: "Петер Ньомі", phone: "+36 30 123 4567" },
    currentStage: 2
  },
  {
    id: 3,
    from: "Львів",
    to: "Прага",
    status: "Доставлено",
    statusColor: "bg-green-100 text-green-700",
    statusIcon: CheckCircle,
    date: "20 листопада",
    description: "Спортивний інвентар",
    dimensions: "100x60x50 см",
    weight: "35 кг",
    price: "€112",
    payment: "Оплачено",
    estimatedArrival: "20 листопада, 16:00",
    sender: { name: "Дмитро Сич", phone: "+380 68 234 5678" },
    recipient: { name: "Ян Грубер", phone: "+420 728 345 6789" },
    currentStage: 3
  },
  {
    id: 4,
    from: "Львів",
    to: "Берлін",
    status: "Опубліковано",
    statusColor: "bg-amber-100 text-amber-700",
    statusIcon: Upload,
    date: "26 листопада",
    description: "Книги та видання",
    dimensions: "80x50x25 см",
    weight: "18 кг",
    price: "€95",
    payment: "Оплачено",
    estimatedArrival: "29 листопада, 10:00",
    sender: { name: "Вікторія Лис", phone: "+380 50 456 7890" },
    recipient: { name: "Ганс Мюллер", phone: "+49 30 567 8901" },
    currentStage: 0
  }
];

function CountdownTimer({ estimatedArrival }: { estimatedArrival: string }) {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(estimatedArrival.replace(/(\d+) листопада/, "2025-11-$1"));
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Прибув!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setCountdown(`${days}д ${hours}г`);
      } else {
        setCountdown(`${hours}г ${minutes}м`);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, [estimatedArrival]);

  return <>{countdown}</>;
}

function ShipmentDetailScreen({ shipment, onBack }: { shipment: any; onBack: () => void }) {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-100 text-center">
        <h4 className="text-sm font-bold text-slate-900">{shipment.from} → {shipment.to}</h4>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-3 py-2 space-y-3">
        {/* Description */}
        <div>
          <p className="text-xs text-slate-500 font-semibold mb-1">ОПИС ВАНТАЖУ</p>
          <p className="text-xs font-semibold text-slate-900">{shipment.description}</p>
        </div>

        {/* Progress Timeline */}
        <div>
          <p className="text-xs text-slate-500 font-semibold mb-2">ПРОГРЕС ДОСТАВКИ</p>
          <div className="flex gap-1.5 mb-3">
            {[
              { label: "Відправлено", stage: 0 },
              { label: "в дорозі", stage: 1 },
              { label: "на кордоні", stage: 2 },
              { label: "доставлено", stage: 3 }
            ].map((item) => (
              <div key={item.stage} className="flex-1">
                <div className={`h-3 rounded-full transition-all ${
                  shipment.currentStage >= item.stage
                    ? 'bg-vezu-blue'
                    : 'bg-slate-300'
                }`}></div>
              </div>
            ))}
          </div>
          {/* Status Text Below Progress */}
          <p className="text-xs font-semibold text-vezu-blue text-center">
            {[
              { label: "Відправлено", stage: 0 },
              { label: "в дорозі", stage: 1 },
              { label: "На кордоні", stage: 2 },
              { label: "Доставлено", stage: 3 }
            ][shipment.currentStage]?.label}
          </p>
        </div>

        {/* Dimensions & Weight */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-2 border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold mb-1">РОЗМІРИ</p>
            <p className="text-xs font-semibold text-slate-900">{shipment.dimensions}</p>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold mb-1">ВАГА</p>
            <p className="text-xs font-semibold text-slate-900">{shipment.weight}</p>
          </div>
        </div>

        {/* Price & Payment */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-2 border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold mb-1">ВАРТІСТЬ</p>
            <p className="text-xs font-bold text-vezu-blue">{shipment.price}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 border border-green-200">
            <p className="text-xs text-green-600 font-semibold mb-1">СТАТУС</p>
            <p className="text-xs font-bold text-green-700">{shipment.payment}</p>
          </div>
        </div>

        {/* Estimated Arrival */}
        <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
          <p className="text-xs text-vezu-blue font-semibold mb-1">ОРІЄНТОВНА ДОСТАВКА</p>
          <p className="text-xs font-semibold text-slate-900">{shipment.estimatedArrival}</p>
        </div>

        {/* Sender & Recipient */}
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-2 border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold mb-1">ВІДПРАВНИК</p>
            <p className="text-xs font-semibold text-slate-900">{shipment.sender.name}</p>
            <p className="text-xs text-slate-600">{shipment.sender.phone}</p>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold mb-1">ОТРИМУВАЧ</p>
            <p className="text-xs font-semibold text-slate-900">{shipment.recipient.name}</p>
            <p className="text-xs text-slate-600">{shipment.recipient.phone}</p>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="px-3 py-3 border-t border-slate-100 bg-white/50 flex justify-center">
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-vezu-blue text-white text-xs font-semibold hover:bg-blue-700 transition-colors max-w-xs">
          <MessageIcon className="w-4 h-4" />
          <span>Чат з перевізником</span>
        </button>
      </div>
    </div>
  );
}

function MyShipmentsScreen({ selectedShipmentId, onSelectShipment }: { selectedShipmentId: number | null; onSelectShipment: (id: number | null) => void }) {
  const sortedShipments = [...shipments].sort((a, b) => {
    const statusOrder: Record<string, number> = { "В дорозі": 0, "Опубліковано": 1, "Доставлено": 2 };
    const orderA = statusOrder[a.status] ?? 3;
    const orderB = statusOrder[b.status] ?? 3;
    return orderA - orderB;
  });

  const selectedShipment = selectedShipmentId ? shipments.find(s => s.id === selectedShipmentId) : null;

  if (selectedShipment) {
    return <ShipmentDetailScreen shipment={selectedShipment} onBack={() => onSelectShipment(null)} />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-100 text-center">
        <h4 className="text-sm font-bold text-slate-900">Мої відправки</h4>
      </div>

      {/* Shipments List */}
      <div className="flex-1 overflow-hidden px-2 py-2 space-y-2">
        {sortedShipments.map((shipment) => {
          const StatusIcon = shipment.statusIcon;
          return (
            <div
              key={shipment.id}
              className="w-full bg-white rounded-lg p-2.5 shadow-sm border border-slate-100 relative text-left"
            >
              {/* Route & Status Row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-900">{shipment.from} → {shipment.to}</span>
                  </div>
                  {shipment.description && (
                    <p className="text-xs text-slate-600 italic">{shipment.description}</p>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${shipment.statusColor}`}>
                <StatusIcon className="w-4 h-4" />
                {shipment.status}
                {shipment.status === "В дорозі" && shipment.estimatedArrival && (
                  <span className="ml-1.5 text-slate-600">
                    · Залишилось <CountdownTimer estimatedArrival={shipment.estimatedArrival} />
                  </span>
                )}
                {shipment.status === "Опубліковано" && (
                  <span className="ml-1.5">· {shipment.date}</span>
                )}
                {shipment.status === "Доставлено" && (
                  <span className="ml-1.5">· {shipment.date}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Button - Bottom */}
      <div className="px-2 py-3 border-t border-slate-100 bg-white/50 flex justify-center">
        <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-vezu-blue text-white text-xs font-semibold hover:bg-blue-700 transition-colors max-w-xs">
          <Plus className="w-4 h-4" />
          <span>Додати відправку</span>
        </button>
      </div>
    </div>
  );
}

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedShipmentId, setSelectedShipmentId] = useState<number | null>(null);
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-blue-100/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-6 text-center md:text-left">
          <div className="max-w-3xl mx-auto md:mx-0">
            <div className="text-vezu-blue font-bold tracking-wider text-xs uppercase mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[1px] bg-vezu-blue"></span>
              Початкова Версія
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Доступно <span className="text-vezu-blue">на старті</span>
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
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-200/40 via-cyan-100/30 to-transparent rounded-[3rem] blur-2xl" />
              
              {/* Phone Container */}
              <div className="relative w-[300px] aspect-[9/16] rounded-[2rem] shadow-2xl shadow-slate-400/20 overflow-hidden">
                {/* Screen */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {activeFeature === 0 && <DriverListScreen />}
                      {activeFeature === 1 && <MyShipmentsScreen selectedShipmentId={selectedShipmentId} onSelectShipment={setSelectedShipmentId} />}
                      {activeFeature === 2 && <ShipmentDetailScreen shipment={shipments[1]} onBack={() => {}} />}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Mobile Navigation Bar - Inside Phone (Mobile Only) */}
                  <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-t border-slate-200 px-4 py-3">
                    <div className="flex justify-around items-center">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => {
                            setActiveFeature(feature.id);
                            startAutoRotation();
                          }}
                          data-testid={`sender-feature-icon-${feature.id}`}
                          className={`
                            flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-vezu-blue
                            ${activeFeature === feature.id 
                              ? 'bg-blue-500/10' 
                              : 'hover:bg-slate-100'
                            }
                          `}
                        >
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${activeFeature === feature.id 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30' 
                              : 'bg-slate-100'
                            }
                          `}>
                            <feature.icon className={`w-5 h-5 transition-colors duration-300 ${activeFeature === feature.id ? 'text-white' : 'text-slate-500'}`} />
                          </div>
                          {activeFeature === feature.id && (
                            <motion.div 
                              layoutId="mobileActiveIndicatorSender"
                              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700"
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
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-vezu-blue focus-visible:ring-offset-2
                  ${activeFeature === feature.id 
                    ? 'bg-white shadow-xl border-2 border-vezu-blue scale-[1.02]' 
                    : 'bg-white/60 border border-slate-200 hover:bg-white hover:shadow-lg hover:border-vezu-blue/50'
                  }
                `}
              >
                {/* Active Indicator */}
                {activeFeature === feature.id && (
                  <motion.div 
                    layoutId="activeIndicatorSender"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"
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
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30' 
                      : 'bg-blue-50'
                    }
                  `}>
                    <feature.icon className={`w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-300 ${activeFeature === feature.id ? 'text-white' : 'text-vezu-blue'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-colors duration-300 ${activeFeature === feature.id ? 'text-vezu-blue' : 'text-slate-900'}`}>
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
