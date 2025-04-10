from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.http import JsonResponse  
from todos import views

def api_root(request):
    return JsonResponse({
        'message': 'Todo API',
        'endpoints': {
            'todos': '/api/todos/',
            'admin': '/admin/'
        }
    })

router = routers.DefaultRouter()
router.register(r'todos', views.TodoViewSet)

urlpatterns = [
    path('', api_root),  # Simple JSON response
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]