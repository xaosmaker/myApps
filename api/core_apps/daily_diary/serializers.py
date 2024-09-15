import datetime

from rest_framework import serializers

from core_apps.daily_diary.models import DiaryDate, DiaryNotes


class DiaryNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiaryNotes
        fields = ["pkid", "note_type", "time", "note"]

    def create(self, validated_data):
        user = self.context["request"].user
        today = datetime.date.today()
        diary_date, created = DiaryDate.objects.get_or_create(
            date=today, profile=user.profile
        )
        diary_note = DiaryNotes.objects.create(diary_date=diary_date, **validated_data)
        return diary_note


class DiaryDateSerializer(serializers.ModelSerializer):

    diary_date = DiaryNoteSerializer(many=True)

    class Meta:
        model = DiaryDate
        fields = ["pkid", "date", "diary_date"]
        read_only_fields = ["pkid"]
