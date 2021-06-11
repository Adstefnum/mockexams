import requests as r
from json import loads, dumps
from os import mkdir, chdir, listdir, getcwd
import threading
from sys import argv

class Parse:

    def __init__(self, data : str):
        self.data = loads(data)

    def refine(self) -> str:
        data = []
        for item in self.data['data']:
            del item['id']
            data.append(item)

        return dumps(data, indent = 1)

def info(year : int, subject : str):
    url = 'https://questions.aloc.ng/api/m?subject={}&year={}'.format(subject, year)
    data = r.get(url)
    data = Parse(data.content.decode('utf-8')).refine()

    f = open(subject + '/' +  str(year) + '.json', 'w')
    f.write(data)
    f.close()

if __name__ == '__main__':
    subject = []
    year = int(input('year to scrape from\n'))
    
    if argv != []:
        del argv[0]
        subject = list(argv)
    else:
        pass

    for item in subject:
        if item not in listdir(getcwd()):
            mkdir(item)
        else:
            pass
    
        for index, y in enumerate(range(2001, year)):
            print('thread ', index, ' started')
            x = threading.Thread(target = info, args=(y, item), daemon = False, group = None)
            x.start()
            #x.join()
            print('thread ', index, ' ended')
