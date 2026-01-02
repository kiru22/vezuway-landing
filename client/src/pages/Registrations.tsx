import { useEffect, useState } from "react";
import { type Registration } from "@shared/schema";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

export default function Registrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("/api/registrations");
        const data = await response.json();
        setRegistrations(data.data || []);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const senders = registrations.filter((r) => (r as any).role === "sender");
  const transporters = registrations.filter((r) => (r as any).role === "carrier");

  const typeLabels: { [key: string]: string } = {
    personal: "Особисті речі / Посилки",
    commercial: "Комерційний вантаж",
    passenger: "Пасажирські поїздки",
    mixed: "Посилки + Поїздки",
  };

  const Table = ({ title, data, color }: { title: string; data: Registration[]; color: string }) => (
    <div className="flex-1">
      <h2 className={`text-2xl font-bold mb-6 ${color}`}>{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
          <thead>
            <tr className={`${color.replace("text-", "bg-")}/10`}>
              <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Email</th>
              <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Тип</th>
              {title.includes("Перевізники") && <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Телефон</th>}
              <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Дата реєстрації</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={title.includes("Перевізники") ? 4 : 3} className="border border-slate-300 px-4 py-3 text-center text-slate-500">
                  Немає даних
                </td>
              </tr>
            ) : (
              data.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-300 px-4 py-3">{reg.email}</td>
                  <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                    {typeLabels[reg.type] || reg.type}
                  </td>
                  {title.includes("Перевізники") && (
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                      {(reg as any).phone || "-"}
                    </td>
                  )}
                  <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                    {reg.createdAt
                      ? format(new Date(reg.createdAt), "dd MMMM yyyy, HH:mm", { locale: uk })
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Всього: <strong>{data.length}</strong>
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-600">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Реєстрації користувачів</h1>
          <p className="text-lg text-slate-600">
            Всього реєстрацій: <strong>{registrations.length}</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Table title="📦 Відправники" data={senders} color="text-blue-600" />
          <Table title="🚚 Перевізники" data={transporters} color="text-green-600" />
        </div>
      </div>
    </div>
  );
}
