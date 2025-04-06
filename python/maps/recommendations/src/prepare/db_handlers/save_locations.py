from recommendations.models import Locations
from recommendations.src.prepare.csv_handlers.main import CsvHandler


files = ["vzaly.csv", "dostoprimechatelnosti.csv"]


csv_columns_into_db_columns = {
    "ID в ИС ГТИБД": "gtib_id",
    "Вид объекта": "location_type",
    "Тип учреждения": "location_category",
    "Название": "name",
    "Описание": "description",
    "Историческая справка": "history_description",
    "Заметки": "notes"
}


def prepare_data_to_db():
    csv_handler = CsvHandler(files[1])
    data_csv = csv_handler.read_csv(is_processed=True)
    data_to_db = []
    csv_columns = data_csv.columns.values

    for _, row in data_csv.iterrows():
        location = {}
        for col in csv_columns:
            db_column = csv_columns_into_db_columns[col]
            location[db_column] = row[col]
        data_to_db.append(location)


    return data_to_db


async def create_records():
    data = prepare_data_to_db()
    if len(data):
        for row in data:
            try:
                new_record = Locations(**row)
                await new_record.asave()
            except Exception as ex:
                print(ex, row)
                return False, row

    return True


