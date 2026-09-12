import os
import re

RAW_DIR = os.path.abspath("raw_papers")
files = [f for f in os.listdir(RAW_DIR) if f.endswith(".pdf")]
print(f"Total PDFs found: {len(files)}")
print("\nSample 25 filenames in raw_papers:")
for f in files[:25]:
    print(" ->", f)