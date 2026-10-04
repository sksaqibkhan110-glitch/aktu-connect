import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, parse_qs, urlparse

# Base settings
BASE_URL = "https://www.abesit.in/library/question-paper-bank/"
DOWNLOAD_DIR = "raw_papers"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

# Targeted Semesters to download (e.g. 5th Sem)
TARGET_SEMS = ["5th Sem", "B.Tech-5th Sem"]

# Target Years (Last 5 Years)
TARGET_YEARS = ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26"]

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

session = requests.Session()

def fetch_soup(url):
    try:
        r = session.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        return BeautifulSoup(r.text, "html.parser")
    except Exception as e:
        print(f"❌ Failed to load {url}: {e}")
        return None

def download_file(pdf_url, filename):
    dest = os.path.join(DOWNLOAD_DIR, filename)
    if os.path.exists(dest):
        print(f"⏭️ Already exists: {filename}")
        return

    print(f"📥 Downloading: {filename}...")
    try:
        r = session.get(pdf_url, headers=HEADERS, stream=True, timeout=20)
        with open(dest, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Saved: {filename}")
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")

def scrape_semester_papers(sem_url, year_label):
    soup = fetch_soup(sem_url)
    if not soup:
        return

    # Look for all PDF file links inside this semester folder
    links = soup.find_all("a", href=True)
    for a in links:
        href = a["href"]
        text = a.get_text(strip=True)

        if href.lower().endswith(".pdf") or "download" in href.lower():
            full_pdf_url = urljoin(BASE_URL, href)

            # Match Subject Code from text or URL (e.g., BCS501, BCAI501, KCS501)
            raw_title = text if text else os.path.basename(href)
            match = re.search(r'([A-Z]{2,4}\d{3,4})', raw_title, re.I)
            
            if match:
                sub_code = match.group(1).upper()
                clean_name = f"{sub_code}_{year_label}.pdf"
            else:
                clean_name = f"{re.sub(r'[^a-zA-Z0-9]', '_', raw_title)[:20]}_{year_label}.pdf"

            download_file(full_pdf_url, clean_name)

def start_crawl():
    print("🚀 Connecting to ABESIT Question Paper Bank...")
    soup = fetch_soup(BASE_URL)
    if not soup:
        return

    # Find year folders
    year_links = {}
    for a in soup.find_all("a", href=True):
        text = a.get_text(strip=True)
        for yr in TARGET_YEARS:
            if yr in text:
                year_links[yr] = urljoin(BASE_URL, a["href"])

    print(f"📂 Found Year Folders: {list(year_links.keys())}")

    for yr, y_url in year_links.items():
        print(f"\n--- Checking Year: {yr} ---")
        y_soup = fetch_soup(y_url)
        if not y_soup:
            continue

        # Look for B.Tech or Semesters
        for a in y_soup.find_all("a", href=True):
            sub_text = a.get_text(strip=True)
            link = urljoin(BASE_URL, a["href"])

            # Check if this link points to targeted semester
            if any(s.lower() in sub_text.lower() for s in TARGET_SEMS):
                print(f"🎯 Found Semester Folder: {sub_text}")
                scrape_semester_papers(link, yr)
            elif "b.tech" in sub_text.lower() or "btech" in sub_text.lower():
                # Traverse inside B.Tech
                btech_soup = fetch_soup(link)
                if not btech_soup:
                    continue
                for b_a in btech_soup.find_all("a", href=True):
                    b_text = b_a.get_text(strip=True)
                    if any(s.lower() in b_text.lower() for s in TARGET_SEMS):
                        print(f"🎯 Found Semester Folder: {b_text}")
                        scrape_semester_papers(urljoin(BASE_URL, b_a["href"]), yr)

    print("\n🎉 All targeted papers downloaded into 'raw_papers' folder!")

if __name__ == "__main__":
    start_crawl()