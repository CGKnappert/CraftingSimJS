import requests
import urllib
import json
import os
import time
import numpy

//Better Class ACtion: https://xivapi.com/search?indexes=Action,CraftAction&filters=ClassJobTargetID=10&columns=ID,Name,Icon,ClassJobCategory.Name,Description,ActionCategory
//Better Recipe: https://xivapi.com/search?filters=ClassJob.ClassJobParentTargetID=11&columns=ID,Icon,Name,AmountIngredient0,AmountIngredient1,AmountIngredient2,AmountIngredient3,AmountIngredient4,AmountIngredient5,AmountIngredient6,AmountIngredient7,AmountIngredient8,AmountIngredient9,ClassJob.Abbreviation,ItemIngredient0.ID,ItemIngredient1.ID,ItemIngredient2.ID,ItemIngredient3.ID,ItemIngredient4.ID,ItemIngredient5.ID,ItemIngredient6.ID,ItemIngredient7.ID,ItemIngredient8.ID,ItemIngredient9.ID,ItemIngredient0.Name,ItemIngredient1.Name,ItemIngredient2.Name,ItemIngredient3.Name,ItemIngredient4.Name,ItemIngredient5.Name,ItemIngredient6.Name,ItemIngredient7.Name,ItemIngredient8.Name,ItemIngredient9.Name,ItemIngredient0.Icon,ItemIngredient1.Icon,ItemIngredient2.Icon,ItemIngredient3.Icon,ItemIngredient4.Icon,ItemIngredient5.Icon,ItemIngredient6.Icon,ItemIngredient7.Icon,ItemIngredient8.Icon,ItemIngredient9.Icon,RecipeLevelTable

jsonData = {}
results = []
page = 1
reqStr = "https://xivapi.com/search?indexes=Action,CraftAction&filters=ClassJobTargetID=10&columns=ID,Name,Icon,ClassJobCategory.Name,Description,Cost,Specialist,ActionCategory&priate_key=84a7f285475843a7a3d3900897c5fa57761259800f8b4875a43f53d1fc545232&page=" + page.__str__()
request = urllib.request.Request(reqStr)
request.add_header('User-Agent', '&lt;User-Agent&t;')
response = urllib.request.urlopen(request).read()
data = json.loads(response)
del data['Pagination']
jsonData = numpy.append(jsonData, data['Results'])
page += 1
actionArray = jsonData.tolist()
actionArray.pop(0)
//Format JSON in Notepad++ with Ctrl + Alt + Shift + M
write = open("C:\\Users\\cgkna\\Documents\\JSON Testing\\CraftAction.json", "w")
write.write(json.dumps(actionArray, sort_keys=True))
write.close()
//Get all JSON data for Recipes from xivapi.com
jsonData = {}
results = []
page = 1
while True:
    try:
        reqStr = "https://xivapi.com/Recipe?search=filters=ClassJob.ClassJobParentTargetID=11&columns=ID,Icon,Name,AmountIngredient0,AmountIngredient1,AmountIngredient2,AmountIngredient3,AmountIngredient4,AmountIngredient5,AmountIngredient6,AmountIngredient7,AmountIngredient8,AmountIngredient9,ClassJob.Abbreviation,ItemIngredient0.ID,ItemIngredient1.ID,ItemIngredient2.ID,ItemIngredient3.ID,ItemIngredient4.ID,ItemIngredient5.ID,ItemIngredient6.ID,ItemIngredient7.ID,ItemIngredient8.ID,ItemIngredient9.ID,ItemIngredient0.Name,ItemIngredient1.Name,ItemIngredient2.Name,ItemIngredient3.Name,ItemIngredient4.Name,ItemIngredient5.Name,ItemIngredient6.Name,ItemIngredient7.Name,ItemIngredient8.Name,ItemIngredient9.Name,ItemIngredient0.Icon,ItemIngredient1.Icon,ItemIngredient2.Icon,ItemIngredient3.Icon,ItemIngredient4.Icon,ItemIngredient5.Icon,ItemIngredient6.Icon,ItemIngredient7.Icon,ItemIngredient8.Icon,ItemIngredient9.Icon,RecipeLevelTable" + "&priate_key=84a7f285475843a7a3d3900897c5fa57761259800f8b4875a43f53d1fc545232&page=" + str(page)
        request = urllib.request.Request(reqStr)
        request.add_header('User-Agent', '&lt;User-Agent&t;')
        response = urllib.request.urlopen(request).read()
        data = json.loads(response)
        print(response)
        del data['Pagination']
        jsonData = numpy.append(jsonData, data['Results'])
        print(len(jsonData))
        time.sleep(.5)
        page += 1
    except urllib.error.HTTPError as e:
        break
recipeArray = jsonData.tolist()
recipeArray.pop(0)
recipeArray.pop(0)
//Format JSON in Notepad++ with Ctrl + Alt + Shift + M
write = open("C:\\Users\\cgkna\\Documents\\JSON Testing\\CraftRecipe.json", "w")
write.write(json.dumps(recipeArray, sort_keys=True))
write.close()ODO:coment, bln to overwrite or check for existing, make standard filepath from self:\Users\cgkna\Documents\JSON Testing\imgfileReader = open(r"C:\Users\cgkna\Documents\JSON Testing\CraftAction.json", "r", encoding="utf-8")
fileWritePath = r"C:\Users\cgkna\Documents\JSON Testing\img\CraftAction"
actionJSON = json.load(fileReader)//for each action in the JSON, read the icon's url and get the high quaility version of it, skip if it exists
for action in actionJSON:
    try:
        iconURL = "https://xivapi.com" + action["Icon"][0:len(action["Icon"]) - 4] + "_hr1.png"
        print(iconURL)        if not os.path.exists(fileWritePath + r"/" + action["Name"] + ".png"):
            fileName = os.path.join(fileWritePath, action["Name"] + ".png")            page = urllib.request.Request(iconURL, headers={'User-Agent': 'Mozilla/5.0'})
            pngPage = urllib.request.urlopen(page).read()
            open(fileName, 'wb').write(pngPage)
            time.sleep(.5)
    except: passfileReader = open(r"C:\Users\cgkna\Documents\JSON Testing\CraftRecipe.json", "r", encoding="utf-8")
fileWritePath = r"C:\Users\cgkna\Documents\JSON Testing\img\Recipe"
recipeJSON = json.load(fileReader)//for each recipe in the JSON, read the icon's url and get the high quaility version of it, skip if it exists
for action in recipeJSON:
    try:
        iconURL = "https://xivapi.com" + action["Icon"][0:len(action["Icon"]) - 4] + "_hr1.png"
        print(iconURL)        if not os.path.exists(fileWritePath + r"/" + action["Name"] + ".png"):
            print(fileWritePath + action["Name"] + ".png")
            fileName = os.path.join(fileWritePath, action["Name"] + ".png")            page = urllib.request.Request(iconURL, headers={'User-Agent': 'Mozilla/5.0'})
            pngPage = urllib.request.urlopen(page).read()
            open(fileName, 'wb').write(pngPage)
            time.sleep(.5)
    except: pass
