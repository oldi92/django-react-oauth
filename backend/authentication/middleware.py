from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from django.urls import reverse
import json


class MoveJWTCookieIntoTheBody(MiddlewareMixin):
    """
    for Django Rest Framework JWT's POST "/token-refresh" endpoint --- check for a 'token' in the request.COOKIES
    and if, add it to the body payload.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        auth_cookie = settings.REST_AUTH['JWT_AUTH_COOKIE']

        if request.path in [reverse("token_verify"), reverse("rest_logout")] and auth_cookie in request.COOKIES:
            if request.body != b'':
                print('HAVE TOKEN')
                data = json.loads(request.body)
                data['token'] = request.COOKIES[auth_cookie]
                request._body = json.dumps(data).encode('utf-8')
            else:
                print('DO NOT HAVE TOKEN')
                # I cannot create a body if it is not passed so the client must send '{}'
                pass
        else:
            print('PATH IS NOT VERIFY')

        return None
