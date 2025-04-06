from recommendations.models import Recs


def get_all():
    records = Recs.objects.all()
    res = []
    for record in records:
        res.append(
            {
                "id": str(record.id),
                "gtib_id": record.gtib_id,
                "name": record.name,
                "location_type": record.location_type,
                "address": record.address,
                "work_time": record.work_time,
                "coords": record.coords,
                "description": record.description,
            }
        )

    return res
