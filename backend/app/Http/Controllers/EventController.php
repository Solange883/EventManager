<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        return Event::all(); // Retirez with('organizer')
    }

    public function store(Request $request)
    {
         // Vérification du rôle admin
    if (Auth::user()->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized - Admin access required'], 403);
    }
    
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'lieu' => 'required|string',
            'categorie' => 'required|string',
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function show($id)
    {
        return Event::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
            'lieu' => 'sometimes|string',
            'categorie' => 'sometimes|string',
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(null, 204);
    }
}