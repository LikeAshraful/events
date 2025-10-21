<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'short_description', 'category_id', 'buy_price', 'price', 'sale_price', 'thumbnail_image', 'images', 'is_active'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
