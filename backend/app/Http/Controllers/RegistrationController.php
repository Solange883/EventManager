<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventRegistrationConfirmation;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\User;



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

        if ($event instanceof Event) {
            Mail::to(Auth::user()->email)->send(new EventRegistrationConfirmation($event));
        } else {
            return response()->json(['message' => 'Event not found'], 404);
        }
        

        return response()->json($registration, 201);
    }

    public function downloadPdf($id)
{
    $event = Event::findOrFail($id);
    // Dans RegistrationController.php, méthode downloadPdf()
    $registrations = $event->registrations()->with('user')->get();
    // Convertir chaque registration_date en un objet Carbon
foreach ($registrations as $registration) {
    $registration->registration_date = \Carbon\Carbon::parse($registration->registration_date);
}

    $pdf = Pdf::loadView('pdf.registrations', compact('event', 'registrations'));

    // Renvoie le PDF comme une réponse de type 'application/pdf'
    return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="inscriptions_' . $event->id . '.pdf"');
}


   

   
}