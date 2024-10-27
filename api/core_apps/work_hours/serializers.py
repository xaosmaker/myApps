from rest_framework.serializers import ModelSerializer

from core_apps.work_hours.models import WorkDay, WorkShift


class WorkShiftSerializer(ModelSerializer):
    class Meta:
        model = WorkShift
        fields = ["pkid", "created_at", "company", "start_of_shift", "end_of_shift"]

    def create(self, validated_data):
        user = self.context["request"].user
        return WorkShift.objects.create(**validated_data, profile=user.profile)


class WorkDaySerializer(ModelSerializer):
    class Meta:
        model = WorkDay
        fields = [
            "pkid",
            "type_of_work_day",
            "work_day_shift",
            "date_start",
            "date_end",
            "location",
            "start_of_work",
            "end_of_work",
            "comment",
        ]

    def create(self, validated_data):
        print(validated_data)
        user = self.context["request"].user
        return WorkDay.objects.create(**validated_data, profile=user.profile)
