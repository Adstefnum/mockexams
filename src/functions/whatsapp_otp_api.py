import requests

otp = request.POST['otp']
number = request.post['number']

try:
	request.post("https://wa.me/{number}?message={otp}")

except:
	retry