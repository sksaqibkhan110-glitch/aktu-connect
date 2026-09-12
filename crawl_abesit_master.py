import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

DOWNLOAD_DIR = os.path.abspath("raw_papers")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

BASE_URL = "https://www.abesit.in/library/question-paper-bank/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

session = requests.Session()
session.headers.update(HEADERS)

visited_dirs = set()

def detect_year_from_text(text):
    # 2025-26, 2024-25, 2023-24, 2022-23, 2019-20 wagairah detect karta hai
    m = re.search(r'20\d{2}-\d{2}', text)
    return m.group(0) if m else None

def crawl_directory(dir_id, current_year=None):
    if dir_id in visited_dirs:
        return
    visited_dirs.add(dir_id)

    folder_url = f"{BASE_URL}?dir={dir_id}"
    print(f"\n📂 Scanning Directory [ID: {dir_id}] -> {folder_url}")

    try:
        r = session.get(folder_url, timeout=25)
        soup = BeautifulSoup(r.text, "html.parser")
    except Exception as e:
        print(f"❌ Failed to load dir {dir_id}: {e}")
        return

    # Breadcrumb ya page context se academic year update karo
    page_text = soup.get_text()
    found_year = detect_year_from_text(page_text)
    if found_year:
        current_year = found_year

    # 1. Is folder ke andar jitne Question Paper PDFs hain unhe download karo
    file_divs = soup.find_all("div", class_=lambda c: c and "is_file" in c)
    print(f"📑 Files found in folder: {len(file_divs)}")

    for f_div in file_divs:
        raw_title = f_div.get("title", "").strip()
        
        # Download link extract karo
        a_tag = f_div.find("a", href=True)
        download_url = urljoin(BASE_URL, a_tag["href"]) if a_tag else None

        # Faltu college uploads ko ignore karo
        if any(bad in raw_title.lower() for bad in ["ssr", "naac", "uptac", "syllabus", "conduct", "convocation"]):
            continue

        # Real AKTU Subject Code extract karo (e.g. RCS-501, RCE-052, BCS501, KCS501, BCAI501)
        # Search for pattern anywhere in the title
        all_codes = re.findall(r'\b([A-Z]{2,4}[- ]?\d{3,4}[A-Z]?)\b', raw_title, re.I)
        
        if all_codes:
            # Title me se actual valid code choose karo (ignoring words like 'AND', 'THE')
            valid_codes = [c for c in all_codes if any(char.isdigit() for char in c)]
            sub_code = valid_codes[-1].upper().replace(" ", "").replace("-", "") if valid_codes else all_codes[0].upper()
        else:
            sub_code = re.sub(r'[^A-Za-z0-9]', '', raw_title)[:8].upper()

        year_label = current_year if current_year else "UNKNOWN_YEAR"
        clean_filename = f"{sub_code}_{year_label}.pdf"
        dest_path = os.path.join(DOWNLOAD_DIR, clean_filename)

        if os.path.exists(dest_path):
            print(f"⏭️ Already exists: {clean_filename}")
            continue

        if download_url:
            print(f"📥 Downloading: {clean_filename} ({raw_title})")
            try:
                res = session.get(download_url, stream=True, timeout=30)
                if res.status_code == 200 and len(res.content) > 5000:
                    with open(dest_path, "wb") as f:
                        for chunk in res.iter_content(chunk_size=8192):
                            f.write(chunk)
                    print(f"✅ Saved: {clean_filename}")
            except Exception as ex:
                print(f"⚠️ Download failed for {clean_filename}: {ex}")

    # 2. Saare Subdirectories (Years, Branches, Semesters) me recursively jao
    dir_divs = soup.find_all("div", class_=lambda c: c and "is_dir" in c)
    for d_div in dir_divs:
        sub_dir_id = d_div.get("data-id")
        dir_title = d_div.get("title", "")
        
        if sub_dir_id and sub_dir_id not in visited_dirs:
            sub_year = detect_year_from_text(dir_title) or current_year
            crawl_directory(sub_dir_id, current_year=sub_year)

if __name__ == "__main__":
    print("🚀 Starting Automated Archive Scraper across all years and branches...")
    # Root folder ID 5079 se start hoga aur har folder traverse karega
    crawl_directory("5079")
    print("\n🎉 Entire archive crawler finished! All papers saved to 'raw_papers'.")