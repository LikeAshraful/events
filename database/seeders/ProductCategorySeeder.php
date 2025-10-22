<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Electronics',
            'Clothing',
            'Books',
            'Furniture',
            'Toys',
        ];

        foreach ($categories as $name) {
            ProductCategory::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $name . ' products',
                'is_active' => true,
            ]);
        }
    }
}
