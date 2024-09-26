from datetime import datetime

from rest_framework import serializers

from core_apps.nutritions.models import FoodData, Nutrition, NutritionDay


class NutritionSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source="food.food", read_only=True)

    class Meta:
        model = Nutrition
        fields = ["eat_time", "quantity", "food_name", "food", "total_calories"]
        read_only_fields = ["total_calories"]
        extra_kwargs = {"food": {"write_only": True}}

    def create(self, validated_data):
        user = self.context["request"].user
        print(user)

        nutrition_day, _ = NutritionDay.objects.get_or_create(
            created_at__date=datetime.today().date(),
            profile=user.profile,
        )
        nutrition = Nutrition.objects.create(
            nutrition_day=nutrition_day, **validated_data
        )
        nutrition.total_calories = nutrition.quantity * nutrition.food.callories
        nutrition.save()

        return nutrition


class NutritionDaySerializer(serializers.ModelSerializer):
    nutrition_day = NutritionSerializer(many=True)

    class Meta:
        model = NutritionDay
        fields = ["total_foods_calories", "created_at", "nutrition_day"]


class FoodDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodData
        fields = ["food", "quantity", "callories", "pkid"]
