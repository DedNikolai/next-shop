import Link from "next/link";
import { LayoutDashboard, Package, Layers, ReceiptText, EarthIcon } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
            Admin Panel
            </div>
            <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                <LayoutDashboard size={20} /> Головна
            </Link>
            <Link href="/dashboard/products" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                <Package size={20} /> Товари
            </Link>
            <Link href="/dashboard/categories" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                <Layers size={20} /> Категорії
            </Link>
            <Link href="/dashboard/orders" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                <ReceiptText size={20} /> Замовлення
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                <EarthIcon size={20} /> Сайт
            </Link>
            </nav>
            <div className="p-4 text-sm border-t border-gray-700">&copy; 2025</div>
      </aside>
    )
}