#!/usr/bin/env python3
"""
Build the Admiral Max site: one static page per language.

    python3 build.py

Reads  src/template.html, data/i18n.json, data/menu.json, data/photos.json
Writes index.html (English), hr/index.html, de/index.html, it/index.html,
       sitemap.xml, robots.txt

Everything a search engine needs (text, menu, prices, hreflang) is in the
generated HTML. js/main.js only adds the live bits: open-now line,
reservation form, lightbox.
"""
import html
import json
import os
import re

SITE_URL = "https://josip-stojanovic.github.io/admiral-max/"   # change when a domain is attached
LANGS = ["en", "hr", "de", "it"]
LOCALES = {"en": "en_GB", "hr": "hr_HR", "de": "de_DE", "it": "it_IT"}
LANG_NAMES = {"en": "English", "hr": "Hrvatski", "de": "Deutsch", "it": "Italiano"}

ROOT = os.path.dirname(os.path.abspath(__file__))


def load(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return json.load(f)


def esc(s):
    return html.escape(str(s), quote=True)


def pick(obj, lang):
    if obj is None:
        return ""
    if isinstance(obj, str):
        return obj
    return obj.get(lang) or obj.get("en") or ""


def sub_name(obj, lang):
    """Croatian is shown under each dish, or English when the page is Croatian."""
    if not isinstance(obj, dict):
        return ""
    return obj.get("en", "") if lang == "hr" else obj.get("hr", "")


def unit_label(unit, t):
    if not unit:
        return ""
    if re.fullmatch(r"\d+g", unit):
        return unit.replace("g", " g")
    return {"two": t["unitTwo"], "kg": t["unitKg"], "three": t["unitThree"]}.get(unit, "")


def price_text(item, t):
    if not item.get("price"):
        return ""
    u = unit_label(item.get("unit"), t)
    return (u + " " if u else "") + "€" + item["price"]


def render_menu(menu, lang, t):
    nav, sections = [], []
    for sec in menu:
        title = pick(sec["title"], lang)
        nav.append(f'        <a href="#{sec["id"]}">{esc(title)}</a>')
        out = [f'        <section class="menu-section" id="{sec["id"]}">',
               '          <header class="menu-section-head">',
               f'            <h3>{esc(title)}</h3>']
        sub = sub_name(sec["title"], lang)
        if sub:
            out.append(f'            <p class="menu-section-hr" lang="{"en" if lang == "hr" else "hr"}">{esc(sub)}</p>')
        out.append('          </header>')
        if sec.get("note"):
            out.append(f'          <p class="menu-section-note">{esc(pick(sec["note"], lang))}</p>')
        out.append('          <ul class="dishes">')
        for item in sec["items"]:
            name = pick(item["name"], lang)
            out.append('            <li class="dish">')
            out.append('              <div class="dish-row">')
            out.append(f'                <span class="dish-name">{esc(name)}</span>')
            p = price_text(item, t)
            if p:
                out.append('                <span class="dish-leader" aria-hidden="true"></span>')
                out.append(f'                <span class="dish-price">{esc(p)}</span>')
            out.append('              </div>')
            s = sub_name(item["name"], lang)
            if s:
                out.append(f'              <p class="dish-hr" lang="{"en" if lang == "hr" else "hr"}">{esc(s)}</p>')
            d = pick(item.get("desc"), lang)
            if d:
                out.append(f'              <p class="dish-desc">{esc(d)}</p>')
            out.append('            </li>')
        out.append('          </ul>')
        out.append('        </section>')
        sections.append("\n".join(out))
    return "\n".join(nav), "\n\n".join(sections)


def render_gallery(photos, menu, lang, t, base):
    items_by_id = {it["id"]: it for sec in menu for it in sec["items"] if "id" in it}
    out = []
    for i, p in enumerate(photos):
        if "item" in p:
            item = items_by_id[p["item"]]
            caption, price = pick(item["name"], lang), price_text(item, t)
        else:
            caption, price = t[p["caption"]], ""
        alt = t[p["alt"]]
        span = f' plate-{p["span"]}' if p["span"] else ""
        f = p["file"]
        srcset = f'{base}assets/photos/{f}-640.webp 640w, {base}assets/photos/{f}.webp {p["w"]}w'
        sizes = "(max-width: 640px) 50vw, (max-width: 980px) 33vw, 300px"
        if p["span"] == "wide":
            sizes = "(max-width: 640px) 100vw, (max-width: 980px) 66vw, 600px"
        elif p["span"] == "long":
            sizes = "(max-width: 640px) 100vw, (max-width: 980px) 33vw, 600px"
        out.append(f'''      <li class="plate{span}">
        <button type="button" class="thumb" data-index="{i}" data-full="{base}assets/photos/{f}.jpg">
          <img src="{base}assets/photos/{f}.jpg" srcset="{srcset}" sizes="{sizes}" alt="{esc(alt)}" width="{p["w"]}" height="{p["h"]}" loading="lazy">
          <span class="plate-cap"><span class="cap">{esc(caption)}</span>{f'<span class="price">{esc(price)}</span>' if price else ''}</span>
        </button>
      </li>''')
    return "\n".join(out)


def page_url(lang):
    return SITE_URL if lang == "en" else f"{SITE_URL}{lang}/"


def build_page(lang, tpl, i18n, menu, photos):
    t = i18n[lang]
    base = "" if lang == "en" else "../"
    nav_html, sections_html = render_menu(menu, lang, t)
    gallery_html = render_gallery(photos, menu, lang, t, base)

    lang_links = []
    foot_langs = []
    for l in LANGS:
        href = base if l == "en" else f"{base}{l}/"
        cur = ' aria-current="page"' if l == lang else ""
        lang_links.append(f'      <a href="{href or "./"}" lang="{l}" hreflang="{l}"{cur}>{l.upper()}</a>')
        if l != lang:
            foot_langs.append(f'<a href="{href or "./"}" lang="{l}" hreflang="{l}">{LANG_NAMES[l]}</a>')

    alternates = "\n".join(
        [f'  <link rel="alternate" hreflang="{l}" href="{page_url(l)}">' for l in LANGS]
        + [f'  <link rel="alternate" hreflang="x-default" href="{page_url("en")}">'])

    # strings the browser side needs (form, hours line, lightbox)
    runtime_keys = [k for k in t if k.startswith(("f", "err", "lb", "open", "closing", "opens", "hours"))]
    strings = json.dumps({k: t[k] for k in runtime_keys}, ensure_ascii=False)

    out = tpl
    out = re.sub(r"\{\{t:([A-Za-z0-9_]+)\}\}", lambda m: esc(t[m.group(1)]), out)
    repl = {
        "{{lang}}": lang,
        "{{base}}": base,
        "{{site}}": SITE_URL,
        "{{canonical}}": page_url(lang),
        "{{locale}}": LOCALES[lang],
        "{{alternates}}": alternates,
        "{{langLinks}}": "\n".join(lang_links),
        "{{footLangs}}": ", ".join(foot_langs),
        "{{menuNav}}": nav_html,
        "{{menuSections}}": sections_html,
        "{{gallery}}": gallery_html,
        "{{strings}}": strings,
    }
    for k, v in repl.items():
        out = out.replace(k, v)
    leftover = re.findall(r"\{\{[^}]+\}\}", out)
    if leftover:
        raise SystemExit(f"unreplaced placeholders in {lang}: {leftover}")
    return out


def main():
    with open(os.path.join(ROOT, "src", "template.html"), encoding="utf-8") as f:
        tpl = f.read()
    i18n, menu, photos = load("i18n.json"), load("menu.json"), load("photos.json")

    missing = {l: sorted(set(i18n["en"]) - set(i18n[l])) for l in LANGS if l != "en"}
    if any(missing.values()):
        raise SystemExit(f"missing translations: {missing}")

    for lang in LANGS:
        html_out = build_page(lang, tpl, i18n, menu, photos)
        path = os.path.join(ROOT, "index.html") if lang == "en" else os.path.join(ROOT, lang, "index.html")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html_out)
        print("wrote", os.path.relpath(path, ROOT))

    urls = []
    for l in LANGS:
        alts = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{a}" href="{page_url(a)}"/>' for a in LANGS)
        urls.append(f'  <url>\n    <loc>{page_url(l)}</loc>{alts}\n  </url>')
    sitemap = ('<?xml version="1.0" encoding="UTF-8"?>\n'
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
               'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(urls) + "\n</urlset>\n")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap)
    with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}sitemap.xml\n")
    print("wrote sitemap.xml, robots.txt")


if __name__ == "__main__":
    main()
