from typing import List
from recommendations.models import UserPreferences
from django.shortcuts import get_object_or_404


relationships = {
    "выставочные залы": ["Картины", "Мода", "Модерн", "Искусство", "Фильмы"],
    "религиозные объекты": ["Орган", "Классицизм", "Барокко"],
    "сады и парки": ["K-POP", "Блоггинг", "Фотография"],
    "памятники": ["Скульптура", "Чтение"],
    "мосты": ["Плавание", "Лодки", "Кофе"],
    "природные объекты": ["Садоводство", "Природа", "Спорт"],
    "замки и крепости": ["Средневековье", "Барокко"],
}


class UserWeights:
    def __init__(self, user_id):
        self.user_id = user_id
        self.user_interests: List[str] = []
        self.user_weights = []

    def get_user_weights(self):
        if not len(self.user_interests):
            self.get_user_interests()

        if len(self.user_interests) and not len(self.user_weights):
            self.create_user_weights()

        return self.user_weights

    def get_user_interests(self):
        record = get_object_or_404(UserPreferences, user=self.user_id)
        if record:
            self.user_interests = "".join(record.interests).split(", ")

    def calculate_matches_count(self, location_type):
        matches_count = 0
        for interest in self.user_interests:
            if interest in relationships[location_type]:
                matches_count += 1
        return matches_count

    def calculate_total_count(self, matches):
        total_count = 0
        for match in matches:
            value = match.values()
            for v in value:
                total_count += v
        return total_count

    def create_user_weights(self):
        user_weights = {}
        matches = []

        for location_type in relationships:
            matches_count = self.calculate_matches_count(location_type)
            if matches_count:
                matches.append({
                    location_type: matches_count
                })
        total_count = self.calculate_total_count(matches)

        for match in matches:
            items = list(match.items())[0]
            user_weights[items[0]] = round(items[1] / total_count, 1)

        self.user_weights = user_weights
