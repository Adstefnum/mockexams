from user_auth_api.models import userRecord
from django.shortcuts import redirect

def free_trials_decorator(request):
	current_user_id = request.user.id
	if userRecord.objects.filter(user__id=current_user_id).count() == 5 and user.has_paid == False:
		redirect('mockexamsapp:payment')