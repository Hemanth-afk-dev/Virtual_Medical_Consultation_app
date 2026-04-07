import zipfile, pathlib, shutil
src=pathlib.Path('mediconnect-backend-0.0.1-SNAPSHOT.jar')
backup=src.with_suffix(src.suffix+'.bak')
fixed=pathlib.Path('mediconnect-backend-0.0.1-SNAPSHOT-fixed.jar')
config=pathlib.Path('classes/application.properties')
if not src.exists():
    raise SystemExit('source jar missing: %s' % src)
if not config.exists():
    raise SystemExit('config missing: %s' % config)
if not backup.exists():
    shutil.copy2(src, backup)
with zipfile.ZipFile(src, 'r') as zin, zipfile.ZipFile(fixed, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        if item.filename == 'BOOT-INF/classes/application.properties':
            continue
        data = zin.read(item.filename)
        zout.writestr(item, data)
    zout.write(config, arcname='BOOT-INF/classes/application.properties')
shutil.move(str(fixed), str(src))
print('patched', src.name)