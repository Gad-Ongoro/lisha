from random import choice as rc
from rest_framework import views
from rest_framework.response import Response
from . import serializers
from . import utils
from bs4 import BeautifulSoup

class ScraperAPIView(views.APIView):
    serializer_class = serializers.WebScraperSerializer

    def get(self, request, *args, **kwargs):
        data = []
        search_term = request.query_params.get('search', None)

        if request.GET.get('product'):
            product = request.GET.get('product')
            html_content = utils.get_scrape_content(product)
            soup = BeautifulSoup(html_content, 'html.parser')

            product_items = soup.find_all('li', class_='grid__item')
            
            for item in product_items:
                name_tag = item.find('h3', class_='product-title').find('a')
                price_tag = item.find('span', class_='price-item')
                img_tag = item.find('img', class_='img-fluid')
                unit_of_measurement_tag = item.find('label', class_='color-swatch')

                if name_tag and price_tag and img_tag and unit_of_measurement_tag:
                    name = name_tag.text.strip()
                    price = price_tag.text.strip().replace('KSh', '')
                    img_url = img_tag.get('src') or img_tag.get('data-src', '')
                    unit_of_measurement = unit_of_measurement_tag.text.strip()
                    product_info = {
                        'name':name,
                        'price':price,
                        'image': img_url,
                        'unit_of_measurement':unit_of_measurement,
                        'quantity_available': rc(list(range(5, 20))),
                        'category': product
                    } 
                    data.append(product_info)

        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)
