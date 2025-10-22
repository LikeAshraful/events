import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CloudUpload } from 'lucide-react';

export default function Create() {
    const { categories }: any = usePage().props; // assuming you pass categories from Laravel
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        category_id: '',
        buy_price: '',
        price: '',
        sale_price: '',
        short_description: '',
        description: '',
        thumbnail_image: null as File | null,
        gallery_images: [] as File[],
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('gallery_images', Array.from(e.target.files));
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Products', href: '/products' },
                { title: 'Add Product', href: '#' },
            ]}
        >
            <Head title="Add Product" />

            <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">Add New Product</h1>
                    <Link
                        href={route('admin.products.index')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Products
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div>
                        <label className="block text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            placeholder="e.g. Smart Watch X200"
                        />
                        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Slug</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                                placeholder=""
                            />
                            {errors.slug && <div className="text-red-600 text-sm">{errors.slug}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <div className="text-red-600 text-sm">{errors.category_id}</div>
                            )}
                        </div>
                    </div>

                    {/* Pricing Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Buy Price ($)</label>
                            <input
                                type="number"
                                value={data.buy_price}
                                onChange={(e) => setData('buy_price', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            />
                            {errors.buy_price && <div className="text-red-600 text-sm">{errors.buy_price}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            />
                            {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Sale Price ($)</label>
                            <input
                                type="number"
                                value={data.sale_price}
                                onChange={(e) => setData('sale_price', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            />
                            {errors.sale_price && <div className="text-red-600 text-sm">{errors.sale_price}</div>}
                        </div>
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-gray-700 mb-1">Short Description</label>
                        <textarea
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            placeholder="A brief summary about this product..."
                        ></textarea>
                        {errors.short_description && (
                            <div className="text-red-600 text-sm">{errors.short_description}</div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            placeholder="Detailed information about the product..."
                        ></textarea>
                        {errors.description && (
                            <div className="text-red-600 text-sm">{errors.description}</div>
                        )}
                    </div>

                    {/* Thumbnail Image */}
                    <div>
                        <label className="block text-gray-700 mb-1">Thumbnail Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('thumbnail_image', e.target.files?.[0] ?? null)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-gray-700"
                        />
                        {errors.thumbnail_image && (
                            <div className="text-red-600 text-sm">{errors.thumbnail_image}</div>
                        )}
                    </div>

                    {/* Gallery Dropzone */}
                    <div>
                        <label className="block text-gray-700 mb-2">Gallery Images</label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition"
                            onClick={() => document.getElementById('galleryInput')?.click()}
                        >
                            <CloudUpload className="mx-auto text-gray-500 mb-2" size={40} />
                            <p className="text-gray-600">Drag and drop images here or click to upload</p>
                            <input
                                id="galleryInput"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleGalleryChange}
                                className="hidden"
                            />
                        </div>

                        {data.gallery_images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Array.from(data.gallery_images).map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Gallery ${idx}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.gallery_images && (
                            <div className="text-red-600 text-sm mt-2">{errors.gallery_images}</div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="text-gray-700">Active</label>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
