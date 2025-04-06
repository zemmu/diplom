from datetime import datetime

from asgiref.sync import sync_to_async
from django.shortcuts import get_object_or_404

from user_auth.models import UserInfo, UserPreferences, AuthUser


async def save_add_info(data):
    user_record = await sync_to_async(get_object_or_404)(AuthUser, id=data["id"])

    birthdate_timestamp = str(format_date_to_timestamp(data["birthDate"]))
    try:
        user_info_record = UserInfo(
            user=user_record, gender=data["gender"],
            birthdate=birthdate_timestamp, walkingtime=data["walkingTime"],
        )
        await user_info_record.asave()
    except Exception as ex:
        print(ex)

    food = ", ".join(data["food"])
    interests = ", ".join(data["interests"])
    try:
        user_prefs_record = UserPreferences(user=user_record, food=food, interests=interests)
        await user_prefs_record.asave()
    except Exception as ex:
        print(ex)

    return "Saved"


def format_date_to_timestamp(date_string: str) -> int:
    date_format = "%d/%m/%Y"
    date_object = datetime.strptime(date_string, date_format)
    timestamp = int(date_object.timestamp())
    return timestamp
