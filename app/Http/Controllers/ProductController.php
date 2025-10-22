<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->input('search'), function ($q, $search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Products/index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = ProductCategory::where('is_active', true)->get(['id', 'name']);
        // dd($categories);
        return Inertia::render('Admin/Products/create',[
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'category_id' => 'required|exists:product_categories,id',
            'buy_price' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'thumbnail_image' => 'nullable|image|max:2048',
            'gallery_images.*' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        // if slug is empty in request then make it from name
        if (empty($validated['slug'])) {
            $slug = Str::slug($validated['name']);
            $original = $slug;
            $counter = 1;
            while (Product::where('slug', $slug)->exists()) {
            $counter++;
            $slug = $original . '-' . $counter;
            }
            $validated['slug'] = $slug;
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        if ($request->hasFile('thumbnail_image')) {
            $validated['thumbnail_image'] = $request->file('thumbnail_image')->store('products/thumbnails', 'public');
        } 

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                $path = $image->store('products/gallery', 'public');                
            }   
        }
        
        $product = Product::create($validated);        

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }
}
