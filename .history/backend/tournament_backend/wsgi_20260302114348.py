"""
WSGI config for tournament_backend project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tournament_backend.settings')

application = get_wsgi_application()

# Vercel serverless function handler
app = application
