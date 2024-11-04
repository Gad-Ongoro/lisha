from django.core.cache import cache
from django.conf import settings
from rest_framework.response import Response

class CacheMixin:
    cache_timeout = settings.CACHE_TIMEOUT

    def get_cache_key(self, *args, **kwargs):
        return f"{self.__class__.__name__}_{self.request.get_full_path()}"

    def get(self, request, *args, **kwargs):
        cache_key = self.get_cache_key(*args, **kwargs)
        cached_response = cache.get(cache_key)

        if cached_response:
            return Response(cached_response)

        response = super().get(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=self.cache_timeout)
        return response
