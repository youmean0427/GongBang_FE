from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser

@csrf_exempt
def signup(request):
    # 회원 가입
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        try:
            login_id = Account.objects.get(login_id = data['login_id'])
        except:
            login_id = None
     
        if serializer.is_valid():
            if login_id is None:
                serializer.save()
                return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def account(request, pk):

    obj = Account.objects.get(pk=pk)
    # 회원 정보 조회
    if request.method == 'GET':
        serializer = AccountSerializer(obj)
        return JsonResponse(serializer.data, safe=False)
    # 회원 정보 수정
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(obj, data=data)
        try:
            login_id = Account.objects.get(login_id = data['login_id'])
        except:
            login_id = None
        
        if serializer.is_valid():
            if login_id is None:
                serializer.save()
                return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    # 회원 정보 삭제
    elif request.method == 'DELETE':
        obj.delete()
        return HttpResponse(status=204)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_id = data['login_id']
        obj = Account.objects.get(login_id=search_id)

        if data['password'] == obj.password:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)