import asyncio

from .BaseView import BaseView
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from user_auth.src.reg import reg


class UserRegView(BaseView, APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        res = None
        return JsonResponse(safe=False, data=res)

    def post(self, request):
        return JsonResponse(safe=False, data=None)

    def delete(self, request, name=None):
        res = None
        return JsonResponse(safe=False, data=res)

    def put(self, request):
        data = request.data
        res = asyncio.run(reg.save_add_info(data))
        return JsonResponse(safe=False, data=res)

    def patch(self, request, pk=None):
        return JsonResponse(safe=False, data=None)
