<!DOCTYPE html>
<html>
<head>
    <title>Liste des Inscrits</title>
    <style>
        /* Styles CSS pour votre PDF */
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 8px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Liste des Inscrits à l'Événement : {{ $event->title }}</h1>
    <p>Date : {{ $event->date }}</p>

    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Date d'Inscription</th>
            </tr>
        </thead>
        <tbody>
            @foreach($event->registrations as $registration)
                <tr>
                    <td>{{ $registration->user->name }}</td>
                    <td>{{ $registration->user->email }}</td>
                    <td>{{ $registration->registration_date }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>