import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

export default function Index() {
    const { products, filters }: any = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('products.index'), { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="p-6 bg-white shadow-sm rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">Products</h1>
                    <Link
                        href={route('admin.products.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Product
                    </Link>
                </div>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>

                {/* Product table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg table-auto">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr className=" border border-gray-200">
                                <th className="px-3 py-2 ">#</th>
                                <th className="px-3 py-2 text-left">Image</th>
                                <th className="px-3 py-2 text-left">Name</th>
                                <th className="px-3 py-2 text-left">Price</th>
                                <th className="px-3 py-2 text-left">Sale Price</th>
                                <th className="px-3 py-2 text-left">Status</th>
                                <th className="px-3 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {products.data.length > 0 ? (
                                products.data.map((product: any, index: number) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 border border-gray-200 transition-colors"
                                    >
                                        <td className="px-3 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="w-20">
                                            <img className="w-30" src={product.thumbnail_image} alt={product.name} />
                                        </td>
                                        <td className="px-3 py-2">{product.name}</td>
                                        <td className="px-3 py-2">${product.price}</td>
                                        <td className="px-3 py-2"> ${product.sale_price}</td>
                                        <td className="px-3 py-2">
                                            {product.is_active ? (
                                                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={route('admin.products.show', product.id)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Show"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Link>

                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this product?')) {
                                                            router.delete(route('admin.products.destroy', product.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-3 py-4 text-center text-gray-500"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {products.links.map((link: any, i: number) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
