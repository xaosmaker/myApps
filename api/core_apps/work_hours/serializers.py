from rest_framework import serializers
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
            "date",
            "location",
            "start_of_work",
            "end_of_work",
            "comment",
        ]

    def validate(self, attrs):
        val_attrs = super().validate(attrs)
        work_day = val_attrs.get("type_of_work_day")
        shift = val_attrs.get("work_day_shift")

        if work_day in ["Travel", "Work Day"] and not shift:
            raise serializers.ValidationError({"word_day_shift": "Shift is Required"})

        return val_attrs

    def create(self, validated_data):

        user = self.context["request"].user
        return WorkDay.objects.create(**validated_data, profile=user.profile)
