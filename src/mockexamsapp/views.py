from django.shortcuts import render
from django.views.generic import ListView
from user_auth_api.models import userRecord


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"

	def home(self, request):
		static = {'js' : 'home', 'css' : 'home'}
		return render(request, self.template_name, static)

	def note(self, request):
		static = {'js' : 'note', 'css' : 'note'}
		return render(request, self.template_name, static)

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
