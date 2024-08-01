import random
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import CustomUser, Product, Order, Review
from uuid import uuid4
from django.utils import timezone
from datetime import timedelta

import os
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

class Command(BaseCommand):
    help = 'Seeds the database with initial data'
    faker = Faker()
    
    products = [
        {
            "name": "Fresh Veges",
            "description": "Fresh, nutritious vegetables for healthy meals.",
            "category" : "Vegetables",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image" : "https://i.pinimg.com/474x/4d/37/e0/4d37e0b74d90e3e9721fac14a9f16486.jpg",
        },
        {
            "name": "Cabbages",
            "description": "Fresh, crunchy cabbage: vibrant green, perfect for salads and cooking.",
            "category" : "Vegetables",
            "price":random.uniform(60.0, 150.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'Piece',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image" : "https://i.pinimg.com/564x/b3/52/e6/b352e6ae2bc10e8bbae306c7fde63588.jpg",
        },
        {
            "name": "Fresh Fruits",
            "description": "Juicy, ripe fruits picked fresh for and tasty treats.",
            "category" : "Fruits",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/89/32/c3/8932c310d11c3fe7c8df0b157e0c9c98.jpg",
        },
        {
            "name": "Pineapples",
            "description": "Tropical, sweet, juicy fruit with spiky, golden-brown exterior. Refreshing and delicious.",
            "category" : "Fruits",
            "price":random.uniform(100.0, 200.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'Piece',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/d7/4a/e0/d74ae0d7e7b579deea8588ff7654212f.jpg",
        },
        {
            "name": "Fresh Eggs",
            "description": "Fresh eggs for easy cooking.",
            "category" : "Eggs",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/cf/01/56/cf01569b1986f1efd022dacc555f25fb.jpg",
        },
        {
            "name": "Chicken Eggs",
            "description": "Fresh chicken eggs: versatile, creamy yolk, firm white, perfect for cooking.",
            "category" : "Eggs",
            "price":random.uniform(400.0, 600.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'Tray',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/564x/4d/66/00/4d660037b81b4b1b46d57a9484fae95f.jpg",
        },
        {
            "name": "Fresh Fish & Seafood",
            "description": "Fresh, healthy fish and seafood for easy cooking.",
            "category" : "Fish & Seafood",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/f0/72/4b/f0724b0e65f3cc0cacd717445b2b4b7f.jpg",
        },
        {
            "name": "Tilapia",
            "description": "Mild-flavored, firm, white fish with tender, flaky texture. Versatile for grilling, baking, or frying.",
            "category" : "Fish & Seafood",
            "price":random.uniform(50.0, 250.0),
            "quantity_available":random.randint(10, 50),
            "unit_of_measurement":'kg',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/564x/18/13/04/181304c3d34469cf8a39927290ca2791.jpg",
        },
        {
            "name": "Fresh Meat & Poultry",
            "description": "Fresh, healthy meat and poultry for easy cooking.",
            "category" : "Meat & Poultry",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/564x/e5/9b/51/e59b51d7363231421d70505a39de5df8.jpg",
        },
        {
            "name": "Chicken Meat",
            "description": "Tender, versatile, lean protein with mild flavor. Perfect for various dishes..",
            "category" : "Meat & Poultry",
            "price":random.uniform(1000.0, 2000.0),
            "quantity_available":random.randint(10, 50),
            "unit_of_measurement":'kg',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/564x/3e/2c/c5/3e2cc53507ff9ac7e0c0adafbb477249.jpg",
        },
        {
            "name": "Grains & Cereals",
            "description": "Natural grains and cereals for healthy cooking.",
            "category" : "Grains & Cereals",
            "price":random.uniform(10.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'kg',
            "perishable":bool(random.getrandbits(1)),
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/0a/33/65/0a33652aafafc8bfdd56029dc6587668.jpg",
        },
        {
            "name": "Maize",
            "description": "Yellow, nutrient-rich grain with a sweet flavor. Versatile in cooking.",
            "category" : "Grains & Cereals",
            "price":random.uniform(3000.0, 6000.0),
            "quantity_available":random.randint(10, 50),
            "unit_of_measurement":'Sack',
            "perishable":False,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/564x/5e/59/16/5e59162004810157da1a3b2aaec698e0.jpg",
        },
        {
            "name": "Bee Products",
            "description": "Natural bee products, pure and beneficial for wellness.",
            "category" : "Bee Products",
            "price":random.uniform(300.0, 900.0),
            "quantity_available":random.randint(1, 10),
            "unit_of_measurement":'kg',
            "perishable":False,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/69/b6/d6/69b6d69e63c70710035edf2ee427f441.jpg",
        },
        {
            "name": "Fresh Dairy Products",
            "description": "Rich in protein and essential nutrients.",
            "category" : "Dairy Products",
            "price":random.uniform(50.0, 100.0),
            "quantity_available":random.randint(1, 50),
            "unit_of_measurement":'Litres',
            "perishable":True,
            "expiration_date":timezone.now() + timedelta(days=random.randint(1, 100)),
            "image": "https://i.pinimg.com/474x/1c/20/8d/1c208d753708b5d06d9341d233d78917.jpg",
        }
    ]

    def add_arguments(self, parser):
        parser.add_argument('records', type=int, help='The number of records to seed')

    def handle(self, *args, **kwargs):
        records = kwargs['records']
        self.stdout.write(f'Seeding {records} records...')
        
        self.reset_db()
        
        self.create_users(records)
        self.create_products(records)
        self.create_orders(records)
        self.create_reviews(records)
        
        self.stdout.write('Data seeded successfully.')

    def reset_db(self):
        self.stdout.write('Resetting the database...')
        CustomUser.objects.all().delete()
        Product.objects.all().delete()
        Order.objects.all().delete()
        Review.objects.all().delete()
        self.stdout.write('Database reset completed.')

    def create_users(self, records):
        for _ in range(records):
            email = self.faker.email()
            role = random.choice(['buyer', 'seller'])
            user = CustomUser.objects.create_user(
                id=uuid4(),
                first_name=self.faker.first_name(),
                last_name=self.faker.last_name(),
                username=self.faker.user_name(),
                role=role,
                email=email,
                password=self.faker.password(),
                is_verified=random.choice([True, False]),
            )

    # def create_products(self, records):
    #     users = CustomUser.objects.all()
    #     for _ in range(records):
    #         user = random.choice(users) if user.role == 'seller' else None
    #         Product.objects.create(
    #             id=uuid4(),
    #             user=user,
    #             name=self.faker.word(),
    #             description=self.faker.text(),
    #             category=self.faker.word(),
    #             price=random.uniform(10.0, 100.0),
    #             quantity_available=random.randint(1, 50),
    #             unit_of_measurement='kg',
    #             perishable=bool(random.getrandbits(1)),
    #             expiration_date=timezone.now() + timedelta(days=random.randint(1, 100)),
    #             image=f'product_images/{self.faker.word()}.jpg',
    #         )
            
    def create_products(self, records):
        sellers = CustomUser.objects.filter(role='seller')
    
        if not sellers.exists():
            self.stdout.write('No sellers found, skipping product creation.')
            return

        for product in self.products:
            user = random.choice(sellers)
            image_url = product['image']
            image_temp = NamedTemporaryFile(delete=True)
            
            # Download the image
            response = requests.get(image_url)
            image_temp.write(response.content)
            image_temp.flush()

            # Get the filename from the URL
            image_name = os.path.basename(image_url)
            
            product_instance = Product.objects.create(
                id=uuid4(),
                user=user,
                name=product['name'],
                description=product['description'],
                category=product['category'],
                price=product['price'],
                quantity_available=product['quantity_available'],
                unit_of_measurement=product['unit_of_measurement'],
                perishable=product['perishable'],
                expiration_date=product['expiration_date'],
            )
            
            # Save the image to the product instance
            product_instance.image.save(image_name, File(image_temp))


    def create_orders(self, records):
        users = CustomUser.objects.all()
        products = Product.objects.all()
        for _ in range(records):
            user = random.choice(users)
            product = random.choice(products)
            Order.objects.create(
                id=uuid4(),
                user=user,
                product=product,
                quantity=random.randint(1, 10),
                total_price=product.price * random.randint(1, 10),
                order_status='Pending',
            )

    def create_reviews(self, records):
        users = CustomUser.objects.all()
        products = Product.objects.all()
        for _ in range(records):
            reviewer = random.choice(users)
            reviewee = random.choice(users)
            product = random.choice(products)
            Review.objects.create(
                id=uuid4(),
                product=product,
                reviewer=reviewer,
                reviewee=reviewee,
                rating=random.randint(1, 5),
                text=self.faker.text(),
            )