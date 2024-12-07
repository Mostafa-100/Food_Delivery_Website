<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->float('montant');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->string('zipCode');
            $table->string('country');
            $table->string('phone');
            $table->string('address');
            $table->integer('numberOfItems');
            $table->enum('status', ['unfinished','food processing', 'out for delivery', 'delivered']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
