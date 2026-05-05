<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'city',
        'venue',
        'start_datetime',
        'end_datetime',
        'banner',
        'external_url',
        'status',
        'clicks',
        'source',
        'featured',
    ];

    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
    ];

    /**
     * Scope a query to only include published events.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to sort events by nearest start datetime.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_datetime', '>=', now())
                     ->orderBy('start_datetime', 'asc');
    }
}
