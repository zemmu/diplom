from .BaseView import BaseView
from django.http import JsonResponse
from recommendations.src.source import locations


class LocationView(BaseView):
    def get(self, request):
        uuid = request.GET.get('id')
        if uuid:
            res = None
        else:
            res = locations.get_all()
        return JsonResponse(safe=False, data=res)

    def post(self, request):
        res = None
        return JsonResponse(safe=False, data=res)

    def delete(self, request, name=None):
        res = None
        return JsonResponse(safe=False, data=res)

    def put(self, request):
        res = None
        return JsonResponse(safe=False, data=res)

    def patch(self, request, pk=None):
        return JsonResponse(safe=False, data=None)
