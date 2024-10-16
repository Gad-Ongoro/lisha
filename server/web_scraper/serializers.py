from rest_framework import serializers

class WebScraperSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.CharField()
    image = serializers.URLField()
    unit_of_measurement = serializers.CharField()
    quantity_available = serializers.IntegerField()
    category = serializers.CharField()
