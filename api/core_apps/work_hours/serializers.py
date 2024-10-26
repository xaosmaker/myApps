from rest_framework.serializers import ModelSerializer

from core_apps.work_hours.models import WorkShift


class WorkShiftSerializer(ModelSerializer):
    class Meta:
        model = WorkShift
        fields = ["pkid", "created_at", "company", "start_of_shift", "end_of_shift"]

    def create(self, validated_data):
        user = self.context["request"].user
        return WorkShift.objects.create(**validated_data, profile=user.profile)
