"""
Export portfolio images as JPG:
1. Screenshot React diagram artifacts from /diagram-export
2. Convert PNG/GIF/WebP files under portfolio-context/ to JPG in portfolio-context/jpg/
"""

from __future__ import annotations

import subprocess
import sys
import time
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO_CONTEXT = ROOT / "portfolio-context"
JPG_ROOT = PORTFOLIO_CONTEXT / "jpg"
ARTIFACTS = PORTFOLIO_CONTEXT / "artifacts"
DIAGRAM_EXPORTS = [
    ("#provider-segment-diagram", ARTIFACTS / "provider-segment-diagram.jpg"),
    ("#migration-coordination-diagram", ARTIFACTS / "migration-coordination-diagram.jpg"),
]
IMAGE_SUFFIXES = {".png", ".gif", ".webp", ".bmp", ".tiff"}


def ensure_dirs() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    JPG_ROOT.mkdir(parents=True, exist_ok=True)


def wait_for_server(url: str, timeout_s: int = 90) -> None:
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


def export_diagram_jpgs(base_url: str) -> None:
    viewport = {"width": 1280, "height": 900}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport=viewport, device_scale_factor=2)
        page.goto(f"{base_url}/diagram-export", wait_until="networkidle")
        page.wait_for_timeout(500)

        for selector, output_path in DIAGRAM_EXPORTS:
            element = page.locator(selector)
            element.wait_for(state="visible", timeout=15000)
            png_bytes = element.screenshot(type="png")
            image = Image.open(__import__("io").BytesIO(png_bytes)).convert("RGB")
            image.save(output_path, "JPEG", quality=92, optimize=True)
            print(f"Saved diagram: {output_path.relative_to(ROOT)}")

        browser.close()


def convert_portfolio_images() -> int:
    count = 0
    for source in PORTFOLIO_CONTEXT.rglob("*"):
        if not source.is_file():
            continue
        if source.suffix.lower() not in IMAGE_SUFFIXES:
            continue
        if JPG_ROOT in source.parents or source.parent == ARTIFACTS:
            continue

        relative = source.relative_to(PORTFOLIO_CONTEXT)
        target = JPG_ROOT / relative.with_suffix(".jpg")
        target.parent.mkdir(parents=True, exist_ok=True)

        with Image.open(source) as image:
            rgb = image.convert("RGB")
            rgb.save(target, "JPEG", quality=90, optimize=True)
        print(f"Converted: {relative} -> jpg/{relative.with_suffix('.jpg')}")
        count += 1
    return count


def main() -> int:
    ensure_dirs()
    port = 3456
    base_url = f"http://127.0.0.1:{port}"

    server = subprocess.Popen(
        ["npm", "run", "start", "--", "-p", str(port)],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        shell=True,
    )
    try:
        wait_for_server(f"{base_url}/diagram-export")
        export_diagram_jpgs(base_url)
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except subprocess.TimeoutExpired:
            server.kill()

    converted = convert_portfolio_images()
    print(f"Done. Converted {converted} portfolio-context image(s) to JPG under portfolio-context/jpg/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
