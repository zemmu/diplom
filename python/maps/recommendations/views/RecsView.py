from .BaseView import BaseView
from django.http import JsonResponse
from ..src.source.rec_system import RecSystem


class RecsView(BaseView):
    def get(self, request):
        gtib_id = request.GET.get('gtib_id')
        user_id = request.GET.get('user_id')

        res = RecSystem.get_recs(gtib_id, user_id)
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
