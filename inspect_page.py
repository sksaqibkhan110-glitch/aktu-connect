import requests
from bs4 import BeautifulSoup

url = "https://abesit.in/library/question-paper-bank/?dir=18721"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, 'html.parser')

print(f"Total links found: {len(soup.find_all('a'))}\n")
for idx, a in enumerate(soup.find_all('a', href=True)[:30]):  # Pehle 30 links print karega
    print(f"[{idx}] Text: '{a.get_text(strip=True)}' | Href: '{a['href']}'")