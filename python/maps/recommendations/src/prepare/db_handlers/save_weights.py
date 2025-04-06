from mongoengine import connect

from recommendations.models import Recs
from recommendations.src.prepare.csv_handlers.WeightCreator import wc

connect("recs")


def handle_string(value):
    try:
        len(value)
        return value
    except Exception as ex:
        return None

def save_weights():
    dataframe = wc.read_csv("weights.csv")
    df_columns = dataframe.columns
    id_col = df_columns[0]
    title_col = df_columns[1]
    location_type_col = df_columns[2]
    address_col = df_columns[3]
    work_time_col = df_columns[4]
    coords_col = df_columns[5]
    description_col = df_columns[6]
    columns = df_columns[7:]

    data = []

    for _, row in dataframe.iterrows():
        gbtd_id = row[id_col]
        name = row[title_col]
        location_type = row[location_type_col]
        address = row[address_col]
        work_time = row[work_time_col]
        coords = row[coords_col]
        description = row[description_col]

        if coords:
            x, y = coords.split(",")
            coords = [float(x), float(y)]
        else:
            coords = None

        location = {
            "gbtd_id": str(gbtd_id),
            "name": handle_string(name),
            "location_type": handle_string(location_type),
            "address": handle_string(address),
            "work_time": handle_string(work_time),
            "coords": coords,
            "description": handle_string(description),
            "weights": {}
        }

        for column in columns:
            if column != name and row[column] > 0:
                try:
                    loc_gbtd_id = str(dataframe.loc[dataframe[title_col] == column, "ID в ИС ГТИБД"].values[0])
                    loc_location_type = str(dataframe.loc[dataframe[title_col] == column, "Вид объекта"].values[0])
                except Exception as ex:
                    print(ex, column, sep="||[]")
                    break

                location["weights"][loc_gbtd_id] = {
                    "name": column,
                    "location_type": loc_location_type,
                    "value": row[column]
                }
        data.append(location)

    print(len(data))
    for d in data:
        try:
            new_record = Recs(
                gtib_id=d["gbtd_id"], name=d["name"], location_type=d["location_type"],
                address=d["address"], work_time=d["work_time"], coords=d["coords"],
                description=d["description"], weights=d["weights"]
            )
            new_record.save(using="recs")
        except Exception as ex:
            print(ex)
            return

    print("[Done]")
