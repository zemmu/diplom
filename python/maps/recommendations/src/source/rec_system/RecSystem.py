from .UserWeigths import UserWeights
from recommendations.models import Recs


all_weight = {
    "выставочные залы": 0.0,
    "религиозные объекты": 0.0,
    "сады и парки": 0.0,
    "памятники": 0.0,
    "мосты": 0.0,
    "природные объекты": 0.0,
    "замки и крепости": 0.0,
}

location_types = all_weight.keys()
matches = {
    "выставочные залы": ["Картины", "Мода", "Модерн", "Искусство", "Фильмы"],
    "религиозные объекты": ["Орган", "Классицизм", "Барокко"],
    "сады и парки": ["K-POP", "Блоггинг", "Фотография"],
    "памятники": ["Скульптура", "Чтение"],
    "мосты": ["Плавание", "Лодки", "Кофе"],
    "природные объекты": ["Садоводство", "Природа", "Спорт"],
    "замки и крепости": ["Средневековье", "Барокко"],
}


default_weight = {
    "выставочные залы": 0.2,
    "религиозные объекты": 0.2,
    "природные объекты": 0.2,
    "памятники": 0.2,
    "замки и крепости": 0.2,
}





def get_record(gtib_id: str):
    try:
        record = Recs.objects.get(gtib_id=gtib_id)
        return record
    except Exception as ex:
        print(ex)
        return None


# Получаем список мест с типом локации, заданной в location_type
def get_rec_locations(locations, location_type):
    locs = []
    for loc_gbtd_id in locations:
        location_item = locations[loc_gbtd_id]
        if location_item["location_type"] == location_type:
            record = get_record(loc_gbtd_id)
            coords = None
            if record:
                coords = record.coords

            locs.append({**location_item, "gtib_id": loc_gbtd_id, "coords": coords})
    return locs


def get_recs(gtib_id: str, user_id: int):
    limit = 10
    uh = UserWeights(user_id)
    weights = uh.get_user_weights() or default_weight

    data = {}
    for key in weights.keys():
        data[key] = {
            "count_recs": round(weights[key] * limit),
            "rec_locations": []
        }

    record = get_record(gtib_id)
    if not record:
        return "Такого элемента не существует"
    locations = record.weights

    for main_location_type in data:
        if len(locations.keys()):
            rec_locations = get_rec_locations(locations, main_location_type)
            sorted_rec_locations = sorted(rec_locations, key=lambda x: x['value'], reverse=True)

            if len(sorted_rec_locations):
                main_location = data[main_location_type]
                count_recs = main_location["count_recs"]
                main_location["rec_locations"] = sorted_rec_locations[:count_recs]
        else:
            print("Тут нет элементов")

    res = []
    for location_type in data.keys():
        res.append({
            "location_type": location_type,
            "locations": data[location_type]['rec_locations']
        })

    return res

