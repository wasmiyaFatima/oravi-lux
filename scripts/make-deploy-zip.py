import os
import shutil
import zipfile

ROOT = r"c:\projects\lami\oravi-lux"
STAGE = r"c:\projects\lami\_oravi_deploy_stage"
DEST = r"c:\projects\lami\oravi-lux-deploy.zip"

SKIP_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    ".agents",
    "3d-logo",
    "scripts",
    "_oravi_deploy_stage",
}

SKIP_PUBLIC_DIRS = {"video", "content"}
KEEP_LUXEMBOURG = {"bridge.jpg", "casemates.jpg"}

SKIP_FILES = {
    ".env",
    ".env.local",
    ".env.production",
    ".env.development",
    "next-env.d.ts",
}


def should_skip(rel: str) -> bool:
    parts = rel.replace("\\", "/").split("/")
    if parts[0] in SKIP_DIRS:
        return True
    if len(parts) >= 2 and parts[0] == "public" and parts[1] in SKIP_PUBLIC_DIRS:
        return True
    if len(parts) >= 3 and parts[0] == "public" and parts[1] == "luxembourg":
        if parts[2] not in KEEP_LUXEMBOURG:
            return True
    name = parts[-1]
    if name in SKIP_FILES or name.startswith(".env"):
        return name != ".env.example"
    return False


if os.path.exists(STAGE):
    shutil.rmtree(STAGE)
os.makedirs(STAGE)

copied = 0
for root, dirs, files in os.walk(ROOT):
    rel_root = os.path.relpath(root, ROOT)
    dirs[:] = [
        d
        for d in dirs
        if not should_skip(os.path.join(rel_root, d) if rel_root != "." else d)
    ]
    for name in files:
        rel = name if rel_root == "." else os.path.join(rel_root, name)
        if should_skip(rel):
            continue
        src = os.path.join(root, name)
        dest = os.path.join(STAGE, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(src, dest)
        copied += 1

if os.path.exists(DEST):
    os.remove(DEST)

DIR_ATTR = (0o755 << 16) | 0x10
FILE_ATTR = 0o644 << 16

with zipfile.ZipFile(DEST, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for root, dirs, files in os.walk(STAGE):
        dirs.sort()
        files.sort()
        rel_root = os.path.relpath(root, STAGE).replace("\\", "/")
        if rel_root != ".":
            info = zipfile.ZipInfo(rel_root + "/")
            info.external_attr = DIR_ATTR
            zf.writestr(info, "")
        for name in files:
            path = os.path.join(root, name)
            rel = os.path.relpath(path, STAGE).replace("\\", "/")
            info = zipfile.ZipInfo(rel)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = FILE_ATTR
            with open(path, "rb") as fh:
                zf.writestr(info, fh.read())

print(f"COPIED={copied}")
print(f"ZIP_MB={os.path.getsize(DEST) / (1024 * 1024):.2f}")
print(f"ZIP_PATH={DEST}")
