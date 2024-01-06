from django.urls import path
from . import views

urlpatterns = [
    # cafe
    path('coffeecafes/', views.coffee_cafes),
    path('coffeecafe/<int:id>', views.coffee_cafe_detail),
    path('coffeecafe/<int:id>/review/<int:type>', views.coffee_cafe_detail_review),

    # review
    path('coffeecafe/review/<int:id>', views.review_get),
    path('coffeecafe/review/<int:id>/delete', views.review_delete),
    path('coffeecafe/review/image/<int:id>', views.review_image_delete)

]