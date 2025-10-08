"use client";
import React from 'react';
import {
  Users, DollarSign, Activity, BarChart3, PieChart as PieIcon, MapPin, Tag, BrainCircuit, CreditCard, Heart
} from 'lucide-react';
// Importaciones de Recharts
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell,
  AreaChart as RechartsAreaChart, Area
} from 'recharts';


// --- DEFINICIÓN DE TIPOS PARA LOS DATOS ---
type NegocioVisitas = { name: string; visitas: number; };
type NegocioFavoritos = { name: string; favoritos: number; };
type CategoriaPopularidad = { name: string; popularidad: number; };
type GeneroData = { name: string; total: number; };
type UsoTarjetaData = { fecha: string; 'Usos Tarjeta Digital': number; };
type PromocionReciente = { nombre: string; negocio: string; fecha: string; };


// --- DATOS DE EJEMPLO (Tipados) ---
const topNegociosData: NegocioVisitas[] = [
  { name: 'Café "El Rincón"', visitas: 980 }, { name: 'Cinepolis', visitas: 850 },
  { name: 'Gimnasio "Actívate"', visitas: 760 }, { name: 'Librería "El Saber"', visitas: 620 },
  { name: 'Restaurante "Sazón"', visitas: 540 },
];
const topFavoritosData: NegocioFavoritos[] = [
    { name: 'Café "El Rincón"', favoritos: 150 }, { name: 'Librería "El Saber"', favoritos: 125 },
    { name: 'Cinepolis', favoritos: 110 }, { name: 'Tienda "EcoVida"', favoritos: 95 },
    { name: 'Parque "Aventura"', favoritos: 80 },
];
const topCategoriasData: CategoriaPopularidad[] = [
  { name: 'Comida', popularidad: 1230 }, { name: 'Entretenimiento', popularidad: 1100 },
  { name: 'Salud', popularidad: 980 }, { name: 'Educación', popularidad: 750 },
  { name: 'Servicios', popularidad: 430 },
];
const generoData: GeneroData[] = [
  { name: 'Femenino', total: 450 }, { name: 'Masculino', total: 720 }, { name: 'Otro', total: 80 },
];
const usoTarjetaData: UsoTarjetaData[] = [
  { fecha: 'Oct 01', 'Usos Tarjeta Digital': 289 }, { fecha: 'Oct 02', 'Usos Tarjeta Digital': 275 },
  { fecha: 'Oct 03', 'Usos Tarjeta Digital': 332 }, { fecha: 'Oct 04', 'Usos Tarjeta Digital': 343 },
  { fecha: 'Oct 05', 'Usos Tarjeta Digital': 390 }, { fecha: 'Oct 06', 'Usos Tarjeta Digital': 340 },
  { fecha: 'Oct 07', 'Usos Tarjeta Digital': 410 },
];
const ultimasPromociones: PromocionReciente[] = [
    { nombre: '2x1 en Frappés', negocio: 'Café "El Rincón"', fecha: '2025-10-08' },
    { nombre: '50% Dto. en Entrada', negocio: 'Cinepolis', fecha: '2025-10-07' },
    { nombre: 'Inscripción Gratis', negocio: 'Gimnasio "Actívate"', fecha: '2025-10-07' },
];

const barColors = [
    "#71D1FE",
    "#FFB667",
    "#7AF1A7",
    "#FF9FA0",
    "#E9D4FF",
    "#FCA4D4"
]


