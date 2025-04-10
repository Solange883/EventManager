<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation d'inscription</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        h2 {
            color: #2c3e50;
        }
        p {
            line-height: 1.6;
        }
        .event-details {
            background-color: #f9f9f9;
            padding: 15px;
            margin-top: 20px;
            border-left: 4px solid #3498db;
            border-radius: 5px;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bonjour {{ Auth::user()->name }},</h2>
        <p>Vous êtes bien inscrit à l'événement <strong>{{ $event->titre }}</strong>.</p>
        <p>Voici les détails de l'événement :</p>

        <div class="event-details">
            <p><strong>Titre :</strong> {{ $event->titre }}</p>
            <p><strong>Description :</strong> {{ $event->description }}</p>
            <p><strong>Catégorie :</strong> {{ $event->categorie }}</p>
            <p><strong>Lieu :</strong> {{ $event->lieu }}</p>
            <p><strong>Date :</strong> {{ $event->date }}</p>
        </div>

        <p style="margin-top: 20px;">Merci pour votre inscription et à très bientôt !</p>

        <div class="footer">
            &copy; {{ date('Y') }} EventManager. Tous droits réservés.
        </div>
    </div>
</body>
</html>
