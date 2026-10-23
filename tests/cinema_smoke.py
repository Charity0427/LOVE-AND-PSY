"""Run after npm run build. Requires Python Playwright and Chromium."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from pathlib import Path
from playwright.sync_api import sync_playwright

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(Path(__file__).resolve().parents[1])))
Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/dist/'
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        page = browser.new_page(viewport={'width':1440, 'height':1080})
        errors = []
        failures = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: failures.append(r.url) if r.status >= 400 and '127.0.0.1' in r.url else None)
        page.goto(url, wait_until='networkidle')
        page.wait_for_timeout(1650)
        assert page.title() == '恋与PSY | 动画剧情剧场'
        assert page.locator('.rain i').count() == 42
        assert page.evaluate("getComputedStyle(document.querySelector('.backdrop')).animationName") == 'camera-drift'
        page.locator('.dialogue').click() # reveal current text
        page.locator('.dialogue').click() # heroine enters
        page.locator('.dialogue').click()
        page.locator('.dialogue').click() # Aheng enters
        assert page.locator('.actor').count() == 2
        assert page.locator('.actor-aheng.speaking').count() == 1
        page.wait_for_timeout(1400)
        page.screenshot(path='/tmp/psy-cinema-desktop.png', full_page=True)
        page.locator('#save').click()
        saved = page.locator('.frame-count').inner_text()
        page.locator('.dialogue').click()
        page.locator('.dialogue').click()
        page.locator('#load').click()
        assert page.locator('.frame-count').inner_text() == saved
        page.locator('#auto').click()
        assert page.locator('#auto').get_attribute('aria-pressed') == 'true'
        # Reveal and allow auto progression, proving the timer advances the actual scene.
        page.locator('.dialogue').click()
        page.wait_for_timeout(2850)
        assert page.locator('.frame-count').inner_text() != saved
        page.locator('#auto').click()
        page.locator('#sound').click()
        assert '开' in page.locator('#sound').inner_text()
        page.locator('#sound').click()
        assert '关' in page.locator('#sound').inner_text()
        # All three endings through the production UI, including garden and court routes.
        for choices, expected in [([0,0,0,0], '执灯照夜'),([1,1,2,1], '长风破局'),([2,1,1,2], '海棠有约')]:
            page.locator('#restart').click()
            page.wait_for_timeout(1650)
            for choice in choices:
                page.locator('#skip').click()
                page.locator(f'[data-choice="{choice}"]').click()
                page.wait_for_timeout(1650)
            assert page.locator('.ending-card h2').inner_text() == expected
            page.locator('#again').click()
            assert page.locator('.scene-arrival').count() == 1
        page.locator('[data-tab="people"]').click()
        assert page.locator('.person').count() == 4
        assert page.locator('.portrait-card image').count() == 4
        page.locator('[data-tab="journal"]').click()
        assert '故事尚未落笔' in page.locator('.journal').inner_text()
        # Malformed legacy save is rejected, valid old saves still load.
        page.evaluate("localStorage.setItem('fengque-save-v1', 'invalid json')")
        page.locator('[data-tab="story"]').first.click()
        page.locator('#load').click()
        assert '尚无有效存档' in page.locator('.toast').inner_text()
        page.evaluate("localStorage.setItem('fengque-save-v1',JSON.stringify({scene:'garden',stats:{wisdom:30,courage:45,trust:30},history:['追上宫女，问清信的来历']}))")
        page.locator('#load').click()
        assert page.locator('.scene-garden').count() == 1
        assert page.locator('.frame-count').inner_text() == '01 / 05'
        page.locator('[data-tab="journal"]').click()
        assert '追上宫女' in page.locator('.journal').inner_text()
        page.locator('[data-tab="story"]').first.click()
        page.locator('#restart').click()
        page.wait_for_timeout(1650)
        page.locator('.dialogue').click();page.locator('.dialogue').click()
        page.locator('.dialogue').click();page.locator('.dialogue').click()
        page.set_viewport_size({'width':390, 'height':844})
        page.wait_for_timeout(1400)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert page.locator('.dialogue-text').is_visible()
        page.screenshot(path='/tmp/psy-cinema-mobile.png', full_page=True)
        # Reduced motion honors OS preference and reveals the complete line immediately.
        page.emulate_media(reduced_motion='reduce')
        page.reload(wait_until='networkidle')
        assert '长安城的雨' in page.locator('.dialogue-text').inner_text()
        assert page.evaluate("getComputedStyle(document.querySelector('.backdrop')).animationName") == 'none'
        assert not errors, errors
        assert not failures, failures
        print('PASS: animated scene assets, character entrances, speaker focus, manual/automatic dialogue, sound toggle, save/load, legacy and malformed saves, 3 endings, characters/history, mobile layout, reduced motion, no JS errors or failed local assets')
        browser.close()
finally:
    server.shutdown()
