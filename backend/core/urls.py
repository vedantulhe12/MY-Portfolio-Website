from django.urls import path
from . import views

urlpatterns = [
    path('', views.submit_contact_form, name='contact-submit'),
    path('info/', views.contact_info, name='contact-info'),
]