import asyncio

from .BaseView import BaseView
from django.http import JsonResponse
from recommendations.src.prepare.db_handlers.save_locations import create_records
from recommendations.src.prepare.db_handlers.save_weights import save_weights


class UtilsView(BaseView):
    def get(self, request):
        res = None
        return JsonResponse(safe=False, data=res)

    def post(self, request):
        res = save_weights()
        return JsonResponse(safe=False, data=res)

    def delete(self, request, name=None):
        res = None
        return JsonResponse(safe=False, data=res)

    def put(self, request):
        res = None
        return JsonResponse(safe=False, data=res)

    def patch(self, request, pk=None):
        return JsonResponse(safe=False, data=None)
