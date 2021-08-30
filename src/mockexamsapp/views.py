from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from user_auth_api.models import userRecord
from django.http import JsonResponse
from pathlib import Path
from toml.decoder import load


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"
	
	def readTomlDb(self):
	
		return load(Path(__file__).resolve().parent / "database.toml")

	def home(self, request):
		static = {'js' : 'home', 'css' : 'home'}
		return render(request, self.template_name, static)

	def auth(self, request):
		static = {'js' : 'authenticate', 'css' : 'authenticate'}
		return render(request, self.template_name, static)
	
	@csrf_exempt
	def sm(self, request):
	
		if request.method == 'POST':
				
				data = self.readTomlDb()
				return JsonResponse(data['dbschema']['social-media'], safe = True)
				
	@csrf_exempt
	def note(self, request):
		
		if request.method == 'GET':
		
			static = {'js' : 'note', 'css' : 'note'}
			return render(request, self.template_name, static)
		elif request.method == 'POST':
		
			data = self.readTomlDb()
			if request.path == '/terms':
			
				return JsonResponse(data['dbschema']['note']['Terms'], safe = False)
			elif request.path == '/policy':
				
				return JsonResponse(data['dbschema']['note']['Policy'], safe = False)
			elif request.path == '/devs':
			
				return JsonResponse(data['dbschema']['note']['Devs'], safe = False)
			elif request.path == '/faq':
			
				return JsonResponse(data['dbschema']['note']['FAQ'], safe = False)
			else:
			
				return JsonResponse('Error', safe = False)

	def exam(self, request, examid, userid):
		current_user_id = request.user.id
		if userRecord.objects.filter(user__id=current_user_id).count() == 5 and user.has_paid == False:
			return self.payment(request)
		else:
			static = {'js' : 'exam', 'css' : 'exam'}
			return render(request, self.template_name, static)

	def user(self, request, userid):
		static = {'js' : 'user', 'css' : 'user'}
		return render(request, self.template_name, static)

	def payment(self, request) :
		static = {'js' : 'payment', 'css' : 'payment'}
		return render(request, self.template_name, static)

	def get_queryset(self):
		pass
