from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Task


class TaskApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_list_and_delete_task(self):
        created = self.client.post(
            "/api/tasks/", {"title": "write tests", "description": "smoke"}, format="json"
        )
        self.assertEqual(created.status_code, 201)
        task_id = created.json()["id"]

        listed = self.client.get("/api/tasks/")
        self.assertEqual(listed.status_code, 200)
        self.assertEqual([t["title"] for t in listed.json()], ["write tests"])

        deleted = self.client.delete(f"/api/tasks/{task_id}/")
        self.assertEqual(deleted.status_code, 204)
        self.assertFalse(Task.objects.exists())

    def test_title_is_required(self):
        response = self.client.post("/api/tasks/", {"description": "no title"}, format="json")
        self.assertEqual(response.status_code, 400)


class CorsAndConfigTests(TestCase):
    def test_only_configured_origins_receive_cors_headers(self):
        allowed = self.client.get("/api/tasks/", HTTP_ORIGIN="http://localhost:4200")
        self.assertEqual(allowed["Access-Control-Allow-Origin"], "http://localhost:4200")

        other = self.client.get("/api/tasks/", HTTP_ORIGIN="https://attacker.example")
        self.assertNotIn("Access-Control-Allow-Origin", other)

    def test_no_wildcards_or_committed_secret(self):
        self.assertNotIn("*", settings.ALLOWED_HOSTS)
        self.assertFalse(getattr(settings, "CORS_ALLOW_ALL_ORIGINS", False))
        self.assertFalse(settings.SECRET_KEY.startswith("django-insecure-"))
