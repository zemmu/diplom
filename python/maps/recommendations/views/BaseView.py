from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser


class BaseView(View):
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(BaseView, self).dispatch(*args, **kwargs)

    @staticmethod
    def json_parse(request):
        return JSONParser().parse(request)
