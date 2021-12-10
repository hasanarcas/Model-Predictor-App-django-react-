from django.shortcuts import render
from django.http import JsonResponse
import joblib
import json
import pandas as pd
from django.core.files.storage import FileSystemStorage

model = joblib.load('modelPipeline.pkl')

# Create your views here.
def scoreJson(request):
    data = json.loads(request.body)
    df = pd.DataFrame({"x": data}).transpose()
    score = model.predict_proba(df)[:,-1][0]
    score = float(score)
    return JsonResponse({"score": score})

def scoreFile(request):
    fileObj= request.FILES["filePath"]
    fs= FileSystemStorage()
    filePathName= fs.save(fileObj.name, fileObj)
    filePathName= fs.url(filePathName)
    filePath= '.' +filePathName

    df = pd.read_csv(filePath)
    score = model.predict_proba(df)[:,-1]

    score= {j:k for j,k in zip(df["Loan_ID"], score)}
    score= sorted(score.items(), key=lambda x: x[1], reverse=True)
    return JsonResponse({"result": score})