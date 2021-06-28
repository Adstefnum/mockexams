from django.shortcuts import render
from django.views.generic import ListView


class IndexView(ListView):
	template_name = "mockexamsapp/index.html"

	def home(self, request):
		static = {'js' : 'home', 'css' : 'home'}
		return render(request, self.template_name, static)

	def register(self, request):
		static = {'js' : 'register', 'css' : 'signup'}
		return render(request, self.template_name, static)

	def login(self, request):
		static = {'js' : 'login', 'css' : 'signup'}
		return render(request, self.template_name, static)

	def exam(self, request):
		static = {'js' : 'exam', 'css' : 'exam'}
		return render(request, self.template_name, static)

	def get_queryset(self):
		pass
