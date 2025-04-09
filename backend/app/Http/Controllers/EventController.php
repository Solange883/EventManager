<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;



class EventController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
{
    // Si aucun paramètre de filtrage n'est fourni, retourner tous les événements
    if (!$request->has('date') && !$request->has('lieu') && !$request->has('categorie')) {
        return Event::all();
    }

    // Sinon, appliquer les filtres
    $query = Event::query();

    // Filtrer par date si le paramètre 'date' est présent
    if ($request->has('date')) {
        $query->whereDate('date', $request->date);
    }

    // Filtrer par lieu si le paramètre 'lieu' est présent
    if ($request->has('lieu')) {
        $query->where('lieu', 'like', '%' . $request->lieu . '%');
    }

    // Filtrer par catégorie si le paramètre 'categorie' est présent
    if ($request->has('categorie')) {
        $query->where('categorie', 'like', '%' . $request->categorie . '%');
    }

    // Exécuter la requête et retourner les résultats filtrés
    $events = $query->get();

    return response()->json($events);
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Gestion de l'image
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time().'.'.$image->extension();
        $image->move(public_path('images/events'), $imageName);
        $validated['image'] = 'images/events/'.$imageName;
    }

    $event = Event::create($validated);

    return response()->json([
        'event' => $event,
        'image_url' => asset($event->image) // Retourne l'URL complète de l'image
    ], 201);;
}

    public function show($id)
    {
        return Event::findOrFail($id);
    }


    public function update(Request $request, $id)
{
    $event = Event::findOrFail($id);
    Log::debug('Request data:', $request->all());
    Log::debug('Files:', $request->file() ? ['has_files' => true] : ['has_files' => false]);

    // Valider les données
    $validatedData = $request->validate([
        'titre' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string',
        'date' => 'sometimes|required|date',
        'lieu' => 'sometimes|required|string',
        'categorie' => 'sometimes|required|string',
        'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    

    // Gestion de l'image
if ($request->hasFile('image') && $request->file('image')->isValid()) {
    // Supprimer l'ancienne image si elle existe
    if ($event->image && file_exists(public_path($event->image))) {
        unlink(public_path($event->image));
    }

    // Enregistrer la nouvelle image
    $image = $request->file('image');
    $imageName = time().'.'.$image->extension();
    $image->move(public_path('images/events'), $imageName);
    $validatedData['image'] = 'images/events/'.$imageName;
} else {
    // Si la clé image est présente mais sans fichier, on peut la retirer du tableau
    unset($validatedData['image']);
}


    // Mise à jour effective
    $event->update($validatedData);

    return response()->json([
        'success' => true,
        'event' => $event->fresh(), // Rafraîchir les données
        'message' => 'Événement mis à jour avec succès'
    ], 200);
}

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(null, 204);
    }

   
}