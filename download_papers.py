import os
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, parse_qs, urlparse

TARGET_URLS = [
    "https://abesit.in/library/question-paper-bank/?dir=18721"
]
RAW_DIR = "raw_papers"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5"
}

CORE_IDENTIFIERS = ("bcs", "kcs", "bcai", "kca", "bcds", "kds", "bit", "kit", "bec", "kec", "bcam", "koe", "501", "051", "052", "054", "055", "056")

EXCLUDE_TERMS = {
    "civil", "mechanical", "bce", "bme", "kce", "kme", 
    "uptac", "ssr", "naac", "code", "conduct", "syllabus", "notice", "nba", 
    "media", "committee", "facility", "auditorium", "seminar", "about", "management", "medical", "downloads",
    "scholarship", "iic", "ieee", "incubation", "investors", "iqac", "nirf", "aisp", "tour", "convocation"
}

os.makedirs(RAW_DIR, exist_ok=True)

def download_semester_papers():
    downloaded_count = 0
    for url in TARGET_URLS:
        print(f"\n🎯 Fetching papers from: {url}")
        try:
            response = requests.get(url, headers=HEADERS, timeout=15)
            if response.status_code != 200:
                print(f"❌ Failed to fetch, status: {response.status_code}")
                continue
        except Exception as e:
            print(f"❌ Connection error: {e}")
            continue
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try to find the main content section if possible, otherwise inspect all <a> tags
        # but filter out navigation/header links
        links = soup.find_all('a', href=True)
        print(f"📁 Found {len(links)} total links on page. Filtering content...\n")
        
        for link in links:
            href = link['href']
            text = link.get_text(strip=True)
            
            if not text or len(text) < 3:
                continue
                
            text_lower = text.lower()
            
            # Skip navigation / menu keywords
            if any(ex in text_lower for ex in EXCLUDE_TERMS):
                continue
                
            # Check if text contains core identifiers (subject codes)
            is_valid_paper = any(identifier in text_lower for identifier in CORE_IDENTIFIERS)
            
            if is_valid_paper:
                file_name = text if text.endswith('.pdf') else text + ".pdf"
                file_name = file_name.replace("/", "_").replace("\\", "_").strip()
                
                file_url = urljoin(url, href)
                file_path = os.path.join(RAW_DIR, file_name)
                
                if os.path.exists(file_path):
                    print(f"   ⚡ Already exists: {file_name}")
                    continue
                    
                print(f"   📥 Downloading Core Paper: {file_name}...")
                try:
                    pdf_res = requests.get(file_url, headers=HEADERS, stream=True, timeout=30)
                    if pdf_res.status_code == 200:
                        with open(file_path, 'wb') as f:
                            for chunk in pdf_res.iter_content(chunk_size=8192):
                                f.write(chunk)
                        print(f"   ✅ Saved: {file_name}")
                        downloaded_count += 1
                    else:
                        print(f"   ❌ Failed status: {pdf_res.status_code}")
                except Exception as e:
                    print(f"   ❌ Error: {e}")
                
                time.sleep(0.3)
                    
    print(f"\n🎉 Successfully downloaded {downloaded_count} core 5th semester papers!")

if __name__ == "__main__":
    download_semester_papers()