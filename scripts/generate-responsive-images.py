from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1] / "client" / "public" / "media"


def resized_webp(source: Path, target: Path, width: int, quality: int = 78) -> None:
    with Image.open(source) as image:
        ratio = width / image.width
        height = round(image.height * ratio)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        resized.save(target, "WEBP", quality=quality, method=6)


banner_names = {
    "PT": [
        "home_o_que_nos_diferencia.webp",
        "home_resultados_gera_ia.webp",
        "home_marketing_digital_ia.webp",
        "home_personalidade_marca.webp",
    ],
    "EN": [
        "home_o_que_nos_diferencia_en.webp",
        "home_resultados_gera_ia_en.webp",
        "home_marketing_digital_ia_en.webp",
        "home_personalidade_marca_en.webp",
    ],
}

for language, names in banner_names.items():
    for name in names:
        source = ROOT / "banners" / language / name
        stem = source.stem
        for width in (960, 1440):
            resized_webp(source, source.with_name(f"{stem}-{width}.webp"), width)

resized_webp(ROOT / "bg" / "bg_hero.webp", ROOT / "bg" / "bg_hero-960.webp", 960, 80)
resized_webp(ROOT / "bg" / "bg_hero.webp", ROOT / "bg" / "bg_hero-1600.webp", 1600, 80)

for theme in ("claro", "escuro"):
    source = ROOT / "logos" / f"Logo_Sapiente_fundo_{theme}.webp"
    resized_webp(source, source.with_name(f"{source.stem}-210.webp"), 210, 76)
