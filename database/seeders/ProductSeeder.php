<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\ProductCategory;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $categories = ProductCategory::all();

        foreach ($categories as $category) {
            for ($i = 1; $i <= 5; $i++) {
                $name = $category->name . ' Product ' . $i;
                $buyPrice = $faker->randomFloat(2, 50, 500);
                $price = $buyPrice + $faker->randomFloat(2, 10, 100);
                $salePrice = $faker->boolean(50) ? $price - $faker->randomFloat(2, 5, 50) : null;

                Product::create([
                    'name' => $name,
                    'slug' => Str::slug($name),
                    'description' => $faker->paragraph(),
                    'short_description' => $faker->sentence(),
                    'category_id' => $category->id,
                    'buy_price' => $buyPrice,
                    'price' => $price,
                    'sale_price' => $salePrice,
                    'thumbnail_image' => 'https://placehold.co/400x300?text=' . $name,
                    'images' => json_encode([
                        'https://placehold.co/400x300?text=technics+reprehenderit',
                        'https://placehold.co/400x300?text=technics+reprehenderit',
                        'https://placehold.co/400x300?text=technics+reprehenderit',
                    ]),
                    'is_active' => true,
                ]);
            }
        }
    }
}
