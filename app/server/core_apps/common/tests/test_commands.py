from django.test import SimpleTestCase


class CommandTests(SimpleTestCase):
    def test_for_gitHubActions_success(self):
        self.assertEqual(1, 1)


def test_something():
    assert 1 == 1
