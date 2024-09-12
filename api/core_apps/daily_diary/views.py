from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from core_apps.daily_diary.models import DiaryDate, DiaryNotes
from core_apps.daily_diary.serializers import DiaryDateSerializer

# Create your views here.


class DiaryDateViewset(ModelViewSet):
    serializer_class = DiaryDateSerializer
    queryset = DiaryDate.objects.all()

    def get_queryset(self):
        user = self.request.user
        return DiaryDate.objects.filter(profile=user.profile)


class DiaryNotesChoicesView(APIView):

    @extend_schema(
        description="return a list with note_types as pair value",
        responses=OpenApiResponse(
            200,
            examples=[
                OpenApiExample(
                    "",
                    value=[
                        {"value": "string", "display_name": "string"},
                        {"value": "string", "display_name": "string"},
                        {"value": "string", "display_name": "string"},
                    ],
                )
            ],
        ),
    )
    def get(self, request):

        return Response(
            [
                {"value": value, "display_name": display_name}
                for value, display_name in DiaryNotes.DiaryCroices.choices
            ]
        )
