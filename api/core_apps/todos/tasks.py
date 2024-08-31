from time import sleep

from celery import shared_task


@shared_task(name="print_3_times")
def print_3_times():
    print("sleep 1")
    sleep(1)
    print("sleep 2")
    sleep(1)
    print("sleep 3")
    sleep(1)
