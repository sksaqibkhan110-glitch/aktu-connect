import os
import re
import time
from playwright.sync_api import sync_playwright

DOWNLOAD_DIR = os.path.abspath("raw_papers")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# 2025-26 5th Sem direct URL
FOLDER_URL = "https://www.abesit.in/library/question-paper-bank/?dir=18721"
YEAR = "2025-26"

def run():
    with sync_playwright() as p:
        print("🌐 Opening browser to fetch files...")
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(accept_downloads=True)
        page = context.new_page()

        page.goto(FOLDER_URL, timeout=60000)
        print("⏳ Waiting for files to load...")
        page.wait_for_load_state("networkidle")
        time.sleep(3)

        # Sirf question paper file elements ko target karo (ignoring navbar & headers)
        # In ABESIT, files have text like BCAI501, BCS054, etc.
        file_locators = page.locator("text=/BC[A-Z0-9]{3,5}|KC[A-Z0-9]{3,5}/i").all()
        print(f"🎯 Found {len(file_locators)} matching subject cards on screen.")

        downloaded = 0
        seen_codes = set()

        for card in file_locators:
            try:
                title = card.inner_text().strip()
                match = re.search(r'\b(BC[A-Z0-9]{3,5}|KC[A-Z0-9]{3,5})\b', title, re.I)
                if not match:
                    continue

                sub_code = match.group(1).upper()
                if sub_code in seen_codes:
                    continue
                seen_codes.add(sub_code)

                filename = f"{sub_code}_{YEAR}.pdf"
                dest = os.path.join(DOWNLOAD_DIR, filename)

                if os.path.exists(dest):
                    print(f"⏭️ Already exists: {filename}")
                    continue

                print(f"📥 Downloading: {filename} ({title[:35]}...)")
                with page.expect_download(timeout=15000) as download_info:
                    card.click()
                download = download_info.value
                download.save_as(dest)
                print(f"✅ Saved: {filename}")
                downloaded += 1
                time.sleep(1)

            except Exception as e:
                # Agar direct click se download trigger nahi hua, parent tag check karo
                continue

        browser.close()
        print(f"\n🎉 Done! Total {downloaded} files downloaded into 'raw_papers'.")

if __name__ == "__main__":
    run()