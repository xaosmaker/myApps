from datetime import datetime

from rest_framework import serializers

from core_apps.gym_tracker.models import GymDay, GymMachine, GymTracker


class GymMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymMachine
        fields = ["pkid", "machine_name", "is_tracked_by_time"]


class GymTrackerSerializer(serializers.ModelSerializer):
    gym_machine = GymMachineSerializer(read_only=True)
    gym_machine_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = GymTracker
        fields = [
            "pkid",
            "gym_machine",
            "gym_sets",
            "gym_reps",
            "gym_weight",
            "gym_workout_time",
            "gym_dificulty",
            "gym_machine_id",
        ]

    def create(self, validated_data):

        user = self.context["request"].user
        print(validated_data)
        machine_day, _ = GymDay.objects.get_or_create(
            created_at__date=datetime.today().date(),
            profile=user.profile,
        )
        gym_machine_id = validated_data.pop("gym_machine_id")
        gym_machine = GymMachine.objects.get(pkid=gym_machine_id)
        print(gym_machine)

        tracker = GymTracker.objects.create(
            gym_day=machine_day, gym_machine=gym_machine, **validated_data
        )
        return tracker


class GymDaySerializer(serializers.ModelSerializer):
    gym_day = GymTrackerSerializer(many=True)

    class Meta:
        model = GymDay
        fields = ["created_at", "pkid", "gym_day"]
