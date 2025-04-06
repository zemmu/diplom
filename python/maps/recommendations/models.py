from django.db import models
from mongoengine import DictField, Document, IntField, StringField, ListField


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class UserPreferences(models.Model):
    user = models.OneToOneField('AuthUser', models.DO_NOTHING, db_column='user', primary_key=True)
    food = models.TextField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_preferences'


class Locations(models.Model):
    gtib_id = models.IntegerField(blank=True, null=True)
    location_type = models.CharField(max_length=50, blank=True, null=True)
    location_category = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=512, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    history_description = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locations'


class Recs(Document):
    gtib_id = IntField()
    name = StringField()
    location_type = StringField()
    address = StringField()
    work_time = StringField()
    coords = ListField()
    description = StringField()
    weights = DictField()



