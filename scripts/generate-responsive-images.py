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
        for width in (480, 768, 960, 1440):
            resized_webp(source, source.with_name(f"{stem}-{width}.webp"), width)

resized_webp(ROOT / "bg" / "bg_hero-1600.webp", ROOT / "bg" / "bg_hero-768.webp", 768, 70)

final_cta_source = ROOT / "bg" / "finalCTA" / "bg_finalCTA_home.webp"
resized_webp(final_cta_source, final_cta_source.with_name("bg_finalCTA_home-1440.webp"), 1440, 74)
with Image.open(final_cta_source) as image:
    mobile_aspect = 736 / 450
    crop_width = round(image.height * mobile_aspect)
    mobile_crop = image.crop((0, 0, min(crop_width, image.width), image.height))
    mobile_crop.save(
        final_cta_source.with_name("bg_finalCTA_home-mobile.webp"),
        "WEBP",
        quality=74,
        method=6,
    )

for theme in ("claro", "escuro"):
    source = ROOT / "logos" / f"Logo_Sapiente_fundo_{theme}.webp"
    resized_webp(source, source.with_name(f"{source.stem}-210.webp"), 210, 76)
