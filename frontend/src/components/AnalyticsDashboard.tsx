import { useState, useEffect } from "react";
import axios from "axios";

// Data awal sebagai placeholder saat loading
const initialData = [
  { _id: "Programming", count: 0 },
  { _id: "Desain Grafis", count: 0 },
  { _id: "Fotografi", count: 0 },
  { _id: "Menulis", count: 0 }
];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any[]>(initialData);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/stats`);
        // Jika data dari backend ada (skillDistribution), masukkan ke state
        if (res.data.skillDistribution) {
          setData(res.data.skillDistribution);
        }
        setTotalUsers(res.data.activeUsers);
      } catch (e) {
        console.log("Gagal ambil data analytics", e);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Analytics Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Total <span className="font-bold text-green-600">{totalUsers}</span> individu telah terbantu menemukan peluang ekonomi.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.length > 0 ? data.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-700">
                {/* Pakai _id karena dari MongoDB aggregate, 
                    dan pastikan ada fallback string jika kosong */}
                {item._id || "General"}
              </h3>
              <p className="text-4xl font-bold text-green-600 mt-3">
                {item.count}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                pengguna memilih skill ini
              </p>
            </div>
          )) : (
            <p className="col-span-full text-center py-10">Memuat data analisis...</p>
          )}
        </div>
      </div>
    </section>
  );
}