from django.db import models


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


class UserInfo(models.Model):
    user = models.OneToOneField('AuthUser', models.DO_NOTHING, db_column='user', primary_key=True)
    birthdate = models.IntegerField(db_column='birthDate', blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(max_length=10, blank=True, null=True)
    walkingtime = models.IntegerField(db_column='walkingTime', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user_info'


class UserPreferences(models.Model):
    user = models.OneToOneField('AuthUser', models.DO_NOTHING, db_column='user', primary_key=True)
    food = models.TextField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_preferences'


class Users(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=33, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

