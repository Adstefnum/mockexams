from django.shortcuts import render
from django.views.generic import ListView


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"

	def home(self, request):
		static = {'js' : 'home', 'css' : 'home'}
		return render(request, self.template_name, static)

	def note(self, request):
		static = {'js' : 'note', 'css' : 'note'}
		return render(request, self.template_name, static)

	def exam(self, request, examid, userid):
		static = {'js' : 'exam', 'css' : 'exam'}
		return render(request, self.template_name, static)

	def user(self, request, userid):
		static = {'js' : 'user', 'css' : 'user'}
		return render(request, self.template_name, static)

	def get_queryset(self):
		pass
