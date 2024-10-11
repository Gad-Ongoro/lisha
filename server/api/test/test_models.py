from django.test import TestCase
from api.models import User, Profile, Product, Order, Cart, Review
from uuid import uuid4

class UserModelTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            id=uuid4(),
            first_name="Anon",
            last_name="User",
            email="anonuser@gmail.com",
            password="AnonPassword123",
        )
    
    # test user creation
    def test_user_creation(self):
        self.assertEqual(self.user.email, "anonuser@gmail.com")
        self.assertTrue(self.user.check_password("AnonPassword123"))

    # test profile creation through post save signal
    def test_profile_created_post_save(self):
        profile = Profile.objects.get(user=self.user)
        self.assertIsNotNone(profile)
        self.assertEqual(profile.user, self.user)

# products
class ProductModelTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            id=uuid4(),
            first_name="Anon",
            last_name="User",
            email="anonuser@gmail.com",
            password="AnonPassword123",
        )
        self.product = Product.objects.create(
            user=self.user,
            name="Apple",
            description="A fresh apple",
            category="Fruits",
            price=100,
            quantity_available=100,
            unit_of_measurement="kg",
            perishable=True,
            expiration_date="2024-12-31"
        )
    
    def test_product_creation(self):
        """Test that a product is created with correct details."""
        self.assertEqual(self.product.name, "Apple")
        self.assertEqual(self.product.price, 100)
        self.assertEqual(self.product.quantity_available, 100)
        self.assertTrue(self.product.perishable)

# orders
class OrderModelTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            id=uuid4(),
            first_name="Anon",
            last_name="User",
            email="anonuser@gmail.com",
            password="AnonPassword123",
        )
        self.product = Product.objects.create(
            user=self.user,
            name="Banana",
            description="A ripe banana",
            category="Fruits",
            price=100,
            quantity_available=100,
            unit_of_measurement="kg",
            perishable=True,
            expiration_date="2024-12-31"
        )
        self.order = Order.objects.create(
            user=self.user,
            phone_number="254708098708",
            product=self.product,
            quantity=5,
            total_price=500,
            order_status="Pending",
            order_source="web"
        )

    def test_order_creation(self):
        self.assertEqual(self.order.product, self.product)
        self.assertEqual(self.order.total_price, 500)
        self.assertEqual(self.order.order_status, "Pending")
        self.assertEqual(self.order.order_source, "web")

# cart    
class CartModelTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            id=uuid4(),
            first_name="Anon",
            last_name="User",
            email="anonuser@gmail.com",
            password="AnonPassword123",
        )
        self.product = Product.objects.create(
            user=self.user,
            name="Orange",
            description="A juicy orange",
            category="Fruits",
            price=100,
            quantity_available=100,
            unit_of_measurement="kg",
            perishable=True,
            expiration_date="2024-12-31"
        )
        self.cart = Cart.objects.create(
            user=self.user,
            product=self.product,
            quantity=3,
            total_price=2.40
        )

    def test_cart_creation(self):
        self.assertEqual(self.cart.user, self.user)
        self.assertEqual(self.cart.product, self.product)
        self.assertEqual(self.cart.total_price, 2.40)
        
class ReviewModelTest(TestCase):
    
    def setUp(self):
        self.reviewer = User.objects.create_user(
            id=uuid4(),
            first_name="Anon",
            last_name="User",
            email="anonuser@gmail.com",
            password="AnonPassword123",
        )
        self.reviewee = User.objects.create_user(
            email="seller@gmail.com",
            password="password123",
        )
        self.product = Product.objects.create(
            user=self.reviewee,
            name="Mango",
            description="A sweet mango",
            category="Fruits",
            price=1.00,
            quantity_available=50,
            unit_of_measurement="kg",
            perishable=True,
            expiration_date="2024-12-31"
        )
        self.review = Review.objects.create(
            product=self.product,
            reviewer=self.reviewer,
            reviewee=self.reviewee,
            rating=5,
            text="Great quality product!"
        )

    def test_review_creation(self):
        self.assertEqual(self.review.reviewer, self.reviewer)
        self.assertEqual(self.review.reviewee, self.reviewee)
        self.assertEqual(self.review.product, self.product)
        self.assertEqual(self.review.rating, 5)
        self.assertEqual(self.review.text, "Great quality product!")
