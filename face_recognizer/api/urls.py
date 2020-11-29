from django.urls import path
from . import views

urlpatterns = [
    path('parse/', views.ParserView.as_view()),
    path('recognize/', views.Recognizer.as_view())
]
