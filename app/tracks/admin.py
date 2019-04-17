from django.contrib import admin

# Register your models here.
from tracks.models import Track


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Track._meta.fields]