export default function DashboardGeneral(){
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-semibold text-base-content mb-6">Hola! Nombre</h1>

      {/* --- SECCIÓN DE ESTADÍSTICAS RÁPIDAS (KPIs) --- */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-6">
        <div className="stat">
          <div className="stat-figure"><Users size={32} /></div>
          <div className="stat-title">Jóvenes Totales</div>
          <div className="stat-value">1,250</div>
          <div className="stat-desc">Usuarios registrados</div>
        </div>
        <div className="stat">
          <div className="stat-figure"><BrainCircuit size={32} /></div>
          <div className="stat-title">Promedio de Edad</div>
          <div className="stat-value">21.3 años</div>
          <div className="stat-desc">Rango de 12-22 años</div>
        </div>
        <div className="stat">
          <div className="stat-figure"><DollarSign size={32}/></div>
          <div className="stat-title">Negocios Totales</div>
          <div className="stat-value">78</div>
          <div className="stat-desc">Activos en la plataforma</div>
        </div>
        <div className="stat">
          <div className="stat-figure"><CreditCard size={32}/></div>
          <div className="stat-title">Tarjetas</div>
          <div className="stat-value">1,100 D | 150 F</div>
          <div className="stat-desc">Digitales y Físicas</div>
        </div>
      </div>

      {/* --- CUADRÍCULA PRINCIPAL DEL DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* NEGOCIOS MÁS VISITADOS (en formato horizontal) */}
<div className="card lg:col-span-2 bg-base-100 shadow-lg">
  <div className="card-body">
    <h2 className="card-title"><BarChart3 className="text-neutral"/> Negocios más Visitados</h2>
    <ResponsiveContainer width="100%" height={300}>

      {/* 1. Se añade layout="vertical" */}
      <RechartsBarChart data={topNegociosData} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* 2. El Eje X ahora es numérico */}
        <XAxis type="number" />
        
        {/* 3. El Eje Y ahora muestra los nombres */}
        <YAxis dataKey="name" type="category" width={110} interval={0} />
        
        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
        <Bar dataKey="visitas" fill="#61738D" />
      </RechartsBarChart>
      
    </ResponsiveContainer>
  </div>
</div>

        {/* CATEGORÍAS MÁS POPULARES */}
        <div className="card lg:col-span-2 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title"><Activity className="text-neutral"/> Categorías Populares</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={topCategoriasData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={110} interval={0} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
                <Bar dataKey="popularidad">
                    {topCategoriasData.map((entry,index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                    /</Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GÉNERO DE LOS JÓVENES */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title"><PieIcon className="text-neutral"/> Género de Usuarios</h2>
            <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                    <Pie data={generoData} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      <Cell key={`cell-0`} fill="#C079FF" />
                      <Cell key={`cell-1`} fill="#9605f7" />
                      <Cell key={`cell-2`} fill="#D8B0FF" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* NEGOCIOS FAVORITOS */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title"><Heart className="text-neutral"/> Negocios Favoritos</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={topFavoritosData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={110} interval={0} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
                <Bar dataKey="favoritos">
                    {topCategoriasData.map((entry,index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                /</Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ÚLTIMAS PROMOCIONES */}
        <div className="card lg:col-span-2 bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title"><Tag className="text-neutral"/> Últimas Promociones</h2>
                <div className="overflow-x-auto h-64">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Promoción</th>
                                <th>Negocio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimasPromociones.map((promo) => (
                                <tr key={promo.nombre} className="hover">
                                    <td>{promo.nombre}</td>
                                    <td>{promo.negocio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* PICO DE USO DE TARJETA DIGITAL */}
        <div className="card lg:col-span-4 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title"><Activity className="text-neutral"/> Uso de Tarjeta Digital (Últ. 7 días)</h2>
             <ResponsiveContainer width="100%" height={300}>
                <RechartsAreaChart data={usoTarjetaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Usos Tarjeta Digital" stroke="#71D1FE" fill="#71D1FE" fillOpacity={0.3} />
                </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* MAPA DE JÓVENES */}
        <div className="card lg:col-span-4 bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
                <h2 className="card-title"><MapPin className="text-neutral"/> Ubicación de los Jóvenes</h2>
                <p className="text-sm text-base-content/70">Aquí se integraría el componente de mapa para mostrar la concentración de usuarios.</p>
                
            </div>
        </div>
      </div>
    </main>
  );
}