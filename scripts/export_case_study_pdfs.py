"""
Export interview case study pages as PDFs via Playwright.

Usage:
  npm run build
  npm run export:case-studies
"""

from __future__ import annotations

import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "portfolio-context" / "case-studies"
SLUGS = [
    "oscar-emr-api-integration",
    "referral-radar",
    "treatment-extension-requests",
    "provider-invoice-submission",
]


def wait_for_server(url: str, timeout_s: int = 120) -> None:
    import urllib.error
    import urllib.request

    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return
        except (urllib.error.URLError, TimeoutError):
            time.sleep(1)
    raise RuntimeError(f"Server did not become ready at {url}")


def export_case_study_pdfs(base_url: str) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1100, "height": 900})

        for slug in SLUGS:
            url = f"{base_url}/case-study-export/{slug}"
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(800)
            page.add_style_tag(
                content=(
                    "header, footer { display: none !important; } "
                    "main { padding-top: 0 !important; } "
                    ".pointer-events-none.fixed { display: none !important; }"
                )
            )
            page.wait_for_timeout(300)

            output_path = OUTPUT_DIR / f"{slug}.pdf"
            temp_path = OUTPUT_DIR / f"{slug}.tmp.pdf"
            try:
                page.pdf(
                    path=str(temp_path),
                    format="Letter",
                    print_background=True,
                    prefer_css_page_size=True,
                    margin={
                        "top": "0.5in",
                        "right": "0.5in",
                        "bottom": "0.5in",
                        "left": "0.5in",
                    },
                )
                if output_path.exists():
                    output_path.unlink()
                temp_path.replace(output_path)
                print(f"Saved case study PDF: {output_path.relative_to(ROOT)}")
            except PermissionError:
                if temp_path.exists():
                    fallback = OUTPUT_DIR / f"{slug}-new.pdf"
                    temp_path.replace(fallback)
                    print(
                        f"WARNING: Could not overwrite locked file. "
                        f"Saved instead: {fallback.relative_to(ROOT)}"
                    )
                else:
                    raise

        browser.close()


def main() -> int:
    port = 3457
    base_url = f"http://127.0.0.1:{port}"

    server = subprocess.Popen(
        ["npx", "next", "start", "-p", str(port)],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        shell=True,
    )
    try:
        wait_for_server(f"{base_url}/case-study-export/oscar-emr-api-integration")
        export_case_study_pdfs(base_url)
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except subprocess.TimeoutExpired:
            server.kill()

    print(f"Done. {len(SLUGS)} PDF(s) in portfolio-context/case-studies/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
