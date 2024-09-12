from rest_framework import serializers

from core_apps.daily_diary.models import DiaryDate, DiaryNotes


class DiaryNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiaryNotes
        fields = ["pkid", "note_type", "time", "note"]


class DiaryDateSerializer(serializers.ModelSerializer):

    diary_date = DiaryNoteSerializer(many=True)

    class Meta:
        model = DiaryDate
        fields = ["pkid", "date", "diary_date"]
        read_only_fields = ["pkid"]
