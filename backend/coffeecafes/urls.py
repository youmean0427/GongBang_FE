from django.urls import path
from . import views

urlpatterns = [
    # cafe
    path('coffeecafes/<int:type>', views.coffee_cafes),
    path('coffeecafe/<int:id>', views.coffee_cafe_detail),
    path('coffeecafe/<int:id>/review/<int:type>', views.coffee_cafe_detail_review),
    path('coffeecafe/create', views.coffee_cafe_create),

    # review
    path('coffeecafe/review/<int:id>', views.review_get),
    path('coffeecafe/review', views.review_all_get),
    path('coffeecafe/review/<int:id>/delete', views.review_delete),
    path('coffeecafe/review/image/<int:id>', views.review_image_delete)

]