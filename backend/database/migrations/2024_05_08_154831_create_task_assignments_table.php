<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_assignments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('task_id')->constrained()->onDelete('cascade');
                $table->foreignId('assigned_to')->constrained('users')->onDelete('cascade');
                $table->foreignId('assigned_by')->constrained('users')->onDelete('cascade');
                $table->string('status')->default('pending');
                $table->dateTime('due_date')->nullable();
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_assignments');
    }
};
