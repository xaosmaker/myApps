from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination, Response


class CustomPagination(PageNumberPagination):
    page_size_query_param = "page_size"

    def get_page_number(self, request, paginator: Paginator):
        page_number = super().get_page_number(request, paginator)
        if int(page_number) < 1:
            page_number = 1
        if int(page_number) > paginator.num_pages:
            page_number = paginator.num_pages
        return page_number

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
            }
        )

    def get_paginated_response_schema(self, schema):

        return {
            "type": "object",
            "required": ["count", "results"],
            "properties": {
                "count": {
                    "type": "integer",
                    "example": 123,
                },
                "current_page": {
                    "type": "integer",
                    "example": 1,
                },
                "total_pages": {
                    "type": "integer",
                    "example": 25,
                },
                "results": schema,
            },
        }
