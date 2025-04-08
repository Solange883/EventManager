<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function register(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        if ($event->registrations()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Already registered for this event'], 400);
        }


        $registration = Registration::create([
            'user_id' => Auth::id(),
            'event_id' => $event->id,
            'registration_date' => now(),
        ]);

        return response()->json($registration, 201);
    }

    public function unregister($id)
    {
        $event = Event::findOrFail($id);
        $registration = $event->registrations()->where('user_id', Auth::id())->first();

        if (!$registration) {
            return response()->json(['message' => 'Not registered for this event'], 400);
        }

        $registration->delete();

        return response()->json(null, 204);
    }
}