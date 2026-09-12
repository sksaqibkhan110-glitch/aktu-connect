import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

DOWNLOAD_DIR = os.path.abspath("raw_papers")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# 2025-26 5th Sem ka direct folder URL
TARGET_URL = "https://www.abesit.in/library/question-paper-bank/?dir=18721"
YEAR = "2025-26"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def download():
    print(f"🚀 Fetching direct files from: {TARGET_URL}")
    r = requests.get(TARGET_URL, headers=HEADERS, timeout=20)
    soup = BeautifulSoup(r.text, "html.parser")

    links = soup.find_all("a", href=True)
    downloaded = 0

    for a in links:
        href = a["href"]
        text = a.get_text(strip=True)
        raw_target = (text + " " + href).strip()

        # Sirf question papers ko filter karo (BCAI, BCS, BCAM, BCDS, KCS)
        match = re.search(r'\b(BC[A-Z0-9]{3,5}|KC[A-Z0-9]{3,5})\b', raw_target, re.I)
        if match and (".pdf" in raw_target.lower() or "download" in raw_target.lower() or "wp-content" in href):
            sub_code = match.group(1).upper()
            filename = f"{sub_code}_{YEAR}.pdf"
            dest = os.path.join(DOWNLOAD_DIR, filename)

            if os.path.exists(dest):
                print(f"⏭️ Already exists: {filename}")
                continue

            full_url = urljoin(TARGET_URL, href)
            print(f"📥 Downloading: {filename} ({text})")
            
            try:
                res = requests.get(full_url, headers=HEADERS, stream=True, timeout=25)
                if res.status_code == 200:
                    with open(dest, "wb") as f:
                        for chunk in res.iter_content(chunk_size=8192):
                            f.write(chunk)
                    print(f"✅ Saved: {filename}")
                    downloaded += 1
            except Exception as e:
                print(f"❌ Failed: {filename} -> {e}")

    print(f"\n🎉 Finished! Downloaded {downloaded} new papers to 'raw_papers'.")

if __name__ == "__main__":
    download()