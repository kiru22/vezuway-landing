import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import confetti from "canvas-confetti";

interface RegistrationModalProps {
  children: React.ReactNode;
  role?: "sender" | "carrier";
}

export function RegistrationModal({ children, role = "sender" }: RegistrationModalProps) {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = role === "carrier" 
        ? { email, type, phone, role }
        : { email, type, role };
      
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Registration failed");
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        setEmail("");
        setType("");
        setPhone("");
        setShowSuccess(false);
        setOpen(false);
      }, 3000);
    },
    onError: () => {
      alert("Помилка реєстрації. Спробуйте ще раз.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "carrier") {
      if (!email || !type || !phone) {
        alert("Будь ласка, заповніть усі поля");
        return;
      }
    } else {
      if (!email || !type) {
        alert("Будь ласка, заповніть усі поля");
        return;
      }
    }
    mutation.mutate();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!showSuccess) {
      setOpen(newOpen);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0066FF", "#10B981", "#F59E0B", "#EF4444"],
      });
    }
  }, [showSuccess]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-6 sm:p-10 rounded-[2rem] border-0 shadow-2xl bg-white gap-0 overflow-hidden">
        {!showSuccess ? (
          <>
            <DialogClose className="absolute right-6 top-6 rounded-full p-2 hover:bg-slate-100 transition-colors opacity-50 hover:opacity-100">
              <X className="h-5 w-5 text-slate-500" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="mb-1">
              <span className={`font-bold text-xs tracking-wider uppercase ${
                role === "sender" ? "text-blue-600" : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700"
              }`}>
                {role === "sender" ? "Реєстрація відправника" : "Реєстрація перевізника"}
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-3xl font-bold text-slate-900 mb-8">
              Отримайте бонус
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base sm:text-sm font-medium text-slate-700">Email</Label>
                <Input 
                  id="email" 
                  placeholder="sender@example.com" 
                  type="email"
                  className={`h-12 rounded-xl border-slate-200 bg-white px-4 text-base transition-all ${
                    role === "sender" 
                      ? "focus-visible:ring-blue-500/20 focus-visible:border-blue-500" 
                      : "focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={mutation.isPending}
                />
              </div>

              {role === "carrier" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base sm:text-sm font-medium text-slate-700">Телефон</Label>
                  <Input 
                    id="phone" 
                    placeholder="+38 (0XX) XXX-XX-XX" 
                    type="tel"
                    className={`h-12 rounded-xl border-slate-200 bg-white px-4 text-base transition-all focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={mutation.isPending}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="type" className="text-base sm:text-sm font-medium text-slate-700">
                  {role === "sender" ? "Що плануєте відправляти?" : "Що плануєте перевозити?"}
                </Label>
                <Select value={type} onValueChange={setType} disabled={mutation.isPending}>
                  <SelectTrigger id="type" className={`h-12 rounded-xl border-slate-200 bg-white px-4 text-base transition-all ${
                    role === "sender"
                      ? "focus:ring-blue-500/20 focus:border-blue-500"
                      : "focus:ring-emerald-500/20 focus:border-emerald-500"
                  }`}>
                    <SelectValue placeholder={role === "sender" ? "Особисті речі / Посилки" : "Вантажі та пасажири"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl p-1">
                    {role === "sender" ? (
                      <>
                        <SelectItem value="personal" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                          Особисті речі / Посилки
                        </SelectItem>
                        <SelectItem value="commercial" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                          Комерційний вантаж
                        </SelectItem>
                        <SelectItem value="passenger" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                          Пасажирські поїздки
                        </SelectItem>
                        <SelectItem value="mixed" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                          Всі типи перевезень
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="personal" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600">
                          Вантажі
                        </SelectItem>
                        <SelectItem value="commercial" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600">
                          Пасажири
                        </SelectItem>
                        <SelectItem value="mixed" className="rounded-lg py-2.5 px-4 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600">
                          Всі типи перевезень
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className={`w-full h-14 rounded-xl text-lg font-semibold text-white transition-all mt-4 group disabled:opacity-50 ${
                  role === "sender"
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-lg shadow-emerald-600/20"
                }`}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Завантажування..." : "Записатися на реліз"}
                <ChevronRight className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl sm:text-2xl font-bold text-slate-900 mb-3">
              Дякуємо!
            </h2>
            <p className="text-lg sm:text-base text-slate-600 leading-relaxed mb-2">
              Ми отримали ваші дані.
            </p>
            <p className="text-lg sm:text-base text-slate-600 leading-relaxed">
              Ми будемо тримати вас в курсі останніх новин та оновлень.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}